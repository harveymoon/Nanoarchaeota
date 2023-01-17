
var GetPixel;

// var occupiedLayer;

var AgentsArray = [];

let WinningTeam = [];

var NumAgents = 1000;
var numASlider;

var purgeButton;

var worldGrid = []


var maxCycles = 50000;
var numCycleSlider;
var drawCount = 0;

var chanceOfMutation = .95;
var mutatinAmmtSlider;

var numberOfGenes = 12;

var GenerationCounter = 0

// var fastestTime = 100000
// var fastestAgent = []

var longestLife = 0;
var healthiestAgents = []


var results = {}


var foodList = []


var survivorsLeft = 20;

let ATHLifeEver = 0;


let DrawAgents = false


// var GoodGenesGeneration = []



var mazeImg;
function preload() {
	mazeImg = loadImage("mazeImg.png");
}


function copyGene(inGene) {
	let gnes = inGene
	let gnesCopy = [];

	for (i = 0; i < gnes.length; i++) {
		gnesCopy[i] = gnes[i];
	}

	return gnesCopy
}





function makeFood() {

	foodList = []
	for (let fd = 0; fd < 15; fd++) {

		let sx = random(2, width - 2)
		let sy = random(2, height - 2)

		let startLoc = createVector(sx, sy)
		while (checkPixeltoWall(startLoc) == true) {
			sx = random(2, width - 2)
			sy = random(2, height - 2)
			startLoc = createVector(sx, sy)
		}
		let foodNow = new foodItem(startLoc)
		foodList.push(foodNow)
	}
}

function checkPixeltoWall(pixVector) {


	let gx = int((pixVector.x / width) * 100);
	gx = constrain(gx, 0, worldGrid.length - 1)
	let gy = int((pixVector.y / height) * 100)
	gy = constrain(gy, 0, worldGrid.length - 1)

	let gridPos = [gx, gy]

	let blockedNow = worldGrid[gridPos[0]][gridPos[1]]

	if (pixVector.x > width || pixVector.x < 0) {
		blockedNow = true
	}

	if (pixVector.y > height || pixVector.y < 0) {
		blockedNow = true
	}

	return blockedNow
}

function GetPixel(x, y, imgN) {
	imgN.loadPixels();
	let idx = 4 * (int(y) * imgN.width + int(x));
	let pxlR = imgN.pixels[idx];
	let pxlG = imgN.pixels[idx + 1];
	let pxlB = imgN.pixels[idx + 2];
	return [pxlR, pxlG, pxlB];
}

function MuttateGene(GeneIn) {
	let randPick = int(random(GeneIn.length));
	let digit = random(0, 4294967295);
	let newHex = hex(digit, 8).replace('.', '0')
	GeneIn[randPick] = newHex;
	let GeneOut = GeneIn

	return GeneOut;
}

// function pickWinners() {

// 	// picking winners
// 	console.log('picking winners at end of round')

// 	let totalAgents = AgentsArray.length











// 	// if(winningTeam.length>0){
// 	// 	let winningGenePool = []
// 	// 	for(WI in winningTeam){
// 	// 		let GeneInfo = copyGene(AgentsArray[winningTeam[WI]].Genes)
// 	// 		winningGenePool.push(GeneInfo)
// 	// 	}

// 	// 	noLoop();
// 	// 	setTimeout(function () {
// 	// 		repopulate( genes = winningGenePool);
// 	// 	}, 1 * 1000);
// 	// }else{
// 	// 	repopulate()
// 	// }

// }

function exportResults() {
	results.saveJSON('results');
}

function makeRandomGenome() {
	let Genome = []

	numberOfGenes = random(8, 32)

	for (let b = 0; b < numberOfGenes; b++) {
		let digit = random(0, 4294967295);
		Genome.push(hex(digit, 8).replace('.', '0'));
	}

	return Genome
}

function FindEmptySpot(xpos, ypos) {

}


function repopulate(genes = []) {
	background(20)
	makeFood()

	console.log("===============================")
	console.log('Repopulate')
	// console.log(genes)
	console.log("Generation: " + GenerationCounter)
	console.log("winners : " + genes.length)
	let percent = (genes.length / NumAgents) * 100
	console.log("Percent : " + percent)
	console.log('DrawCount : ' + drawCount)

	results['g' + str(GenerationCounter)] = {
		"Generation": GenerationCounter,
		"Total Winners": genes.length,
		"Winners ": genes,
		// "FastestAgent": fastestAgent
		"Healtiest": healthiestAgents
	}

	// if(percent>30){
	// 	maxCycles-=5 
	// 	console.log("Reducing max cycles to : " + maxCycles)
	// }
	// if(percent<=5){
	// 	maxCycles+=500
	// 	console.log("Incresing max cycles to : " + maxCycles)
	// }



	FastestDiv.html(healthiestAgents[0]);


	NumAgents = numASlider.value()
	// maxCycles =  numCycleSlider.value()


	chanceOfMutation = mutatinAmmtSlider.value()


	// fastestTime

	if (healthiestAgents.length > 0) {
		console.log("healthiest one:")
		console.log(longestLife)
		console.log(healthiestAgents)
		// genes.push(healthiestAgents)
	}




	if (genes.length == 0) {
		console.log('no genes, random new population')
	}




	GenerationCounter += 1
	loop();
	let currentQuant = AgentsArray.length;
	AgentsArray = [];

	while (AgentsArray.length < NumAgents) {
		let Genome = genes[int(random(genes.length))]; // random gene from one of the selected inputs

		if (genes.length == 0) { // or if we didn't provide any
			Genome = makeRandomGenome() // use a random gene from scratch
		}
		if (genes.length == 1 && random() > .2) { // if we only have one gene to use, 
			Genome = makeRandomGenome() // use a random gene from scratch
		}
		if (genes.length != 0) {
			if (random() < chanceOfMutation) {
				Genome = MuttateGene(copyGene(Genome));
				// console.log("Mutation happened");
			}
			if (random() < chanceOfMutation / 2) {
				Genome = MuttateGene(copyGene(Genome));
				// console.log("Mutation happened");
			}

			if (random() < chanceOfMutation / 4) {
				Genome = MuttateGene(copyGene(Genome));
				// console.log("Mutation happened");
			}
			if (random() < chanceOfMutation / 6) {
				Genome = MuttateGene(copyGene(Genome));
				// console.log("Mutation happened");
			}

		}


		let sx = random(2, width - 2)
		let sy = random(2, height - 2)

		let startLoc = createVector(sx, sy)
		while (checkPixeltoWall(startLoc) == true) {
			sx = random(2, width - 2)
			sy = random(2, height - 2)
			startLoc = createVector(sx, sy)
		}


		// if(loc.length== 2){
		// 	sx = loc[0]+random(5)
		// 	sy = loc[1]+random(5)
		// }

		let agentN = new Agent(
			startLoc.x, startLoc.y,
			Genome
		);
		AgentsArray.push(agentN);
	}

	// for (let g in goodGenes) {
	// let Genome = goodGenes[g];
	// let randomNumChildren = int(random(15, 25));
	// for (let rr = 0; rr < randomNumChildren; rr++) {
	// }
}

// while (AgentsArray.length <= NumAgents) {
//   let Genome = [];

//   for (let b = 0; b < numberOfGenes; b++) {
//     let digit = random(10000, 50000000);
//     Genome.push(hex(digit, 8).replace('.', 'f'));
//   }
//   let agentN = new Agent(
//     random(wallLayer.width),
//     random(wallLayer.height),
//     Genome
//   );
//   AgentsArray.push(agentN);
// }

// while (AgentsArray.length > NumAgents) {
//   AgentsArray.splice(Math.floor(random() * AgentsArray.length), 1);
// }
// }

function hex2bin(hex) {
	let val = parseInt(hex, 16);
	// console.log(val)
	let binStr = val.toString(2);
	while (binStr.length < 32) {
		binStr = "0" + binStr;
	}
	return binStr;
}

function int2hex(bin) {
	return bin.toString(16);
}

// function mouseMoved(){


// 	 let gridPos = [int((mouseX/width)*100),int((mouseY/height)*100)]
//       // let pxlFwrd = GetPixel(agentObj.floc.x, agentObj.floc.y, wallLayer)[0];
//       let blockedNext = worldGrid[gridPos[0]][gridPos[1]]

// console.log(blockedNext)

// }


function setup() {

	let myStorage = window.localStorage;



	// frameRate(5)
	createCanvas(800, 800);
	background(20);
	FastestDiv = createDiv('NONE').position(820, 110);
	numASlider = createSlider(1, 10000, NumAgents);
	numASlider.position(820, 30);
	// create a label for the slider

	numALabel = createDiv('Number of Agents').position(820, 10);
	numALabel.position(820, 10)


	// numCycleSlider = createSlider(10,1000,maxCycles)
	// numCycleSlider.position(820,60)

	mutatinAmmtSlider = createSlider(0, .99, chanceOfMutation, .01)
	mutatinAmmtSlider.position(820, 90)

	// create a label for the slider
	mutatinAmmtLabel = createDiv('Mutation Amount').position(820, 70)
	mutatinAmmtLabel.position(820, 70)


	purgeButton = createButton("PURGE")
	purgeButton.position(820, 140);
	purgeButton.mousePressed(PURGE);


	// wallLayer = createGraphics(width / 4, height / 4);
	// occupiedLayer = createGraphics(width / 4, height / 4);


	// wallLayer.clear();
	// wallLayer.stroke(0);
	// wallLayer.strokeWeight(1)
	// wallLayer.fill(255);

	// wallLayer.rect(00, 20, 180, 10);


	// wallLayer.rect(30, 60, 200, 10);

	// wallLayer.rect(40, 60, 10, 50);

	// wallLayer.rect(160, 100, 50, 10);
	//


	mazeImg.loadPixels();

	for (let wc = 0; wc < 100; wc++) {
		worldGrid[wc] = []

		for (let wr = 0; wr < 100; wr++) {
			worldGrid[wc][wr] = false


			let xn = mazeImg.width * (wc / 100)
			let yn = mazeImg.height * (wr / 100)
			// let redH = mazeImg.get(xn,yn)[0]
			let redH = noise(xn / 50, yn / 50) * 300

			if (redH < 100) {
				worldGrid[wc][wr] = true
			}

			// if(wr >= 20 && wr < 30  && wc > 30&& wc < 90){
			// 	worldGrid[wc][wr] = true
			// }
		}
	}

	makeFood()


	// dropLoc = [width-130,height-130]


	let ATHTeam = [
	]

	if (myStorage) {
		ATHLifeEver = myStorage.drawCount;
		if (myStorage.healthiestEver) {
			ATHTeam.push(myStorage.healthiestEver.split(','))
		}

	}


	repopulate(genes = ATHTeam);

	// repopulate(loc =dropLoc)


	;//, genes = ATHTeam);
	// for (let gn = 0; gn < NumAgents; gn++) {
	//   let Genome = [];

	//   for (let b = 0; b < numberOfGenes; b++) {
	//     let digit = random(10000, 50000000);
	//     Genome.push(hex(digit, 8).replace('.', 'F'));
	//   }
	//   // random(wallLayer.width),random(wallLayer.height),
	//   let agentN = new Agent(
	//     190+random(5),190+random(5),
	//     Genome
	//   );
	//   AgentsArray.push(agentN);
	// }

	// console.log(hex2bin("f1351fe3"))

	//   for (var i = 0; i < 1000; i++) {

	//     let valN = hex2bin(hexN);
	//     console.log(valN[0]);
	//     console.log(valN);
	//     console.log("----");
	//   }
}

function runAgents() {
	background(20, 10);
	let numAgentsLeft = 0


	for (agentI in AgentsArray) {
		let agentN = AgentsArray[agentI];
		agentN.ploc.set(agentN.loc.x, agentN.loc.y)  // set previous to current location


		if (agentN.health > 0) {
			numAgentsLeft++;

			agentN.runBrain();

			agentN.floc = p5.Vector.fromAngle(agentN.dir, 3);
			agentN.floc.add(agentN.loc)

			agentN.Lloc = p5.Vector.fromAngle(agentN.dir + PI / 2, 3)
			agentN.Lloc.add(agentN.loc)
			agentN.Rloc = p5.Vector.fromAngle(agentN.dir - PI / 2, 3)
			agentN.Rloc.add(agentN.loc)


			agentN.farForward = p5.Vector.fromAngle(agentN.dir, 30);
			agentN.farForward.add(agentN.loc)

			agentN.farLeft = p5.Vector.fromAngle(agentN.dir + (PI / 4), 30);
			agentN.farLeft.add(agentN.loc)

			agentN.farRight = p5.Vector.fromAngle(agentN.dir - (PI / 4), 30);
			agentN.farRight.add(agentN.loc)

		} else {
			// remove agent
			AgentsArray.splice(agentI, 1)
		}
	}
	return numAgentsLeft
}


function draw() {


	let s = width / 100;

	DrawAgents = false
	if (drawCount > 180) {
		DrawAgents = true;
		for (var cc = 0; cc < worldGrid.length; cc++) {
			for (var rr = 0; rr < worldGrid.length; rr++) {

				if (worldGrid[cc][rr] == true) {
					noStroke()
					fill(0, 120, 120, 180)
					rect(cc * s, rr * s, s, s)
				}

			}
		}
	}

	if (DrawAgents == false) {
		for (let i = 0; i < 20; i++) {
			let numAgentsLeft = runAgents()
			drawCount++;
		}
	} else {

	}
	let numAgentsLeft = runAgents()
	drawCount++;


	if (numAgentsLeft < 200) {

		// add new agent
		let Genome = [];

		for (let b = 0; b < numberOfGenes; b++) {
			let digit = random(10000, 50000000);
			Genome.push(hex(digit, 8).replace('.', 'F'));
		}
		// random(wallLayer.width),random(wallLayer.height),
		let agentN = new Agent(
			random(wallLayer.width), random(wallLayer.height),
			Genome
		);
		AgentsArray.push(agentN);

	}

	// if (numAgentsLeft < survivorsLeft) {
	// 	console.log("20 Left")
	// 	PURGE()
	// }


	// if (drawCount > maxCycles) {
	// 	console.log("Timer Expired, repop")
	// 	PURGE()
	// }

	// noFill()
	// stroke(0)
	// ellipse(endzone[0], endzone[1], endzone[2]*2, endzone[2]*2)   

	stroke(0, 200, 255)
	strokeWeight(2)
	let progress = map(drawCount, 0, maxCycles, 0, width)
	line(0, 2, progress, 2);

	for (f in foodList) {
		foodList[f].drawFoodItem();
	}

}


function PURGE() {

	print('PURGE')

	ATHLifeEver = window.localStorage.drawCount;


	let winningGenePool = []

	let HealthiestThisRound = -1;
	let HighestHealthThisRound = 0;

	for (agentI in AgentsArray) {
		let agentN = AgentsArray[agentI];
		if (agentN.health > 0 && agentN.hasEaten) {

			if (HighestHealthThisRound < agentN.health) {
				HighestHealthThisRound = agentN.health
				HealthiestThisRound = agentI
			}

			WinningTeam.push(agentI)
		}
	}



	if (longestLife < drawCount && HealthiestThisRound != -1) {
		longestLife = drawCount;
		print("New Longest Life! : " + drawCount)
		healthiestAgents[0] = copyGene(AgentsArray[HealthiestThisRound].Genes)
		// print(healthiestAgents)
		if (drawCount > ATHLifeEver) { // faster then anything we ever found before on any tab.
			ATHLifeEver = drawCount
			print("NEW ATH !!!!!!!!")
			localStorage.setItem('healthiestEver', healthiestAgents);
			localStorage.setItem('drawCount', drawCount)
		}

	}

	if (healthiestAgents.length > 0) {
		let HGNE = healthiestAgents[0]
		winningGenePool.push(HGNE)
	}

	if (window.localStorage.healthiestEver != undefined) {
		winningGenePool.push(window.localStorage.healthiestEver.split(','))

		print(WinningTeam.length)
	}




	for (WI in WinningTeam) {
		let repeats = AgentsArray[WinningTeam[WI]].health
		let GNE = copyGene(AgentsArray[WinningTeam[WI]].Genes)
		for (let h = 0; h < repeats; h++) {
			winningGenePool.push(GNE)
		}

	}

	repopulate(genes = winningGenePool)
	winningGenePool = []
	WinningTeam = []

	drawCount = 0;


}


