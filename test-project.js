require('dotenv').config({ path: '.env.local' });
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function checkProject() {
  try {
    console.log('🔍 Checking OpenAI project info...');
    console.log('API Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 10) + '...');
    
    // Try to get organization info
    const response = await openai.models.list();
    console.log('✅ API is working - got models list');
    console.log('Number of models available:', response.data.length);
    
    // Check if we can get billing info
    try {
      const billing = await openai.billing.subscription();
      console.log('✅ Billing info available');
      console.log('Current plan:', billing.plan);
    } catch (billingError) {
      console.log('❌ Cannot access billing info:', billingError.message);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkProject(); 