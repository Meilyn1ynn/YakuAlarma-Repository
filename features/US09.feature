Feature: US09: Adjuntar evidencia fotográfica

 Como ciudadano
 Quiero adjuntar fotografías
 Para respaldar mis reportes de emergencia

 Scenario: Acceder a la carga de imágenes

  Dado que el usuario está completando un reporte
  Cuando selecciona "Adjuntar fotografía"
  Entonces el sistema permite seleccionar imágenes

 Scenario: Carga exitosa de evidencia

  Dado que el usuario selecciona una imagen válida
  Cuando confirma la carga
  Entonces el sistema adjunta la fotografía al reporte

 Scenario: Carga fallida de evidencia

  Dado que el usuario intenta cargar una imagen
  Cuando el archivo no cumple los requisitos
  Entonces el sistema muestra el mensaje "Archivo no permitido"