import db from "../db.js";
import dayjs from "dayjs";
import joi from "joi";

const transactionSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid('input', 'output').required()
});

export async function transactions(req, res){
    const authorization = req.headers.authorization;
   
    try{      
        const token = authorization?.replace('Bearer', '').trim();

        if(!token) return res.status(401).send('Erro no token');
    
        const session = await db.collection('sessions').findOne({token});
    
        if(!session) return res.status(401).send('Erro na sessão');
    
        const user = await db.collection('users').findOne({_id: session.userId});
        
        const {email} = user;

        const transactions = await db.collection('transactions').find({user: email}).toArray();
        
        res.send(transactions);
    }catch(error){
        console.log(error);
        res.status(500).send('Erro ao obter transações');
    }
}

export async function inputs(req, res){
    const body = req.body;
    const date = dayjs(Date.now()).format('dd:mm');

    const authorization = req.headers.authorization;

    try{
        const token = authorization?.replace('Bearer', '').trim();

        if(!token) return res.status(401).send('Erro no token');

        const session = await db.collection('sessions').findOne({token});

        if(!session) return res.status(401).send('Erro na sessão');

        const user = await db.collection('users').findOne({_id: session.userId});

        const {error} = transactionSchema.validate(body, {abortEarly: false});

        if(error) return res.status(422).send(error.details.map(detail => detail.message));

        const transaction = {...body, user: user, type: 'input', date};

        await db.collection('transactions').insertOne(transaction);
        res.status(200).send('Nova entrada concluída');
    }catch(error){
        res.status(500).send(error);
    }
}

export async function outputs(req, res){
    const body = req.body;
    const date = dayjs(Date.now()).format('dd:mm');

    const authorization = req.headers.authorization;

    try{
        const token = authorization?.replace('Bearer', '').trim();

        if(!token) return res.status(401).send('Erro no token');

        const session = await db.collection('sessions').findOne({token});

        if(!session) return res.status(401).send('Erro na sessão');

        const user = await db.collection('users').findOne({_id: session.userId});

        const {error} = transactionSchema.validate(body, {abortEarly: false});

        if(error) return res.status(422).send(error.details.map(detail => detail.message));

        const transaction = {...body, user: user, type: 'output', date};

        await db.collection('transactions').insertOne(transaction);
        res.status(200).send('Nova saída concluída');
    }catch(error){
        res.status(500).send(error);
    }
}