import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import vehicleStore from "../common/VehicleStore";
import AdModel from "../components/AdModel";
import Paginator from "../components/Paginator";
import AddVehicle from "../components/AddVehicle";
import { auth } from "../components/FirebaseConfig";
import makeModelStore from "../common/MakeModelStore";
import axios from "axios";
const Profile = () => {
  const [isShown, setIsShown] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [filtered, setFiltered] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    getData();
    makeModelStore.getMakes();
    makeModelStore.getModels();
    vehicleStore.getFromDatabase();
  }, []);

  useEffect(() => {
    getData();
  }, [pageNumber]);

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const getData = async () => {
    const user = auth.currentUser;
    const url = `https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/?searchQuery=WHERE uid='${user.uid}' &page=${pageNumber}&rpp=3`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setFiltered(response.data.item);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const toggleIsShown = () => {
    setIsShown(!isShown);
  };
  return useObserver(() => (
    <>
      <div>
        <div className="adContainer">
          {user ? (
            <>
              {filtered.map((vehicle) => (
                <AdModel key={vehicle.id} vehicle={vehicle} />
              ))}
            </>
          ) : (
            <h5>Loading...</h5>
          )}
        </div>

        {vehicleStore.vehicles.filter((vehicle) => vehicle.uid === user.uid)
          .length > 0 ? (
          <Paginator page={pageNumber} setPage={handlePageChange} />
        ) : (
          <h5>You don't have any ads</h5>
        )}

        <Button
          onClick={() => setIsShown(!isShown)}
          label={isShown ? "Cancel" : "Add new vehicle"}
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
            toggleIsShown={toggleIsShown}
          />
        )}
      </div>
    </>
  ));
};
export default Profile;
