
var GetPixel;
var pherimoneLayer = [];
// var occupiedLayer;

var AgentsArray = [];

var fastestWins = true

var NumAgents =1000;
var numASlider;

var purgeButton;

var worldGrid = []


var maxCycles = 50000;
var numCycleSlider;
var drawCount = 0;

var chanceOfMutation = .95;
var mutatinAmmtSlider;

var numberOfGenes = 24;

var GenerationCounter = 0

var fastestTime = 100000;
var fastestRound = 1000000;
var fastestAgent = []

var results = {}

let ATHTeam = [
	['5B69B4CA', '98BEA964', '3F42AF01', '4B62D2BC', 'CC74A507', '09EC3E0D', '72B90578', '0103A633', 'BE86DB0A', '18D8C693', '1DBFE43D', 'C8B2E3CA', '02B19338', '50730CD4', '09517414', '0151715E', 'E6FCD7E4', '0700938C', '0CCD2AD6', 'D49FBA8C', '21DEA829', '0CF5F858', 'EF3C1ED4', '090B97F1', 'C82DAF7A', '2A969B34', '2E724277', 'BC75C658', '0C8DAF5C', '94056C22', '751F7A5E'],
	["5B69B4CA","98BEA964","3F42AF01","4B62D2BC","CC74A507","09EC3E0D","72B90578","0103A633","02B23AD4","18D8C693","1DBFE43D","C8B2E3CA","02B19338","50730CD4","09517414","0151715E","E6FCD7E4","0700938C","0CCD2AD6","D49FBA8C","21DEA829","0CF5F858","EF3C1ED4","090B97F1","CB8CC7BE","2A969B34","2E724277","BC75C658","0C8DAF5C","94056C22","751F7A5E"],
	['8CBEE25D', '1458DADC', '0C78319F', '022DCFB6', '3CB7CAB2', '243CA3A8', '3FC29C8E', '03E5CEEE', '09CA048E', '4741DD9C', '1DBFE43D', 'F15554EE', '016D2596', 'BCFCE6CB', '64EC84C6', 'CBD14FF2', '1975B32A', '36DDB5E6', '7B65A4B2', 'F910B004', 'A971E6CE', '0CF5F858', '07047A38', '090B97F1', 'A7A0AC01', '2A969B34', '7984D139', 'BC75C658', '4BC4C788', '94056C22', '751F7A5E'],
	['932C588A', '98BEA964', '3F42AF01', '4B62D2BC', 'CC74A507', '5DEDB684', 'D0FBD0FC', 'D843371E', 'BC6D699C', '2755A328', '1DBFE43D', '22D248FC', '02B19338', '550D00EE', '09517414', '0151715E', 'E6FCD7E4', '36DDB5E6', '0CCD2AD6', 'D49FBA8C', '21DEA829', '0CF5F858', '18518974', '090B97F1', '853B0D42', 'E480C0DA', '879CD7CB', 'C902C848', '0C8DAF5C', '94056C22', '751F7A5E'],
	['70351608', '1458DADC', '9EAF2928', '4B62D2BC', 'CC74A507', '5DEDB684', '72B90578', 'D843371E', '0AB2E1EC', '4741DD9C', '1DBFE43D', 'C8B2E3CA', '016D2596', 'BCFCE6CB', '73E45415', '0151715E', '1975B32A', '36DDB5E6', 'EC320DE4', 'D49FBA8C', '21DEA829', '0CF5F858', '07047A38', '090B97F1', '853B0D42', '2A969B34', '7984D139', 'BC75C658', '0C8DAF5C', '94056C22', '751F7A5E'],
	['06E1860E', 'FC25CB1E', 'B7D92CD6', '4B62D2BC', '18537B3C', '09EC3E0D', '6CEE85E3', 'D843371E', '02B23AD4', '8BB27264', '1DBFE43D', '0ACBF598', '02B19338', 'D1DE016A', 'F9EABCC4', '06E243C2', '99996708', '0700938C', '0CADCCF6', 'D49FBA8C', '21DEA829', '0CF5F858', '07047A38', '68C748EE', 'AE001E7C', '0C6BADA8', '879CD7CB', 'BC75C658', '0C8DAF5C', '94056C22', '751F7A5E'],
	['E18ED652', '98BEA964', '3F42AF01', '4B62D2BC', 'CC74A507', '09EC3E0D', '72B90578', '0FAFDE24', '5B127028', '01EB977C', '1DBFE43D', 'F99AF472', '5AFF0204', '09E1CD96', '09517414', '4362B742', 'E6FCD7E4', 'B5E9196C', '038EE963', 'D49FBA8C', '21DEA829', '0CF5F858', 'A067F5D4', '090B97F1', '3AC1E26C', '983BA506', '4C4295CF', 'BC75C658', '0C8DAF5C', '94056C22', 'F584E0CA'],
	['22296E44', 'A41E0228', 'F9DB089E', '07BAA39B', '054E2115', 'F5CA8FDC', 'BCEEF4E6', '393B5584', '866D94B2', '1065C90C', '3B8CF15A', 'ED9762A6', '0598D3A4', '32072F8A', '0C76EABC', '4DE2CA62', '09595F13', '36C4066A', '038EE963', 'D49FBA8C', '85309C98', '0CF5F858', 'A546238E', '4BC8015E', '4B9836F6', '8B5CB90A', 'ADE7E85C', '7BA6C751', '0C8DAF5C', '6685D72F', '60B2D85E'],
['72552544', 'A41E0228', 'BCC4038C', 'E123E82F', '054E2115', '1A5C0244', 'BCEEF4E6', '4B1B27AA', '866D94B2', '314AADA4', 'C130633F', '93BF2E73', 'F5C6D25A', '0D3553DD', '0C76EABC', '0BBACA2D', '5964F295', '69F5FA6C', '038EE963', 'D49FBA8C', '85309C98', '0CF5F858', 'A546238E', '395A5DC8', '4B9836F6', '6D6C477C', 'ADE7E85C', '7BA6C751', '0C8DAF5C', '6685D72F', '60B2D85E'],
['22296E44', 'A41E0228', '1AA22CA8', 'E123E82F', '1B7B8B9A', '60833A47', '7C04FC0C', '393B5584', '866D94B2', '1065C90C', '55D0213E', '93BF2E73', '48CBB91C', '32072F8A', '0C76EABC', '0BBACA2D', '5964F295', 'EE0A6827', '038EE963', 'D49FBA8C', '85309C98', '0CF5F858', 'A546238E', '65765AE4', '4B9836F6', '6D6C477C', 'ADE7E85C', '02E1E16B', '0C8DAF5C', '6685D72F', '60B2D85E'],
['22296E44', 'A41E0228', '1AA22CA8', 'E123E82F', '1B7B8B9A', '60833A47', '7C04FC0C', '393B5584', '866D94B2', '1065C90C', '55D0213E', '93BF2E73', '48CBB91C', '32072F8A', '0C76EABC', '0BBACA2D', '5964F295', 'EE0A6827', '038EE963', 'D49FBA8C', '85309C98', '0CF5F858', 'A546238E', '65765AE4', '4B9836F6', '6D6C477C', 'ADE7E85C', '7BA6C751', '0C8DAF5C', '6685D72F', '60B2D85E']
	// ['0ADB1697', '1D21AA5C', 'B0FFBF98', '07CEFEDC', '4501E3E4', '8EB45938', '1A85B958', 'E1AB5C0C', '11EFC5CC', '0EF6B1B4', '085078D2', '65A3F9B2', 'A1BD482E', '02ABC5D2', '78979B62', 'CDBFFDD2', '6F3CAA07', '02DB624F', '1ABBE868', '5F73E782', 'A7CFFCE8', '0BABD86D', 'BC11C83C', 'E82F21F8'],
	// ['AE6EF3D8', 'F592EC42', '6359EFE3', '85CF421A', '3E8F257C', '05A38A08', '6CC744BF', '06B5650F', '66369818', '7F4CB8CC', '054DE918', 'CAF7A858', 'F8D791B8', '739245CE', '24455D6E', 'EF3EE408', '097740D2', '0EDD826C', '7A9BE18C', 'D1BDD89F', '7AED639A', '7A8BADCC', 'DC3E1338', '60CB4A14'],
	// ['D3577BD2', '0B6679E6', '2918EBE1', 'C814C34C', '0FBA7463', '23CDD766', 'E697797C', '836AE3C4', 'D63572FB', 'A5EFC364', '0F8FB413', '44B67714', '62CE9A7C', '388611A2', '19CE08CA', '3EA65214', '20BDE45E', '5A33AD28', 'EBC5E613', '08AFE13E', '707578CC', 'EFC1CC6C', 'D3F25108', '0EE6884C'],			
	// ['D3577BD2', '0B6679E6', '2918EBE1', 'C814C34C', '0FBA7463', '23CDD766', 'E697797C', '836AE3C4', 'D63572FB', 'A5EFC364', '0F8FB413', '36435E06', '62CE9A7C', '05AD875E', '149095A8', '95FD91E8', '20BDE45E', '5A33AD28', 'EBC5E613', '08AFE13E', '707578CC', 'EFC1CC6C', 'D3F25108', '0EE6884C'],
	// ['D3577BD2', '0B6679E6', '2918EBE1', 'C814C34C', '0FBA7463', '23CDD766', 'E697797C', '836AE3C4', 'D63572FB', 'A5EFC364', '0F8FB413', '36435E06', '62CE9A7C', '855B15D8', '149095A8', '2F454848', '20BDE45E', '06261A15', 'EBC5E613', '08AFE13E', '0146D411', 'EFC1CC6C', 'D3F25108', 'AA86C27E'],
	// ['D3577BD2', '0B6679E6', '2918EBE1', 'C814C34C', '0FBA7463', '23CDD766', 'E697797C', '836AE3C4', 'D63572FB', 'A5EFC364', '0F8FB413', '95BBEAC6', '62CE9A7C', '8AB1380E', '19CE08CA', '3EA65214', '20BDE45E', '5A33AD28', 'EBC5E613', '08AFE13E', '707578CC', '6F56558C', 'D3F25108', '0EE6884C'],
	// ['D3577BD2', 'BA3710FE', '2918EBE1', 'C814C34C', '66B409B8', '23CDD766', 'E697797C', '836AE3C4', 'D63572FB', 'A5EFC364', '0F8FB413', '36435E06', '62CE9A7C', '0728010A', '161B4541', '2F454848', '20BDE45E', '06261A15', 'EBC5E613', '7D9FA234', '819A91AE', 'BCB6E44A', '0D79F5C8', 'AA86C27E'],
	// ['0F854068', '1D21AA5C', 'B0FFBF98', '07CEFEDC', '4501E3E4', '8EB45938', '1A85B958', 'E1AB5C0C', '11EFC5CC', '0EF6B1B4', '085078D2', '65A3F9B2', 'A1BD482E', '02ABC5D2', '78979B62', 'CDBFFDD2', '6F3CAA07', '02DB624F', '1ABBE868', '5F73E782', 'A7CFFCE8', '0BABD86D', 'BC11C83C', 'E82F21F8'],
	// ['5DDCAD33', '1D21AA5C', 'B0FFBF98', '636A5FF8', 'E8C7AD88', '08A3E787', '1A85B958', '866E68A6', '11EFC5CC', '0EF6B1B4', 'D5A9BBEE', '65A3F9B2', '4AC595B6', '3E343DE6', '78979B62', 'CDBFFDD2', '6F3CAA07', '2FEBFB32', '1ABBE868', '5F73E782', 'A7CFFCE8', '0BABD86D', 'BC11C83C', 'E82F21F8'],
	// ['A9BAF364', '1D21AA5C', 'B0FFBF98', 'C997D8E8', '4501E3E4', '4ACF4344', '1A85B958', 'E1AB5C0C', '11EFC5CC', '0EF6B1B4', '085078D2', '65A3F9B2', 'A1BD482E', '02ABC5D2', '78979B62', '6EA5FB38', '6F3CAA07', '02DB624F', '1ABBE868', '5F73E782', 'A7CFFCE8', '0BABD86D', 'BC11C83C', 'E82F21F8'],
	// ['7C903FC3', '1D21AA5C', 'B0FFBF98', '07CEFEDC', '4501E3E4', '8EB45938', '1A85B958', '0F973B48', '11EFC5CC', '0EF6B1B4', '085078D2', '65A3F9B2', 'A1BD482E', '02ABC5D2', '78979B62', 'CDBFFDD2', '6F3CAA07', '02DB624F', '1ABBE868', '5F73E782', 'A7CFFCE8', '0BABD86D', 'BC11C83C', 'E82F21F8'],
	// ['E4D21788', '1D21AA5C', 'B0FFBF98', '8CD346FA', '4501E3E4', '8EB45938', '1A85B958', '031AF5D5', '11EFC5CC', '0EF6B1B4', '085078D2', '65A3F9B2', 'A1BD482E', '02ABC5D2', '78979B62', '344B1E41', '6F3CAA07', '02DB624F', '1ABBE868', '5F73E782', 'A7CFFCE8', '0BABD86D', 'BC11C83C', 'E82F21F8'],
	// ['0B2DD9AD', '0241FCDA', 'A58A71C3', '23BECAE8', '62B5E9C4', '20DBCB5A', '8CF78312', '05E5EBB8', '20C3F6D6', '5396FA8D', '4DC3F2A2', '62ABEA84', '23C5F064', '29446B4B', '4AA7F228', '59F7D8D7', 'B7EFD02C', '650BE119', '1ABBE868', 'F8DF41AF', '41BBEA16', 'E5433EBC', '65EBF97F', 'E82F21F8']
]



var endzone = [720,720,50]
var  dropLoc = [40,40]

// var endzone = [400,420,140]
// var  dropLoc = [450,120]

// var GoodGenesGeneration = []

var WinningTeam = []
var grid = [];
var MazeCols, MazeRows;

var w = 60;
let mazeBuild;
function makeGrid() {
	grid = [];
	// mazeBuild.clear();
	console.log("MAKE NEW MAZE");
  mazeBuild = createGraphics(500, 500);
  var current;
  var stack = [];
  MazeCols = floor(mazeBuild.width / w);
  MazeRows = floor(mazeBuild.height / w);


  for (var j = 0; j < MazeRows; j++) {
    for (var i = 0; i < MazeCols; i++) {
      var cell = new MazeCell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];

//   mazeBuild.background(90,0,0);
  mazeBuild.strokeWeight(20);
  let done = false;
  while (done == false) {
    current.visited = true;
    // current.highlight();
    // STEP 1
    var next = current.checkNeighbors();
    if (next) {
      next.visited = true;

      // STEP 2
      stack.push(current);

      // STEP 3
      removeWalls(current, next);

      // STEP 4
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }

    if (stack.length == 0) {
      done = true;
    }
  }
  console.log("DONE");

  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

//   save(mazeBuild); //, 0, 0);

  for(let wc = 0; wc < 100; wc++){
	worldGrid[wc] = []
	pherimoneLayer[wc] = []
	for(let wr = 0; wr < 100; wr++){
		worldGrid[wc][wr] = false
		pherimoneLayer[wc][wr] = 0
		
		// makeGrid
		let xn = mazeBuild.width * (wc/100)
		let yn = mazeBuild.height * (wr/100)
		let redH = mazeBuild.get(xn,yn)[0]
		
		if(redH > 100){
			worldGrid[wc][wr] = true
		}
		
		// if(wr >= 20 && wr < 30  && wc > 30&& wc < 90){
		// 	worldGrid[wc][wr] = true
		// }
	}
}




}

function index(i, j) {
  if (i < 0 || j < 0 || i > MazeCols - 1 || j > MazeRows - 1) {
    return -1;
  }
  return i + j * MazeCols;
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}


function copyGene(inGene){
	let gnes = inGene
	let	gnesCopy = [];
	
	for (i = 0; i < gnes.length; i++) {
		gnesCopy[i] = gnes[i];
	}
	
	return gnesCopy
}


function getPherimoneAtPixel(pixVector){
	
	let gx  = int((pixVector.x/width)*100);
	gx = constrain(gx ,0, worldGrid.length-1) 
	let gy = int((pixVector.y/height)*100)
	gy = constrain(gy ,0, worldGrid.length-1) 
	
	
	
	let PherimoneHere = pherimoneLayer[gx][gy]
	
	return PherimoneHere
}


function AddPherimoneAtPixel(pixVector, ammt){
	
	
	
	let gx  = int((pixVector.x/width)*100);
	gx = constrain(gx ,0, worldGrid.length-1) 
	let gy = int((pixVector.y/height)*100)
	gy = constrain(gy ,0, worldGrid.length-1) 
	
	
	pherimoneLayer[gx][gy] += ammt
	
	// console.log(pherimoneLayer[gx][gy])
	
	
}

function checkPixeltoWall(pixVector){
	
	
	let gx  = int((pixVector.x/width)*100);
	gx = constrain(gx ,0, worldGrid.length-1) 
	let gy = int((pixVector.y/height)*100)
	gy = constrain(gy ,0, worldGrid.length-1) 
	
	let gridPos = [gx,gy]
	
	let blockedNow = worldGrid[gridPos[0]][gridPos[1]]
	
	if(pixVector.x>width || pixVector.x < 0){
		blockedNow = true
	}
	
	if(pixVector.y>height || pixVector.y< 0){
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
	let digit = random(80000, 5000000);
	let newHex = hex(digit,8).replace('.', '0')
	GeneIn[randPick] = newHex;
	let GeneOut = GeneIn
	
	return GeneOut;
}

function pickWinners() {
	
	// picking winners
	console.log('picking winners at end of round')
	
	let totalAgents = AgentsArray.length
	let winningTeam = [];
	for (agentI in AgentsArray) {
		let agentN = AgentsArray[agentI];
		let distN = dist(agentN.loc.x, agentN.loc.y, endzone[0], endzone[1] );
		if (distN <= endzone[2]) {
			if(!winningTeam.includes(agentI)){
				winningTeam.push(agentI);
				// console.log(winningTeam.length)
			}
			
			agentN.inEndzone = true
			
			
		}else{
			agentN.inEndzone = false
		} 
	}
	
	
	
	if(winningTeam.length>0){
		let winningGenePool = []
		for(WI in winningTeam){
			let GeneInfo = copyGene(AgentsArray[winningTeam[WI]].Genes)
			winningGenePool.push(GeneInfo)
		}

		for(ATH in ATHTeam){
			let GeneInfo = copyGene(ATHTeam[ATH].Genes)
			winningGenePool.push(GeneInfo)
		}
		
		noLoop();
		setTimeout(function () {
			repopulate(loc =dropLoc, genes = winningGenePool);
		}, 1 * 1000);
	}else{
		repopulate(loc =dropLoc)
	}
	
}

function exportResults(){
	results.saveJSON('results');
}

function makeRandomGenome(){
	let Genome = []

	numberOfGenes = int(random(5,32));

	for (let b = 0; b < numberOfGenes; b++) {
		let digit = random(80000, 50000000);
		Genome.push(hex(digit, 8).replace('.', '0'));
	}
	
	return Genome
}



function AddOneAgent(inGenes){
	
	sx = dropLoc[0]+random(5)
	sy = dropLoc[1]+random(5)

let agentN = new Agent(
	sx,sy,
	inGenes
	);
	AgentsArray.push(agentN);
}



function repopulate(loc = [] , genes = []  ) {
	// makeGrid();
	background(20);

	fastestRound = 2000;
	
	console.log("===============================")
	console.log('Repopulate')
	
	console.log("Generation: " +GenerationCounter)
	console.log("winners : " + genes.length)
	let percent = (genes.length/NumAgents)*100
	console.log("Percent : " + percent)
	
	results['g'+str(GenerationCounter)] = {
		"Generation":GenerationCounter,
		"Total Winners":genes.length,
		"Winners ": genes,
		"FastestAgent": fastestAgent
	}
	
	if(percent>30){
		maxCycles-=5 
		console.log("Reducing max cycles to : " + maxCycles)
	}
	if(percent<=5){
		maxCycles+=500
		console.log("Incresing max cycles to : " + maxCycles)
	}

	for (var cc = 0; cc < worldGrid.length; cc++) {
		for (var rr = 0; rr < worldGrid.length; rr++) {
			pherimoneLayer[cc][rr] = 0
		}
	}
	
	// FastestDiv.html(results);
	
	
	NumAgents = numASlider.value()
	// maxCycles =  numCycleSlider.value()
	
	
	chanceOfMutation = mutatinAmmtSlider.value()
	
	
	// fastestTime
	
	if(fastestAgent.length>0){
		console.log("fastest agent:")
		console.log(fastestTime)
		console.log(fastestAgent)
		genes.push(fastestAgent)
	}
	
	
	if(genes.length == 0){
		console.log('no genes, random new population')
	}
	
	
	
	
	GenerationCounter+=1
	loop();
	let currentQuant = AgentsArray.length;
	AgentsArray = [];
	
	while(AgentsArray.length<NumAgents){
		let Genome = genes[int(random(genes.length))]; // random gene from one of the selected inputs
		
		if(genes.length == 0){ // or if we didn't provide any
			Genome = makeRandomGenome() // use a random gene from scratch
		}
		
		
		if(genes.length == 1 && random()>.2){ // if we only have one gene to use, 
			Genome = makeRandomGenome() // use a random gene from scratch
		}
		
		
		if(genes.length != 0){
			if (random() < chanceOfMutation) {
				Genome = MuttateGene(copyGene(Genome));
				// console.log("Mutation happened");
			}
			if (random() < chanceOfMutation/2) {
				Genome = MuttateGene(copyGene(Genome));
				// console.log("Mutation happened");
			}
			if (random() < chanceOfMutation/3) {
				Genome = MuttateGene(copyGene(Genome));
				// console.log("Mutation happened");
			}
			if (random() < chanceOfMutation/4) {
				Genome = MuttateGene(copyGene(Genome));
				// console.log("Mutation happened");
			}
		}
		
		
		
		let sx = random(2,width-2)
		let sy = random(2,height-2)
		if(loc.length== 2){
			sx = loc[0]+random(5)
			sy = loc[1]+random(5)
		}
		
		let agentN = new Agent(
			
			sx,sy,
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
	
	// numAgentsDiv
	function setup() {
		// frameRate(5)
		createCanvas(800, 800);
		background(20);
		FastestDiv = createDiv('NONE').position(820, 110);
		numAgentsDiv = createDiv('NONE').position(820, 180);
		fastestRoundDiv = createDiv('NONE').position(820, 200);
		drawCountDiv = createDiv('NONE').position(820, 220);
		winnersRoundDiv = createDiv('NONE').position(820, 240);

		

		numASlider = createSlider(1, 5000, NumAgents);
		numASlider.position(820, 30);
		
		// numCycleSlider = createSlider(10,1000,maxCycles)
		// numCycleSlider.position(820,60)
		
		mutatinAmmtSlider = createSlider(0,.99, chanceOfMutation, .01)
		mutatinAmmtSlider.position(820,90)
		
		purgeButton = createButton("PURGE")
		purgeButton.position(820, 140);
		purgeButton.mousePressed(PURGE);
		
		// pherimoneLayer = createGraphics(width / 4, height / 4);
		// wallLayer = createGraphics(width / 4, height / 4);
		// occupiedLayer = createGraphics(width / 4, height / 4);
		
		// pherimoneLayer.clear();
		// wallLayer.clear();
		// wallLayer.stroke(0);
		// wallLayer.strokeWeight(1)
		// wallLayer.fill(255);
		
		// wallLayer.rect(00, 20, 180, 10);
		
		
		// wallLayer.rect(30, 60, 200, 10);
		
		// wallLayer.rect(40, 60, 10, 50);
		
		// wallLayer.rect(160, 100, 50, 10);
		//
		
		
		// mazeImg.loadPixels();
		
		// for(let wc = 0; wc < 100; wc++){
		// 	worldGrid[wc] = []
		// 	// pherimoneLayer[wc] = []
		// 	for(let wr = 0; wr < 100; wr++){
		// 		worldGrid[wc][wr] = false
		// 		// pherimoneLayer[wc][wr] = 0
		// 		// makeGrid
		// 		let xn = mazeImg.width * (wc/100)
		// 		let yn = mazeImg.height * (wr/100)
		// 		let redH = mazeImg.get(xn,yn)[0]
				
		// 		if(redH < 100){
		// 			worldGrid[wc][wr] = true
		// 		}
				
		// 		// if(wr >= 20 && wr < 30  && wc > 30&& wc < 90){
		// 		// 	worldGrid[wc][wr] = true
		// 		// }
		// 	}
		// }
		
		makeGrid(); // does all the above and more
		
		// dropLoc = [width-130,height-130]
		
		
		
		
		let lastFastest = localStorage.getItem('fastestAgent');
		if(lastFastest!=null){
			JSON.parse(lastFastest)
			ATHTeam.push()
		}
		
		
		
		repopulate(loc =dropLoc, genes = ATHTeam);
		
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
	
	
	
	
	function draw() {
		background(20,10);
		// image(mazeBuild, 0, 0,width,height);
	
		let s = width/100;

		numAgentsDiv.html(AgentsArray.length);
		fastestRoundDiv.html(fastestRound)

		winnersRoundDiv.html(WinningTeam.length)
		drawCountDiv.html(drawCount)
		
		for (var cc = 0; cc < worldGrid.length; cc++) {
			for (var rr = 0; rr < worldGrid.length; rr++) {
				let phHere = pherimoneLayer[cc][rr]
				phHere =constrain(phHere, 0,255)
				// phHere = 0.1
				
				if(worldGrid[cc][rr] == true){
					noStroke()
					fill(0,120,120,180)
					rect(cc*s,rr*s, s,s)
				}
				if(phHere>0.0){
					// console.log(phHere)
					// pherimoneLayer[cc][cc] -=.01
					noStroke()
					fill(255,0,0, phHere)
					rect(cc*s,rr*s, s,s)
				}
				
			}
		}
		
		
		
		// image(mazeImg,0,0,width,height)
		
		// occupiedLayer.clear();
		for (agentI in AgentsArray) {
			let agentN = AgentsArray[agentI];
			agentN.ploc.set(agentN.loc.x, agentN.loc.y)  // set previous to current location
			
			
			
			if(agentN.alive == true){
				agentN.runBrain();
			}
			
			agentN.floc = p5.Vector.fromAngle(agentN.dir, 3);
			agentN.floc.add(agentN.loc)
			
			agentN.Lloc = p5.Vector.fromAngle(agentN.dir+PI/2, 3)
			agentN.Lloc.add(agentN.loc)
			agentN.Rloc = p5.Vector.fromAngle(agentN.dir-PI/2, 3)
			agentN.Rloc.add(agentN.loc)
			
			
			agentN.farForward = p5.Vector.fromAngle(agentN.dir, 30);
			agentN.farForward.add(agentN.loc)
			
			agentN.farLeft = p5.Vector.fromAngle(agentN.dir+(PI/4), 30);
			agentN.farLeft.add(agentN.loc)
			
			
			agentN.farRight = p5.Vector.fromAngle(agentN.dir-(PI/4), 30);
			agentN.farRight.add(agentN.loc)
			
			
			
			if(fastestWins){
				
				let distN = dist(agentN.loc.x, agentN.loc.y, endzone[0], endzone[1] );
				
				if (distN <= endzone[2]) {
					if(!WinningTeam.includes(agentI)){


						if(drawCount< fastestTime){
							fastestTime = drawCount;
							console.log("New Fastest Agent!! : "  + drawCount)
							
							// maxCycles = fastestTime*2
							// 
							
							
							// gnes = AgentsArray[agentI].Genes;
							// gnesCopy = [];
							
							// for (i = 0; i < gnes.length; i++) {
							//   gnesCopy[i] = gnes[i];
							// }
							
							
							fastestAgent = copyGene(AgentsArray[agentI].Genes);
							FastestDiv.html(fastestAgent);
							localStorage.setItem('fastestAgent', JSON.stringify(fastestAgent));


							
							console.log(fastestAgent)
						}
						
						if(WinningTeam.length==0){
							fastestAgent = copyGene(AgentsArray[agentI].Genes);
							localStorage.setItem('fastestAgent',JSON.stringify(fastestAgent));
							
						}

						if(AgentsArray[agentI].age < fastestRound ){
							fastestRound=AgentsArray[agentI].age 
							console.log("NEW FASTEST THIS ROUND")
							ATHTeam.push(copyGene(AgentsArray[agentI].Genes))
						}

						WinningTeam.push(copyGene(AgentsArray[agentI].Genes));
						agentN.alive = false;
						for(j = 0; j < 5; j++){
							AddOneAgent( copyGene(AgentsArray[agentI].Genes) )


							let TGenome = copyGene(AgentsArray[agentI].Genes)
							if (random() < chanceOfMutation) {
								TGenome = MuttateGene(TGenome);
								
								// console.log("Mutation happened");
							}



							if (random() < chanceOfMutation) {
								TGenome = MuttateGene(copyGene(TGenome));
								// console.log("Mutation happened");
							}
							if (random() < chanceOfMutation/2) {
								TGenome = MuttateGene(copyGene(TGenome));
								// console.log("Mutation happened");
							}
							if (random() < chanceOfMutation/3) {
								TGenome = MuttateGene(copyGene(TGenome));
								// console.log("Mutation happened");
							}
							if (random() < chanceOfMutation/4) {
								TGenome = MuttateGene(copyGene(TGenome));
								// console.log("Mutation happened");
							}
							AddOneAgent(TGenome )


						}
						
						
						
						
						// if(WinningTeam.length>25){
						// 	PURGE();
						// }
						
						// console.log(WinningTeam.length)
					}
					
					// stroke(200, 0, 0);
					// noFill()
					// ellipse(agentN.loc.x, agentN.loc.y, 25, 25);
				}
			}
			
			
			
			// occupiedLayer.fill(0, 0, 255);
			// occupiedLayer.noStroke();
			// occupiedLayer.ellipse(agentN.loc.x, agentN.loc.y, 2, 2);
			
			
			// stroke(0)
			// 
			
			// point(agentN.loc.x, agentN.loc.y)
			
			
			// fill(0,200,0)
			// noStroke()
			// rect(agentN.farForward.x, agentN.farForward.y, 2, 2) // far forward loc
			
			
			// fill(0,0,200)
			// noStroke()
			// rect(agentN.Lloc.x*4, agentN.Lloc.y*4, 2, 2)
			// rect(agentN.Rloc.x*4, agentN.Rloc.y*4, 2, 2)
			
			
			
			
			
			
			
		}

		for (let index = AgentsArray.length-1; index >0 ; index--) {
			if(AgentsArray[index].alive == false){
				AgentsArray.splice(index,1);
			}
		}
		if(AgentsArray.length < NumAgents){
			let switchN = int(random(0,3))

			if(drawCount>200 && WinningTeam.length == 0){
				switchN = 0;
			}

			if(WinningTeam.length>0){
				let TGenome = copyGene(WinningTeam[int(random(WinningTeam.length))])
				if (random() < chanceOfMutation) {
					TGenome = MuttateGene(copyGene(TGenome));
					// console.log("Mutation happened");
				}
				if (random() < chanceOfMutation/2) {
					TGenome = MuttateGene(copyGene(TGenome));
					// console.log("Mutation happened");
				}
				if (random() < chanceOfMutation/3) {
					TGenome = MuttateGene(copyGene(TGenome));
					// console.log("Mutation happened");
				}
				if (random() < chanceOfMutation/4) {
					TGenome = MuttateGene(copyGene(TGenome));
					// console.log("Mutation happened");
				}
				AddOneAgent(TGenome )
	
			}
			
			
			if(switchN == 0){
				AddOneAgent(makeRandomGenome());
			}else if(switchN ==1){
				if(WinningTeam.length >1){
					AddOneAgent(WinningTeam[int(random(WinningTeam.length))]);
				}
				
			}else if(switchN == 2){
				// AddOneAgent(fastestAgent);
				let TGenome = copyGene(fastestAgent)
				if (random() < chanceOfMutation) {
					TGenome = MuttateGene(copyGene(TGenome));
					// console.log("Mutation happened");
				}
				if (random() < chanceOfMutation/2) {
					TGenome = MuttateGene(copyGene(TGenome));
					// console.log("Mutation happened");
				}
				if (random() < chanceOfMutation/3) {
					TGenome = MuttateGene(copyGene(TGenome));
					// console.log("Mutation happened");
				}
				if (random() < chanceOfMutation/4) {
					TGenome = MuttateGene(copyGene(TGenome));
					// console.log("Mutation happened");
				}
				AddOneAgent(TGenome )

			}
			
		}
		
		drawCount++;
		// if (drawCount > maxCycles) {
		// 	console.log("Timer Expired, repop")
		// 	PURGE()
		// } 
		if(WinningTeam.length >150){
			console.log("max winners repop")
			PURGE();
		}
		
		noFill()
		stroke(0)
		ellipse(endzone[0], endzone[1], endzone[2]*2, endzone[2]*2)   
		
		stroke(0,200,255)
		strokeWeight(2)
		let progress = map(drawCount, 0, maxCycles, 0 , width)
		line(0,2,progress,2);
		
	}
	
	
	function PURGE(){
		makeGrid();
		
		if(!fastestWins){
			pickWinners();
		}else{
			let winningGenePool = []
			for(WI in WinningTeam){
				let GNE = WinningTeam[WI]
				winningGenePool.push(GNE)
				
			}
			
			repopulate(loc=dropLoc, genes =winningGenePool)
			winningGenePool=[]
			WinningTeam = []
		}
		
		
		drawCount = 0;
		// pherimoneLayer.clear();
		
	}
	
	
	