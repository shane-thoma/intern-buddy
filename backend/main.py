from flask import Flask, jsonify
import sqlite3
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect("intern-buddy.db")
    conn.row_factory = sqlite3.Row
    return conn

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
            json_row = {
                "posting": row[0],
                "title": row[1],
                "city": row[2],
                "state": row[3],
                "country": row[4],
                "salary": row[5],
                "company": row[6]

            }
            json_rows.append(json_row)
        

        print(json_rows)
        return jsonify(json_rows)

if __name__ == "__main__":
    app.run(debug=True, port = 5002)

