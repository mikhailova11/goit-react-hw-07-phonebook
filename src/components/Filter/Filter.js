
import s from "./Filter.module.css";
import { useDispatch, useSelector } from 'react-redux';
import {filterChange} from '../../redux/store';


export default function Filter() {

    const value = useSelector(state=>state.contacts.filter);
    const dispatch = useDispatch();
    

    return (
        <label className={s.label}>
        Find contacts by name
        <input className={s.input}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        value={value}
                        onChange={(event) =>{dispatch(filterChange(event.target.value))}}
                        />
        </label>

    )
}


