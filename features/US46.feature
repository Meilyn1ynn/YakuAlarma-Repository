Feature: US46: Generación de reportes PDF

Como gestor municipal
Quiero exportar reportes en PDF
Para compartir información oficial con otras entidades

Scenario: Acceder a la exportación de reportes

Dado que el gestor municipal ha iniciado sesión
Cuando accede al módulo de reportes
Entonces el sistema muestra las opciones de exportación

Scenario: Exportación exitosa

Dado que el gestor selecciona información
Cuando presiona "Exportar PDF"
Entonces el sistema genera el archivo correctamente

Scenario: Error de exportación

Dado que el gestor intenta exportar información
Cuando ocurre un error del sistema
Entonces el sistema muestra el mensaje "No se pudo generar el PDF"