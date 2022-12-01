Test status  
[![Netlify Status](https://api.netlify.com/api/v1/badges/08ce6912-de5d-4d7f-a189-a9be432310c3/deploy-status)](https://app.netlify.com/sites/agem-test/deploys)  
Production status  
[![Netlify Status](https://api.netlify.com/api/v1/badges/410b23a0-69c2-44e4-bcd8-fa7e97b110bf/deploy-status)](https://app.netlify.com/sites/agem-web/deploys)

Hay un par de problemitas de dependencias y versiones, correr:

```
npm install --legacy-peer-deps
```

A falta de env variables, hay que modificar información al pasar a producción en:

- graphql/ApolloWrapper.js
- permission/PermissionGate.js
- index.js
