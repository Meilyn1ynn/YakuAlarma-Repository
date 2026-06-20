Feature: US03: Recuperación de contraseña

 Como ciudadano registrado
 Quiero recuperar mi contraseña
 Para volver a acceder a mi cuenta

 Scenario: Acceder a la recuperación de contraseña

  Dado que el usuario se encuentra en la pantalla de inicio de sesión
  Cuando selecciona la opción "Olvidé mi contraseña"
  Entonces el sistema muestra el formulario de recuperación

 Scenario: Recuperación exitosa

  Dado que el usuario ha registrado un correo electrónico válido
  Cuando ingresa su correo y solicita la recuperación
  Entonces el sistema envía un enlace de recuperación

 Scenario: Recuperación fallida

  Dado que el usuario intenta recuperar su contraseña
  Cuando ingresa un correo no registrado
  Entonces el sistema muestra el mensaje "Correo no encontrado"