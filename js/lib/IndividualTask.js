import {Task} from './Task';

export class IndividualTask extends Task {
    constructor(task) {
        super(task);
        this.type = {
            name: 'Индивидуальная',
            slug: 'individual'
        };
    }
}