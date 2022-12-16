document.addEventListener('DOMContentLoaded', function () {

  //Seleccionando los elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');

  //agregando eventos a estos elementos

  inputEmail.addEventListener('blur', validacion);
  inputAsunto.addEventListener('blur', validacion);
  inputMensaje.addEventListener('blur', validacion);


  //funcion para validar los campos y optimizar el codigo
  function validacion(e) {

    //como saber si el campo ingresado esta vacio, trim es para eliminar espacios en blanco
    if(e.target.value.trim() === '') {
      alertaError(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
      // si se cumple esto sale de la funcion
      return;
    }

    if(e.target.id === 'email' && !validarEmail(e.target.value)){
      alertaError('el email no es valido', e.target.parentElement);
      return;
    }

    // necesita saber que alerta en especificio limpiar
    limpiarAlerta(e.target.parentElement);
  }

  function alertaError(mensaje, referencia) {

    limpiarAlerta(referencia);

    //Generamos alerta
    const error = document.createElement('P');

    error.textContent = mensaje;

    //agregando clases de tailwind a la alerta de error

    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

    //inyectando HTML en el formulario

    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia){
    //evitar que se generen alertas infinitas
    const alerta = referencia.querySelector('.bg-red-600');

    if(alerta){
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }
})
