-- Insert users
INSERT INTO users(id, password) values(20521,'123');
INSERT INTO users(id, password) values(20522,'123');
INSERT INTO users(id, password) values(20523,'123');
INSERT INTO users(id, password) values(20524,'123');
INSERT INTO users(id, password) values(20525,'123');
INSERT INTO users(id, password) values(20526,'123');
INSERT INTO users(id, password) values(20527,'123');
INSERT INTO users(id, password) values(20528,'123');
INSERT INTO users(id, password) values(20529,'123');
INSERT INTO users(id, password) values(20530,'123');
INSERT INTO users(id, password) values(20531,'123');
INSERT INTO users(id, password) values(20532,'123');
INSERT INTO users(id, password) values(20534,'123');
INSERT INTO users(id, password) values(20535,'123');
INSERT INTO users(id, password) values(20536,'123');
INSERT INTO users(id, password) values(20537,'123');
INSERT INTO users(id, password) values(20538,'123');
INSERT INTO users(id, password) values(20539,'123');
INSERT INTO users(id, password) values(20540,'123');
INSERT INTO users(id, password) values(20541,'123'); 

INSERT INTO users(id, password) values(8081,'456');
INSERT INTO users(id, password) values(8082,'456');
INSERT INTO users(id, password) values(8083,'456');
INSERT INTO users(id, password) values(8084,'456');
INSERT INTO users(id, password) values(8085,'456');
INSERT INTO users(id, password) values(8086,'456');
INSERT INTO users(id, password) values(8087,'456');
INSERT INTO users(id, password) values(8088,'456');
INSERT INTO users(id, password) values(8089,'456');
INSERT INTO users(id, password) values(8090,'456');
INSERT INTO users(id, password) values(8091,'456');
INSERT INTO users(id, password) values(8092,'456');
INSERT INTO users(id, password) values(8093,'456');
INSERT INTO users(id, password) values(8094,'456');
INSERT INTO users(id, password) values(8095,'456');
INSERT INTO users(id, password) values(8096,'456');
INSERT INTO users(id, password) values(8097,'456');
INSERT INTO users(id, password) values(8098,'456');
INSERT INTO users(id, password) values(8099,'456');
INSERT INTO users(id, password) values(8100,'456');

 
INSERT INTO users(id, password) values(9900,'admin');
INSERT INTO users(id, password) values(9901,'admin');

-- insert subjects
INSERT INTO subjects(id, name, description) values(1001,'IT004', 'Fundamentals of Database Systems');
INSERT INTO subjects(name, description) values('IS201', 'Information System Analysis and Design');
INSERT INTO subjects(name, description) values('IS210', 'Database Manegment Systems');
INSERT INTO subjects(name, description) values('IT001', 'Introduction to Programming');
INSERT INTO subjects(name, description) values('MA006', 'Mathematical analysis');
INSERT INTO subjects(name, description) values('MA003', 'Linear Algebra');
INSERT INTO subjects(name, description) values('IS005', 'Introduction to Information Systems');
INSERT INTO subjects(name, description) values('MA005', 'Probability statistics');
INSERT INTO subjects(name, description) values('IS207', 'Website Application Developement');


-- insert questions
insert into questions(id) values(20000);
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1001","How many digits are there in Hindu-Arabic System?","10","20","30","40","1","80800001");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1001","What does 1 googol means?","1 followed by hundred zeros","1 followed by thousand zeros","1 followed by ten thousand zeros","1 followed by 1 lakh zeros","1","80800001");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1001","Among the following which natural number has no predecessor?","100","200","1","0","3","80800002");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1001","Among the following which whole number has no predecessor?","-1","0","1","e","2","80800003");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1001","An integer that is divisible by 2 is called:","Even number","Natural number","Odd number","Whole number","1","80800004");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1001","In which number system, there is no symbol for zero?","Hindu Arabic system","Roman","Egyptian","Mesopotamia","2","80800005");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1001","In Roman numerals M represents 1000, what does M represent?","10,000","50,000","10,000,000","500","3","80800006");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1001","What does D represent in Roman numeral system?","100","500","1000","50","2","80800006");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1002","Google (www.google.com) is a:","Search Engine","Number in Math","Directory of images","Chat service on the web","1","80800007");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1002","Which is not an Internet protocol?","HTTP","FTP","STP","IP","3","80800007");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1002","Which of the following is not a valid domain name?","www.yahoo.com","www.yahoo.co.uk","www.com.yahoo","www.yahoo.co.in","3","80800007");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1002","AOL stands for:","Arranged Outer Line","America Over LAN"," Audio Over LAN","America On-line","4","80800007");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1002","Another name for a computer chip is:","Execute","Micro chip","Microprocessor","Select","2","80800007");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1002","Where is the headquarters of Intel located?","Redmond, Washington","Tucson, Arizona","Santa Clara, California","Richmond, Virginia","3","80800007");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1002","What does EPROM stand for?","Electric Programmable Read Only Memory","Erasable Programmable Read Only Memory","Evaluable Philotic Random Optic Memory","Every Person Requires One Mind","2","80800007");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1002","In computer jargon, RAM refers to","Read Only Menu","Random Access Memory","Random Accent Memory","Read Access Memory","2","80800007");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1002","Which of the following is not a computer language?"," Windows 98","PASCAL","FORTRAN","C","1","80800007");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1002","What's a web browser?","A kind of spider","A computer that stores WWW files","A person who likes to look at websites"," A software program that allows you to access sites on the World Wide Web","4","80800007");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1003","How many bits is a byte?","4","8","16","32","2","80800009");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1003","How do you subscribe to an Internet mailing list?","Contact your Internet service provider","Send e-mail to the list manager","Telephone the mailing list webmaster","Send a letter to the list","2","80800009");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1003","Computers calculate numbers in what mode?","Decimal","Octal","Binary","None of the above","3","80800009");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1003","The speed of your net access is defined in terms of:","RAM","MHz","Kbps","Megabytes","3","80800008");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1003","Which of these is a search engine?","FTP","Google","Archie","ARPANET","2","80800008");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1003","What does CPU stand for?","Cute People United","Commonwealth Press Union","Computer Parts of USA","Central Processing Unit","4","80800008");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1003","Which of these is a valid e-mail address?","support.at.objectivebooks","www.objectivebooks.com","support@objectivebooks.com","support@objectivebooks","3","80800008");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1003","Modem stands for:","Modulator Demodulator","Monetary Devaluation Exchange Mechanism","Memory Demagnetization","Monetary Demarcation","1","80800008");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1003","What is the difference between the Internet and an intranet?","One is public, the other is private","One is safer than the other","One can be monitored, the other can't","None of the above","1","80800008");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1003","Your computer has gradually slowed down. What's the most likely cause?","Overheating","Your processor chip is just getting old","Adware/spyware is infecting your PC","You dropped a sandwich in your computer","3","80800008");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1004","A JPG is:","A Jumper Programmed Graphic","A format for an image file","A type of hard disk","A unit of measure for memory","2","80800010");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1004","A dual-layer DVD is valued because it:","Can hold more data","Contains a backup of the data stored","Uses a second layer to offer a speed increase","Creates alternative sound tracks","1","80800010");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1004","Another word for 'Graphics for a word processor'?","Peripheral","Clip art","Highlight","Execute","2","80800010");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1004","What Designates where the next action occurs?","Decode","Highlight","Select","Mother board","3","80800010");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1004","Which was an early mainframe computer?","ENIAC","UNIC","BRAINIA","FUNTRIA","1","80800010");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1004","RAM stands for:","Random Access Memory","Really Annoying Machine","Read A Manual","Real Absolute Memory","1","80800010");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1004","How can you catch a computer virus?","Sending e-mail messages","Using a laptop during the winter","Opening e-mail attachments","Shopping on-line","3","80800011");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1004","Which of these is not a computer?","Aptiva","Macintosh","Acorn","Paseo","4","80800011");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1004","The home page of a web site is:","The largest page","The last page","The first page","The most colorful page","3","80800011");
insert into questions(ID_sub,content,opt1,opt2,opt3,opt4,correct,created_by) values ("1004","HTML is used to:","Plot complicated graphs","Author Web Pages","Translate one language into another","Solve equations","2","80800011");

-- insert admin 
insert into admins (ID, name, phone, email) values ("9900", "Pham Van A","0956871234","9900@uit.edu.vn");
insert into admins (ID, name, phone, email) values ("9901", "Pham Van B","0956877434","9901@uit.edu.vn");

-- insert lecturers
insert into lecturers(id, name, phone, email) values(8081, 'Nguyen Van A1', '0380801000', 'uit80801@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8082, 'Nguyen Van A2', '0380802000', 'uit80802@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8083, 'Nguyen Van A3', '0380803000', 'uit80803@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8084,  'Nguyen Van A4',  '0380804000',  'uit80804@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8085,  'Nguyen Van A5',  '0380805000',  'uit80805@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8086,  'Nguyen Van A6',  '0380806000',  'uit80806@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8087,  'Nguyen Van A7',  '0380807000',  'uit80807@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8088,  'Nguyen Van A8',  '0380808000',  'uit80808@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8089,  'Nguyen Van A9',  '0380809000',  'uit80809@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8090, 'Nguyen Van A10', '0380810000',  'uit80810@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8091, 'Nguyen Van A11', '0380811000',  'uit80811@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8092, 'Nguyen Van A12', '0380812000',  'uit80812@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8093, 'Nguyen Van A13', '0380813000',  'uit80813@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8094, 'Nguyen Van A14', '0380814000',  'uit80814@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8095, 'Nguyen Van A15', '0380815000',  'uit80815@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8096, 'Nguyen Van A16', '0380816000',  'uit80816@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8097, 'Nguyen Van A17', '0380817000',  'uit80817@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8098, 'Nguyen Van A18', '0380818000',  'uit80818@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8099, 'Nguyen Van A19', '0380819000',  'uit80819@gm.uit.edu.vn');
insert into lecturers(id, name, phone, email) values(8100, 'Nguyen Van A20', '0380820000',  'uit80820@gm.uit.edu.vn');

-- Insert students
insert into students(id, name, phone, email) values(20521, 'Le Van A1', '0987632145', 'uit20521@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20522, 'Le Van A2', '0987632145', 'uit20522@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20523, 'Le Van A3', '0987632145', 'uit20523@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20524, 'Le Van A4', '0987632145', 'uit20524@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20525, 'Le Van A5', '0987632145', 'uit20525@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20526, 'Le Van A6', '0987632145', 'uit20526@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20527, 'Le Van A7', '0987632145', 'uit20527@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20528, 'Le Van A8', '0987632145', 'uit20528@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20529, 'Le Van A9', '0987632145', 'uit20529@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20530, 'Le Van A10', '0987632145', 'uit205210@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20531, 'Le Van A11', '0987632145', 'uit205211@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20532, 'Le Van A12', '0987632145', 'uit205212@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20533, 'Le Van A13', '0987632145', 'uit205213@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20534, 'Le Van A14', '0987632145', 'uit205214@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20535, 'Le Van A15', '0987632145', 'uit205215@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20536, 'Le Van A16', '0987632145', 'uit205216@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20537, 'Le Van A17', '0987632145', 'uit205217@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20538, 'Le Van A18', '0987632145', 'uit205218@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20539, 'Le Van A19', '0987632145', 'uit205219@gm.uit.edu.vn');
insert into students(id, name, phone, email) values(20540, 'Le Van A20', '0987632145', 'uit205220@gm.uit.edu.vn');

-- insert into class
insert into classes(ID, name, description, ID_lecturer, ID_subject) values(3001, 'IT004.HTCL.M11', null, 8081, 1001);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS201.HTCL.M11', null, 8081, 1002);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS210.HTCL.M11', null, 8081, 1003);
insert into classes(name, description, ID_lecturer, ID_subject) values('IT001.HTCL.M11', null, 8081, 1004);
insert into classes(name, description, ID_lecturer, ID_subject) values('MA006.HTCL.M11', null, 8081, 1005);

insert into classes(name, description, ID_lecturer, ID_subject) values('IT004.HTCL.M12', null, 8082, 1001);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS201.HTCL.M12', null, 8082, 1002);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS210.HTCL.M12', null, 8082, 1003);
insert into classes(name, description, ID_lecturer, ID_subject) values('IT001.HTCL.M12', null, 8082, 1004);
insert into classes(name, description, ID_lecturer, ID_subject) values('MA006.HTCL.M12', null, 8082, 1005);

insert into classes(name, description, ID_lecturer, ID_subject) values('IT004.HTCL.M13', null, 8083, 1001);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS201.HTCL.M13', null, 8083, 1002);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS210.HTCL.M13', null, 8083, 1003);
insert into classes(name, description, ID_lecturer, ID_subject) values('IT001.HTCL.M13', null, 8083, 1004);
insert into classes(name, description, ID_lecturer, ID_subject) values('MA006.HTCL.M13', null, 8083, 1005);

insert into classes(name, description, ID_lecturer, ID_subject) values('IT004.HTCL.M14', null, 8084, 1001);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS201.HTCL.M14', null, 8084, 1002);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS210.HTCL.M14', null, 8084, 1003);
insert into classes(name, description, ID_lecturer, ID_subject) values('IT001.HTCL.M14', null, 8084, 1004);
insert into classes(name, description, ID_lecturer, ID_subject) values('MA006.HTCL.M14', null, 8084, 1005);

insert into classes(name, description, ID_lecturer, ID_subject) values('IT004.HTCL.M15', null, 8085, 1001);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS201.HTCL.M15', null, 8085, 1002);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS210.HTCL.M15', null, 8085, 1003);
insert into classes(name, description, ID_lecturer, ID_subject) values('IT001.HTCL.M15', null, 8085, 1004);
insert into classes(name, description, ID_lecturer, ID_subject) values('MA006.HTCL.M15', null, 8085, 1005);

insert into classes(name, description, ID_lecturer, ID_subject) values('IT004.HTCL.M16', null, 8086, 1001);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS201.HTCL.M16', null, 8086, 1002);
insert into classes(name, description, ID_lecturer, ID_subject) values('IS210.HTCL.M16', null, 8086, 1003);
insert into classes(name, description, ID_lecturer, ID_subject) values('IT001.HTCL.M16', null, 8086, 1004);
insert into classes(name, description, ID_lecturer, ID_subject) values('MA006.HTCL.M16', null, 8086, 1005);

-- insert into exams;
insert into exams(id) values(4000);
insert into exams (ID_sub, name, created_by, numQues) values ("1001","Statistics_FinalExam","8081","9");

insert into exams (ID_sub, name, created_by, numQues) values ("1002","Fundamentals of Database Systems_FinalExam","8081","9");
insert into exams (ID_sub, name, created_by, numQues) values ("1003","OOP_FinalExam","8081","9");
insert into exams (ID_sub, name, created_by, numQues) values ("1004","Database Management_FinalExam","8081","9");


-- insert into exam_content
insert into exam_content values(4001, 20001);
insert into exam_content values(4001, 20002);
insert into exam_content values(4001, 20003);
insert into exam_content values(4001, 20004);
insert into exam_content values(4001, 20005);
insert into exam_content values(4001, 20006);
insert into exam_content values(4001, 20007);
insert into exam_content values(4001, 20008);
insert into exam_content values(4001, 20009);

insert into exam_content values(4002, 20011);
insert into exam_content values(4002, 20012);
insert into exam_content values(4002, 20013);
insert into exam_content values(4002, 20014);
insert into exam_content values(4002, 20015);
insert into exam_content values(4002, 20016);
insert into exam_content values(4002, 20017);
insert into exam_content values(4002, 20018);
insert into exam_content values(4002, 20019);

insert into exam_content values(4003, 20021);
insert into exam_content values(4003, 20022);
insert into exam_content values(4003, 20023);
insert into exam_content values(4003, 20024);
insert into exam_content values(4003, 20025);
insert into exam_content values(4003, 20026);
insert into exam_content values(4003, 20027);
insert into exam_content values(4003, 20028);
insert into exam_content values(4003, 20029);

insert into exam_content values(4004, 20031);
insert into exam_content values(4004, 20032);
insert into exam_content values(4004, 20033);
insert into exam_content values(4004, 20034);
insert into exam_content values(4004, 20035);
insert into exam_content values(4004, 20036);
insert into exam_content values(4004, 20037);
insert into exam_content values(4004, 20038);
insert into exam_content values(4004, 20029);

-- insert into exam_assign;
insert into exam_assign values("4001", "3001", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4001", "3002", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4001", "3003", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4001", "3004", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4001", "3005", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4001", "3006", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4001", "3007", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4001", "3008", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4001", "3009", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4001", "3010", "2022-06-16 00:00:00", "2022-06-24 00:00:00");

insert into exam_assign values("4002", "3001", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4002", "3002", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4002", "3003", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4002", "3004", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4002", "3005", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4002", "3006", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4002", "3007", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4002", "3008", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4002", "3009", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4002", "3010", "2022-06-16 00:00:00", "2022-06-24 00:00:00");

insert into exam_assign values("4003", "3001", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4003", "3002", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4003", "3003", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4003", "3004", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4003", "3005", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4003", "3006", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4003", "3007", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4003", "3008", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4003", "3009", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4003", "3010", "2022-06-16 00:00:00", "2022-06-24 00:00:00");

insert into exam_assign values("4004", "3001", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4004", "3002", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4004", "3003", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4004", "3004", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4004", "3005", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4004", "3006", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4004", "3007", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4004", "3008", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4004", "3009", "2022-06-16 00:00:00", "2022-06-24 00:00:00");
insert into exam_assign values("4004", "3010", "2022-06-16 00:00:00", "2022-06-24 00:00:00");

-- insert enrollment

insert into enrollment (ID_class,ID_student) values ("3001","20521");
insert into enrollment (ID_class,ID_student) values ("3002","20521");
insert into enrollment (ID_class,ID_student) values ("3003","20521");
insert into enrollment (ID_class,ID_student) values ("3004","20521");
insert into enrollment (ID_class,ID_student) values ("3005","20521");

insert into enrollment (ID_class,ID_student) values ("3001","20522");
insert into enrollment (ID_class,ID_student) values ("3002","20522");
insert into enrollment (ID_class,ID_student) values ("3003","20522");
insert into enrollment (ID_class,ID_student) values ("3004","20522");
insert into enrollment (ID_class,ID_student) values ("3005","20522");

insert into enrollment (ID_class,ID_student) values ("3001","20523");
insert into enrollment (ID_class,ID_student) values ("3002","20523");
insert into enrollment (ID_class,ID_student) values ("3003","20523");
insert into enrollment (ID_class,ID_student) values ("3004","20523");
insert into enrollment (ID_class,ID_student) values ("3005","20523");

insert into enrollment (ID_class,ID_student) values ("3001","20524");
insert into enrollment (ID_class,ID_student) values ("3002","20524");
insert into enrollment (ID_class,ID_student) values ("3003","20524");
insert into enrollment (ID_class,ID_student) values ("3004","20524");
insert into enrollment (ID_class,ID_student) values ("3005","20524");

insert into enrollment (ID_class,ID_student) values ("3001","20525");
insert into enrollment (ID_class,ID_student) values ("3002","20525");
insert into enrollment (ID_class,ID_student) values ("3003","20525");
insert into enrollment (ID_class,ID_student) values ("3004","20525");
insert into enrollment (ID_class,ID_student) values ("3005","20525");

insert into enrollment (ID_class,ID_student) values ("3006","20521");
insert into enrollment (ID_class,ID_student) values ("3007","20521");
insert into enrollment (ID_class,ID_student) values ("3008","20521");
insert into enrollment (ID_class,ID_student) values ("3009","20521");
insert into enrollment (ID_class,ID_student) values ("3010","20521");

insert into enrollment (ID_class,ID_student) values ("3006","20522");
insert into enrollment (ID_class,ID_student) values ("3007","20522");
insert into enrollment (ID_class,ID_student) values ("3008","20522");
insert into enrollment (ID_class,ID_student) values ("3009","20522");
insert into enrollment (ID_class,ID_student) values ("3010","20522");

insert into enrollment (ID_class,ID_student) values ("3006","20523");
insert into enrollment (ID_class,ID_student) values ("3007","20523");
insert into enrollment (ID_class,ID_student) values ("3008","20523");
insert into enrollment (ID_class,ID_student) values ("3009","20523");
insert into enrollment (ID_class,ID_student) values ("3010","20523");

insert into enrollment (ID_class,ID_student) values ("3006","20524");
insert into enrollment (ID_class,ID_student) values ("3007","20524");
insert into enrollment (ID_class,ID_student) values ("3008","20524");
insert into enrollment (ID_class,ID_student) values ("3009","20524");
insert into enrollment (ID_class,ID_student) values ("3010","20524");

insert into enrollment (ID_class,ID_student) values ("3006","20525");
insert into enrollment (ID_class,ID_student) values ("3007","20525");
insert into enrollment (ID_class,ID_student) values ("3008","20525");
insert into enrollment (ID_class,ID_student) values ("3009","20525");
insert into enrollment (ID_class,ID_student) values ("3010","20525");



-- insert feedback

insert into feedbacks(id, title, content, created_by, created_at, reply) values (5001,"Computer Problem","Computer 110 has problem","20521","2022-06-10 23:47:05","Processed");
insert into feedbacks(id, title, content, created_by, created_at, reply) values (5002,"Internet Problem","Room E2.04 can not connect to the Internet","20522","2022-06-10 23:48:06","Processed");
insert into feedbacks(id, title, content, created_by, created_at, reply) values (5003,"Facility Problem","Elavator has problem","20523","2022-06-10 21:41:01","Processed");