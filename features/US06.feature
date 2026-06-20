 Feature: US06: Registro de lluvia intensa

  Como ciudadano
  Quiero reportar lluvias intensas
  Para alertar a la comunidad y autoridades

 Scenario: Acceder al módulo de reportes

  Dado que el ciudadano ha iniciado sesión
  Cuando selecciona la opción "Nuevo reporte"
  Entonces el sistema muestra el formulario de reporte

 Scenario: Reporte exitoso de lluvia intensa

  Dado que el ciudadano completa correctamente los datos del evento
  Cuando presiona el botón "Enviar"
  Entonces el sistema registra el reporte correctamente

 Scenario: Reporte fallido de lluvia intensa

  Dado que el ciudadano intenta registrar un reporte
  Cuando deja campos obligatorios vacíos
  Entonces el sistema muestra el mensaje "Complete todos los campos"