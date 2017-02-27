const jwt = require('jsonwebtoken');

function authorizeUser(req, res, next) {
  var token = req.headers.token
  if(token !== undefined) {
    jwt.verify(token, 'ThisShitIsTokenSecret', function(err, decoded) {
      if(err) {
        res.send(err)
      } else {
        req.User = decoded.User
        next()
      }
    })
  } else {
    res.send('You are not authorized to access this shit')
  }
}

function authorizeAdmin(req, res, next) {
  var token = req.headers.token
  if(token !== undefined) {
    jwt.verify(token, 'ThisShitIsTokenSecret', function(err, decoded) {
      if(err) {
        res.send(err)
      } else {
        req.User = decoded.User
        if(req.User.role === 'admin') {
          next()
        }
        else {
          res.send('your role cannot access this shit')
        }
      }
    })
  } else {
    res.send('You are not authorized to access this shit')
  }
}

module.exports = {User: authorizeUser, Admin:authorizeAdmin}
