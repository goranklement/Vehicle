import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import axios from "axios";
import Ad from "../components/Ad";
import makeModelStore from "../common/MakeModelStore";
import vehicleStore from "../common/VehicleStore";
import { auth } from "../components/FirebaseConfig";
import Paginator from "../components/Paginator";

import { InputNumber } from "primereact/inputnumber";

const Marketplace = () => {
  const user = auth.currentUser;
  const toast = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isFilterPressed, setIsFilterPressed] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [minPrice, setMinPrice] = useState("0");
  const [urlStored, setUrl] = useState("");
  const [maxPrice, setMaxPrice] = useState("0");
  const [minKilometers, setMinKilometers] = useState("0");
  const [maxKilometers, setMaxKilometers] = useState("0");
  const options = makeModelStore.makes.map((make) => ({
    name: make.name,
    id: make.id,
  }));

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
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

  useEffect(() => {
    getData();
  }, [pageNumber, isFilterPressed]);

  const getData = async () => {
    console.log("getdata");
    if (!isFilterPressed) {
      const user = auth.currentUser;
      const url = `https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/?searchQuery=WHERE uid!='${user.uid}' &page=${pageNumber}&rpp=3`;
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setFilteredVehicles(response.data.item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const user = auth.currentUser;
      try {
        const response = await axios.get(urlStored, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setFilteredVehicles(response.data.item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const checkCondition = () => {
    return (
      (isFilterPressed && filteredVehicles.length === 0) ||
      (!isFilterPressed &&
        vehicleStore.vehicles.filter((vehicle) => vehicle.uid !== user.uid)
          .length) === 0
    );
  };
  const showInfo = (message) => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: message,
      life: 3000,
    });
  };

  const filterVehicles = async (isFilterPressed) => {
    let sortURL = "";
    setPageNumber(1);

    if (!isFilterPressed) {
      if (
        selectedOption !== "" &&
        maxPrice > minPrice &&
        maxKilometers > minKilometers
      ) {
        sortURL = `https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/?searchQuery=WHERE kilometers>${minKilometers} AND kilometers<${maxKilometers} AND price>${minPrice} AND price<${maxPrice} AND make='${selectedOption.name}' AND uid!='${user.uid}' &page=${pageNumber}&rpp=2`;
      } else if (
        selectedOption !== "" &&
        maxPrice > minPrice &&
        maxKilometers === minKilometers
      ) {
        sortURL = `https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/?searchQuery=WHERE price>${minPrice} AND price<${maxPrice} AND make='${selectedOption.name}' AND uid!='${user.uid}' &page=${pageNumber}&rpp=2`;
      } else if (
        selectedOption !== "" &&
        maxPrice === minPrice &&
        maxKilometers > minKilometers
      ) {
        sortURL = `https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/?searchQuery=WHERE kilometers>${minKilometers} AND kilometers<${maxKilometers} AND make='${selectedOption.name}' AND uid!='${user.uid}' &page=${pageNumber}&rpp=2`;
      } else if (maxPrice > minPrice && maxKilometers > minKilometers) {
        sortURL = `https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/?searchQuery=WHERE kilometers>${minKilometers} AND kilometers<${maxKilometers} AND price>${minPrice} AND price<${maxPrice}  AND uid!='${user.uid}' &page=${pageNumber}&rpp=2`;
      } else if (maxKilometers > minKilometers && maxPrice === minPrice) {
        sortURL = `https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/?searchQuery=WHERE kilometers>${minKilometers} AND kilometers<${maxKilometers} AND uid!='${user.uid}' &page=${pageNumber}&rpp=2`;
      } else if (
        selectedOption !== "" &&
        maxPrice === minPrice &&
        maxKilometers === minKilometers
      ) {
        sortURL = `https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/?searchQuery=WHERE make='${selectedOption.name}' AND uid!='${user.uid}' &page=${pageNumber}&rpp=2`;
      } else if (maxPrice > minPrice && maxKilometers === minKilometers) {
        sortURL = `https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/?searchQuery=WHERE price>${minPrice} AND price<${maxPrice} AND uid!='${user.uid}' &page=${pageNumber}&rpp=2`;
      } else {
        showInfo("Invalid filter values!");
      }
      if (sortURL) {
        try {
          const response = await axios.get(sortURL, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          setFilteredVehicles(response.data.item);
          setUrl(sortURL);
          setIsFilterPressed(!isFilterPressed);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    } else {
      console.log("prije svih auta");
      setSelectedOption("");
      setMinPrice(0);
      setMaxPrice(0);

      setMinKilometers(0);
      setMaxKilometers(0);
      setIsFilterPressed(!isFilterPressed);
      getData();
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="selection">
        <div>
          <div className="minMax">
            <div className="minMaxPrice">
              <span className="p-float-label">
                <InputNumber
                  min="0"
                  id="number-input"
                  value={minPrice}
                  onValueChange={(e) => setMinPrice(e.value)}
                />
                <label htmlFor="number-input">Min price</label>
              </span>
              <span className="p-float-label">
                <InputNumber
                  min="0"
                  id="number-input"
                  value={maxPrice}
                  onValueChange={(e) => setMaxPrice(e.value)}
                />
                <label htmlFor="number-input">Max price</label>
              </span>
            </div>
            <div className="minMaxKilometers">
              <span className="p-float-label">
                <InputNumber
                  min="0"
                  id="number-input"
                  value={minKilometers}
                  onValueChange={(e) => setMinKilometers(e.value)}
                />
                <label htmlFor="number-input">Min kilometers</label>
              </span>
              <span className="p-float-label">
                <InputNumber
                  min="0"
                  id="number-input"
                  value={maxKilometers}
                  onValueChange={(e) => setMaxKilometers(e.value)}
                />
                <label htmlFor="number-input">Max kilometers</label>
              </span>
            </div>
          </div>
        </div>
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
            onClick={() => filterVehicles(isFilterPressed)}
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
              ? filteredVehicles.map((vehicle) => (
                  <Ad key={vehicle.id} vehicle={vehicle} />
                ))
              : filteredVehicles.map((vehicle) => (
                  <Ad key={vehicle.id} vehicle={vehicle} />
                ))}
          </>
        )}
      </div>
      {checkCondition() ? (
        <></>
      ) : (
        <Paginator page={pageNumber} setPage={handlePageChange} />
      )}
    </>
  );
};

export default Marketplace;
