Feature: US44: Bloqueo de cuentas sospechosas

Como administrador
Quiero bloquear cuentas sospechosas
Para proteger la seguridad del sistema

Scenario: Acceder a la gestión de usuarios

Dado que el administrador ha iniciado sesión
Cuando accede al listado de usuarios
Entonces el sistema muestra las opciones de administración

Scenario: Bloqueo exitoso

Dado que el sistema detecta actividad sospechosa
Cuando el administrador confirma el bloqueo
Entonces la cuenta queda suspendida

Scenario: Error de bloqueo

Dado que el administrador intenta bloquear una cuenta
Cuando ocurre un error del sistema
Entonces el sistema muestra el mensaje "No se pudo bloquear la cuenta"