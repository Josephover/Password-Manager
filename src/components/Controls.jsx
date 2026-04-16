function Controls({ length, setLength, options, onOptionChange, darkMode }) {
  return (
    <div className="space-y-6 my-8">
      {/* Length Slider */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="font-bold">Longitud de la Contraseña</label>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {length}
          </span>
        </div>
        <input
          type="range"
          min="6"
          max="32"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #9333ea ${(length - 6) / 26 * 100}%, #d1d5db ${(length - 6) / 26 * 100}%, #d1d5db 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>6</span>
          <span>32</span>
        </div>
      </div>

      {/* Character Type Options */}
      <div>
        <p className="font-bold mb-4">Tipos de Caracteres</p>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={() => onOptionChange('uppercase')}
              className="w-5 h-5 rounded border-2 border-blue-500 cursor-pointer"
            />
            <span className="ml-3 flex-1">
              Letras Mayúsculas <span className="text-gray-500 text-sm">(ABC...)</span>
            </span>
          </label>

          <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={() => onOptionChange('lowercase')}
              className="w-5 h-5 rounded border-2 border-blue-500 cursor-pointer"
            />
            <span className="ml-3 flex-1">
              Letras Minúsculas <span className="text-gray-500 text-sm">(abc...)</span>
            </span>
          </label>

          <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={() => onOptionChange('numbers')}
              className="w-5 h-5 rounded border-2 border-blue-500 cursor-pointer"
            />
            <span className="ml-3 flex-1">
              Números <span className="text-gray-500 text-sm">(0-9)</span>
            </span>
          </label>

          <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={() => onOptionChange('symbols')}
              className="w-5 h-5 rounded border-2 border-blue-500 cursor-pointer"
            />
            <span className="ml-3 flex-1">
              Símbolos <span className="text-gray-500 text-sm">(!@#$...)</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Controls;
