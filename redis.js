// const Redis = require('ioredis');
// const redis = new Redis();
// module.exports = {redis};

const {createClient} = require('redis');
const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error ', err));

module.exports = {redisClient};
