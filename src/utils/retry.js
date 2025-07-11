async function retryWithBackoff(fn, retries = 3, delay = 500) {
  let attempt = 0;

  while (attempt < retries) {
    try {
      return await fn(); // Try running the function
    } catch (err) {
      attempt++;
      if (attempt >= retries) {
        throw err; // All retries failed
      }
      console.log(`🔁 Retry attempt ${attempt} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff (double the delay)
    }
  }
}

module.exports = retryWithBackoff;
