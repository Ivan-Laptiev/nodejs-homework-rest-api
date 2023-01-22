const express = require("express");
const authenticate = require("../../middlewares/authenticate")
const { upload } = require("../../middlewares");

const ctrl = require("../../controllers/auth");

const authRouter = express.Router();

authRouter.post('/register', ctrl.register)

authRouter.get ("/verify/:verificationToken", ctrl.verify)

authRouter.post ("/verify", ctrl.resendVerify)

authRouter.post("/login",  ctrl.login)

 authRouter.get("/current",  authenticate, ctrl.getCurrent)

 authRouter.get("/logout",  authenticate, ctrl.logout)

 authRouter.patch("/",  authenticate, ctrl.updateSubscription)

 authRouter.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = authRouter;