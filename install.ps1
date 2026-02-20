$ErrorActionPreference = "Stop"

Write-Host "🚀 Welcome to the AntiPy Quick Installer!" -ForegroundColor Cyan

# 1. Check requirements
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Error: git is not installed. Please install git and try again." -ForegroundColor Red
    exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Error: npm is not installed. Please install Node.js and try again." -ForegroundColor Red
    exit 1
}

# 2. Get target directory
Write-Host "📁 Where would you like to install AntiPy?" -ForegroundColor Yellow
$TargetDir = Read-Host "Directory name (default: antipy-app)"
if ([string]::IsNullOrWhiteSpace($TargetDir)) {
    $TargetDir = "antipy-app"
}

if (Test-Path $TargetDir) {
    Write-Host "❌ Error: Directory '$TargetDir' already exists. Please choose a different name." -ForegroundColor Red
    exit 1
}

# 3. Clone Repository
Write-Host "📥 Downloading AntiPy via git..." -ForegroundColor Cyan
git clone https://github.com/akshay7star/Antipy.git $TargetDir

# 4. Install Dependencies
Write-Host "📦 Installing Node.js dependencies (this may take a minute)..." -ForegroundColor Cyan
Set-Location "$TargetDir\app"
npm install

# 5. Success Banner
Write-Host ""
Write-Host "✨ Success! AntiPy is now installed." -ForegroundColor Green
Write-Host ""
Write-Host "Type the following to enter the directory and start learning:"
Write-Host "👉 cd $TargetDir\app"
Write-Host "👉 npm run dev"
Write-Host ""
Write-Host "Starting development server for you now..." -ForegroundColor Yellow
Write-Host "Open http://localhost:3000 in your browser."
Write-Host ""

# 6. Auto Start
npm run dev
