import joi from "joi";
import db from "../db.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

export async function register(req, res){
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required(),
        confirmPassword: joi.ref('password')        
    });

    const user = req.body;

    const {error} = userSchema.validate(user, {abortEarly: false});
    
    if(error) return res.status(422).send(error.details.map(detail => detail.message));
    
    const {name, email, password} = user;

    try{
        const user = await db.collection('users').findOne({email: email});
        
        console.log(user);

        if(user){
            return res.status(409).send('Não foi possível cadastrar usuário! Tente novamente');
        } else{
            const encryptedPassword = bcrypt.hashSync(password, 10);
            await db.collection("users").insertOne({name, email, password: encryptedPassword});
        }
    }catch(error){
        console.log('Erro ao cadastrar usuário', error);
        res.status(500).send('Erro ao cadastrar usuário');
    }
    res.send(user);
}

export async function login(req, res) {
    const {email, password} = req.body;

    try {
        const user = await db.collection('users').findOne({email});
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await db.collection('sessions').insertOne({token, userId: user._id});
            res.status(200).send(token);
        }else { 
            res.status(404).send('Usuário ou senha incorretos');
        }
    } catch(e) {
        console.log(e);
        res.status(401).send('Não autorizado');
    }
}