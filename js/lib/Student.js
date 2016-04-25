let {IndividualTask} = require('./IndividualTask');
let {Team} = require('./Team');
let {Mentor} = require('./Mentor');

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
        this.mentor = null;
        if (person.team && person.team instanceof Team) {
            this.team = person.team;
        }
    }

    /*
    * Добавление задачи студенту.
    * */
    addTask(task) {
        if (!task instanceof IndividualTask) {
            throw new Error('Параметр доджен быть типа Индивидуальное Задание!');
        }
        if (this.tasks.indexOf(task) !== -1) {
            throw new Error('У студента уже есть такое задание!');
        }
        this.tasks.push({task: task, mark: null});
    }

    /*
    * Удаление задачи
    * */
    removeTask(task) {
        var tasks = this.getTasks();

        for (let i = 0, len = tasks.length; i < len; i++) {
            if (tasks[i].task === task.task) {
                /*
                * Если задаче проставлена оценка, то ее невозможно удалить,
                * как будто она занесена в школный журнал и править в журнале нельзя.
                * */
                if (tasks[i].mark) {
                    throw new Error('Невозможно удалить задачу, так как ей проставлена оценка!');
                } else {
                    tasks.splice(i, 1);
                }
                break;
            }
        }
    }

    /*
    * Назначение команды
    * */
    setTeam(team) {
        if (!team instanceof Team) {
            throw new Error('Параметр должен быть типа Команда!');
        }
        if (this.team && this.team !== team) {
            this.team.deleteMember(this);
        }
        team.addMember(this);
    }

    /*
    * Назначение ментора
    * */
    setMentor(mentor) {
        if (!mentor instanceof Mentor) {
            throw new Error('Параметр должен быть типа Ментор!');
        }
        this.mentor = mentor;
    }


    /*
    * Установка приоритета
    * */
    setPriority(mentor) {
        if (!mentor instanceof Mentor) {
            throw new Error('Параметр должен быть типа Ментор!');
        }
        this.priorities.push(mentor);
    }

    /*
    * Установка приоритетов
    * */
    setPriorities(mentors) {
        mentors.forEach((mentor) => {
            this.setPriority(mentor);
        });
    }

    /*
    * Проставление оценки задаче
    * */
    setTaskMark(task, mark) {
        if (mark < 1 || mark > 5) {
            throw new Error('Оценка должна быть в промежутке от 1 до 5!');
        }
        let stTask = this._findTaskById(task.id);
        stTask.mark = mark;
        return this;
    }

    /*
    * Получение назначенных заданий
    * */
    getTasks() {
        return this.tasks;
    }

    /*
    * Получение списка доступных заданий (список всех существующих задач не включая уже назначенные задания)
    * */
    getFreeTasks() {
        let freeTasks = [];

        this.shri.getIndividualTasks().forEach((shriTask) => {
            if (this._indexOfTask(shriTask) == -1) {
                freeTasks.push(shriTask);
            }
        });
        return freeTasks;
    }

    /*
     * Получение ментора
     * */
    getMentor() {
        return this.mentor;
    }

    /*
    * Функция получения приоритетов
    * */
    getPriorities() {
        if (this.mentor) {
            return [];
        }
        return this.priorities;
    }

    /*
    * Функция получения доступных для заполнения менторов
    * */
    getFreePriorities() {
        if (this.mentor) {
            return [];
        }

        let mentors = this.shri.getMentors();
        let currentMentors = this.getPriorities();
        let freeMentors = [];

        for (let i = 0, len = mentors.length; i < len; i++) {
            if (currentMentors.indexOf(mentors[i]) == -1) {
                freeMentors.push(mentors[i]);
            }
        }
        return freeMentors;
    }


    /*
    * Вспомогательная функция поиска индекса задачи, если она есть у студента
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
        let tasks = this.getTasks();
        let founded;

        tasks.forEach((task) => {
            if (task.task.id === id) {
                return founded = task;
            }
        });
        return founded;
    }
}