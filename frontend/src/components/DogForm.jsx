import { useState } from "react";

export default function DogForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [owner, setOwner] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dog = { name, breed, owner, size, description };

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
    }
    if (response.ok) {
      setName("");
      setBreed("");
      setOwner("");
      setSize("");
      setDescription("");
      setError(null);
      console.log("new dog added", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Dog</h3>
      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>Breed:</label>
      <input
        type="text"
        onChange={(e) => setBreed(e.target.value)}
        value={breed}
      />
      <label>Owner:</label>
      <input
        type="text"
        onChange={(e) => setOwner(e.target.value)}
        value={owner}
      />
      <label>Size:</label>
      <select onChange={(e) => setSize(e.target.value)} value={size}>
        <option value="">Select Size</option> {/* Default placeholder */}
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
      />
      <button>Add Dog</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
