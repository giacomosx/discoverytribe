const User = require('../models/User');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const newUser = (req, res, next) => {

    const msg = {
        to: req.body.email,
        from: "giacomo.bartoli@me.com", 
        subject: "Welcome aboard " + req.body.username,
        text: "Now you’re part of the Discovery Tribe family! ",
        html: "<strong>Now you’re part of the Discovery Tribe family!</strong>",
    };
    sgMail
    .send(msg)
    .then(() => {
        res.status(200).json({message: 'Email sent'})
    })
    .catch((error) => {
        res.status(500).json(error.message);
    });
};

const newPost = async (req, res, next) => {
    const user = await User.findById(req.user.userId);

    const msg = {
        to: user.email,
        from: "giacomo.bartoli@me.com",
        subject: "Post published",
        text: `Good news ${user.username}, you're post has been published! `,
        html: `<strong>Good news ${user.username}, you're post has been published!</strong>`,
    };
    sgMail
    .send(msg)
    .then(() => {
        res.status(201).json({message: 'Email sent'})
    })
    .catch((error) => {
        res.status(500).json(error.message);
    });
};

const inviteMail = async (req, res, next) => {

    const msg = {
        to: req.body.email,
        from: "giacomo.bartoli@me.com",
        subject: "DiscoveryTribe Membership",
        text: `Hello ${req.body.name}, you was invited to become a DiscoveryTribe Member, click in the link below to complete the registration
                http://localhost:5000/auth/register?token=${req.body.token}
            `,
        html: `<strong>Hello ${req.body.name}, you was invited to become a DiscoveryTribe Member, click in the link below to complete the registration</strong>
                http://localhost:5000/api/auth/register?token=${req.body.token}`,
    };
    sgMail
        .send(msg)
        .then(() => {
            res.status(201).json({message: 'Email sent'})
        })
        .catch((error) => {
            res.status(500).json(error.message);
        });
}


module.exports = {
    newUser,
    newPost,
    inviteMail
}


// https://github.com/sendgrid/sendgrid-nodejs