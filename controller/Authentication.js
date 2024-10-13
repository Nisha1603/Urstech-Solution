const pooling = require('../MysqlFolder/sqlpooling');
const Jwt = require('jsonwebtoken');

const generateToken = async (email,isAdmin) =>{
    try {
        return Jwt.sign({
            email:email,
            isAdmin:isAdmin
        },
        process.env.JWT_CODE,{
            expiresIn:'1d'
        }
    )
    } catch (error) {
        console.log("Error in jwt");
    }
} 
const signup = async(req,res,next)=>{
    try {
        const {name,email,phone,password} = req.body;
        const findemail = await pooling.query( `select email from signup where email = ?`,[email]);
        
        if(findemail[0].length == 0){
                
            const admin = 0
            const quer = `INSERT INTO signup (username,email,phone,password,isAdmin) VALUES (?,?,?,?,?)`;
            const values = [name,email,phone,password,admin];
            const issave =await pooling.query(quer,values);
            if(!issave){
                const errror = {
                    message:"Save Nahi Hua Abhi Kam Chal rha hai"

                }
                next(errror);
            }
                
            res.status(201).json({ username:name,token: await generateToken(email,admin), isAdmin:admin});
            return;

        }
        error = {
            message:"Login Karo",
            Extra:"Pgla gya kya"
        }
        next(error);
       
    } catch (err) {
        const error = {
            message:"Network Error",
            Extra : "Connection Problem "
        }
        console.log(err);
        next(error);
    }
}

const comparePassword = async (savepassword,userpassword) =>{
    return savepassword == userpassword;
}
const login = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        
        const queryfind = await pooling.query(`select email,password,isAdmin,username from signup where email = ?`,[email]);
        
        if(queryfind[0].length == 0){
            error = {
                message:"App Kon Hai Phla Register Krya ",
                extra:"Chal Nikal l***"
            }
            next(error);
        }
        const ispassword = await comparePassword(queryfind[0][0].password,password);
        if(!ispassword){
            const error = {
                message:"Mu ko aya haat nahi lga",
                Extra:"password galat hai"
            }
            next(error);
        }
        res.status(201).json({msg:'Login Successfully',token:await generateToken(email,queryfind[0][0].isAdmin),username:queryfind[0][0].username,isAdmin:queryfind[0][0].isAdmin});
        res.end()
        
    } catch (err) {
        const error = {
            message:"Connection Error",
            Extra:"Bachra !!!! "
        };
        next(error);
    }
}

const user = async (req,res) => {
    try {
        const userdata = req.user;
        if(!userdata){
            const error = {
                message:"Login kar la dubra",
                Extra:"Roj krna mai kuch jayta hai tra "
            };
            next(error);
        }
        res.status(201).json({userdata});
        res.end();
    } catch (erro) {
        const error = {
            message:"ghar jaa",
            Extra:"aaj mud nahi hai "
        };
        next(error);
    }
}
const del = async ( req,res)=> {
    try {
        const query =  `DELETE FROM approved`;
        const answer = await pooling.query(query);
        res.status(201).send(answer);
        res.end();
    } catch (error) {
        console.log(error);
    }
} 
module.exports = {login,signup,user,del};