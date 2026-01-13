# Test Auth APIs Script
Write-Host "Testing Auth APIs..." -ForegroundColor Green

# Test Register
Write-Host "`n1. Testing Register..." -ForegroundColor Yellow
$registerBody = @{
    name = "Soumik"
    email = "soumik@test.com"
    password = "123456"
    city = "Bangalore"
    role = "customer"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
        -Method POST `
        -Body $registerBody `
        -ContentType "application/json"
    
    Write-Host "✓ Register successful!" -ForegroundColor Green
    $registerResponse.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "✗ Register failed!" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

# Test Login
Write-Host "`n2. Testing Login..." -ForegroundColor Yellow
$loginBody = @{
    email = "soumik@test.com"
    password = "123456"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
        -Method POST `
        -Body $loginBody `
        -ContentType "application/json"
    
    Write-Host "✓ Login successful!" -ForegroundColor Green
    $loginData = $loginResponse.Content | ConvertFrom-Json
    $loginData | ConvertTo-Json -Depth 10
    
    # Extract and display token
    Write-Host "`nJWT Token:" -ForegroundColor Cyan
    Write-Host $loginData.token -ForegroundColor White
} catch {
    Write-Host "✗ Login failed!" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
