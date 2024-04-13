import React, { SetStateAction, useCallback, useEffect, useState} from 'react';
import "quill/dist/quill.snow.css"
import Quill from "quill";
import {io} from 'socket.io-client'
import {Socket} from 'socket.io-client'
import {DefaultEventsMap} from "@socket.io/component-emitter"
import { useParams } from 'react-router-dom';

   
const SAVE_INTERVAL_MS = 2000


const TOOLBAR_OPTIONS=[
    [{header:[1,2,3,4,5,6,false]}],
    [{font:[]}],
    [{list:"ordered"},{list:"bullet"}],
    ["bold", "italic", "underline"],
    [{color:[]}, {background:[]}],
    [{script:"sub"},{script:"super"}],
    [{align:[]}],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

export default function TextEditor(){
    const {id: documentId} = useParams()
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
    const [quill, setQuill] = useState<any>(null)
    console.log(documentId)

    useEffect(()=>{
        
    const s = io("http://localhost:3001")
        setSocket(s)
        return () => {
            s.disconnect()
        }

    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return
        socket.once("load-document", document =>{
            quill.setContents(document)
            quill.enable()
        })
        socket.emit('get-document', documentId)
    },[socket, quill, documentId])

useEffect(() => {
    if (socket == null || quill == null) return
    const interval = setInterval(()=>{
        socket.emit('save-document', quill.getContents())

    }, SAVE_INTERVAL_MS)

    return () => {
        clearInterval(interval)
    }
}, [socket, quill])

   useEffect(() => {
        if (socket == null || quill == null) return
         const handler = (delta:Object, oldDelta:Object, source:string) => {
            if (source !== 'user') return 
            socket.emit("send-changes", delta)
        }
        quill.on('text-change',handler)

        return() => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])


    useEffect(() => {

        if (socket == null || quill == null) return

        const handler = (delta:Object) => {
            quill.updateContents(delta)
        }
        socket.on('receive-change', handler)

        return () => {
            socket.off('receive-change', handler)
        }
    }, [socket, quill])


    useEffect(() => {

        if (socket == null || quill == null) return

        const handler = (delta:Object, oldDelta:Object, source:string) => {
            if (source !== 'user') return
            socket?.emit("send-changes", delta)
        }
        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])

    const wrapperRef = useCallback((wrapper:HTMLDivElement)=> {
        if (wrapper==null) return
        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {theme: 'snow', modules: {toolbar: TOOLBAR_OPTIONS}})
        q.disable()
        q.setText('Loading...')
        setQuill(q)
    }, [])

    return(
        <div id="container" ref={wrapperRef}></div>
    )
}