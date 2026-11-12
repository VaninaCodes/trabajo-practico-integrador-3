# Integrador 3 - Pasos para empezar un proyecto

1. Crear la carpeta e iniciar el proyecto:
   `npm init -y`
2. Instalar dependencias:
   `npm i express mongoose dotenv express-validator bcrypt jsonwebtoken cookie-parser cors`
   `npm i -D nodemon`
3. En `package.json` agregar `"type": "module"` y el script `"dev": "nodemon app.js"`.
4. Crear `.gitignore` con `node_modules/` y `.env`.
5. Crear `.env` (y `.env.example` sin valores secretos):
   `PORT=3000`
   `MONGODB_URI=mongodb://localhost:27017/nombre-bd`
   `JWT_SECRET=`
6. Crear la estructura en `src/`: `config`, `models`, `controllers`, `routes`, `middlewares`, `helpers`.
7. Conectar la BD en `src/config/database.js` con `mongoose.connect`.
8. Armar `app.js`: `express.json()`, `cookieParser()`, rutas y `app.listen`.
9. Crear los modelos (schemas, relaciones, virtuals).
10. Crear validadores, middlewares (auth, roles) y controladores.
11. Definir las rutas y conectarlas en `app.js`.
12. Probar todo con Postman y levantar con `npm run dev`.
