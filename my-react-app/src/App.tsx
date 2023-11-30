import Navbar from './components/Navbar';
import './styles.css';

export default function App() {
  const webUrl = import.meta.env.VITE_WEB_URL;
  
  return (
    <main className='bg-custom-lightest min-h-screen'>
      <Navbar />
      <section className='text-center p-10'>
        <h2 className='text-4xl font-bold text-custom-contrast mb-6'> Welcome to Dream Albums</h2>
        <p className='text-lg text-custom-contrast mb-4'>
            A place where you can create, save and manage your images.
        </p>
        <p className='text-lg text-custom-contrast mb-8'>
          Generate photos from various APIs, save your favorite images, or upload and view from your collection.
        </p>
        <div className="space-x-4">
          <a href={`${webUrl}/generate/`} className="bg-custom text-white font-bold py-2 px-4 rounded">
            Generate Images
          </a>
          <a href={`${webUrl}/upload/`} className="bg-custom text-white font-bold py-2 px-4 rounded">
            Upload Images
          </a>
          <a href={`${webUrl}/view/`} className="bg-custom text-white font-bold py-2 px-4 rounded">
            View Gallery
          </a>
        </div>
      </section>
    </main>
  );
}
