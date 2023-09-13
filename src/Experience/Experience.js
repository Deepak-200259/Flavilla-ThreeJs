import { Scene, Raycaster, Vector2, Mesh } from "three";

import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import ZoomControls from "./World/Map/ZoomControls.js";
import StartingScreen from "./World/Popup/StartingScreen.js";
import Images from "./Utils/Images.js";

let instance = null;

export default class Experience {
  constructor(_canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;
    // Global access
    window.experience = this;
    // Options
    this.canvas = _canvas;
    this.countryIntersections = [];
    this.shipsIntersection = [];
    this.characterIntersections = [];
    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new Scene();
    this.raycaster = new Raycaster();
    this.mouse = new Vector2(0, 0);
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.zoomControls = new ZoomControls();
    this.images = new Images();
    this.startScreen = new StartingScreen();
    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });
    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
    this.zoomControls.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");
    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof Mesh) {
        child.geometry.dispose();
        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];
          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") value.dispose();
        }
      }
    });
    this.camera.controls.dispose();
    this.renderer.instance.dispose();
    if (this.debug.active) this.debug.ui.destroy();
  }
}
