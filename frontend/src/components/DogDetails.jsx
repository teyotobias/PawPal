export default function DogDetails({ dog, dogs, setDogs }) {
  const handleClick = async () => {
    const response = await fetch("/api/dogs/" + dog._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      setDogs(dogs.filter((d) => d._id != dog._id));
    }
  };
  return (
    <div className="dog-details">
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
      <span onClick={handleClick} className="material-symbols-outlined">
        delete
      </span>
    </div>
  );
}
