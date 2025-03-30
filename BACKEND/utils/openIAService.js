const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function callOpenAIFunction(messages, tools) {
    try {
        console.log("Enviando solicitud a OpenAI:", { messages, tools });

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
            ...(tools ? { tools, tool_choice: "auto" } : {}),
        });

        console.log("Respuesta de OpenAI:", response);

        const responseMessage = response.choices[0].message;

        if (tools) {
            const toolCalls = responseMessage.tool_calls;
            if (toolCalls) {
                return { toolCalls: toolCalls, message: responseMessage.content };
            }
        }

        return { message: responseMessage.content };

    } catch (error) {
        console.error("Error en OpenAI:", error);
        return { error: "No se pudo procesar la solicitud." };
    }
}

module.exports = { callOpenAIFunction };