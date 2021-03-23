import './Pagination.css'
import _ from 'lodash'
import {useDispatch, useSelector} from "react-redux";
import {setUsersFragment} from "../../../redux/table-reducer";
import {useEffect} from "react";
import {Link} from "react-router-dom";

export const Pagination = () => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.table.usersFiltering);

    useEffect(
        () => {
            setPages(1);

        }
        , [users])

    const rowCount = 10;
    const pageCount = Math.ceil(users.length / rowCount);
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    const setPages = (page) => {
        const usersData = [...users];
        const displayData = _.chunk(usersData, rowCount);
        dispatch(setUsersFragment(displayData[page - 1]));
    }


    return (<div className="pagination">
            {pages.length > 1 &&
            pages.map(page => {
                return <Link to='/' key={page} onClick={() => {
                    setPages(page)
                }} className="pagination__item">{page}</Link>
            })}
        </div>
    )
}