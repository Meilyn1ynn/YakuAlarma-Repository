Feature: US30: Generación de estadísticas

Como gestor municipal
Quiero visualizar estadísticas de eventos
Para analizar zonas de riesgo y tendencias

Scenario: Acceder al módulo de estadísticas

Dado que el gestor municipal ha iniciado sesión
Cuando selecciona la opción "Estadísticas"
Entonces el sistema muestra las herramientas de análisis

Scenario: Estadísticas generadas correctamente

Dado que existen reportes registrados
Cuando el gestor solicita estadísticas
Entonces el sistema genera gráficos e indicadores

Scenario: Error al generar estadísticas

Dado que el gestor solicita estadísticas
Cuando no existen datos suficientes
Entonces el sistema muestra el mensaje "No hay información disponible"