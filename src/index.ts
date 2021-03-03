
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import router from './routes/index.routes';

//==================================================================================
// Setting the application
dotenv.config();

// Connect to the Azure Cosmos DB
mongoose.Promise = global.Promise;
mongoose.connect(
        `${process.env.DATABASE_URI}`, 
        {useNewUrlParser: true}
    )
    .then(() => {
        return console.log(`DB Connected`);
    })
    .catch(error => {
        console.log("Error connecting to database: ", error);
        return process.exit(1);
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('LOG: database connected'));

const app = express();
app.use(express.static(path.join(__dirname, '../../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set engine for rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../client/src'));

// app.get('/', (req, res) => {
//     res.status(200).send('Hello World!');
// });

app.use('/', router);

const PORT = process.env.PORT || 3000;
//Express js listen method to run project on http://localhost:3000
app.listen(PORT, () => console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))