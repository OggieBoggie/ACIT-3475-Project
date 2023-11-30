import { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export default function Saveform (props: any) {
    const { url, file, title, closeForm } = props
    const [imageInfo, setImageInfo] = useState({
        title: title,
        author: '',
        description: '',
    })

    const [error, setError] = useState('')

    const handleChange = (event: any) => {
        const {name, value } = event.target
        setImageInfo({
            ...imageInfo,
            [name]: value
        })
    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!imageInfo.title || !imageInfo.author) {
            setError('Please enter values for the title and author fields');
            return;
        }

        const formData = new FormData();
        if (file) {
            // If a file is provided, append it to FormData
            formData.append('file', file);
        } else {
            // If no file is provided, but a URL is, append the URL
            formData.append('url', url);
        }
        formData.append('title', imageInfo.title);
        formData.append('author', imageInfo.author);
        formData.append('description', imageInfo.description);

        try {
            const response = await axios({
                method: 'post',
                url: `${apiUrl}/images`,
                data: file ? formData : { ...imageInfo, url: url }, 
                headers: file ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' },
            });

            closeForm();
        } catch (error) {
            setError('Error saving image info');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="relative container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
                <button
                    type="button"
                    className="absolute top-0 right-0 mr-2 text-2xl font-semibold text-gray-700 hover:text-gray-900"
                    onClick={closeForm}
                >
                    &times;
                </button>
                <form className="p-4 bg-white rounded-lg" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title"
                            value={imageInfo.title}
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
                        <input 
                            type="text" 
                            id="author" 
                            name="author"
                            value={imageInfo.author}
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea 
                            id="description" 
                            name="description"
                            value={imageInfo.description}
                            onChange={handleChange} 
                            className="w-full h-24 px-3 py-2 border rounded text-gray-700 focus:outline-none focus:border-purple-500"
                        ></textarea>
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-2">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-purple-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-purple-700 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                            onClick={handleSubmit}
                        >
                            Save Image Info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}