import Config from '../../../config';
const {
    jwtSecret
} = new Config();

import UserProfile from '../../../services/UserProfile.service';
const userProfileService = UserProfile.getInstance();

import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import IUserProfile from '../../../interfaces/IUserProfile.interface';

import { Payload } from './../../../types/index';

passport.use(
    new Strategy({
        secretOrKey: jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (tokenPayload:Payload, cb:CallableFunction) => {
        try {
            const userProfile:IUserProfile|null = (tokenPayload.name !== undefined)
            ? await userProfileService.findUserByUsername(tokenPayload.name)
            : null;

            if(!userProfile || userProfile === null) {
                return cb(new Error('Ha ocurrido un error con el token.'), false);
            }

            // delete prestador.passport;

            return cb(null, userProfile);
        } catch(err:unknown) {
            return cb((err as Error).message);
        }
    })
);
