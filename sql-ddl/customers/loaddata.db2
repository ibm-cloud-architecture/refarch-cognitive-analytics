INSERT INTO customers (id,name, status, gender,type,  age, 
        carOwner, children, emailAddress, estimatedIncome, firstName, 
        lastName, profession,maritalStatus,churn,mostDominantTone,zipcode,ACCOUNT_ACCOUNTNUMBER)
VALUES ('1','Eddie TheBuilder','S','M','Person','45','N',	1,'eddie@email.com','140000','Eddie','TheBuilder','Engineer','Married','T','NotEvaluated','95500','ACT01'),
VALUES ('3','Bob TheBuilder','S','M','Person','24.393333','N',	1,'bobbuilder@email.com','40000','Bob','TheBuilder','Engineer','Married','T','NotEvaluated','94000','ACT03')

INSERT INTO PRODUCTS (name,productCategory,price) VALUES('ipho','smartphone',750);
INSERT INTO PRODUCTS (name,productCategory,price) VALUES('sam','smartphone',700);
INSERT INTO PRODUCTS (name,productCategory,price) VALUES('moto','smartphone',250);

INSERT INTO ACCOUNTS ( accountNumber, 
  balance, dropped, international, local,localBillType, longDistance, longDistanceBillType, paymentMethod, 
  ratePlan, usage,   CUSTOMER_ID) 
 VALUES('ACT01','150','0','0','206','Budget','25','Standard','CC',3,'231',1),
 ('ACT03','300','0','0','120','Budget','25','Standard','CC',3,'231',3)
 
 
  INSERT INTO CUSTOMERS_PRODUCTS(CUSTOMERID,productName,phoneNumber,CUSTOMER_ID,OWNEDPRODUCTS_NAME)
  VALUES(1,'ipho','4157890001',1,'ipho'),
  VALUES(1,'sam','4157890002',1,'sam'),
  VALUES(3,'sam','4157890003',3,'sam');