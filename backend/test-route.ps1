# Test Route Optimization API

Write-Host "Testing Route Optimization API..." -ForegroundColor Cyan

$body = @{
    start = "Agent"
    end = "Customer"
    locations = @(
        @{
            name = "Agent"
            connections = @(
                @{ to = "Laundry"; distance = 5 }
            )
        },
        @{
            name = "Laundry"
            connections = @(
                @{ to = "Customer"; distance = 7 }
            )
        },
        @{
            name = "Customer"
            connections = @()
        }
    )
} | ConvertTo-Json -Depth 10

Write-Host "`nRequest Body:" -ForegroundColor Yellow
Write-Host $body

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/routes/optimize" -Method POST -Body $body -ContentType "application/json"

Write-Host "`nResponse:" -ForegroundColor Green
$response | ConvertTo-Json

Write-Host "`n✅ Expected: distance=12, path=['Agent','Laundry','Customer']" -ForegroundColor Cyan
