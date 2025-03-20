export default function ForumCard() {
    return (
        <div className="max-w-xl mx-auto p-6 bg-white border-t border-gray-700">
            <h2 className="text-sm font-bold mb-3 text-left">
                Do you believe the government should play a larger role in regulating the economy?
            </h2>
            <p className="text-black mb-4 text-xs font-li text-left">
                This question examines the respondent’s perspective on the government’s role in regulating the
                economy.
                It seeks to understand whether they believe increased government intervention—such as stricter
                regulations
            </p>
            <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
                    <span className="text-sm">⬆️</span>
                    <span className="ml-2 text-gray-700 font-medium">20</span>
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
                    <span className="text-sm">💬</span>
                    <span className="ml-2 text-gray-700 font-medium">35</span>
                </button>
                <button className="ml-auto text-gray-500 hover:text-gray-700">↗️</button>
            </div>
        </div>

    )
}