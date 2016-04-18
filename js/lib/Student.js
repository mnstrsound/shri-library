import {Task} from 'Task';
import {Team} from 'Team';
import {Mentor} from 'Mentor';

export class Student {
    constructor(person) {
        if (!person.name || typeof person.name !== 'string') {
            throw new Error('Вы не указали имя студента');
        }
        this.id = person.id;
        this.shri = person.shri;
        this.name = person.name;
        this.tasks = [];
        this.priorities = [];
        this.mentor = {};
        if (person.team && person.team instanceof Team) {
            this.team = person.team;
        }
    }

    addTask(task) {
        if (!task instanceof Task) {
            throw new Error('Параметр доджен быть типа Задание!');
        }
        if (this.tasks.indexOf(task) !== -1) {
            throw new Error('У студента уже есть такое задание!');
        }
        this.tasks.push({task: task, mark: null});
    }

    setTeam(team) {
        if (!team instanceof Team) {
            throw new Error('Параметр должен быть типа Команда!');
        }
        /*if (this.team) {
            this.team.students.
        }*/
        this.team = team;
    }

    setMentor(mentor) {
        if (!mentor instanceof Mentor) {
            throw new Error('Параметр должен быть типа Ментор!');
        }
        this.mentor = mentor;
    }

    setPriority(mentor) {
        if (!mentor instanceof Mentor) {
            throw new Error('Параметр должен быть типа Ментор!');
        }
        this.priorities.push(mentor);
    }

    setPriorities(mentors) {
        mentors.forEach((mentor) => {
            this.setPriority(mentor);
        });
    }

    getTasks() {
        return this.tasks;
    }

    getFreeTasks() {
        let tasks = this.getTasks();
        let freeTasks = [];

        this.shri.getIndividualTasks().forEach((shriTask) => {
            tasks.forEach((stTask) => {
                if (stTask.task === shriTask)
                    freeTasks.push(shriTask);
            });
        });
        return freeTasks;
    }

    setTaskMark(task, mark) {
        let stTask = this.findTaskById(task.id);
        stTask.mark = mark;
        return this;
    }

    findTaskById(id) {
        this.tasks.forEach((task) => {
            if (task.task.id === id) {
                return task;
            }
        });
    }
}