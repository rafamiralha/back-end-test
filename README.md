
## Descrição do Projeto

Este projeto contém os serviços necessários para a comunicação com um Banco de dados MySQL, por meio da lib TypeORM, se faz necessária a substituição das informações do banco de dados por dados referentes ao seu próprio banco de dados mySQL:    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    Para Segurança da Informação, protegi os dados através da lib .env.

## Instale as Dependecias necessárias antes da execução

```bash

$ npm install
```

## Após Instalar Execute, e Iniciar seu Banco de Dados, execute:

```bash

 npm run start:dev

````