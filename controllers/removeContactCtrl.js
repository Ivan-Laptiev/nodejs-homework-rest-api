const {HttpError} = require ("../helpers")
const Contact = require("../models/contact");

const removeContactCtrl = async (req, res, next) => {
    try{
      const {contactId} = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.status(200).json("contact deleted");
    }
    catch(error) {
      next(error)
    }  
  }

  module.exports = removeContactCtrl