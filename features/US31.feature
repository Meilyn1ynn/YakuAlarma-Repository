Feature: US31: Registro de coordinador comunitario

Como administrador municipal
Quiero registrar coordinadores comunitarios
Para validar información local dentro de las comunidades

Scenario: Acceder al módulo de coordinadores

Dado que el administrador municipal ha iniciado sesión
Cuando accede al módulo de coordinadores
Entonces el sistema muestra el formulario de registro

Scenario: Registro exitoso

Dado que el administrador accede al módulo de coordinadores
Y completa correctamente los datos requeridos
Cuando presiona el botón "Registrar"
Entonces el sistema crea el perfil del coordinador

Scenario: Registro fallido

Dado que el administrador intenta registrar un coordinador
Cuando faltan datos obligatorios
Entonces el sistema muestra el mensaje "Datos incompletos"