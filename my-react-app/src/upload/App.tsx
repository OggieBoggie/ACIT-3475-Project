import './styles.css';
import Navbar from '../components/Navbar';
import Saveform from '../components/Saveform';
import { useState } from 'react';

function App() {
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            setImage(null);
            setError('File type not supported. Please upload a JPEG or PNG file.');
            setTitle('');
            return;
        }
        const imageUrl = URL.createObjectURL(file);
        const fileName = file.name.replace(/\.[^/.]+$/, "");

        setTitle(fileName);
        // @ts-ignore
        setImage(imageUrl);
        setError('');
    }

    const toggleForm = () => {
        setShowForm(prevState => !prevState);
    }

    return (
        <main className='min-h-screen bg-custom-lightest flex flex-col items-center justify center'>
            <Navbar />
            <h1 className='text-4xl font-bold text-center text-custom-contrast m-6 pb-30'> Upload Image </h1>
            <div className='p-4'>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {error && <p className="text-red-500">{error}</p>}
            </div>
            {image && (
                <div className='flex flex-col justify-center'>
                    <img src={image} alt="Uploaded Image" className='images' />
                    <button className="bg-custom text-white px-5 py-2.5 border-none rounded cursor-pointer text-base font-bold uppercase my-2.5 transition-colors duration-500 ease-in-out hover:bg-purple-800" onClick={toggleForm}>
                        Save Image
                    </button>
                </div>
            )}
            {showForm && 
            <Saveform 
            url={image} title={title} closeForm={toggleForm}
            />}
        </main>
    )
}

export default App;