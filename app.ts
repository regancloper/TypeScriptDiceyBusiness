// create constant for number of die sides, an array to hold the dice, and a unique id for each die
const DIE_SIDES: number = 6;


// outlines Die class, which creates Die object
class Die {
    value!: number;
    div!: JQuery;

    static Corral: Die[] = [];

    static sumAll() {
        let alerttxt: string = "The sum of the current dice is ";
        let sumAllDice: number = 0;
        if (Die.Corral.length > 0) {
            sumAllDice = Die.Corral.reduce((tally, die) => tally += die.value, 0);
        }
        alert(`${alerttxt}${sumAllDice}!`);
    }

    constructor() {
        this.roll();
        this.addToScreen();
        this.addListeners();
        Die.Corral.push(this);
    }
    roll() {
        this.value = Math.floor(Math.random() * (DIE_SIDES) + 1);
    }
    reRoll() {
        this.roll();
        this.div.text(this.value);
    }
    deleteDie() {
        this.div.remove();
        let index: number = Die.Corral.indexOf(this);
        Die.Corral.splice(index, 1);
    }
    addToScreen() {
        this.div = $(`<div class="dice shadow">${this.value}</div>`);
        $('.die-container').append(this.div);
    }
    addListeners() {
        this.div.click(() => this.reRoll());
        this.div.dblclick(() => this.deleteDie());
    }
}

// click listener for "New Die" button
$('#generate').click(() => new Die());

// click listener for "Reroll" button
$('#reroll').click(() => Die.Corral.forEach((val: Die) => val.reRoll()));

// click listener for "Sum Dice" button
$('#sum').click(() => Die.sumAll());

