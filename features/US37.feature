Feature: US37: Soporte de audio en lenguas nativas

Como ciudadano rural
Quiero escuchar instrucciones en mi lengua nativa
Para comprender mejor el funcionamiento de la aplicación

Scenario: Seleccionar idioma nativo

Dado que el usuario accede a las configuraciones
Cuando selecciona una lengua nativa disponible
Entonces el sistema guarda su preferencia

Scenario: Audio reproducido correctamente

Dado que el usuario selecciona una lengua nativa
Cuando accede a una sección de ayuda
Entonces el sistema reproduce instrucciones en audio

Scenario: Error de audio

Dado que el usuario intenta reproducir instrucciones
Cuando el archivo no está disponible
Entonces el sistema muestra el mensaje "Audio no disponible"