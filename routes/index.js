"use strict";
const express = require("express");
const router = express.Router();
const ip = require("ip");
const ipAddress = ip.address();
var rand = require("random-key");
var { encrypt, decrypt } = require('../core/crpyto');
var createQuestion = require('../core/createQuestion')
console.log("Hii IP ==>>",ipAddress)


/* GET home page. */
router.get("/", function (request, response, next) {
    response.render("welcome", {
      title: "Express Page for application.",
    });
  });


  router.post("/Createquestion", async function (req, res) {
    var data = req.body;
    console.log(data.data.id,"data====",data)
    var item={
      question: data.data
     }
   
     if(data.data.id.length >3){
       console.log("9nsidw to delete",data.data.id.length)
      await createQuestion.findOneAndDelete({
        "_id" : data.data.id
      })
     }
     
     const userObj = new createQuestion(item);
     await userObj.save(function (error, result) {
       console.log("====",error,result)
      //
      if(result){
        res.send({
          status:200,
          result: "Successfully",
        }); 
      }
      else if(error['code'] == 11000){
        res.send({
          status: 400,
          result: "",
        });
    }
    });
  
         
  });


  router.get("/getData", async function (req, res) {
    var results 
  
    await createQuestion.find().then((response) => {
    console.log("login res",response)
    if (response.length == 0) {
        res.send({
          "status": 404,
          "message": "Details Not Found"        
        });
    } else {
    
      res.send({
        "status":200,
        "Details": response,
      });
    
    }
  });
  });



module.exports = router ;

