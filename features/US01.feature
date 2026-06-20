Feature: US01: Registro de usuario ciudadano
  Como poblador de una comunidad rural
  Quiero registrarme en Yakualarma
  Para acceder a las funcionalidades de reporte de emergencias

  Scenario: Acceder al formulario de registro

    Dado que el ciudadano se encuentra en la página principal de Yakualarma
    Cuando selecciona la opción "Registrarse"
    Entonces el sistema muestra el formulario de registro

  Scenario: Registro exitoso de usuario

    Dado que el ciudadano se encuentra en el formulario de registro
    Y ha ingresado correctamente sus datos personales
    Cuando presiona el botón "Registrarse"
    Entonces el sistema crea la cuenta
    Y muestra el mensaje "Bienvenido a Yakualarma"

  Scenario: Registro fallido de usuario

    Dado que el ciudadano se encuentra en el formulario de registro
    Cuando ingresa datos incompletos o incorrectos
    Y presiona el botón "Registrarse"
    Entonces el sistema muestra el mensaje "Verifique los datos ingresados"