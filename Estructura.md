## Estructura del Proyecto 📂

El proyecto sigue la estructura modular de NestJS, que fomenta la separación de responsabilidades y facilita el mantenimiento. A continuación se describe la organización básica:

```plaintext
src/
├── app.module.ts           # Módulo principal de la aplicación
├── main.ts                 # Punto de entrada de la aplicación
├── modules/                # Módulos de la aplicación
│   ├── users/              # Módulo de usuarios
│       ├── users.controller.ts    # Controlador del módulo de usuarios
│       ├── users.service.ts       # Lógica de negocio del módulo de usuarios
│       ├── users.module.ts        # Declaración del módulo de usuarios
│       ├── dto/                   # Data Transfer Objects para validación
│       │   ├── create-user.dto.ts
│       │   └── update-user.dto.ts
│       ├── schemas/              # Modelo de MongoDB
│       │    └── user.schemas.ts
│       ├── serializer/           # Respuestas de controladores
│       │    └── user.serializer.ts    
│       ├── tests/                # Testing
│            └── user.controller.spec.ts    
├── Dockerfile
├── docker.compose.yml   
├── nest-cli.json 
├── package-lock.json 
├── package.json
├── tsconfig.build.json
├── tsconfig.json