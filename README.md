# starwarsAPI
A Node backend CLI that calls the Star Wars API 


# Usage
```
node cli.js search --category <films|people|planets|species|starships|vehicles> --query <query>
```

or 

```
node cli.js getbyid --category <films|people|planets|species|starships|vehicles> --id <id>
```


#Test Cases
```
node cli.js search --category films --query phantom
node cli.js search --category films --query the
node cli.js search --category people --query skywalker
node cli.js search --category species --query a
node cli.js search --category starships --query death
node cli.js search --category vehicles --query speeder


node cli.js getbyid --category vehicles --id 6
node cli.js getbyid --category people --id 2

```