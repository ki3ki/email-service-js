class RateLimiter {
  constructor(maxCalls, interval) {
    this.maxCalls = maxCalls;           // Maximum emails allowed
    this.interval = interval;           // Time window (e.g., 60,000 ms = 1 min)
    this.timestamps = [];              // Track times of previous calls
  }

  allow() {
    const now = Date.now();

    // Remove timestamps that are outside the current window
    this.timestamps = this.timestamps.filter(ts => now - ts < this.interval);

    if (this.timestamps.length < this.maxCalls) {
      this.timestamps.push(now); // Log this call
      return true;               // Allow sending
    } else {
      return false;              // Deny — rate limit exceeded
    }
  }
}

module.exports = RateLimiter;
