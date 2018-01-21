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

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function() {
        // Al registrarse el usuario, se pasa la función de verficación de usuario por medio de correo electrónico
        verify();
      })
      .catch(function(error) {
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

/* Observador de inicio de sesión de usuario */
function watcher() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Existe usuario activo');
      showLogOutBtn(user);
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      console.log(email);
      console.log(user);
      var emailVerified = user.emailVerified;
      console.log(emailVerified);
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

function showLogOutBtn(user) {
  var user = user;
  var content = $('.content');
  if (user.emailVerified) {
    content.html(`
      <p class="mt-3">Solo lo ve usuario</p>
      <button id="log-out">Cerrar sesión</button>
    `);
    logOut();
  }
}

function logOut() {
  var logOutBtn = $('#log-out');
  logOutBtn.on('click', function() {
    firebase.auth().signOut()
      .then(function() {
        console.log('Saliendo...');
      })
      .catch(function(error) {
        console.log(error);
      });
  });
}

/* ENVIAR CORREO PARA VERIFICAR USUARIO */
function verify() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
  // Email sent.
    console.log('Enviando correo');
  }).catch(function(error) {
  // An error happened.
    console.log('error');
  });
}


$(document).ready(begin);
