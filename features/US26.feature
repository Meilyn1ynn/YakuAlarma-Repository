Feature: US26: Inicio de sesión municipal

Como gestor municipal
Quiero iniciar sesión en el dashboard
Para monitorear emergencias y reportes ciudadanos

Scenario: Acceder al panel municipal

Dado que el gestor se encuentra en la página de acceso
Cuando selecciona "Iniciar sesión"
Entonces el sistema muestra el formulario de autenticación

Scenario: Inicio exitoso

Dado que el gestor tiene credenciales válidas
Cuando inicia sesión correctamente
Entonces el sistema muestra el dashboard municipal

Scenario: Inicio fallido

Dado que el gestor intenta acceder
Cuando ingresa datos incorrectos
Entonces el sistema muestra el mensaje "Acceso denegado"