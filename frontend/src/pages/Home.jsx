import { useEffect, useState } from "react";
import DogDetails from "../components/DogDetails";
import DogForm from "../components/DogForm";

const Home = () => {
  const [dogs, setDogs] = useState(null);

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await fetch("/api/dogs");
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setDogs(json);
      }
    };

    fetchDogs();
  }, [dogs]);

  return (
    <div className="home">
      <div className="dogs">
        {dogs &&
          dogs.map((dog) => (
            <DogDetails key={dog._id} dog={dog} dogs={dogs} setDogs={setDogs} />
          ))}
      </div>
      <DogForm />
    </div>
  );
};

export default Home;
