# Despliegue a GitHub Pages

Instrucciones para publicar este sitio estático en GitHub Pages.

Requisitos locales:
- git
- GitHub CLI (`gh`) (opcional pero recomendado)

Pasos rápidos (con `gh`):

1. Autenticar GitHub CLI si no lo has hecho:

   gh auth login

2. Crear el repositorio remoto y subir:

   gh repo create <tu-usuario>/<repo-name> --public --source=. --push

   (ejemplo: `gh repo create mi-org/las-misiones-site --public --source=. --push`)

3. El flujo de GitHub Actions incluido (`.github/workflows/deploy_pages.yml`) desplegará el contenido a GitHub Pages automáticamente cuando hagas push a `main`.

4. Ve a la página del repositorio en GitHub → Settings → Pages para verificar la URL pública (github.io) y las opciones si necesitas personalizar el dominio.

Si no quieres usar `gh`, puedes crear el repositorio en github.com manualmente y luego ejecutar:

```
git remote add origin https://github.com/<tu-usuario>/<repo-name>.git
git branch -M main
git push -u origin main
```

Eso activará la acción y, tras unos momentos, el sitio debería estar publicado en https://<tu-usuario>.github.io/<repo-name>/
