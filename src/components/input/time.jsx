const InputTime = ({selectedfilterTime, handleFilterTime}) => {
    return (
        <div>
            <i className="fa fa-time text-gray-500"></i>
            <input 
                type="time"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" 
                value={selectedfilterTime} 
                onChange={handleFilterTime}
            />
        </div>
    )
}

export default InputTime