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
          />
          <input
            type="text"
            value={editBreed}
            onChange={(e) => setEditBreed(e.target.value)}
          />
          <input
            type="text"
            value={editOwner}
            onChange={(e) => setEditOwner(e.target.value)}
          />
          <input
            type="text"
            value={editSize}
            onChange={(e) => setEditSize(e.target.value)}
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
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
      <span onClick={handleEditClick} className="material-icons edit">
        edit
      </span>
      <span onClick={handleClick} className="material-icons delete">
        delete
      </span>
    </div>
  );
}
