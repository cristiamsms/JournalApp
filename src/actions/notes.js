import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNote";
import { types } from "../types/types";







export const startNewNote = ()=>{
    return async(dispatch,getState)=>{

        const uid=getState().auth.uid;

        const newNote={
            title:'',
            body:'',
            date:new Date().getTime()
        }
        const doc=await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch(activeNote(doc.id,newNote));
        dispatch(addNewNote(doc.id,newNote));


    }
}
export const activeNote = (id,note)=>({
    type:types.notesActive,
    payload:{
        id,
        ...note
    }
})

export const addNewNote=(id,note)=>({
 type:types.notesAddNew,
 payload:{id,...note}
})

export const startLoadingNote = (uid)=>{
    return async(dispatch)=>{

        const notes= await loadNotes(uid)
        dispatch(setNotes(notes));
    }

}

export const setNotes =(notes)=>({
    type:types.notesLoad,
    payload:notes
});
export const startSaveNotes =(notes)=>{

    return async(dispatch,getState)=>{
        const uid=getState().auth.uid;
        if(!notes.url){
            delete notes.url;
        }
        const noteToFireStore ={...notes}
        delete noteToFireStore.id;
        await db.doc(`${uid}/journal/notes/${notes.id}`).update(noteToFireStore);
        dispatch(refreshNote(notes.id,noteToFireStore));
        Swal.fire('Saved',notes.title,'success');
        
    }
}
export const refreshNote=(id,note)=>({
    type:types.notesUpdated,
    payload:{
        id,
        note:{id,...note}
    }
})
export const startUploading =(file)=>{
    return async(dispatch,getState)=>{
        const {active:activeNote}=getState().notes;
        Swal.fire({
            title:'Uploading...',
            text:'Please wait...',
            allowOutsideClick: false,
            willOpen: ()=>{
                Swal.showLoading();
            }
        })
        const fileUrl= await fileUpload(file);
        activeNote.url=fileUrl
        dispatch(startSaveNotes(activeNote))
        Swal.close();
    }
}
export const StartDelete =(id)=>{
    return async(dispatch,getState)=>{
        const uid=getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(deleteNote(id));
    }
}
export const deleteNote=(id)=>({
    type:types.notesDelete,
    payload:id
})
export const noteLogout=() =>({
    type:types.notesLogoutCleaning

})