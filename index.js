require('dotenv').config();
const express = require('express');
const {connection} = require('./db.js');
const {authRouter} = require('./Routes/auth.routes.js');
const {userRouter} = require('./Routes/user.routes.js');
const {productRouter} = require('./Routes/product.routes.js');
const {orderRouter} = require('./Routes/order.routes.js');

const app = express();
const PORT = process.env.PORT || 4500;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.listen(PORT, async function () {
    try {
        console.log('Server is in process...');
        await connection;
        console.log(`Server running on : http://localhost:${PORT}`);
    } catch (error) {
        console.log(error);
    }
});
