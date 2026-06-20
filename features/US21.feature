Feature: US21: Recepción de alertas push

Como ciudadano
Quiero recibir alertas push
Para estar informado sobre peligros cercanos

Scenario: Acceder a la configuración de alertas

Dado que el usuario ha iniciado sesión
Cuando habilita las notificaciones en la aplicación
Entonces el sistema registra sus preferencias de alerta

Scenario: Alerta recibida exitosamente

Dado que existe una alerta emitida
Cuando el usuario se encuentra en la zona afectada
Entonces el sistema envía una notificación push

Scenario: Error al enviar alerta

Dado que el sistema intenta enviar una alerta
Cuando el dispositivo no tiene conexión
Entonces la alerta queda pendiente de entrega