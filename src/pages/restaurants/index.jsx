import axiosInstance from '../../utils/axiosConfig';
import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar/default";
import Pagination from '../../components/pagination';
import './index.css'
import InputSearchSecond from '../../components/input/secondSeach';
import SelectDate from '../../components/filter/dateSelect';
import InputTime from '../../components/input/time'
import TableRestaurant from '../../components/table/restaurant';

const Restaurant = () => {

    const initOperationHours = [
        {
            label: 'Monday',
            is_open: false,
            open: '',
            close: '',
            day: '1',
        },
        {
            label: "Tuesday",
            is_open: false,
            open: '',
            close: '',
            day: '2',
        },
        {
            label: "Wednesday",
            is_open: false,
            open: '',
            close: '',
            day: '3',
        },
        {
            label : "Thursday",
            is_open: false,
            open: '',
            close: '',
            day: '4',
        },
        {
            label: "Friday",
            is_open: false,
            open: '',
            close: '',
            day: '5',
        },
        {
            label: "Saturday",
            is_open: false,
            open: '',
            close: '',
            day: '6',
        },
        {
            label: "Sunday",
            is_open: false,
            open: '',
            close: '',
            day: '7',
        },
    ];

    const [searchTerm, setSearchTerm] = useState()
    const [selectedDayOptions, setSelectedDayOptions] = useState([])
    const [selectedfilterTime, setSelectedfilterTime] = useState()
    const [dataTable, setDataTable] = useState([])
    const [paginationLimit, setPaginationLimit] = useState(10)
    const [paginationCurrentPage, setPaginationCurrentPage] = useState(1)
    const [paginationTotal, setPaginationTotal] = useState(0)
    const [paginationTotalPages, setPaginationTotalPages] = useState(1)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [operationHours, setOperationHours] = useState(initOperationHours)
    const [restoName, setRestoName] = useState('')
    const [restoAddress, setRestoAddress] = useState('')

    const handleSearch = (e) => {
        setSearchTerm(value => e.target.value)
        setPaginationCurrentPage( prev => 1 )
    }

    const handleChangeFilterDay = (selected) => {
        const sortedSelected = selected ? selected.sort((a, b) => a.value - b.value) : [];
        setSelectedDayOptions(sortedSelected);
        setPaginationCurrentPage( prev => 1 )
    }

    const handleFilterTime = (e) => {
        setSelectedfilterTime(value => e.target.value)
        setPaginationCurrentPage( prev => 1 )
    }

    const handleChangePage = (value) => {
        setPaginationCurrentPage( prev => value )
    }

    const fetchtData = async () => {
        let params = {}
            params['search'] = searchTerm
            params['day'] = selectedDayOptions.map(item => item.value)
            params['time'] = selectedfilterTime
            params['limit'] = paginationLimit
            params['page'] = paginationCurrentPage

        const getRestaurants =  await axiosInstance.get('/open-data',  {params})

        setDataTable( prev => getRestaurants.data?.data)
        setPaginationTotal( prev => (getRestaurants.data?.pagination?.total))
        setPaginationTotalPages( prev => (getRestaurants.data?.pagination?.total_pages))
        setPaginationLimit( prev => (getRestaurants.data?.pagination?.per_page))
        setPaginationCurrentPage( prev => (getRestaurants.data?.pagination?.current_page))
    }

    useEffect(() => {
        const timeoutId = setTimeout( async() => {
            await fetchtData()
            // let params = {}

            // params['search'] = searchTerm
            // params['day'] = selectedDayOptions.map(item => item.value)
            // params['time'] = selectedfilterTime
            // params['limit'] = paginationLimit
            // params['page'] = paginationCurrentPage

            // let getRestaurants = await axiosInstance.get('/open-data',  {params})

            // setDataTable( prev => getRestaurants.data?.data)
            // setPaginationTotal( prev => (getRestaurants.data?.pagination?.total))
            // setPaginationTotalPages( prev => (getRestaurants.data?.pagination?.total_pages))
            // setPaginationLimit( prev => (getRestaurants.data?.pagination?.per_page))
            // setPaginationCurrentPage( prev => (getRestaurants.data?.pagination?.current_page))
        }, 500);
      
        return () => clearTimeout(timeoutId)
    }, [searchTerm, selectedDayOptions, selectedfilterTime, paginationCurrentPage, paginationLimit])

    const handleCloseModal = () => {
        setIsOpenModal(prev => false)
    }

    const handleOpenModal = () => {
        setIsOpenModal(prev => true)
    }

    const handleOperationHours = (e, day) => {
        const isChecked = e.target.checked

        setOperationHours(operationHours.map(operationHour => { 
            const openTime = isChecked ? operationHour.open : ''
            const closeTime = isChecked ? operationHour.close : ''

            return operationHour.day === day 
            ? { ...operationHour, 
                is_open : !operationHour.is_open,
                open: openTime,
                close: closeTime,   
            } : operationHour
        }))
    }

    const handleChangeRestoName = (e) => {
        setRestoName(prev => e.target.value)
    }

    const handleChangeRestoAddress = (e) => {
        setRestoAddress(prev => e.target.value)
    }

    const handleOpenTimeResto = (e, day) => {
        setOperationHours(operationHours.map(operationHour => 
            operationHour.day === day 
            ? { ...operationHour, open : e.target.value}
            : operationHour
        ))
    }

    const handleCloseTimeResto = (e, day) => {
        setOperationHours(operationHours.map(operationHour => 
            operationHour.day === day 
            ? { ...operationHour, close : e.target.value}
            : operationHour
        ))
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            const newData = {
                name: restoName,
                address: restoAddress,
                operation_hours: operationHours
            }

            const submitData = await axiosInstance.post('/restaurants', newData)

            if (submitData.data.error) {
                alert(submitData.data.message)
            } else {
                alert('Success Add data')

                setIsOpenModal(prev => false)

                setOperationHours(prev => initOperationHours)

                await fetchtData()
            }
        } catch (error) {
            alert('Failed Add data')
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <Navbar />

            <div className="py-2 px-4 mx-auto max-w-screen-xl lg:py-3 lg:px-6 ">
                
                <div className="relative shadow-md sm:rounded-lg">
                    <div className="flex justify-between p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        <div>
                            Restaurants
                            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list restaurants.</p>
                        </div>
                        <div className='item-end'>
                            <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" 
                                onClick={handleOpenModal}>Add Restaurant</button>
                        </div>
                    </div>
                    <div className="flex gap-3 p-5 justify-between mb-8 ">

                        <InputSearchSecond handleSearch={handleSearch}/>

                        <div className="flex gap-3">
                            <SelectDate 
                                handleChangeFilterDay={handleChangeFilterDay}
                                selectedDayOptions={selectedDayOptions}
                            />


                            <div className='w-[100px]'>
                                <InputTime 
                                    selectedfilterTime={selectedfilterTime} 
                                    handleFilterTime={handleFilterTime}
                                />
                            </div>
                        </div>
                    </div>

                    <TableRestaurant dataTable={dataTable} />

                    <Pagination 
                        itemPerPage={paginationLimit}
                        currentPage={paginationCurrentPage}
                        total={paginationTotal}
                        totalPages={paginationTotalPages}
                        handlePageChange={handleChangePage}
                    />

                    {isOpenModal &&

                    <div className="modal">
                    <form className="mx-auto w-[500px]" onSubmit={handleSumbit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">Add new restaurant</h2>
                            </div>
                            <div className="modal-body p-4">
                                <div className="form-group mb-4">
                                    <label htmlFor="restaurantName" 
                                        className="block text-gray-700 font-bold mb-2">
                                            Restaurant Name
                                    </label>
                                    <input type="text" 
                                        id="restaurantName"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        placeholder="Bro Burger" 
                                        required 
                                        onChange={handleChangeRestoName}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="address" 
                                        className="block text-gray-700 font-bold mb-2">
                                            Address
                                        </label>
                                    <textarea 
                                        id="address" 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        required 
                                        onChange={handleChangeRestoAddress}
                                        placeholder="jl. Jayu Jati no 14, Kec. Rawa sari"></textarea>
                                </div>
                                <div className="form-group mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Operation hours</label>

                                    {
                                        operationHours?.map((item, index) => (
                                            <div key={index} 
                                                className="operation-hours mb-2 flex justify-between">
                                                <div className="flex items-center">
                                                    <input type="checkbox" 
                                                        id={`is_open_${index}`} 
                                                        className="mr-2" 
                                                        onClick={(e) => handleOperationHours(e, item.day)} 
                                                    />
                                                    <label htmlFor={`is_open_${index}`} 
                                                        className="text-gray-700">{item.label}
                                                    </label>
                                                </div>
                                                <div className="flex justify-between gap-2">
                                                    <input
                                                        type="time"
                                                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        placeholder="jam buka"
                                                        disabled={!item.is_open}
                                                        onChange={(e) => handleOpenTimeResto(e, item.day)}
                                                        value={item.open}
                                                        required
                                                    />
                                                    <input
                                                        type="time"
                                                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        placeholder="jam tutup"
                                                        disabled={!item.is_open}
                                                        onChange={(e) => handleCloseTimeResto(e, item.day)}
                                                        value={item.close}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn-save">Save</button>
                                <button type="button" className="btn-close" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </form>
                    </div>

                    }
                </div>
            </div>
            
        </section>
    );
  };
  
export default Restaurant;