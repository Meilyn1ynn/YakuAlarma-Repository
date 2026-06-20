Feature: US15: Visualización de rutas seguras

Como ciudadano
Quiero visualizar rutas seguras
Para desplazarme evitando zonas de peligro

Scenario: Acceder al módulo de rutas seguras

Dado que el usuario se encuentra en el mapa
Cuando selecciona la opción "Rutas seguras"
Entonces el sistema muestra las rutas disponibles

Scenario: Ruta mostrada correctamente

Dado que existen rutas registradas
Cuando el usuario solicita una ruta segura
Entonces el sistema muestra la alternativa recomendada

Scenario: Ruta no disponible

Dado que el usuario solicita una ruta
Cuando no existe información registrada
Entonces el sistema muestra el mensaje "Ruta no disponible"