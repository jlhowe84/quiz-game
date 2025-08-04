require('dotenv').config({ path: '.env.local' });
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testAPI() {
  try {
    console.log('Testing OpenAI API...');
    console.log('API Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 10) + '...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'Hello, API is working!'"
        }
      ],
      max_tokens: 50,
    });

    console.log('✅ API Response:', completion.choices[0]?.message?.content);
  } catch (error) {
    console.error('❌ API Error:', error.message);
    console.error('Error details:', error);
  }
}

testAPI(); 