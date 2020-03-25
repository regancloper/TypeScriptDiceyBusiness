// create constant for number of die sides, an array to hold the dice, and a unique id for each die
var DIE_SIDES = 6;
// outlines Die class, which creates Die object
var Die = /** @class */ (function () {
    function Die() {
        this.roll();
        this.addToScreen();
        this.addListeners();
        Die.Corral.push(this);
    }
    Die.sumAll = function () {
        var alerttxt = "The sum of the current dice is ";
        var sumAllDice = 0;
        if (Die.Corral.length > 0) {
            sumAllDice = Die.Corral.reduce(function (tally, die) { return tally += die.value; }, 0);
        }
        alert("" + alerttxt + sumAllDice + "!");
    };
    Die.prototype.roll = function () {
        this.value = Math.floor(Math.random() * (DIE_SIDES) + 1);
    };
    Die.prototype.reRoll = function () {
        this.roll();
        this.div.text(this.value);
    };
    Die.prototype.deleteDie = function () {
        this.div.remove();
        var index = Die.Corral.indexOf(this);
        Die.Corral.splice(index, 1);
    };
    Die.prototype.addToScreen = function () {
        this.div = $("<div class=\"dice shadow\">" + this.value + "</div>");
        $('.die-container').append(this.div);
    };
    Die.prototype.addListeners = function () {
        var _this = this;
        this.div.click(function () { return _this.reRoll(); });
        this.div.dblclick(function () { return _this.deleteDie(); });
    };
    Die.Corral = [];
    return Die;
}());
// click listener for "New Die" button
$('#generate').click(function () { return new Die(); });
// click listener for "Reroll" button
$('#reroll').click(function () { return Die.Corral.forEach(function (val) { return val.reRoll(); }); });
// click listener for "Sum Dice" button
$('#sum').click(function () { return Die.sumAll(); });
