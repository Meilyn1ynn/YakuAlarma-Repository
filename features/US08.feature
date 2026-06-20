Feature: US08: Registro de deslizamiento

 Como ciudadano
 Quiero reportar deslizamientos de tierra
 Para advertir a otros usuarios y autoridades

 Scenario: Acceder al reporte de deslizamiento

  Dado que el usuario se encuentra en el módulo de reportes
  Cuando selecciona "Deslizamiento"
  Entonces el sistema muestra el formulario correspondiente

 Scenario: Registro exitoso de deslizamiento

  Dado que el usuario completa correctamente el reporte
  Cuando presiona "Enviar"
  Entonces el sistema almacena el reporte

 Scenario: Registro fallido de deslizamiento

  Dado que el usuario intenta enviar un reporte
  Cuando ocurre un error de validación
  Entonces el sistema muestra un mensaje de error