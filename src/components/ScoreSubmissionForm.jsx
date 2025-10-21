import { useState } from 'react';

export default function ScoreSubmissionForm({ score, onSuccess, onError }) {
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!userName.trim()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName.trim(), score })
      });
      
      if (response.ok) {
        onSuccess?.();
      } else {
        onError?.('Failed to submit score');
      }
    } catch (error) {
      onError?.('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Submit Your Score</h3>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      <button
        onClick={handleSubmit}
        disabled={!userName.trim() || isSubmitting}
        className="w-full bg-blue-500 text-white p-3 rounded-lg disabled:bg-gray-400"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Score'}
      </button>
    </div>
  );
}