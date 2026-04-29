CREATE TRIGGER promote_student_to_alum
AFTER INSERT ON Alum
BEGIN
    -- Delete the user from the Student table now that they are an Alum
    DELETE FROM Student 
    WHERE Username = NEW.Username;
END;