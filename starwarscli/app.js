const
    starwars = require('starwarsapi'),
    inquirer = require('inquirer')

const search = (category, query) => { // 
    const nameArray = []
    starwars.search(category, query)
        .then((results) => {
            results.results.forEach((item) => {
                nameArray.push(item.name)
            })
            results["category"] = category;

            if (nameArray.length > 1) {
                promptUser(results, nameArray)
            }
            else {
                prettyPrint(results)
            }
        }).catch(err => console.log(err))
}

const getbyid = (category, id) => {
    starwars.getbyid(category, id)
        .then((results) => {
            prettyPrint(results)
        }).catch(err => console.log(err))
}


const promptUser = (results, nameArray) => {
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'Select to view details',
        name: 'selections',
        choices: nameArray,
        validate: (selections) => {
            if (selections.length > 0) {
                return true
            }
        }
    }]).then((selected) => {
        results.results = results.results.filter((item) => {
            return selected.selections.includes(item.name)
        })
        prettyPrint(results)
    })
}

const prettyPrint = (object) => {
    //[films|people|planets|species|starships|vehicles]
    // for (results in results) print each object
    switch (object["category"]) {  // TODO Formatting
        // case "films":

        //     break;
        // case "people":

        //     break;
        // case "planets":

        //     break;
        // case "species":

             //break;
         case "starships":
        console.log("--------------------STARSHIP--------------------")
            
            object.results.forEach((item) => {
                console.log(
                `
                >>> ${item.name} <<<
                Model: ${item.model}
                Class: ${item.starship_class}
                Manufacturer: ${item.manufacturer}
                Length: ${item.length} feet
                Cost: ${item.cost_in_credits} credits 
                Passengers: ${item.passengers}
                Crew: ${item.crew}
                Cargo: ${item.cargo_capacity}
                Max atmospheric Pressure: ${item.max_atmosphering_speed} km/h
                `
                )
            })
                 console.log("------------------------------------------------")
             break;
        case "vehicles":
        console.log("--------------------VEHICLE--------------------")
            
            object.results.forEach((item) => {
                console.log(
                `
                >>> ${item.name} <<<
                Model: ${item.model}
                Class: ${item.vehicle_class}
                Manufacturer: ${item.manufacturer}
                Length: ${item.length} feet
                Cost: ${item.cost_in_credits} credits
                Length: ${item.max_atmosphering_speed} km/h 
                Passengers: ${item.crew}
                `
                )
            })
             console.log("-----------------------------------------------")
            break;
        default:
            console.log(object);
            break;
    }

}

module.exports = {
    search,
    getbyid
}
