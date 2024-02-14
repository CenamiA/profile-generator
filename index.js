const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const newTeamMember= [];

//Set of questions asked 
const setQuestions = async() =>{
    const userAnswers = await inquirer
    .prompt([

{
    type: "input",
    message: "Hello, what's your name?",
    name: "name",
},

{
    type: "input",
    message: "Please enter your ID number",
    name: "id",
},

{
    type: "input",
    message: "Please provide your email address",
    name: "email",
},

{
    type: "list",
    message: "What is your role?",
    name: "role",
    choices: ["Engineer", "Intern", "manager"]
},


    ])

if (userAnswers.role === "Manager" ){
    const managerProfile = await inquirer.prompt([

        {
            type: "input",
            message: "Please provide your office number",
            name: "officeNumber",
        
        },
    ])

    const newManager = new Manager (
        userAnswers.name, userAnswers.id, userAnswers.email, managerProfile.officeNumber
        );
        newTeamMember.push(newManager);

} else if (userAnswers.role === "Engineer" ){
    const engineerProfile = await inquirer.prompt([

        {
            type: "input",
            message: "Please enter your Github user name",
            name: "github",
        
        },
    ])

    const newEngineer = new Engineer (
        userAnswers.name, userAnswers.id, userAnswers.email, engineerProfile.github
        );
        newTeamMember.push(newEngineer);

}else if (userAnswers.role === "Intern"){
    const internProfile = await inquirer.prompt([
        {
            type: "input",
            message: "What university did you attend?",
            name: "school",
        
        },

    ])

    const newIntern = new Intern (
        userAnswers.name, userAnswers.id, userAnswers.email, internProfile.school
    );
    newTeamMember.push(newIntern);
}

};


async function promptQuestions(){
    await setQuestions()

    const buildTeam = await inquirer.prompt([

        {
            name: "addTeamMember",
            type: "list",
            choices: ["Add a new team member", "Create a team", "Registration complete"]
        }
    ])
    
    if (buildTeam.addTeamMember === "Add a new team member"){
        return promptQuestions()
    } else if(buildTeam.addTeamMember === "Registration complete"){
        return renderHTML();
    }

}

promptQuestions();

//function to generate html file

renderHTML = function(){
    const htmlContent = render(newTeamMember);

    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, htmlContent);
    console.log("Succes, your team has been created!");
}
