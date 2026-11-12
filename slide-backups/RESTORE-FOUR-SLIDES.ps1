# Restore the four hero slides to the saved restore point (four-slides-LATEST).
# Run from anywhere. Requires PowerShell.

$ErrorActionPreference = "Stop"
$siteRoot = Split-Path -Parent $PSScriptRoot
$backup = Join-Path $PSScriptRoot "four-slides-LATEST"

if (-not (Test-Path $backup)) {
  Write-Error "Restore point missing: $backup"
}

Write-Host "Restoring four slides from:"
Write-Host "  $backup"
Write-Host "Into site:"
Write-Host "  $siteRoot"

# Images
$imgDest = Join-Path $siteRoot "public\img\hero-redesign"
New-Item -ItemType Directory -Path $imgDest -Force | Out-Null
Copy-Item (Join-Path $backup "img\*") $imgDest -Force

# Code
Copy-Item (Join-Path $backup "src\components\hero\heroSlides.ts") (Join-Path $siteRoot "src\components\hero\heroSlides.ts") -Force
Copy-Item (Join-Path $backup "src\components\Hero.tsx") (Join-Path $siteRoot "src\components\Hero.tsx") -Force
Copy-Item (Join-Path $backup "src\components\HeroMobile.tsx") (Join-Path $siteRoot "src\components\HeroMobile.tsx") -Force
Copy-Item (Join-Path $backup "src\components\HeroDesktop.tsx") (Join-Path $siteRoot "src\components\HeroDesktop.tsx") -Force
Copy-Item (Join-Path $backup "src\styles\global.css") (Join-Path $siteRoot "src\styles\global.css") -Force
Copy-Item (Join-Path $backup "index.html") (Join-Path $siteRoot "index.html") -Force

Write-Host ""
Write-Host "RESTORE COMPLETE."
Write-Host "Hard-refresh the browser (or restart Vite) to see the restored slides."
Write-Host "Exact values are documented in:"
Write-Host "  $backup\FOUR-SLIDES-DOCUMENT.md"
