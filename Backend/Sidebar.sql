-- Item Menu

insert into sub_category(vchr_sub_category_name,vchr_sub_category_value,int_sub_category_order,vchr_icon_name,fk_main_category_id) values('ITEM','item',3,'mdi mdi-content-paste',(SELECT pk_bint_id from main_category WHERE vchr_main_category_name = 'MASTER')); 

insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Add Item','additem',1,false,'/item/additem',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'ITEM'));

insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('List Item','listitem',1,false,'/item/itemlist',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'ITEM'));


insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Seasonal Item','listitem',1,false,'/item/seasonal_item',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'ITEM'));


-- Group menu

insert into sub_category(vchr_sub_category_name,vchr_sub_category_value,int_sub_category_order,vchr_icon_name,fk_main_category_id) values('GROUP','group',4,'mdi mdi-account-multiple-outline',(SELECT pk_bint_id from main_category WHERE vchr_main_category_name = 'MASTER'));

insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Add Group','addgroup',1,false,'/group/addgroup',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'GROUP'));

insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('List Group','listgroup',1,false,'/group/listgroup',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'GROUP'));


-- User Menu

INSERT INTO sub_category(fk_main_category_id,vchr_sub_category_name,vchr_sub_category_value,int_sub_category_order,vchr_icon_name) VALUES((SELECT pk_bint_id from main_category WHERE vchr_main_category_name = 'MASTER'),'USER','user',2,'mdi mdi-face');




--- Reports 
insert into sub_category(vchr_sub_category_name,vchr_sub_category_value,int_sub_category_order,vchr_icon_name,fk_main_category_id) values('REPORTS','reports',7,'mdi mdi-clipboard-check',(SELECT pk_bint_id from main_category WHERE vchr_main_category_name = 'MASTER')); 

insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Purchase report','purchasereport',1,false,'/reports/purchase-report',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'REPORTS'));


INSERT INTO menu_category (
    vchr_menu_category_name,
    fk_sub_category_id,
    vchr_menu_category_value,
    int_menu_category_order,
    bln_has_children,
    vchr_addurl
)
VALUES (
    'Add User',
    (
        SELECT pk_bint_id
        FROM sub_category
        WHERE vchr_sub_category_name = 'USER'
        LIMIT 1  
    ),
    'Add User',
    1,
    'false',
    '/user/add-user'
);


INSERT INTO menu_category (
    vchr_menu_category_name,
    fk_sub_category_id,
    vchr_menu_category_value,
    int_menu_category_order,
    bln_has_children,
    vchr_addurl
)
VALUES (
    'User list',
    (
        SELECT pk_bint_id
        FROM sub_category
        WHERE vchr_sub_category_name = 'USER'
        LIMIT 1  
    ),
    'User list',
    2,
    'false',
    '/user/list-user'
);


-- Customer sub and menu

INSERT INTO sub_category(fk_main_category_id,vchr_sub_category_name,vchr_sub_category_value,int_sub_category_order,vchr_icon_name) VALUES((SELECT pk_bint_id from main_category WHERE vchr_main_category_name = 'MASTER'),'CUSTOMER','customer',3,'mdi mdi-account-circle');

INSERT INTO menu_category(vchr_menu_category_name,fk_sub_category_id,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl)
    VALUES('Add Customer',
    (SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'CUSTOMER'),
    'Add Customer',                                                                  
    1,                                                                          
    'false',  
    '/customer/add');

INSERT INTO menu_category(
    vchr_menu_category_name,
    fk_sub_category_id,
    vchr_menu_category_value,
    int_menu_category_order,
    bln_has_children,
    vchr_addurl)
    VALUES('Customer list',
    (SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'CUSTOMER'),
    'Customer list',                                                                  
    2,                                                                          
    'false',  
    '/customer/list');



-- Branch

INSERT INTO sub_category(fk_main_category_id,vchr_sub_category_name,vchr_sub_category_value,int_sub_category_order,vchr_icon_name) VALUES((SELECT pk_bint_id from main_category WHERE vchr_main_category_name = 'MASTER'),'BRANCH','branch',5,'mdi mdi-vector-polyline');


insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Add Branch','addbranch',1,false,'/branch/addbranch',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'BRANCH'));


insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Branch List','branchlist',1,false,'/branch/branchlist',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'BRANCH'));




-- Supplier

INSERT INTO sub_category(fk_main_category_id,vchr_sub_category_name,vchr_sub_category_value,int_sub_category_order,vchr_icon_name) VALUES((SELECT pk_bint_id from main_category WHERE vchr_main_category_name = 'MASTER'),'SUPPLIER','supplier',5,'mdi mdi-account-network');


insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Add Supplier','addsupplier',1,false,'/supplier/addsupplier',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'SUPPLIER'));


insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Supplier List','supplierlist',1,false,'supplier/listsupplier',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'SUPPLIER'));



-- Journal

INSERT INTO sub_category(fk_main_category_id,vchr_sub_category_name,vchr_sub_category_value,int_sub_category_order,vchr_icon_name) VALUES((SELECT pk_bint_id from main_category WHERE vchr_main_category_name = 'MASTER'),'JOURNAL','journal',5,'mdi mdi-account-network');


insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Add Journal','addjournal',1,false,'/journal/addjournal',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'JOURNAL'));


insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Journal List','journallist',1,false,'/journal/listjournal',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'JOURNAL'));


--Payment

INSERT INTO sub_category(fk_main_category_id,vchr_sub_category_name,vchr_sub_category_value,int_sub_category_order,vchr_icon_name) VALUES((SELECT pk_bint_id from main_category WHERE vchr_main_category_name = 'MASTER'),'PAYMENT','payment',6,'mdi mdi-cash-100');


insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Add Payment','Add Payment',1,false,'/payment/add',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'PAYMENT'));


insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Payment List','Payment List',2,false,'/payment/list',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'PAYMENT'));


--Receipt

INSERT INTO sub_category(fk_main_category_id,vchr_sub_category_name,vchr_sub_category_value,int_sub_category_order,vchr_icon_name) VALUES((SELECT pk_bint_id from main_category WHERE vchr_main_category_name = 'MASTER'),'RECEIPT','Receipt',7,'mdi mdi-library-books');


insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Add Receipt','Add Receipt',1,false,'/receipt/add',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'RECEIPT'));


insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Receipt List','Receipt List',2,false,'/receipt/list',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'RECEIPT'));


-- Purchase

insert into sub_category(vchr_sub_category_name,vchr_sub_category_value,int_sub_category_order,vchr_icon_name,fk_main_category_id) values('PURCHASE','group',6,'mdi mdi-account-multiple-outline',(SELECT pk_bint_id from main_category WHERE vchr_main_category_name = 'MASTER'));

insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('Add GRN','addgrn',1,false,'/purchase/purchase',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'PURCHASE'));

insert into menu_category(vchr_menu_category_name,vchr_menu_category_value,int_menu_category_order,bln_has_children,vchr_addurl,fk_sub_category_id) values('GRN List','grnlist',1,false,'/purchase/purchaselist',(SELECT pk_bint_id from sub_category WHERE vchr_sub_category_name = 'PURCHASE'));
