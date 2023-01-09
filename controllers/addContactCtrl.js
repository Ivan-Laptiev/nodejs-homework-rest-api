const {contactSchema} = require ("../schemas")
const {HttpError} = require ("../helpers");
const Contact = require("../models/contact");



const addContactCtrl = async (req, res, next) => {
    try{
      const {error} = contactSchema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message);
      }
      const result = await Contact.create(req.body);
      res.status(201).json(result);
    }
    catch(error) {
      next(error)
    }  
  }

  module.exports = addContactCtrl