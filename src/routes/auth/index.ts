import Config from '../../config';
const { jwtSecret } = new Config;

import express, { Application, Router } from 'express';

import passport from 'passport';
import jwt from 'jsonwebtoken';

import IUserProfile from '../../interfaces/IUserProfile.interface';

import { Payload } from '../../types';

require('../../lib/auth/strategies/basic');
require('../../lib/auth/strategies/jwt');

export default async function authRouter(app:Application):Promise<void> {
    const router:Router = express.Router();
    app.use('/api', router);

    router.post('/auth/sign-in', (req, res, next) => {
        passport.authenticate('basic', { session: false }, (error:Error, userProfile:IUserProfile) => {
            if(error || !userProfile) {
                res.status(404).json({
                    message: error.message,
                });
            }

            req.login(userProfile, { session: false }, async (err:Error) => {
                if(err || userProfile === undefined) {
                    res.status(403).json({ message: err.message });
                }

                const {
                    username,
                    email,
                    name,
                    lastname,
                    age
                }:IUserProfile = userProfile;
                const payload:Payload = {
                    username,
                    email,
                    name,
                    lastname,
                    age,
                };

                const access_token:string = jwt.sign(payload, jwtSecret, { expiresIn: '15m', });

                res.status(200).json({ access_token });
            });
        })(req, res, next);
    });

    router.get('/auth/verify-token', (req, res, next) => {
        const { authorization } = req.headers;
        const access_token:string|undefined = authorization && authorization.replace('Bearer ', '');

        if(access_token !== undefined) {
            passport.authenticate('jwt', { session: false }, () => {
                jwt.verify(access_token, jwtSecret, (err, decoded) => {
                    if(err) {
                        res.status(401).json({
                            name: err.name,
                            message: err.message,
                            success: false,
                        });
                    }

                    res.status(200).json({ success: true });
                });
            })(req, res, next);
        }

        res.status(403).json({
            message: 'Ha ocurrido un error. Por favor, reintente.',
            success: false,
        });
    });

    router.get('/auth/user-profile', (req, res, next) => {
        const { authorization } = req.headers;
        const authToken:string|undefined = authorization && authorization.replace('Bearer ', '');

        if(authToken !== undefined) {
            return jwt.verify(authToken, jwtSecret, (err, decoded) => {
                if(err) {
                    return res.status(403).json({
                        error: {
                            name: err.name,
                            message: err.message,
                            success: false,
                        }
                    });
                }

                const userProfile:Payload = {
                    username: decoded !== undefined && decoded.username,
                    email: decoded !== undefined && decoded.email,
                    name: decoded !== undefined && decoded.name,
                    lastname: decoded !== undefined && decoded.lastname,
                    age: decoded !== undefined && decoded.age,
                }

                res.status(200).json({ userProfile });
            });
        }

        res.status(403).json({
            message: 'No se han proporcionado los datos necesarios para la validación.',
            success: false,
        });
    });
}
