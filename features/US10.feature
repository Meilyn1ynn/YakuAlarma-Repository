Feature: US10: Consulta de reportes enviados

 Como ciudadano
 Quiero consultar mis reportes enviados
 Para hacer seguimiento a mis alertas registradas

 Scenario: Acceder al historial de reportes

  Dado que el usuario ha iniciado sesión
  Cuando selecciona la opción "Mis reportes"
  Entonces el sistema muestra el historial de reportes

 Scenario: Visualización exitosa de reportes

  Dado que existen reportes registrados por el usuario
  Cuando accede al historial
  Entonces el sistema muestra todos los reportes enviados

 Scenario: Historial vacío

  Dado que el usuario no ha realizado reportes
  Cuando accede al historial
  Entonces el sistema muestra el mensaje "No existen reportes registrados"