import OpenAI from "openai";


/**
 * Function to send a request to OpenAI API with customizable parameters.
 * @param {string} model - The model to use (e.g., "gpt-4").
 * @param {string} systemPrompt - The system-level instruction for the model.
 * @param {string} userPrompt - The user-level instruction or prompt.
 * @param {string} apiKey
 * @returns {Promise<string>} - The response from OpenAI.
 */
export const getCompletion = async (model, systemPrompt, userPrompt, apiKey) => {
  // Initialize OpenAI instance with the public API key
  var openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    // Return the first message from the response
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw error;
  }
};