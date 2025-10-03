Write-Host "Este script ayuda a crear un repo en GitHub y hacer push. Requisitos: git y gh CLI autenticado."
Write-Host "USO (PowerShell): .\create_repo_and_push_simple.ps1 <repo-name> [--public]"
if($args.Count -lt 1){
  Write-Host "Falta repo-name. Ej: .\create_repo_and_push_simple.ps1 las-misiones-site --public"; exit 1
}
$repoName = $args[0]
$isPublic = $args -contains '--public'

if(-not (Get-Command git -ErrorAction SilentlyContinue)){ Write-Error 'git no está instalado.'; exit 1 }
if(-not (Get-Command gh -ErrorAction SilentlyContinue)){ Write-Error 'gh CLI no está instalado.'; exit 1 }

if(-not (Test-Path .git)) { git init }
git add --all
if((git status --porcelain) -ne $null){ git commit -m "Initial commit - deploy to GitHub Pages" 2>$null }

$flag = $isPublic ? '--public' : '--private'
Write-Host "Creando repo $repoName (public=$isPublic)..."
gh repo create $repoName $flag --source=. --push
if($LASTEXITCODE -eq 0){ Write-Host "Push completado. Workflow GitHub Actions desplegará a Pages tras push." }
else{ Write-Error "gh repo create falló. Revisa errores." }
