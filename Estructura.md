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
│       ├── dto/                  
│       │   ├── create-user.dto.ts
│       │   └── update-user.dto.ts
│       ├── schemas/             
│       │    └── user.schemas.ts
│       ├── serializer/          
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