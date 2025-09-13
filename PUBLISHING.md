# NPM Publishing Setup

## Configuración inicial

Para que el workflow de publicación a NPM funcione correctamente, necesitas configurar el token de NPM en GitHub.

### 1. Crear token de NPM

1. Ve a [npmjs.com](https://www.npmjs.com) e inicia sesión
2. Ve a Settings > Access Tokens
3. Crea un nuevo token con permisos de **Automation** (recomendado) o **Publish**
4. Copia el token generado

### 2. Configurar secret en GitHub

1. Ve a tu repositorio en GitHub
2. Settings > Secrets and variables > Actions
3. Crea un nuevo repository secret:
   - Name: `NPM_TOKEN`
   - Value: el token que copiaste de NPM

### 3. Uso del workflow

#### Publicación automática (recomendado)

1. Actualiza la versión en package.json:
   ```bash
   npm version patch  # para 1.0.0 -> 1.0.1
   npm version minor  # para 1.0.0 -> 1.1.0
   npm version major  # para 1.0.0 -> 2.0.0
   ```

2. Haz push del tag:
   ```bash
   git push origin --tags
   ```

3. Crea un release en GitHub:
   - Ve a Releases > Create a new release
   - Selecciona el tag recién creado
   - Añade título y descripción
   - Publica el release

4. El workflow se ejecutará automáticamente y publicará a NPM

#### Publicación manual

1. Ve a Actions > Publish to NPM
2. Haz clic en "Run workflow"
3. Opcionalmente especifica una versión
4. El workflow se ejecutará manualmente

## Verificación

Después de la ejecución exitosa del workflow:

1. Verifica que el paquete aparezca en [npmjs.com/package/react-tw-breakpoints](https://www.npmjs.com/package/react-tw-breakpoints)
2. Prueba la instalación: `npm install react-tw-breakpoints@latest`

## Solución de problemas

- **Error de autenticación**: Verifica que el secret NPM_TOKEN esté configurado correctamente
- **Error de versión**: Asegúrate de que la versión en package.json coincida con el tag del release
- **Error de build**: Revisa que `npm run build` funcione localmente