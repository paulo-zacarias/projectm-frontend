export interface ITask {
    title: string;
    description: string;
    weight: Weight;
    storyPoints: number;
    status: Status;
    assignedPerson: number;
    project: number;
}

export enum Status {
    ToDo,
    InProgress,
    Done
}

export enum Weight {
    Low,
    Medium,
    High,
    Critical
}
