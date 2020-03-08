const inflation = 1.025;
let annualIncome;
let currentSavings;
let savingsInPercentage;
let salaryIncrease;
let annualReturn;
let timeHorizon;
let savingsInPercentageLabel;
let salaryIncreaseLabel;
let annualReturnLabel;
let timeHorizonLabel;
let initialData;

function documentHasLoaded() {
    if(document.readyState === "complete") {
        annualIncome = document.getElementById("annual-income");
        currentSavings = document.getElementById("current-savings");
        savingsInPercentage = document.getElementById("savings-in-percentage");
        salaryIncrease = document.getElementById("salary-increase");
        annualReturn = document.getElementById("annual-return");
        timeHorizon = document.getElementById("time-horizon");
        savingsInPercentageLabel = document.getElementById("savings-in-percentage-label");
        salaryIncreaseLabel = document.getElementById("salary-increase-label");
        annualReturnLabel = document.getElementById("annual-return-label");
        timeHorizonLabel = document.getElementById("time-horizon-label");

        initialData = {
            annualIncome: annualIncome.value ? parseInt(annualIncome.value) : 100000,
            currentSavings: currentSavings.value ? parseInt(currentSavings.value) : 0,
            savingsInPercentage: parseInt(savingsInPercentage.value),
            salaryIncrease: parseInt(salaryIncrease.value),
            annualReturn: parseInt(annualReturn.value),
            timeHorizon: parseInt(timeHorizon.value)
        }
        savingsInPercentageLabel.innerText = initialData.savingsInPercentage + "%";
        salaryIncreaseLabel.innerText = initialData.salaryIncrease + "%";
        annualReturnLabel.innerText = initialData.annualReturn + "%";
        timeHorizonLabel.innerText = initialData.timeHorizon + " years";
        
        calculateValues(initialData);
    } else {
        setTimeout(() => documentHasLoaded(), 500);
    }
}

documentHasLoaded();

const calculateValues = (data) => {
    const { annualIncome, currentSavings, savingsInPercentage, salaryIncrease, annualReturn, timeHorizon } = data;
    
    const dataPoints = [
        {
            year: 0,
            data: 0 + currentSavings,
            onePercentMore: 0 + currentSavings,
            upToTwentyPercent: 0 + currentSavings
        }
    ];
    let total = currentSavings;
    let onePercentMore = currentSavings;
    let upToTwentyPercent = currentSavings;
    let salary = annualIncome;
    let adjustedAnnualReturn = (annualReturn / 100) + 1;
    let twentyPercentModifier = savingsInPercentage;
    
    for(let i=1; i<=timeHorizon; i++) {
        if(twentyPercentModifier < 20) {
            twentyPercentModifier += 1;
        }

        if(salaryIncrease > 0) {
            salary = salary * ((salaryIncrease / 100) + 1);
            total += (salary * (savingsInPercentage / 100)) * adjustedAnnualReturn * inflation;
            onePercentMore += (salary * ((savingsInPercentage + 1) / 100)) * adjustedAnnualReturn * inflation;
            upToTwentyPercent += (salary * ((twentyPercentModifier) / 100)) * adjustedAnnualReturn * inflation;
        } else {
            total += (annualIncome * (savingsInPercentage / 100)) * adjustedAnnualReturn * inflation;
            onePercentMore += (annualIncome * ((savingsInPercentage + 1) / 100)) * adjustedAnnualReturn * inflation;
            upToTwentyPercent += (annualIncome * ((twentyPercentModifier) / 100)) * adjustedAnnualReturn * inflation;
        }

        dataPoints.push(
            {
                year: i,
                data: total,
                onePercentMore: onePercentMore,
                upToTwentyPercent: upToTwentyPercent
            }
        );
    }

    drawChart(dataPoints);
}

const updateAnnualIncome = (value) => {
    if(value.match(/\.|\,/) ) {
        value = value.replace(".", "").replace(",", "");
    }
    initialData = {...initialData, annualIncome: value.length > 0 ? parseInt(value) : 100000 }

    calculateValues(initialData);
};

const updateCurrentSavings = (value) => {
    initialData = {...initialData, currentSavings: value.length > 0 ? parseInt(value) : 0 }

    calculateValues(initialData);
};

const updateSavingsInPercentage = (value) => {
    savingsInPercentageLabel.innerText = value + "%";
    
    initialData = {...initialData, savingsInPercentage: parseInt(value) }

    calculateValues(initialData);
};

const updateSalaryIncrease = (value) => {
    salaryIncreaseLabel.innerText = value + "%";
    
    initialData = {...initialData, salaryIncrease: parseInt(value) }

    calculateValues(initialData);
};

const updateAnnualReturn = (value) => {
    annualReturnLabel.innerText = value + "%";
    
    initialData = {...initialData, annualReturn: parseInt(value) }

    calculateValues(initialData);
};

const updateTimeHorizon = (value) => {
    timeHorizonLabel.innerText = value + " years";
    
    initialData = {...initialData, timeHorizon: parseInt(value) }

    calculateValues(initialData);
};