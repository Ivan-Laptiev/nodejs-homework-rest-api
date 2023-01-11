const listContactsCtrl = require("./listContactsCtrl")
const getContactsByIdCtrl = require("./getContactByIdCtrl")
const addContactCtrl = require ("./addContactCtrl")
const removeContactCtrl = require("./removeContactCtrl")
const updateContactCtrl = require("./updateContactCtrl")
const updateContactFavoriteCtrl = require("./updateContactFavoriteCtrl")


module.exports = {
    listContactsCtrl,
    getContactsByIdCtrl,
    addContactCtrl,
    removeContactCtrl,
    updateContactCtrl,
    updateContactFavoriteCtrl
}