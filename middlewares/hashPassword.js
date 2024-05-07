const bcrypt = require('bcrypt');
const hashPassword = (req,res,next) => {
    const {password} = req.body;
    const hashedPassword = bcrypt.hashSync (password, 10);
    req.body.password = hashedPassword;
    next ();

};

module.exports = hashPassword;