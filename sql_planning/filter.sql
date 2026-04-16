-- Basic student skill filtering query
SELECT I.posting, I.title, COUNT(SSk.skill) AS match_count
FROM Internship AS I
JOIN InternshipSkill AS ISk
ON ISk.posting = I.posting
JOIN StudentSkill AS SSk
ON SSk.skill = ISk.skill
WHERE SSk.username = "alicelopez" -- Hard-coded for now, change when put into Python
GROUP BY I.posting
HAVING match_count >= 3;