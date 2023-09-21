import "../index.css";
import { useState } from "react";
import { Button } from "primereact/button";

const AdModel = (props) => {
  const [isEdited, setIsEdited] = useState(false);
  const [value, setValue] = useState("PEŽO");
  return isEdited ? (
    <div className="ad">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <h6>Model</h6>
      <img src="https://www.index.hr/oglasi/userdocsimages/oglas/_2022/7/19/3570283/040f58f1-2b1c-4649-b395-eed97f33d7b7-190720221341385007.jpeg?preset=oglas-slike-view-detaljno-mob" />

      <div className="editDeleteButtons">
        <Button
          onClick={() => setIsEdited(!isEdited)}
          className="editButton"
          label="Edit"
          icon="pi pi-pencil"
          iconPos="right"
        />
        <Button
          className="saveButton"
          label="Save"
          icon="pi pi-check"
          iconPos="right"
        />
      </div>
    </div>
  ) : (
    <div className="ad">
      <h5>{props.vehicle}</h5>
      <h6>Model</h6>
      <img src="https://www.index.hr/oglasi/userdocsimages/oglas/_2022/7/19/3570283/040f58f1-2b1c-4649-b395-eed97f33d7b7-190720221341385007.jpeg?preset=oglas-slike-view-detaljno-mob" />

      <div className="editDeleteButtons">
        <Button
          onClick={() => setIsEdited(!isEdited)}
          className="editButton"
          label="Edit"
          icon="pi pi-pencil"
          iconPos="right"
        />
        <Button
          className="deleteButton"
          label="Delete"
          icon="pi pi-trash"
          iconPos="right"
        />
      </div>
    </div>
  );
};
export default AdModel;
