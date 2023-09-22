import { Button } from "primereact/button";
import "../index.css";

import { useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import vehicleStore from "../common/VehicleStore";
import AdModel from "./AdModel";
import { Paginator } from "primereact/paginator";
import AddVehicle from "./AddVehicle";
import { auth } from "./FirebaseConfig";
import makeModelStore from "../common/MakeModelStore";
const Profile = () => {
  const [first, setFirst] = useState(0);
  const [isShown, setIsShow] = useState(false);
  const [rows, setRows] = useState(3);
  const user = auth.currentUser;
  useEffect(() => {
    makeModelStore.getMakes();
    makeModelStore.getModels();
  }, []);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  return useObserver(() => (
    <>
      <div>
        <div className="adContainer">
          {vehicleStore.vehicles.length === 0 ? (
            <h5>You don't have any active ads</h5>
          ) : (
            <>
              {vehicleStore.vehicles
                .slice(first, first + rows)
                .map((vehicle) => (
                  <AdModel key={vehicle.id} vehicle={vehicle} />
                ))}
            </>
          )}
        </div>
        {vehicleStore.vehicles && vehicleStore.vehicles.length > 0 && (
          <Paginator
            className="paginator"
            first={first}
            rows={rows}
            totalRecords={
              vehicleStore.vehicles !== undefined
                ? vehicleStore.vehicles.length
                : 0
            }
            rowsPerPageOptions={[3, 6, 9]}
            onPageChange={onPageChange}
          />
        )}

        <Button
          onClick={() => setIsShow(!isShown)}
          label={isShown ? "Cancel" : "Add new add"}
          icon={isShown ? "pi pi-times" : "pi pi-check"}
          iconPos="right"
          style={{ backgroundColor: isShown ? "#691009" : "#1a3459" }}
        />
      </div>
      <div>
        {isShown && (
          <AddVehicle
            models={makeModelStore.models}
            makes={makeModelStore.makes}
          />
        )}
      </div>
    </>
  ));
};
export default Profile;
