DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id TINYINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  product_name VARCHAR(75),
  department_name VARCHAR(30),
  price BIGINT,
  stock_quantity SMALLINT
);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Keyboard', 'Tech', 100, 50 );
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Mens Dress Shoes', 'Apparel', 75, 25 );
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Halloween A line Dress', 'Apparel', 100, 12 );
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Wireless Computer mouse', 'Tech', 59, 20 );
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Subaru Forester', 'Automobiles',30000, 3 );
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Halloween Decorations', 'Homegoods', 12, 50 );
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Crew Neck Tee Shirt', 'Apparel', 20, 50 );
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Apple Watch', 'Tech', 400, 25 );
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Xbox One Controller', 'Tech', 60, 25 );
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('winter Jacket', 'Apparel', 150, 20 );