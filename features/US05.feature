Feature: US05: Registro de ubicación geográfica

 Como ciudadano
 Quiero registrar mi ubicación
 Para que los reportes incluyan información geográfica precisa

 Scenario: Acceder al registro de ubicación

  Dado que el usuario se encuentra creando un reporte
  Cuando selecciona la opción "Agregar ubicación"
  Entonces el sistema solicita permisos de geolocalización

 Scenario: Registro exitoso de ubicación

  Dado que el usuario ha otorgado permisos de ubicación
  Cuando el sistema obtiene las coordenadas
  Entonces la ubicación queda asociada al reporte

 Scenario: Registro fallido de ubicación

  Dado que el sistema intenta obtener la ubicación
  Cuando el GPS está desactivado
  Entonces el sistema muestra el mensaje "Active la ubicación del dispositivo"