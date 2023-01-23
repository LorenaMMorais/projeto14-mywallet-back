import joi from "joi";
import db from "../db.js";
import bcrypt from "bcrypt";

export async function register(req, res){
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required(),
        confirmPassword: joi.ref('password')        
    });
    const {error} = userSchema.validate(req.body, {abortEarly: false});
    
    if(error) return res.status(422).send(error.details.map(detail => detail.message));
    
    const {name, email, password} = req.body;

    try{
        const user = await db.collection('users').findOne({email: email});
        
        console.log(user);

        if(user){
            return res.status(409).send('Este email já existe! Tente novamente');
        } else{
            const encryptedPassword = bcrypt.hashSync(password, 10);
            await db.collection("users").insertOne({name, email, password: encryptedPassword});
        }
    }catch(error){
        console.log('Erro ao cadastrar usuário', error);
        res.sendStatus(500);
    }
    res.send(req.body);
}