## Estructura del Proyecto 📂

El proyecto sigue la estructura modular de NestJS, que fomenta la separación de responsabilidades y facilita el mantenimiento. A continuación se describe la organización básica:

```plaintext
src/
├── app.module.ts           
├── main.ts                 
├── modules/                
│   ├── users/              
│       ├── users.controller.ts    
│       ├── users.service.ts     
│       ├── users.module.ts
│       ├── profiles.module.ts
│       ├── auth.controller.ts
│       ├── auth.service.ts  
│       ├── auth.module.ts  

│       ├── dto/                  
│       │   ├── create-user.dto.ts
│       │   └── gender-enum.ts
│       │   └── login.dto.ts
│       │   └── rol.enum.ts
│       │   └── update-user.dto.ts
│       │   └── user-query.dto.ts
│       ├── schemas/             
│       │    └── user.schemas.ts
│       │    └── profile.schemas.ts
│       ├── serializer/     
│       │    └── profile.serializer.ts         
│       │    └── user.serializer.ts    
│       ├── tests/              
│            └── user.controller.spec.ts   
├── Dockerfile
├── docker.compose.yml   
├── nest-cli.json 
├── package-lock.json 
├── package.json
├── tsconfig.build.json
├── tsconfig.json