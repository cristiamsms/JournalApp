import React from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNotes, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {
    const dispatch = useDispatch()
    const {active} = useSelector(state => state.notes)
    const noteDate =moment(active.data);
    const handleSave=()=>{
        dispatch(startSaveNotes(active ))
    }
    const handlePicture=()=>{
        document.querySelector('#fileSelector').click() 
    }
    const hanleFileChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            dispatch(startUploading(file))
        }
    }
    return (
        <div className="notes__appbar">
            <span>{noteDate.format("dddd, MMMM Do YYYY")}</span>
            
            <input
                id="fileSelector"
                type="file"
                name ="file"
                style={{display:'none'}}
                onChange={hanleFileChange}
            />
            <div>

                <button className="btn"
                        onClick={handlePicture}>Picture</button>
                <button className="btn"
                        onClick={handleSave}>Save</button>

            </div>
            
        </div>
    )
}
