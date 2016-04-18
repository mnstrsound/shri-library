import {Student} from 'Student';
import {Mentor} from 'Mentor';
import {IndividualTask} from 'IndividualTask';
import {TeamTask} from 'TeamTask';
import {Team} from 'Team';
import {Task} from 'Task';

export class SHRI {
    constructor() {
        this.students = [];
        this.mentors = [];
        this.teams = [];
        this.tasks = [];
        this.uniqueStudentId = 0;
        this.uniqueMentorId = 0;
        this.uniqueTeamId = 0;
        this.uniqueTaskId = 0;
    }

    /*Методы для создания сущностей*/
    addStudent(person) {
        person.id = this.uniqueStudentId++;
        person.shri = this;
        let student = new Student(person);
        this.students.push(student);
        return student;
    }

    addMentor(person) {
        person.id = this.uniqueMentorId++;
        person.shri = this;
        let mentor = new Mentor(person);
        this.mentors.push(mentor);
        return mentor;
    }

    addTeam(team) {
        team.id = this.uniqueTeamId++
        team.shri = this;
        team = new Team(team);
        this.teams.push(team);
        return team;
    }

    addTask(task) {
        task.id = this.uniqueTaskId++;
        task.shri = this;
        task = new Task(task);
        this.tasks.push(task);
        return task;
    }

    /*Методы для получения массивов сущнстей*/
    getStudents() {
        return this.students;
    }

    getMentors() {
        return this.mentors;
    }

    getTeams() {
        return this.teams;
    }

    getTasks() {
        return this.tasks;
    }

    _getTasksByType(type) {
        let tasks = [];
        this.tasks.forEach((task) => {
            if (task.type === type) {
                tasks.push(task);
            }
        });
        return tasks;
    }

    getIndividualTasks() {
        return this._getTasksByType(0);
    }

    getTeamTasks() {
        return this._getTasksByType(1);
    }

    getTasksTypes() {
        return [{id: 0, name: 'Индивидуальная'},{id: 1, name: 'Командная'}]
    }

    findByName(type, name) {
        if (type !== 'mentors' && type !== 'students') return;
        let founded = [];
        this[type].forEach((person) => {
           if (person.name === name) {
               founded.push(person);
           }
        });
        return founded;
    }

    sortByPriorities() {
        /*
        * Создаем массивы свободных к распределению студентов и менторов
        * */
        let freeStudents = this.getStudents().slice(0);
        let freeMentors = this.getMentors().slice(0);
        /*
        * Запускаем цикл по распредению студентов среди менторов
        * */
        while (freeStudents.length > 0) {
            for (let i = 0, len = freeMentors.length; i < len; i++) {
                let mentor = this.mentors[i];
                let maxStudentsCount = 3;

                for (let i = 0, len = mentor.priorities.length; i < len; i++) {
                    let priority = mentor.priorities[i];

                    /*
                    * Если ментор набрал максимальное количество студентов,
                    * то удалем его из свободных к распределению менторов, удаляем его из
                    * списка приоритета остальных участников, чтобы он больше
                    * не учавствал в сортировке и прерываем цикл.
                    * */
                    if (mentor.getStudents().length >= maxStudentsCount) {
                        freeMentors.splice(freeMentors.indexOf(mentor), 1);
                        freeStudents.forEach((student) => {
                            if (student.priorities.indexOf(mentor) !== -1) {
                                student.priorities.splice(student.priorities.indexOf(mentor), 1);
                            }
                        });
                        break;
                    }
                    /*Если первый по приоритету ментор студента совпадает со сравниваемым ментором и
                    * студент находится в списке свободных к распределению,
                    * то добавляем ментору студена, удаляем ментора из списка приоритетов студента,
                    * добавляем студенту ментора, удаляем студента из списка свободных к распределению студентов.
                    * */
                    if (priority.priorities[0] === mentor && freeStudents.indexOf(priority) !== -1) {
                        mentor.addStudent(priority);
                        priority.priorities.splice(0, 1);
                        priority.setMentor(mentor);
                        freeStudents.splice(freeStudents.indexOf(priority), 1);
                    }
                }
            }
        }
    }
}
/*Закомментировал удаление студентов и менторов*/
// removeStudent(student) {
//     let index = this.students.indexOf(student);
//     if (index === -1) return;
//     this.students.splice(index, 1);
// }
//
// removeMentor(mentor) {
//     let index = this.mentors.indexOf(mentor);
//     if (index === -1) return;
//     this.mentors.splice(index, 1);
// }

// freeMentors.forEach((mentor) => {
//     let maxStudentsCount = 3;
//     mentor.priorities.every((priority) => {
//         if (mentor.getStudents().length >= maxStudentsCount) {
//             freeMentors.splice(freeMentors.indexOf(mentor), 1);
//             freeStudents.forEach((student) => {
//                 if (student.priorities.indexOf(mentor) !== -1) {
//                     student.priorities.splice(student.priorities.indexOf(mentor), 1);
//                 }
//             });
//             return false;
//         }
//         if (priority.priorities[0] === mentor && freeStudents.indexOf(priority) !== -1) {
//             mentor.students.push(priority);
//             priority.priorities.splice(0, 1);
//             priority.setMentor(mentor);
//             freeStudents.splice(freeStudents.indexOf(priority), 1);
//         }
//     });
// });
