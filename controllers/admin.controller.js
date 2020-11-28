const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = models.Admin;


const create = async (req,res) => {
    
    let data = req.body;
    data.confirmPassword = null;

    await Admin.create(req.body);
    return res.json('created');
}

const login = async (req,res) => {

    const email = req.body.email;
    const password = req.body.password;

  const admin = await Admin.findOne({
       where:{
           email : email
       },
    //    attributes : ['firstName','lastName','email']
       
   });

   if (!admin){
     return  res.json("you have to register first");
    }
    
    const checkPass = bcrypt.compareSync(password, admin.password);
    if (!checkPass){
        return  res.json("your password is incorrect");
    }

    const payLoad = {
        id : admin.id,
    }
    const token = jwt.sign(payLoad,'myVerySecret')
       res.json({
           "token" : token,
           "msg" : "login successfull",
           "admin" : admin,
           "statusCode" : 200
       });
}

module.exports = {
    create,
    login
}