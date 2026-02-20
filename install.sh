#!/bin/bash

# AntiPy Quick Install Script
# Usage: bash <(curl -s https://raw.githubusercontent.com/akshay7star/Antipy/main/install.sh)

set -e

echo "🚀 Welcome to the AntiPy Quick Installer!"

# 1. Check requirements
if ! command -v git &> /dev/null; then
    echo "❌ Error: git is not installed. Please install git and try again."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed. Please install Node.js and try again."
    exit 1
fi

# 2. Get target directory (default to 'antipy-app')
echo "📁 Where would you like to install AntiPy?"
read -p "Directory name (default: antipy-app): " TARGET_DIR
TARGET_DIR=${TARGET_DIR:-antipy-app}

if [ -d "$TARGET_DIR" ]; then
    echo "❌ Error: Directory '$TARGET_DIR' already exists. Please choose a different name."
    exit 1
fi

# 3. Clone Repository
echo "📥 Downloading AntiPy via git..."
git clone https://github.com/akshay7star/Antipy.git "$TARGET_DIR"

# 4. Install Dependencies
echo "📦 Installing Node.js dependencies (this may take a minute)..."
cd "$TARGET_DIR/app"
npm install

# 5. Success Banner
echo ""
echo "✨ Success! AntiPy is now installed."
echo ""
echo "Type the following to enter the directory and start learning:"
echo "👉 cd $TARGET_DIR/app"
echo "👉 npm run dev"
echo ""
echo "Starting development server for you now..."
echo "Open http://localhost:3000 in your browser."
echo ""

# 6. Auto Start
npm run dev
