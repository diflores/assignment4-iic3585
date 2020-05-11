importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js");
const config = {
  apiKey: "AIzaSyBCm_PbiKi8Yrjhlh5MfO-_T39ZzRzm7L8",
  authDomain: "jspotify-3aac1.firebaseapp.com",
  databaseURL: "https://jspotify-3aac1.firebaseio.com",
  projectId: "jspotify-3aac1",
  storageBucket: "jspotify-3aac1.appspot.com",
  messagingSenderId: "405634801275",
  appId: "1:405634801275:web:d4c2f62aac8a23d4de0cde",
  measurementId: "G-6722PQ4PL0"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const title = "JSpotify";
  const options = {
    body: payload.data.body
  };
  return self.registration.showNotification(title, options);
});
