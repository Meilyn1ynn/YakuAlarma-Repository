Feature: US27: Visualización de reportes ciudadanos

Como gestor municipal
Quiero visualizar reportes ciudadanos
Para tomar decisiones rápidas ante emergencias

Scenario: Acceder al panel de reportes

Dado que el gestor municipal ha iniciado sesión
Cuando accede al módulo de reportes
Entonces el sistema muestra la lista de reportes registrados

Scenario: Visualización exitosa

Dado que existen reportes registrados
Cuando el gestor accede al panel
Entonces el sistema muestra todos los reportes

Scenario: Error de visualización

Dado que el gestor accede al panel
Cuando ocurre una falla de servidor
Entonces el sistema muestra el mensaje "No se pudieron cargar los reportes"