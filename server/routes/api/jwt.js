const jwt = require('jsonwebtoken');
const jwt_secret='secret'
function generateToken(user) {
  const payload = {
    email: user.email,
    role: user.role
  };
  const token = jwt.sign(payload, jwt_secret, { expiresIn: '1h' });
  return token;
}

function verifyToken(req, res, next) {
    token = req.headers['authorization'].split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé. Jeton manquant.' });
    }
    
    jwt.verify(token, jwt_secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Accès non autorisé. Jeton invalide.' });
      }
      req.user = decoded;
      next();
    });
  }
  

module.exports = {generateToken,verifyToken};