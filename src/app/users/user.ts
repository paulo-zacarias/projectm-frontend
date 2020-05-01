export interface IUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profile: IProfile;
}

class IProfile {
    image: string;
    displayName: string;
}
