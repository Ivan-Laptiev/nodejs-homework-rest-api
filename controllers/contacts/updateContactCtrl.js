const {contactSchema} = require ("../../schemas")
const {HttpError} = require ("../../helpers")
const Contact = require("../../models/contact");

const updateContactCtrl = async (req, res, next) => {
    try{
      const {error} = contactSchema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message);
      }
      const {contactId} = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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