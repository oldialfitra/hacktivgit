const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken')

class User {
    static signIn(req, res) {
        console.log('masuk ke sign iiiiiiiinnnnnnn')
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID
        })
            .then(function (ticket) {
                const payload = ticket.getPayload();
                console.log(payload)
                const userid = payload['sub'];
                const token = jwt.sign({
                    email: payload.email
                }, process.env.SECRET)
                res.status(200).json({token})
            })
    }
}

module.exports = User