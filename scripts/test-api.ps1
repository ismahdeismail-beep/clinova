$proc = Start-Process -FilePath "npx" -ArgumentList "tsx server.ts" -NoNewWindow -PassThru
Start-Sleep -Seconds 8
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/drugs/644c0e48-292b-436b-a55c-072b25108a8b/images" -UseBasicParsing -TimeoutSec 10
    Write-Output "Status: $($response.StatusCode)"
    Write-Output "Body (first 500 chars): $($response.Content.Substring(0, [Math]::Min(500, $response.Content.Length)))"
} catch {
    Write-Output "Error: $($_.Exception.Message)"
} finally {
    Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
}
