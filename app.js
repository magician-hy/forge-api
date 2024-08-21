const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const settingsRouter = require('./routes/settings');
const habitsRouter = require('./routes/habits');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS 跨域配置
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ],
}
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/settings', settingsRouter);
app.use('/habits', habitsRouter);

module.exports = app;
