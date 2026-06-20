Feature: US02: Inicio de sesión del ciudadano

 Como ciudadano registrado
 Quiero iniciar sesión en Yakualarma
 Para acceder a mis reportes y alertas

 Scenario: Acceder al formulario de inicio de sesión

  Dado que el usuario se encuentra en la página principal
  Cuando selecciona la opción "Iniciar sesión"
  Entonces el sistema muestra el formulario de acceso

 Scenario: Inicio de sesión exitoso

  Dado que el usuario posee una cuenta registrada
  Y ha ingresado correctamente su correo y contraseña
  Cuando presiona el botón "Ingresar"
  Entonces el sistema permite el acceso al panel principal

 Scenario: Inicio de sesión fallido

  Dado que el usuario intenta acceder al sistema
  Cuando ingresa credenciales incorrectas
  Y presiona el botón "Ingresar"
  Entonces el sistema muestra el mensaje "Correo o contraseña incorrectos"