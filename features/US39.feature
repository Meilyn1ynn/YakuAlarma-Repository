Feature: US39: Cambio de tamaño de texto

Como usuario adulto mayor
Quiero aumentar el tamaño del texto
Para leer mejor la información mostrada

Scenario: Acceder a configuraciones de accesibilidad

Dado que el usuario ha iniciado sesión
Cuando accede a las opciones de accesibilidad
Entonces el sistema muestra las configuraciones disponibles

Scenario: Cambio exitoso de tamaño

Dado que el usuario accede a configuraciones
Cuando selecciona un tamaño de texto mayor
Entonces el sistema actualiza la interfaz

Scenario: Error al aplicar tamaño

Dado que el usuario intenta modificar el texto
Cuando ocurre un error interno
Entonces el sistema mantiene la configuración anterior