CREATE TRIGGER default_internship_location
AFTER INSERT ON Internship
WHEN NEW.city IS NULL OR NEW.state IS NULL OR NEW.country IS NULL 
	OR NEW.city = '' OR NEW.state = '' OR NEW.country = ''
BEGIN
    UPDATE Internship
    SET city = (SELECT hq_city FROM Company WHERE name = NEW.company),
		state = (SELECT hq_state FROM Company WHERE name = NEW.company),
		country = (SELECT hq_country FROM Company WHERE name = NEW.company)
    WHERE posting = NEW.posting;
END;