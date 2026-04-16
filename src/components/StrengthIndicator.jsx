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
    if (!/[^a-zA-Z0-9]/.test(pwd)) feedback.push('Añade símbolos');

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

  const getStrengthColor = () => {
    if (score < 30) return 'bg-red-500';
    if (score < 60) return 'bg-yellow-500';
    if (score < 85) return 'bg-green-500';
    return 'bg-emerald-500';
  };

  const getTextColor = () => {
    if (score < 30) return 'text-red-500';
    if (score < 60) return 'text-yellow-500';
    if (score < 85) return 'text-green-500';
    return 'text-emerald-500';
  };

  return (
    <div className={`p-4 rounded-lg mb-6 ${
      darkMode 
        ? 'bg-gray-700 border border-gray-600' 
        : 'bg-gray-100 border border-gray-300'
    }`}>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold text-sm">Nivel de Seguridad</p>
        <span className={`font-bold text-lg ${getTextColor()}`}>
          {getStrengthLabel()}
        </span>
      </div>

      {/* Strength Bar */}
      <div className={`w-full h-3 rounded-full overflow-hidden ${
        darkMode ? 'bg-gray-600' : 'bg-gray-300'
      }`}>
        <div
          className={`h-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Score */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Puntuación: {score}/100
      </p>

      {/* Feedback */}
      {feedback.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
          <p className="text-xs font-bold mb-2 text-gray-600 dark:text-gray-300">Sugerencias:</p>
          <ul className="text-xs space-y-1">
            {feedback.map((tip, idx) => (
              <li key={idx} className="text-gray-600 dark:text-gray-400">
                • {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StrengthIndicator;
