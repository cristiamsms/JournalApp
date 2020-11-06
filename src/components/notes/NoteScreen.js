import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, StartDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const {active:note} = useSelector(state => state.notes) ;
    const [value,handleInputChange,reset]=useForm(note);
    const {body,title,id}=value;
    const activeId=useRef(note.id);
    const dispatch = useDispatch();
    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id  
        }
    }, [note,reset])
    useEffect(() => {
        dispatch(activeNote(value.id,{...value }))
        
    }, [value,dispatch])
    const handleDelete =()=>{
        dispatch(StartDelete(id));
    }
    return (
        <div className="notes__main-content">
                <NotesAppBar/>
                <div className="notes__content">
                    <input
                        type="text"
                        placeholder="Escriba el titulo"
                        className="note__title-input"
                        autoComplete="off"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        placeholder="¿que hiciste hoy?"
                        className="note__textarea"
                        name="body"
                        value={body}
                        onChange={handleInputChange}
                    ></textarea>
                    {
                        (note.url)
                        &&
                        (<div className="note__image">
                        <img
                            src={note.url}
                            alt="imagen"
                        />
                        </div>)}
                </div>
                <button className="btn btn-danger"
                        onClick={handleDelete}>Borrar</button>
        </div>
    )
}
