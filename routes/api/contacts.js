const express = require('express')

const ctrl = require("../../controllers/contacts")

const {isValidId, authenticate} = require ("../../middlewares")

const contactsRouter = express.Router()

contactsRouter.get('/', authenticate, ctrl.listContactsCtrl)

contactsRouter.get('/:contactId', authenticate, isValidId,  ctrl.getContactsByIdCtrl)

contactsRouter.post('/', authenticate, ctrl.addContactCtrl)

contactsRouter.patch("/:contactId/favorite", authenticate, isValidId, ctrl.updateContactFavoriteCtrl)

contactsRouter.delete('/:contactId', authenticate, isValidId, ctrl.removeContactCtrl)

contactsRouter.put('/:contactId', authenticate, isValidId,  ctrl.updateContactCtrl)

module.exports = contactsRouter;