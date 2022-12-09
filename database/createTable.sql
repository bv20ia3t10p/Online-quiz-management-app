create database OnlineExamApp;
use onlineexamapp;

create table users(
	ID INT primary key,
    password varchar(50)
);

create table lecturers(
	ID INT primary key,
    name varchar(50) not null,
    phone varchar(13),
    email varchar(100) not null
);

create table students(
	ID INT primary key,
    name varchar(50) not null,
    phone varchar(13),
    email varchar(100) not null
);

create table admins(
	ID INT primary key,
    name varchar(50) not null,
    phone varchar(13),
    email varchar(100) not null
);

create table subjects(
	ID INT primary key auto_increment,
    name varchar(50) unique, 
    description text
); 


create table exams(
	ID INT primary key auto_increment, 
    ID_sub INT,
    name varchar(50),
    created_by INT,
    numQues INT
);

create table exam_content(
	ID_exam INT not null,
    ID_question INT not null,
    primary key(ID_exam, ID_question)
); 

create table questions (
	ID INT primary key auto_increment,
	ID_sub INT,
    content text,
    opt1 text,
    opt2 text, 
    opt3 text, 
    opt4 text, 
    correct int,
    created_by int,
    constraint check_answer check (correct >= 1 and correct <= 4)
);

create table exam_assign(
	ID_exam INT not null,
    ID_class INT not null,
    start_at DATETIME,
    end_at datetime,
    primary key (ID_exam, ID_class)
);
create table classes(
	ID INT primary key auto_increment,
    name varchar (50) not null,
    description text, 
    ID_lecturer INT,
    ID_subject INT
);

create table student_answer(
id int auto_increment primary key,
	ID_student INT not null,
    ID_exam INT not null,
    ID_class INT not null, 
    selection INT,
ID_question int not null
);

create table enrollment(
	ID_class INT not null, 
    ID_student INT not null,
    primary key(ID_class, ID_student)
);

create table feedbacks(
	id int primary key,
    title text not null,
    content text not null,
    created_by int,
    created_at datetime,
    reply text
);