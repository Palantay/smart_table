import './Search.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setUsersFilter} from "../../../redux/table-reducer";


export const Search = () => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.table.users);

    let [valueInput, setValueInput] = useState('')

    useEffect(() => {
        const searchTable = () => {
            const usersData = [...users];

            const usersFiltering = usersData.filter(user => {
                return user['firstName'].toLowerCase().includes(valueInput.toLowerCase()) ||
                    user['lastName'].toLowerCase().includes(valueInput.toLowerCase())
                    || user['age'].toString().includes(valueInput)
            })

            dispatch(setUsersFilter(usersFiltering));
        }

        searchTable();

    }, [valueInput, users])


    return (
        <input onChange={(e) => {
            setValueInput(e.target.value)
        }}
               value={valueInput} placeholder='Search'/>
    )


}