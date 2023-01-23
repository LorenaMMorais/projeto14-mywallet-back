import { ObjectId } from "mongodb";
import db from "../db.js";
import dayjs from "dayjs";

export async function transactions(req, res){
    const {user} = res.locals;
    try{      
        const transactions = await db.collection('transactions').find({user: user.email}).toArray();
        res.send(transactions);
    }catch(error){
        console.log(error);
        res.status(500).send('Erro ao obter transações');
    }
}

export async function inputs(req, res){
    const {user} = res.locals;
    const body = req.body;
    const date = dayjs(Date.now()).format('dd:mm');

    try{
        const transaction = {...body, user: user.email, type: 'input', date};

        await db.collection('transactions').insertOne(transaction);
        res.status(200).send('Nova entrada concluída');
    }catch(error){
        res.status(500).send(error);
    }
}

export async function outputs(req, res){
    const {user} = res.locals;
    const body = req.body;
    const date = dayjs(Date.now()).format('dd:mm');

    try{
        const transaction = {...body, user: user.email, type: 'output', date};

        await db.collection('transactions').insertOne(transaction);
        res.status(200).send('Nova saída concluída');
    }catch(error){
        res.status(500).send(error);
    }
}

export async function exclude(req, res){
    const {id} = req.params;

    try{
        const transaction = await db.collection('transactions').findOne({_id: new ObjectId(id)});
        if(!transaction) return res.status(404).send('Transação não encontrada!');

        await db.collection('transactions').deleteOne({_id: new ObjectId(id)});
        res.sendStatus(200);
    } catch(e){
        res.status(500).send(e);
    }
}