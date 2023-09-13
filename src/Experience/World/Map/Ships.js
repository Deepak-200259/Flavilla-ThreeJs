import {
  NearestFilter,
  AnimationMixer,
  Mesh,
  NearestMipmapNearestFilter,
} from "three";
import Experience from "../../Experience.js";
export default class Ships {
  constructor() {
    this.experience = new Experience();
    this.setUtils();
    this.setEvents();
    this.setModel();
    this.playAnimations();
  }

  /**
   * Sets the Utilities required for Ships
   */

  setUtils() {
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.mouse = this.experience.mouse;
    this.raycaster = this.experience.raycaster;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.model = this.resources.items.Ships;
    this.shipTooltip = document.getElementById("shipToolTip");
    this.popupText = {
      accenture: "Accenture",
      three_color_rule: "3 Colours Rule",
      Thales: "Thales",
      google: "Google",
    };
    this.isIntersected = [];
    this.isToolTipVisible = false;
    this.pushMeshesInArray();
  }

  /**
   * Pushes Meshes in an array that Contains Ship in there name for checking Intersections
   */

  pushMeshesInArray() {
    this.model.scene.traverse((child) => {
      child instanceof Mesh && child.name.includes("Ship")
        ? this.experience.shipsIntersection.push(child)
        : null;

      if (child instanceof Mesh && child.name.includes("Ship")) {
      }
    });
  }

  /**
   * Sets Click Events for opening Links on Clicking Ships
   */

  setEvents() {
    this.canvas.addEventListener("mousemove", this.mouseMove);
    this.canvas.addEventListener("mouseout", this.onMouseOut);
    this.canvas.addEventListener("click", () => this.onMouseClick());
  }

  /**
   * Setting the mouse position from center of the screen
   * @param {*} event mouse event
   */

  mouseMove = (event) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.onMouseHover(event);
  };

  /**
   * When Mouse Hovers over ships
   */

  onMouseHover(event) {
    if (this.isIntersected.length > 0 && this.isIntersected[0]) {
      if (this.isIntersected[0].object.name.includes("Accenture")) {
        this.shipTooltip.innerHTML = this.popupText.accenture;
        this.setPopup(event);
      } else if (this.isIntersected[0].object.name.includes("UnWomen")) {
        this.shipTooltip.innerHTML = this.popupText.three_color_rule;
        this.setPopup(event);
      } else if (this.isIntersected[0].object.name.includes("BlackWomen")) {
        this.shipTooltip.innerHTML = this.popupText.Thales;
        this.setPopup(event);
      } else if (this.isIntersected[0].object.name.includes("Google")) {
        this.shipTooltip.innerHTML = this.popupText.google;
        this.setPopup(event);
      }
    } else {
      // Hide the popup when the mouse is not over the mesh
      this.isToolTipVisible && this.clearPopup();
    }
  }

  /**
   * Set the ToolTip to display over the ships
   * @param {*} event mouse event
   */

  setPopup(event) {
    this.isToolTipVisible = true;
    this.shipTooltip.style.display = "block";
    this.shipTooltip.style.position = "absolute";
    this.shipTooltip.style.left = event.clientX + 10 + "px";
    this.shipTooltip.style.top = event.clientY + 10 + "px";
  }

  /**
   * On Clicking Mouse, Opens link of the particular ship
   */

  onMouseClick() {
    switch (this.shipTooltip.innerHTML) {
      case this.popupText.accenture:
        window.open("https://www.accenture.com/");
        break;
      case this.popupText.Thales:
        window.open(" https://bit.ly/Thales_Group");
        break;
      case this.popupText.three_color_rule:
        window.open("https://3coloursrule.com/our-work/");
        break;
      case this.popupText.google:
        window.open("https://www.google.com/");
        break;
    }
    if (this.shipTooltip.innerHTML !== "") {
      this.clearPopup();
    }
  }

  /**
   * Clears Popup Values
   */

  clearPopup() {
    this.isToolTipVisible = false;
    this.shipTooltip.innerHTML = "";
    this.shipTooltip.style.display = "none";
    this.shipTooltip.style.position = "relative";
  }

  /**
   * Hide the popup when the mouse leaves the canvas
   */

  onMouseOut() {
    if (this.shipTooltip) {
      this.shipTooltip.style.display = "none";
    }
  }

  /**
   * Set the Ships Model on Map
   */

  setModel() {
    this.model.scene.scale.set(10, 10, 10);
    this.model.scene.position.set(-1.97, 0, 0.1);

    this.model.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.depthWrite = true;
        child.castShadow = true;

        if (child.isMesh && child.name.includes("Flag")) {
          child.material.metalness = 0.01;
          child.material.shininess = 1;

          if (child.name.includes("Accenture")) {
            let material = child.material.clone();
            material.map = this.resources.items["Accenture"];
            material.map.magFilter = NearestFilter;
            material.map.minFilter = NearestMipmapNearestFilter;
            material.map.anisotropy = 0;
            material.map.flipY = false;
            child.material = material;
          } else if (child.name.includes("BlackWomen")) {
            let material = child.material.clone();
            material.map = this.resources.items["Thales"];
            material.map.magFilter = NearestFilter;
            material.map.minFilter = NearestMipmapNearestFilter;
            material.map.anisotropy = 0;
            material.map.flipY = false;
            child.material = material;
          } else if (child.name.includes("UnWomen")) {
            let material = child.material.clone();

            material.map = this.resources.items["Three_Color"];
            material.map.magFilter = NearestFilter;
            material.map.minFilter = NearestMipmapNearestFilter;
            material.map.anisotropy = 0;
            material.map.flipY = false;
            child.material = material;
          } else if (child.name.includes("Google")) {
            let material = child.material.clone();

            material.map = this.resources.items["Google"];
            material.map.magFilter = NearestFilter;
            material.map.minFilter = NearestMipmapNearestFilter;
            material.map.anisotropy = 0;
            material.map.flipY = false;
            child.material = material;
          }
        }
      }
    });
    this.scene.add(this.model.scene);
  }

  /**
   * Animations
   */

  playAnimations() {
    this.mixer = new AnimationMixer(this.model.scene);
    for (const animation of this.model.animations) {
      const action = this.mixer.clipAction(animation);
      action.play();
    }
  }

  /**
   * Updates the Animation on each frame
   */

  update() {
    const deltaTime = this.time.delta / 1000; // Time in seconds
    if (this.mixer) {
      this.mixer.update(deltaTime / 4);
    }
    this.raycaster.setFromCamera(this.mouse, this.camera.instance);
    this.isIntersected = this.raycaster.intersectObjects(
      this.experience.shipsIntersection
    );
  }
}
