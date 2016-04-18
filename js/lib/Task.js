export class Task {
    constructor(task) {
        if (!task.title || !task.desc) {
            throw new Error('Не указан заголовок и/или описание');
        }
        if (task.type.id !== 0 && task.type.id !== 1) {
            throw new Error('Неопознанный тип задания!');
        }
        this.id = task.id;
        this.shri = task.shri;
        this.title = task.title;
        this.desc = task.desc;
    }
}