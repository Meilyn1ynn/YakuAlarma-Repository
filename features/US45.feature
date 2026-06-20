Feature: US45: Respaldo automático de datos

Como administrador
Quiero generar respaldos automáticos
Para proteger la información almacenada

Scenario: Configurar respaldos automáticos

Dado que el administrador accede al módulo de respaldos
Cuando configura una programación automática
Entonces el sistema registra la configuración

Scenario: Respaldo exitoso

Dado que el sistema ejecuta el respaldo programado
Cuando finaliza el proceso
Entonces el sistema guarda una copia de seguridad

Scenario: Error en respaldo

Dado que el sistema intenta generar respaldo
Cuando ocurre una falla de almacenamiento
Entonces el sistema muestra el mensaje "Error al generar respaldo"