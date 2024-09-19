import jwt from 'jsonwebtoken';
import {tokensecreto} from "../config.js";

export function creartoken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            tokensecreto,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
}
