const contacts = require ("../models/contacts")
const {contactSchema} = require ("../schemas")
const {HttpError} = require ("../helpers")

const updateContactCtrl = async (req, res, next) => {
    try{
      const {error} = contactSchema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message);
      }
      const {contactId} = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if(!result){
        throw HttpError(404, "Not found")
      }
  
      res.json(result)
    }
    catch(error) {
      next(error)
    }  
  }
  module.exports = updateContactCtrl