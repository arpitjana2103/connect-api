require('dotenv').config();
const express = require('express');
const {connection} = require('./db.js');
const {authRouter} = require('./Routes/auth.routes.js');
const {userRouter} = require('./Routes/user.routes.js');

const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(PORT, async function () {
    try {
        console.log('Server is in process...');
        await connection;
        console.log(`Server running on : http://localhost:${PORT}`);
    } catch (error) {
        console.log(error);
    }
});
