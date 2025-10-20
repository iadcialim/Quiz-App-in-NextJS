'use client';

export default function GameSettings({ 
  settings, 
  onSettingsChange, 
  disabled = false, 
  compact = false 
}) {
  const handleToggleEnabled = () => {
    onSettingsChange({
      ...settings,
      enabled: !settings.enabled
    });
  };

  const handleEggQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    onSettingsChange({
      ...settings,
      eggQuantity: Math.max(1, Math.min(10, value))
    });
  };

  const handleSpawnRateChange = (event) => {
    const value = parseInt(event.target.value, 10);
    onSettingsChange({
      ...settings,
      spawnRate: Math.max(5, Math.min(30, value))
    });
  };



  const handleEggSpeedChange = (event) => {
    const value = parseFloat(event.target.value);
    onSettingsChange({
      ...settings,
      eggSpeed: Math.max(0.1, Math.min(2.0, value))
    });
  };

  const handleBounceStrengthChange = (event) => {
    const value = parseFloat(event.target.value);
    onSettingsChange({
      ...settings,
      bounceStrength: Math.max(0.1, Math.min(3.0, value))
    });
  };

  const containerClass = compact 
    ? "space-y-1 p-1 bg-gray-100 rounded text-xs" 
    : "space-y-4 p-4 bg-gray-100 rounded";

  return (
    <div data-testid="game-settings" className={containerClass}>
      {!compact && (
        <h3 className="font-semibold text-lg">
          Mini-Game Settings
        </h3>
      )}
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="enable-game"
          checked={settings.enabled}
          onChange={handleToggleEnabled}
          disabled={disabled}
          className="rounded"
        />
        <label htmlFor="enable-game" className={compact ? 'text-xs' : ''}>
          {compact ? 'Enable' : 'Enable Game'}
        </label>
      </div>

      {settings.enabled && (
        <>
          <div>
            <label htmlFor="egg-quantity" className={`block ${compact ? 'text-xs' : ''}`}>
              {compact ? `Eggs: ${settings.eggQuantity}` : `Egg Quantity: ${settings.eggQuantity}`}
            </label>
            <input
              type="range"
              id="egg-quantity"
              min="1"
              max="10"
              value={settings.eggQuantity}
              onChange={handleEggQuantityChange}
              disabled={disabled}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="spawn-rate" className={`block ${compact ? 'text-xs' : ''}`}>
              {compact ? `Rate: ${settings.spawnRate}` : `Spawn Rate: ${settings.spawnRate}/min`}
            </label>
            <input
              type="range"
              id="spawn-rate"
              min="5"
              max="30"
              value={settings.spawnRate}
              onChange={handleSpawnRateChange}
              disabled={disabled}
              className="w-full"
            />
          </div>



          <div>
            <label htmlFor="egg-speed" className={`block ${compact ? 'text-xs' : ''}`}>
              {compact ? `Speed: ${settings.eggSpeed || 0.3}x` : `Egg Speed: ${settings.eggSpeed || 0.3}x`}
            </label>
            <input
              type="range"
              id="egg-speed"
              min="0.1"
              max="2.0"
              step="0.1"
              value={settings.eggSpeed || 0.3}
              onChange={handleEggSpeedChange}
              disabled={disabled}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="bounce-strength" className={`block ${compact ? 'text-xs' : ''}`}>
              {compact ? `Bounce: ${settings.bounceStrength || 1.0}x` : `Bounce Strength: ${settings.bounceStrength || 1.0}x`}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                id="bounce-strength"
                min="0.1"
                max="3.0"
                step="0.1"
                value={settings.bounceStrength || 1.0}
                onChange={handleBounceStrengthChange}
                disabled={disabled}
                className="flex-1"
              />
              {/* Quick preset: 1.5x */}
              <button
                type="button"
                onClick={() => onSettingsChange({ ...settings, bounceStrength: 1.5 })}
                disabled={disabled}
                className={`px-2 py-1 rounded border ${ (settings.bounceStrength || 1.0) === 1.5 ? 'bg-blue-500 text-white' : 'bg-white text-gray-800' }`}
                title="Set bounce to 1.5x"
              >
                1.5x
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}