const $form = document.querySelector('#form');
const $myModal = document.querySelector('#myModal');
const $modalButton = document.querySelector('#modal-button');
const $modalMensaje = document.querySelector('.modal-mensaje');
const $imageValidation = document.querySelector('#image-validation');

$form.addEventListener('submit', function (e) {
  e.preventDefault();
  const datos = new FormData(form);
  let nombre = datos.get('nombre');
  let zonaHoraria = datos.get('zona-horaria');
  let correo = datos.get('correo');
  let password = datos.get('password');
  let passwordCheck = datos.get('password-check');
  let aceptar = datos.get('aceptar');

  if (
    nombre == '' ||
    zonaHoraria == 'Zona Horaria' ||
    correo == '' ||
    password == '' ||
    passwordCheck == '' ||
    aceptar != 'on'
  ) {
    $imageValidation.src = '../imagenes/registro/error.png';
    $modalMensaje.textContent = 'Debe rellenar todos los campos del registro.';
    $myModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  } else {
    if (!validarEmail(correo)) {
      $imageValidation.src = '../imagenes/registro/error.png';
      $modalMensaje.textContent = 'El correo es invalido.';
      $myModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    } else if (!validarPassword(password, passwordCheck)) {
      $imageValidation.src = '../imagenes/registro/error.png';
      $modalMensaje.textContent = 'Las contraseñas no coinciden.';
      $myModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    } else {
      (async function () {
        let mensaje = await enviarData(datos);
        switch (mensaje) {
          case 'correcto':
            $imageValidation.src = '../imagenes/registro/correcto.png';
            $modalMensaje.textContent = 'Tu cuenta ya fue creada😎.';
            $myModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            break;
          case 'existe':
            $imageValidation.src = '../imagenes/registro/error.png';
            $modalMensaje.textContent = 'El usario ya existe😢.';
            $myModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            break;
          case 'error':
            $imageValidation.src = '../imagenes/registro/error.png';
            $modalMensaje.textContent =
              'Ocurrio un error, comunicate con la oficina.🙄';
            $myModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            break;
        }
      })();
    }
  }
});

$modalButton.addEventListener('click', function (e) {
  $myModal.style.display = 'none';
  document.body.style.overflow = 'visible';
});

async function enviarData(data) {
  const peticion = await fetch('../php/gestionar-usuario.php', {
    method: 'POST',
    body: data,
  });
  const result = await peticion.text();
  return result.slice(1, -1);
}

function validarPassword(password, passwordCheck) {
  if (password !== passwordCheck) {
    return false;
  } else {
    return true;
  }
}
function validarEmail(email) {
  emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}
