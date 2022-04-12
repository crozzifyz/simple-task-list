# Simple Task List
#### The app is made up of lists and tasks. A list has a title and an ordered list of tasks. A task has a title and a status indicating whether or not it has been completed.

## Development Setup
```
# install dependencies
npm install

# Copy .env from .env.example, then change details if needed
cp .env.example .env
```

## Database Migration and Seed
```
# start docker for hosting local database
docker-compose up -d

# run database migration
npm run migrate

# run database seed for test
npm run seed:test
```
```
# optional
# run reset migration and re-migration
npm run migrate:reset

# run reset migration, re-migration and re-seed for test
npm run migrate:reset-test

# run specific seed file if needed
npx knex seed:run --specific=seed_file_name.ts

# create migrate file if needed
npx knex migrate:make create-table-test
```

## Build & Run
```
# build
npm run build

# run
npm run start

# start development server
npm run dev
```


## Build & Run
### build
```
npm run build
```

### run
```
npm run start
```

### start development server
```
npm run dev
```
