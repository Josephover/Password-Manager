function PasswordDisplay({ password, onCopy, copied, darkMode }) {
  return (
    <div className={`mb-6 p-4 rounded-lg border-2 ${
      darkMode 
        ? 'bg-gray-700 border-gray-600' 
        : 'bg-gray-100 border-gray-300'
    }`}>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">Tu Contraseña</p>
      <div className="flex items-center gap-3">
        <div className={`flex-1 p-3 rounded font-mono text-lg font-bold break-all ${
          password 
            ? (darkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-900')
            : (darkMode ? 'bg-gray-600 text-gray-400' : 'bg-white text-gray-400')
        }`}>
          {password || 'Tu contraseña aparecerá aquí'}
        </div>
        <button
          onClick={onCopy}
          disabled={!password}
          className={`px-4 py-3 rounded font-bold transition-all whitespace-nowrap ${
            password
              ? copied
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-400 text-gray-600 cursor-not-allowed'
          }`}
        >
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>
    </div>
  );
}

export default PasswordDisplay;
