 const Contact = require("../models/contact");

 const listContactsCtrl = async (req, res, next) => {
    try {
     const result = await Contact.find()
   res.json(result)
 }
   catch(error){
     const {status= 500, message= "Server error"} = error;
     res.status(status).json({
       message,
     })
   } 
 }
 
 module.exports = listContactsCtrl;