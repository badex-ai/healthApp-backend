
const mongoose = require('mongoose');
const dotenv = require('dotenv');



const app = require('./app');
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    //if the parameter of the function is 0 it means true any other number is false
    process.exit(1);
  });
  dotenv.config({
    path: './config.env'
  });

  mongoose
  .connect(process.env.DATABASE_LOCAL, {
    // .connect(DB, {
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true
  })
  .then(con => {
    console.log(con.connections);
    console.log('DB connection successful');
  });

  const port = process.env.PORT;
const server = app.listen(port || 8080, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
  
    //close the server
    server.close(() => {
      //close the app if the error is detected
      //0 stands for success 1 stands for uncalled exceptions
      process.exit(1);
    });
  });


