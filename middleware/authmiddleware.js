const jwt = require('jsonwebtoken');
const pooling = require('../MysqlFolder/sqlpooling');

const verifyjsontoken = async (req,res,next) =>{
    let  token = req.header('Authorization') || "" ;
    if(!token){
        return res.status(401).json({msg:"some error occurred"});
    }
    try {
        let isverify = jwt.verify(token,process.env.JWT_CODE);
        const query = `SELECT email,username,isAdmin from signup where email = ?`;
        const values = [isverify.email];
        const data = await pooling.query(query,values);
        req.user = data[0];
        req.token = token;
        next();
    } catch (error) {
        next({message:"User have to login first"});
    }
}


module.exports = verifyjsontoken;