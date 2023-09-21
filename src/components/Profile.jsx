import { Button } from "primereact/button";
import "../index.css";
import { auth } from "./FirebaseConfig";
import { useState } from "react";
import { useObserver } from "mobx-react";
import vehicleStore from "../common/VehicleStore";
import AdModel from "./AdModel";
const Profile = () => {
  const addVehicle = () => {
    vehicleStore.addVehicle("BMW");
  };
  return useObserver(() => (
    <div>
      {vehicleStore.vehicles.length == 0 ? (
        <h5>You don't have any active ads</h5>
      ) : (
        vehicleStore.vehicles.map((vehicle) => (
          <AdModel key={vehicle.id} vehicle={vehicle} />
        ))
      )}

      <p>Count: {vehicleStore.vehicles.length}</p>
      <Button
        onClick={addVehicle}
        label="Add"
        icon="pi pi-check"
        iconPos="right"
      />
    </div>
  ));
};
export default Profile;
