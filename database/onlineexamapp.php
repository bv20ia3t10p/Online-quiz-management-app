<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
$host = "localhost";
$user = "root";
$password = "";
$dbname = "onlineexamapp";
$id = "";
$con = mysqli_connect($host, $user, $password, $dbname);
// $method = $_SERVER['REQUEST_METHOD'];
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
// switch ($method) {
//     case 'GET':
//       $sql = "select * from employee"; 
//       break;
// }
// run SQL statement
// die if SQL statement failed

if (isset($_GET['uid'])) {
    $sql = 'select * from users where id = ' . $_GET["uid"] . " and password =" . $_GET["pw"];
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
    }
}

if (isset($_GET['getStu'])) {
    $sql = 'select * from students where id = ' . $_GET["getStu"];
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
    }
}

if (isset($_GET['getClass'])) {
    $sql = 'select e.ID_class as ID_class,c.name as className,
    l.name as lecturerName,s.name as subjectName,s.description 
    from enrollment e 
    inner join classes c on e.ID_class = c.id 
    inner join lecturers l on c.ID_lecturer = l.id 
    inner join subjects s on c.ID_subject = s.id 
    where e.id_student = ' . $_GET['getClass'];
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    if (!$id) echo '[';
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
}

if (isset($_GET['fetchExam'])) {
    $sql = 'select e.id_exam,q.id as id_question, content,opt1,opt2,opt3,opt4
    from (
        select id_exam 
        from exam_assign 
        where exam_assign.ID_class = ' . $_GET['fetchExam'] . ' 
        order by rand() limit 1) e 
    inner join exam_content ec on e.id_exam = ec.ID_exam
    inner join questions q on q.id = ec.ID_question
    order by rand(' . $_GET['seed'] . ')';
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    if (!$id) echo '[';
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
}

if (isset($_GET['insertAnswer'])) {
    $sql = 'insert into student_answer(ID_student,ID_exam,ID_class,selection,ID_question) values (' . $_GET['insertAnswer'] . ',' . $_GET['idExam'] . ',' . $_GET['idClass'] .
        ',' . $_GET['sel'] . ',' . $_GET['idq'] . ');';
    $result = mysqli_query($con, $sql);
    echo $sql;
}
if (isset($_GET['updFieldStu'])) {
    $sql = 'update students set ' . $_GET['updFieldStu'] . ' =' . $_GET['newVal'] . ' where id = ' . $_GET['sid'];
    $result = mysqli_query($con, $sql);
    echo $result;
}

if (isset($_GET['getAllClasses'])) {
    $sql = 'select c.ID as classID, c.name as className, c.ID_lecturer as lecturerID,
    l.name as lecturerName, s.name as subjectName, s.description as subjectDescription
    from classes c
    inner join lecturers l on c.ID_lecturer = l.ID
    inner join subjects s on c.ID_subject = s.ID;';
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    if (!$id) echo '[';
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
}
if (isset($_GET['getSingleClass'])) {
    $sql = 'select c.ID as classID, c.name as className, c.ID_lecturer as lecturerID,
    l.name as lecturerName, s.name as subjectName, s.description as subjectDescription
    from classes c
    inner join lecturers l on c.ID_lecturer = l.ID
    inner join subjects s on c.ID_subject = s.ID
    where c.ID = "' . str_replace('_', ' ', $_GET['getSingleClass']) . '" or
    c.name= "' . str_replace('_', ' ', $_GET['getSingleClass']) . '" or
    l.ID = "' . str_replace('_', ' ', $_GET['getSingleClass']) . '" or
    l.name= "' . str_replace('_', ' ', $_GET['getSingleClass']) . '" or
    s.name = "' . str_replace('_', ' ', $_GET['getSingleClass']) . '" or
    s.description = "' . str_replace('_', ' ', $_GET['getSingleClass']) . '";
    ';
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    if (!$id) echo '[';
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
}
if (isset($_GET['insertEnrollStu'])) {
    $sql = 'insert into enrollment values (' . $_GET['class'] . ',' . $_GET['insertEnrollStu'] . ');';
    $result = mysqli_query($con, $sql);
    if ($result) {
        echo 'succeed';
    } else die(mysqli_error($con));
}

if (isset($_GET['removeClassEnrollment'])) {
    $sql = 'delete from enrollment where id_class=' . $_GET['removeClassEnrollment'] . ' and id_student =' . $_GET['stu'];
    $result = mysqli_query($con, $sql);
    if ($result) {
        echo 'succeed';
    } else die(mysqli_error($con));
}

// if (!$id) echo '[';
// for ($i = 0; $i < mysqli_num_rows($result); $i++) {
//     echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
// }
// if (!$id) echo ']';
$con->close();
