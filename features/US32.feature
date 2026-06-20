Feature: US32: Confirmación comunitaria de reportes

Como coordinador comunitario
Quiero confirmar reportes locales
Para validar emergencias reales en mi comunidad

Scenario: Acceder a reportes pendientes

Dado que el coordinador ha iniciado sesión
Cuando accede al panel de validación
Entonces el sistema muestra los reportes pendientes

Scenario: Confirmación exitosa

Dado que existe un reporte pendiente
Cuando el coordinador confirma la información
Entonces el sistema actualiza el estado del reporte

Scenario: Confirmación fallida

Dado que el coordinador intenta validar un reporte
Cuando ocurre un error de conexión
Entonces el sistema muestra el mensaje "No se pudo validar el reporte"