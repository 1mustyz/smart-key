const comparePassword = (req,res,next) => {

    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const checkPassword = password == confirmPassword;

    checkPassword ? next() : res.json({
        "succ": 0,
        "msg":    "password did not match"
    }); 
}

module.exports = comparePassword;