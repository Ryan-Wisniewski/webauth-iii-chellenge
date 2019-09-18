const express = require('express');

const userRouter = require('../users/userRouter');
const authRouter = require('../auth/authRouter')

const server = express();
server.use(express.json());

server.use('/users', userRouter);
server.use('/auth', authRouter)

server.get('/', (req, res) => {
    res.json({ sanity: 'check'})
});

module.exports = server;