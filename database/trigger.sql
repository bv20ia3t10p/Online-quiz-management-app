USE `onlineexamapp`;

ALTER TABLE
    `onlineexamapp`.`student_answer`
ADD
    id_student_exam INT;

CREATE TABLE IF NOT EXISTS `onlineexamapp`.`student_exams` (
    `id_student_exam` INT NOT NULL AUTO_INCREMENT,
    `id_student` INT NULL,
    `id_exam` INT NULL,
    'id_class' INT NULL,
    `score` DOUBLE NULL,
    PRIMARY KEY (`id_student_exam`)
) ENGINE = InnoDB;

DELIMITER $ $ USE `onlineexamapp` $ $ CREATE DEFINER = CURRENT_USER TRIGGER `onlineexamapp`.`student_answer_AFTER_INSERT`
AFTER
INSERT
    ON `student_answer` FOR EACH ROW BEGIN declare v_number_q double;

declare v_score double;

select
    count(*) into v_number_q
from
    exam_content
where
    id_exam = NEW.id_exam;

select
    (count(selection) / v_number_q) * 10 into v_score
from
    student_answer sa
    inner join questions q on sa.id_question = q.id
where
    sa.id_student_exam = NEW.id_student_exam
    and selection = correct;

update
    student_exams
set
    score = v_score
where
    id_student_exam = NEW.id_student_exam;

END $ $ USE `onlineexamapp` $ $ CREATE DEFINER = CURRENT_USER TRIGGER `onlineexamapp`.`student_answer_AFTER_UPDATE`
AFTER
UPDATE
    ON `student_answer` FOR EACH ROW BEGIN declare v_number_q double;

declare v_score double;

select
    count(*) into v_number_q
from
    exam_content
where
    id_exam = NEW.id_exam;

select
    (count(selection) / v_number_q) * 10 into v_score
from
    student_answer sa
    inner join questions q on sa.id_question = q.id
where
    sa.id_student_exam = NEW.id_student_exam
    and selection = correct;

update
    student_exams
set
    score = v_score
where
    id_student_exam = NEW.id_student_exam;

END $ $ USE `onlineexamapp` $ $ CREATE DEFINER = CURRENT_USER TRIGGER `onlineexamapp`.`student_answer_AFTER_DELETE`
AFTER
    DELETE ON `student_answer` FOR EACH ROW BEGIN declare v_number_q double;

declare v_score double;

select
    count(*) into v_number_q
from
    exam_content
where
    id_exam = OLD.id_exam;

select
    (count(selection) / v_number_q) * 10 into v_score
from
    student_answer sa
    inner join questions q on sa.id_question = q.id
where
    sa.id_student_exam = OLD.id_student_exam
    and selection = correct;

update
    student_exams
set
    score = v_score
where
    id_student_exam = OLD.id_student_exam;

END;

$ $ CREATE TABLE IF NOT EXISTS `onlineexamapp`.`score_adjustment` (
    `id_score_adjustment` INT NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(1000) NULL,
    `id_student_exam` INT NULL,
    `adjuster` INT NULL,
    `score` DOUBLE NULL,
    PRIMARY KEY (`id_score_adjustment`)
) ENGINE = InnoDB;

DELIMITER $ $ USE `onlineexamapp` $ $ CREATE DEFINER = CURRENT_USER TRIGGER `onlineexamapp`.`score_adjustment_AFTER_INSERT`
AFTER
INSERT
    ON `score_adjustment` FOR EACH ROW BEGIN
update
    student_exams
set
    score = NEW.score
where
    id_student_exam = NEW.id_student_exam;

END;

$ $ DELIMITER $ $ USE `onlineexamapp` $ $ CREATE DEFINER = CURRENT_USER TRIGGER `onlineexamapp`.`score_adjustment_AFTER_UPDATE`
AFTER
UPDATE
    ON `score_adjustment` FOR EACH ROW BEGIN
update
    student_exams
set
    score = NEW.score
where
    id_student_exam = NEW.id_student_exam;

END;

DELIMITER $ $ USE `onlineexamapp` $ $ CREATE DEFINER = CURRENT_USER TRIGGER `onlineexamapp`.`score_adjustment_AFTER_DELETE`
AFTER
    DELETE ON `score_adjustment` FOR EACH ROW BEGIN declare v_number_q double;

DECLARE v_older_score DOUBLE;

select
    count(distinct id_question) into v_number_q
from
    exam_content ec
    right join student_exams se on ec.ID_exam = se.id_exam
where
    se.id_student_exam = OLD.id_student_exam;

SELECT
    score into v_older_score
from
    score_adjustment
where
    id_student_exam = old.id_student_exam
order by
    id_score_adjustment desc
limit
    1;

IF v_older_score IS NULL THEN
select
    (count(*) / v_number_q) * 10 INTO v_older_score
from
    student_answer sa
    inner join questions q on sa.id_question = q.id
where
    selection = correct
    and sa.id_student_exam = OLD.id_student_exam;

end if;

update
    student_exams
set
    score = v_older_score
WHERE
    id_student_exam = old.id_student_exam;

END;