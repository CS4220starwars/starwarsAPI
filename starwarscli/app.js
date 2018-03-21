const
    starwars = require('starwarsapi'),
    inquirer = require('inquirer')


const search = (category, query) => { // 
    const nameArray = []
    starwars.search(category, query)
        .then((results) => {
            results.results.forEach((item) => {
                if (category == "films")
                    nameArray.push(item.title)
                else
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
    const newObj = {}
    newObj["results"] = []
    starwars.getbyid(category, id)
        .then((results) => {
            newObj["results"].push(results)
            newObj["category"] = category
            prettyPrint(newObj)
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
        if (results["category"] == "films") {
            results.results = results.results.filter((item) => {
                return selected.selections.includes(item.title)
            })
        }
        else {
            results.results = results.results.filter((item) => {
                return selected.selections.includes(item.name)
            })
        }
        prettyPrint(results)
    })
}

const prettyPrint = (object) => {
    //[films|people|planets|species|starships|vehicles]
    // for (results in results) print each object
    console.log(`
    ------------------------------  ${object["category"].toUpperCase()}  -------------------------------------`)
    switch (object["category"]) {  // TODO Formatting
        case "films":  // FILMS -------------------------------------------
            object.results.forEach((item) => {
                console.log(
                    `
            >>> ${item.title} <<< 
                Episode: ${item.episode_id}
                Director: ${item.director}
                Producer: ${item.producer}
                Release Date: ${item.release_date}
                Created: ${item.created}
                Edited: ${item.edited}
            `
                )
            })
            // Opening Crawl: ${item.opening_crawl}
            // Species: ${item.species}
            // Characters: ${item.characters}
            // Planets: ${item.planets}
            break;
        case "people": // PEOPLE --------------------------------
            object.results.forEach((item) => {
                console.log(
                    ` 
            >>> ${item.name} <<<
                Birth Year: ${item.birth_year}
                Eye Color: ${item.eye_color}
                Hair Color: ${item.hair_color}
                Gender: ${item.gender}
                Height: ${item.height}
                Weight: ${item.mass}
                Skin Color: ${item.skin_color}
                Homeworld: ${item.homeworld}
                Vehicles: ${item.vehicles}
                URL: ${item.url}
                Created: ${item.created}
                Edited: ${item.edited}
                `
                )
            })
            // Films: ${item.films}
            // Species: ${item.species}                           
            // Starships: ${item.starships}
            break;
        // case "planets":
        //TODO
        //     break;
        case "planets": //PLANETS
            object.results.forEach((item) => {
                console.log(
                `
                    >>> ${item.name} <<< 
                    Diameter: ${item.diameter}
                    Rotation period: ${item.rotation_period}
                    Orbital period: ${item.orbital_period}
                    Gravity: ${item.gravity}
                    Population: ${item.population}
                    Climate: ${item.climate}
                    Terrain: ${item.terrain}
                    Surface water: ${item.surface_water}
                    Residents: ${item.residents}
                    Films: ${item.films}
                    URL: ${item.url}
                `)
            })
            break;
        case "species":   //SPECIES -----------------------------------
            object.results.forEach((item) => {
                console.log(
                    `
            >>> ${item.name} <<<
                Average Height: ${item.average_height}
                Average Lifespan: ${item.average_lifespan}
                Classification: ${item.classification} 
                Designation: ${item.designation}       
                Eye Colors: ${item.eye_colors}
                Hair Colors: ${item.hair_colors}
                Skin Colors: ${item.skin_colors}  
                Homeworld: ${item.homeworld}
                Language: ${item.language}                        
                URL: ${item.url}
                Created: ${item.created}
                Edited: ${item.edited}
             `
                )
            })
            // People: ${item.people}  
            // Films: ${item.films}    
            break;
        case "starships":  // STARSHIPS     ----------------------
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
            break;
        case "vehicles": // VEHICLES 
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
