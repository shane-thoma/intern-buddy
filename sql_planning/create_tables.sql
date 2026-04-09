CREATE TABLE Company (
	name VARCHAR(40) PRIMARY KEY,
    hq_city VARCHAR(50),
    hq_state VARCHAR(20),
    hq_country VARCHAR(60) NOT NULL,
    ceo_first_name VARCHAR(20),
    ceo_last_name VARCHAR(20)
);

CREATE TABLE Internship (
	posting INT PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
    city VARCHAR(50),
    state VARCHAR(20),
    country VARCHAR(60) NOT NULL,
	salary DECIMAL(10, 2) NOT NULL,
	company VARCHAR(50) REFERENCES Company(name)
);

CREATE TABLE Skill (
	skill VARCHAR(20) PRIMARY KEY
);

CREATE TABLE University (
    name VARCHAR(80) PRIMARY KEY,
    city VARCHAR(50),
    state VARCHAR(20),
    country VARCHAR(60) NOT NULL
);

CREATE TABLE Account (
    username VARCHAR(30) PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    major VARCHAR(30) NOT NULL,
    university VARCHAR(80) NOT NULL REFERENCES University(name)
);

CREATE TABLE Student (
    username VARCHAR(30) PRIMARY KEY REFERENCES Account(username),
    gpa DECIMAL(4, 3),
    CHECK (gpa >= 0 AND gpa <= 4)
);

CREATE TABLE Alum (
    username VARCHAR(30) PRIMARY KEY REFERENCES Account(username),
    company VARCHAR(40) NOT NULL REFERENCES Company(name)
);

CREATE TABLE InternshipSkill (
    posting INT REFERENCES Internship(posting),
    skill VARCHAR(20) REFERENCES Skill(skill),
    PRIMARY KEY (posting, skill)
);

CREATE TABLE StudentSkill (
    username VARCHAR(30) REFERENCES Student(username),
    skill VARCHAR(20) REFERENCES Skill(skill),
    PRIMARY KEY (username, skill)
);
