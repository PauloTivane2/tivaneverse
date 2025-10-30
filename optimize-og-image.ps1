# Script para redimensionar e otimizar OG Image
# Requisitos: ImageMagick instalado

$inputImage = "src\utils\faveicon.png"
$outputImage = "public\og-image-optimized.jpg"

# Verificar se ImageMagick está instalado
$magickPath = "magick"

try {
    # Redimensionar para 1200x630 (padrão OG) e converter para JPG com qualidade 85%
    & $magickPath $inputImage -resize "1200x630^" -gravity center -extent "1200x630" -quality 85 $outputImage
    
    Write-Host "✅ Imagem otimizada criada com sucesso!" -ForegroundColor Green
    Write-Host "📁 Localização: $outputImage" -ForegroundColor Cyan
    
    $fileSize = (Get-Item $outputImage).Length / 1KB
    Write-Host "📊 Tamanho: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Yellow
    
    Write-Host "`n🔄 Próximos passos:" -ForegroundColor Magenta
    Write-Host "1. Renomear og-image-optimized.jpg para og-image.jpg"
    Write-Host "2. Atualizar layout.tsx para usar .jpg em vez de .png"
    Write-Host "3. Fazer commit e push"
    
} catch {
    Write-Host "❌ Erro: ImageMagick não encontrado!" -ForegroundColor Red
    Write-Host "`n💡 Solução alternativa:" -ForegroundColor Yellow
    Write-Host "Use um destes sites para otimizar manualmente:"
    Write-Host "- https://www.iloveimg.com/resize-image"
    Write-Host "- https://tinypng.com/"
    Write-Host "- https://squoosh.app/"
    Write-Host "`n📐 Configurações necessárias:"
    Write-Host "- Dimensões: 1200x630 pixels"
    Write-Host "- Formato: JPG ou PNG"
    Write-Host "- Tamanho: < 300KB"
}
