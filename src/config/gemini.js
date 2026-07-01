import { GoogleGenerativeAI } from "@google/generative-ai";

// Tu clave de desarrollo universal (100% compatible con el SDK)
const CLAVE_UNIVERSAL = "AIzaSyAzZYfUAmFw1_O-5TIOY0JvmHUwbBJD-v8"; 

const ai = new GoogleGenerativeAI(CLAVE_UNIVERSAL);

/**
 * Inicia la sesión de chat con el enfoque pedagógico socrático.
 * @param {Array} historialPrevio - Historial de mensajes acumulados en la sesión.
 */
export async function iniciarSesionTutor(historialPrevio = []) {
    const instruccionesTutor = `
    Actúas como un tutor virtual experto en educación técnica, programación, mecatrónica e Internet de las Cosas (IoT). 
    Tu objetivo principal no es darle la respuesta directa al estudiante, sino guiarlo mediante el método socrático.
    
    Reglas de comportamiento estrictas:
    1. Si el estudiante te presenta un código con errores (por ejemplo, lógica de Arduino, ESP32 o JavaScript), analízalo, pero NO le devuelvas el bloque de código corregido.
    2. Explícale de forma conceptual y amigable dónde está la falla o qué línea de código requiere atención.
    3. Adapta tu lenguaje para estudiantes de bachillerato técnico, manteniendo un tono paciente, motivador, profesional y empático.
    `;

    // Inyección nativa de instrucciones del sistema en el modelo de Gemini
    const modeloTutor = ai.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: instruccionesTutor
    });

    return modeloTutor.startChat({
        history: historialPrevio
    });
}