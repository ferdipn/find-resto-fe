const InputSearchSecond = ({handleSearch}) => {
    return (
        <div className="flex items-center border p-2 border-gray-300 rounded-lg w-[400px]">
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

export default InputSearchSecond