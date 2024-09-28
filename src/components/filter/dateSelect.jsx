import Select from 'react-select'

const SelectDate = ({handleChangeFilterDay, selectedDayOptions}) => {
    
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
    <div className="flex flex-col items-center">
            <Select
                placeholder="Filter Day"
                className="w-80 max-w-80"
                options={daysOfWeek} 
                isMulti
                onChange={handleChangeFilterDay}
                styles={{
                    valueContainer: (base) => ({
                        ...base,
                        flexWrap: 'nowrap',
                        height: '40px'
                    })
                }}
                value={selectedDayOptions}
            /> 
        </div>
    )
}

export default SelectDate