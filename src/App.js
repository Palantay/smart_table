import './App.css';
import {Table} from "./components/Table";
import {useDispatch, useSelector} from "react-redux";
import {Preloader} from "./components/common/Preloader/Preloader";
import {getUsersThunk} from "./redux/table-reducer";
import {useEffect} from "react";
import {Search} from "./components/common/Search/Search";
import {Pagination} from "./components/common/Pagination/Pagination";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(getUsersThunk());
        }, []
    )
    const load = useSelector((state) =>state.table.isLoaded)

    if (!load) {return <Preloader /> }

    return (
        <div className="App">
            <div className="container">
                <div className="info"> Интерактиваня таблица. При нажатии на название столбца строки
                    таблицы сортируются по возрастанию, при повторном клике - по убыванию
                    Имеется поиск по полям "First Name", "Last Name", "Age".
                </div>
                <Search/>
                <Table />
                <Pagination />
            </div>
        </div>
    )
}

export default App;
