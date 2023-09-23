import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import axios from "axios";
import { Paginator } from "primereact/paginator";
import Ad from "./Ad";
import makeModelStore from "../common/MakeModelStore";
import vehicleStore from "../common/VehicleStore";
import { auth } from "./FirebaseConfig";

const Marketplace = () => {
  const user = auth.currentUser;
  const toast = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isFilterPressed, setIsFilterPressed] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);
  const options = makeModelStore.makes.map((make) => ({
    name: make.name,
    id: make.id,
  }));
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    Promise.all([makeModelStore.getMakes(), vehicleStore.getFromDatabase()])
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const showInfo = (message) => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: message,
      life: 3000,
    });
  };

  const filterVehicles = async () => {
    if (selectedOption !== "") {
      console.log(selectedOption);
      const sortURL = `https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/?searchQuery=${selectedOption.name}`;

      console.log(sortURL);
      try {
        const response = await axios.get(sortURL, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setFilteredVehicles(response.data.item);

        setIsFilterPressed(!isFilterPressed);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      showInfo("You have to select filter first!");
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="selection">
        <div>
          <Dropdown
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.value)}
            options={options}
            optionLabel="name"
            placeholder="Filter: "
            className="w-full md:w-14rem"
          />

          <Button
            onClick={filterVehicles}
            label={isFilterPressed ? "Show All" : "Filter"}
          />
        </div>
      </div>
      <div className="adsContainer">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {filteredVehicles.length === 0 && isFilterPressed && (
              <h5>No vehicles matched the filter</h5>
            )}
            {isFilterPressed
              ? filteredVehicles
                  .filter((vehicle) => vehicle.uid !== user.uid)
                  .slice(first, first + rows)
                  .map((vehicle) => <Ad key={vehicle.id} vehicle={vehicle} />)
              : vehicleStore.vehicles
                  .filter((vehicle) => vehicle.uid !== user.uid)
                  .slice(first, first + rows)
                  .map((vehicle) => <Ad key={vehicle.id} vehicle={vehicle} />)}
          </>
        )}
      </div>
      <Paginator
        className="paginator"
        first={first}
        rows={rows}
        totalRecords={
          isFilterPressed
            ? filteredVehicles.length
            : vehicleStore.vehicles.filter(
                (vehicle) => vehicle.uid !== user.uid
              ).length
        }
        rowsPerPageOptions={[3, 6, 9]}
        onPageChange={onPageChange}
      />
      {console.log(filteredVehicles.length)}
    </>
  );
};

export default Marketplace;
