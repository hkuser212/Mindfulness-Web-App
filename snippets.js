const decreaseBtn = document.getElementById("decreaseBtn"); // counter program
const reset = document.getElementById("resetBtn");
const IncreaseBtn = document.getElementById("IncreaseBtn");
const countlabel = document.getElementById("countlabel");
let count = 0;

IncreaseBtn.onclick = function(){
  count++;
  countlabel.textContent = count;
}
decreaseBtn.onclick = function(){
  count--;
  countlabel.textContent = count;
}
resetBtn.onclick = function(){
  count=0;
  countlabel.textContent = count;
}


const countlabel= document.getElementById("countlabel");// random number gen
const mylabel = document.getElementById("mylabel");
const min = 1;
const max = 6;
let randomNum;
countlabel.onClick = function(){
   randomNum = Math.floor(Math.random() * max)+min;
   mylabel.textContent = randomNum;
}


const mycheckbox = document.getElementById("mycheckbox");// checking payment by if else conditons 
const visabtn = document.getElementById("visabtn");
const mastercard = document.getElementById("mastercard");
const paypalbtn = document.getElementById("paypalbtn");
const mysubmit = document.getElementById("mysubmit");
const subResult = document.getElementById("subResult");
const paymentResult = document.getElementById("paymentResult");
mysubmit.onclick = function(){
  if(mycheckbox.checked){
    subResult.textContent = 'You are subscribed';
  }
  else{
    subResult.textContent = 'no'
  }








// temp conversion
const textBox = document.getElementById
const tofahrenit = document.getElementById
const to celcius = document.getElementById
let temp;

function convert(){
if(tofahrenit.checked){
temp = Number(textBox.value);
temp = temp *9/5 +32;
result.textContent = temp.toFixed(1) + "F"
}
else if(tocelsius.checked){

}
else{
  r




numbers = [1,2,4,5,5] //forEach method used to iterate over the elments of an array and aply a specified function(callback) to each element.

numbers.forEach(triple)
numbers.forEach(display);

function double(element, index, array){
array[index] = element *2;
}

function triple(element, index,array){
array[index] = element *3;


function capitalize(element, index, array){
array[index]= element.charAt(0).toUpperCase() + element.slice(1)

output apple to Apple



// map() = accepts a callback and applies that function to eech elemt of an array, then return an new array.

const numbers = [1,2,3,4,5]

const squares = numbers.map(squrare);


function square(element){
return Math.pow(element, 2)


/filter() = creates a new array by filterin out elements

let numbers = [1,2,4,5,6,7,8];
let evenNumbs = numbers.filter(isEven);
console.log(evenNums);
function isEven(element){
return element % 2 == 0;

it filters output of even numbers and returns (2,4,6,8);


const ages = [16,17,18,19,20,60];

const adults = ages.filter(isAdult);

console.log(adults);
function isAdult(element){
return element >=18;
}




setTimeout(function(){
console.lof(hello);
}, 3000);

output hello after 3 seconds


const  num  = 1,2,3,4,5,6;
// function expressions
const squares = numbers.map(function(element){
return Math.pow(element, 2);
});

console.log(squares);

const cube = numbers.map(function(element){
return Math.pow(element,3);
});

const evenNums = numbers.filters(function(element){
return element % 2 == 0;
});



//Arrow functions 

const hello = (name,age) => console.log('Hello ${name}')
                            console.log('Yow ar${age} old')};
hello("bro", 25);


const Numbers = [12,3,4,5,6];

const squares =numbers.map(  (element)=> Math.pow(element,2)))
const cubes =numbers.map((element)=> Math.pow(element,3));
const evennMS = numbers.filter((element)=>element %2 ===0):


consol.log(sqaures);

//object  - A collecion of related properties and or methos. can repersernt real world objects(people,products,places) object = {key:value,fuction()};


const person ={
firstName = "bob",
last name: "names",
age:30,
isEmployed: true,
}

console.log(person,firstName);
console.log(person,last Name);
console.log(person, age);

//Constructor 

function Car(make,model,year,color){
this.make = make,
this.model = model,
this.year = year,
this.color = color
}

const carl = new Car("ford","Mustang",224,"red");

console.log(car1.make);
console.log(car1.model);
console.log(car1.year);
output ford, mustang,224

//classes

class Product{
constructor(name,price){
this.name = name;
this.price = price
}

displayProduct(){
console.log('product :$(this.name)');


}

const product1 = new product("shirt",19.99);

product2.displayProdcut();


// super keyword uses
class Animal{
onstructor(name,age,runspeed)
super();{
this.name = name;
this.age = age;
}
}

class Rabbit extends Animal{
constructor(name,age,runspeed)
super(name,age);{

this.runspeed = runspeed;


}


class fish extends Animal{

constructor(name,age,Swimspeed)
super(name,age);{

this.runspeed = swimspeed;


}
class Hawk extends Animal{

constructor(name,age,Swimspeed){
;
this.runspeed = flyspeed;
}
}

const rabbit = new Rabbit('rabbit',1,25);

const fish = new Fish('fish,2,12);

console.log(rabbit.name);
console.log(rabbit.age);


destructring- extracts vales form arrays and pbjects, then assign them to variable in a convient way.

// swap 2 eleemtns


const colors = red,green,blue,black,white

[colors[0],colors[4] = [colors[4],colors[0]];
console.log(colors);


const person1 = {

fistname:'spongebod',
lastnam :'sp;
age:30
job:'frycook;
}
const person2 = {

fistname:'spongebod',
lastnam :'sp;
age:34
}

const{firstname,lastname,age,job="unemployed"} = person2;

console.log(firstname);
console.log(lastname);


//nested objects

const person = {
    fistname:'spongebod',
lastnam :'sp,
age:30,
job:'frycook,
address:{
    city:'nt',
    country:'us'

}
}

class PERSON{
    constructor(NAME,AGE,...rest){
        this.name = name;
        this.age = age;
        this.address = new Adresss(...rest);
    }

}
const person1 = new person('spongebod',30,'nt','us');

const person2  = new person('spongebod',34,'nt','us');

console.log(person1.name);
console.log(person1.age);
console.log(person1.address.city);
console.log(person1.address.country);
 

const fruit = [{
    name:'apple',color:'red',size:'large',},
    {
        name:'banana',color:'yellow',size:'large',},
    {
        name:'orange',color:'orange',size:'large',},
    {
        name:'grape',color:'purple',size:'large',}];

    console.log(fruit[0].name);
    fruit.push({name:'mango',color:'yellow',size:'large',});
    console.log(fruit[4].name);
    fruit.pop();
    console.log(fruit[3].name);
    fruit.unshift({name:'kiwi',color:'green',size:'large',});
    console.log(fruit[0].name);
    fruit.shift();
    console.log(fruit[0].name);
fruit.forEach(fruit => console.log(fruit.calories));

const fruitNames =  fruit.map(fruit => fruit.name);

console.log(fruitNames);

const yellowfuris = fruit.filter(fruit => fruit.color === 'yellow');
console.log(yellowfuris);

const longFruits = fruit.filter(fruit => fruit.size === 'large');
console.log(longFruits);

reduce
const maxFruits = fruit.reduce((acc,curr) => acc.size > curr.size ? acc : curr);

//sort()
let furits = [apple,banana,orange,grape,mango,kiwi];
furits.sort();


//shuffle an array

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;   

    // stopwatch program

    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const resetBtn = document.getElementById("resetBtn");
    const timeLabel = document.getElementById("timeLabel");
    let startTime, elapsedTime = 0;
    let timer;

    startBtn.addEventListener("click", function() {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            timeLabel.textContent = formatTime(elapsedTime);
        }, 10);
        startBtn.disabled = true;
    });

    stopBtn.addEventListener("click", function() {
        clearInterval(timer);
        startBtn.disabled = false;
    });

    resetBtn.addEventListener("click", function() {
        clearInterval(timer);
        elapsedTime = 0;
        timeLabel.textContent = "00:00:00";
        startBtn.disabled = false;vc
    });

    function formatTime(time) {


        // ASYNCHROHOUS --> allows multiple operations 
        to be peformed concurrentlt without waiting .Doesnt block the execution flow and allows the program to continue
        i.e I/O operations, net requests, etc.

        setTimeout(()=>console.log('hello'),1000);

        function func1(callback){
            setTimeout(()=>console.log('hello'),1000);
            callback()},3000);

        }
        function func2{
            console.log('hello');
            console.log('hello2');

        }
        func1(func2);