Feature: US33: Rechazo de reportes falsos

Como coordinador comunitario
Quiero rechazar reportes falsos
Para evitar desinformación dentro de la comunidad

Scenario: Acceder al módulo de validación

Dado que el coordinador ha iniciado sesión
Cuando revisa un reporte recibido
Entonces el sistema muestra las opciones de validación

Scenario: Rechazo exitoso

Dado que existe un reporte falso
Cuando el coordinador lo rechaza
Entonces el sistema marca el reporte como inválido

Scenario: Error al rechazar reporte

Dado que el coordinador intenta rechazar un reporte
Cuando ocurre un error del sistema
Entonces el sistema muestra el mensaje "No se pudo completar la acción"