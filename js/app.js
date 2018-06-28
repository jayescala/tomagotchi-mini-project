console.log("Hello World!");

// tomagotchi-mini-project

// Controls
let petFaint = false;
let userChoice = 0;
let petChoice = 0;
let foodThrown = 0;
let lightsOn = true;
let gamesPlayed = 0;

// Classes
class Pet {
	constructor(name){
		this.name = name;
		this.age = 0;
		this.hunger = 100;
		this.energy = 100;
		this.happiness = 100;
	}
}

// Functions
const renderStartPage = () => {
	$(".side-displays").addClass("transparent");
	$(".windows").hide();
	$("#pet-sprite").hide();
	$("#pet-food").hide();
	startScreenAnimation();
	$("#pet-sprite").addClass("pikachu-animation-1");
	$("#grass-sprite").addClass("grass-animation-1");
	$("#water-sprite").addClass("water-animation-1");
	$("#fire-sprite").addClass("fire-animation-1");
	startPetAnimations();
	$("#start-button").on("click", renderPetNamePage)
}

const startScreenAnimation = () => {
	const startScreenAnimation = setInterval(function(){
		$("#start-screen").fadeToggle();
	}, 750);
}

const renderPetNamePage = () => {
	$("#start-screen").remove();
	$("#display").addClass("home");
	$("#notification-display").removeClass("transparent");
	$("#pet-name-notification-window").show();
	$("#start-button").off("click");
}

const createPet = (pet) => {
	calculateStatus(pet);
	$("#pet-sprite").fadeIn();
}

const calculateStatus = (pet) => {
	$("#menu-display").addClass("transparent");
	calculateAge(pet);
	calculateHunger(pet);
	calculateEnergy(pet);
	calculateRest(pet);
	calculateHappiness(pet);
	calculateFaint(pet);
}

const calculateAge = (pet) => {
	$("#age-value").text(pet.age + " minutes");
	const ageMeter = setInterval(function(){
		pet.age++;
		if(pet.age === 1){
			$("#age-value").text(pet.age + " minute");
		} else {
			$("#age-value").text(pet.age + " minutes");
		}
		if (petFaint === true) {
			clearInterval(ageMeter);
		}
	}, 60000);
}

const calculateHunger = (pet) => {
	const hungerMeter = setInterval(function(){
		if((pet.hunger < 100) && (lightsOn === true) && (foodThrown > 0)){
			pet.hunger += 10;
			pet.hunger = Math.min(100, pet.hunger);
			$("#hunger-statbar").css("width", (pet.hunger + "%"));
			foodThrown--;
		}
		if(pet.hunger > 0){
			pet.hunger--;
			$("#hunger-statbar").css("width", (pet.hunger + "%"));
		} else if(petFaint === true) {
			clearInterval(hungerMeter);
		}
	}, 1000);
}

const calculateHappiness = (pet) => {
	const happinessMeter = setInterval(function(){
		if((pet.happiness < 100) && (gamesPlayed > 0)){
			pet.happiness += 15;
			pet.happiness = Math.min(100, pet.happiness);
			$("#happiness-statbar").css("width", (pet.happiness + "%"));
			gamesPlayed--;
		}
		if(pet.happiness > 0){
			pet.happiness--;
			$("#happiness-statbar").css("width", (pet.happiness + "%"));
		}
		if(petFaint === true) {
			clearInterval(happinessMeter);
		}
	}, 2000);
}

const calculateEnergy = (pet) => {
	const energyMeter = setInterval(function(){
		if((pet.energy > 0) && (lightsOn === true)){
			pet.energy--;
			$("#energy-statbar").css("width", (pet.energy + "%"));
		}
		if(petFaint === true){
			clearInterval(energyMeter);
		}
	}, 3000);
}

const calculateRest = (pet) => {
	const energyMeter = setInterval(function(){
			if((pet.energy < 100) && (lightsOn === false)){
			pet.energy++;
			}
			if(petFaint === true) {
				clearInterval(energyMeter);
			}
			$("#energy-statbar").css("width", (pet.energy + "%"));
		}, 200);
}

const calculateFaint = (pet) => {
	const faintCheck = setInterval(function(){
		if((pet.hunger <= 0) || pet.energy <= 0 || pet.happiness <= 0){
			petFaint = true;
			$("#pet-sprite").addClass("fade");
			$("#display").addClass("dark-background");
			$("#pet-food").hide();
			$("#menu-display").addClass("transparent");
			$(".windows").hide();
			$("#faint-window").show();
			$("#notification-display").removeClass("transparent");
			$("#try-again-button").on("click", (event) => {
				location.reload(event);
			});
		}
	}, 1000);
}


const startPetAnimations = () => {
	let marginTop = 0;
	let marginRight = 0;

	const petAnimation = setInterval(function(){
		if(lightsOn === false || petFaint === true){
			clearInterval(petAnimation);
			$("#pet-sprite").removeClass("pikachu-animation-2");
		} else {
			let randomNumTop = (Math.floor(Math.random() * 22))-10;
			let randomNumRight = (Math.floor(Math.random() * 21))-10;

			marginTop += randomNumTop;
			marginTop = Math.max(-60, marginTop);
			marginTop = Math.min(125, marginTop);

			marginRight += randomNumRight;
			marginRight = Math.max(-125, marginRight);
			marginRight = Math.min(125, marginRight);

			$("#pet-sprite").css("margin-top", (marginTop) + "px");
			$("#pet-sprite").css("margin-right", (marginRight) + "px");
			$("#pet-sprite").toggleClass("pikachu-animation-2");
			$("#grass-sprite").toggleClass("grass-animation-2");
			$("#water-sprite").toggleClass("water-animation-2");
			$("#fire-sprite").toggleClass("fire-animation-2");

		}
	}, 500);
}

const showFood = () => {
	$("#pet-food").show();
	$("#a-button").on("click", throwFood);
	$("#down-button").on("click", hideFood);
}

const hideFood = () => {
	$("#pet-food").hide();
	$("#a-button").off("click");
	$("#up-button").off("click").on("click", showFood);
	$("#down-button").off("click");
}

const throwFood = () => {
	$("#pet-food").slideUp(500);
	$("#a-button").off("click");
	$("#up-button").off("click").on("click", showFood);
	$("#down-button").off("click");
	foodThrown++;

}

const hideMenuDisplay = () => {
	$("#menu-display").addClass("transparent");
	$("#select-button").off("click").on("click", showMenuDisplay);
}

const showMenuDisplay = () => {
	$("#menu-display").removeClass("transparent");
	$("#select-button").off("click").on("click", hideMenuDisplay);
}

const turnOffLights = () => {
	$("#display").addClass("dark-background");
	$("#pet-sprite").addClass("fade");
	lightsOn = false;
	$("#a-button").off("click");
	$("#up-button").off("click");
	$("#right-button").off("click");
	$("#pet-food").hide();
	$("#pet-food").addClass("transparent");
	$("#start-button").off("click").on("click", turnOnLights);
}

const turnOnLights = () => {
	$("#display").removeClass("dark-background");
	$("#pet-sprite").removeClass("fade");
	lightsOn = true;
	$("#a-button").off("click");
	$("#up-button").on("click", showFood);
	$("#right-button").on("click", startGame);
	$("#pet-food").hide();
	$("#pet-food").removeClass("transparent");
	startPetAnimations();
	$("#start-button").off("click").on("click", turnOffLights);
}

const startGame = () => {
	$("#notification-display").removeClass("transparent");
	$("#game-window").show();
	$("#right-button").off("click");
	$("#left-button").on("click", exitGame);
	$("#start-button").off("click");

}

const exitGame = () => {
	$("#notification-display").addClass("transparent");
	$("#game-window").hide();
	$("#game-results-window").hide();
	$("#left-button").off("click");
	$("#right-button").on("click", startGame);
	$("#start-button").on("click", turnOffLights);
}


const userChooseGrass = () => {
	$("#user-choice-sprite").addClass("grass-animation-1");
	$("#user-choice-label").text("Grass");
	return 1;
}

const userChooseWater = () => {
	$("#user-choice-sprite").addClass("water-animation-1");
	$("#user-choice-label").text("Water");
	return 2;
}

const userChooseFire = () => {
	$("#user-choice-sprite").addClass("fire-animation-1");
	$("#user-choice-label").text("Fire");
	return 3;
}

const petChooseGrass = () => {
	$("#pet-choice-sprite").addClass("grass-animation-1");
	$("#pet-choice-label").text("Grass");
	return 1;
}

const petChooseWater = () => {
	$("#pet-choice-sprite").addClass("water-animation-1");
	$("#pet-choice-label").text("Water");
	return 2;
}

const petChooseFire = () => {
	$("#pet-choice-sprite").addClass("fire-animation-1");
	$("#pet-choice-label").text("Fire");
	return 3;
}

const generatePetChoice = () => {
	const randomNum = Math.floor((Math.random() * 3)+1);
	if(randomNum === 1){
		petChoice = petChooseGrass();
	} else if(randomNum === 2){
		petChoice = petChooseWater();
	} else if(randomNum === 3){
		petChoice = petChooseFire();
	}
}

const calculateWinner = () => {
	if(userChoice === petChoice){
		$("#results").text("It was a draw!");
	} else if((userChoice === 1 && petChoice === 2) || (userChoice === 2 && petChoice === 3) || (userChoice === 3 && petChoice === 1)){
		$("#results").text("You won!");
	} else {
		$("#results").text("You lost!");
	}
}

const showResultsPage = () => {
	$("#game-window").hide();
	$("#game-results-window").show();
	if(userChoice === 1){
		userChoice = userChooseGrass();
	} else if(userChoice === 2){
		userChoice = userChooseWater();
	} else if(userChoice === 3){
		userChoice = userChooseFire();
	}
	gamesPlayed++;
	generatePetChoice();
	calculateWinner();
}

const removeSpriteClasses = () => {
	$("#user-choice-sprite").removeClass("grass-animation-1");
	$("#user-choice-sprite").removeClass("water-animation-1");
	$("#user-choice-sprite").removeClass("fire-animation-1");

	$("#pet-choice-sprite").removeClass("grass-animation-1");
	$("#pet-choice-sprite").removeClass("water-animation-1");
	$("#pet-choice-sprite").removeClass("fire-animation-1");
}

const setHomeButtons = () => {
	$("#select-button").on("click", hideMenuDisplay);
	$("#start-button").on("click", turnOffLights);
	$("#right-button").on("click", startGame);
	$("#up-button").on("click", showFood);

}
// Buttons

$("#pet-name-submit").on("click", (event) => {
	event.preventDefault();

	const petName = $("#pet-name-input").val();
	const pet = new Pet(petName);
	createPet(pet);
	$("#name-value").text(petName);
	$("#notification-display").addClass("transparent");
	$("#pet-name-notification-window").hide();
	$("#menu-display").removeClass("transparent");
	$("#status-window").show();
	setHomeButtons();
});

$("#grass-sprite").on("click", (event) => {
	userChoice = 1;
	showResultsPage();
});

$("#water-sprite").on("click", (event) => {
	userChoice = 2;
	showResultsPage();
});

$("#fire-sprite").on("click", (event) => {
	userChoice = 3;
	showResultsPage();
});

$("#results-button").on("click", (event) => {
	userChoice = 0;
	petChoice = 0;
	$("#game-results-window").hide();
	removeSpriteClasses();
	exitGame();
	startGame();
});

// Application Initializer
$(document).ready(renderStartPage);