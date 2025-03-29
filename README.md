# AI Chat Backend

RESTful API backend for an AI chat application, built with Node.js, Express, and TypeScript, featuring JWT authentication, user management, and seamless integration with local AI models.

## 🚀 Features

- 🔐 User authentication with JWT (register/login)
- 👥 User management API
- 🤖 AI chat integration with local models
- 📚 Swagger API documentation

## 📋 Requirements

- Node.js 16.x or higher
- npm or pnpm
- Access to a local AI model (configured in environment variables)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ai-chat-backend.git
   cd ai-chat-backend
   ```
2. **Install dependencies**

   ```bash
   npm install
   # or with pnpm
   pnpm install
   ```
3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit the .env file with your settings
   ```

## ⚙️ Configuration

Configure your `.env` file with the following parameters:

```
# Server Configuration
PORT=3000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400

# AI Model Configuration
AI_BASE_URL=http://your-ai-model:1234/v1
```

## 🚀 Usage

### Development Mode

```bash
npm run dev
# or with pnpm
pnpm run dev
```

### Production Mode

```bash
npm run build
npm start
# or with pnpm
pnpm run build
pnpm start
```

## 🌐 API Endpoints

Once the server is running, you can access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

### 🔑 Authentication

- `POST /api/auth/register` - Register a new user

  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure_password"
  }
  ```
- `POST /api/auth/login` - Login

  ```json
  {
    "email": "john@example.com",
    "password": "secure_password"
  }
  ```
- `GET /api/auth/users` - Get all users (requires authentication)

### 🤖 AI Chat

- `POST /api/ai/chat` - Send messages to AI model (requires authentication)
  ```json
  {
    "max_tokens": 1000,
    "messages": [
      {
        "content": "Hello, how are you?",
        "role": "user"
      }
    ],
    "temperature": 0.7
  }
  ```

## 📝 License

ISC

## 👨‍💻 Author

Pablo Arismendi
