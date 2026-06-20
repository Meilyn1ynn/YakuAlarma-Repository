Feature: US43: Registro de actividad

Como administrador
Quiero visualizar registros de actividad
Para auditar acciones realizadas dentro del sistema

Scenario: Acceder al historial de actividad

Dado que el administrador ha iniciado sesión
Cuando accede al módulo de auditoría
Entonces el sistema muestra el historial de actividad

Scenario: Registro mostrado correctamente

Dado que existen acciones realizadas
Cuando el administrador revisa el historial
Entonces el sistema muestra los eventos registrados

Scenario: Error al cargar registros

Dado que el administrador intenta acceder al historial
Cuando ocurre una falla de servidor
Entonces el sistema muestra el mensaje "No se pudo cargar el historial"