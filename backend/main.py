from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect("intern-buddy.db")
    conn.row_factory = sqlite3.Row
    return conn

""" 
Bhavana - IMPORTANT: 
This does not YET actually filters the database based on input.
This just receives the student input from React and saves it into a var (into "filters")
This just returns all students!
"""
@app.route("/api/students/filter", methods=["POST"])
def filter_students():
    filters = request.json
    conn = get_db()

    rows = conn.execute("SELECT * FROM Student").fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])
    

@app.route("/")
def home():
    return jsonify({"message": "Hello from intern-buddy!"})

@app.route("/api/test")
def test():
    return jsonify({"status": "API working"})

if __name__ == "__main__":
    app.run(debug=True)

