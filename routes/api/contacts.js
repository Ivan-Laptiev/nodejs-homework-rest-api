const express = require('express')

const ctrl = require("../../controllers")

const router = express.Router()

router.get('/', ctrl.listContactsCtrl)

router.get('/:contactId', ctrl.getContactsByIdCtrl)

router.post('/', ctrl.addContactCtrl)

router.delete('/:contactId', ctrl.removeContactCtrl)

router.put('/:contactId', ctrl.updateContactCtrl)

module.exports = router