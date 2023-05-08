USE beefyboysprod;

CREATE TABLE shirt (
shirtId INT NOT NULL AUTO_INCREMENT,
shirtName VARCHAR(100) NOT NULL,
shirtPrice DOUBLE NOT NULL,
details VARCHAR(100),
color VARCHAR(100) NOT NULL,
size VARCHAR(5) NOT NULL,
inventory INT NOT NULL,
Constraint pk_shirt 
	PRIMARY KEY (shirtId)
);
CREATE TABLE cart (
	cartId INT NOT NULL AUTO_INCREMENT,
    totalPrice DOUBLE,
Constraint pk_cart
	PRIMARY KEY(cartId)
);

INSERT INTO cart VALUES (1, 50), (2, 100), (3,150), (4,200);


CREATE TABLE shirtsCart(
	shirtsCartId INT NOT NULL AUTO_INCREMENT,
    shirtId INT DEFAULT 1,
    cartId INT DEFAULT 1,
Constraint pk_shirtsCart
	PRIMARY KEY (shirtsCartId),
Constraint fk_shirtId
	FOREIGN KEY (shirtId)
    REFERENCES shirt(shirtId),
Constraint fk_cartId
	FOREIGN KEY (cartId)
    REFERENCES cart(cartId)
);

	

INSERT INTO shirt VALUES (1,"Triangle", 20.99, "Our triangle blue shirt", "Blue", "L", 10), (2, "Triangle", 0, "The yellowest triangle shirt", "Yellow", "M", 5), (3,"Triangle", 15, "A green triangle shirt", "Green", "S", 6), (NULL,"Circle", 16.25, "A circle of red", "Red", "S", 0);



CREATE TABLE purchase_order (
purchaseOrderId INT NOT NULL AUTO_INCREMENT,
userAddress varchar(100) NOT NULL,
userName varchar(100) NOT NULL,
total DOUBLE,
cartId INT,
Constraint pk_purchaseOrderId
	PRIMARY KEY(purchaseOrderId),
Constraint fk_cartId2
	FOREIGN KEY (cartId)
    references cart(cartId)
);

INSERT INTO purchase_order VALUES (1, "123 First St.", "Joe", 55.23, 1), (2, "456 Second St.", "Bob", 22.15, 2),(3, "11 South 11th Ave.", "Sue", 115.25, 3),(4, "15 Yuppe Lane", "Jellen", 900.00, 4);