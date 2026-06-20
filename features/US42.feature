Feature: US42: Gestión de permisos

Como administrador
Quiero gestionar permisos de usuarios
Para controlar los niveles de acceso dentro del sistema

Scenario: Acceder a la gestión de permisos

Dado que el administrador ha iniciado sesión
Cuando accede al módulo de administración
Entonces el sistema muestra la gestión de usuarios y permisos

Scenario: Permisos asignados correctamente

Dado que el administrador selecciona un usuario
Cuando asigna permisos específicos
Entonces el sistema actualiza el nivel de acceso

Scenario: Error de asignación

Dado que el administrador intenta asignar permisos
Cuando ocurre una falla del sistema
Entonces el sistema muestra el mensaje "No se pudieron actualizar los permisos"