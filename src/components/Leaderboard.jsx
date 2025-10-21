import { useState, useEffect } from 'react';

export default function Leaderboard({ currentUserName }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/leaderboard');
      if (response.ok) {
        const data = await response.json();
        setScores(data);
      } else {
        setError('Failed to load leaderboard');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (currentUserName) {
      fetchLeaderboard();
    }
  }, [currentUserName]);

  if (loading) return <div className="bg-white p-6 rounded-lg shadow-lg">Loading leaderboard...</div>;
  if (error) return <div className="bg-white p-6 rounded-lg shadow-lg text-red-600">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">🏆 Top 20 Scores</h3>
      <div className="space-y-2">
        {scores.map((score, index) => {
          const isCurrentUser = score.name === currentUserName;
          return (
            <div
              key={index}
              className={`p-3 rounded-lg flex justify-between items-center ${
                isCurrentUser 
                  ? 'bg-yellow-100 font-bold' 
                  : 'bg-gray-50'
              }`}
            >
              <span>#{index + 1} {score.name}</span>
              <span>{score.score} points</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}