## Article11

Run project with the following commands :

```
docker compose up --watch
```

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Database guide

> **Note :** The Docker image must be running in order to use the database.

Open prisma studio to inspect database :

```
npx prisma studio
```
Push models in the database :

```
npx prisma db push
```