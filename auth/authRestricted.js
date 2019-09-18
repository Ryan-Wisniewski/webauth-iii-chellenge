const jwt = require('jsonwebtoken')

const moose = require('../config/secrets')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        //token takes 'token', 'secret', 'and a cb'
        //think baout other ways turds can break the software
        jwt.verify(token, moose.jwtSecret, (err, decoded) => {
            if(err){
                //token broken
                res.status(401).json({ message: 'Invalid Credentials' })
            }  else {
                res.status(400).json({ message: 'no credentials provided'})
              }         
        })
    }
}