import bcrypt from 'bcrypt';

import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import IUserProfile from '../../../interfaces/IUserProfile.interface';

import UserProfile from '../../../services/UserProfile.service';

const userProfileService = UserProfile.getInstance();

passport.use(new BasicStrategy(async function(username:string, pass:string, cb:CallableFunction) {
    try {
        const userProfile:IUserProfile|null = await userProfileService.findUserByUsername(username);

        if(!userProfile || userProfile === null) {
            return cb(new Error('No existe el prestador en el sistema. Comuníquese con el administrador.'), false);
        }

        const { password }:IUserProfile = userProfile;
        const hashPass:boolean = await bcrypt.compare(pass, password);

        if(!hashPass) {
            return cb(new Error('Las contraseñas no coinciden.'), false);
        }

        return cb(null, userProfile);

        // delete prestador.passport;
    } catch(err) {
        return cb(err);
    }
}));
