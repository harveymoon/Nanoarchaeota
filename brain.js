var drawBrain = false;
class ABrain {
  constructor(brainGenes) {
    this.geneSet = brainGenes;
    this.GSequence = hex2bin(brainGenes);
      this.source_type = int(this.GSequence[0]); // input sensory or internal neuron source
      this.source_ID = this.GSequence.substring(1, 8); // specific neuron source id in binary
      this.source_ID = parseInt(this.source_ID, 2); // convert back to number
      this.sink_type = int(this.GSequence[8]); // trigger an internal neuron or an output action neuron
      this.sink_id = this.GSequence.substring(9, 16); // specific neuron source id in binary
      this.sink_id = parseInt(this.sink_id, 2); // convert back to number
      this.connection_weight = this.GSequence.substring(16, 32);
      this.connection_weight = parseInt(this.connection_weight, 2); // convert back to number
      this.connection_weight /= 10000;


      this.senses = [
      this.Sens_DCtr,
      this.Sens_Age,
      this.Sens_Rnd,
      this.Sens_Bl,
      this.Sens_Br,
      this.Sens_BLfd,
      this.Sens_BLlr,
      this.Sens_Bfd,
      this.Sens_Osc,
      this.Sens_LBf,
      this.Sens_Lx,
      this.Sens_Ly,
      this.Sens_BDx,
      this.Sens_BDy,
      this.Sens_BD,
      this.Sens_Sfd,
      this.Sens_Sl,
      this.Sens_Sr
      ];
      //this.Sens_Gen,
      // this.Sens_Plr,
      //      this.Sens_Pop,
      //      this.Sens_Pfd,
      //this.Sens_LPf,
      //      this.Sens_LMy,
        //    ,
       
      // this.Sens_Sg,

      this.source_ID = this.source_ID % this.senses.length;

      this.actions = [


      this.Act_OSC,

      this.Act_SG, // emit pherimone
      this.Act_Mfd,
      this.Act_Mrn,
      this.Act_Mrv,
      this.Act_MRL,
      this.Act_MX,
      this.Act_MY,
      ];

      //      this.Act_Kill,
       // this.Act_LPD,
      // this.Act_Res,
      //

      this.sink_id = this.sink_id % this.actions.length;

      // console.log("GSequence: " + this.GSequence);
      // console.log("source_type: " + this.source_type);
      // console.log("source_ID: " + this.source_ID);
      // console.log("sink_type: " + this.sink_type);
      // console.log("sink_id: " + this.sink_id);
      // console.log("connection_weight: " + this.connection_weight);
      // console.log("____")
    }

    RunSynapse(agentObj) {
      let sensVal = 0;
      if (this.source_type == 1) {
        // is an external sense
        sensVal = this.senses[this.source_ID](agentObj);
      } else {
        // is an internal neuron value
        sensVal = agentObj.InternalNeurons[this.source_ID % 3];
        // console.log("internal input");
      }

      sensVal *= this.connection_weight;
      // console.log("sensValue : " + sensVal);

      if (this.sink_type == 1) {
        // is an external action
        this.actions[this.sink_id](sensVal, agentObj);
      } else {
        // sink to internal neuron value
        let cval = agentObj.InternalNeurons[this.source_ID % 3];
        agentObj.InternalNeurons[this.source_ID % 3] = Math.tanh(
          (cval + sensVal) / 2
          );
        // console.log(
        //   "internal neuron : " + agentObj.InternalNeurons[this.source_ID % 3]
        // );
      }
      // console.log("+++");
      // this.actions[this.sink_id](sensVal);
    }

  //   Sens_Slr(agentObj) {
  //     // console.log("SENS : pheromone lr");
  //     let xNow = int(agentObj.loc.x);
  //     let yNow = int(agentObj.loc.y);
  
  //     let leftV = GetPixel(xNow - 5, yNow, pherimoneLayer)[0];
  //     let rightV = GetPixel(xNow + 5, yNow, pherimoneLayer)[0];
  
  //     // let leftV = pherimoneLayer.get(xNow - 5, yNow);
  //     // let rightV = pherimoneLayer.get(xNow + 5, yNow);
  
  //     // // console.log(leftV)
  //     // // console.log(rightV)
  
  //     let valOut = max(leftV, rightV); // darker regions have more pherimone , use darkest thing from either side
  //     valOut = map(valOut, 0, 255, -1, 1);
  //     return valOut;
  //     // pheromone gradient left-right
  //   }


  Sens_Sl(agentObj) {
    // console.log("SENS : pheromone gradient forward");
    let leftPh = getPherimoneAtPixel(agentObj.farLeft)

    let valOut = map(leftPh, 0, 100, -1, 1);
    return valOut;
  }


  Sens_Sr(agentObj) {
    // console.log("SENS : pheromone gradient forward");

    let rightPh = getPherimoneAtPixel(agentObj.farRight)

    let valOut = map(rightPh, 0, 100, -1, 1);
    return valOut;
  }

  
    Sens_Sfd(agentObj) {
      // console.log("SENS : pheromone gradient forward");

      let forwardPh = getPherimoneAtPixel(agentObj.farForward)

      let valOut = map(forwardPh, 0, 100, -1, 1);
      return valOut;
    }
    // Sens_Sg(agentObj) {
    //   // console.log("SENS : pheromone density");
    //   // pheromone density
    // }
    Sens_Age(agentObj) {
      // console.log("SENS : age");
      return map(agentObj.age, 0, maxCycles, -1, 1);
      // age
    }
    Sens_Rnd(agentObj) {
      // console.log("SENS : random");
      //
      return random(-1, 1);
    }

    Sens_BLlr(agentObj){
        /// sens blocked long left right
      noStroke()
      fill(0,0,200)

      let blockedL = checkPixeltoWall(agentObj.farLeft)

      // let gridPosL = [int((agentObj.farLeft.x/width)*100),int((agentObj.farLeft.y/height)*100)]
      // let blockedL = worldGrid[gridPosL[0]][gridPosL[1]]

      if(agentObj.farLeft.x<0 || agentObj.farLeft.x>width){
        blockedL = true

      }
      let blockedR = checkPixeltoWall(agentObj.farRight)
      if(agentObj.farRight.x<0 || agentObj.farRight.x>width){
        blockedR = true
      }

      let outVal = 0;
      if(blockedR == true && blockedL == false){
        outVal = -1
        if(drawBrain){
          rect(agentObj.farRight.x, agentObj.farRight.y, 2, 2)
          stroke(0,50)
          noFill()
          line(agentObj.loc.x, agentObj.loc.y, agentObj.farRight.x, agentObj.farRight.y)
        }


      }else if(blockedR == false && blockedL == true){
        outVal = 1
        if(drawBrain){
          rect(agentObj.farLeft.x, agentObj.farLeft.y, 2, 2)
          stroke(0,50)
          noFill()
          line(agentObj.loc.x, agentObj.loc.y, agentObj.farLeft.x, agentObj.farLeft.y)
        }
      }
      return(outVal)



    }

    Sens_Bl(agentObj) {
      // console.log("SENS : blocked left");

      // let gridPosL = [int((agentObj.Lloc.x/width)*100),int((agentObj.Lloc.y/height)*100)]
      // let blockedL = worldGrid[gridPosL[0]][gridPosL[1]]

       let blockedL = checkPixeltoWall(agentObj.Lloc)

      if(agentObj.Lloc.x<0 || agentObj.Lloc.x>width){
        blockedL = true
      }



      if(blockedL){
        return 1
      }else{
        return 0
      }

    }

    Sens_Br(agentObj) {
      // let gridPosR = [int((agentObj.Rloc.x/width)*100),int((agentObj.Rloc.y/height)*100)]
      // let blockedR = worldGrid[gridPosR[0]][gridPosR[1]]

      let blockedR = checkPixeltoWall(agentObj.Rloc)




      if(agentObj.Rloc.x<0 || agentObj.Rloc.x>width){
        blockedR = true
      }

      if(blockedR){
        return 1
      }else{
        return 0
      }

    }

    Sens_BLfd(agentObj){
       // console.log(agentObj.farForward)

      //  // far forward looking
      //  let gx  = int((agentObj.farForward.x/width)*100);
      //  gx = constrain(gx ,0, worldGrid.length-1) 
      //  let gy = int((agentObj.farForward.y/height)*100)
      //  gy = constrain(gy ,0, worldGrid.length-1) 

      //  let gridPos = [gx,gy]


      //  let blockedFwrd = false;

      //  try{
      //    blockedFwrd = worldGrid[gridPos[0]][gridPos[1]]

      //  }catch{
      //   console.log('bad loc')
      //   console.log(gridPos)
      //   console.log(worldGrid[gridPos[0]])
      //   console.log(worldGrid[gridPos[0]][gridPos[1]])
      // }

      let blockedFwrd = checkPixeltoWall(agentObj.farForward)

      // let pxlFwrd = GetPixel(agentObj.floc.x, agentObj.floc.y, wallLayer)[0];

      if (blockedFwrd==true) {


       if(drawBrain){
         fill(200,0,0)
       noStroke()
       rect(agentObj.farForward.x, agentObj.farForward.y, 2, 2) // far forward loc
       stroke(0,50)
       noFill()
       line(agentObj.loc.x, agentObj.loc.y, agentObj.farForward.x, agentObj.farForward.y)

       }
      

       return 1
     }
     return 0;

   }

   Sens_Bfd(agentObj) {
      // console.log("SENS : blocked forward");

      // let gridPos = [int((agentObj.floc.x/width)*100),int((agentObj.floc.y/height)*100)]

      // let gx  = int((agentObj.floc.x/width)*100);
      // gx = constrain(gx ,0, worldGrid.length) 
      // let gy = int((agentObj.floc.y/height)*100)
      // gy = constrain(gy ,0, worldGrid.length) 

      // let gridPos = [gx,gy]


      // // let pxlFwrd = GetPixel(agentObj.floc.x, agentObj.floc.y, wallLayer)[0];
      // let blockedFwrd = worldGrid[gridPos[0]][gridPos[1]]

      let blockedFwrd = checkPixeltoWall(agentObj.floc)
      


      if( agentObj.floc.x < 0 || agentObj.floc.x > width){
        blockedFwrd = true
      }

      if( agentObj.floc.y < 0 || agentObj.floc.y > height){
        blockedFwrd = true
      }

      if (blockedFwrd==true) {
       return 1
     }
     return 0;
      // blockage forward
    }
    Sens_Osc(agentObj) {
      // console.log("SENS : osculator");
      // oscillator
      agentObj.internalClock += agentObj.clockSpeed;
      return sin(this.internalClock);
    }
    Sens_Plr(agentObj) {
      // console.log("SENS : pop left right");
      // population left-right
    }
    Sens_Pop(agentObj) {
      // console.log("SENS : pop density nearby");
      return 0;
      // population density in near vacinity
    }
    Sens_Pfd(agentObj) {
      // console.log("SENS : pop gradient forward");
      return 0;
      // population gradient forward
    }
    Sens_LPf(agentObj) {
      // console.log("SENS : pop long-range forward");
      // population long-range forward
    }
    Sens_LMy(agentObj) {
      // console.log("SENS : last y movement");
      //last movement y
    }

    Sens_LBf(agentObj) {
      // console.log("SENS : last x movement");
      //last movement x
    }

    Sens_DCtr(agentObj){
      // distance from end
        let distN = dist(agentObj.loc.x, agentObj.loc.y, endzone[0], endzone[1] );
      return map(distN, 0, width, 0, 1);

    }

    Sens_Lx(agentObj) {
      // console.log("SENS : east west location");
      //east west world loc
      return map(agentObj.loc.x, 0, width, -1, 1);
    }
    Sens_Ly(agentObj) {
      // console.log("SENS : north south location");
      //north south world loc
      return map(agentObj.loc.y, 0, height, -1, 1);
    }
    Sens_BDx(agentObj) {
      // console.log("SENS : east west border distance");

      let nX = agentObj.loc.x;

      let minVal = 0;

      if (nX < width) {
        minVal = nX;
      } else {
        minVal = width - nX;
        minVal *= -1;
      }

      minVal = constrain(minVal, 0, 10);

      return minVal;

      //east west border distance
    }
    Sens_BDy(agentObj) {
      // console.log("SENS : north south border distance");
      //north south border distance
    }
    Sens_BD(agentObj) {
      // console.log("SENS : nearest border");

      let minVal = 10000;
      let nX = agentObj.loc.x;
      let nY = agentObj.loc.y;

      if (nX < width) {
        minVal = min(minVal, nX);
      } else {
        minVal = min(minVal, width - nX);
      }

      if (nY < height) {
        minVal = min(minVal, nY);
      } else {
        minVal = min(minVal, height - nY);
      }

      minVal = constrain(minVal, 0, width / 2);
      return map(minVal, 0, width / 2, 1, -1);

      //nearest border
    }
    Sens_Gen(agentObj) {
      // console.log("SENS : genetic sim to forward neighbor");
      //genetic similarity of fwd neighbor
    }

    Act_LPD(trigger, agentObj) {
      // console.log("ACT : set Long-Probe distance");
      // set long-probe distance
    }
    Act_Kill(trigger, agentObj) {
      // console.log("ACT : kill forward");
      // kill forward agent
    }
    Act_OSC(trigger, agentObj) {
      // console.log("ACT : set osculator");
      // set osculator
      agentObj.clockSpeed = trigger;
    }
    Act_SG(trigger, agentObj) {
      // console.log("ACT : emit pheromone");
      // emit pheromone
      let amt = constrain(abs(trigger), 0, .2);
      // console.log(amt)
      AddPherimoneAtPixel(agentObj.loc,  amt)
      // pherimoneLayer.fill(255, 0, 0, amt);
      // pherimoneLayer.ellipse(agentObj.loc.x, agentObj.loc.y, 2, 2);
    }
    Act_Res(trigger, agentObj) {
      // console.log("ACT : set responsiveness");
      //set responsiveness
      agentObj.responsiveness = abs(trigger);
    }
    Act_Mfd(trigger, agentObj) {
      // console.log("ACT : move forward");
    //   let amt = constrain(trigger, 0, 10);
      // // console.log(agentObj)
      agentObj.MoveForward( trigger);


      // agentObj.loc.x += amt;
      //move forward
    }
    Act_Mrn(trigger, agentObj) {
      // agentObj.loc.add(random(trigger), random(trigger))
      agentObj.moveMe(createVector(random(trigger), random(trigger)));
      // console.log("ACT : move random");
      //move random
    }
    Act_Mrv(trigger, agentObj) {
      // console.log("ACT : move reverse");
      agentObj.MoveForward( trigger);
      //move reverse
    }
    Act_MRL(trigger, agentObj) {
      // console.log("ACT : move lr");
      // agentObj.loc.x += trigger;
      agentObj.moveMe(createVector(trigger, 0));

      //move left-right
    }
    Act_MX(trigger, agentObj) {
      // console.log("ACT : move east west");
      agentObj.moveMe(createVector(trigger, 0));
      // move east west
    }
    Act_MY(trigger, agentObj) {
      // console.log("ACT : move north south");

      agentObj.moveMe(createVector(0, trigger));

      // move north south
    }
  }
  
  // const Coord NormalizedCoords[9] = {
  //     Coord(-1,-1), // SW
  //     Coord(0,-1),  // S
  //     Coord(1,-1),  // SE
  //     Coord(-1,0),  // W
  //     Coord(0,0),   // CENTER
  //     Coord(1,0),   // E
  //     Coord(-1,1),  // NW
  //     Coord(0,1),   // N
  //     Coord(1,1)    // NE
  // };
  