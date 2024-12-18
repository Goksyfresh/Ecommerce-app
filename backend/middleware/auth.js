import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/UserSchema.js';

export const protect = async(req,res,next)=> {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await UserSchema.findById(decodedToken.id).select("-password");
            next();

        } catch (error) {
            console.log(error)
        }
    }
    if (!token){
        res.status(401);
        throw new Error("Not authorized!")
    }
}