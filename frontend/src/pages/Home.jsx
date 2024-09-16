import { useEffect, useState } from "react";
import DogDetails from "../components/DogDetails";

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
  }, []);

  return (
    <div className="home">
      <div className="dogs">
        {dogs && dogs.map((dog) => <DogDetails key={dog._id} dog={dog} />)}
      </div>
    </div>
  );
};

export default Home;
