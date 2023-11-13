
export default function Navbar() {
    return (
        <nav className="flex flex-col w-full px-4 py-8 bg-custom-light border-b border-custom-lighter dark:bg-custom dark:border-custom">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold text-left text-white mr-auto">Dream Albums</h1>
                <a href="http://localhost:5173/" className="text-align: right text-white pr-10">Home</a>
                <a href="http://localhost:5173/generate/" className="text-align: right text-white pr-10">Generate</a>
                <a href="http://localhost:5173/upload/" className="text-align: right text-white pr-10">Upload</a>
                <a href="http://localhost:5173/view/" className="text-align: right text-white pr-10">Views</a>
            </div>
        </nav>
    );
}