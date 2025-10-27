Quiz Scoring Formula Description
The function to calculate the Final Score is determined by two major components: an Accuracy Score and a Speed Bonus.

Accuracy Score Calculation
The first part of the score is the Accuracy Score. You begin by calculating the points gained for correct answers. This is done by taking the Number Correct and multiplying it by the Correct Answer Weight, which is set to 100. Then, apply the penalty for incorrect answers by taking the Number Wrong and multiplying it by the Wrong Answer Penalty, which is set to 50. The final Accuracy Score is the result of subtracting the penalty from the points gained.

Speed Bonus Calculation
The second part of the final score is the Speed Bonus, which rewards the user for completing the quiz quickly. First, determine the Maximum Possible Time. This value is found by multiplying the Total Number of Questions by the Max Time per Question, which is set to 10 seconds. Next, calculate the Time Saved by subtracting the Total Time Taken in seconds from the Maximum Possible Time. Then, determine the Speed Factor. This factor is a fractional value between 0 and 1, calculated by dividing the Time Saved by the Maximum Possible Time. Finally, the Speed Bonus is calculated by multiplying the Speed Factor by the maximum bonus weight for time, which is set to 500.

Final Score
The Final Score is simply the sum of the Accuracy Score and the Speed Bonus.

Example Calculation
Here is a step by step example showing the inputs and the expected final score using the fixed weights: Correct Answer Weight is 100, Wrong Answer Penalty is 50, Max Time per Question is 10 seconds, and Max Speed Bonus is 500.

Example Inputs: Number Correct is 8, Number Wrong is 2, Total Time Taken is 40 seconds, and Total Number of Questions is 10.

Step by Step Calculation: The Accuracy Score is calculated first. Multiply 100 by 8 to get 800 points. Multiply 50 by 2 to get a 100 point penalty. Subtracting the penalty from the points yields an Accuracy Score of 700. Next, calculate the Speed Bonus. The Maximum Possible Time is 10 questions multiplied by 10 seconds per question, which equals 100 seconds. The Time Saved is the Maximum Possible Time of 100 seconds minus the Total Time Taken of 40 seconds, which equals 60 seconds. The Speed Factor is 60 divided by 100, which is 0.6. The Speed Bonus is the Speed Factor of 0.6 multiplied by the Max Speed Bonus of 500, which equals 300. Finally, add the Accuracy Score of 700 to the Speed Bonus of 300 to get a Final Score of 1000.
