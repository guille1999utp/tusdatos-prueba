# Usa una imagen base de Node.js
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Copia las variables de entorno
COPY .env.local .env.local

# Expone el puerto que usa Vite
EXPOSE 5173

# Comando por defecto para ejecutar Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]