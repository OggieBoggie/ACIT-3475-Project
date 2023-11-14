import { useState } from 'react';

export default function Saveform (props: any) {
    const { url, title, closeForm } = props
    const [imageInfo, setImageInfo] = useState({
        url: url,
        title: title,
        author: '',
        description: '',
    })

    const handleChange = (event: any) => {
        const {name, value } = event.target
        setImageInfo({
            ...imageInfo,
            [name]: value
        })
    }
    const handleSubmit = (event: any) => {
        event.preventDefault()
        const submittedInfo = {
            ...imageInfo,
            date: new Date().toISOString()
        }
        console.log(submittedInfo)
        closeForm()
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
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