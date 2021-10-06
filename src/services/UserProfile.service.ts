import db from '../../../alibrate-db';

import IUserProfile from '../interfaces/IUserProfile.interface';

export default class UserProfile {
    private static instance:UserProfile;
    private userProfile:Promise<UserProfile>;

    private constructor() {
        this.userProfile = UserProfile._init();
    }

    private static async _init() {
        const { userProfile } = await db();
        return userProfile;
    }

    public static getInstance():UserProfile {
        if(!UserProfile.instance) {
            UserProfile.instance = new UserProfile();
        }

        return UserProfile.instance;
    }

    async findUserByUsername(username:string):Promise<IUserProfile|null> {
        return (await this.userProfile).findUserByUsername(username)
            .then((response:unknown) => response as IUserProfile);
    }
}
