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
    vehicle_type ENUM('bike', 'car') NOT NULL,
    vehicle_model_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (type_id) REFERENCES car_types(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES bike_types(id) ON DELETE CASCADE
);

-- CREATE TABLE users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(255) NOT NULL,
--     last_name VARCHAR(255) NOT NULL
-- );

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    number_of_wheels INT NOT NULL,
    type VARCHAR(255),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);

INSERT INTO
    car_types (name)
VALUES
    ('hatchback'),
    ('suv'),
    ('sedan'),
    ('sports'),
    ('luxury');

INSERT INTO
    bike_types (name)
VALUES
    ('cruiser'),
    ('sports'),
    ('standard'),
    ('touring'),
('dirt bike')


INSERT INTO vehicles (type_id, name, vehicle_type, vehicle_model_type)
VALUES
(1, 'Honda Civic', 'car', 'sedan'),
(1, 'Toyota Corolla', 'car', 'sedan'),
(2, 'Toyota RAV4', 'car', 'suv'),
(3, 'BMW 3 Series', 'car', 'sedan'),
(4, 'Porsche 911', 'car', 'sports'),
(5, 'Mercedes-Benz S-Class', 'car', 'luxury');


INSERT INTO vehicles (type_id, name, vehicle_type, vehicle_model_type)
VALUES
(1, 'Harley-Davidson Street 750', 'bike', 'cruiser'),
(2, 'Honda CBR500R', 'bike', 'sports'),
(4, 'BMW R1250GS Adventure', 'bike', 'touring'),
(5, 'Kawasaki KX450', 'bike', 'dirt bike'),
(5, 'honda unicorn', 'bike', 'standard');

