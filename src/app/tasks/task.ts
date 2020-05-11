export interface ITask {
    title: string;
    description: string;
    weight: number;
    storyPoints: number;
    status: number;
    assignedPerson: number;
    project: number;
}

export enum Status {
    'To do',
    'In Progress',
    'Done'
}

export enum Weight {
    'Low',
    'Medium',
    'High',
    'Critical'
}
