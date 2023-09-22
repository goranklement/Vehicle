import makeModelStore from "../common/MakeModelStore";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { auth } from "./FirebaseConfig";
import { Button } from "primereact/button";
import qs from "qs";
import { InputNumber } from "primereact/inputnumber";

const AddVehicle = (props) => {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [vehicleValue, setVehicleValue] = useState("");
  const [kilometersPassed, setKilometersPassed] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [bearer, setBearer] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      const dataToken = {
        username: "goran.klement1@gmail.com",
        password: "gogigogi.",
        grant_type: "password",
      };

      const formData = qs.stringify(dataToken);
      const tokenUrl = "https://api.baasic.com/beta/vehiclegkl/login";
      try {
        const response = await axios.post(tokenUrl, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const token = response.data.access_token;
        setBearer(token);
        // Rest of your code using myToken
      } catch (error) {
        // Handle errors here
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  const makeNames = props.makes.map((make) => ({
    name: make.name,
    id: make.id,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlVehicle =
      "https://api.baasic.com/beta/vehiclegkl/resources/Vehicle/";
    //const user = auth.currentUser;
    // console.log(user);

    const data = {
      make: selectedMake.name,
      model: selectedModel.name,
      uid: "1212",
      kilometers: kilometersPassed,
      price: vehicleValue,
      img: imgUrl,
    };
    console.log(bearer);

    const response = await axios.post(urlVehicle, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${bearer}`,
      },
    });

    console.log(response);
  };

  const modelNames = props.models.map((model) => ({
    name: model.name,
    id: model.id,
    makeId: model.makeId,
  }));

  const handleMakeChange = (e) => {
    setSelectedMake(e.value);

    const filteredModels = props.models.filter(
      (model) => model.makeId === e.value.id
    );

    const filteredModelNames = filteredModels.map((model) => ({
      name: model.name,
      id: model.id,
    }));

    setModelOptions(filteredModelNames);
  };

  const [modelOptions, setModelOptions] = useState([]);

  return (
    <div className="addVehiclePrompt">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="make">Vehicle make:</label>

          <Dropdown
            value={selectedMake}
            onChange={handleMakeChange}
            options={makeNames}
            optionLabel="name"
            placeholder="Select a make"
            className="w-full md:w-14rem"
            style={{ color: "black" }}
          />
        </div>

        <div>
          <label htmlFor="model">Vehicle model:</label>

          <Dropdown
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.value)}
            options={modelOptions}
            optionLabel="name"
            placeholder="Select a model"
            className="w-full md:w-14rem"
            style={{ color: "black" }}
          />
        </div>
        <div className="flex-auto">
          <label htmlFor="currency-germany" className="labelPrice">
            Price:
          </label>
          <InputNumber
            inputId="currency-germany"
            value={vehicleValue}
            onValueChange={(e) => setVehicleValue(e.value)}
            mode="currency"
            currency="EUR"
            locale="de-DE"
          />
        </div>
        <div className="flex-auto">
          <label htmlFor="kilometers" className="kilometersPassed">
            Kilometers:
          </label>
          <InputNumber
            inputId="kilometers"
            value={kilometersPassed}
            onValueChange={(e) => setKilometersPassed(e.value)}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputText
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="Image URL"
          />
        </div>
        <button type="sumbit">KLIKNI</button>
      </form>
    </div>
  );
};

export default AddVehicle;
