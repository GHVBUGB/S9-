Set-Location "c:\Users\guhongji\Desktop\学情报告9(最终版）\学情报告9(最终版）"
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
    exit $LASTEXITCODE
}
Write-Host "Starting development server..." -ForegroundColor Green
npm run dev

