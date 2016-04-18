import {Student} from 'Student';
import {Task} from 'Task';

export class Team {
    constructor(team) {
        if (!team.name) {
            throw new Error('Вы не указали название команды');
        }
        this.id = team.id;
        this.shri = team.shri;
        this.name = team.name;
        this.members = [];
        this.tasks = [];
    }

    addMember(student) {
        if (!student instanceof Student) {
            throw new Error('Параметр должен быть типа Студент!');
        }
        if (this.members.indexOf(student) !== -1) {
            console.log('Студент не может быть добавлен в команду дважды!');
            return this;
        }
        this.members.push(student);
        return this;
    }

    findMemberById(id) {
        this.members.forEach((member) => {
            if (member.id === id) {
                return member;
            }
        });
    }

    findStudent(student) {
        if (!student instanceof Student) {
            throw new Error('Параметр должен быть типа Студент!');
        }
        return this.findMemberById(student.id);
    }

    addTask(task) {
        if (!task instanceof Task) {
            throw new Error('Параметр должен быть типа Задача!');
        }
        if (this.tasks.indexOf(task) !== -1) {
            throw new Error('У команды уже есть такое задание!');
        }
        this.tasks.push({task: task, mark: null});
    }

    getTasks() {
        return this.tasks;
    }

    getFreeTasks() {
        let tasks = this.getTasks();
        let freeTasks = [];

        this.shri.getTeamTasks().forEach((shriTask) => {
            tasks.forEach((mentorTask) => {
                if (mentorTask.task === shriTask)
                    freeTasks.push(shriTask);
            });
        });
        return freeTasks;
    }

    setTaskMark(task, mark) {
        let teamTask = this.findTaskById(task.id);
        teamTask.mark = mark;
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