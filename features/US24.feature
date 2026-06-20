Feature: US24: Configuración de notificaciones

Como ciudadano
Quiero configurar mis notificaciones
Para recibir únicamente alertas relevantes

Scenario: Acceder a configuraciones

Dado que el usuario ha iniciado sesión
Cuando selecciona la opción "Configuración"
Entonces el sistema muestra las preferencias disponibles

Scenario: Configuración exitosa

Dado que el usuario accede a configuraciones
Cuando modifica sus preferencias de notificación
Entonces el sistema guarda los cambios

Scenario: Error de configuración

Dado que el usuario intenta guardar cambios
Cuando ocurre una falla del sistema
Entonces el sistema muestra el mensaje "No se pudieron guardar los cambios"