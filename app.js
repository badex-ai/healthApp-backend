const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');


const app = express();
;
app.use(cors());
app.options('*', cors());

const userRouter = require('./Routes/userRoute');
const exerciseRouter = require('./Routes/exerciseRoute');


// set security http headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  //Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(express.static(path.join(__dirname, 'public')))



app.use('/api/v1/users', userRouter);
app.use('/api/v1/exercise', exerciseRouter);

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //   status: 'fail',
    //   message: `Can't find ${req.originalUrl} on this server`
    // });
    //   const err = new Error(`Can't find ${req.originalUrl} on this server`);
    //   err.status = 'fail';
    //   err.statusCode = 404;
    console.log("Error")
    // next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });

module.exports = app;