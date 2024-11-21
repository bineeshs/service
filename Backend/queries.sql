INSERT INTO auth_user (id, password, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined)
VALUES (1, 'testpass', false, 'TDXADMIN', 'TDX', 'ADMIN', 'admi@gmail.com', false, true, '2023-08-17 09:53:28.449344+05:30');


INSERT INTO userdetails (user_ptr_id, dat_created, int_status, fk_group_id, fk_company_id)
VALUES (1, '2023-08-17 09:55:56.335472+05:30', 1, 1, 1);


insert into company(int_status,vchr_name) values(0,'PKC'); 


insert into groups(vchr_name,vchr_code) values ('ADMIN','ADMIN');


insert into country (vchr_code,vchr_name) values ('IND','INDIA');

INSERT INTO states (vchr_code, vchr_name, fk_country_id)
VALUES
  ('AP', 'Andhra Pradesh', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('AR', 'Arunachal Pradesh', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('AS', 'Assam', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('BR', 'Bihar', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('CG', 'Chhattisgarh', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('GA', 'Goa', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('GJ', 'Gujarat', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('HR', 'Haryana', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('HP', 'Himachal Pradesh', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('JH', 'Jharkhand', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('KA', 'Karnataka', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('KL', 'Kerala', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('MP', 'Madhya Pradesh', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('MH', 'Maharashtra', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('MN', 'Manipur', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('ML', 'Meghalaya', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('MZ', 'Mizoram', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('NL', 'Nagaland', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('OD', 'Odisha', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('PB', 'Punjab', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('RJ', 'Rajasthan', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('SK', 'Sikkim', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('TN', 'Tamil Nadu', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('TS', 'Telangana', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('TR', 'Tripura', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('UP', 'Uttar Pradesh', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('UK', 'Uttarakhand', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND')),
  ('WB', 'West Bengal', (SELECT pk_bint_id FROM country WHERE vchr_code = 'IND'));


insert into document(vchr_module_name,vchr_short_code,int_number,fk_company_id) values('Item','ITEM',0,1);

insert into document(vchr_module_name,vchr_short_code,int_number,fk_company_id) values('SUPPLIER','SUP',0,1);


INSERT INTO document (vchr_module_name, vchr_short_code, int_number, fk_company_id)
VALUES ('USER_CODE', 'PKC-', 0, 1, 1);

INSERT INTO document (vchr_module_name, vchr_short_code, int_number, fk_branch_id, fk_company_id)
VALUES ('PAYMENT', 'PAY', 0, 1, 1);

INSERT INTO document (vchr_module_name, vchr_short_code, int_number, fk_branch_id, fk_company_id)
VALUES ('RECEIPT', 'RCPT', 0, 1, 1);

INSERT INTO document (vchr_module_name, vchr_short_code, int_number, fk_branch_id, fk_company_id)
VALUES ('Purchase Grn', 'GRN', 0, 1, 1);

INSERT INTO district (vchr_code, vchr_name, fk_state_id)
VALUES
  ('ALP', 'Alappuzha', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('ERM', 'Ernakulam', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('IDK', 'Idukki', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('KNR', 'Kannur', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('KSD', 'Kasaragod', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('KLM', 'Kollam', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('KTM', 'Kottayam', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('KZD', 'Kozhikode', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('MLP', 'Malappuram', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('PLK', 'Palakkad', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('PTA', 'Pathanamthitta', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('TVM', 'Thiruvananthapuram', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('TSR', 'Thrissur', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL')),
  ('WYD', 'Wayanad', (SELECT pk_bint_id FROM states WHERE vchr_code = 'KL'));



  -- create table uom_master(pk_bint_id BIGSERIAL PRIMARY KEY,vchr_name VARCHAR(50),vchr_code VARCHAR(50),int_sale INTEGER,int_purchase INTEGER,int_status INTEGER,dat_created timestamp,dat_updated timestamp,fk_created_id BIGINT REFERENCES user_details(user_ptr_id),fk_updated_id BIGINT REFERENCES user_details(user_ptr_id));



  insert into document(vchr_module_name,vchr_short_code,int_number,fk_company_id) values('JOURNAL','JNL-',0,1);


  insert into financial_year(vchr_type,int_year,dat_start,dat_end,bln_status,fk_company_id,dat_created) values('Apr -Mar',2023,'2023-04-01','2024-03-31',true,1, now());

