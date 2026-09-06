# ============================================================
# Mixology DB — Connect to MongoDB Atlas & seed the database
# Run: .\setup-atlas.ps1
# ============================================================

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$envFile = "$root\backend\.env"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Mixology DB — MongoDB Atlas Setup        " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Paste your MongoDB Atlas connection string below." -ForegroundColor White
Write-Host "It looks like: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mixology-db" -ForegroundColor Gray
Write-Host ""

$uri = Read-Host "MongoDB URI"

if (-not $uri.StartsWith("mongodb")) {
    Write-Host "That doesn't look like a valid MongoDB URI. Please try again." -ForegroundColor Red
    exit 1
}

# Make sure the URI ends with the db name
if ($uri -notmatch "mixology-db") {
    if ($uri -match "\?") {
        $uri = $uri -replace "\?", "/mixology-db?"
    } else {
        $uri = $uri.TrimEnd("/") + "/mixology-db"
    }
}

# Update .env
$envContent = Get-Content $envFile -Raw
$newContent = $envContent -replace "MONGODB_URI=.*", "MONGODB_URI=$uri"
Set-Content -Path $envFile -Value $newContent.Trim()

Write-Host ""
Write-Host "✅ backend\.env updated!" -ForegroundColor Green

# Also generate a proper JWT secret if it's still the placeholder
if ($newContent -match "JWT_SECRET=your_super_secret_key_change_me") {
    $jwtSecret = [System.Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 } | ForEach-Object { [byte]$_ }))
    $newContent = (Get-Content $envFile -Raw) -replace "JWT_SECRET=.*", "JWT_SECRET=$jwtSecret"
    Set-Content -Path $envFile -Value $newContent.Trim()
    Write-Host "✅ JWT_SECRET auto-generated!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Seeding the database with cocktails..." -ForegroundColor Yellow

$seedResult = & node "$root\backend\seed\seed.js" 2>&1
Write-Host $seedResult

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  All done! Starting the app now...        " -ForegroundColor Green  
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

# Start both servers
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; npm run dev"
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm run dev"
Start-Sleep -Seconds 5

Write-Host "Opening browser..." -ForegroundColor Cyan
Start-Process "http://localhost:5173"
