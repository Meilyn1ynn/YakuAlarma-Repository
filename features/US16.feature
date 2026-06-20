Feature: US16: Visualización de mapa comunitario

Como ciudadano
Quiero visualizar el mapa comunitario
Para identificar zonas afectadas y áreas seguras

Scenario: Acceder al mapa comunitario

Dado que el usuario ha iniciado sesión
Cuando selecciona la opción "Mapa comunitario"
Entonces el sistema muestra el mapa interactivo

Scenario: Visualización exitosa

Dado que existen reportes registrados
Cuando el usuario consulta el mapa
Entonces el sistema muestra los eventos geolocalizados

Scenario: Error al cargar el mapa

Dado que el usuario intenta acceder al mapa
Cuando ocurre un error de conexión
Entonces el sistema muestra el mensaje "No se pudo cargar el mapa"