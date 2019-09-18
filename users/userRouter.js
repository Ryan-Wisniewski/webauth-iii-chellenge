const router = require('express').Router();

const Users = require('../helpers/helperUser');
const restricted = require('../auth/authRouter');

//get all users
router.get('/', restricted, (req, res) => {
  Users.get()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err))
})

module.exports = router;