Feature: US28: Validación de reportes comunitarios

Como gestor municipal
Quiero validar reportes comunitarios
Para confirmar emergencias reales

Scenario: Acceder a reportes pendientes

Dado que el gestor municipal ha iniciado sesión
Cuando accede a la sección de validaciones
Entonces el sistema muestra los reportes pendientes

Scenario: Validación exitosa

Dado que existe un reporte pendiente
Cuando el gestor confirma la información
Entonces el sistema marca el reporte como validado

Scenario: Rechazo de reporte

Dado que el gestor revisa un reporte
Cuando detecta información falsa o duplicada
Entonces el sistema marca el reporte como rechazado