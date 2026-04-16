import { useState, useEffect } from 'react';
import { MdRefresh, MdCheckCircle, MdHistory, MdLock } from 'react-icons/md';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(20);
  const [darkMode, setDarkMode] = useState(true);
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

  const calculateStrengthScore = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score += 10;
    if (pwd.length >= 10) score += 10;
    if (pwd.length >= 16) score += 10;
    if (pwd.length >= 24) score += 10;
    if (/[a-z]/.test(pwd)) score += 10;
    if (/[A-Z]/.test(pwd)) score += 10;
    if (/[0-9]/.test(pwd)) score += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 20;
    return Math.min(score, 100);
  };

  const getStrengthLabel = (score) => {
    if (score < 30) return 'Débil';
    if (score < 60) return 'Media';
    if (score < 85) return 'Fuerte';
    return 'Muy Fuerte';
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const strength = password ? calculateStrengthScore(password) : 0;
  const strengthLabel = getStrengthLabel(strength);

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-gray-100'
    }`}>
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Prueba el generador de contraseñas aleatorias de NordPass
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
          Crea contraseñas seguras y sólidas para tus cuentas online en un abrir y cerrar de ojos.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl lg:max-w-5xl bg-white rounded-3xl shadow-2xl">
        <div className="p-6 sm:p-8 md:p-12 lg:p-16 space-y-10">
          
          {/* Password Display Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 text-2xl md:text-3xl font-mono font-bold bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                placeholder="Tu contraseña aparecerá aquí"
              />
              <button
                onClick={generatePassword}
                className="p-3 rounded-xl hover:bg-gray-200 transition-all text-gray-600 hover:text-gray-900 flex-shrink-0"
                title="Generar"
              >
                <MdRefresh size={24} />
              </button>
              <button
                onClick={copyToClipboard}
                disabled={!password}
                className={`px-6 md:px-8 py-3 rounded-xl font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  password
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white active:scale-95'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                }`}
              >
                {copied ? '✓' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* Strength Indicator */}
          {password && (
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-2xl border border-cyan-200">
              <div className="flex items-center gap-4">
                <MdCheckCircle size={36} className="text-cyan-500 flex-shrink-0" />
                <div>
                  <span className="text-sm text-gray-600 block mb-1">Solidez de la contraseña:</span>
                  <p className="font-bold text-gray-900 text-3xl">{strengthLabel}</p>
                </div>
              </div>
            </div>
          )}

          {/* Length Slider */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-gray-900 text-lg">Longitud de la contraseña:</label>
              <span className="text-4xl font-bold text-cyan-500 bg-gray-100 px-4 py-2 rounded-lg">{length}</span>
            </div>
            <input
              type="range"
              min="6"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer slider-dark"
              style={{
                background: `linear-gradient(to right, #06b7db 0%, #06b7db ${(length - 6) / 26 * 100}%, #e5e7eb ${(length - 6) / 26 * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* Character Options */}
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-900 text-lg">Caracteres a usar:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'uppercase', label: 'Usar mayúsculas' },
                { key: 'lowercase', label: 'Usar minúsculas' },
                { key: 'numbers', label: 'Usar dígitos' },
                { key: 'symbols', label: 'Usar símbolos' },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center gap-4 cursor-pointer p-4 rounded-xl border border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={options[key]}
                    onChange={() => handleOptionChange(key)}
                    className="w-6 h-6 rounded cursor-pointer accent-cyan-500"
                  />
                  <span className="text-base font-medium text-gray-900">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* History Section */}
          {history.length > 0 && (
            <div className="space-y-4">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">
                  <MdHistory className="inline-block mr-2" size={20} />
                  Historial de contraseñas
                </h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-sm text-cyan-600 hover:text-cyan-700 font-semibold px-4 py-2 rounded-lg hover:bg-cyan-50 transition-all"
                >
                  {showHistory ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>

              {showHistory && (
                <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar bg-gray-50 p-4 rounded-xl">
                  {history.map((pwd, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setPassword(pwd);
                        navigator.clipboard.writeText(pwd);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-white hover:border-cyan-300 transition-all font-mono text-sm text-gray-700 active:bg-gray-200 break-all border border-transparent"
                    >
                      {pwd}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 md:mt-16 lg:mt-20 text-sm text-gray-500">
        <p>
          <MdLock className="inline-block mr-2" size={18} />
          100% privado • Procesado localmente • Sin datos guardados
        </p>
      </div>
    </div>
  );
}

export default App;
