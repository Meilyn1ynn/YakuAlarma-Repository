Feature: US25: Alertas sonoras de emergencia

Como ciudadano
Quiero recibir alertas sonoras
Para reaccionar rápidamente ante un peligro

Scenario: Recepción de alerta crítica

Dado que el usuario tiene habilitadas las alertas
Cuando ocurre una emergencia crítica
Entonces el sistema envía una notificación sonora

Scenario: Alerta sonora exitosa

Dado que existe una alerta crítica
Cuando el sistema la envía al dispositivo
Entonces se reproduce un sonido de emergencia

Scenario: Error en alerta sonora

Dado que el sistema intenta reproducir la alerta
Cuando el dispositivo está en modo silencioso
Entonces el sistema muestra una notificación visual