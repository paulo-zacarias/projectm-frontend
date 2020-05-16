export interface IUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profile: IProfile;
}

export interface IProfile {
    id: number;
    image: string;
    displayName: string;
}
