$(document).ready(function() {
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

  var fichero;
  var storageRef;
  var databaseRef;
  var $progressBar = $('#progreso');

  // oculta la barra
  $progressBar.hide();

  function inicializar() {
    fichero = document.getElementById('fichero');

    fichero.addEventListener('change', subirImagen);

    // Create a root reference
    storageRef = firebase.storage().ref('images/');
    databaseRef = firebase.database().ref('images/');

    mostrarImagenes();
  }

  function subirImagen() {
    var imagenASubir = fichero.files[0];
    var uploadTask = storageRef.child(imagenASubir.name).put(imagenASubir);
    var $showUpload = $progressBar.find('#progress-bar-upload');

    $showUpload.css({ width: '0%' });
    $progressBar.fadeIn('slow');

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot) {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      $showUpload.css({ width: progress + '%' });
    }, function(error) {
    // Handle unsuccessful uploads
    }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var downloadURL = uploadTask.snapshot.downloadURL;

      crearNodoDB(imagenASubir.name, downloadURL);

      setTimeout(function() {
      // $progressBar.addClass('hidden');
        $progressBar.fadeOut('swing');
      }, 1000);
    });
  }

  function mostrarImagenes() {
    databaseRef.on('value', function(snapshot) {
      var datos = snapshot.val();
      var result = '';

      for (var key in datos) {
        result += '<img width="200" class="img-thumbnail" src="' + datos[key].url + '" />';
      }

      document.getElementById('imagenes-firebase').innerHTML = result;
    });
  }

  function crearNodoDB(nombreImagen, url) {
    databaseRef.push({
      name: nombreImagen,
      url: url
    });
  }

  window.onload = inicializar;
});
