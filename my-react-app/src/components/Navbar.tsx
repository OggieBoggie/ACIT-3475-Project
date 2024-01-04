
export default function Navbar() {

  const webUrl = import.meta.env.VITE_WEB_URL;

    return (
        <nav className="flex flex-col w-full px-4 py-8 bg-custom-light border-b border-custom-lighter dark:bg-custom dark:border-custom sticky">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold text-left text-white mr-auto">Dream Albums</h1>
                <a href={`${webUrl}/`} className="text-align: right text-white pr-10">Home</a>
                <a href={`${webUrl}/generate/`} className="text-align: right text-white pr-10">Generate</a>
                <a href={`${webUrl}/upload/`} className="text-align: right text-white pr-10">Upload</a>
                <a href={`${webUrl}/view/`} className="text-align: right text-white pr-10">Views</a>
            </div>
        </nav>
    );
}