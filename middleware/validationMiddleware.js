

const middleWare = (validation) => async (req,res,next) =>{
    try {
        const parsebody = await validation.parseAsync(req.body);
        
        req.body = parsebody;
       
        next();
    } catch (erro) {
        const error = {
            message:"Astla Bistla by by",
            Extra:"apna kam kar kuch  "
        };
        console.log(erro);
        next(error);
    }
}

module.exports = middleWare;