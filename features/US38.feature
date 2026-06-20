Feature: US38: Tutorial inicial de uso

Como usuario nuevo
Quiero acceder a un tutorial inicial
Para aprender a utilizar la aplicación

Scenario: Primer acceso a la aplicación

Dado que el usuario instala Yakualarma por primera vez
Cuando inicia sesión
Entonces el sistema verifica si requiere tutorial

Scenario: Tutorial mostrado correctamente

Dado que el usuario instala la aplicación por primera vez
Cuando inicia sesión
Entonces el sistema muestra un tutorial interactivo

Scenario: Error al cargar tutorial

Dado que el usuario inicia la aplicación
Cuando el tutorial no puede cargarse
Entonces el sistema muestra el mensaje "No se pudo cargar el tutorial"