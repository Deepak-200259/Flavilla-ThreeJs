import { Mesh } from "three";
import Experience from "../../Experience.js";

export default class Map {
  constructor() {
    this.experience = new Experience();
    this.setUtils();
  }

  /**
   * sets the required utils for Map
   */

  setUtils() {
    this.camera = this.experience.camera;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.mapModel = this.resources.items.worldModel.scene;
    this.startScreenPopup = this.experience.startScreen;
    if (this.mapModel) this.turnOffLoader();
    this.setModel();
    this.pushRequiredCountriesOnly();
  }

  /**
   * Turns loader off when map is loaded.
   */

  turnOffLoader() {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.classList.add("fade-out");
    this.camera.cameraAnimation().then(() => {
      this.startScreenPopup.showStartingPopup();
    });

    loadingScreen.addEventListener("transitionend", this.onTransitionEnd);
   
    
  }

  addMapHud(){
    this.addResetButton();
    this.addGetYourStoryButton();
    this.addCloseButton();
  } 
  addGetYourStoryButton() {
    this.getYourStoryButton = document.createElement("button");
    this.leftButtons = document.querySelector(".leftButtons");
    this.getYourStoryButton.textContent = "Get your story on the map";
    this.getYourStoryButton.className = "getYourStory";
    this.getYourStoryButton.style.position = "relative";
    this.leftButtons.appendChild(this.getYourStoryButton);
    this.getYourStoryPopup = document.querySelector(".get-your-story-Body");

    this.getYourStoryButton.addEventListener("click", (event) => {
      this.getYourStoryPopup.style.display = "flex";
      this.getYourStoryPopup.classList.remove("hide");
      // this.camera.resetCamera();
      // this.leftButtons.classList.add("hide");
      // document.body.style.cursor = "grab";
      // event.stopPropagation(); // For Preventing Touches to be on Map
    });
  }

  addCloseButton() {
    //   Create the close button
    const closeButton = document.createElement("button");
    closeButton.className = "getYourStory-close-button";
    closeButton.innerHTML = "&times;";

    // Close the popup when the close button is clicked
    closeButton.addEventListener("click", (event) => {
      this.getYourStoryPopup.classList.add("hide");
      document.body.style.cursor = "grab";
      this.getYourStoryPopup.style.display = "none";
      // For Preventing Touches to be on Map
    });
    // this.hideButtons();
    this.getYourStoryContainer = document.querySelector(".get-your-story");
    this.getYourStoryContainer.prepend(closeButton);
  }
  addResetButton() {
    this.resetButton = document.createElement("button");
    this.leftButtons = document.querySelector(".leftButtons");
    this.resetButton.textContent = "Reset";
    this.resetButton.className = "reset";
    this.resetButton.style.position = "relative";
    this.leftButtons.appendChild(this.resetButton);
    this.resetButton.addEventListener("click", (event) => {
      this.camera.resetCamera();
      // this.leftButtons.classList.add("hide");
      document.body.style.cursor = "grab";
      event.stopPropagation(); // For Preventing Touches to be on Map
    });
    // document.body.appendChild(this.popupContainer);
  }

  /**
   * Removes loader from DOM via event listener
   * @param {*} event events target to be removed
   */

  onTransitionEnd(event) {
    event.target.remove();
  }

  /**
   * Traverses the model and searches for meshes of Countries
   */

  pushRequiredCountriesOnly() {
    this.mapModel.children[0].children.forEach((child) => {
      this.experience.countryIntersections.push(child);
    });
  }

  /**
   * Sets the model in scene with shadows
   */

  setModel() {
    this.mapModel.scale.set(10, 10, 10);
    this.mapModel.position.set(-2, 0, 0);
    this.scene.add(this.mapModel);
    this.mapModel.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.depthWrite = true;
        child.castShadow = true;
        child.material.metalness = 0.5;
        child.material.roughness = 1;
        if (
          this.mapModel.children[2] &&
          this.mapModel.children[3] &&
          this.mapModel.children[4]
        ) {
          child.receiveShadow = true;
        }
      }
    });
  }

  /**
   * Updates on Every next Frame
   */

  update() {
    if (this.camera.controls.enabled) this.camera.controls.update();
  }
}
