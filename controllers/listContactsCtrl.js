 const contacts = require("../models/contacts");

 const listContactsCtrl = async (req, res, next) => {
    try {
     const result = await contacts.listContacts()
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