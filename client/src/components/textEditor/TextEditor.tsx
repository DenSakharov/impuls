import React, { useCallback, useEffect, useState} from 'react';
import "quill/dist/quill.snow.css"
import Quill from "quill";
import {io} from 'socket.io-client'
import {Socket} from 'socket.io-client'
import {DefaultEventsMap} from "@socket.io/component-emitter"
import { useParams } from 'react-router-dom';
import saver from './FileSaver';
import './styles/text_editor.css'
//import mammoth from 'mammoth'
   
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
    //    q.disable()
      //  q.setText('Loading...')
        setQuill(q)
      
        let posButton = document.createElement('span');
        let posButton1 = document.createElement('span');
        posButton.classList.add(
            'ql-formats'
           );
           posButton.setAttribute('id', 'butSave');
        let customButton = document.createElement('button');
        customButton.innerHTML = 'Сохранить';
        customButton.addEventListener('click', function() {
       
        saver(q);
            });

            customButton.classList.add(
                'ql-align', 
                'ql-picker', 
                'ql-icon-picker',
                'ql-save'
            );
            customButton.style.width='70px';
            posButton.appendChild(customButton);

            posButton1.classList.add(
                'ql-formats'
               );
               posButton1.setAttribute('id', 'butLoad');
            let customButton1 = document.createElement('input');
            customButton1.type="file"
            customButton1.id="customButton1"
            
            customButton1.innerHTML = 'Загрузить';
            customButton1.style.width='110px';


/*            
  customButton1.addEventListener('change', (event) => {

    const file = (event.target as HTMLInputElement).files![0];
    if (!file) {
        console.log('Выбор файла отменён. Или что-то другое произошло?');
      }
    else{
    console.log(file.name);
    console.time();
    let reader = new FileReader();
    reader.onloadend = function(event) {
      let arrayBuffer = reader.result;
      // debugger
      if (arrayBuffer instanceof ArrayBuffer) {
      mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then(function (resultObject:any) {
        document.getElementsByClassName("ql-editor")[0].innerHTML = resultObject.value
      
      })
      .catch((error:any) => {
        // Handle the error.
        
        console.log(error);
        });
      console.timeEnd();
    }
    };

    reader.readAsArrayBuffer(file);
}
  });
*/
                customButton1.classList.add(
                    'ql-align', 
                    'ql-picker', 
                    'ql-icon-picker',
                    'ql-save'
                );
                posButton1.appendChild(customButton1);



// Add the button to your desired location in the DOM
const doc = document.getElementById("container");
if (doc?.hasChildNodes){
   const panel = doc.getElementsByTagName('div')[0];
   panel.appendChild(posButton);
   panel.appendChild(posButton1);
    }
    }, [])

    return(
        <div className="container" id="container" ref={wrapperRef}></div>
        
    )
}
