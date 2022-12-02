const authenticate = require('../authenticate')

const sendEmail = (req, res, next) => {
    try {
        const user = req.user;
        console.log(user);
        authenticate.sendEmail(user.username, req.body.imgData);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json('fine');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendEmail
}