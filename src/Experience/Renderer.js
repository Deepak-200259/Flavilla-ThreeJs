import {
  WebGLRenderer,
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  NoToneMapping,
  LinearToneMapping,
  ReinhardToneMapping,
  CineonToneMapping,
} from "three";
import Experience from "./Experience.js";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.debug = this.experience.debug;
    if (this.debug.active)
      this.debugFolder = this.debug.ui.addFolder("Renderer Settings");
    this.setInstance();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.instance.useLegacyLights = true;
    this.instance.toneMapping = ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.3;
    this.instance.shadowMap.enabled = true;
    this.instance.setClearColor(0xffffff);
    this.instance.shadowMap.type = PCFSoftShadowMap;
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    if (this.debug.active) this.debugSettings();
  }

  debugSettings() {
    this.debugFolder.close();
    const toneMappingOptions = {
      ToneMapping: "ACESFilmic",
      Exposure: 1,
    };

    // Add tonemapping settings to Dat GUI
    this.debugFolder
      .add(toneMappingOptions, "ToneMapping", [
        "None",
        "Linear",
        "Reinhard",
        "ACESFilmic",
        "Cineon",
      ])
      .onChange((value) => {
        switch (value) {
          case "None":
            this.instance.toneMapping = NoToneMapping;
            break;
          case "Linear":
            this.instance.toneMapping = LinearToneMapping;
            break;
          case "Reinhard":
            this.instance.toneMapping = ReinhardToneMapping;
            break;
          case "ACESFilmic":
            this.instance.toneMapping = ACESFilmicToneMapping;
            break;
          case "Cineon":
            this.instance.toneMapping = CineonToneMapping;
            break;
        }
      });

    this.debugFolder
      .add(toneMappingOptions, "Exposure", 0, 5)
      .onChange((value) => {
        this.instance.toneMappingExposure = value;
      });
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
