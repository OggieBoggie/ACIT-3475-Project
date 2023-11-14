import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Navbar';

type Image = {
  _id: string;
  url: string;
  title: string;
};

function App() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<Image[]>('http://localhost:8000/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <main className="min-h-screen bg-custom-lightest items-center justify-center">
      <Sidebar />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 m-4'>
        {images.map((image) => (
          <div key={image._id} className='max-w-sm rounded overflow-hidden shadow-lg'>
            <img src={image.url} alt={image.title} className="w-full" />
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{image.title}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
