let oyster;



class OysterShape {
  constructor(width, height) {
    console.log(width, height, 'sssss')
    this.x = width / 2;
    this.y = height / 2;
    this.width = 400;
    this.height = 300;
    this.layers = 8;
    this.roughness = 0.2;
    this.asymmetry = 1.2;
    this.orientation = -0.6;
    this.ovalFactor = 0.3;
    this.innerShift = 0.4; // Controls how much inner circles shift to the left
  }
  setup() {
    // createCanvas(800, 600);
    oyster = new OysterShape();
  }
  
   draw() {
    background(240);
    oyster.display();
  }
  display() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(0);
    strokeWeight(2);

    for (let i = this.layers; i > 0; i--) {
      let layerWidth = (this.width / this.layers) * i;
      let layerHeight = (this.height / this.layers) * i;
      let layerRatio = i / this.layers;
      let offsetX = this.orientation * (this.width / 2 - layerWidth / 2);
      
      // Apply additional shift to inner circles
      offsetX -= this.innerShift * (1 - layerRatio) * this.width / 2;
      
      beginShape();
      for (let angle = 0; angle < TWO_PI; angle += 0.1) {
        let r = 1 + this.roughness * noise(i * 10 + angle * 3);
        
        let xFactor = 1 - this.ovalFactor * Math.pow(Math.sin(angle), 2);
        let x = offsetX + layerWidth/2 * r * cos(angle) * this.asymmetry * xFactor;
        let y = layerHeight/2 * r * sin(angle);
        
        if (i === this.layers) {
          x += 15 * noise(angle * 6) - 9.5;
          y += 15 * noise(angle * 6 + 1000) - 9.5;
        }
        
        vertex(x, y);
      }
      endShape(CLOSE);
    }
    pop();
  }
}


export default OysterShape