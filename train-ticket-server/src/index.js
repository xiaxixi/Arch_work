import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import users from './routes/users';
import fakes from './routes/fakes';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', users);
app.use('/api/fakes', fakes);

app.get('/*', (req, res) => {
  res.status(200).json({ msg: 'VUE-TRAIN_TICKET API' });
})

app.listen(3000, () => console.log("> Running on localhost:3000"));
