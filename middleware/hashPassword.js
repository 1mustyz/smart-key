const bcrypt = require('bcrypt');


const hash = (req,res,next) => {
    const data = req.body;
    
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    data.password = hash;
    next();
}

module.exports = hash;