# Password Generator

A modern, secure password generator built with React and Vite. Create strong, random passwords with customizable options in seconds.

## Features

✨ **Easy Password Generation** - Generate secure passwords with just one click

🔐 **Customizable Options** - Choose character types:
- Uppercase letters (A-Z)
- Lowercase letters (a-z)
- Numbers (0-9)
- Special symbols (!@#$%^&*)

📊 **Real-time Strength Indicator** - Visual feedback on password strength:
- Weak
- Medium
- Strong
- Very Strong

🎚️ **Adjustable Length** - Generate passwords from 6 to 32 characters

📋 **Password History** - Keep track of the last 10 generated passwords

📋 **Copy to Clipboard** - Instantly copy passwords to your clipboard

🌙 **Dark Mode Support** - Easy on the eyes with dark mode theme

🔒 **100% Private** - All processing happens locally in your browser. No data is saved or transmitted.

## How to Use

1. **Set Password Length** - Use the slider to choose your desired password length (6-32 characters)

2. **Select Character Types** - Check the boxes for the types of characters you want to include

3. **Generate Password** - Click the refresh button to generate a new password

4. **Copy Password** - Click "Copiar" button to copy the password to your clipboard

5. **Check History** - View and reuse your last 10 generated passwords

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## Build

```bash
npm run build
```

## Security Notes

- All password generation happens entirely in your browser
- No data is sent to any server
- Passwords are not stored permanently
- History is cleared when you refresh the page

## License

MIT
