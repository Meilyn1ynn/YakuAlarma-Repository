Feature: US12: Filtrado de reportes por tipo de evento

Como ciudadano
Quiero filtrar reportes por tipo de emergencia
Para visualizar únicamente información relevante

Scenario: Acceder a los filtros

Dado que el usuario se encuentra en el mapa de reportes
Cuando selecciona la opción "Filtrar"
Entonces el sistema muestra los criterios disponibles

Scenario: Filtrado exitoso

Dado que existen reportes registrados
Cuando el usuario selecciona un tipo de evento
Entonces el sistema muestra únicamente los reportes filtrados

Scenario: Sin resultados

Dado que el usuario aplica un filtro
Cuando no existen reportes asociados
Entonces el sistema muestra el mensaje "No se encontraron resultados"