/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
exports.sendEmailConfirmation = functions.database.ref('/users/{uid}').onWrite(async (change, context) => {
  const beforeData = change.before.val();
  const afterData = change.after.val();

  if (!afterData) {
    return null;
  }

  const mailOptions = {
    from: '"GDG Baroda" <gdgbaroda@gmail.com>',
    to: afterData.email,
  };

  const subscribed = afterData.subscribedToMailingList;

  // Building Email message.
  mailOptions.subject = subscribed ? 'Welcome: GDG DevFest Baroda 2022' : 'Sad to see you go :`(';
  mailOptions.text = subscribed ?
      'Thank you for subscribing to receive GDG DevFest Baroda 2022 updates!\n\nYou will receive our upcoming updates as we announce them.\n\nJoin us here: https://join.slack.com/t/gdgbaroda/shared_invite/enQtMzQ2MzIzMTU0NDk5LTA3NWQ3Y2RhMjUyNmY2ZWI5MGE4YzVkZDI5MTNhMGQ0MDUxZWI1ZTJjNTNlM2E3YTViNTcyZjQ0ZmUwMDhhYzU\n\nNOTE: This email is not vaild as a confirmation to attend the event.' :
      'You have successfully unsubscribed to GDG DevFest Baroda 2022 updates.';
  
  try {
    await mailTransport.sendMail(mailOptions);
    console.log(`New ${subscribed ? '' : 'un'}subscription confirmation email sent to:`, afterData.email);
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
  return null;
});
