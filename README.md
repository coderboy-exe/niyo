
## Description

Niyo Task Manager repository.

## Installation

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
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Stay in touch

- Author - [Uchechukwu Ottah](https://github.com/coderboy-exe)
- Website - [https://coderboy.exe.vercel.app](https://coderboy.exe.vercel.app)
- Twitter - [@coderboy_exe](https://twitter.com/coderboy_exe)
