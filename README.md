# Quiz App

This **Quiz App** is built with **Next.js** and **Tailwind CSS**, providing a dynamic and engaging quiz experience. The app features a variety of interactive elements such as real-time scoring, a timer for each question, answer validation, and detailed results upon completion. The user interface is fully responsive and the quiz data is loaded from JSON files.

## Live Demo
[Click Here to Try the Quiz App](https://quiz-app-aman-kumar-sinha.vercel.app/)

## Features

### 1. **Subject Selection**
- Choose a subject from the home page.
- Questions are dynamically loaded from JSON files located in the `/public/data` folder for each subject.

### 2. **Timed Quiz**
- Each question has a countdown timer of **10 seconds**.
- If the timer runs out, the question is marked as unattempted.

### 3. **Answer Validation**
- Selected answers turn **green** if correct, **red** if incorrect, and the correct answer is highlighted in green for immediate feedback.

### 4. **Scoring System**
- Earn **4 points** for each correct answer, with the score displayed at the top throughout the quiz.

### 5. **Post-Quiz Results**
- **Detailed Results Page**: After completing the quiz, users receive a comprehensive performance breakdown:
  - Total Points
  - Points Earned
  - Correct Answers
  - Wrong Answers
  - Unattempted Questions
  - Percentage
  - Total Time Spent
  - Average Time Per Question
- The results page features icons and colors for improved readability, along with a celebratory **confetti** effect.

### 6. **2D Egg-Juggling Mini-Game** 🥚🎮
- **Interactive Mini-Game**: Play an engaging egg-juggling game while answering quiz questions
- **Bonus Scoring**: Earn bonus points by successfully bouncing falling eggs
- **Configurable Settings**: Adjust egg quantity, spawn rate, and difficulty
- **Distraction Challenge**: The mini-game adds an extra layer of difficulty to test focus
- **Mobile-Friendly**: Touch-responsive controls for mobile devices
- **Performance Optimized**: Smooth 60fps HTML5 Canvas animation

### 7. **Responsive Design**
- Fully responsive, ensuring seamless functionality across all devices, including mobile and desktop.

## Technologies Used

- **Next.js**: For server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Icons**: For scalable icons.
- **Confetti**: For celebratory effects on the results page.
- **react-use**: For handling window sizes, particularly for the confetti effect.
- **JavaScript/ES6**: For component building and quiz logic.
- **HTML5 Canvas**: For 2D game rendering and animations.
- **Jest & React Testing Library**: For comprehensive testing coverage.

## How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/AmanKumarSinhaGitHub/Quiz-App-in-NextJS.git
```

### 2. Navigate to the Project Folder
```bash
cd quiz-app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Tests (Optional)
```bash
npm test
```

### 5. Run the Development Server
```bash
npm run dev
```
Open your browser and go to `http://localhost:3000` to see the app in action.

## Deployment

### Deploy to Vercel (Recommended)

#### Option 1: Quick Deploy
```bash
npm run deploy:vercel
```

#### Option 2: Manual Deploy
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy to production
vercel --prod
```

#### Option 3: Git-based Auto Deploy
1. Push your code to GitHub
2. Connect repository to Vercel at [vercel.com](https://vercel.com)
3. Vercel will auto-deploy on every push to main branch

### Pre-deployment Checklist
```bash
# Test build
npm run build

# Run tests
npm test
```

### Other Deployment Options

#### Netlify
```bash
npm run build
# Upload .next folder to netlify.com
```

#### GitHub Pages (Static Export)
Add to `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }
}
```

## Project Structure

- `public/data/`: Contains JSON files for questions.
- `src/components/`: React components including quiz and game components
  - `Results.jsx`: Displays quiz results with mini-game scores
  - `QuestionTimer.jsx`: Manages the countdown timer for questions
  - `SubjectCard.jsx`: Displays subjects available for selection
  - `EggJugglingGame.jsx`: Main mini-game component
  - `GameCanvas.jsx`: HTML5 Canvas rendering component
  - `GameSettings.jsx`: Game configuration controls
- `src/hooks/`: Custom React hooks
  - `useGameState.js`: Game state management
  - `useGamePhysics.js`: Physics calculations
- `src/utils/`: Utility functions
  - `physics.js`: Game physics engine
  - `gameEngine.js`: Core game engine
- `src/context/`: React context providers
  - `PointsContext.js`: Quiz and mini-game scoring
  - `GameContext.js`: Game state management
- `src/app/`: Next.js app router pages
- `tests/`: Test files for components and integration

## Mini-Game Features

### How to Play
1. **Start a Quiz**: Select any subject to begin
2. **Enable Mini-Game**: Use the settings panel to enable/disable the game
3. **Juggle Eggs**: Tap or click falling eggs to bounce them up
4. **Earn Points**: +1 point for each successful bounce, -1 for dropped eggs
5. **Bonus Scoring**: Mini-game score adds bonus multiplier to final quiz score

### Game Settings
- **Enable/Disable**: Toggle the mini-game on/off
- **Egg Quantity**: Control how many eggs appear (1-10)
- **Spawn Rate**: Adjust how frequently eggs drop (5-30 per minute)
- **Difficulty**: Easy, Medium, or Hard modes

### Performance
- **60 FPS**: Smooth animation using requestAnimationFrame
- **Mobile Optimized**: Touch-friendly controls
- **Memory Efficient**: Optimized rendering and object pooling

## Future Improvements

- **Backend Integration**: Dynamic question loading, user authentication, and leaderboards
- **User Authentication**: Login and signup features to track progress
- **Advanced Mini-Games**: Additional game modes and power-ups
- **Multiplayer**: Real-time multiplayer quiz competitions
- **Sound Effects**: Audio feedback for game interactions
- **Question Bank Expansion**: More subjects and difficulty levels

## Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run performance tests
npm test -- --testPathPattern=performance
```

### Test Coverage
- **Unit Tests**: Component and hook testing
- **Integration Tests**: Quiz-game integration
- **Performance Tests**: Frame rate and memory usage
- **Contract Tests**: API and component contracts

## Contributions

Feel free to fork the repository and submit pull requests for any improvements or features you'd like to add. Contributions are welcome!

### Development Guidelines
- Follow the existing code style and patterns
- Add tests for new features
- Update documentation for significant changes
- Ensure mobile compatibility for new UI components
