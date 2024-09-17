import { useState, useEffect } from "react";
import "./DogGallery.css";

export default function DogGallery() {
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    const fetchDogImages = async () => {
      try {
        const response = await fetch(
          "https://dog.ceo/api/breeds/image/random/30"
        );
        const data = await response.json();
        // images in message field
        setDogImages(data.message);
      } catch (error) {
        console.error("Error fetching dog images", error);
      }
    };

    fetchDogImages();
  }, []);

  return (
    <div className="container">
      <div className="image-grid">
        {dogImages.map((src, index) => (
          <div key={index} className="image-container">
            <img src={src} alt={`Dog ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
