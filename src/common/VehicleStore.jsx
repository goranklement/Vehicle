import { makeObservable, observable, action } from "mobx";

class VehicleStore {
  vehicles = [];

  constructor(value) {
    makeObservable(this, {
      vehicles: observable,
      addVehicle: action,
    });
  }

  addVehicle(veh) {
    this.vehicles.push(veh);
  }

  removeVehicle(index) {
    this.vehicles.splice(index, 1);
  }
}

const vehicleStore = new VehicleStore();
export default vehicleStore;
