
CREATE TABLE car_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE bike_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    vehicle_type ENUM('car', 'bike') NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    vehicle_model_type VARCHAR(255)
);

INSERT INTO vehicles (type_id, name, vehicle_type) VALUES   ((SELECT id FROM bike_types WHERE name = 'cruiser'), 'Ducati XDiavel', 'bike'),   ((SELECT id FROM bike_types WHERE name = 'cruiser'), 'Harly davidson', 'bike');
INSERT INTO vehicles (type_id, name, vehicle_type) VALUES ((SELECT id FROM car_types WHERE name = 'hatchback'), 'Maruti Swift', 'car'), ((SELECT id FROM car_types WHERE name = 'hatchback'), 'Maruti Wagon R', 'car'), ((SELECT id FROM car_types WHERE name = 'suv'), 'Hyundai Creta', 'car'), ((SELECT id FROM car_types WHERE name = 'suv'), 'Toyota Innova', 'car'), ((SELECT id FROM car_types WHERE name = 'sedan'), 'Maruti Ciaz', 'car'), ((SELECT id FROM car_types WHERE name = 'sedan'), 'Swift Dezire', 'car');

INSERT INTO car_types (name) VALUES ('hatchback'), ('suv'), ('sedan');

INSERT INTO bike_types (name) VALUES ('cruiser');


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);

ALTER TABLE vehicles
 ADD COLUMN vehicle_model_type VARCHAR(255);

 UPDATE vehicles SET vehicle_model_type = 'hatchback' WHERE id = 20;
UPDATE vehicles SET vehicle_model_type = 'suv' WHERE id = 21;
UPDATE vehicles SET vehicle_model_type = 'suv' WHERE id = 22;
UPDATE vehicles SET vehicle_model_type = 'sedan' WHERE id = 23;
UPDATE vehicles SET vehicle_model_type = 'sedan' WHERE id = 24;
UPDATE vehicles SET vehicle_model_type = 'cruiser' WHERE id = 25;
UPDATE vehicles SET vehicle_model_type = 'sports' WHERE id = 26;


ALTER  TABLE vehicles DROP COLUMN is_available;