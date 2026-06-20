Feature: US50: Descarga de historial de emergencias

Como gestor municipal
Quiero descargar el historial de emergencias
Para conservar registros oficiales

Scenario: Acceder a la descarga de historial

Dado que el gestor municipal accede al módulo de emergencias
Cuando selecciona la opción "Descargar historial"
Entonces el sistema muestra las opciones de descarga

Scenario: Descarga exitosa

Dado que existen emergencias registradas
Cuando el gestor solicita la descarga del historial
Entonces el sistema genera el archivo correctamente

Scenario: Descarga fallida

Dado que el gestor intenta descargar información
Cuando ocurre un error del sistema
Entonces el sistema muestra el mensaje "No se pudo descargar el historial"