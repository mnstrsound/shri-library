import {Student} from './Student';

export class Mentor {
    constructor(person) {
        this.id = person.id;
        this.shri = person.shri;
        this.name = person.name;
        this.priorities = [];
        this.students = [];
    }

    addStudent(student) {
        if (!student instanceof Student) {
            throw new Error('Парметр должен быть типа Студент!');
        }
        this.students.push(student);
    }

    getStudents() {
        return this.students;
    }

    getPriorities() {
        return this.priorities;
    }

    getFreePriorities() {
        let students = this.shri.getStudents();
        let currentStudents = this.getPriorities();
        let freeStudents = [];

        for (let i = 0, len = students.length; i < len; i++) {
            if (currentStudents.indexOf(students[i]) == -1) {
                freeStudents.push(students[i]);
            }
        }
        return freeStudents;
    }

    setPriority(student) {
        if (!student instanceof Student) {
            throw new Error('Параметр должен быть типа Студент!');
        }
        this.priorities.push(student);
    }

    setPriorities(students) {
        students.forEach((student) => {
            this.setPriority(student);
        });
    }
}