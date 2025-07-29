teachers

| id  | surname |
| --- | ------- |
| 1   | Петров  |
| 2   | Иванов  |
| 3   | Сидоров |
| 4   | Пупкин  |
| 5   | Санин   |

lessons

| id  | title          | teacher_id |
| --- | -------------- | ---------- |
| 1   | математика     | 1          |
| 2   | информатика    | 1          |
| 3   | русский        | 2          |
| 4   | литература     | 2          |
| 5   | физра          | 3          |
| 6   | ОБЖ            | 4          |
| 7   | труд           | 4          |
| 8   | обществознание | NULL       |


## INNER JOIN

SELECT teachers.surname, lessons.title FROM teachers INNER JOIN lessons ON teachers.id = lessons.teacher_id;


| surname | title       |
| ------- | ----------- |
| Петров  | математика  |
| Петров  | информатика |
| Иванов  | русский     |
| Иванов  | литература  |
| Сидоров | физра       |
| Пупкин  | ОБЖ         |
| Пупкин  | труд        |


## LEFT OUTER JOIN

SELECT teachers.surname, lessons.title FROM teachers LEFT OUTER JOIN lessons ON teachers.id = lessons.teacher_id;

| surname | title       |
| ------- | ----------- |
| Петров  | математика  |
| Петров  | информатика |
| Иванов  | русский     |
| Иванов  | литература  |
| Сидоров | физра       |
| Пупкин  | ОБЖ         |
| Пупкин  | труд        |
| Санин   | NULL        |

## RIGHT OUTER JOIN

SELECT teachers.surname, lessons.title FROM teachers RIGHT OUTER JOIN lessons ON teachers.id = lessons.teacher_id;

| surname | title          |
| ------- | -------------- |
| Петров  | математика     |
| Петров  | информатика    |
| Иванов  | русский        |
| Иванов  | литература     |
| Сидоров | физра          |
| Пупкин  | ОБЖ            |
| Пупкин  | труд           |
| NULL    | обществознание |

## FULL OUTER JOIN

SELECT teachers.surname, lessons.title FROM teachers FULL OUTER JOIN lessons ON teachers.id = lessons.teacher_id;

| surname | title          |
| ------- | -------------- |
| Петров  | математика     |
| Петров  | информатика    |
| Иванов  | русский        |
| Иванов  | литература     |
| Сидоров | физра          |
| Пупкин  | ОБЖ            |
| Пупкин  | труд           |
| Санин   | NULL           |
| NULL    | обществознание |
