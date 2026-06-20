Feature: US23: Visualización de historial de alertas

Como ciudadano
Quiero revisar alertas anteriores
Para mantenerme informado sobre eventos recientes

Scenario: Acceder al historial de alertas

Dado que el usuario ha iniciado sesión
Cuando selecciona la opción "Historial de alertas"
Entonces el sistema muestra la sección correspondiente

Scenario: Historial mostrado correctamente

Dado que existen alertas emitidas
Cuando el usuario accede al historial
Entonces el sistema muestra las alertas registradas

Scenario: Historial vacío

Dado que no existen alertas registradas
Cuando el usuario accede al historial
Entonces el sistema muestra el mensaje "No existen alertas"