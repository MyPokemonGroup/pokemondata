# Pokemon Data

### Setup Database
src/config.json
```
{
  "development": {
    "username": "username",
    "password": "password",
    "database": "db_name",
    "host": "db_host",
    "dialect": "mysql"
    "port": "port"
  }
}
```

### Compile to pre-es6 Syntax
```
npm run compile

cp ./src/config.json lib &&
 ./node_modules/.bin/babel src --out-dir lib
```

### Run Compiled File
```
node lib/file_to_run.js
```