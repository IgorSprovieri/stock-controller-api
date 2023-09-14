# Stock Controller API

Stock controller is a REST API to manage stocks of stores.

## Features

- Login system with JWT
- Create, edit and delete products
- Dinamic product quantity creating, editing and deleting stock movements

## Documentation

1. Import the file below on Insomnia:

```
https://github.com/IgorSprovieri/stock-controller-api/blob/main/Insomnia.json
```

2. Read the docs: [igorsprovieri.github.io/stock-controller-api](https://igorsprovieri.github.io/stock-controller-api)

## Used Technologies

- Typescript
- Express
- TypeORM
- Postgres

## Main Concepts Applied

- HTTP server
- CRUD
- Middlewares
- JWT
- Bcrypt
- Migrations

## Requirements To Run

- Node ([nodejs.org](https://nodejs.org/en))
- Docker ([www.docker.com](https://www.docker.com))

## Getting Started

1. Clone the repo:

```
git clone https://github.com/IgorSprovieri/stock-controller-api
```

2. Install dependencies:

```
cd stock-controller-api
npm install
```

3. Create DB on Docker:

```
docker run --name stock-controller-db -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=docker -p 5432:5432 -d -t postgres
```

4. Create .env file following the example:

```
CORS_URL="*"
JWT_SECRET="jbneibiuv49u49gbbffnoepqskdapjsfoiaih"
DB_HOST="localhost"
DB_PORT=5432
DB_USERNAME="docker"
DB_PASSWORD="docker"
DB_DATABASE="docker"
```

5. Build the project

```
npm run build
```

6. Start the server

```
npm run start
```

7. Start the server on dev mode

```
npm run start:dev
```

## Author

<img src="https://media.licdn.com/dms/image/D4D03AQFdLhogHwQVog/profile-displayphoto-shrink_800_800/0/1672976913935?e=1695859200&v=beta&t=SR6o-9db7Oi-uRMAXwFS_mW4ZZXeAI1YQ7MfVwYVnDI" alt="Igor Sprovieri" style="width: 30%; border-radius: 50px;"/>

### _Igor Sprovieri_

---

After working as a Unity developer for 3 years, I migrated to the web development area and currently have Fullstack knowledge with React and Node. I have an app for the Apple Store and Google Play and a library for creating web pages inspired by React.
