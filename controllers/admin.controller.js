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

const renderView = (req,res) =>{
    res.render('login');
}

const renderRegister = (req,res) =>{
    res.render('register');
}

const login = async (req,res) => {

    const email = req.body.email;
    const password = req.body.password;
    let msg; 

  const admin = await Admin.findOne({
       where:{
           email : email
       },
    //    attributes : ['firstName','lastName','email']
       
   });

   if (!admin){
     return  res.json({
         "succ":0,
         "msg":"you have to register first"
        });
    // msg = "you have to register first";

    }
    
    const checkPass = bcrypt.compareSync(password, admin.password);
    if (!checkPass){
        return  res.json({
            "succ":1,
            "msg":"your password is incorrect"
           });;
        // msg = "your password is incorrect"
    }else{

        const payLoad = {
            id : admin.id,
        }
        const token = jwt.sign(payLoad,'myVerySecret')
        
        return res.json({
            "succ":2, 
            "token" : token,
            "msg" : "login successfull",
            "admin" : admin,
            "statusCode" : 200
        });
    }

}

module.exports = {
    create,
    login,
    renderView,
    renderRegister
}