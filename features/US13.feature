Feature: US13: Consulta de detalles de un reporte

Como ciudadano
Quiero consultar los detalles de un reporte
Para obtener información más precisa sobre una emergencia

Scenario: Acceder a los detalles de un reporte

Dado que el usuario visualiza reportes en el mapa
Cuando selecciona uno de ellos
Entonces el sistema muestra la información detallada

Scenario: Consulta exitosa

Dado que existe un reporte registrado
Cuando el usuario accede a sus detalles
Entonces el sistema muestra descripción, ubicación y fecha

Scenario: Error de consulta

Dado que el usuario intenta abrir un reporte
Cuando ocurre un error de carga
Entonces el sistema muestra el mensaje "No se pudo cargar la información"