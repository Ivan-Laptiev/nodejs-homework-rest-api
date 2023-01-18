const fs = require("fs/promises");
const path = require("path");
const Jimp = require('jimp');

const {User} = require ("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars" );

const updateAvatar = async(req, res) => {
        const {path: tempUpload, originalname} = req.file;
        const {_id} = req.user;
        const imageName = `${_id}_${originalname}`;
    
    try {
        const updateImg = await Jimp.read(tempUpload);
        updateImg.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(tempUpload);

        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);

        const avatarURL = path.join("avatars", imageName);
        await User.findByIdAndUpdate(_id, {avatarURL}); 


res.json({
    avatarURL,
})
} catch (error) {
    await fs.unlink(tempUpload);
    throw error;
}

}

module.exports = updateAvatar;