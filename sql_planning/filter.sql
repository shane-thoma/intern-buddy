-- TODO: FINISH THIS
-- Student-skill-based filter
SELECT I.posting, I.title, I.city, I.state, I.country, I.salary, I.company
FROM Internship AS I
LEFT JOIN InternshipSkill AS ISk
ON I.posting = ISk.posting
LEFT JOIN Skill AS Sk
ON ISk.skill = Sk.skill
LEFT JOIN StudentSkill AS SSk
ON Sk.skill = SSk.skill
LEFT JOIN Student AS St
ON SSk.username = St.username
WHERE St.username = {user};