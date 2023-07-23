require('dotenv').config();
const express = require('express');
const {connection} = require('./db.js');
const {authRouter} = require('./Routes/auth.routes.js');
const {userRouter} = require('./Routes/user.routes.js');
const {productRouter} = require('./Routes/product.routes.js');
const {orderRouter} = require('./Routes/order.routes.js');
var cors = require('cors');

const app = express();
const PORT = process.env.port || 4500;
// http://127.0.0.1:5500

app.use(cors());
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
