from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect("intern-buddy.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/api/internships/filter")
def filter_students():
    username = request.args.get('username')
    with sqlite3.connect('intern-buddy.db') as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""
        SELECT I.posting, I.title, I.city, I.state, I.country, I.salary, I.company, COUNT(SSk.skill) AS match_count
        FROM Internship AS I
        JOIN InternshipSkill AS ISk
        ON ISk.posting = I.posting
        JOIN StudentSkill AS SSk
        ON SSk.skill = ISk.skill
        WHERE SSk.username = ? 
        GROUP BY I.posting
        HAVING match_count >= 3;
        """, (username,))
        rows = cursor.fetchall()
    
        #convert list of Rows into dictionaries
        json_rows = []
        for row in rows:
            posting = row[0]
            cursor.execute("SELECT skill FROM InternshipSkill WHERE posting = ? ", (posting,))
            skills = cursor.fetchall()

            current_skills = []
            for skill in skills:
                current_skills.append(skill[0])  


            json_row = {
                "posting": row[0],
                "title": row[1],
                "city": row[2],
                "state": row[3],
                "country": row[4],
                "salary": row[5],
                "company": row[6],
                "skills" : current_skills
            }
            json_rows.append(json_row)

    return jsonify(json_rows)


@app.route("/api/insert/skills",  methods=["POST"])
def insert_skills():
    username = request.args.get('username')
    skill = request.args.get('skill')
    
    if not username or not skill:
        return jsonify({"error": "Missing username or skill"}), 400
    
    try:
        with sqlite3.connect('intern-buddy.db') as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO StudentSkill VALUES (?, ?)", (username, skill))
            conn.commit()
        return jsonify({"status": "Successfully added"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Skill already added or invalid record"}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/delete/skills",  methods=["POST"])
def delete_skills():
    username = request.args.get('username')
    skill = request.args.get('skill')
    
    if not username or not skill:
        return jsonify({"error": "Missing username or skill"}), 400
    
    try:
        with sqlite3.connect('intern-buddy.db') as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM StudentSkill WHERE username = ? AND skill = ?", (username, skill))
            if cursor.rowcount == 0:
                return jsonify({"error": "Skill not found"}), 404
            conn.commit()
        return jsonify({"status": "Successfully deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/dropdown", methods=["GET"])
def dropdown_skills():
    username = request.args.get('username')
    with sqlite3.connect('intern-buddy.db') as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""
        SELECT * FROM Skill
        LEFT JOIN StudentSkill
        ON Skill.skill == StudentSkill.skill AND StudentSkill.username = ?
        WHERE StudentSkill.skill IS NULL
        """, (username,))
    
    rows = cursor.fetchall()
    drop_down_array= []
    for row in rows:
        drop_down_array.append(row[0])
    
    json_array = {"skills":drop_down_array}
    print(json_array)
    return jsonify(json_array)
    
@app.route("/")
def home():
    return jsonify({"message": "Hello from intern-buddy!"})

@app.route("/api/test")
def test():
    return jsonify({"status": "API working"})

@app.route("/api/internships")
def display_internships():
    with sqlite3.connect('intern-buddy.db') as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Internship")
        rows = cursor.fetchall()
        
        #convert list of Rows into dictionaries
        json_rows = []
        for row in rows:
            posting = row[0]
            cursor.execute("SELECT skill FROM InternshipSkill WHERE posting = ? ", (posting,))
            skills = cursor.fetchall()

            current_skills = []
            for skill in skills:
                current_skills.append(skill[0])  


            json_row = {
                "posting": row[0],
                "title": row[1],
                "city": row[2],
                "state": row[3],
                "country": row[4],
                "salary": row[5],
                "company": row[6],
                "skills" : current_skills

            }
            json_rows.append(json_row)
        

        print(json_rows)
        return jsonify(json_rows)

@app.route("/api/profile")
def display_profile():
    username = request.args.get('username')
    with sqlite3.connect('intern-buddy.db') as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Account WHERE username = ?", (username,))

        user = cursor.fetchone()

        if user is None:
            return jsonify({"error: user not found"})
        else:

            user_json = {
                "username": user[0],
                "first_name": user[1],
                "last_name": user[2],
                "major": user[3],
                "university": user[4]
            }
            return jsonify(user_json)
        



if __name__ == "__main__":
    app.run(debug=True, port = 5002)

