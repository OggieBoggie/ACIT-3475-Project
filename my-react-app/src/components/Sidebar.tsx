export default function Sidebar() {
    return (
        <div className="flex flex-col w-full px-4 py-8 bg-blue-100 border-b border-blue-200 dark:bg-blue-400 dark:border-blue-400">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold text-left text-white mr-auto">Images Application</h1>
                <a href="http://localhost:5173/testing/" className="text-align: right text-white pr-10">Testing</a>
                <a href="http://localhost:5173/testing/" className="text-align: right text-white pr-10">Generate</a>
                <a href="http://localhost:5173/testing/" className="text-align: right text-white pr-10">Upload</a>
                <a href="http://localhost:5173/testing/" className="text-align: right text-white pr-10">Views</a>
            </div>
        </div>
    );
}