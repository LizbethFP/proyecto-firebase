/* VERSIÓN 2 */
function begin() {
  registerUser();
  enterUser();
  watcher();
}

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCataKupjoUlKChnSqbIYpdgB8CrThwIVc',
  authDomain: 'probando-fire.firebaseapp.com',
  databaseURL: 'https://probando-fire.firebaseio.com',
  projectId: 'probando-fire',
  storageBucket: 'probando-fire.appspot.com',
  messagingSenderId: '306737109623'
};
firebase.initializeApp(config);

function registerUser() {
  var buttonSend = $('#btn-send');
  buttonSend.on('click', function() {
    var email = $('#email').val();
    var password = $('#password').val();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
    console.log('diste clic');
  });
}

function enterUser() {
  var buttonEnter = $('#btn-enter');
  buttonEnter.on('click', function() {
    var email = $('#email-1').val();
    var password = $('#password-1').val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    console.log('accediste');
  });
}

/* Observador de inicio de sesión */
function watcher() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Existe usuario activo');
      show();
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      console.log(email);
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
    // ...
    } else {
    // User is signed out.
      console.log('No existe usuario activo');
    // ...
    }
  });
}

function show() {
  var content = $('.content');
  content.html(`
    <p class="mt-3">Solo lo ve usuario</p>
    <button id="log-out">Cerrar sesión</button>
  `);
  logOut();
}

function logOut() {
  firebase.auth().signOut()
    .then(function() {
      console.log('Saliendo...');
    })
    .catch(function(error) {
      console.log(error);
    });
}


$(document).ready(begin);
