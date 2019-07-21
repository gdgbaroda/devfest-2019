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

function InitBinding() {
  // Shortcuts to DOM Elements.
  // this.subscribeButton = document.getElementById('subscribe-button');
  this.signInButton = document.getElementById('sign-in-button');
  this.signInButton2 = document.getElementById('sign-in-button-2');
  this.emailContainer = document.getElementById('email-container');

  // Bind events.
  // this.subscribeButton.addEventListener('click', this.subscribe.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  this.signInButton2.addEventListener('click', this.signIn.bind(this));
  firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

InitBinding.prototype.onAuthStateChanged = function(user) {
  if (user) {
    this.emailContainer.value = user.email;
    // this.emailContainer.innerText = user.email;
    this.userRef = firebase.database().ref('users/' + user.uid);
    this.userRef.on('value', function(data) {
      if (data.val() && data.val().subscribedToMailingList) {
        // this.subscribeButton.style.display = 'none';
      } else {
        // this.subscribeButton.style.display = 'inline-block';
      }
    }.bind(this));
  } else {
    if (this.userRef) {
      this.userRef.off();
    }
  }
};

// Signs-in Firebase.
InitBinding.prototype.signIn = function() {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result) {
    // If the user signs-in we automatically signs-him up for the newsletter.
    this.onAuthStateChanged(result.user);
    this.subscribe();
  }.bind(this));
};

// Subscribe to the newsletter.
InitBinding.prototype.subscribe = function() {
  return firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
    subscribedToMailingList: true,
    email: firebase.auth().currentUser.email
  });
};

window.addEventListener('load', function() {
  window.initBinding = new InitBinding();
});
