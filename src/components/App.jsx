
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";
import s from "./App.module.css";



export default function App() {

  return (
    <div className={s.container}>
        <h2 className={s.title}>Phonebook</h2>
        <ContactForm />

        <h2 className={s.title}>Contacts</h2>
        <Filter />
        <ContactList/>

    </div>
    
)

  
 }