'use strict';

function InitBinding() {
  // Shortcuts to DOM Elements.
  this.subscribeButton = document.getElementById('subscribe-button');
  this.emailContainer = document.getElementById('email-container');
  this.subscribedTextContainer = document.getElementById('subscribed-text-container');
  this.nameContainer = document.getElementById('name-container');
  
  // Bind events.
  this.subscribeButton.addEventListener('click', this.subscribe.bind(this));
}

InitBinding.prototype.subscribe = function() {
  
  // replace firebase.auth().currentUser.uid with email
  // return firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
  return firebase.database().ref('users/' + "sneh.pandya1@gmail.com").set({
    subscribedToMailingList: true,

    // replace firebase.auth().currentUser.uid with email
    // email: firebase.auth().currentUser.email
    email: "sneh.pandya1@gmail.com"
  });
}

window.addEventListener('load', function() {
  window.initBinding = new InitBinding();
});