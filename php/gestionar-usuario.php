<?php

include_once('conexiondb.php');
$nombre = $_POST['nombre'];
$zonaHoraria = $_POST['zona-horaria'];
$correo = $_POST['correo'];
$password = $_POST['password'];
$sentenceSearch = 'select * from clientes';
$sentenceCreateUser = "insert into clientes(nombre,zonahoraria,correo,password) values('$nombre','$zonaHoraria','$correo','$password')";

$isUsuario = false;
$result = mysqli_query($connect, $sentenceSearch);
while ($row = mysqli_fetch_array($result)) {
  if ($row['correo'] == $correo) {
    $isUsuario = true;
  };
};

if ($isUsuario) {
  echo json_encode('existe');
} else {
  $check = mysqli_query($connect, $sentenceCreateUser);
  if ($check == '1') {
    echo json_encode('correcto');
  } else {
    echo json_encode('error');
  }
}
