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

# THIS IS OUR MAIN QUERY TO TALK ABOUT
# READ OPERATION
@app.route("/api/internships/filter")
def filter_students():
    username = request.args.get('username')
    with sqlite3.connect('intern-buddy.db') as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""
        SELECT I.posting, I.title, I.city, I.state, I.country, I.salary, I.company, COUNT(SSk.skill) AS match_count, COUNT(I.title), MAX(I.salary), MIN(I.salary)
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
                "skills" : current_skills,
            }
            json_rows.append(json_row)

    return jsonify(json_rows)

# READ OPERATION
@app.route("/api/internships/filter_agg")
def filter_agg():
    username = request.args.get('username')
    with sqlite3.connect('intern-buddy.db') as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""
        SELECT COUNT(*), MIN(salary), MAX(salary)
        FROM (
            SELECT I.posting, I.title, I.city, I.state, I.country, I.salary, I.company, COUNT(SSk.skill) AS match_count
            FROM Internship AS I
            JOIN InternshipSkill AS ISk
            ON ISk.posting = I.posting
            JOIN StudentSkill AS SSk
            ON SSk.skill = ISk.skill
            WHERE SSk.username = ? 
            GROUP BY I.posting
            HAVING match_count >= 3
		);
        """, (username,))
        agg = cursor.fetchone()
        
        if agg[0] > 0:
            result = {
                "matches": agg[0],
                "max": agg[1],
                "min": agg[2]
            }
        else:
            # Return defaults if no internships match the filter
            result = {
                "matches": 0,
                "max": 0,
                "min": 0
            }

    return jsonify(result)

@app.route("/api/skills/insert",  methods=["POST"])
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

@app.route("/api/skills/delete",  methods=["DELETE"])
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

# READ OPERATION
@app.route("/api/info")
def get_student_info():
    username = request.args.get('username')
    with sqlite3.connect('intern-buddy.db') as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Account WHERE username = ?", (username,))
        student_info = cursor.fetchone()

        json_list ={
            "username" : student_info["username"], 
            "first_name": student_info["first_name"], 
            "last_name": student_info["last_name"], 
            "major": student_info["major"],
            "university": student_info["university"]
        }

        print(json_list)
        return jsonify(json_list)

# UPDATE OPERATION
@app.route("/api/update/info", methods=["POST"])
def update_info():
    data= request.get_json()
    username = data.get('username')
    info = data.get('info', {})

    first_name = info.get("first_name")
    last_name = info.get("last_name")
    major = info.get("major")
    university = info.get("university")
    if not username or not info:
        return jsonify({"error": "Missing username or skill"}), 400
    
    try:
        with sqlite3.connect('intern-buddy.db') as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE Account
                SET
                    first_name = ?,
                    last_name = ?,
                    major = ?,
                    university = ?   
                WHERE username = ?    
                """, (first_name, last_name, major, university, username,))
            conn.commit()
        return jsonify({"status": "Successfully added"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Invalid record"}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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

# CREATE OPERATION
@app.route("/api/account", methods = ["POST"])    
def create_account():
    data = request.get_json()
    username = data.get("username")
    firstName = data.get("firstName")
    lastName = data.get("lastName")
    major = data.get("major")
    university = data.get("university")
    gpa = data.get("gpa")
    skills = data.get("skillsToAdd")

    # Transaction in create account
    try:
        with sqlite3.connect('intern-buddy.db') as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("BEGIN Transaction")
            
            cursor.execute("INSERT INTO Account (username, first_name, last_name, major, university) VALUES (?, ?, ?, ?, ?)", (username, firstName, lastName, major, university))

            cursor.execute("INSERT INTO Student (username, gpa) VALUES (?,?)", (username, gpa))

            for skill in skills:
                cursor.execute("INSERT INTO StudentSkill (username, skill) VALUES (?,?)", (username, skill))
            
            cursor.execute("COMMIT Transaction")
            
            conn.commit()
            return jsonify({"status": "Successfully added"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Invalid record"}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# DELETE OPERATION
@app.route("/api/deleteuser", methods=["DELETE"])
def delete_user():
    username = request.args.get('username')

    # Transaction in delete account
    try:
        with sqlite3.connect('intern-buddy.db') as conn:
            cursor = conn.cursor()

            cursor.execute("BEGIN Transaction")

            cursor.execute("DELETE FROM StudentSkill WHERE username = ?", (username,))

            cursor.execute("DELETE FROM Account WHERE username = ?", (username,))

            cursor.execute("DELETE FROM Student WHERE username = ?", (username,))

            cursor.execute("COMMIT Transaction")

            conn.commit()

            return jsonify({"status": "User successfully deleted"}), 200
        
    except Exception as e:
            return jsonify({"error": str(e)}), 500

@app.route("/api/internships/alumni")
def add_alumni():

    company = request.args.get('company')
    username = request.args.get('username')
    try:
        with sqlite3.connect('intern-buddy.db') as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("""
            SELECT University FROM Account 
            WHERE username = ?
            """, (username,))
            
            university_row = cursor.fetchone() 
            

            university = university_row["university"]
            cursor.execute("""
            SELECT Al.username FROM Alum as Al
            JOIN Account AS Acc
            ON Al.username == Acc.username
            WHERE company = ? AND Acc.university = ?
            """, (company, university,))

            rows = cursor.fetchall()

            alums = []

            for row in rows:
                alums.append(row["username"])
            return jsonify(alums)
        

    except sqlite3.IntegrityError:
        return jsonify({"error": "Invalid record"}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
if __name__ == "__main__":
    app.run(debug=True, port = 5002)

