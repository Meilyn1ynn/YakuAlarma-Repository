Feature: US34: Comentarios sobre reportes

Como coordinador comunitario
Quiero agregar comentarios a los reportes
Para brindar contexto adicional a las autoridades

Scenario: Acceder al campo de comentarios

Dado que el coordinador revisa un reporte
Cuando selecciona la opción "Agregar comentario"
Entonces el sistema habilita el formulario de observaciones

Scenario: Comentario agregado correctamente

Dado que el coordinador revisa un reporte
Cuando escribe un comentario y lo guarda
Entonces el sistema registra la observación

Scenario: Error al guardar comentario

Dado que el coordinador intenta guardar un comentario
Cuando el texto excede el límite permitido
Entonces el sistema muestra el mensaje "Comentario demasiado largo"