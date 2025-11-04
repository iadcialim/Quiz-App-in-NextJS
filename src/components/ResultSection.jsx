/**
 * ResultSection component for grouped metric cards
 */

import ResultCard from './ResultCard';

export default function ResultSection({ title, cards, className = '', visible = true }) {
  if (!visible) return null;

  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <ResultCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            format={card.format}
            className={card.className}
          />
        ))}
      </div>
    </div>
  );
}