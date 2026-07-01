const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');

// Historial en memoria de la sesión actual para mantener el hilo socrático
let historialConversacion = [];

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const mensajeTexto = userInput.value.trim();
    if (!mensajeTexto) return;

    // 1. Mostrar el mensaje del estudiante en la interfaz gráfica
    agregarMensaje(mensajeTexto, 'user-message');
    userInput.value = ''; // Limpiar el campo de texto de inmediato

    // 2. Crear una burbuja de carga temporal con animación para el Tutor
    const burbujaCarga = agregarMensaje('Pensando...', 'assistant-message loading');

    try {
        // 3. Hacer la llamada HTTP POST usando una ruta relativa limpia (evita errores de CORS)
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mensaje: mensajeTexto,
                historial: historialConversacion
            })
        });

        // 4. Procesar la respuesta estructurada del backend
        const data = await response.json();
        
        // Quitar la animación de carga una vez que llega el paquete de datos
        burbujaCarga.remove();

        if (data.respuesta) {
            // 5. Renderizar la respuesta pedagógica de Gemini en pantalla
            agregarMensaje(data.respuesta, 'assistant-message');

            // 6. Sincronizar el historial siguiendo la estructura oficial del SDK
            historialConversacion.push({ role: 'user', parts: [{ text: mensajeTexto }] });
            historialConversacion.push({ role: 'model', parts: [{ text: data.respuesta }] });
        } else {
            agregarMensaje('⚠️ Hubo un problema al procesar la respuesta del tutor.', 'assistant-message error');
        }

    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        burbujaCarga.remove();
        agregarMensaje('❌ Error de conexión. Asegúrate de que la terminal muestre el puerto 3000 activo.', 'assistant-message error');
    }
});

/**
 * Función auxiliar para inyectar elementos DOM en el contenedor de mensajes
 * y formatear correctamente los saltos de línea devueltos por la IA.
 */
function agregarMensaje(texto, clase) {
    const div = document.createElement('div');
    div.className = `message ${clase}`;
    // Convierte saltos de línea en etiquetas HTML <br> para conservar el formato de la guía didáctica
    div.innerHTML = texto.replace(/\n/g, '<br>');
    chatMessages.appendChild(div);
    
    // Auto-scroll automático para mantener el foco en la última línea del diálogo técnico
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}