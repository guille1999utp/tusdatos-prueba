

# Documentación de Endpoints - Proyecto EPIC

## Descripción del Proyecto

Esta es una API RESTful desarrollada con FastAPI para gestionar una aplicación de eventos. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para eventos y adicionalmente ingresar y registrarse en el aplicativo y unirse a un evento.

## Características 
- **Gestión de eventos** 
- Crear, leer, actualizar y eliminar Eventos. 
- Cada evento tiene un número de personas que se permite ingresar como invitado. 
- Cada evento existen 4 tipos de roles, si organizar, invitado, administrador de su evento o asistente. 
  
## Requisitos 
- Python 3.8+ 
- FastAPI 
-  SQLAlchemy 
-  Pydantic 
-  PostgresSQL 

## Instalación y Configuración

### Pasos para Usar Localmente

1. clonar el proyecto con el siguiente comando: `git clone https://github.com/guille1999utp/tusdatos-prueba.git`

2. nos ubicamos dentro del proyecto: `cd tusdatos-prueba/backend`

3. Instalamos las dependencias del proyecto con el siguiente comando (se debe tener instalado python y pip):

```console
 pip install -r requirements.txt
```

4. Inicia el servidor con el siguiente comando en la misma ruta: 

```console
 uvicorn main:app --reload
```

si con el anterior comando no se ejecuto el programa tambien se encuentra esta otra opcion:

```console
 python -m uvicorn main:app --reload
```

### Swagger de FastApi

Si quieres ver más información sobre los endpoints disponibles, ingresa a la siguiente ruta: [http://localhost:8000/docs](http://localhost:8000/docs)

### Postman

si quieres utilizar los enpoints directamente en postman puedes import los enpoints del archivo llamado `tusdatos` que esta en la ruta raiz de este proyecto