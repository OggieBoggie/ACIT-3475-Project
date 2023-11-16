import './styles.css';
import Navbar from '../components/Navbar';
import Saveform from '../components/Saveform';
import { useState, useEffect } from 'react';

export default function App() {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                const imageUrl = URL.createObjectURL(file);
                const fileName = file.name.replace(/\.[^/.]+$/, "");
                setFile(file);
                setTitle(fileName);
                setImageUrl(imageUrl);
                setError('');
            } else {
                setFile(null);
                setImageUrl(null);
                setError('File type not supported. Please upload a JPEG or PNG file.');
                setTitle('');
            }
        }
    };

    useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    const toggleForm = () => {
        setShowForm(prevState => !prevState);
    };

    return (
        <main className='min-h-screen bg-custom-lightest flex flex-col items-center justify center'>
            <Navbar />
            <h1 className='text-4xl font-bold text-center text-custom-contrast m-6 pb-30'> Upload Image </h1>
            <div className='p-4'>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {error && <p className="text-red-500">{error}</p>}
            </div>
            {imageUrl && (
                <div className='flex flex-col justify-center'>
                    <img src={imageUrl} alt="Uploaded Image" className='images' />
                    <button className="bg-custom text-white px-5 py-2.5 border-none rounded cursor-pointer text-base font-bold uppercase my-2.5 transition-colors duration-500 ease-in-out hover:bg-purple-800" onClick={toggleForm}>
                        Save Image
                    </button>
                </div>
            )}
            {showForm &&
                <Saveform
                    file={file} title={title} closeForm={toggleForm}
                />}
        </main>
    )
}
