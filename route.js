const express = require("express")
// const router = express.Router();
const router=require ("express").Router();
// var studentModel = require('../src/student/studentModel');
var studentModel=require('./StudentModel')


//Add Records
router.post('/students/create', async (req, res) => {
    try {
      const student = new studentModel(req.body);
      await student.validate(); // Validate the input data
  
      await student.save();
      res.status(201).send({
        status: true,
        message: "Student Created!!!!!!!!!!!!!!!!"
      });
    } catch (error) {
      res.status(400).send(error);
    }
  });


//View Records
router.get('/students', async(req,res)=>{
   
   try{

        const students = await studentModel.find({});
        res.send(students);
   }
   catch(error)
   {
        res.status(400).send(error);
   }

});


//find records

router.get('/students/:id', async(req,res)=>{
   
    try{
         const _id = req.student._id;
         const students = await studentModel.findById({_id});

        if(!students)
        {
            return res.status(404).send();
        }  
        return res.status(200).send(students); 
    }
    catch(error)
    {
         res.status(400).send(error);
 
    }

 });


//update records
 router.patch('/students/:id', async(req,res)=>{
   
    try{
        const _id = req.params.id;
        const body = req.body;
        const updatestudents = await studentModel.findByIdAndUpdate(_id,body,{new:true});

        if(!updatestudents)
        {
            return res.status(404).send();
        }  
     
        res.status(201).send(
            {
                "status" : true,
                "message" : "Student updateddd!!!!!!!!!!!!!!!!"
            });
 
    }
    catch(error)
    {
         res.status(400).send(error);
 
    }

 
 });


//delete records
 router.delete('/students/:id', async(req,res)=>{
   
    try{
            const _id = req.params.id;
        
         const deletestudents = await studentModel.findByIdAndDelete(_id);

        if(!deletestudents)
        {
            return res.status(404).send();
        }  
       
        res.status(201).send(
            {
                "status" : true,
                "message" : "Student Deletedd!!!!!!!!!!!!!!!!"
            });
    }
    catch(error)
    {
         res.status(400).send(error);
 
    }
 });


 router.post('/students/logout', async(req,res)=>{
   
    try{
            req.student.tokens = req.student.tokens.filter((token)=>{
                return token.token !== req.token;
            })

            await req.student.save()
            res.send()
    }
    catch(error)
    {
         res.status(400).send(error);
 
    }
 });

module.exports = router;