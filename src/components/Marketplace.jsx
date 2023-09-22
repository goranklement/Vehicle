import vehicleStore from "../common/VehicleStore";
import { auth } from "./FirebaseConfig";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import axios from "axios";

import Ad from "./Ad";
const Marketplace = () => {
  const user = auth.currentUser;
  const toast = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortedResult, setSortedResult] = useState([""]);
  const options = [{ option: "make" }, { option: "model" }];

  const types = [{ type: "asc" }, { type: "desc" }];

  const showInfo = (message) => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: message,
      life: 3000,
    });
  };
  const sortVehicles = async () => {
    if (selectedOption !== "" && selectedType !== "") {
      const sortURL = `https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/?sort=${selectedOption.option}|${selectedType.type}`;

      console.log(sortURL);
      try {
        const response = await axios.get(sortURL, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSortedResult(response.data.item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      showInfo("You have to select sort by and order!");
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="selection">
        <Dropdown
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.value)}
          options={options}
          optionLabel="option"
          placeholder="Sort by"
          className="w-full md:w-14rem"
        />
        <Dropdown
          value={selectedType}
          onChange={(e) => setSelectedType(e.value)}
          options={types}
          optionLabel="type"
          placeholder="Select a sorting option"
          className="w-full md:w-14rem"
        />
        <Button onClick={sortVehicles} label="Sort" />
      </div>

      <div className="adsContainer">
        {sortedResult
          .filter((vehicle) => vehicle.uid !== user.uid)
          .map((vehicle) => (
            <Ad key={vehicle.id} vehicle={vehicle} />
          ))}
      </div>
    </>
  );
};
export default Marketplace;
