# I) Normal
### Configuration
Take a look to the configuration file at `config/default.json`

### Installation
1) Install NodeJS, npm, PostgreSQL

2) Update config/default.json

3) Install npm package
```
npm install
```

4) Run App
```
node app.js
```

5) **OPTIONS:** Init **demo** table and some data (only for Linux)
```
psql -U demo -d demo -a -f /sql/init_db_demo.sql
```

6) Access to API at http://localhost:5000

### Swagger Document
```
http://localhost:5000
```

# II) Docker
### Prerequisites
Make sure you had:
* Docker
* Docker Compose

### Run
1) Run postgresql and application
```
docker-compose -f docker-compose.yml up -d
```

2) **OPTIONS:** Init **demo** table and some data
```
sudo docker exec -it postgresql psql -U demo -d demo -a -f /sql/init_db_demo.sql
```

3) Access to API at http://localhost:5000


http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/
https://blog.hyphe.me/token-based-authentication-with-node/
https://blog.hyphe.me/using-refresh-tokens-for-permanent-user-sessions-in-node/