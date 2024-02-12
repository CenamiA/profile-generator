// TODO: Write code to define and export the Employee class

//initializing class employee
class Employee {
    constructor (name, id, email){
this.name = name;
this.id = id;
this.email = email;
    }

    //return name, letter format
getName(){
    return this.name
}

//return numeric id
getId(){
    return this.id
}

// return email address

getEmail(){
    return this.email
}

// return job position

getRole(){
    return "Employee";
}

}

module.exports = Employee;