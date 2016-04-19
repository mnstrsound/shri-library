export class Task {
    constructor(task) {
        if (!task.title || !task.desc) {
            throw new Error('Не указан заголовок и/или описание');
        }
        this.id = task.id;
        this.shri = task.shri;
        this.title = task.title;
        this.desc = task.desc; 
    }
}