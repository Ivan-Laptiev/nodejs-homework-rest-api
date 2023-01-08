const {HttpError} = require("../helpers");
const Contact = require("../models/contact");

const getContactsByIdCtrl = async (req, res, next) => {
    try{
      const {contactId} = req.params;
      const result = await Contact.findById(contactId);      
      if(!result){
        throw HttpError(404, "Not found")
      }  
      res.json(result)
    }
    catch(error) {
      next(error)
    }  
  };

  module.exports = getContactsByIdCtrl;