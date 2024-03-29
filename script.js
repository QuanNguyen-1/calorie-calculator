const entryBtn = document.getElementById("entry-btn");
const calculateBtn = document.getElementById("calculate-btn");
const clearBtn = document.getElementById("clear-btn");
const calorieBudget = document.getElementById("calorie-budget");
const caloriesCount = document.getElementById("calorie-count");
const entryType = document.getElementById("entry-type");
const results = document.getElementById("results");
let isErr = false;

//function to remove any non digits in input
const cleanStr = (input) => {
    const regex = /[+-\s]/;
    return input.replace(regex, "");
}

const isInvalid = (input) => {
    const regex = /\d+e\d+/i;
    return input.match(regex);
}

//add entry chosen from the select to the correct category
const addEntry = () =>{
    const targetContainer = document.querySelector(`#${entryType.value} .input-container`);
    const entryNum = targetContainer.querySelectorAll("input[type='text']").length + 1;
    targetContainer.innerHTML += `
        <div class="input">
            <span>
                <label for="${entryType.value}-${entryNum}-name">Entry ${entryNum} Name</label>
                <input id="${entryType.value}-${entryNum}-name" placeholder="name" type="text" />       
            </span>
            <span>
                <label for="${entryType.value}-${entryNum}-calories">Entry ${entryNum} Calories</label>
                <input id="${entryType.value}-${entryNum}-calories" placeholder="calories" type="number" min=0 />
            </span>
        </div>
    `;
}

//calculates and shows the calorie surplus or deficit
const calculateCalories = () =>{
    let isErr = false;
    const breakfast = caloriesSum(document.querySelectorAll(`#breakfast input[type="number"]`));
    const lunch = caloriesSum(document.querySelectorAll(`#lunch input[type="number"]`));
    const dinner = caloriesSum(document.querySelectorAll(`#dinner input[type="number"]`));
    const snacks = caloriesSum(document.querySelectorAll(`#snacks input[type="number"]`));
    const exercise = caloriesSum(document.querySelectorAll(`#exercise input[type="number"]`));
    const calorieLimit = cleanStr(calorieBudget.value);

    if (isInvalid(calorieLimit)) {
        alert(`Calorie Budget of ${isInvalid(calorieLimit)} is invalid`);
        isErr = true;
    }

    if (isErr){
        return;
    }

    const surplusOrDeficit = breakfast + lunch + dinner + snacks - exercise > calorieLimit? "Surplus" : "Deficit";
    const calorieDiff = Math.abs((breakfast + lunch + dinner + snacks - exercise) - calorieLimit);
    
    results.innerHTML = `
    <h3>Calorie ${surplusOrDeficit}: ${calorieDiff}</h3>
    <p>You are in a calorie ${surplusOrDeficit.toLowerCase()} of ${calorieDiff} calories.</p>
    <p>Your maintenance calories is ${calorieLimit}.</p>
    <p>You consumed ${breakfast + lunch + dinner + snacks} calories.</p>
    <p>You burned ${exercise} calories.</p>
    `;

    results.style.display = "block";


}
//calculates the total calories for a category
const caloriesSum = (list) =>{
    let sum = 0;
    for (const item of list){
        const currentValue = cleanStr(item.value);
        const invalid = isInvalid(currentValue);

        if (invalid){
            alert(`The input ${invalid[0]} is invalid`);
            isErr = true;
        } else {
            sum += Number(currentValue);
        }
    }
    return sum;
}
//clears all values and returns page to orignal form
const clear = () =>{
    results.style.display = "none";
    results.innerHTML = "";
    calorieBudget.value = "";
    entryType.value="breakfast";
    const inputs = document.querySelectorAll(".input-container");

    for (const item of inputs){
        item.innerHTML = "";
    }
}

entryBtn.addEventListener("click", addEntry);
clearBtn.addEventListener("click", clear);
calculateBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    calculateCalories();
})

