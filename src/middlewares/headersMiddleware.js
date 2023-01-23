import db from "../db.js";

export async function validateHeader(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    if(!token) return res.status(401).send('Erro no token');

    try{      
        const session = await db.collection('sessions').findOne({token});
    
        if(!session) return res.status(401).send('Erro na sessão');
    
        const user = await db.collection('users').findOne({_id: session.userId});
        
        if(!user) return res.status(401).send('Usuário inválido');

        delete user.password;
        delete user.confirmPassword;
        res.locals.user = user;
    }catch(error){
        return res.status(500).send(error);
    }

    next();
}