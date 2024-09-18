import { useEffect, useState } from "react";
import DogDetails from "../components/DogDetails";
import DogForm from "../components/DogForm";

const Home = () => {
  const [allDogs, setAllDogs] = useState([]); // State to hold all dogs
  const [filteredDogs, setFilteredDogs] = useState([]); // State to hold filtered dogs
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState(""); // State to track sorting criteria

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await fetch("/api/dogs");
      const json = await response.json();
      if (response.ok) {
        setAllDogs(json); // Store all dogs
        setFilteredDogs(json); // Initially, all dogs are displayed
      }
    };

    fetchDogs();
  }, []);

  // Handle filtering in real-time as the user types
  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchTerm(search);
    if (search) {
      const filtered = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(search)
      );
      setFilteredDogs(filtered);
    } else {
      setFilteredDogs(allDogs); // Reset to show all dogs if search is cleared
    }
  };
  // sort dogs
  const handleSort = (e) => {
    const criteria = e.target.value;
    setSortCriteria(criteria); // Update sorting criteria

    if (criteria === "default") {
      // If "Default" is selected, return to the original order (allDogs)
      setFilteredDogs(allDogs);
    } else {
      let sortedDogs = [...filteredDogs];
      if (criteria === "name") {
        sortedDogs.sort((a, b) => a.name.localeCompare(b.name));
      } else if (criteria === "breed") {
        sortedDogs.sort((a, b) => a.breed.localeCompare(b.breed));
      }
      setFilteredDogs(sortedDogs);
    }
  };

  return (
    <div className="home">
      {/* Search bar and button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch} // Filtering happens as user types
          className="search-bar"
        />
        <div className="sort-container">
          <label htmlFor="sort" className="sort-label">
            Sort by:
          </label>
          <select
            id="sort"
            className="sort-dropdown"
            value={sortCriteria}
            onChange={handleSort}
          >
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="breed">Breed</option>
          </select>
        </div>
      </div>

      {/* Display filtered dogs */}
      <div className="dogs">
        {filteredDogs.length > 0 ? (
          filteredDogs.map((dog) => (
            <DogDetails
              key={dog._id}
              dog={dog}
              dogs={filteredDogs}
              setDogs={setFilteredDogs}
              allDogs={allDogs}
              setAllDogs={setAllDogs}
            />
          ))
        ) : (
          <p>No dogs found matching your search.</p>
        )}
      </div>

      {/* Pass setAllDogs and setFilteredDogs to DogForm */}
      <DogForm
        setAllDogs={setAllDogs}
        setFilteredDogs={setFilteredDogs}
        allDogs={allDogs}
      />
    </div>
  );
};

export default Home;
