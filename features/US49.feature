Feature: US49: Indicadores de tiempo de respuesta

Como gestor municipal
Quiero medir tiempos de respuesta
Para evaluar la eficiencia en la atención de emergencias

Scenario: Acceder a los indicadores

Dado que el gestor municipal accede al dashboard
Cuando selecciona la opción "Indicadores"
Entonces el sistema muestra las métricas disponibles

Scenario: Indicadores generados correctamente

Dado que existen emergencias atendidas
Cuando el gestor revisa los indicadores
Entonces el sistema muestra métricas de tiempo de respuesta

Scenario: Error al generar indicadores

Dado que el gestor consulta métricas
Cuando no existen suficientes registros
Entonces el sistema muestra el mensaje "Datos insuficientes"