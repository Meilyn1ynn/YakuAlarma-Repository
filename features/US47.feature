Feature: US47: Estadísticas por región

Como gestor municipal
Quiero visualizar estadísticas por región
Para identificar zonas vulnerables

Scenario: Seleccionar una región

Dado que el gestor municipal accede al módulo estadístico
Cuando selecciona una región
Entonces el sistema consulta la información correspondiente

Scenario: Estadísticas regionales mostradas

Dado que existen datos registrados
Cuando el gestor selecciona una región
Entonces el sistema muestra indicadores estadísticos

Scenario: Región sin información

Dado que el gestor consulta una región
Cuando no existen datos disponibles
Entonces el sistema muestra el mensaje "No hay información registrada"