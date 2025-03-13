# Article11

### Run project with the following commands :

```
docker compose up --watch
```

In a second terminal :

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Database guide

Open prisma studio to inspect database :

```
npx prisma studio
```
Push models in the database :

```
npx prisma db push
```

> [!IMPORTANT]  
> The Docker image must be running in order to use the database.