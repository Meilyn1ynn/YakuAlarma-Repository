Feature: US07: Registro de inundación

 Como ciudadano
 Quiero reportar inundaciones
 Para informar situaciones de riesgo en mi comunidad

 Scenario: Acceder al reporte de inundación

  Dado que el usuario ha iniciado sesión
  Cuando selecciona el tipo de evento "Inundación"
  Entonces el sistema muestra el formulario correspondiente

 Scenario: Registro exitoso de inundación

  Dado que el usuario completa la información requerida
  Cuando envía el reporte
  Entonces el sistema registra la inundación correctamente

 Scenario: Registro fallido de inundación

  Dado que el usuario intenta registrar una inundación
  Cuando omite información obligatoria
  Entonces el sistema muestra un mensaje de error