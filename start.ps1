# ============================================================
# Mixology DB — Start backend + frontend together
# Run this from the project root: .\start.ps1
# ============================================================

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Mixology DB — Starting all services    " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# ── Check .env has a real MongoDB URI ──────────────────────
$envFile = Join-Path $root "backend\.env"
$envContent = Get-Content $envFile -Raw
if ($envContent -match "MONGODB_URI=mongodb://localhost") {
    Write-Host "⚠️  WARNING: Your backend\.env still points to localhost MongoDB." -ForegroundColor Yellow
    Write-Host "   MongoDB is not installed on this machine." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Please do one of the following:" -ForegroundColor White
    Write-Host "   1. Go to https://mongodb.com/atlas → create a FREE cluster" -ForegroundColor White
    Write-Host "   2. Copy your connection string (looks like mongodb+srv://...)" -ForegroundColor White
    Write-Host "   3. Open backend\.env and replace the MONGODB_URI line" -ForegroundColor White
    Write-Host "   4. Run this script again" -ForegroundColor White
    Write-Host ""
    $answer = Read-Host "Do you want to enter your MongoDB URI now? (y/n)"
    if ($answer -eq "y" -or $answer -eq "Y") {
        $uri = Read-Host "Paste your MongoDB URI"
        $newContent = $envContent -replace "MONGODB_URI=.*", "MONGODB_URI=$uri"
        Set-Content -Path $envFile -Value $newContent
        Write-Host "✅ .env updated!" -ForegroundColor Green
    } else {
        Write-Host "Exiting. Update backend\.env and re-run." -ForegroundColor Red
        exit 1
    }
}

# ── Start backend ──────────────────────────────────────────
Write-Host "🚀 Starting backend (port 5000)..." -ForegroundColor Green
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", `
    "cd '$root\backend'; npm run dev" `
    -PassThru

Start-Sleep -Seconds 3

# ── Start frontend ─────────────────────────────────────────
Write-Host "🚀 Starting frontend (port 5173)..." -ForegroundColor Green
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", `
    "cd '$root\frontend'; npm run dev" `
    -PassThru

Start-Sleep -Seconds 3

# ── Open browser ───────────────────────────────────────────
Write-Host ""
Write-Host "✅ Both servers are starting up!" -ForegroundColor Green
Write-Host "   Frontend → http://localhost:5173" -ForegroundColor Cyan
Write-Host "   Backend  → http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opening browser in 4 seconds..." -ForegroundColor Gray
Start-Sleep -Seconds 4
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "Press any key to stop both servers..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Cleanup
Stop-Process -Id $backend.Id -ErrorAction SilentlyContinue
Stop-Process -Id $frontend.Id -ErrorAction SilentlyContinue
Write-Host "Servers stopped." -ForegroundColor Red
