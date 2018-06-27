console.log("The javascript is loaded.");

// tomagotchi-mini-project

let gameRunning = false;
let lights = true;


// Tomagotchi Class
class Pet {
	constructor(name){
		this.name = name;
		this.age = 0;
		this.hunger = 10;
		this.energy = 10;
		this.happiness = 10;
	}
	cry(){
		console.log("**krreee** **krreee***");
	}
}

const createPet = () => {
	$(".create").hide();
	$(".sprite").remove();
	let name = prompt("What would you like to name your Tomagotchi?", "Pikachu");
	const pet = new Pet(name);
	addPetSprite(pet);
	createButtons(pet);
	createStatus(pet);
	calculateAge(pet);
	calculateHunger(pet);
	calculateEnergy(pet);
	calculateRest(pet);
	calculateHappiness(pet);
}

const addPetSprite = (pet) => {
	$petSprite = $("<div/>").addClass("sprite animation1");
	$(".home").append($petSprite);
	$(".sprite").css("margin-top", 0);
	$(".sprite").css("margin-left", 0);
	startPetAnimation(pet);
}

const startPetAnimation = (pet) => {
	let marginTop = 0;
	let marginLeft = 0;
	const petAnimation = 
		setInterval(function(){
			if(pet.hunger <= 0 || pet.energy <= 0 || pet.happiness <= 0){
					clearInterval(petAnimation);
					$(".sprite").css("opacity", 0.5);
					$(".status").hide();
					$(".interactions").hide();
					$(".end-game").hide();
					$(".instructions").hide();
					$(".game-module").hide();
					$petDeath = $("<h5/>").addClass("pet-death").text("Your pet has fainted.");
					$("#module").append($petDeath);
					$tryAgain = $("<button/>").addClass("try-again").text("Try Again");
					$("#module").append($tryAgain);
					$(".try-again").on("click", (event) => {
						location.reload(event);
					})
			} else {
				let randomNumTop = Math.floor((Math.random() * 21)-10);
				let randomNumLeft = Math.floor((Math.random() * 21)-10);
				
				marginTop += randomNumTop;
				marginTop = Math.max(-22, marginTop);
				marginTop = Math.min(66, marginTop);
	
					marginLeft += randomNumLeft;
					marginLeft = Math.max(-66, marginLeft);
					marginLeft = Math.min(66, marginLeft);
	
	
					$(".sprite").css("margin-top", (marginTop) + "%");
					$(".sprite").css("margin-left", (marginLeft) + "%");
					$(".sprite").toggleClass("animation2");
				}
		}, 500);
}

const createButtons = (pet) => {
	$petInteractions = $(".interactions");
	$petInteractions.append($("<button/>").addClass("feed").text("Feed me!"));
	$(".feed").on("click", () => {
		if(pet.hunger < 10){
			pet.hunger++;
			$(".hungerbar").css("width", (pet.hunger * 10) + "px");
		}
	});

	$petInteractions.append($("<button/>").addClass("lights").text("Turn off lights"));
	$(".lights").on("click", turnOffLights);

	const $gameSelections = $("<div/>").addClass("game-selections");
	$gameSelections.css("display","flex");
	$gameSelections.css("flex-direction","row");
	const $gameModule = $("<div/>").addClass("game-module");
	$module = $("#module");
	$petInteractions.append($("<button/>").addClass("play").text("Play with me!"));
	$(".play").on("click", playGame);
	$gameInteractions = $("<div/>").addClass("game-interactions");
	$("#module").append($gameInteractions);
	$gameInteractions.append($("<button/>").addClass("game-buttons end-game").text("End Game").hide());
	$(".end-game").on("click", endGame);
	$gameInteractions.append($("<button/>").addClass("game-buttons instructions").text("Show Instructions").hide());
	$(".instructions").on("click", displayInstructions);
	$module.append($gameModule);
	$gameModule.hide();
	$gameModule.append($("<h5/>").text("Choose one:"));
	$gameModule.append($gameSelections);
	$gameSelections.append($("<div/>").addClass("selection grass1"));
	$gameSelections.append($("<div/>").addClass("selection water1"));
	$gameSelections.append($("<div/>").addClass("selection fire1"));
}

const calculateAge = (pet) => {
	const ageMeter =
		setInterval(function(){
			pet.age++;
			if(pet.age === 1){
				$(".age-stat").text(pet.age + " minute");
			} else {
				$(".age-stat").text(pet.age + " minutes")
			}
			
		}, 60000);
}

const calculateHunger = (pet) => {
	const hungerMeter =
		setInterval(function(){
			if(pet.hunger > 0){
				pet.hunger--;
				$(".hungerbar").css("width", (pet.hunger * 10) + "px");
			}
		}, 10000);
}

const calculateHappiness = (pet) => {
	const happinessMeter =
		setInterval(function(){
			if(pet.happiness > 0){
				pet.happiness--;
				$(".happinessbar").css("width", (pet.happiness * 10) + "px");;
			}
		}, 30000);
}

const playGame = () => {
	$(".interactions").hide();
	$(".status").hide();
	$(".end-game").show();
	$(".instructions").show();
	$(".game-module").show();
	gameRunning = true;
	startSelectionAnimations();
}

const endGame = () => {
	$(".interactions").show();
	$(".status").show();
	$(".end-game").hide();
	$(".instructions").hide();
	$(".game-module").hide();
	clearInstructions();
	gameRunning = false;
}

const displayInstructions = () => {
	$(".case").append($("<ul/>").addClass("written-instructions"));
	$(".written-instructions").text("Instructions: Select one of 3 choices");
	$(".written-instructions").append($("<li/>").addClass("rule").text("Grass beats Water"));
	$(".written-instructions").append($("<li/>").addClass("rule").text("Water beats Fire"));
	$(".written-instructions").append($("<li/>").addClass("rule").text("Fire beats Grass"));
	$(".instructions").text("Hide Instructions");
	$(".instructions").off("click").on("click", clearInstructions);
}

const clearInstructions = () => {
	$(".written-instructions").remove();
	$(".instructions").text("Show Instructions");
	$(".instructions").off("click").on("click", displayInstructions);
}

const startSelectionAnimations = () => {
	startGrassAnimation();
	startWaterAnimation();
	startFireAnimation();
}

const startGrassAnimation = () => {
	const petAnimation = 
		setInterval(function(){
			if(gameRunning === true){
				$(".grass1").toggleClass("grass2");
			} else {
				clearInterval(petAnimation);
			}
		}, 250);
}

const startWaterAnimation = () => {
	const petAnimation = 
		setInterval(function(){
			if(gameRunning === true){
				$(".water1").toggleClass("water2");
			} else {
				clearInterval(petAnimation);
			}
		}, 250);
}

const startFireAnimation = () => {
	const petAnimation = 
		setInterval(function(){
			if(gameRunning === true){
				$(".fire1").toggleClass("fire2");
			} else {
				clearInterval(petAnimation);
			}
		}, 250);
}

const calculateEnergy = (pet) => {
	const energyMeter =
		setInterval(function(){
			if((pet.energy > 0) && (lights === true)){
			pet.energy--;
			}
			$(".energybar").css("width", (pet.energy * 10) + "px");
		}, 20000);
}

const calculateRest = (pet) => {
	const energyMeter =
		setInterval(function(){
			if((pet.energy < 10) && (lights === false)){
			pet.energy++;
			}
			$(".energybar").css("width", (pet.energy * 10) + "px");
		}, 2000);
}

const turnOffLights = () => {
	$(".home").css("background", "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(https://orig00.deviantart.net/a88f/f/2014/325/6/6/or_as_battle_background_1b_by_phoenixoflight92-d874gjl.png) no-repeat");
	$(".home").css("background-size", "cover");
	$(".sprite").css("opacity", 0.7);
	$(".lights").text("Turn on lights");
	$(".feed").hide();
	$(".play").hide();
	$(".lights").off("click").on("click", turnOnLights);
	lights = false;
}

const turnOnLights = () => {
	$(".home").css("background", "");
	$(".sprite").css("opacity", 1);
	$(".lights").text("Turn off lights");
	$(".feed").show();
	$(".play").show();
	$(".lights").off("click").on("click", turnOffLights);
	lights = true;
}

const createStatus = (pet) => {
	$status = $(".status");
	$status.css("background-color", "#f2f3f5");
	$status.css("border", "2px solid #bebbbb");
	$labelColumn = $("<div/>").addClass("label-column");
	$status.append($labelColumn);
	$labelColumn.append($("<div/>").addClass("name").text("Name: "));
	$labelColumn.append($("<div/>").addClass("age").text("Age: "));
	$labelColumn.append($("<div/>").addClass("hunger").text("Hunger: "));
	$labelColumn.append($("<div/>").addClass("energy").text("Energy: "));
	$labelColumn.append($("<div/>").addClass("happiness").text("Happiness: "));

	$statColumn = $("<div/>").addClass("stat-column");
	$status.append($statColumn);
	$statColumn.append($("<div/>").addClass("name-stat").text(pet.name));
	$statColumn.append($("<div/>").addClass("age-stat").text(pet.age + " minutes"));
	$statColumn.append($("<div/>").addClass("hunger-stat").text(""));
	createHungerBar(pet);
	$statColumn.append($("<div/>").addClass("energy-stat").text(""));
	createEnergyBar(pet);
	$statColumn.append($("<div/>").addClass("happiness-stat").text(""));
	createHappinessBar(pet);
}

const createHungerBar = (pet) => {
	$hungerBar = $("<div/>").addClass("hungerbar");
	$(".hunger-stat").append($hungerBar);
}

const createEnergyBar = (pet) => {
	$energyBar = $("<div/>").addClass("energybar");
	$(".energy-stat").append($energyBar);
}

const createHappinessBar = (pet) => {
	$happinessBar = $("<div/>").addClass("happinessbar");
	$(".happiness-stat").append($happinessBar);
}

$(".create").on("click", createPet);

// Game Controls
