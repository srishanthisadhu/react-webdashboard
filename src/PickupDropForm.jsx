import React, { useState } from "react";

function PickupDropForm({ onSubmit }) {
  const [pickupData, setPickupData] = useState({ x: "", y: "", z: "", r: "" });
  const [dropData, setDropData] = useState({ x: "", y: "", z: "", r: "" });

  const handlePickupChange = (e) => {
    const { name, value } = e.target;
    setPickupData({ ...pickupData, [name]: value });
  };

  const handleDropChange = (e) => {
    const { name, value } = e.target;
    setDropData({ ...dropData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Pickup Coordinates:", pickupData);
    console.log("Drop Coordinates:", dropData);

    // TODO Add logic to process pickup and drop requests to backend
    onSubmit();
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <h2>Pickup Coordinates</h2>
          <form>
            <div>
              <label htmlFor="pickup-x">X:</label>
              <input type="number" id="pickup-x" name="x" value={pickupData.x} onChange={handlePickupChange} />
            </div>
            <div>
              <label htmlFor="pickup-y">Y:</label>
              <input type="number" id="pickup-y" name="y" value={pickupData.y} onChange={handlePickupChange} />
            </div>
            <div>
              <label htmlFor="pickup-z">Z:</label>
              <input type="number" id="pickup-z" name="z" value={pickupData.z} onChange={handlePickupChange} />
            </div>
            <div>
              <label htmlFor="pickup-r">R:</label>
              <input type="number" id="pickup-r" name="r" value={pickupData.r} onChange={handlePickupChange} />
            </div>
          </form>
        </div>

        <div>
          <h2>Drop Coordinates</h2>
          <form>
            <div>
              <label htmlFor="drop-x">X:</label>
              <input type="number" id="drop-x" name="x" value={dropData.x} onChange={handleDropChange} />
            </div>
            <div>
              <label htmlFor="drop-y">Y:</label>
              <input type="number" id="drop-y" name="y" value={dropData.y} onChange={handleDropChange} />
            </div>
            <div>
              <label htmlFor="drop-z">Z:</label>
              <input type="number" id="drop-z" name="z" value={dropData.z} onChange={handleDropChange} />
            </div>
            <div>
              <label htmlFor="drop-r">R:</label>
              <input type="number" id="drop-r" name="r" value={dropData.r} onChange={handleDropChange} />
            </div>
          </form>
        </div>
      </div>

      {/* Submit button centered at the bottom */}
      <div style={{ marginTop: "2rem" }}>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default PickupDropForm;
