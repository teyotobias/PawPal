export default function DogDetails({ dog }) {
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
    </div>
  );
}
