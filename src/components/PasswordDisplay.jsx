function PasswordDisplay({ password, onCopy, copied, darkMode }) {
  return (
    <div className="w-full">
      <p className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
        <span className="text-2xl">🔑</span> Tu Contraseña
      </p>
      <div className="space-y-3">
        <div className={`p-6 rounded-2xl font-mono text-2xl font-black break-all transition-all text-center min-h-20 flex items-center justify-center ${
          password 
            ? (darkMode ? 'bg-gray-950 text-cyan-300 shadow-lg shadow-cyan-500/20' : 'bg-white text-cyan-600 shadow-lg shadow-cyan-300/20')
            : (darkMode ? 'bg-gray-950 text-gray-600' : 'bg-white text-gray-400')
        }`}>
          {password || '••••••••••••••••'}
        </div>
        <button
          onClick={onCopy}
          disabled={!password}
          className={`w-full py-4 px-6 rounded-xl font-bold transition-all transform active:scale-95 ${
            password
              ? copied
                ? `bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/50 hover:scale-105`
                : `bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/50 hover:scale-105 text-base`
              : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
          }`}
        >
          {copied ? (
            <span className="flex items-center justify-center gap-2 text-lg">
              <span>✓</span> ¡Copiado!
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2 text-lg">
              <span>📋</span> Copiar
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordDisplay;
