const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription.js")

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateSubscription
};