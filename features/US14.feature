Feature: US14: Visualización de nivel de riesgo

Como ciudadano
Quiero visualizar el nivel de riesgo de cada reporte
Para tomar decisiones de prevención adecuadas

Scenario: Acceder al indicador de riesgo

Dado que el usuario consulta reportes
Cuando visualiza la información de un evento
Entonces el sistema muestra su nivel de riesgo

Scenario: Visualización exitosa

Dado que existe un reporte validado
Cuando el usuario revisa sus detalles
Entonces el sistema muestra el nivel de riesgo correspondiente

Scenario: Información no disponible

Dado que el usuario consulta un reporte
Cuando aún no se ha determinado el nivel de riesgo
Entonces el sistema muestra el estado "Pendiente de evaluación"