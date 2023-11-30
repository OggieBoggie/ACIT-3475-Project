import './styles.css';
import Navbar from '../components/Navbar';
import Saveform from '../components/Saveform';
import { useState, useRef } from 'react';
import { OpenAI } from 'openai'


const apiKey = import.meta.env.VITE_API;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

export default function App() {

    const [imageUrl, setImageUrl] = useState("/");
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [imageTitle, setImageTitle] = useState("");

    let inputRef = useRef(null);

    async function imageGenerator() {
        // @ts-ignore
        if (inputRef.current.value === "") {
            return;
        }
        setLoading(true);
        try {
            const response = await openai.images.generate({
                model: "dall-e-3",
                // @ts-ignore
                prompt: inputRef.current.value,
                size: "1024x1024",
                quality: "standard",
                n: 1,
            });
            if (response.data && response.data.length > 0) {
                // @ts-ignore
                setImageUrl(response.data[0].url);
                // @ts-ignore
                setImageTitle(inputRef.current.value);
                if (response.data[0].revised_prompt) {
                    // @ts-ignore
                    inputRef.current.value = response.data[0].revised_prompt;
                }
            }
        } catch (error) {
            console.error("Failed to generate the image:", error);
        } finally {
            setLoading(false);
        }
    }

    const toggleForm = () => {
        setShowForm(prevState => !prevState);
    }

    return (
        <main className='flex flex-col m-auto items-center bg-custom-lightest min-h-screen'>
            <Navbar />
            <h1 className='text-4xl font-bold text-center text-custom-contrast m-6 pb-30'> Generate Image </h1>
            <div className='flex flex-col'>
                {imageUrl !== "/" &&
                    <div className='flex flex-col justify-center'>
                        <img src={imageUrl} alt="Generated Image" className='w-1/2 m-auto' />
                        <button className="bg-custom text-white px-5 py-2.5 border-none rounded cursor-pointer text-base font-bold uppercase my-2.5 transition-colors duration-500 ease-in-out hover:bg-purple-800" onClick={toggleForm}>
                            Save Image
                        </button>
                    </div>
                }
                <div className={loading ? 'loading-text' : 'loading-none'}>Loading ...</div>
            </div>
            <div className='search flex justify-around items-center mt-8'>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder='Enter what you want to see'
                    className='search-input bg-transparent outline-none border-none text-lg pl-36 mr-36' />
                <div className='generate flex items-center justify-center text-xl cursor-pointer' onClick={() => imageGenerator()}>
                    Generate
                </div>
            </div>
            {showForm && 
            <Saveform 
            url={imageUrl} title={imageTitle} closeForm={toggleForm}
            />}
        </main>
    )
}