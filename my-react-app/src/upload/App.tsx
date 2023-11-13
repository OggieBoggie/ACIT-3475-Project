import './styles.css';
import Navbar from '../components/Navbar';
import SaveButton from '../components/Save';
import { useState } from 'react';

function App() {
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            setImage(null);
            setError('File type not supported. Please upload a JPEG or PNG file.');
            return;
        }
        const imageUrl = URL.createObjectURL(file);
        
        // @ts-ignore
        setImage(imageUrl);
        setError('');
    }
    return (
        <main className='min-h-screen bg-custom-lightest flex flex-col items-center justify center'>
            <Navbar />
            <h1 className='text-4xl font-bold text-center text-custom-contrast m-6 pb-30'> Upload Image </h1>
            <div className='p-4'>
                <input type="file"  accept="image/jpeg, image/png" onChange={handleImageChange} />
                {error && <p className="text-red-500">{error}</p>}
            </div>
            {image && (
                <div className='flex flex-col justify-center'>
                    <img src={image} alt="Uploaded Image" className='images' />
                    <SaveButton />
                </div>
            )}
        </main>
    )
}

export default App