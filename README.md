# 📧 Resilient Email Sending Service

A simple, reliable email delivery service built using **JavaScript** that supports:
- Retry with exponential backoff
- Fallback between multiple email providers
- Idempotency to avoid duplicate sends
- Basic rate limiting
- Status tracking of email attempts

---

## 📁 Project Structure
src/
├── index.js
├── providers/
│ ├── providerA.js
│ └── providerB.js
├── services/
│ └── EmailService.js
├── utils/
│ ├── retry.js
│ └── rateLimiter.js
└── statusStore.js


---

## 🚀 Features

| Feature             | Description |
|---------------------|-------------|
| 🔁 Retry Logic       | Retries sending email up to 3 times with exponential backoff |
| 🔄 Fallback Support  | Switches to a secondary provider if the first fails |
| 🧠 Idempotency       | Avoids sending the same email more than once using `messageId` |
| 🚦 Rate Limiting     | Restricts email sends to 5 per minute |
| 📋 Status Tracking   | Stores and retrieves send status (success/failure, provider, timestamp) |

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/ki3ki/email-service-js.git
cd email-service-js

### 2. Install dependencies

```bash
npm init -y

### 3. Run the demo

```bash
node src/index.js

---

📦 Example Output
🔵 Trying Provider A...
❌ Provider A: Failed to send email
🟠 Trying Provider B...
✅ Provider B: Email sent successfully
🎉 Email sent successfully via ProviderB
✅ Final Result: { success: true, provider: 'ProviderB' }

---

🧪 Testing & Usage

can simulate multiple sends or failures by:
Re-running the index.js
Adjusting success rates in providerA.js and providerB.js
Sending the same messageId twice to test idempotency

---


📌 Assumptions
Uses mock email providers, not real email APIs.
All data stored in memory (no database).
Minimal dependencies, focused on core JavaScript.

---


📹 Screencast Demo

---


☁️ Deployment
