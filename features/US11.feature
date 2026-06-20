Feature: US11: Visualización de reportes cercanos

Como ciudadano
Quiero visualizar reportes cercanos a mi ubicación
Para conocer los riesgos existentes en mi zona

Scenario: Acceder al mapa de reportes

Dado que el usuario ha iniciado sesión
Cuando selecciona la opción "Mapa de reportes"
Entonces el sistema muestra los reportes cercanos

Scenario: Visualización exitosa

Dado que existen reportes registrados en la zona
Cuando el usuario consulta el mapa
Entonces el sistema muestra los eventos geolocalizados

Scenario: Sin reportes cercanos

Dado que el usuario consulta el mapa
Cuando no existen reportes en su área
Entonces el sistema muestra el mensaje "No existen reportes cercanos"