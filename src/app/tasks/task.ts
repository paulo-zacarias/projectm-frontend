import { IUser } from '../users/user';

export interface ITask {
    id: number;
    title: string;
    description: string;
    weight: number;
    storyPoints: number;
    status: number;
    project: number;
    assignedPerson: IUser;
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
