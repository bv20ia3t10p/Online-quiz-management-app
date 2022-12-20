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
    $sql = 'insert into student_answer(ID_student,ID_exam,ID_class,selection,ID_question,id_student_exam) values (' . $_GET['insertAnswer'] . ',' . $_GET['idExam'] . ',' . $_GET['idClass'] .
        ',' . $_GET['sel'] . ',' . $_GET['idq'] . ',' . $_GET['idStudentExam'] . ')';
    $result = mysqli_query($con, $sql);
    echo $result;
}
if (isset($_GET['updFieldStu'])) {
    $sql = 'update students set ' . $_GET['updFieldStu'] . ' ="' . $_GET['newVal'] . '" where id = ' . $_GET['sid'];
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
if (isset($_GET['getScore'])) {
    $sql = 'select s.description as subjectDescription,
    c.name as className, max(score) as score
    from student_exams se 
    inner join classes c on se.id_class = c.id 
    inner join subjects s on c.id_subject = s.id
    where se.ID_student=' . $_GET['getScore'] . '
    group by s.description,c.name
    order by se.id_student_exam';
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
if (isset($_GET['newStudentExam'])) {
    $sql = 'insert into student_exams(id_student,id_class,id_exam)
    values (' . $_GET['idStu'] . ',' . $_GET['idClass'] . ',' . $_GET['idExam'] . ')';
    $result = mysqli_query($con, $sql);
    $sql = 'select id_student_exam from student_exams order by id_student_exam desc limit 1';
    $result = mysqli_query($con, $sql);
    echo json_encode(mysqli_fetch_object($result));
}

if (isset($_GET['getAllScore'])) {
    $sql = 'select s.description as subjectDescription,
    c.name as className, avg(score) as score
    from student_exams se
    inner join classes c on se.id_class = c.id
    inner join subjects s on c.id_subject = s.id
    where c.name in (' . $_GET['getAllScore'] . ')
    group by c.name
    order by field(c.name,' . $_GET['getAllScore'] . ')';
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

if (isset($_GET['getLecInfo'])) {
    $sql = 'select l.name as name, l.id as id, phone, email, c.id as classID, c.name as className, s.description as subject, avg(score) as classAvg, count(id_student_exam) as examNumbers
    , s.id as subjectID,s.name as subjectName from lecturers l 
    inner join classes c on l.id = c.ID_lecturer
    inner join subjects s on c.ID_subject = s.ID
    left join student_exams se on c.id = se.id_class 
    where l.id =' . $_GET['getLecInfo'] . '
    group by l.name, l.id, phone, email, c.id, c.name, s.description,s.id;';
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

if (isset($_GET['getExamsListByClass'])) {
    $sql = 'select ea.id_class, c.name as className, ea.id_exam
    from exam_assign ea
    inner join classes c
    on c.id = ea.ID_class
    inner join lecturers l on c.ID_lecturer = l.ID
    where l.id =' . $_GET['getExamsListByClass'];
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

if (isset($_GET['getExamsCreatedBy'])) {
    $sql = 'select e.id as examId,e.name as name,s.name as subjectName, s.id as subjectID from exams e
    inner join subjects s on e.id_sub = s.id
    where created_by = ' . $_GET['getExamsCreatedBy'];
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

if (isset($_GET['insertNewExamAssign'])) {
    $sql = 'insert into exam_assign (id_class,id_exam) values (' . $_GET['insertNewExamAssign'] . ',' . $_GET['idexam'] . ');';
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    echo $result;
}

if (isset($_GET['deleteExamAssign'])) {
    $sql = 'Delete from exam_assign where id_class = ' . $_GET['deleteExamAssign'] .
        ' and id_exam=' . $_GET['idexam'];
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    echo $result;
}

if (isset($_GET['deleteCreatedExam'])) {
    $sql = 'Delete from exam_assign where id_exam = '
        . $_GET['deleteCreatedExam'];
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    $sql = 'Delete from exams where id = ' . $_GET['deleteCreatedExam'];
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    echo $result;
}

if (isset($_GET['getAllSubjects'])) {
    $sql = 'Select * from subjects';
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
if (isset($_GET['insertNewExam'])) {
    $sql = 'insert into exams (name,id_sub,created_by) values ("' . $_GET['insertNewExam'] . '",' . $_GET['idsubject'] . ',' . $_GET['created_by'] . ')';
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    echo $result;
}
if (isset($_GET['getListOfQuestionsFor'])) {
    $sql = 'select q.id,content,opt1,opt2,opt3,opt4,correct,q.created_by
    from questions q 
    inner join subjects s 
    on q.id_sub = s.id
    right join exams e 
    on e.id_sub = s.id
    where e.ID =' . $_GET['getListOfQuestionsFor'] . '
    and q.id not in (
        select id_question
        from exam_content ec
        where ec.ID_exam = ' . $_GET['getListOfQuestionsFor'] . ' );';
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
if (isset($_GET['getListOfAssignedQuestionsFor'])) {
    $sql = 'select q.id,content,opt1,opt2,opt3,opt4,correct,q.created_by
    from questions q 
    inner join exam_content ec 
    on ec.id_question = q.id
    where ec.ID_exam =' . $_GET['getListOfAssignedQuestionsFor'];
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
if (isset($_GET['deleteQuestionFromExam'])) {
    $sql = 'delete from exam_content where id_exam = ' . $_GET['deleteQuestionFromExam'] .
        ' and id_question =' . $_GET['questionToDelete'];
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    echo $result;
}
if (isset($_GET['assignNewQuestionToExam'])) {
    $sql = 'insert into exam_content 
    (id_exam,id_question) 
    values (' . $_GET['assignNewQuestionToExam'] . ',
    ' . $_GET['questionToAssign'] . ');';
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    echo $result;
}

if (isset($_GET['getAvailableQuestionsInDbForSubject'])) {
    $sql = 'select ID as questionID, content, opt1,opt2,opt3,opt4,correct, created_by as createdBy
    from questions
    WHERE ID not in (
        select ID
        from questions
        where created_by = ' . $_GET['lecID'] . ') and id_sub = ' . $_GET['getAvailableQuestionsInDbForSubject'];
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
if (isset($_GET['getCreatedQuestionsInDbForSubject'])) {
    $sql = 'select ID as questionID, content, opt1,opt2,opt3,opt4,correct
    from questions
    WHERE created_by = ' . $_GET['lecID'] . ' 
    and id_sub = ' . $_GET['getCreatedQuestionsInDbForSubject'];
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
if (isset($_GET['updateQuestionCreatedByLecturer'])) {
    $sql = 'update questions set
     content=' . $_GET['content'] .
        ' ,opt1=' . $_GET['opt1'] .
        ' ,opt2=' . $_GET['opt2'] .
        ' ,opt3=' . $_GET['opt3'] .
        ' ,opt4=' . $_GET['opt4'] .
        ' ,correct=' . $_GET['correct'] .
        ' where id = ' . $_GET['updateQuestionCreatedByLecturer'];
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    echo $result;
}

if (isset($_GET['deleteQuestionCreatedByLecturer'])) {
    $sql = 'delete from questions where id = ' . $_GET['deleteQuestionCreatedByLecturer'];
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    echo $result;
}
if (isset($_GET['addNewQuestionCreatedByLec'])) {
    $sql = 'insert into questions (content,opt1,opt2,opt3,opt4,correct,created_by,id_sub)
    values (' . $_GET['addNewQuestionCreatedByLec']
        . ',' . $_GET['opt1'] . ',' . $_GET['opt2'] . ','
        . $_GET['opt3'] . ',' . $_GET['opt4'] . ',' . $_GET['correct']
        . ',' . $_GET['idLecturer'] . ',' . $_GET['idSubject'] . ')';
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    echo $result;
}
if (isset($_GET['getScoreForClass'])) {
    $sql = 'select id_student_exam,id_student,st.name as stuName,id_exam,e.name,score
    from student_exams se 
    left join students st on se.id_student = st.id
    left join exams e on e.ID = se.id_exam
    where id_class = ' . $_GET['getScoreForClass'];
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
if (isset($_GET['getStudentExamAnswersFor'])) {
    $sql = 'select q.id, content,selection, 
	case
    	when selection = 1 then opt1
        when selection = 2 then opt2
        when selection = 3 then opt3
        when selection = 4 then opt4
        else ' . '"Not selected"' . '
    end as answer
from student_exams sta
left join student_answer sa on sta.id_student_exam = sa.id_student_exam
left join questions q on sa.id_question = q.id
where sta.id_student_exam = ' . $_GET['getStudentExamAnswersFor'];
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

if (isset($_GET['getStudentExamAdjustHistoryFor'])) {
    $sql = 'select id_score_adjustment,score,reason,adjuster
    from score_adjustment
    where ID_student_exam = ' . $_GET['getStudentExamAdjustHistoryFor'];
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

if (isset($_GET['adjustExamScoreFor'])) {
    $sql = 'insert into score_adjustment (id_student_exam,score,reason,adjuster) values ('
        . $_GET['adjustExamScoreFor'] . ',' . $_GET['newScore'] . ',' . $_GET['reason'] . ',' . $_GET['by'] . ')';
    $result = mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    echo $result;
}

$con->close();
