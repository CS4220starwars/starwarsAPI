const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: '--category [films|people|planets|species|starships|vehicles] --query [Query]',
        builder: (yargs) => {
            return yargs.option('c', {
                alias: 'category',
                describe: 'Searches from this set of categories',
                choices: ['films','people','planets','species','starships','vehicles']
            }).option('q', {
                alias: 'query',
                describe: 'String to search on'
            })
        },
        handler: (argv) => {  app.search(argv.category, argv.query) }
    })
    .command({
        command: 'getbyid',
        desc: '--category [films|people|planets|species|starships|vehicles] --id [id]',
        builder: (yargs) => {
            return yargs.option('c', {
                alias: 'category',
                describe: 'Searches from this set of categories',
                choices: ['films','people','planets','species','starships','vehicles']
            }).option('i', {
                alias: 'id',
                describe: 'Id to search on'
            })
        },
        handler: (argv) => {  app.getbyid(argv.category, argv.id) }
    })
    .help('help')
    .argv