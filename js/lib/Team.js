import {TeamTask} from './TeamTask';
import {Student} from './Student';


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

    /*
    * Добавление члена команды
    * */
    addMember(member) {
        if (!member instanceof Student) {
            throw new Error('Параметр должен быть типа Студент!');
        }
        if (this.members.indexOf(member) !== -1) {
            console.log('Студент не может быть добавлен в команду дважды!');
            return this;
        }
        member.team = this;
        this.members.push(member);
        return this;
    }

    /*
    * Удаление члена команды
    * */
    deleteMember(member) {
        let members = this.getMembers();
        let index = members.indexOf(member);
        if (index !== -1) {
            this.members.splice(index, 1);
            member.team = null;
        }
    }


    /*
    * Поиск члена команды по уникальному идентификатору
    * */
    findMemberById(id) {
        this.members.forEach((member) => {
            if (member.id === id) {
                return member;
            } else {
                return undefined;
            }
        });
    }

    /*
    * Поиск студента
    * */
    findStudent(member) {
        if (!member instanceof Student) {
            throw new Error('Параметр должен быть типа Студент!');
        }
        return this.findMemberById(member.id);
    }


    /*
    * Функция добавления командной задачи
    * */
    addTask(task) {
        if (!task instanceof TeamTask) {
            throw new Error('Параметр должен быть типа Командная Задача!');
        }
        if (this.tasks.indexOf(task) !== -1) {
            throw new Error('У команды уже есть такое задание!');
        }
        this.tasks.push({task: task, mark: null});
    }

    /*
    * Получение членов команды
    * */
    getMembers() {
        return this.members;
    }


    /*
    * Получение списка всех задач
    * */
    getTasks() {
        return this.tasks;
    }

    /*
    * Полчуение списка доступных задач
    * */
    getFreeTasks() {
        let freeTasks = [];

        this.shri.getTeamTasks().forEach((shriTask) => {
            if (this._indexOfTask(shriTask) == -1) {
                freeTasks.push(shriTask);
            }
        });
        return freeTasks;
    }

    /*
    * Проставление оценки задаче
    * */
    setTaskMark(task, mark) {
        if (mark < 1 || mark > 5) {
            throw new Error('Оценка должна быть в промежутке от 1 до 5!');
        }
        let teamTask = this._findTaskById(task.id);
        teamTask.mark = mark;
        return this;
    }

    /*
    * Вспомогательная функция поиска индекса задачи, если она есть у команды
    * */
    _indexOfTask(task) {
        let i;
        let len;
        let tasks = this.getTasks();

        for (i = 0, len = tasks.length; i < len; i++) {
            if (tasks[i].task === task) {
                return i;
                break;
            }
        }
        return -1;
    }

    /*
     * Вспомогательная функция поиска задачи по уникальному идентификатору
     * */
    _findTaskById(id) {
        this.tasks.forEach((task) => {
            if (task.task.id === id) {
                return task;
            }
        });
    }
}