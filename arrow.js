// const square = function (x) {
//     return x*x
// }

// const square = (x) => {
//     return x * x
// }

// const square = (x) => x*x;

// console.log(square(3,3))

// const event = {
//     name: 'B-day',
//     guestList: ['Mike', 'Bike'],
//     printGuestList () {
//         console.log("Guest list for " + this.name);

//         this.guestList.forEach((guest) => {
//             console.log(guest + " is attending " + this.name)
//         });
//     }
// }

// event.printGuestList()



const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    getTaskToDo () {
        return this.tasks.filter((task) => (task.completed === false))
    }
}

console.log(tasks.getTaskToDo())
