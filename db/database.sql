CREATE DATABASE Euphoria;

USE Euphoria;

-- TABLA USUARIOS
CREATE TABLE Usuarios(
idUsuario INT AUTO_INCREMENT NOT NULL,
mail VARCHAR(255) NOT NULL, 
contraseña VARCHAR(255) NOT NULL,
PRIMARY KEY (idUsuario)
);

-- TABLA CLIENTES
CREATE TABLE Clientes(
idCliente INT AUTO_INCREMENT NOT NULL, 
nombre_apellido VARCHAR(255) NOT NULL,
telefono VARCHAR(255),
domicilio VARCHAR(255) NOT NULL,
codigo_postal INT NOT NULL,
provincia VARCHAR(255) NOT NULL,
dni INT NOT NULL, 
usuario_ig VARCHAR(255),
PRIMARY KEY (idCliente)
);

-- TABLA PRODUCTOS
CREATE TABLE Productos(
idProducto INT AUTO_INCREMENT NOT NULL,
nombre VARCHAR(500) NOT NULL,
detalle VARCHAR(500), 
monto DECIMAL(10,2) NOT NULL,
impuestos DECIMAL (10,3) NOT NULL,
estado VARCHAR(255) NOT NULL,
PRIMARY KEY (idProducto)
);


-- TABLA ENVÍOS
CREATE TABLE Envios(
idEnvio INT NOT NULL UNIQUE,
monto_total DECIMAL(10,2),
idCliente INT NOT NULL,
idProducto INT NOT NULL,
PRIMARY KEY (idEnvio),
FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente),
FOREIGN KEY (idProducto) REFERENCES Productos (idProducto)
);



-- INSERT USUARIOS
INSERT INTO Usuarios(mail, contraseña) VALUES ('rociojd10@gmail.com', 102030);

-- INSERT CLIENTES
INSERT INTO Clientes(nombre_apellido, telefono, domicilio, codigo_postal, provincia, dni, usuario_ig) VALUES ('Rocio Dorado', '3816711566', 'Rivadavia 1020', 4178, 'Tucumán', 41961187, 'rdrd.99');
INSERT INTO Clientes(nombre_apellido, telefono, domicilio, codigo_postal, provincia, dni, usuario_ig) VALUES ('Fabiana Décima', '3815668680', 'Psj Muñecas 54', 4113, 'Tucumán', 48964482, 'fabiok236');

-- INSERT PRODUCTOS
INSERT INTO Productos(nombre, detalle, monto, impuestos, estado) VALUES ('LAYOVER BY V', 'Versión Random con POB', 19000, 4000, 'PENDIENTE');
INSERT INTO Productos(nombre, detalle, monto, impuestos, estado) VALUES ('GET UP New Jeans', 'Bunny Beach Bag Ver Random', 20235, 4250, 'PENDIENTE');

-- INSER ENVIOS
INSERT INTO Envios(idEnvio, monto_total, idCliente, idProducto) VALUES (5579, 23000, 1, 1);
INSERT INTO Envios(idEnvio, monto_total, idCliente, idProducto) VALUES (5580, 23000, 2, 1);


