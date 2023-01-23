import express, {json} from 'express';
import cors from 'cors';
import chalk from 'chalk';
import router from './routes/index.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(json());
app.use(router);

app.listen(PORT, () => {
    console.log(chalk.yellow.bold('Server running on port ' + PORT));
});