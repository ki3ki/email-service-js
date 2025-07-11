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

You can test the email service in two ways:
1. Using API (via Render)
 POST request to: https://email-service-js-4wz7.onrender.com/send-email
 Request Body:
  {
  "messageId": "msg123",
  "to": "user@example.com",
  "subject": "Hello!",
  "body": "This is a test email from the deployed API."
}
 Use tools like Postman, cURL.
2. To simulate local behavior:
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

https://www.loom.com/share/6b2fd535ff514fe2abf528d9a5aa3e02?sid=35148f11-6d8b-4ac3-9b94-a3f5fe758780

---


☁️ Deployment
🚀 Live API URL:
https://email-service-js-4wz7.onrender.com/send-email

Hosted on Render (Free Tier) using Node.js and Express.
