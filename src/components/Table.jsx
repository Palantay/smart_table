import {useDispatch, useSelector} from "react-redux";
import './Table.css'
import _ from 'lodash'
import {setUsersSorting} from "../redux/table-reducer";
import {useEffect, useState} from "react";

export const Table = () => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.table.users);
    const usersFragment = useSelector((state) => state.table.usersFragment);

    const [sortingPosition, setSortingPosition] = useState(null);
    const [sortedField, setSortedField] = useState(null);

    useEffect(() => {

        const sorted = () => {
            const usersData = [...users];

            if (sortedField) {
                const orderData = _.orderBy(usersData, [sortedField], [sortingPosition]);
                dispatch(setUsersSorting(orderData));
            }
        }

        sorted();

    }, [sortedField, sortingPosition])


    const shiftSortingPosition = (field) => {
        field === sortedField && sortingPosition === 'asc' ? setSortingPosition('desc')
            : setSortingPosition('asc');
    }

    const setParams = (field) => {
        setSortedField(field);
        shiftSortingPosition(field);
    }

    const getClassName = (field) => {
        return field === sortedField ? 'smart-table__title ' + sortingPosition
            : 'smart-table__title'
    }

    return (
        <table className="smart-table">
            <thead>
            <tr>
                <th tabIndex={0} className={getClassName('firstName')} onClick={() => {
                    setParams('firstName')
                }}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && setParams('firstName')

                    }}>First Name
                </th>
                <th tabIndex={0} className={getClassName('lastName')} onClick={() => {
                    setParams('lastName')
                }}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && setParams('lastName')
                    }}>Last Name
                </th>
                <th tabIndex={0} className={getClassName('gender')} onClick={() => {
                    setParams('gender')
                }}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && setParams('gender')
                    }}>Gender
                </th>
                <th tabIndex={0} className={getClassName('age')} onClick={() => {
                    setParams('age')
                }}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && setParams('age')
                    }}>Age
                </th>
                <th tabIndex={0} className={getClassName('email')} onClick={() => {
                    setParams('email')
                }}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && setParams('email')
                    }}>E-mail
                </th>
                <th tabIndex={0} className={getClassName('phone')} onClick={() => {
                    setParams('phone')
                }}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && setParams('phone')
                    }}>Phone
                </th>
            </tr>
            </thead>
            <tbody>

            {usersFragment.map(user => (
                <tr key={user.email + user.phone}>
                    <td className="smart-table__cell">{user.firstName}</td>
                    <td className="smart-table__cell">{user.lastName}</td>
                    <td className="smart-table__cell">{user.gender}</td>
                    <td className="smart-table__cell">{user.age}</td>
                    <td className="smart-table__cell">{user.email}</td>
                    <td className="smart-table__cell">{user.phone}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}