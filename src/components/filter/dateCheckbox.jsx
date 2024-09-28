const DateCheckbox = ({handleFilterDay}) => { 
    const daysOfWeek = [
        {
            label: "Mon",
            value: 1
        },
        {
            label: "Tue",
            value: 2
        },
        {
            label: "Wed",
            value: 3
        },
        {
            label: "Thu",
            value: 4
        },
        {
            label: "Fri",
            value: 5
        },
        {
            label: "Sat",
            value: 6
        },
        {
            label: "Sun",
            value: 7
        },
    ];
    return (
        <div className="flex">
            <div className="w-[15%] text-left">
                <label>Day :</label>
            </div>

            <div className="flex gap-4 mb-3 flex-wrap">
                {daysOfWeek.map(item => (
                        <div className="flex" key={`day-${item.value}`}>
                                <input type="checkbox" 
                                    name={item.value} 
                                    className="mr-2" 
                                    value={item.value}
                                    onChange={handleFilterDay}/>
                                <label 
                                    className="text-gray-500">
                                    {item.label}
                                </label>
                        </div>
                ))}
            </div>
        </div>
    )
}

export default DateCheckbox