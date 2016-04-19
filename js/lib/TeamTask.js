import {Task} from './Task';

export class TeamTask extends Task {
    constructor(task) {
        super(task);
        this.type = {
            name: 'Командная',
            slug: 'team'
        };
    }
}