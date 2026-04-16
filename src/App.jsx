import { useState, useEffect } from 'react';
import PasswordDisplay from './components/PasswordDisplay';
import Controls from './components/Controls';
import StrengthIndicator from './components/StrengthIndicator';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Validar que al menos una opción esté seleccionada
    if (!Object.values(options).some(v => v)) {
      alert('Por favor, selecciona al menos un tipo de carácter');
      return;
    }

    let chars = '';
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
    
    // Agregar al historial
    setHistory([generatedPassword, ...history].slice(0, 10));
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOptionChange = (option) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Generador de Contraseñas
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Crea contraseñas seguras y aleatorias</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title="Alternar modo oscuro"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Generator */}
          <div className="space-y-6">
            <div className={`rounded-xl p-8 shadow-lg backdrop-blur-sm transition-all ${
              darkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white/80 border border-white'
            }`}>
              <h2 className="text-2xl font-bold mb-6">Generador</h2>

              {/* Password Display */}
              <PasswordDisplay 
                password={password} 
                onCopy={copyToClipboard}
                copied={copied}
                darkMode={darkMode}
              />

              {/* Strength Indicator */}
              {password && <StrengthIndicator password={password} darkMode={darkMode} />}

              {/* Controls */}
              <Controls
                length={length}
                setLength={setLength}
                options={options}
                onOptionChange={handleOptionChange}
                darkMode={darkMode}
              />

              {/* Generate Button */}
              <button
                onClick={generatePassword}
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Generar Contraseña
              </button>
            </div>
          </div>

          {/* Right Side - History */}
          <div className={`rounded-xl p-8 shadow-lg backdrop-blur-sm transition-all ${
            darkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white/80 border border-white'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Historial</h2>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-sm bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded transition-colors"
              >
                {showHistory ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            {showHistory && history.length > 0 ? (
              <div className="space-y-3">
                {history.map((pwd, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 border-purple-500 cursor-pointer hover:opacity-75 transition-opacity ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-100' 
                        : 'bg-gray-100 text-gray-900'
                    }`}
                    onClick={() => {
                      setPassword(pwd);
                      navigator.clipboard.writeText(pwd);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">#{index + 1}</p>
                    <p className="font-mono break-all text-sm">{pwd}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center py-8 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {history.length === 0 ? 'Sin historial aún' : 'Historial oculto'}
              </p>
            )}

            {history.length > 0 && showHistory && (
              <button
                onClick={() => setHistory([])}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Limpiar Historial
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-600 dark:text-gray-400">
          <p>Crea contraseñas seguras sin guardar datos | 100% privado</p>
        </div>
      </div>
    </div>
  );
}

export default App;
