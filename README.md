***

```markdown
# Yakualarma 📱🌧️

### Sistema Móvil de Reporte Comunitario de Lluvias Intensas y Movimientos en Masa

![Android](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![Offline First](https://img.shields.io/badge/Status-Offline--First-blue?style=for-the-badge)
![Social Impact](https://img.shields.io/badge/Focus-Social%20Impact-orange?style=for-the-badge)
![Region](https://img.shields.io/badge/Region-Per%C3%BA%20%F0%9F%87%B5%F0%9F%87%AA-red?style=for-the-badge)

---

## 📝 Descripción del Proyecto

**Yakualarma** es una solución de tecnología social diseñada específicamente para dotar a las comunidades rurales del Perú de herramientas tecnológicas accesibles para la gestión participativa del riesgo de desastres. 

Nuestra propuesta consiste en una **aplicación móvil nativa para Android** que opera de forma óptima en condiciones de baja o nula conectividad (enfoque *offline-first*). Permite a los ciudadanos y líderes comunales registrar y enviar reportes geolocalizados sobre eventos climáticos extremos. Toda esta información se consolida en un **Dashboard Web** diseñado para los equipos de gestión del riesgo de los gobiernos locales, permitiendo la activación de alertas tempranas y la coordinación oportuna de respuestas de emergencia.

---

## 🚨 Problemática y Antecedentes

El Perú es uno de los países de América Latina más expuestos a desastres de origen hidrometeorológico. De acuerdo con datos del **Instituto Nacional de Defensa Civil (INDECI, 2024)**:
* Durante la temporada de lluvias (noviembre–abril), fenómenos como **huaycos, deslizamientos y activación de quebradas** causan pérdidas humanas y materiales cuantiosas.
* Solo en la temporada **2023-2024 se registraron más de 4,200 emergencias** a nivel nacional, afectando a más de **800,000 personas**, con un impacto crítico en regiones como *Cajamarca, Ayacucho, Junín, Cusco y Puno*.

**El Desafío Tecnológico:**
Los canales tradicionales de reporte (llamadas, radio o desplazamiento físico) son sumamente lentos e ineficientes en zonas vulnerables y aisladas. La falta de conectividad móvil estable agrava la situación, retrasando la llegada de ayuda humanitaria y la activación de alertas de evacuación. **Yakualarma cierra esta brecha digital transformando a cada habitante en un agente activo de prevención.**

---

## ✨ Características Principales de la Solución

1. **Reportes Geolocalizados con Captura Multimedia:** Los usuarios pueden registrar de forma rápida el tipo de evento (lluvia intensa, deslizamiento, huayco, activación de quebrada), seleccionar el nivel de intensidad, añadir una descripción textual y adjuntar una fotografía. Las coordenadas GPS se capturan automáticamente en segundo plano.
2. **Modo Offline con Sincronización Automática:** El núcleo de la aplicación está preparado para zonas sin cobertura de red. Los reportes se almacenan localmente de forma segura mediante una base de datos embebida y se sincronizan de manera automática e invisible con el servidor en el momento exacto en que el dispositivo detecte señal (datos móviles o Wi-Fi).
3. **Mapeo Comunitario en Tiempo Real:** Visualización dinámica de los incidentes reportados en un mapa colaborativo. Está disponible tanto en la app móvil como en el panel web municipal, facilitando la identificación de zonas críticas o cuencas activadas.
4. **Módulo de Notificaciones y Alertas Push:** Un canal directo desde el dashboard municipal que permite enviar alertas geodirigidas a los teléfonos celulares de la población dentro del radio de la zona afectada, maximizando los tiempos de evacuación.

---

## 👥 Segmentos Objetivo y Perfiles de Usuario

Nuestra plataforma adapta su funcionalidad a cuatro actores clave en la cadena de prevención de desastres rurales:

| Segmento / Perfil | Descripción y Rol en el Ecosistema | Prioridad Tecnológica |
| :--- | :--- | :--- |
| **Pobladores Rurales** | Ciudadanos y líderes comunitarios en zonas de alta vulnerabilidad. Cuentan con smartphones de gama de entrada y habilidades digitales básicas. | Interfaz ultra-simplificada, intuitiva y funcionamiento 100% offline. |
| **Gestores Municipales** | Personal técnico de Gestión del Riesgo de Desastres en las Municipalidades Distritales. | Dashboard Web analítico para centralizar datos, mapear emergencias y emitir alertas masivas. |
| **Organizaciones No Gubernamentales (ONGs)** | Entidades de apoyo que desarrollan proyectos de prevención y desarrollo en la sierra y selva peruana. | Acceso a un histórico consolidado de eventos climáticos para planificación de infraestructura y mitigación a largo plazo. |
| **Instituciones Educativas y Comités Escolares** | Directores, docentes y padres de familia de escuelas rurales próximas a zonas de riesgo de huaycos. | Recepción de alertas tempranas rápidas para suspender clases o activar evacuaciones autónomas de estudiantes. |

---

## 🛠️ Arquitectura Tecnológica (Sugerida)

El ecosistema de **Yakualarma** se compone de de la siguiente manera:
* **Frontend Móvil:** Aplicación Nativa para Android (Kotlin / Java) con almacenamiento local (Room / SQLite) y APIs de Localización de Google Play Services.
* **Backend & API Gateway:** Microservicios construidos para la ingesta y procesamiento asíncrono de los reportes enviados.
* **Frontend Web:** Dashboard Administrativo para las municipalidades (React / Vue.js) con integraciones de mapas (Leaflet / Mapbox / Google Maps).

---

## 🚀 Instalación y Despliegue (Plantilla Inicial)

```bash
# 1. Clonar el repositorio
git clone [https://github.com/tu-usuario/yakualarma.git](https://github.com/tu-usuario/yakualarma.git)

# 2. Configurar variables de entorno (API Keys de mapas y Backend)
cp .env.example .env

# 3. Compilar el proyecto Android mediante Gradle
./gradlew assembleDebug
