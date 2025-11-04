/**
 * ResultCard component for displaying individual metrics
 */

export default function ResultCard({ title, value, icon, format = 'number', className = '' }) {
  const formatValue = (val, fmt) => {
    if (val === null || val === undefined) return '0';
    
    switch (fmt) {
      case 'percentage':
        return `${val}%`;
      case 'time':
        const minutes = Math.floor(val / 60);
        const seconds = val % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      case 'number':
      default:
        return typeof val === 'number' ? val.toLocaleString() : val;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 text-center ${className}`}>
      {icon && (
        <div className="flex justify-center mb-3">
          <div className="text-2xl text-blue-600">{icon}</div>
        </div>
      )}
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{formatValue(value, format)}</p>
    </div>
  );
}