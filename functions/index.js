'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailConfirmation = functions.database.ref('/users/{uid}').onWrite(async (change) => {
  const snapshot = change.after;
  const val = snapshot.val();

  if (!snapshot.changed('subscribedToMailingList')) {
    return null;
  }

  const mailOptions = {
    from: '"GDG Baroda" <gdgbaroda@gmail.com>',
    to: val.email,
  };

  const subscribed = val.subscribedToMailingList;

  // Building Email message.
  mailOptions.subject = subscribed ? 'Welcome: GDG DevFest Baroda 2019' : 'Sad to see you go :`(';
  mailOptions.text = subscribed ?
      'Thanks you for subscribing to receive GDG DevFest Baroda 2019 updates. You will receive our upcoming updates as we announce them. This email is not vaild as a confirmation to attend the event.' :
      'You have successfully unsubscribed to GDG DevFest Baroda 2019 updates.';
  
  try {
    await mailTransport.sendMail(mailOptions);
    console.log(`New ${subscribed ? '' : 'un'}subscription confirmation email sent to:`, val.email);
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
  return null;
});
