const { v4: uuidv4 } = require('uuid');
const pooling = require('../MysqlFolder/sqlpooling');


const appointment = async (req,res,next) =>{
    try {
        
        const {firstname,email,phone,date,time,reason,description,lastname} = req.body;
        const present = await pooling.query(`select * from appointment where date = ?  and time = ? `,[date,time]);
        if(present[0].length != 0 ){
            
            next({message:"Kisi Aur Ka hai Time Dusra La La"});
            return;
        }
        
        const query = `insert into appointment (firstname,email,phone,date,time,pending,notification,id,reason,description,lastname) values(?,?,?,?,?,?,?,?,?,?,?)`;
        const values = [firstname,email,phone,date,time,0,1,uuidv4(),reason,description,lastname];
        await pooling.query(query,values);
        res.status(201).json({msg:"message send wait for approve"});
    } catch (erro) {
        const error = {
            message:"Aaj Kam sa chuti hai",
            Extra:"Tu bhi so jaa"
        };
        next(error);
        
    }
}

const approved = async (req,res,next) =>{
    try {

        const data = req.params.id;
        
        const extract = await pooling.query(`select * from appointment where id = ? `,[data]);
        const helper = extract[0][0];
        
        const query = `insert into approved (firstname,email,phone,date,time,pending,notification,id,reason,description,lastname) values(? , ? , ? , ? ,? , ?, ?, ?, ?, ? ,?  )`;
        const values = [helper.firstname,helper.email,helper.phone,helper.date,helper.time,1,helper.notification,helper.id,helper.reason,helper.description,helper.lastname];
        await pooling.query(query,values);
        await pooling.query(`delete from appointment where id =  ?`,[data]);
        res.status(201).send("Sucessfully");
        

    } catch (error) {
        console.log(error);
    }
}

const usernotification = async (req,res,next) =>{
    try {
        const id = req.params.id;
        await pooling.query(`update approved set notification = 1 where id = ? `,[id]);
    } catch (rror) {
        const error = {
            message:"Ajj remove nahi hoyga kal try karo"
        } ;
        next(error);
    }
}
const adminnotification = async (req,res) =>{
    try {
        const id = req.params.id;
        console.log(id);
        await pooling.query(`update appointment set notification = 0 where id = ? `,[id]);
        const list = await pooling.query('select * from approved');
        res.status(201).send(list[0]);
        
        res.status(201).send(await pooling.query('select * from appointment'));
    } catch (error) {
        console.log(error);
    }
}
const userappointment = async (req,res,next) =>{
    try {
        const id = req.params.id;
        const data = await pooling.query('select * from appointment where email = ?',[id]);
        if(data[0].length == 0){
            
            next({message:"Records Not Found"})
            return;
        } 
        res.status(201).json({data:data[0]});

    } catch (error) {
        next({message:"Some Error"})
    }
}
const userapproved = async (req,res,next) =>{
    try {
        const id = req.params.id;
        const data = await pooling.query('select * from approved where email = ?',[id]);
        if(data[0].length == 0){
            next({message:"Records Not Found"})
           
        } 
        res.status(201).json({data:data[0]});

    } catch (error) {
        next({message:"Some Error"})
    }
}
const appointmentlistfordoc = async (req,res,next) =>{
    try {
        const data = await pooling.query('select * from appointment');
        res.status(201).json({data:data[0]});
    } catch (error) {
        next({message:"some error in doc apppintment list"});
    }
}
const cancelAppointment = async (req,res,next) =>{
    try {
        const id = req.params.id;
        const data = await pooling.query('delete  from appointment where id = ?',[id]);
        if(data[0].length == 0){
            next({message:"Error in cancel"});
        }
        res.status(201).json({msg:"Successfully Cancel the appointment"});
    } catch (error) {
        next({message:"Error cancel appointment"});
    }
}

const approveddata = async (req,res,next) =>{
    try {
        const data = await pooling.query('select * from approved');
        res.status(201).json({data:data[0]});
    } catch (error) {
        next({message:"Error to extract approved list"});
    }
}
module.exports = {appointment,approved,userappointment,approveddata,usernotification,cancelAppointment,adminnotification,userapproved,appointmentlistfordoc};

