import withAuth from "../hoc/withAuth"
import TranslationBox from "../components/Translation/TranslationBox"
import InputBox from "../components/Translation/InputBox"
import { useUser } from "../context/UserContext"
import { translationAdd } from "../api/translation"
import { storageSave } from "../utils/storage"
import { STORAGE_KEY_USER } from "../const/storageKeys"
import '../../src/components/Translation/translation.css';


const Translation = () => {

    const { user, setUser } = useUser()

    const handleTranslationClick = async (notes) => {
        const translation = notes.trim()

        const [error, updatedUser] = await translationAdd(user, translation) 
        if(error!==null) {
            return
        }

        storageSave(STORAGE_KEY_USER, updatedUser)
        setUser(updatedUser)

        console.log("Error", error)
        console.log("Result", updatedUser)
        
    }

    return (
        <>
            <section>
            <InputBox onTranslation={ handleTranslationClick }/>
            </section>
            <section>
            <TranslationBox/>
            </section>
        </>

    )
}
export default withAuth(Translation)