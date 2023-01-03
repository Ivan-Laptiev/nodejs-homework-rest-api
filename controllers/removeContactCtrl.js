const contacts = require ("../models/contacts")
const {HttpError} = require ("../helpers")


const removeContactCtrl = async (req, res, next) => {
    try{
      const {contactId} = req.params;
      const result = await contacts.removeContact(contactId);
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