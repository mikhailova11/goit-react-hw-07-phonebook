
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";
import s from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "redux/operation";



export default function App() {
  const contacts = useSelector(state => state.contacts.items)
  const dispatch = useDispatch();

  useEffect(()=>{dispatch(fetchContacts())},[dispatch])
 
  return (
    <div className={s.container}>
        <h2 className={s.title}>Phonebook</h2>
        <ContactForm />

        
        {contacts.length  > 0 && 
        <>
        <h2 className={s.title}>Contacts</h2>
        <Filter />
        <ContactList/>
        </> }

    </div>
    
)

  
 }