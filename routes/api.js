let route = require('express').Router()
let models = require('../models')
let api = require('../controller/api')
let auth = require('../helper/authorize')
const jwt = require('jsonwebtoken');


route.post('/signup', api.createUser)

route.post('/signin', api.userAuthentication, function(req, res){
  res.send(req.token)
})

// route.get('/users', api.getAllUser)

route.get('/users', auth.Admin, api.getAllUser)

route.get('/users/:id', auth.User, api.getUserById)

route.post('/users', auth.Admin, api.createUser)

route.delete('/users/:id', auth.Admin, api.deleteUser)

route.put('/users/:id', auth.User, api.editUser)

module.exports = route
