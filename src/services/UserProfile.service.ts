import database from '../../../mongo__backend__db';

import UserProfileService from '../../../mongo__backend__db/dist/services/User.service';

import IUserProfile from '../interfaces/IUserProfile.interface';

export default class UserProfile {
    private static instance:UserProfile;
    private userProfile:Promise<UserProfileService>;

    private constructor() {
        this.userProfile = UserProfile._init();
    }

    private static async _init() {
        const { userProfile } = await database();
        return userProfile;
    }

    public static getInstance():UserProfile {
        if(!UserProfile.instance) {
            UserProfile.instance = new UserProfile();
        }

        return UserProfile.instance;
    }
    
    /**
    * Filtra el usuario en la base de datos por username.
    * @async
    * @method
    * @param {String} username
    * @returns {UserProfile} Objeto usuario.
    */
    async findUserByUsername(username:string):Promise<IUserProfile|null> {
        return (await this.userProfile).findUserByUsername(username)
            .then((response:unknown) => response as IUserProfile);
    }

    /**
    * Filtra el usuario en la base de datos por email.
    * @async
    * @method
    * @param {String} email
    * @returns {UserProfile} Objeto usuario.
    */
    async findUserByEmail(email:string):Promise<IUserProfile|null> {
        return (await this.userProfile).findUserByEmail(email)
            .then((response:unknown) => response as IUserProfile);
    }
}
