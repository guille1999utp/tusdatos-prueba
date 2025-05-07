FROM python:3.9

# Instalamos el cliente de MySQL a la imagen para poder detectar cuando la bd esta conectada
RUN apt-get update && apt-get install -y --fix-missing default-mysql-client

WORKDIR /app

# Copiamos el archivo requirements.txt y luego instalamos las dependencias
COPY requirements.txt .

# Instalamos las dependencias del proyecto
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos todo el proyecto excepto las variables de entorno de prueba
COPY . .

# Asignamos el puerto de la aplicación
EXPOSE 8000

# Comando para ejecutar la aplicación cuando el contenedor se inicia
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]