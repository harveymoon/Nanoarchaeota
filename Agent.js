class Agent {
  constructor(startX, startY, genomeSequenceIn) {
    // console.log(genomeSequenceIn)
    this.Genes = genomeSequenceIn;
    this.loc = createVector(startX, startY);
    this.ploc = createVector(startX, startY-1);
    this.floc = createVector(startX,startY+1)
    this.Lloc = createVector(startX+1,startY)
    this.Rloc = createVector(startX-1,startY)

    this.farVisionDist = 15;
    this.farForward= createVector(startX,startY);
    this.farLeft = createVector(startX,startY);
    this.farRight = createVector(startX,startY);

    this.dir = 0;
    this.internalClock = 0;
    this.clockSpeed = 0.1;

    this.age = 0;
    this.health = random(98,101);

    this.responsiveness = 1;

    this.brains = [];
    this.InternalNeurons = [0, 0, 0];

    this.hasEaten = false

  

      // var Geneome = "f1351fe3";
      // var Geneome = "aea73b91"
      // var Geneome = "f1351fe3"
      // var Geneome = "9ccc8807"
      // var Geneome = "852ccfdd3"
      // var Geneome = "2304d598"

      // var Geneome = "bdad8217"
      // var Geneome = "aea73b91"
      // var Geneome = "3aab535d3 "
      // var Geneome = "15A4D97C";

      // console.log(hexN);

      for (var intI = 0; intI < genomeSequenceIn.length; intI++) {
        let synapse = new ABrain(genomeSequenceIn[intI]);
        this.brains.push(synapse);
      }
    }

    runBrain() {

      if(this.health<=0){
        return
      }

      for (let s in this.brains) {
        // console.log(this.brains[s])
        this.brains[s].RunSynapse(this);
      }
      this.age += 1;
      this.health -=.25;

    let v3 = p5.Vector.sub(this.loc, this.ploc); // find dif between last move
    this.dir =  v3.heading(); // find heading from last pos
      this.age += 1;



  //  if(DrawAgents){
    let colorN = '#' + this.Genes[0].substring(0, 3) 
    stroke(colorN)
    line(this.loc.x, this.loc.y, this.ploc.x, this.ploc.y) // history line
  //  }
    


    }

    moveMe(dirVec) {
      dirVec.limit(10);
      let posNext = p5.Vector.add(this.loc, dirVec);
      // console.log(posNext)
      // let pixThere = GetPixel(int(posNext.x),int(posNext.y), wallLayer) ;
      // let pixThere = 20;
      // console.log(pixThere)
      // if(pixThere>0){
      //   console.log("SOMTHING NOT BLANK")
      // }

      // let gx  = int((posNext.x/width)*100);
      // gx = constrain(gx ,0, worldGrid.length-1) 
      // let gy = int((posNext.y/height)*100)
      // gy = constrain(gy ,0, worldGrid.length-1) 

      // let gridPos = [gx,gy]
      // // let pxlFwrd = GetPixel(agentObj.floc.x, agentObj.floc.y, wallLayer)[0];


      let blockedNext = checkPixeltoWall(posNext)

      // let blockedNext = false
      // try{
      //   blockedNext = worldGrid[gridPos[0]][gridPos[1]]
      // }catch{
      //   console.log('bad loc')
      //   console.log(gridPos)
      //   console.log(worldGrid[gridPos[0]])
      //   console.log(worldGrid[gridPos[0]][gridPos[1]])
      // }
     

      // console.log(blockedNext)


     // let blockedNext = false

      if (posNext.x > width - 5) {
          dirVec.x = constrain(dirVec.x,-5,0);
          // blockedNext = true
          
        }

        if (posNext.x < 5) {
            dirVec.x = constrain(dirVec.x,0,5);
            // blockedNext = true
          }

          if (posNext.y > height - 5) {
          // dirVec.y = 0;
           dirVec.y = constrain(dirVec.y,-5,0);
           // blockedNext = true
            
         }
         if (posNext.y < 5) {
          // dirVec.y = 0;
           dirVec.y = constrain(dirVec.y,0,5);
           // blockedNext = true
            
         }

         if (blockedNext == false) {

        this.loc.add(dirVec); // add movement to location

      }
    }

    MoveForward(ammt){
      let dirVec = p5.Vector.sub(this.floc, this.loc)
      this.moveMe(dirVec)
    }



  }
  