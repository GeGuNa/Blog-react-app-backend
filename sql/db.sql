create type gndr as ENUM  ('male','female','secret');

CREATE TABLE Persons (
id  bigserial  PRIMARY KEY, 
regtime  bigint,
last_visit	bigint,
onlinet	bigint,
name  text,
surn  text,
nick  text,
gender  gndr default 'secret'
); 


CREATE TABLE Category (
id  bigserial  PRIMARY KEY, 
name  text unique,
subcat  text,
type  text
); 



CREATE TABLE Posts (
id  bigserial  PRIMARY KEY, 
title  text,
desct  text,
message  text,
views bigint,
likes bigint,
when_posted bigint,
customer bigint references Persons(id),
cat bigint references Category(id)
); 
