Feature: US04: Actualización de perfil de usuario

 Como ciudadano registrado
 Quiero actualizar mis datos personales
 Para mantener mi información actualizada

 Scenario: Acceder al perfil de usuario

  Dado que el usuario ha iniciado sesión
  Cuando selecciona la opción "Mi perfil"
  Entonces el sistema muestra la información de su cuenta

 Scenario: Actualización exitosa

  Dado que el usuario se encuentra en su perfil
  Cuando modifica sus datos y guarda los cambios
  Entonces el sistema actualiza la información correctamente

 Scenario: Actualización fallida

  Dado que el usuario intenta actualizar sus datos
  Cuando ingresa información inválida
  Entonces el sistema muestra un mensaje de validación