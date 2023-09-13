import Experience from "../../Experience";

export default class ZoomControls {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera.instance;
    this.cameraControls = this.experience.camera.controls;
    this.setControls();
  }

  /**
   * Adds Functionality of Zoom IN and Zoom OUT Controls
   */

  setControls() {
    this.zoomIn = document.getElementById("zoomInButton");
    this.zoomOut = document.getElementById("zoomOutButton");
    this.zoomIn.addEventListener("click", (event) => {
      if (this.cameraControls.getDistance() > 2.5)
        this.camera.position.set(
          this.camera.position.x,
          Math.floor(this.camera.position.y) - 2,
          this.camera.position.z
        );
    });
    this.zoomOut.addEventListener("click", (event) => {
      if (this.cameraControls.getDistance() < 22)
        this.camera.position.set(
          this.camera.position.x,
          Math.floor(this.camera.position.y) + 2,
          this.camera.position.z
        );
      if (this.camera.position.y > 18) this.cameraControls.target.set(0, 0, 0);
    });
  }

  /**
   * Hides the ZoomIn And ZoomOut Buttons
   */

  hideButtons() {
    if (this.cameraControls.getDistance() <= 4) {
      this.lowerButtonOpacity(this.zoomIn);
    } else if (this.cameraControls.getDistance() >= 21) {
      this.lowerButtonOpacity(this.zoomOut);
    } else {
      this.higherButtonOpacity(this.zoomIn);
      this.higherButtonOpacity(this.zoomOut);
    }
  }

  /**
   * Lowers the buttons opacity and disables pointer events
   * @param {*} button current button
   */

  lowerButtonOpacity(button) {
    button.style.pointerEvents = "none";
    button.style.opacity = 0.5;
  }

  /**
   * Highers the buttons opacity and enables pointer events
   * @param {*} button current button
   */

  higherButtonOpacity(button) {
    button.style.pointerEvents = "auto";
    button.style.opacity = 1;
  }

  update() {
    if (this.cameraControls.enabled) this.hideButtons();
  }
}
