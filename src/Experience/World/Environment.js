import { AmbientLight, DirectionalLight } from "three";
import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }
    this.setSunLight();
  }

  /**
   * Adds Lights and shadows in the Scene.
   */

  setSunLight() {
    this.ambient = new AmbientLight("#ffffff", 1);
    this.sunLight = new DirectionalLight("#ffffff", 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.top = 15;
    this.sunLight.shadow.camera.left = -15;
    this.sunLight.shadow.camera.right = 15;
    this.sunLight.shadow.camera.bottom = -15;
    this.sunLight.shadow.camera.far = 40;
    this.sunLight.shadow.bias = -0.001;
    this.sunLight.shadow.mapSize.width = 4096;
    this.sunLight.shadow.mapSize.height = 4096;
    this.sunLight.position.set(11, 7, 4);
    this.scene.add(this.sunLight, this.ambient);

    // Debug
    if (this.debug.active) this.debugProperties();
  }

  /**
   * If debug menu is enabled, adds properties to the dat gui
   */

  debugProperties() {
    this.debugFolder.close();
    this.debugFolder
      .add(this.ambient, "intensity")
      .name("ambientIntensity")
      .min(0)
      .max(100)
      .step(0.001);

    this.debugFolder
      .add(this.sunLight, "intensity")
      .name("sunLightIntensity")
      .min(0)
      .max(100)
      .step(0.001);

    this.debugFolder.addColor(this.sunLight, "color").name("sunLightColor");

    this.debugFolder
      .add(this.sunLight.position, "x")
      .name("sunLightX")
      .min(-15)
      .max(15)
      .step(0.001);

    this.debugFolder
      .add(this.sunLight.position, "y")
      .name("sunLightY")
      .min(-12)
      .max(12)
      .step(0.001);

    this.debugFolder
      .add(this.sunLight.position, "z")
      .name("sunLightZ")
      .min(-12)
      .max(12)
      .step(0.001);
  }
}
