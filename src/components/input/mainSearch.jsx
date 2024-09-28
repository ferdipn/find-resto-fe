const InputMainSearch = ({handleSearch}) => {
    return (
        <div className="flex items-center border border-gray-300 rounded-lg p-2 mb-8">
            <i className="fa fa-search text-gray-500 mr-2"></i>
            <input
                type="text"
                placeholder="Search"
                className="outline-none flex-1"
                onChange={handleSearch}
            />
        </div>
    )
}

export default InputMainSearch