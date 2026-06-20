Feature: US22: Emisión de alertas municipales

Como gestor municipal
Quiero emitir alertas comunitarias
Para advertir a los ciudadanos sobre posibles riesgos

Scenario: Acceder al panel de alertas

Dado que el gestor municipal ha iniciado sesión
Cuando accede al módulo de alertas
Entonces el sistema muestra el formulario de emisión

Scenario: Emisión exitosa de alerta

Dado que el gestor accede al panel de alertas
Cuando redacta y envía una alerta válida
Entonces el sistema distribuye la notificación

Scenario: Emisión fallida de alerta

Dado que el gestor intenta emitir una alerta
Cuando deja campos obligatorios vacíos
Entonces el sistema muestra el mensaje "Complete la información requerida"