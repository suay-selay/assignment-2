import { storageDelete, storageSave } from "../../utils/storage";
import { useUser } from "../../context/UserContext";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { translationClearHistory } from "../../api/translation";

const ProfileActions = () => {

    const { user, setUser } = useUser()

    const handleLogoutClick = () => {
        if (window.confirm("Are you sure?")) {
            storageDelete(STORAGE_KEY_USER)
            setUser(null)
        }
    }

    const handleClearHistoryClick = async () => {
        if (!window.confirm("Are you sure?\nThis can not be undone!")) {
            return
        }
        const [ clearError ] = await translationClearHistory(user.id)
        
        if (clearError !== null) {
            return
        }
        
        const updatedUser = {
            ...user, 
            translations: []
        }

        storageSave(updatedUser)
        setUser(updatedUser)
    }

    return (
        <ul>
            <button className="clearHistoryButton" onClick={ handleClearHistoryClick }>Clear history</button>
            <button className="logoutButton" onClick={ handleLogoutClick }>Logout</button>
        </ul>
    )
}

export default ProfileActions