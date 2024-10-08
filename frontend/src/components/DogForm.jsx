import { useState } from "react";

export default function DogForm({ setAllDogs, setFilteredDogs, allDogs }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [owner, setOwner] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dog = { name, breed, owner, size, description };
    let newErrors = [];

    // client side validations
    // Validations
    if (name.length < 2 || name.length > 20) {
      newErrors.push("name");
    }
    if (breed.length < 2 || breed.length > 20) {
      newErrors.push("breed");
    }
    if (owner.trim() === "") {
      newErrors.push("owner");
    }
    if (!["XS", "SM", "MD", "LG", "XL"].includes(size)) {
      newErrors.push("size");
    }
    if (description.length < 2 || description.length > 500) {
      newErrors.push("description");
    }

    if (newErrors.length > 0) {
      setEmptyFields(newErrors);
      setError("Please correct the highlighted fields.");
      return; // Stop the submission
    }

    const response = await fetch("/api/dogs", {
      method: "POST",
      body: JSON.stringify(dog),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setBreed("");
      setOwner("");
      setSize("");
      setDescription("");
      setEmptyFields([]);
      setError(null);
      console.log("new dog added", json);

      // Update allDogs and filteredDogs with the new dog
      setAllDogs((prevDogs) => [json, ...prevDogs]); // Add new dog to allDogs
      setFilteredDogs((prevDogs) => [json, ...prevDogs]); // Add new dog to filteredDogs
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <div className="dogFormHeader">
        <h3>Add a New Dog</h3>
      </div>
      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      />
      <label>Breed:</label>
      <input
        type="text"
        onChange={(e) => setBreed(e.target.value)}
        value={breed}
        className={emptyFields.includes("breed") ? "error" : ""}
      />
      <label>Owner:</label>
      <input
        type="text"
        onChange={(e) => setOwner(e.target.value)}
        value={owner}
        className={emptyFields.includes("owner") ? "error" : ""}
      />
      <label>Size:</label>
      <select
        onChange={(e) => setSize(e.target.value)}
        value={size}
        className={emptyFields.includes("size") ? "error" : ""}
      >
        <option value="">Select Size</option>
        <option value="XS">Extra Small (XS)</option>
        <option value="SM">Small (SM)</option>
        <option value="MD">Medium (MD)</option>
        <option value="LG">Large (LG)</option>
        <option value="XL">Extra Large (XL)</option>
      </select>
      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />
      <div className="dogFormButton">
        <button>Add Dog</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
