# Notas de accesibilidad para la UI
Buscar el mínimo nivel AA de accesibilidad

**Nivel AA:** Accesibilidad Mejorada
El nivel AA incluye todos los criterios del nivel A, además de requisitos adicionales que abordan problemas de accesibilidad más comunes y significativos.

Este nivel está diseñado para ser el estándar mínimo para proyectos que buscan alcanzar una buena accesibilidad web. Incluye criterios como el contraste de color más estricto entre el texto y sus fondos, la navegación más clara y predecible, y la compatibilidad con lectores de pantalla. 

- **Principios clave**
    - **Perceptible**
    - **Operable**
    - **Comprensible**
    - **Robusto**
1. Se podrá navegar a través del teclado (tabindex)
    1. Toda funcionalidad debe ser accesible con `Tab` y `Enter` sin depender del mouse
2. Uso semántico del HTML (usar las etiquetas adecuadas para el tipo de contenido)
    1. Agregar atributos Aria (ayuda a los lectores de pantalla)
3. Tiempo suficiente para leer mensajes (evitar timeouts automáticos)
4. Lenguaje claro y simple (evitar jerga técnica innecesaria).
    1. Mensajes de error descriptivos (ej: "La palabra X puede ser ofensiva").
5. Colores
    1. Buscar contraste de colores entre texto y fondo adecuado
    2. Ofrecen al menos 2 modos de color (claro y oscuro)
6. Tamaño del texto ajustable sin romper la interfaz al menos 200% -> incluso que el texto crezca si necesidad de que toda la interfaz lo haga
7. Mensajes claros, evitar como “Error” sin explicación, ejemplo: “Corregimos para mayor claridad”
8. Si se puede integrar modo lectura accesible para mensajes largos (azure immersive reader)
9. Colores diferentes para los mensajes del usuario y sistema
10. Tipografía clara 
11. Animaciones sutiles
12. El uso de íconos / emojis puede enriquecer el contexto
13. Navegación intuitiva
    1. Añadir puntos de referencia y enlaces de salto, o garantizar que las funciones sean completamente accesibles con el teclado, puede solucionar algunos de estos problemas.

### Recursos interesantes

- https://wave.webaim.org/
- https://www.linkedin.com/advice/0/how-can-ai-systems-designed-more-accessible-3lswf?lang=es&lang=es&originalSubdomain=es
- https://action.bot/blog/chatbots-and-web-accessibility/
- https://medium.com/globant/making-chatbots-accessible-6cce73904927

[Una de nuestras últimas implementaciones para la Universidad de Silesia en Katowice](https://action-bot.translate.goog/blog/case-study-a-chatbot-for-the-education-sector/?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=wapp) demuestra que nuestro chatbot cumple a la perfección con las directrices WCAG. Creamos una solución que ofrece a estudiantes, candidatos y empleados una forma sencilla de navegar por los amplios recursos del sitio web de la universidad. Pero lo más importante es que incluye seis versiones de contraste y tres colores diferentes para que sea más accesible. También hemos diseñado rutas de diálogo que activan mecanismos que animan a los usuarios a interactuar. Todo ello con una interfaz de usuario intuitiva.


