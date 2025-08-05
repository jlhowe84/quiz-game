# Quiz Master

A personalized quiz game built with Next.js, TypeScript, and SQLite that adapts questions based on user age, education level, and interests.

## Features

- **Personalized Experience**: Collects player profile (age, education, interests) to tailor questions
- **Category Selection**: Multiple quiz categories with visual cards and filtering
- **AI-Powered Questions**: OpenAI integration for dynamic question generation with profile-based customization
- **Progress Tracking**: Save and track user performance across sessions with detailed analytics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Simple & Lightweight**: SQLite database with zero configuration
- **Real-time Quiz Experience**: Interactive quiz sessions with timer and progress tracking
- **Smart Question Generation**: Age-appropriate and education-level specific content
- **Comprehensive Results**: Detailed scoring, time tracking, and performance analytics
- **Fallback System**: Mock questions when AI generation fails
- **State Management**: Robust quiz state management with Zustand
- **Error Handling**: Graceful error handling for AI service failures
- **Performance Analytics**: Track average time, score percentages, and improvement over time

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

### Phase 1: MVP ✅ COMPLETED
- ✅ Basic project setup
- ✅ Player profile collection
- ✅ Category selection interface
- ✅ Database schema
- ✅ Basic UI components
- ✅ Responsive design implementation
- ✅ TypeScript configuration
- ✅ Prisma ORM setup

### Phase 2: Core Functionality ✅ COMPLETED
- ✅ Quiz session management
- ✅ Question display and answering
- ✅ Timer functionality
- ✅ Results and scoring system
- ✅ Basic analytics and performance tracking
- ✅ Quiz state management with Zustand
- ✅ Question navigation and progress tracking
- ✅ Score calculation and percentage display
- ✅ Time tracking and average time per question
- ✅ Quiz completion and results display

### Phase 3: AI Integration ✅ COMPLETED
- ✅ OpenAI API integration
- ✅ Dynamic question generation
- ✅ Profile-based question filtering
- ✅ Difficulty adaptation based on user profile
- ✅ Age-appropriate content generation
- ✅ Education-level specific terminology
- ✅ Interest-based question customization
- ✅ AI question validation and parsing
- ✅ Fallback mock questions system
- ✅ Error handling for AI service failures

### Phase 4: Advanced Features 🚧 IN PROGRESS
- 🔄 User authentication (NextAuth.js configured)
- 🔄 Progress tracking and persistence
- 🔄 User accounts and profiles
- 🔄 Social features (leaderboards, sharing)
- 🔄 Mobile optimization
- 🔄 Performance analytics dashboard

### Phase 5: Monetization & Scale 📋 PLANNED
- 📋 Subscription management system
- 📋 Premium features and content
- 📋 Affiliate advertising integration
- 📋 Usage tracking and billing
- 📋 Enterprise features
- 📋 API for third-party integrations
- 📋 Advanced analytics and reporting
- 📋 Multi-language support
- 📋 Accessibility features
- 📋 Advanced AI features (question validation, adaptive difficulty)

### Phase 6: Optimization & Polish 📋 PLANNED
- 📋 Performance optimization
- 📋 Advanced caching strategies
- 📋 SEO optimization
- 📋 Advanced UI/UX improvements
- 📋 Comprehensive testing suite
- 📋 Documentation and guides
- 📋 Community features
- 📋 Gamification elements

## Current Project Status

The quiz-game application has successfully completed **Phases 1-3** and is currently in **Phase 4** development. The core functionality is fully implemented and working, including:

### ✅ What's Working
- Complete quiz experience with AI-generated questions
- Personalized content based on user profiles
- Real-time scoring and performance tracking
- Responsive design across all devices
- Robust error handling and fallback systems
- Comprehensive state management

### 🚧 Currently In Development
- User authentication system with NextAuth.js
- Persistent user accounts and progress tracking
- Database integration for user data
- Social features and leaderboards

### 📋 Next Steps
1. **Complete Phase 4**: Finish user authentication and progress persistence
2. **Begin Phase 5**: Implement monetization features and subscription system
3. **Scale & Optimize**: Performance improvements and advanced features

## Recent Updates

### Latest Features Added
- **AI Question Generation**: Full OpenAI integration with profile-based customization
- **Quiz Session Management**: Complete quiz flow with timer and scoring
- **Results Analytics**: Detailed performance tracking and statistics
- **Error Handling**: Graceful fallbacks when AI service is unavailable
- **State Management**: Robust Zustand-based state management
- **Responsive Design**: Mobile-first design approach

### Technical Improvements
- TypeScript implementation throughout
- Prisma ORM for database management
- Framer Motion for smooth animations
- Tailwind CSS for styling
- Next.js 14 App Router
- Comprehensive error handling

## API Endpoints

### Categories
- `GET /api/categories` - Fetch all categories
- `POST /api/categories` - Create new category

### Questions
- `GET /api/questions` - Fetch questions with filters
- `POST /api/questions` - Create new question

### AI Questions
- `POST /api/ai-questions` - Generate AI-powered questions based on category, player profile, difficulty, and count
  - Request body: `{ category, playerProfile, difficulty, count }`
  - Returns: `{ success, questions, generatedAt, category, difficulty, count }`

### Quiz Sessions
- `POST /api/quiz-sessions` - Save quiz session results
- `GET /api/quiz-sessions/:userId` - Get user's quiz history

### User Progress
- `GET /api/user-progress/:userId` - Get user's progress across categories
- `POST /api/user-progress` - Update user progress

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
