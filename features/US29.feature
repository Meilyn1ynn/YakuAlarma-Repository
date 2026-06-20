Feature: US29: Priorización de emergencias

Como gestor municipal
Quiero priorizar emergencias
Para asignar recursos eficientemente

Scenario: Acceder al módulo de prioridades

Dado que el gestor municipal ha iniciado sesión
Cuando accede a la gestión de emergencias
Entonces el sistema muestra las emergencias registradas

Scenario: Priorización exitosa

Dado que existen múltiples emergencias
Cuando el gestor asigna prioridades
Entonces el sistema organiza los reportes según criticidad

Scenario: Error de priorización

Dado que el gestor intenta guardar prioridades
Cuando ocurre un error del sistema
Entonces el sistema muestra el mensaje "No se pudo actualizar la prioridad"