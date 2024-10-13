const Error = (err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something Wrong";
    const Extra =  err.Extra || "From the developer Side";
    return res.status(status).json({message:message,Description:Extra});


}

module.exports =  Error;