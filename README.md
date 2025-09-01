# Predusk-assessment

# Me-API Playground

A full-stack personal profile API demonstration project with both backend REST API and frontend interface.

## 🎯 Overview

This project demonstrates a complete "Me-API" system that stores and exposes personal profile information through RESTful endpoints, along with a minimal frontend to interact with the API. It's designed as a showcase of full-stack development capabilities.

## 🚀 Live Demo

- **Frontend Application**: [me-api-playground.vercel.app](https://me-api-playground.vercel.app)
- **API Base URL**: `https://me-api-playground-api.railway.app`

## 📁 Project Structure

```
me-api-playground/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Custom middleware (auth, validation)
│   │   ├── models/          # Data models and schemas
│   │   └── routes/          # API route definitions
│   ├── database/
│   │   ├── schema.sql       # Database schema
│   │   └── seed.sql         # Sample data
│   ├── package.json
│   └── server.js           # Main server file
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main application views
│   │   └── utils/          # Helper functions
│   ├── public/
│   └── package.json
├── docs/                   # Documentation
│   ├── API.md             # API documentation
│   └── DEPLOYMENT.md      # Deployment guide
└── README.md
```

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **CORS**: cors middleware
- **Environment**: dotenv

### Frontend
- **Framework**: React 18 (with Vite)
- **Routing**: React Router DOM
- **Styling**: Modern CSS (Flexbox/Grid)
- **HTTP Client**: Fetch API
- **Build Tool**: Vite

## 📊 Database Schema

### Profile Table
```sql
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id),
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    year VARCHAR(10) NOT NULL
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id),
    skill_name VARCHAR(100) NOT NULL
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    links TEXT[]
);

CREATE TABLE project_skills (
    project_id INTEGER REFERENCES projects(id),
    skill_id INTEGER REFERENCES skills(id),
    PRIMARY KEY (project_id, skill_id)
);

CREATE TABLE work_experience (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id),
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE profile_links (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id),
    github VARCHAR(255),
    linkedin VARCHAR(255),
    portfolio VARCHAR(255)
);
```

## 🔌 API Endpoints

### Profile Management
- `GET /api/profile` - Get complete profile information
- `POST /api/profile` - Create new profile
- `PUT /api/profile` - Update existing profile

### Query Endpoints
- `GET /api/projects?skill=<skill_name>` - Filter projects by skill
- `GET /api/skills/top` - Get top skills by project frequency
- `GET /api/search?q=<query>` - Search across all profile content

### Health Check
- `GET /health` - API health status and uptime

### Authentication (Optional)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- Protected routes require `Authorization: Bearer <token>` header

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/me-api-playground.git
   cd me-api-playground
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install

   # Create .env file
   cp .env.example .env
   # Edit .env with your database credentials

   # Setup database
   createdb me_api_dev
   psql me_api_dev < database/schema.sql
   psql me_api_dev < database/seed.sql

   # Start backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install

   # Create .env file
   echo "VITE_API_URL=http://localhost:3001" > .env

   # Start frontend server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🌍 Production Deployment

### Backend Deployment (Railway)

1. **Prepare for deployment**
   ```bash
   # Ensure all environment variables are set
   # DATABASE_URL, JWT_SECRET, NODE_ENV=production
   ```

2. **Deploy to Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login and deploy
   railway login
   railway init
   railway up
   ```

### Frontend Deployment (Vercel)

1. **Build and deploy**
   ```bash
   # Update API URL in .env.production
   echo "VITE_API_URL=https://your-api-domain.railway.app" > .env.production

   # Deploy to Vercel
   npx vercel --prod
   ```

### Database Setup (Railway PostgreSQL)

1. **Add PostgreSQL service**
   ```bash
   railway add postgresql
   ```

2. **Run migrations**
   ```bash
   # Connect to production database and run schema
   railway connect postgresql
   # Execute schema.sql and seed.sql
   ```

## 📝 Environment Variables

### Backend (.env)
```bash
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/me_api_dev
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3001
```

## 🧪 Testing

### API Testing with cURL

1. **Health Check**
   ```bash
   curl http://localhost:3001/health
   ```

2. **Get Profile**
   ```bash
   curl http://localhost:3001/api/profile
   ```

3. **Search**
   ```bash
   curl "http://localhost:3001/api/search?q=React"
   ```

4. **Filter Projects**
   ```bash
   curl "http://localhost:3001/api/projects?skill=JavaScript"
   ```

### Postman Collection
Import the `postman_collection.json` file included in the project for complete API testing.

## 🔒 Security Features

- JWT-based authentication for write operations
- Input validation and sanitization
- CORS configuration
- SQL injection prevention
- Rate limiting (optional)
- Environment variable protection

## 📊 Performance Considerations

- Database indexing on frequently queried fields
- API response caching
- Frontend code splitting
- Image optimization
- Gzip compression

## ❗ Known Limitations

- Single user profile (no multi-tenancy)
- Basic authentication implementation
- No real-time updates
- Limited pagination on large datasets
- No advanced search features (fuzzy matching)
- No file upload capabilities
- No audit logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

**Alex Johnson**
- GitHub: [@alexjohnson](https://github.com/alexjohnson)
- LinkedIn: [alex-johnson-dev](https://linkedin.com/in/alex-johnson-dev)
- Portfolio: [alexjohnson.dev](https://alexjohnson.dev)
- Email: alex.johnson@email.com

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- React team for the amazing framework
- Railway and Vercel for hosting solutions
- PostgreSQL for robust database features

