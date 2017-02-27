let models = require('../models')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var api = {}

api.userAuthentication = function(req, res, next) {
  models.User.findOne({where: {username: req.body.username}})
  .then(function(User) {
    let passwordInput = crypto.createHmac('sha512', User.salt).update(req.body.password).digest('hex')
    if(!User) {
      res.send('User not found')
    }

    if(User.password === passwordInput) {
      User.password = null
      var token = jwt.sign({ User: User }, 'ThisShitIsTokenSecret');
      req.token = token
      next()
    } else {
      res.send('Authentication failed, password wrong')
    }
  })
}

api.getUserById = function(req, res) {
  models.User.findById(req.params.id).then(function(User) {
    res.json(User)
  })
}

api.getAllUser = function(req, res) {
  models.User.findAll().then(function(result) {
    res.json(result)
  })
}

api.createUser = function(req, res) {
  models.User.create({
    username: req.body.username,
    password: req.body.password
  }).then(function(users) {
    res.send(users)
  })
}

api.deleteUser = function(req, res) {
  models.User.destroy({
    where: {id: req.params.id}
  }).then(function(status) {
    res.status(200).send({
      'status': status,
      'message': 'Data with id ' + req.params.id + ' has been deleted'
    })
  })
}

api.editUser = function(req, res) {
  models.User.update({username: req.body.username}, {where: {id: req.params.id}}).then(function(user) {
    res.send(user)
  })
}

module.exports = api
