document.addEventListener('DOMContentLoaded', function () {

  //Seleccionando los elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');

  //agregando eventos a estos elementos

  inputEmail.addEventListener('blur', validacion);
  inputAsunto.addEventListener('blur', validacion);
  inputMensaje.addEventListener('blur', validacion);


  //funcion para validar los campos y optimizar el codigo
  function validacion(e) {

    //como saber si el campo ingresado esta vacio, trim es para eliminar espacios en blanco
    if(e.target.value.trim() === '') {
      alertaError();
    } else{
      console.log("Tiene algo...");
    }
  }

  function alertaError() {
    const error = document.createElement('P');

    error.textContent = 'Hubo un error...';
    console.log(error);
    console.log(error);
  }
})
