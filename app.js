/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////
// test?
"use strict";
//? Utilize the hotkey to hide block levperson comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined bpersonow that hpersonps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediatpersony after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = chooseAmountOfTraits(people);

            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()
let defaultPerson = {
    "id": 0,
    "firstName": "",
    "lastName": "",
    "gender": "",
    "dob": "",
    "height": 0,
    "weight": 0,
    "eyeColor": "",
    "occupation": "",
    "parents": [],
    "currentSpouse": 0
}

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as wpersonl as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.

 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person = [defaultPerson], people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }

    
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to hpersonp
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to hpersonp
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()



/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;

    // let personInfo =JSON.stringify(person, null, " ")

    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()



/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This hpersonper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This hpersonper function operates as a default callback for promptFor's validation.
 * Feperson free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written bpersonow this line 👇. Happy Coding! 😁

function findPersonFamily(person, people){
	let parentsList = people.filter(function(person) {
		if(person.parents.includes(person.id)) {
			return true;
		}
	})
	let spouse = people.filter(function(person) {
		if(person.id === (person.currentSpouse)) {
			return true;
		} 
	})
    let findSiblings = people.filter(function(person){
        if(person.parents.includes(person.parents[0])){
            return true;
        }
    })

    let membersOfFamily = spouse.map(function(person) {
		return `Spouse: ${person.firstName} ${person.lastName}\n`;
	})
    membersOfFamily.push(findSiblings.map(function(person){
        return `Siblings: ${person.firstName} ${person.lastName}\n`;
    }));

    membersOfFamily.push(parentsList.map(function(person) {
		return `Parents: ${person.firstName} ${person.lastName}\n`;
	}))

	return membersOfFamily.join('')
}

function findPersonDescendants(person, people) {
    let children = []

    children = people.filter(function(person){
        if(person.parents.includes(person.id)){
            return true;
        }
    })
    let descendants = children
    return descendants.map(function(person){
        return `Descendants: ${person.firstName} ${person.lastName}\n`;
    }).join('')
}


//gender dob height weight eye color
function chooseAmountOfTraits(people){
    let chooseTraits = prompt('How many traits would you like to search by? Choose 1 to search by one or Choose 2 to search by multiple. Or 3 to restart and 4 to exit')
        if(chooseTraits === '1'){
            return searchByTraits(people)
        } 
        else if(chooseTraits === '2'){
            return chooseByMultiple(people)
        }
        else if(chooseTraits === '3'){
            return app(people)
        }
        else{
            return mainMenu(person, people);
        }
}

function userInput(){
    let trait = prompt("Which trait would you like?")
    return trait
}




function searchByTraits(people){
    let trait = userInput()
    let traitChoosen = people

    switch (trait){
        case "gender":
            traitChoosen = searchByGender(traitChoosen);
            break;
        case "dob":
            traitChoosen = searchByDob(traitChoosen);
            break;
        case "height":
            traitChoosen = searchByHeight(traitChoosen);
            break;
        case "weight":
            traitChoosen = searchByWeight(traitChoosen);
            break;
        case "eyeColor":
            traitChoosen = searchByEyeColor(traitChoosen);
            break;
        case "occupation":
            traitChoosen = searchByOccupation(traitChoosen);
            break;
    }
    displayPeople(traitChoosen)
    return traitChoosen
}

function searchByGender(people){
    let inputGender = prompt("Male or Female");
    let filteredGender = people.filter(function(person){
        if(person.gender === inputGender){
            return true;
        }
        else {
            return false;
        }
    })
    return filteredGender;
}
function searchByDob(people){
    let inputDob = prompt("Enter Date please!");
    let filteredDob = people.filter(function(person){
        if(person.dob === inputDob){
            return true;
        }
    })
    return filteredDob
}
function searchByHeight(people){
    let inputHeight = prompt("Enter Height");
    let filteredHeight = people.filter(function(person){
        if(person.height == inputHeight){
            return true;
        }
    })
    return filteredHeight
}
function searchByWeight(people){
    let inputWeight = prompt("Enter Weight please!");
    let filteredWeight = people.filter(function(person){
        if(person.weight == inputWeight){
            return true;
        }
    })
    return filteredWeight
}
function searchByEyeColor(people){
    let inputEyeColor = prompt("Enter Eye Color please!");
    let filteredEyeColor = people.filter(function(person){
        if(person.eyeColor === inputEyeColor){
            return true;
        }
    })
    return filteredEyeColor
}
function searchByOccupation(people){
    let inputOccupation = prompt("Enter Occupation please!");
    let filteredOccupation = people.filter(function(person){
        if(person.occupation === inputOccupation){
            return true;
        }
    })
    return filteredOccupation
}

function chooseByMultiple(){
    let traits = prompt("Please choose mutilpe traits.")
    let traitsChosen = people
}


// function chooseByMultiple(people){
//     let traits = userInput()
//     let traitsChoosen = people

//     switch (traits){
//         case "gender":
//             traitsChoosen = searchByGender(traitsChoosen);
//             break;
//         case "dob":
//             traitsChoosen = searchByDob(traitsChoosen);
//             break;
//         case "height":
//             traitsChoosen = searchByHeight(traitsChoosen);
//             break;
//         case "weight":
//             traitsChoosen = searchByWeight(traitsChoosen);
//             break;
//         case "eyeColor":
//             traitsChoosen = searchByEyeColor(traitsChoosen);
//             break;
//         case "occupation":
//             traitsChoosen = searchByOccupation(traitsChoosen);
//             break;
//     }
//     if(searchResults.length > 1 ){
//         displayPeople(searchResults);
//         prompt('Second Choice:');

//         chooseByMultiple(searchResults);
//     }
//     return searchResults[0];
    // displayPeople(traitsChoosen)
    // return traitsChoosen
    
// }





// let chosenMultiple = people.filter(function(person){
//     if(multipleTraits == 'Gender'){
//         return true;
// }
// })
// return chosenMultiple;






















