Feature: US20: Identificación de zonas críticas

Como gestor municipal
Quiero identificar zonas críticas en el mapa
Para priorizar acciones de prevención y respuesta

Scenario: Acceder al análisis de zonas críticas

Dado que el gestor municipal ha iniciado sesión
Cuando accede al mapa comunitario
Entonces el sistema muestra la información de riesgo

Scenario: Identificación exitosa

Dado que existen múltiples reportes en una zona
Cuando el gestor revisa el mapa
Entonces el sistema resalta las áreas de mayor riesgo

Scenario: Sin zonas críticas

Dado que el gestor revisa el mapa
Cuando no existen concentraciones de eventos
Entonces el sistema muestra el estado "Sin alertas críticas"