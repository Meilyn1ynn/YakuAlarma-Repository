Feature: US18: Visualización de centros de ayuda

Como ciudadano
Quiero visualizar centros de ayuda
Para acudir en caso de emergencia

Scenario: Acceder a centros de ayuda

Dado que el usuario consulta el mapa comunitario
Cuando selecciona la opción "Centros de ayuda"
Entonces el sistema muestra las ubicaciones disponibles

Scenario: Visualización exitosa

Dado que existen centros registrados
Cuando el usuario consulta la información
Entonces el sistema muestra las ubicaciones correspondientes

Scenario: Sin centros registrados

Dado que el usuario intenta visualizar centros de ayuda
Cuando no existen registros disponibles
Entonces el sistema muestra el mensaje "No existen centros registrados"