function Controls({ length, setLength, options, onOptionChange, darkMode }) {
  return (
    <div className="space-y-8">
      {/* Length Slider */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📏</span>
            <label className="font-bold uppercase tracking-widest text-sm">Longitud</label>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-75"></div>
              <div className={`relative px-4 py-2 rounded-lg font-black text-xl ${darkMode ? 'bg-gray-900 text-cyan-300' : 'bg-white text-cyan-600'}`}>
                {length}
              </div>
            </div>
          </div>
        </div>
        <input
          type="range"
          min="6"
          max="32"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(length - 6) / 26 * 100}%, ${darkMode ? '#4b5563' : '#d1d5db'} ${(length - 6) / 26 * 100}%, ${darkMode ? '#4b5563' : '#d1d5db'} 100%)`
          }}
        />
        <div className="flex justify-between text-xs font-bold mt-3 px-1">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Mínimo: 6</span>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Máximo: 32</span>
        </div>
      </div>

      {/* Character Type Options */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔤</span>
          <p className="font-bold uppercase tracking-widest text-sm">Tipos de Caracteres</p>
        </div>
        <div className="space-y-3">
          <label className={`flex items-center cursor-pointer p-3 rounded-xl transition-all transform hover:scale-105 border-2 ${
            options.uppercase
              ? (darkMode 
                ? 'bg-purple-900/40 border-purple-500 shadow-lg shadow-purple-500/20' 
                : 'bg-purple-100/40 border-purple-400 shadow-lg shadow-purple-300/20')
              : (darkMode 
                ? 'bg-gray-700/20 border-gray-600 hover:border-gray-500' 
                : 'bg-gray-100/20 border-gray-300 hover:border-gray-400')
          }`}>
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={() => onOptionChange('uppercase')}
              className="w-6 h-6 rounded border-2 border-purple-500 cursor-pointer accent-purple-500"
            />
            <span className="ml-3 flex-1">
              <span className="font-bold block">Mayúsculas</span>
              <span className="text-xs opacity-75">A B C Z</span>
            </span>
          </label>

          <label className={`flex items-center cursor-pointer p-3 rounded-xl transition-all transform hover:scale-105 border-2 ${
            options.lowercase
              ? (darkMode 
                ? 'bg-blue-900/40 border-blue-500 shadow-lg shadow-blue-500/20' 
                : 'bg-blue-100/40 border-blue-400 shadow-lg shadow-blue-300/20')
              : (darkMode 
                ? 'bg-gray-700/20 border-gray-600 hover:border-gray-500' 
                : 'bg-gray-100/20 border-gray-300 hover:border-gray-400')
          }`}>
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={() => onOptionChange('lowercase')}
              className="w-6 h-6 rounded border-2 border-blue-500 cursor-pointer accent-blue-500"
            />
            <span className="ml-3 flex-1">
              <span className="font-bold block">Minúsculas</span>
              <span className="text-xs opacity-75">a b c z</span>
            </span>
          </label>

          <label className={`flex items-center cursor-pointer p-3 rounded-xl transition-all transform hover:scale-105 border-2 ${
            options.numbers
              ? (darkMode 
                ? 'bg-green-900/40 border-green-500 shadow-lg shadow-green-500/20' 
                : 'bg-green-100/40 border-green-400 shadow-lg shadow-green-300/20')
              : (darkMode 
                ? 'bg-gray-700/20 border-gray-600 hover:border-gray-500' 
                : 'bg-gray-100/20 border-gray-300 hover:border-gray-400')
          }`}>
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={() => onOptionChange('numbers')}
              className="w-6 h-6 rounded border-2 border-green-500 cursor-pointer accent-green-500"
            />
            <span className="ml-3 flex-1">
              <span className="font-bold block">Números</span>
              <span className="text-xs opacity-75">0 1 2 9</span>
            </span>
          </label>

          <label className={`flex items-center cursor-pointer p-3 rounded-xl transition-all transform hover:scale-105 border-2 ${
            options.symbols
              ? (darkMode 
                ? 'bg-pink-900/40 border-pink-500 shadow-lg shadow-pink-500/20' 
                : 'bg-pink-100/40 border-pink-400 shadow-lg shadow-pink-300/20')
              : (darkMode 
                ? 'bg-gray-700/20 border-gray-600 hover:border-gray-500' 
                : 'bg-gray-100/20 border-gray-300 hover:border-gray-400')
          }`}>
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={() => onOptionChange('symbols')}
              className="w-6 h-6 rounded border-2 border-pink-500 cursor-pointer accent-pink-500"
            />
            <span className="ml-3 flex-1">
              <span className="font-bold block">Símbolos</span>
              <span className="text-xs opacity-75">! @ # $ % ^ &</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Controls;
