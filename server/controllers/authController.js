const jwt = require('jsonwebtoken')

module.exports.protect =(req,res,next)=>{

    const header = req.headers['authorization'];
    if(!header){
        res.status(401).json({
            status:'fail',
            message:'User not Logged in'
        })
    }
    const bearer = header.split(" ");
    const token = bearer[1];

jwt.verify(token, process.env.JWT_SECRET,(err,data)=>{
    if(err){
        res.status(403).json({
          status: "fail",
          message: "User not Logged in",
        });
    } else {
        req.user = data.id
        next();
    }
});
};
