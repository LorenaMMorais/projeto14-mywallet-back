import express, {json} from 'express';
import cors from 'cors';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);

let db;

mongoClient.connect()
    .then(() => {
        db = mongoClient.db();
        console.log(chalk.green.bold('Banco conectado')); 
    })
    .catch(() => 
        console.log(chalk.red.bold('Banco não conectou'))
    )

app.listen(PORT, () => {
    console.log(chalk.yellow.bold('Server running on port ' + PORT));
});