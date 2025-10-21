Updated Egg Juggling Scoring Formula Description
The function to calculate the Final Score for the egg juggling game is determined by the total points earned from bounces minus a combined penalty. This combined penalty includes points for eggs that are Dropped and an Efficiency Penalty for every egg introduced above the ideal minimum of 5.

The Final Score is calculated by taking the points earned from successful bounces and subtracting the Total Penalty.

Points for Bounces
The points for bounces are calculated by taking the Number of Eggs Juggled (or bounced) and multiplying it by the Bounce Weight, which is set to 10 points.

Total Penalty Calculation
The Total Penalty is the sum of the Drop Penalty and the Efficiency Penalty.

The Drop Penalty is calculated by taking the Number of Eggs Dropped and multiplying it by the Drop Penalty Weight, which is set to 200 points.

The Efficiency Penalty is calculated by first finding the number of Excess Eggs Introduced. This is the Total Number of Eggs Introduced minus 5. This result is then multiplied by the Efficiency Penalty Weight, which is set to 100 points.

Final Score
The Final Score is the result of subtracting the Total Penalty from the points earned from Bounces.

Example Calculation
Here is a step by step example showing the inputs and the expected final score using the fixed weights: Bounce Weight is 10, Drop Penalty Weight is 200, and Efficiency Penalty Weight is 100.

Example Inputs: Number of Eggs Juggled is 200, Number of Eggs Dropped is 1, and Total Number of Eggs Introduced is 6.

Step by Step Calculation:

The points from bounces are calculated first. Multiply 10 by 200 to get 2000 points.

Next, the Total Penalty is calculated.

First, the Drop Penalty is calculated. Multiply 200 by 1 to get a 200 point penalty.

Second, the Efficiency Penalty is calculated. Subtract 5 from the Total Number of Eggs Introduced, 6, to get 1 excess egg. Multiply 1 by the Efficiency Penalty Weight of 100 to get a 100 point penalty.

The Total Penalty is the sum of the Drop Penalty of 200 and the Efficiency Penalty of 100, which equals 300.

Finally, subtract the Total Penalty of 300 from the points earned of 2000 to get a Final Score of 1700.
