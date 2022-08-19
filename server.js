const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!, Shutting down....');
    console.log(err.name, err.message);
    process.exit(1);
})

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.MONGO_URI.replace('<PASSWORD>', process.env.PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB connected successful'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION!, Shutting down....');
    server.close(() => {
        process.exit(1);
    })
});


