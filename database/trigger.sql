USE `onlineexamapp`;

ALTER TABLE `onlineexamapp`.`student_answer`
ADD id_student_exam INT;

CREATE TABLE IF NOT EXISTS `onlineexamapp`.`student_exams` (
  `id_student_exam` INT NOT NULL AUTO_INCREMENT,
  `id_student` INT NULL,
  `id_exam` INT NULL,
  'id_class' INT NULL,
  `score` DOUBLE NULL,
  PRIMARY KEY (`id_student_exam`))
ENGINE = InnoDB;

DELIMITER $$
USE `onlineexamapp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `onlineexamapp`.`student_answer_AFTER_INSERT` AFTER INSERT ON `student_answer` FOR EACH ROW
BEGIN
	declare v_number_q double;
    declare	v_score double;
    select count(*) into v_number_q 
    from exam_content where id_exam = NEW.id_exam;
		select (count(selection)/v_number_q)*10 into v_score
		from student_answer sa
		inner join questions q
		on sa.id_question = q.id
        where sa.id_student_exam = NEW.id_student_exam
        and selection = correct;
            update student_exams set score = v_score where id_student_exam = NEW.id_student_exam;
END$$

USE `onlineexamapp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `onlineexamapp`.`student_answer_AFTER_UPDATE` AFTER UPDATE ON `student_answer` FOR EACH ROW
BEGIN
	declare v_number_q double;
    declare	v_score double;
    select count(*) into v_number_q 
    from exam_content where id_exam = NEW.id_exam;
		select (count(selection)/v_number_q)*10 into v_score
		from student_answer sa
		inner join questions q
		on sa.id_question = q.id
        where sa.id_student_exam = NEW.id_student_exam
        and selection = correct;
            update student_exams set score = v_score where id_student_exam = NEW.id_student_exam;
END$$

USE `onlineexamapp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `onlineexamapp`.`student_answer_AFTER_DELETE` AFTER DELETE ON `student_answer` FOR EACH ROW
BEGIN
	declare v_number_q double;
    declare	v_score double;
    select count(*) into v_number_q 
    from exam_content where id_exam = OLD.id_exam;
		select (count(selection)/v_number_q)*10 into v_score
		from student_answer sa
		inner join questions q
		on sa.id_question = q.id
        where sa.id_student_exam = OLD.id_student_exam
        and selection = correct;
        update student_exams set score = v_score where id_student_exam = OLD.id_student_exam;
END;$$