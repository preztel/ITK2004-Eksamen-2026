-- web/db/init.sql

CREATE TABLE IF NOT EXISTS bedrifter (
  id INT AUTO_INCREMENT PRIMARY KEY,
  navn VARCHAR(100) NOT NULL,
  vlan INT NOT NULL,
  ip_nett VARCHAR(20) NOT NULL,
  gateway VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS brukere (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brukernavn VARCHAR(50) NOT NULL UNIQUE,
  passord_hash VARCHAR(255) NOT NULL,
  bedrift_id INT NOT NULL,
  FOREIGN KEY (bedrift_id) REFERENCES bedrifter(id)
);

CREATE TABLE IF NOT EXISTS dokumentasjon (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bedrift_id INT NOT NULL,
  tittel VARCHAR(200) NOT NULL,
  innhold TEXT NOT NULL,
  opprettet TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bedrift_id) REFERENCES bedrifter(id)
);

-- Seed: bedrifter
INSERT INTO bedrifter (navn, vlan, ip_nett, gateway) VALUES
  ('Bedrift AS',    10, '192.168.10.0/24', '192.168.10.1'),
  ('Konsulent AS',  20, '192.168.20.0/24', '192.168.20.1'),
  ('Design AS',     30, '192.168.30.0/24', '192.168.30.1');

-- Seed: brukere
-- passord: 'passord123' hashed med bcrypt (cost 10)
INSERT INTO brukere (brukernavn, passord_hash, bedrift_id) VALUES
  ('bedrift1', '$2a$10$S7JUxiZPnq15godfSmISSeX.bPWzRjm7/mGPK/7QOb4bewUs63TIK', 1),
  ('bedrift2', '$2a$10$S7JUxiZPnq15godfSmISSeX.bPWzRjm7/mGPK/7QOb4bewUs63TIK', 2),
  ('bedrift3', '$2a$10$S7JUxiZPnq15godfSmISSeX.bPWzRjm7/mGPK/7QOb4bewUs63TIK', 3);

-- Seed: dokumentasjon
INSERT INTO dokumentasjon (bedrift_id, tittel, innhold) VALUES
  (1, 'Nettverksoversikt', 'VLAN: 10\nNettverk: 192.168.10.0/24\nGateway: 192.168.10.1\nSwitch-port: Fa0/1-Fa0/3'),
  (1, 'DNS-oppsett', 'Primær DNS: 8.8.8.8\nSekundær DNS: 8.8.4.4\nIntern DNS: ikke konfigurert'),
  (2, 'Nettverksoversikt', 'VLAN: 20\nNettverk: 192.168.20.0/24\nGateway: 192.168.20.1\nSwitch-port: Fa0/4-Fa0/6'),
  (2, 'DNS-oppsett', 'Primær DNS: 8.8.8.8\nSekundær DNS: 8.8.4.4'),
  (3, 'Nettverksoversikt', 'VLAN: 30\nNettverk: 192.168.30.0/24\nGateway: 192.168.30.1\nSwitch-port: Fa0/7-Fa0/9'),
  (3, 'DNS-oppsett', 'Primær DNS: 1.1.1.1\nSekundær DNS: 1.0.0.1');
