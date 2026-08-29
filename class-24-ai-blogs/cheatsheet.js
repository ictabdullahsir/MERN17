/**
 * xAI Grok API Cheatsheet (Node.js)
 * 
 * RUN IT:
 * node grok-cheatsheet.js
 */

require('dotenv').config();
const OpenAI = require('openai');

// 1. INITIALIZATION & AUTHENTICATION
// Pass the xAI API Key and point the baseURL to xAI's endpoint
const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

// Default recommended model
const MODEL = 'grok-2-latest';


// ==========================================
// 1. BASIC CHAT COMPLETION
// ==========================================
async function simplePrompt() {
  console.log('--- 1. Simple Prompt ---');

  const response = await grok.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: 'You are a concise, ultra-smart backend engineering assistant.' },
      { role: 'user', content: 'Explain what an API gateway does in 2 sentences.' }
    ],
    temperature: 0.7,
  });

  console.log('Response:', response.choices[0].message.content);
}


// ==========================================
// 2. STRUCTURED JSON OUTPUT (ENFORCED SCHEMA)
// ==========================================
async function structuredOutput() {
  console.log('\n--- 2. Structured JSON Output ---');

  const ticket = "I got charged twice for my subscription this month on invoice #99281.";

  const response = await grok.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: 'system',
        content: `You are a ticket classifier. Respond ONLY with valid JSON matching this schema:
{
  "category": "Billing" | "Technical" | "General",
  "urgency": "High" | "Medium" | "Low",
  "summary": "string"
}`
      },
      { role: 'user', content: ticket }
    ],
    response_format: { type: 'json_object' } // Guarantees JSON parsing safety
  });

  const parsedData = JSON.parse(response.choices[0].message.content);
  console.log('Parsed JSON:', parsedData);
}


// ==========================================
// 3. STREAMING RESPONSES (REAL-TIME OUTPUT)
// ==========================================
async function streamResponse() {
  console.log('\n--- 3. Streaming Response ---');
  process.stdout.write('Grok is thinking: ');

  const stream = await grok.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'user', content: 'Give me 3 short developer mottos.' }
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    process.stdout.write(content);
  }
  console.log('\n');
}


// ==========================================
// 4. RESILIENT UTILITY WITH RETRIES & ERRORS
// ==========================================
async function safeGrokCall(prompt, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await grok.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error(`[Attempt ${attempt} Failed]:`, error.message);

      // Retry on Rate Limit (429) or Server Errors (5xx)
      const isTransient = error.status === 429 || error.status >= 500;
      if (!isTransient || attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff delay
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(res => setTimeout(res, delay));
    }
  }
}


// ==========================================
// RUN EXAMPLES
// ==========================================
async function main() {
  try {
    await simplePrompt();
    await structuredOutput();
    await streamResponse();

    console.log('--- 4. Safe Retry Utility Test ---');
    const result = await safeGrokCall('Say "Grok integrated successfully!"');
    console.log(result);
  } catch (err) {
    console.error('Fatal Error executing Grok API call:', err);
  }
}

main();