async function testApi() {
  try {
    const res = await fetch('http://localhost:5005/api/exams/state-psc');
    const text = await res.text();
    console.log('API RESPONSE OK!');
    console.log(text.substring(0, 100)); // Print just the first 100 characters to verify it's the JSON
  } catch (err) {
    console.error('API ERROR:', err.message);
  }
}
testApi();
