Feature: US17: Ubicación de refugios temporales

Como ciudadano
Quiero visualizar refugios temporales
Para encontrar lugares seguros durante una emergencia

Scenario: Acceder al mapa de refugios

Dado que el usuario se encuentra en el mapa comunitario
Cuando selecciona la opción "Refugios"
Entonces el sistema muestra las ubicaciones registradas

Scenario: Visualización exitosa

Dado que existen refugios disponibles
Cuando el usuario consulta el mapa
Entonces el sistema muestra los refugios cercanos

Scenario: Sin refugios registrados

Dado que el usuario consulta la información
Cuando no existen refugios disponibles
Entonces el sistema muestra el mensaje "No existen refugios registrados"