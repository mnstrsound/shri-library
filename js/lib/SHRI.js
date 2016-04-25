import {Student} from './Student';
import {Mentor} from './Mentor';
import {Team} from './Team';
import {IndividualTask} from './IndividualTask';
import {TeamTask} from './TeamTask';

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
        this.sorted = false;
    }

    /*Методы для создания сущностей*/
    addStudent(person) {
        if (this.sorted) {
            throw new Error('Невозможно добавить студента, так как школа уже отсортирована!');
        }
        person.id = this.uniqueStudentId++;
        person.shri = this;
        let student = new Student(person);
        this.students.push(student);
        return student;
    }

    addMentor(person) {
        if (this.sorted) {
            throw new Error('Невозможно добавить ментора, так как школа уже отсортирована!');
        }
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

    addTask(type, task) {
        task.id = this.uniqueTaskId++;
        task.shri = this;
        if (type == 'individual') {
            task = new IndividualTask(task);
        } else if (type == 'team') {
            task = new TeamTask(task);
        } else {
            throw new Error('Тип должен быть либо Индивидуальный либо Командный!');
        }
        this.tasks.push(task);
        return task;
    }

    /*Методы для получения массивов сущностей*/
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
            if (task.type.slug === type) {
                tasks.push(task);
            }
        });
        return tasks;
    }

    getIndividualTasks() {
        return this._getTasksByType('individual');
    }

    getTeamTasks() {
        return this._getTasksByType('team');
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

    /*
    * Валидация перед сортировкой
    * */
    _validateBeforeSorting() {
        if (this.sorted ) {
            throw new Error('Школа уже отсортирована!');
        }
        let mentors = this.getMentors();
        let students = this.getStudents();
        let mentorsCount = mentors.length;
        let studentsCount = students.length;

        for (let i = 0, len = mentorsCount; i < len; i++) {
            if (mentors[i].getPriorities().length < studentsCount) {
                throw new Error (`У ментора ${mentors[i].name} не до конца проставлены приоритеты!`);
            }
        }
        for (let i = 0, len = studentsCount; i < len; i++) {
            if (students[i].getPriorities().length < mentorsCount) {
                throw new Error(`У студента ${students[i].name} не до конца проставлены приоритеты!`);
            }
        }
    }

    sortByPriorities() {
        this._validateBeforeSorting();
        
        /*
        * Создаем массивы свободных к распределению студентов и менторов.
        * */
        let freeStudents = this.getStudents().slice(0);
        let freeMentors = this.getMentors().slice(0);

        /*
        * Запускаем цикл по распредению студентов среди менторов
        * */

        while (freeStudents.length > 0) {
            mentorsIterator: for (let i = 0, len = freeMentors.length; i < len; i++) {
                let mentor = freeMentors[i];
                /*
                * Если количество студентов не кратно количеству ментору, то у одного ментора или у нескольких менторов
                * должно быть на 1 студента больше, и мы должны поволить ему/им набрать еще одного, если у них совпадают приориеты.
                 * maxCount - максимальное количество студентов, которое может набрать ментор.
                 * maxStudentsCount - максимальное количество студентов, которое может набрать ментор за итерацию.
                * */
                let maxCount = freeStudents.length % freeMentors.length == 0 ? freeStudents.length / freeMentors.length : parseInt(freeStudents.length / freeMentors.length) + 1;
                let maxStudentsCount = maxCount - mentor.getStudents().length;

                for (let i = 0, len = mentor.priorities.length; i < len; i++) {
                    let priority = mentor.priorities[i];

                    /*
                    * Если ментор набрал максимальное количество студентов,
                    * то удалем его из свободных к распределению менторов, удаляем его из
                    * списка приоритета остальных участников, чтобы он больше
                    * не учавствовал в сортировке и прерываем цикл по метке, так как изменилась длина массива().
                    * TODO: Оптимизировать цикл, без прерывания по метке.
                    * */
                    if (mentor.getStudents().length >= maxStudentsCount) {
                        freeMentors.splice(freeMentors.indexOf(mentor), 1);
                        freeStudents.forEach((student) => {
                            if (student.priorities.indexOf(mentor) !== -1) {
                                student.priorities.splice(student.priorities.indexOf(mentor), 1);
                            }
                        });
                        break mentorsIterator;
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
        this.sorted = true;
    }
}
