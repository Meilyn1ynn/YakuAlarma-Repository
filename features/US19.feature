Feature: US19: Consulta de eventos por ubicación

Como ciudadano
Quiero consultar eventos según una ubicación específica
Para conocer los riesgos de una zona determinada

Scenario: Acceder a la búsqueda por ubicación

Dado que el usuario se encuentra en el mapa
Cuando selecciona la opción "Buscar ubicación"
Entonces el sistema muestra el buscador

Scenario: Consulta exitosa

Dado que existen eventos registrados
Cuando el usuario ingresa una ubicación válida
Entonces el sistema muestra los eventos asociados

Scenario: Sin eventos registrados

Dado que el usuario realiza una búsqueda
Cuando no existen eventos en la ubicación indicada
Entonces el sistema muestra el mensaje "No existen eventos registrados"