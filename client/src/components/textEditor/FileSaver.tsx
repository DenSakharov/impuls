import { saveAs } from 'file-saver';
import * as quillToWord from 'quill-to-word';
//import * as quill from 'quilljs';
import Quill from "quill";




async function saver(quillInstance:any) {
    
   // const quillInstance = new Quill();
    
const delta = quillInstance.getContents();

const quillToWordConfig:object = {
    exportAs: 'blob'
};

    const docAsBlob:any = await quillToWord.generateWord(delta, quillToWordConfig);
 
    saveAs(docAsBlob, 'word-export.docx');
    
}

export default saver;