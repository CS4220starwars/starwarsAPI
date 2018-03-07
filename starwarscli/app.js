const
    starwars = require('starwarsapi'),
    inquirer = require('inquirer')

const search = (category, query) => {
    starwars.search(category, query)
        .then((results) => {
           results.results.forEach((item)=>{
               console.log(item.name)
           })
        }).catch(err => console.log(err))
}

const getbyid = (category, id) => {
    starwars.getbyid(category, id)
        .then((results) => {
           console.log(results)
        }).catch(err => console.log(err))
}



const discardPrompt = (result, currentHand, removeCrds) => {
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'Select to view details',
        name: 'cards',
        choices: currentHand,
        validate: (cards) => { }
    }])
}


module.exports = {
    search,
    getbyid
}
