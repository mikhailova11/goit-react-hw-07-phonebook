
import {React } from "react";
import s from "./ContactList.module.css";
import { deleteContact} from '../../redux/store'
import { useDispatch, useSelector } from "react-redux";

const getVisible = state => {

    const items =  state.contacts.items;
    const filter = state.contacts.filter;

   const normalizedFilter = filter.toLowerCase();
 
   return items.filter(({ name }) =>
     name.toLowerCase().includes(normalizedFilter))
}

export default function ContactList () {

    const contacts = useSelector( getVisible);
    const dispatch = useDispatch();
    

        return ( 
        <form>
        <ul className={s.list}>
            {contacts.map(({name, id, number}) => ( 
                <li key={id} className={s.item}>
                    <span>{name}</span>
                    <span>{number}</span>
                    
                    <div className={s.btn}>
                        <button className={s.button} type="button" onClick={() => dispatch(deleteContact(id))}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
        </form>
   )
}
