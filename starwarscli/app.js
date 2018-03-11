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
                console.log('found something')
                promptUser(results, nameArray)
            }
            else {
                console.log('found nothing')
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
    console.log("-----------------------------------------------------------------")
    switch (object["category"]) {  // TODO Formatting
        case "films":
        console.log("----------------------------FILMS--------------------------------")
        object.results.forEach((item) => {
            console.log(
            `
                >>> ${item.title} <<< 
                Episode: ${item.episode_id}
                Opening Crawl: ${item.opening_crawl}
                Director: ${item.director}
                Producer: ${item.producer}
                Release Date: ${item.release_date}
                Species: ${item.species}
                Characters: ${item.characters}
                Planets: ${item.planets}
                URL: ${item.URL}
                Created: ${item.created}
                Edited: ${item.edited}

            `
            )
        })
        break;
        case "people":
            console.log("-----------------------------PEOPLE------------------------------")
            object.results.forEach((item) => {
                console.log(
                ` >>> ${item.name} <<<
                    Birth Year: ${item.birth_year}
                    Eye Color: ${item.eye_color}
                    Hair Color: ${item.hair_color}
                    Gender: ${item.gender}
                    Height: ${item.height}
                    Weight: ${item.mass}
                    Skin Color: ${item.skin_color}
                    Homeworld: ${item.homeworld}
                    Films: ${item.films}
                    Species: ${item.species}                           
                    Starships: ${item.starships}
                    Vehicles: ${item.vehicles}
                    URL: ${item.url}
                    Created: ${item.created}
                    Edited: ${item.edited}
                ` 
                )
            })
        break;
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
            break;
        default:
            console.log(object);
            break;
            console.log("-----------------------------------------------------------------")
    }

}

module.exports = {
    search,
    getbyid
}
