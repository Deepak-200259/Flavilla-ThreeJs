import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Map from "./Map/Map.js";
import Ships from "./Map/Ships.js";
import { JsonData } from "./Map/Data.js";
import Character from "./Map/Character.js";
import Intersections from "./Map/Intersections.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.firstCountries = [];
    for (const innerArray of JsonData) {
      if (innerArray.length > 0) {
        const obj = innerArray[0];
        this.firstCountries.push(obj);
        // Perform any desired operations with the object here
      }
    }
    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.map = new Map();
      this.countryAndCharacterIntersections = new Intersections(
        this.firstCountries
      );
      this.character = new Character(this.firstCountries);
      this.ships = new Ships();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.map) this.map.update();
    if (this.countryAndCharacterIntersections)
      this.countryAndCharacterIntersections.update();
    if (this.character) this.character.update();
    if (this.ships) this.ships.update();
  }
}
