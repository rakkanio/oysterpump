import "./Playboard.css";
import Sketch from "react-p5";
import boyImg from "./../../assets/boy.jpeg";
// import Oyester from './Oyester'
function PlayboardComponent() {
              //init object globally
              let objImage: any = null;
              function init() {
                  objImage = document.getElementById("image1");
                  console.log('ddddddd', objImage)
                  objImage.style.position = "relative";
                  objImage.style.left = "0px";
                  objImage.style.top = "0px";
              }
              function getKeyAndMove(event: any) {

                console.log('event', event)
                  var key_code = event.which || event.keyCode;
                  switch (key_code) {
                      case 37: //left arrow key
                          moveLeft();
                          break;
                      case 38: //Up arrow key
                          moveUp();
                          break;
                      case 39: //right arrow key
                          moveRight();
                          break;
                      case 40: //down arrow key
                          moveDown();
                          break;
                  }
              }
              function moveLeft() {
                  objImage.style.left = parseInt(objImage.style.left) - 5 + "px";
              }
              function moveUp() {
                  objImage.style.top = parseInt(objImage.style.top) - 5 + "px";
              }
              function moveRight() {
                  objImage.style.left = parseInt(objImage.style.left) + 5 + "px";
              }
              function moveDown() {
                  objImage.style.top = parseInt(objImage.style.top) + 5 + "px";
              }
              window.onload = init;
             function setup (p5: any, canvasParentRef: any) {
                p5.createCanvas(window.innerWidth, window.innerHeight).parent(
                  canvasParentRef
                );
                p5.frameRate();
                // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
              };
              function draw(p5: any){
                p5.fill(234, 31, 81);
                p5.noStroke();
                p5.rect(50, 50, 250, 250);
                p5.fill(255);
                p5.textStyle(p5.BOLD);
                p5.textSize(140);
                p5.text("p5*", 60, 250);
              };
  return <>

    <div className="container" onKeyDown={getKeyAndMove}>
      <p>Hello from playboard</p>
      <Sketch setup={setup} draw={draw} />;
      <img id="image1" src={boyImg} alt="home_p" />
    </div>
  </>
}

export default PlayboardComponent;