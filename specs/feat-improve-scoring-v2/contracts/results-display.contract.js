/**
 * Results Component Display Contract
 * 
 * Defines the interface for the enhanced Results component with separate
 * Quiz Results and Egg Juggling sections displaying 5 cards each.
 * 
 * @module results-display.contract
 */

// ============================================================================
// COMPONENT CONTRACT
// ============================================================================

/**
 * Results Component
 * 
 * Displays quiz and game results in a card-based layout with two distinct sections.
 * 
 * Requirements:
 * - FR-001: Title must be "Your Score" (not "Quiz Results")
 * - FR-002: Remove legacy text "You scored .. out of .. possible points"
 * - FR-003: Quiz Results section with exactly 5 cards
 * - FR-004: Cards must show: Correct Answers, Wrong Answers, Percentage, Total Time Spent, Total Points
 * - FR-005: Egg Juggling section with exactly 5 cards
 * - FR-006: Cards must show: Eggs Dropped, Eggs Produced, Egg Juggles, Total Time Spent, Total Points
 * - FR-007: Hide Egg Juggling section if game not active
 * 
 * @param {Object} props - Component props
 * @param {number} props.score - Final combined score (backward compatibility)
 * @param {number} props.totalQuestions - Total number of questions
 * @param {number} props.correctAnswers - Count of correct answers
 * @param {number} props.wrongAnswers - Count of incorrect answers
 * @param {number} props.unattemptedQuestions - Count of unattempted questions
 * @param {number} props.percentage - Success percentage
 * @param {number} props.timeSpent - Total quiz time in seconds
 * @param {number} props.averageTimePerQuestion - Average time per question
 * @param {number} props.miniGameScore - Game score (backward compatibility)
 * @param {QuizScore} props.quizBreakdown - NEW: Detailed quiz scoring
 * @param {GameScore} props.gameBreakdown - NEW: Detailed game scoring
 * @param {GameMetrics} props.gameMetrics - NEW: Raw game metrics
 * @param {boolean} props.gameActive - NEW: Whether mini-game was played
 * @returns {React.ReactElement}
 * 
 * @example
 * <Results
 *   score={1700}
 *   totalQuestions={10}
 *   correctAnswers={8}
 *   wrongAnswers={2}
 *   unattemptedQuestions={0}
 *   percentage={80}
 *   timeSpent={40.5}
 *   averageTimePerQuestion={4.05}
 *   miniGameScore={700}
 *   quizBreakdown={{
 *     accuracyScore: 700,
 *     speedBonus: 300,
 *     finalScore: 1000,
 *     percentage: 80
 *   }}
 *   gameBreakdown={{
 *     bouncePoints: 2000,
 *     dropPenalty: 200,
 *     efficiencyPenalty: 100,
 *     totalPenalty: 300,
 *     finalScore: 1700
 *   }}
 *   gameMetrics={{
 *     juggles: 200,
 *     drops: 1,
 *     eggsIntroduced: 6,
 *     timePlayed: 120.5
 *   }}
 *   gameActive={true}
 * />
 */
export function Results(props) {
  // Implementation will be in src/components/Results.jsx
  throw new Error('Not implemented - contract only');
}

// ============================================================================
// LAYOUT STRUCTURE
// ============================================================================

/**
 * Expected DOM Structure:
 * 
 * <div className="...">
 *   <h2>Your Score</h2>  ← FR-001: Must be "Your Score", not "Quiz Results"
 *   
 *   <!-- Quiz Results Section -->
 *   <section className="quiz-results">
 *     <h3>Quiz Results</h3>
 *     
 *     <!-- Card 1: Correct Answers -->
 *     <div className="card">
 *       <p>Correct Answers</p>
 *       <p>{correctAnswers}</p>
 *       <Icon />
 *     </div>
 *     
 *     <!-- Card 2: Wrong Answers -->
 *     <div className="card">
 *       <p>Wrong Answers</p>
 *       <p>{wrongAnswers}</p>
 *       <Icon />
 *     </div>
 *     
 *     <!-- Card 3: Percentage -->
 *     <div className="card">
 *       <p>Percentage</p>
 *       <p>{quizBreakdown.percentage}%</p>
 *       <Icon />
 *     </div>
 *     
 *     <!-- Card 4: Total Time Spent -->
 *     <div className="card">
 *       <p>Total Time Spent</p>
 *       <p>{timeSpent}s</p>
 *       <Icon />
 *     </div>
 *     
 *     <!-- Card 5: Total Points -->
 *     <div className="card">
 *       <p>Total Points</p>
 *       <p>{quizBreakdown.finalScore}</p>
 *       <Icon />
 *     </div>
 *   </section>
 *   
 *   <!-- Egg Juggling Section (conditional) -->
 *   {gameActive && (
 *     <section className="game-results">
 *       <h3>Egg Juggling</h3>
 *       
 *       <!-- Card 1: Eggs Dropped -->
 *       <div className="card">
 *         <p>Eggs Dropped</p>
 *         <p>{gameMetrics.drops}</p>
 *         <Icon />
 *       </div>
 *       
 *       <!-- Card 2: Eggs Produced -->
 *       <div className="card">
 *         <p>Eggs Produced</p>
 *         <p>{gameMetrics.eggsIntroduced}</p>
 *         <Icon />
 *       </div>
 *       
 *       <!-- Card 3: Egg Juggles -->
 *       <div className="card">
 *         <p>Egg Juggles</p>
 *         <p>{gameMetrics.juggles}</p>
 *         <Icon />
 *       </div>
 *       
 *       <!-- Card 4: Total Time Spent -->
 *       <div className="card">
 *         <p>Total Time Spent</p>
 *         <p>{gameMetrics.timePlayed}s</p>
 *         <Icon />
 *       </div>
 *       
 *       <!-- Card 5: Total Points -->
 *       <div className="card">
 *         <p>Total Points</p>
 *         <p>{gameBreakdown.finalScore}</p>
 *         <Icon />
 *       </div>
 *     </section>
 *   )}
 *   
 *   <!-- FR-002: This legacy text MUST NOT appear -->
 *   <!-- REMOVED: "You scored {score} out of {totalQuestions * 4} possible points" -->
 *   
 *   <!-- Score Submission Form & Leaderboard (unchanged) -->
 *   <ScoreSubmissionForm ... />
 *   <Leaderboard ... />
 * </div>
 */

// ============================================================================
// CONTRACT TEST REQUIREMENTS
// ============================================================================

/**
 * Required Tests for Results Component:
 * 
 * 1. Title Display (FR-001):
 *    - Render Results with any props
 *    - Assert: Title text is "Your Score"
 *    - Assert: Title is NOT "Quiz Results"
 * 
 * 2. Legacy Text Removed (FR-002):
 *    - Render Results with any props
 *    - Assert: Text "You scored" does NOT appear
 *    - Assert: Text "out of" does NOT appear  
 *    - Assert: Text "possible points" does NOT appear
 * 
 * 3. Quiz Results Section - 5 Cards (FR-003, FR-004):
 *    - Render Results with quiz data
 *    - Assert: Section titled "Quiz Results" exists
 *    - Assert: Exactly 5 cards are rendered in Quiz section
 *    - Assert: Card 1 shows "Correct Answers" label
 *    - Assert: Card 2 shows "Wrong Answers" label
 *    - Assert: Card 3 shows "Percentage" label
 *    - Assert: Card 4 shows "Total Time Spent" label
 *    - Assert: Card 5 shows "Total Points" label
 *    - Assert: Values match props (correctAnswers, wrongAnswers, etc.)
 * 
 * 4. Egg Juggling Section - 5 Cards (FR-005, FR-006):
 *    - Render Results with gameActive=true
 *    - Assert: Section titled "Egg Juggling" exists
 *    - Assert: Exactly 5 cards are rendered in Game section
 *    - Assert: Card 1 shows "Eggs Dropped" label
 *    - Assert: Card 2 shows "Eggs Produced" label
 *    - Assert: Card 3 shows "Egg Juggles" label
 *    - Assert: Card 4 shows "Total Time Spent" label
 *    - Assert: Card 5 shows "Total Points" label
 *    - Assert: Values match gameMetrics (drops, eggsIntroduced, juggles, etc.)
 * 
 * 5. Hide Game Section When Inactive (FR-007):
 *    - Render Results with gameActive=false
 *    - Assert: "Egg Juggling" section does NOT exist
 *    - Assert: Only Quiz Results section is visible
 * 
 * 6. Quiz Score Display (FR-014):
 *    - Render Results with quizBreakdown
 *    - Assert: Total Points card in Quiz section shows quizBreakdown.finalScore
 *    - Assert: Percentage card shows quizBreakdown.percentage
 * 
 * 7. Game Score Display (FR-021):
 *    - Render Results with gameBreakdown and gameActive=true
 *    - Assert: Total Points card in Game section shows gameBreakdown.finalScore
 *    - Assert: Other cards show gameMetrics values
 * 
 * 8. Responsive Layout:
 *    - Render Results on mobile viewport
 *    - Assert: Cards stack vertically
 *    - Render Results on desktop viewport
 *    - Assert: Cards display in grid
 * 
 * 9. Accessibility:
 *    - Render Results
 *    - Assert: All cards have accessible labels
 *    - Assert: Heading hierarchy is correct (h2 -> h3)
 *    - Assert: Color contrast meets WCAG standards
 * 
 * 10. Backward Compatibility:
 *     - Render Results with only old props (no quizBreakdown/gameBreakdown)
 *     - Assert: Component still renders without errors
 *     - Assert: Falls back to existing prop values
 */

// ============================================================================
// CARD DATA SPECIFICATION
// ============================================================================

/**
 * Quiz Results Cards (Exact Order):
 * 
 * Card 1: Correct Answers
 *   - Label: "Correct Answers"
 *   - Value: {correctAnswers}
 *   - Icon: FaCheckCircle (green)
 * 
 * Card 2: Wrong Answers
 *   - Label: "Wrong Answers"
 *   - Value: {wrongAnswers}
 *   - Icon: FaTimesCircle (red)
 * 
 * Card 3: Percentage
 *   - Label: "Percentage"
 *   - Value: {quizBreakdown.percentage}%
 *   - Icon: FaPercentage (blue)
 * 
 * Card 4: Total Time Spent
 *   - Label: "Total Time Spent"
 *   - Value: {timeSpent}s
 *   - Icon: FaClock (purple)
 * 
 * Card 5: Total Points
 *   - Label: "Total Points"
 *   - Value: {quizBreakdown.finalScore}
 *   - Icon: FaTrophy (yellow)
 * 
 * Egg Juggling Cards (Exact Order):
 * 
 * Card 1: Eggs Dropped
 *   - Label: "Eggs Dropped"
 *   - Value: {gameMetrics.drops}
 *   - Icon: FaTimesCircle (red)
 * 
 * Card 2: Eggs Produced
 *   - Label: "Eggs Produced"
 *   - Value: {gameMetrics.eggsIntroduced}
 *   - Icon: FaEgg or similar (orange)
 * 
 * Card 3: Egg Juggles
 *   - Label: "Egg Juggles"
 *   - Value: {gameMetrics.juggles}
 *   - Icon: FaCheckCircle (green)
 * 
 * Card 4: Total Time Spent
 *   - Label: "Total Time Spent"
 *   - Value: {gameMetrics.timePlayed}s
 *   - Icon: FaClock (purple)
 * 
 * Card 5: Total Points
 *   - Label: "Total Points"
 *   - Value: {gameBreakdown.finalScore}
 *   - Icon: FaTrophy (yellow)
 */

// ============================================================================
// STYLING REQUIREMENTS
// ============================================================================

/**
 * Card Styling (using Tailwind CSS):
 * 
 * Base Card:
 *   - className: "p-5 bg-white shadow-md rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow duration-300"
 * 
 * Section Grid:
 *   - className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
 * 
 * Responsive Behavior:
 *   - Mobile: 1 column (grid-cols-1)
 *   - Tablet: 2 columns (sm:grid-cols-2)
 *   - Desktop: 3 columns (md:grid-cols-3)
 * 
 * Title Styling:
 *   - Main title: "text-3xl font-bold mb-6 text-center text-blue-600"
 *   - Section titles: "text-2xl font-semibold mb-4"
 */
