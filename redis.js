require('dotenv').config();
const Redis = require('ioredis');
const redis = new Redis({
    port: process.env.REDISPORT,
    host: process.env.REDISHOST,
    username: process.env.REDISUSER,
    password: process.env.REDISPASSWORD,
    db: 0,
});

console.log(' process.env.REDISPORT : ' + process.env.REDISPORT);
module.exports = {redis};
