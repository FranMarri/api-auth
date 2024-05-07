const jsonwebtoken = require('jsonwebtoken');

const secret = 'mysecretkey';
function generateToken(user) {
  return jsonwebtoken.sign(user, secret, {
    expiresIn: '1m',
  });
}

function verifyToken(token) {
  return jsonwebtoken.verify(token, secret);
} 

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  verifyToken(token, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
   
    next();
  });
}

module.exports = { generateToken, authenticateToken };