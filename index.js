require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {connection} = require('./db.js');
const {authRouter} = require('./Routes/auth.routes.js');
const {userRouter} = require('./Routes/user.routes.js');
const {productRouter} = require('./Routes/product.routes.js');
const {orderRouter} = require('./Routes/order.routes.js');
const {cartRouter} = require('./Routes/cart.routes.js');

const app = express();
const PORT = process.env.PORT || 4500;
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);

app.listen(PORT, async function () {
    try {
        console.log('Server is in process...');
        await connection;
        console.log(`Server running on : http://localhost:${PORT}`);
    } catch (error) {
        console.log(error);
    }
});
