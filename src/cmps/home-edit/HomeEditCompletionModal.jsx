import { useNavigate } from "react-router"
import { goToHomeEditStart } from "../../store/actions/home-edit.actions"

export function HomeEditCompletionModal({potentialHome, closeHomeEditCompletionModal, addHome, clearPotentialHome}){
    const navigate = useNavigate()
    const { editProgress, ...homeToSave } = potentialHome
    
    async function onPublishListing(){
        
        try {
            await addHome(homeToSave)
        } catch(err){
            console.error('Cannot publish home', err)
        } finally {
            clearPotentialHome()
            navigate('/hosting')
            closeHomeEditCompletionModal()
        }
        
    }

    function onEditListing(){
        goToHomeEditStart()
        navigate('/hosting/edit')
        closeHomeEditCompletionModal()
    }
    
    return(
        <div className="home-edit-completion-modal-container">
            <div className="home-edit-completion-modal-wrapper">
                <h3>You’re just about done! </h3>
                <p>Want to publish your listing now, or go back and review the details?</p>
                <div className="home-edit-completion-modal-buttons-container">
                    <button onClick={onPublishListing}>Publish listing</button>
                    <button onClick={onEditListing}>Edit listing</button>
                </div>
            </div>
        </div>
    )
}