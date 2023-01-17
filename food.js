function closestFood(lookPos) {
  let ItemPick = -1;
  let distMin = 1000;
  for (f in foodList) {
    if (foodList[f].quantity >= 0) {
      let fLoc = foodList[f].loc;
      let distHere = lookPos.dist(fLoc)
      if (distHere < distMin) {
        distMin = distHere;
        ItemPick = f
      }
    }

  }
  return ({ 'id': ItemPick, 'dist': distMin })
}


class foodItem {
  constructor(startVec) {
    this.loc = createVector(startVec.x, startVec.y)
    this.quantity = 10;
  }

  drawFoodItem() {
    if (this.quantity > 0) {
      fill(200, 0, 0);
      noStroke()
      ellipse(this.loc.x, this.loc.y, 10)
    } else { // do reset
      this.quantity = 50;


      let sx = random(2, width - 2)
      let sy = random(2, height - 2)
      let startLoc = createVector(sx, sy)
      while (checkPixeltoWall(startLoc) == true) {
        sx = random(2, width - 2)
        sy = random(2, height - 2)
        startLoc = createVector(sx, sy)
      }
      this.loc.set(startLoc)

    }

  }

}