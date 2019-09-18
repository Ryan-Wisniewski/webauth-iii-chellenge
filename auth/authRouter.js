const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../helpers/helperUser')
const moose = require('../config/secrets')

function genToken (user) {
    const payload = {
        username: user.username,
      }
      const options = {
        expiresIn: '8h'
      }
    return jwt.sign(payload, moose.jwtSecret, options)
}

router.post('/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash
    Users.insert(user)
        .then( newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Ooops something happened'})
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.getBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                const token = genToken(user)
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token: token
                  })
            } else {
                res.status(401).json({ message: 'invalid credentials'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Ooops something happened'})
        })
})
module.exports = router