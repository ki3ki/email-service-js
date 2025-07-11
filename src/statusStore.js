const store = {}; // In-memory object to track email status

function isAlreadySent(messageId) {
  return messageId in store;
}

function markAsSent(messageId, provider, success = true) {
  store[messageId] = {
    provider: provider || 'N/A',
    status: success ? 'success' : 'failure',
    timestamp: new Date().toISOString()
  };
}

function getStatus(messageId) {
  return store[messageId] || null;
}

module.exports = {
  isAlreadySent,
  markAsSent,
  getStatus
};