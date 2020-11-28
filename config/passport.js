const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');
const models = require('../models');

const Admin = models.Admin;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'myVerySecret';

module.exports = passport => {
    passport.use(new JwtStrategy(
        jwtOptions,(jwt_payload,done) =>{
            Admin.findOne({
                where:{
                    id : jwt_payload.id
                }
            }).then(admin =>{
                if(admin){return done(null,admin)}
                return done(null,false);
            }).catch(err =>console.log(err));
        }
    ))
}