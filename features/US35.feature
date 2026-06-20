Feature: US35: Visualización de reportes locales

Como coordinador comunitario
Quiero visualizar reportes de mi comunidad
Para monitorear riesgos locales

Scenario: Acceder al panel comunitario

Dado que el coordinador ha iniciado sesión
Cuando accede a su panel local
Entonces el sistema muestra los reportes de la comunidad

Scenario: Visualización exitosa

Dado que existen reportes comunitarios
Cuando el coordinador accede al panel local
Entonces el sistema muestra los reportes de su zona

Scenario: Sin reportes disponibles

Dado que el coordinador revisa el panel
Cuando no existen reportes en la comunidad
Entonces el sistema muestra el mensaje "No existen reportes registrados"