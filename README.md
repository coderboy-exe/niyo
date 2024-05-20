
## Description

Niyo Task Manager repository.

## Requirements
- Node v16+
- PosgreSQL

## Installation
Install all the required dependencies
```bash
$ npm install
```

## Basic Setup

- Create the DATABASE_URL variable in your .env file

```bash
# .env
DATABASE_URL="postgresql://your-postgres-username:your-postgres-password@localhost:5432/niyo-task-db?schema=public"
```

- Create your migrations (this also generates prisma client types)
```bash
# development
$ npx prisma migrate dev --name your_migration_name
```

## Running the app

```bash
# development (port 3000)
$ npm run start

# watch mode (port 3000)
$ npm run start:dev

# production mode
$ npm run start:prod
```
Starts the application at http://localhost:3000/

## Documentation
Check out the swagger documentation at: http://localhost:3000/swagger

## Test
Run the unit tests
```bash
# unit tests
$ npm run test

```


## Stay in touch

- Author - [Uchechukwu Ottah](https://github.com/coderboy-exe)
- Website - [https://coderboy.exe.vercel.app](https://coderboy.exe.vercel.app)
- Twitter - [@coderboy_exe](https://twitter.com/coderboy_exe)
