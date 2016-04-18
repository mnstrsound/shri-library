window.onload = () => {

    let Shri = new SHRI();

    let student1 = Shri.addStudent('Вася Иванов');
    let student2 = Shri.addStudent('Егор Пупков');
    let student3 = Shri.addStudent('Изя Кукарин');
    let student4 = Shri.addStudent('Мося Валенков');
    let student5 = Shri.addStudent('Веня Пупыркин');

    let mentor1 = Shri.addMentor('Вячеслав Евгеньевич');
    let mentor2 = Shri.addMentor('Игорь Курманович');

    student1.priorities = [mentor1, mentor2];
    student2.priorities = [mentor2, mentor1];
    student3.priorities = [mentor1, mentor2];
    student4.priorities = [mentor2, mentor1];
    student5.priorities = [mentor1, mentor2];

    mentor1.priorities = [student1, student2, student3, student4, student5];
    mentor2.priorities = [student1, student2, student3, student4, student5];
    console.log(Shri);
    Shri.sortStudents();
};