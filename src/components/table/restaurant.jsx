const TableRestaurant = ({dataTable}) => {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th></th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Operation Hours
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    dataTable.map( (item, index) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                            <th scope="row" 
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {index + 1}
                            </th>
                            <td className="px-6 py-4">
                                {item.name}
                            </td>
                            <td className="px-6 py-4">
                                {item.address}
                            </td>
                            <td className="px-6 py-4">
                                {item.is_active ? "Active"  : "In Active"}
                            </td>
                            <td className="px-6 py-4">
                                {item.schedule_label}
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    )
}

export default TableRestaurant