import { useState } from "react";

export default function DogDetails({
  dog,
  dogs,
  setDogs,
  allDogs,
  setAllDogs,
}) {
  // toggling btwn edit and view mode
  const [isEditing, setIsEditing] = useState(false);

  // state to store updated dog details
  const [editName, setEditName] = useState(dog.name);
  const [editBreed, setEditBreed] = useState(dog.breed);
  const [editOwner, setEditOwner] = useState(dog.owner);
  const [editSize, setEditSize] = useState(dog.size);
  const [editDescription, setEditDescription] = useState(dog.description);

  // state for error handling
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Handle delete
  const handleClick = async () => {
    const response = await fetch("/api/dogs/" + dog._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      // Update both filteredDogs and allDogs states
      setDogs(dogs.filter((d) => d._id !== dog._id));
      setAllDogs(allDogs.filter((d) => d._id !== dog._id));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle save functionality
  const handleSaveClick = async () => {
    let newErrors = [];

    // Client-side validation rules (same as in DogForm)
    if (editName.length < 2 || editName.length > 20) {
      newErrors.push("name");
    }
    if (editBreed.length < 2 || editBreed.length > 20) {
      newErrors.push("breed");
    }
    if (editOwner.trim() === "") {
      newErrors.push("owner");
    }
    if (!["XS", "SM", "MD", "LG", "XL"].includes(editSize)) {
      newErrors.push("size");
    }
    if (editDescription.length < 2 || editDescription.length > 500) {
      newErrors.push("description");
    }

    // Validation has failed
    if (newErrors.length > 0) {
      setEmptyFields(newErrors);
      setError("Please correct the highlighted fields.");
      return; // Stop Submission
    }
    const updatedDog = {
      name: editName,
      breed: editBreed,
      owner: editOwner,
      size: editSize,
      description: editDescription,
    };

    const response = await fetch("/api/dogs/" + dog._id, {
      method: "PATCH",
      body: JSON.stringify(updatedDog),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log("Edited dog response:", json);
    if (response.ok) {
      setDogs((prevDogs) =>
        prevDogs.map((d) => (d._id === dog._id ? json : d))
      );
      setAllDogs((prevDogs) =>
        prevDogs.map((d) => (d._id === dog._id ? json : d))
      );
      setIsEditing(false);
      setEmptyFields([]);
      setError(null);
    } else {
      setError("Failed to update the dog. Please try again.");
    }
  };

  return (
    <div className="dog-details">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className={emptyFields.includes("name") ? "error" : ""}
          />
          <input
            type="text"
            value={editBreed}
            onChange={(e) => setEditBreed(e.target.value)}
            className={emptyFields.includes("breed") ? "error" : ""}
          />
          <input
            type="text"
            value={editOwner}
            onChange={(e) => setEditOwner(e.target.value)}
            className={emptyFields.includes("owner") ? "error" : ""}
          />
          <select
            value={editSize}
            onChange={(e) => setEditSize(e.target.value)}
            className={emptyFields.includes("size") ? "error" : ""}
          >
            <option value="XS">Extra Small (XS)</option>
            <option value="SM">Small (SM)</option>
            <option value="MD">Medium (MD)</option>
            <option value="LG">Large (LG)</option>
            <option value="XL">Extra Large (XL)</option>
          </select>
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className={emptyFields.includes("description") ? "error" : ""}
          />
          <button onClick={handleSaveClick} className="search-button">
            Save
          </button>
        </div>
      ) : (
        <div>
          <h4>{dog.name}</h4>
          <p>
            <strong>Breed: </strong>
            {dog.breed}
          </p>
          <p>
            <strong>Owner: </strong>
            {dog.owner}
          </p>
          <p>
            <strong>Size: </strong>
            {dog.size}
          </p>
          <p>
            <strong>Description: </strong>
            {dog.description}
          </p>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {!isEditing && (
        <span onClick={handleEditClick} className="material-icons edit">
          edit
        </span>
      )}
      {!isEditing && (
        <span onClick={handleClick} className="material-icons delete">
          delete
        </span>
      )}
    </div>
  );
}
