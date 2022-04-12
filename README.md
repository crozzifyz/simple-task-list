# Simple Task List
The app is made up of lists and tasks. A list has a title and an ordered list of tasks. A task has a title and a status indicating whether or not it has been completed.

## Development Setup

Install dependencies
```
npm install
```

Copy .env from .env.example, then change details if needed
```
cp .env.example .env
```

## Database Migration and Seed

Start docker for hosting local database
```
docker-compose up -d
```

Run database migration
```
npm run migrate
```

Run database seed for test
```
npm run seed:test
```

## Build, Test and Run
Build
```
npm run build
```

Test
```
npm run test
```

Run
```
npm run start
```

Start development server
```
npm run dev
```


## Optional commands for development/testing
Run reset migration and re-migration
```
npm run migrate:reset
```

Run reset migration, re-migration and re-seed for test
```
npm run migrate:reset-test
```

Run specific seed file if needed
```
npx knex seed:run --specific=seed_file_name.ts
```

Create migrate file if needed
```
npx knex migrate:make create-table-test
```
