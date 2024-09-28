import React, {useState, useEffect} from "react";
import 'font-awesome/css/font-awesome.min.css';
import axiosInstance from '../../utils/axiosConfig';
import Navbar from "../../components/navbar/default";
import InputMainSearch from "../../components/input/mainSearch";
import DateCheckbox from "../../components/filter/dateCheckbox";

import './index.css'
import InputTime from "../../components/input/time";
import ListCard from "../../components/list/Card";


const Home = () => {

    const [selectedfilterTime, setSelectedFilterTime] = useState("07:00");
    const [selectedDay, setSelectedDay] = useState('');
    const [restaurants, setRestaurants] = useState([]);;
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout( async() => {
            let params = {}

            params['search'] = searchTerm
            params['day'] = selectedDay
            params['time'] = selectedfilterTime

            let getRestaurants = await axiosInstance.get('/open-data', {params})

            setRestaurants(getRestaurants.data?.data)
        }, 500);
      
        return () => clearTimeout(timeoutId)
    }, [searchTerm, selectedDay, selectedfilterTime]);

    const handleSearch = (e) => {
        let searchValue = e.target.value
        setSearchTerm(searchValue)
    }

    const handleFilterDay = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedDay([...selectedDay, value])
        } else {
            setSelectedDay(selectedDay.filter((item) => item !== value))
        }

    }
    
    const handleFilterTime = (e) => {
        let searchValue = e.target.value
        setSelectedFilterTime(searchValue)
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <Navbar />

            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Find Resto</h2>
                    <p className="font-light text-gray-500 mb-8 sm:text-xl dark:text-gray-400">Explore best restaurant in the town</p>
                    
                    <div className="mb-2 shadow">
                        <div className="bg-white rounded-lg p-4">

                            <InputMainSearch  handleSearch={handleSearch}/>

                            <h1 className="text-left block text-gray-700 font-bold mb-4">Filter Operation Hours:</h1>

                            <DateCheckbox handleFilterDay={handleFilterDay} />

                            <div className="flex item-start">
                                <div className="w-[15%] text-left">
                                    <label>Hours :</label>
                                </div>
                                <InputTime 
                                    selectedfilterTime={selectedfilterTime} 
                                    handleFilterTime={handleFilterTime}
                                />
                            </div>

                            <ListCard data={restaurants}/>
                        </div>
                    </div>
                </div>  
            </div>
        </section>
    )
}

export default Home