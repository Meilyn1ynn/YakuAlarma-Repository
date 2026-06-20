Feature: US48: Comparación de eventos históricos

Como gestor municipal
Quiero comparar eventos históricos
Para analizar tendencias climáticas y riesgos futuros

Scenario: Seleccionar periodos de análisis

Dado que el gestor accede al módulo de análisis histórico
Cuando selecciona dos periodos de tiempo
Entonces el sistema prepara la comparación

Scenario: Comparación exitosa

Dado que existen registros históricos
Cuando el gestor selecciona periodos de tiempo
Entonces el sistema muestra gráficos comparativos

Scenario: Error de comparación

Dado que el gestor intenta comparar eventos
Cuando faltan datos históricos
Entonces el sistema muestra el mensaje "Información insuficiente"