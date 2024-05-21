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
   
<<<<<<< HEAD
  
=======
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
const SAVE_INTERVAL_MS = 2000


const TOOLBAR_OPTIONS=[
<<<<<<< HEAD
								   
				
=======
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
    [{header:[1,2,3,4,5,6,false]}, {font:[]}, {list:"ordered"},{list:"bullet"}],
    ["bold", "italic", "underline"],
    [{color:[]}, {background:[]}, "clean"],
    [{script:"sub"},{script:"super"}, {align:[]}],
<<<<<<< HEAD
				 
    ["image", "blockquote", "code-block"],
			  
=======
    ["image", "blockquote", "code-block"],
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
]

export default function TextEditor(){
    const {id: documentId} = useParams()
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
    const [quill, setQuill] = useState<any>(null)
    console.log(documentId)

<<<<<<< HEAD

    useEffect(()=>{
        
    const s = io(`http://${window.location.hostname.toString()}:3001`)
=======
    useEffect(()=>{
        
    const s = io("http://localhost:3001")
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
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

<<<<<<< HEAD
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

            console.log(delta)
console.log(oldDelta)

=======
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
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
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

<<<<<<< HEAD
=======

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
  


>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
    const wrapperRef = useCallback((wrapper:HTMLDivElement)=> {
        if (wrapper==null) return
        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {theme: 'snow', modules: {toolbar: TOOLBAR_OPTIONS}})
    //    q.disable()
      //  q.setText('Loading...')
        setQuill(q)
<<<<<<< HEAD
      
        let posButton = document.createElement('span');
        let posButton1 = document.createElement('span');
        posButton.classList.add(
            'ql-formats'
           );
           posButton.setAttribute('id', 'butSaveLoad');
        let customButton = document.createElement('button');
       // customButton.innerHTML = 'Сохранить';
        customButton.addEventListener('click', function() {
       
        saver(q);
            });
            customButton.classList.add(
                'ql-align', 
                'ql-picker', 
                'ql-icon-picker',
                'ql-save'
            );
   
        //customButton.style.width='75px';
       // customButton.style.margin='0px 5px';
		
            posButton.appendChild(customButton);
            posButton1.classList.add(
                'ql-formats'
               );
               posButton1.setAttribute('id', 'butLoad');
            let customButton1 = document.createElement('input');
            customButton1.type="file"
            customButton1.id="customButton1"
            
            customButton1.innerHTML = 'Загрузить';
            customButton1.style.width='28px';

let mammoth = require("mammoth");
            
=======
        
        let posButton = document.createElement('span');
        //let posButton1 = document.createElement('span');
        posButton.classList.add(
            'ql-formats'
           );
        posButton.setAttribute('id', 'butSaveLoad');
        let customButton = document.createElement('button');
        customButton.innerHTML = 'Сохранить';
        customButton.addEventListener('click', function() {saver(q);});

        customButton.classList.add(
            'ql-align', 
            'ql-picker', 
            'ql-icon-picker',
            'ql-save'
        );
        customButton.style.width='75px';
        customButton.style.margin='0px 5px';

        

        // posButton1.classList.add(
        //     'ql-formats'
        // );
        //posButton1.setAttribute('id', 'butLoad');
        let customButton1 = document.createElement('input');
        customButton1.type="file"
        customButton1.id="customButton1"
        
        customButton1.style.width='120px';
        customButton1.style.height='28px';

        posButton.appendChild(customButton);
        posButton.appendChild(customButton1);

/*            
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
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
<<<<<<< HEAD
      let arrayOfStrings = file.name.split(".");
      let fileExtention = arrayOfStrings[arrayOfStrings.length - 1]
      console.log(fileExtention);
//если файл word

if (fileExtention=="doc" || fileExtention=="docx"){
=======
      if (arrayBuffer instanceof ArrayBuffer) {
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
      mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then(function (resultObject:any) {
        document.getElementsByClassName("ql-editor")[0].innerHTML = resultObject.value
      
      })
      .catch((error:any) => {
        // Handle the error.
        
        console.log(error);
        });
<<<<<<< HEAD
    }
    else if (fileExtention=="xlsx" || fileExtention=="xls"){
        var XLSX = require("xlsx");

            var options = { type: 'array' };
    var workbook = XLSX.read(arrayBuffer, options);
    console.timeEnd();

    var sheetName = workbook.SheetNames
    var sheet = workbook.Sheets[sheetName]
        document.getElementsByClassName("ql-editor")[0].innerHTML =XLSX.utils.sheet_to_html(sheet)
    }
      console.timeEnd();
	 
=======
      console.timeEnd();
    }
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
    };

    reader.readAsArrayBuffer(file);
}
  });
<<<<<<< HEAD
=======
*/
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
                customButton1.classList.add(
                    'ql-align', 
                    'ql-picker', 
                    'ql-icon-picker',
                    'ql-save'
                );
<<<<<<< HEAD
                posButton1.appendChild(customButton1);
=======
                //posButton1.appendChild(customButton1);
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6



// Add the button to your desired location in the DOM
<<<<<<< HEAD
const doc = document.getElementById("container");
if (doc?.hasChildNodes){
   const panel = doc.getElementsByTagName('div')[0];
   panel.appendChild(posButton);
   panel.appendChild(posButton1);
=======
    const doc = document.getElementById("container");
    if (doc?.hasChildNodes){
        const panel = doc.getElementsByTagName('div')[0];
        panel.appendChild(posButton);
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
    }
    }, [])

    return(
        <div className="container" id="container" ref={wrapperRef}></div>
        
    )
}
<<<<<<< HEAD

=======
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
