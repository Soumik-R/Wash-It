# Test Greedy Batching API

Write-Host "Testing Greedy Batching API..." -ForegroundColor Cyan

# First, let's get a delivery agent ID
Write-Host "`nStep 1: Fetching delivery agents..." -ForegroundColor Yellow

try {
    $agents = Invoke-RestMethod -Uri "http://localhost:5000/api/agents" -Method GET -ContentType "application/json"
    
    if ($agents.Length -gt 0) {
        $agentId = $agents[0]._id
        Write-Host "Using Agent ID: $agentId" -ForegroundColor Green
    } else {
        Write-Host "No agents found. Creating test agent..." -ForegroundColor Yellow
        $agentId = "DELIVERY_AGENT_ID"
    }
} catch {
    Write-Host "Could not fetch agents. Using placeholder ID." -ForegroundColor Yellow
    $agentId = "DELIVERY_AGENT_ID"
}

# Test batching
Write-Host "`nStep 2: Assigning orders to agent..." -ForegroundColor Yellow

$body = @{
    agentId = $agentId
} | ConvertTo-Json

Write-Host "`nRequest Body:" -ForegroundColor Cyan
Write-Host $body

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/batching/assign" -Method POST -Body $body -ContentType "application/json"
    
    Write-Host "`nResponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 5
    
    Write-Host "`n✅ Batching test complete!" -ForegroundColor Green
    Write-Host "Orders assigned using greedy algorithm (closest orders first)" -ForegroundColor Cyan
} catch {
    Write-Host "`nError:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Write-Host "`n⚠️  Make sure you have:" -ForegroundColor Yellow
    Write-Host "  1. A delivery agent in the database" -ForegroundColor Yellow
    Write-Host "  2. Pending orders in the same city" -ForegroundColor Yellow
}
