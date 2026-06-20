Feature: US40: Botones de acceso rápido

Como ciudadano
Quiero tener botones rápidos
Para reportar emergencias fácilmente

Scenario: Acceder a la pantalla principal

Dado que el usuario ha iniciado sesión
Cuando accede a la pantalla principal
Entonces el sistema muestra accesos rápidos disponibles

Scenario: Acceso rápido exitoso

Dado que el usuario se encuentra en la pantalla principal
Cuando presiona un botón rápido
Entonces el sistema abre inmediatamente el formulario de reporte

Scenario: Error en acceso rápido

Dado que el usuario intenta usar un botón rápido
Cuando ocurre un error de carga
Entonces el sistema muestra el mensaje "No se pudo abrir la función"