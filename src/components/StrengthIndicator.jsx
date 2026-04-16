function StrengthIndicator({ password, darkMode }) {
  const calculateStrength = (pwd) => {
    let strength = 0;
    let feedback = [];

    // Longitud
    if (pwd.length >= 6) strength += 10;
    if (pwd.length >= 10) strength += 10;
    if (pwd.length >= 16) strength += 10;
    if (pwd.length >= 24) strength += 10;

    // Variedad de caracteres
    if (/[a-z]/.test(pwd)) strength += 10;
    if (/[A-Z]/.test(pwd)) strength += 10;
    if (/[0-9]/.test(pwd)) strength += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 20;

    // Feedback
    if (pwd.length < 8) feedback.push('Aumenta la longitud');
    if (!/[A-Z]/.test(pwd)) feedback.push('Añade mayúsculas');
    if (!/[a-z]/.test(pwd)) feedback.push('Añade minúsculas');
    if (!/[0-9]/.test(pwd)) feedback.push('Añade números');
    if (/[^a-zA-Z0-9]/.test(pwd)) feedback.push('Perfecto! Tiene símbolos');

    return {
      score: Math.min(strength, 100),
      feedback: feedback.slice(0, 3),
    };
  };

  const { score, feedback } = calculateStrength(password);

  const getStrengthLabel = () => {
    if (score < 30) return 'Débil';
    if (score < 60) return 'Media';
    if (score < 85) return 'Fuerte';
    return 'Muy Fuerte';
  };

  const getStrengthEmoji = () => {
    if (score < 30) return '🔴';
    if (score < 60) return '🟡';
    if (score < 85) return '🟢';
    return '💚';
  };

  const getStrengthColor = () => {
    if (score < 30) return 'from-red-500 to-red-600';
    if (score < 60) return 'from-yellow-500 to-yellow-600';
    if (score < 85) return 'from-green-500 to-green-600';
    return 'from-emerald-500 to-emerald-600';
  };

  const getTextColor = () => {
    if (score < 30) return 'text-red-500';
    if (score < 60) return 'text-yellow-500';
    if (score < 85) return 'text-green-500';
    return 'text-emerald-500';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getStrengthEmoji()}</span>
          <p className="font-bold text-sm uppercase tracking-widest">Nivel de Seguridad</p>
        </div>
        <span className={`font-black text-xl ${getTextColor()}`}>
          {getStrengthLabel()}
        </span>
      </div>

      {/* Strength Bar - Advanced */}
      <div className="mb-4">
        <div className={`w-full h-4 rounded-full overflow-hidden bg-gray-300/30 backdrop-blur-sm`}>
          <div
            className={`h-full transition-all duration-500 bg-gradient-to-r ${getStrengthColor()} shadow-lg`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs font-semibold">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>0</span>
          <span className={`${getTextColor()} font-black`}>{score}/100</span>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>100</span>
        </div>
      </div>

      {/* Feedback Tips */}
      {feedback.length > 0 && (
        <div className="pt-4 border-t border-gray-400/30">
          <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
            Recomendaciones
          </p>
          <ul className="space-y-2">
            {feedback.map((tip, idx) => (
              <li key={idx} className={`text-xs flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="text-lg">{tip.includes('Perfecto') ? '✨' : '→'}</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StrengthIndicator;
