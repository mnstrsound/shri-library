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

    setPriority(student) {
        if (!student instanceof Student) {
            throw new Error('Парметр должен быть типа Студент!');
        }
        this.priorities.push(student);
    }

    setPriorities(students) {
        students.forEach((student) => {
            this.setPriority(student);
        });
    }
}