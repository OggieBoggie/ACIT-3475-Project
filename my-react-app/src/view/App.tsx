import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Navbar";

type Image = {
  _id: string;
  url: string;
  title: string;
  author: string;
  description: string;
  date: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [searchContents, setSearchContents] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContents(event.target.value);
  };
  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().startsWith(searchContents.toLowerCase())
  );
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<Image[]>(
          apiUrl
        );
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <main className="min-h-screen bg-custom-lightest items-center justify-center">
      <Sidebar />
      <input
        type="text"
        id="search-bar"
        className="p-1 border border-gray-300 focus:outline-none ml-4 mt-4"
        placeholder="Title Name"
        onChange={handleSearchChange}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 m-4">
        {filteredImages.map((image) => (
          <div
            key={image._id}
            className="inline-flex flex-col max-w-sm rounded overflow-hidden shadow-lg border border-gray-300"
          >
            <img src={image.url} alt={image.title} className="w-full h-auto object-cover" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-1">{image.title}</div>
              <p className="text-gray-700 text-base">Created By: {image.author}</p>
              <p className="text-gray-700 text-base">{image.description}</p>
              <p className="text-gray-700 text-base">Date Created: {image.date.slice(0, 10)}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
