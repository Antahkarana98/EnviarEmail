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
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner');

  //agregando eventos a estos elementos

  inputEmail.addEventListener('input', validacion);
  inputAsunto.addEventListener('input', validacion);
  inputMensaje.addEventListener('input', validacion);
  formulario.addEventListener('submit', enviarEmail);

  btnReset.addEventListener('click', function(e){
    //prevenir la accion por defecto que en este caso es limpiar el formulario
    e.preventDefault();

    resetFormulario();
  });

  function enviarEmail(e){
    e.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');

      resetFormulario();

      // Crear una alerta
      const alertaExito = document.createElement('P');
      alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
      alertaExito.textContent = 'Mensaje enviado correctamente';

      formulario.appendChild(alertaExito);

      setTimeout(() => {
          alertaExito.remove();
      }, 3000);
    }, 3000);

  }


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

     if(Object.values(email).includes('')){
      btnSubmmit.classList.add('opacity-50');
      btnSubmmit.disabled = true;
      return;
    }
    btnSubmmit.classList.remove('opacity-50');
    btnSubmmit.disabled = false;
  }

  function resetFormulario() {

    //limpiando el objeto
    email.email = '';
    email.asunto = '';
    email.mensaje = '';

    formulario.reset();

    //validando si hay informacion
    comprobarEmail();
  }
})
