import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function db_connect() {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log('Database successfully connected');
        })
        .catch(err => {
            console.log('Error while connecting to database');
        });
}

export default db_connect;