import path from 'path';
import dotenv from 'dotenv';

const ENV_FILE = path.join(__dirname, '../../.env');
dotenv.config({ path: ENV_FILE });

export default class Config {
    public port:number;
    public apiKey:string;
    public jwtSecret:string;

    constructor() {
        this.port = Number(process.env.PORT);
        this.apiKey = String(process.env.API_KEY_APP);
        this.jwtSecret = String(process.env.JWT_SECRET);
    }
}
