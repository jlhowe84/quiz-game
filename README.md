# Quiz Master

A personalized quiz game built with Next.js, TypeScript, and SQLite that adapts questions based on user age, education level, and interests.

## Features

- **Personalized Experience**: Collects player profile (age, education, interests) to tailor questions
- **Category Selection**: Multiple quiz categories with visual cards
- **AI-Powered Questions**: OpenAI integration for dynamic question generation
- **Progress Tracking**: Save and track user performance across sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Simple & Lightweight**: SQLite database with zero configuration

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (serverless)
- **Database**: SQLite with Prisma ORM
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz-game
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
OPENAI_API_KEY="your-openai-api-key-here"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
quiz-game/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   ├── categories/ # Category endpoints
│   │   │   └── questions/  # Question endpoints
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── CategoryCard.tsx
│   │   └── PlayerProfileForm.tsx
│   ├── lib/               # Utility functions
│   │   └── db.ts          # Database connection
│   ├── store/             # State management
│   │   └── quiz-store.ts  # Zustand store
│   └── types/             # TypeScript definitions
│       └── index.ts
├── prisma/                # Database schema
│   └── schema.prisma
├── public/                # Static assets
└── package.json
```

## Database Schema

The application uses SQLite with the following main tables:

- **users**: User profiles and preferences
- **categories**: Quiz categories
- **questions**: Quiz questions with metadata
- **quiz_sessions**: Individual quiz attempts
- **user_progress**: User performance tracking

## Development Phases

### Phase 1: MVP (Current)
- ✅ Basic project setup
- ✅ Player profile collection
- ✅ Category selection interface
- ✅ Database schema
- ✅ Basic UI components

### Phase 2: Core Functionality
- [ ] Quiz session management
- [ ] Question display and answering
- [ ] Timer functionality
- [ ] Results and scoring
- [ ] Basic analytics

### Phase 3: AI Integration
- [ ] OpenAI API integration
- [ ] Dynamic question generation
- [ ] Profile-based question filtering
- [ ] Difficulty adaptation

### Phase 4: Advanced Features
- [ ] User authentication
- [ ] Progress tracking
- [ ] Social features
- [ ] Mobile optimization

## API Endpoints

### Categories
- `GET /api/categories` - Fetch all categories
- `POST /api/categories` - Create new category

### Questions
- `GET /api/questions` - Fetch questions with filters
- `POST /api/questions` - Create new question

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deployment

The application is designed to be deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Support

For support, email support@quizmaster.com or create an issue in the repository.
