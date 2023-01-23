const {BASE_URL} = process.env;

const createVerifyEmail = (email, verificationToken) => {
    const mail = {
        to: email,
        subject: 'Verify your email',
        html: `<a href= "${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank" rel="noopener noreferrer">Click verify email</a>`
    };
    return mail;

};

module.exports = createVerifyEmail;
