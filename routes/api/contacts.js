const express = require('express')

const ctrl = require("../../controllers")

const {isValidId} = require ("../../middlewares")

const router = express.Router()

router.get('/', ctrl.listContactsCtrl)

router.get('/:contactId', isValidId,  ctrl.getContactsByIdCtrl)

router.post('/', ctrl.addContactCtrl)

router.patch("/:contactId/favorite", isValidId, ctrl.updateContactFavoriteCtrl)

router.delete('/:contactId', isValidId, ctrl.removeContactCtrl)

router.put('/:contactId', isValidId,  ctrl.updateContactCtrl)

module.exports = router