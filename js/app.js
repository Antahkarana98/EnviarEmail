document.addEventListener('DOMContentLoaded', function () {

  const email = {
    email: '',
    asunto: '',
    mensaje: ''
  }


  //Seleccionando los elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');
  const btnSubmmit = document.querySelector('#formulario button[type="submit"]');

  //agregando eventos a estos elementos

  inputEmail.addEventListener('input', validacion);
  inputAsunto.addEventListener('input', validacion);
  inputMensaje.addEventListener('input', validacion);


  //funcion para validar los campos y optimizar el codigo
  function validacion(e) {

    //como saber si el campo ingresado esta vacio, trim es para eliminar espacios en blanco
    if(e.target.value.trim() === '') {

      // Limpiar el valor por si eliminan un campo este quede vacio y comprobamos nuevamente
      email[e.target.name] = '';
      comprobarEmail();

      alertaError(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
      // si se cumple esto sale de la funcion
      return;
    }

    if(e.target.id === 'email' && !validarEmail(e.target.value)){

      // Limpiar el valor por si eliminan un campo este quede vacio y comprobamos nuevamente
      email[e.target.name] = '';
      comprobarEmail();

      alertaError('el email no es valido', e.target.parentElement);
      return;
    }

    // necesita saber que alerta en especificio limpiar
    limpiarAlerta(e.target.parentElement);

    //Asignar los valores al objeto
    email[e.target.id] = e.target.value.trim().toLowerCase();


    //comprobar el objeto email

    comprobarEmail();
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

  function limpiarAlerta(referencia) {
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

  function comprobarEmail() {
    console.log(email);
    if(Object.values(email).includes('')){
      btnSubmmit.classList.add('opacity-50');
      btnSubmmit.disabled = true;
      return;
    }
    btnSubmmit.classList.remove('opacity-50');
    btnSubmmit.disabled = false;

  }
})
