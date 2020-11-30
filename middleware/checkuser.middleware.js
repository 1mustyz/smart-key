const models = require('../models');
const Admin = models.Admin;

const checkUser = async (req,res,next) => {

  const email = req.body.email;
  const data =  await Admin.findOne({
      where : {email:email},
    });

    if (!data){return next()}
    return res.json({
      'succ':0,
      'msg':  'user with email already exits'
    });
}

module.exports = checkUser;