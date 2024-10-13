const { setThePassword } = require('whatwg-url');
const z = require('zod');

const sign_up = z.object({
    name:z.string({required_error:"Name is required "})
    .trim()
    ,
    email:z.string({required_error:"Email is required "})
    .trim()
    .email({message:"email error"}),

    phone:z.string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"Phone must be equal to 10"})
    
    .max(10,{message:"Phone must be equal to 10"}),

    password:z.string({required_error:"Password must be required"})
    .trim()
    .min(8,{message:"Password at least 8 character"})
    .max(15,{message:"password must not greater than 10 character"}),
    
})

const log_in = z.object({
    email:z.string({required_error:"Email is required "})
    .trim()
    .email({message:"email error"}),
    password:z.string({required_error:"Password must be required"})
    .trim()
    .min(8,{message:"Password at least 8 character"})
    .max(15,{message:"password must not greater than 10 character"})
})

const appoint_ment = z.object({
    username:z.string({required_error:"Name is required "})
    .trim()
    ,
    email:z.string({required_error:"Email is required "})
    .trim()
    .email({message:"email error"}),

    phone:z.string({required_error:"Phone is required"})
    .min(10,{message:"Number not greater than 10"})
    .max(10,{message:"number should not grsater than 10"})
    ,

    date:z.string({required_error:"Date is require"})
    .date()
    ,
    
    time:z.string({required_error:"Time is must"})
    .trim()
    .time()
    
})

module.exports = {appoint_ment,log_in,sign_up};