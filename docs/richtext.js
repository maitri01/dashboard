'use strict';
let noteSelection=null;
function cleanNoteHTML(html){
 const source=document.createElement('template');source.innerHTML=html;
 const sizes={1:'10px',2:'13px',3:'16px',4:'18px',5:'24px',6:'32px',7:'48px'};
 function clean(node){
  if(node.nodeType===3)return document.createTextNode(node.textContent);
  if(node.nodeType!==1)return document.createDocumentFragment();
  if(['SCRIPT','STYLE','IFRAME','OBJECT','SVG','MATH'].includes(node.tagName))return document.createDocumentFragment();
  const tags={B:'strong',STRONG:'strong',I:'em',EM:'em',BR:'br',DIV:'div',P:'div',SPAN:'span',FONT:'span'};
  const out=tags[node.tagName]?document.createElement(tags[node.tagName]):document.createDocumentFragment();
  if(out.nodeType===1){
   const font=node.getAttribute('face')||node.style.fontFamily;
   if(font&&/^(Roboto|DM Sans)$/i.test(font.replace(/["']/g,'')))out.style.fontFamily=font.replace(/["']/g,'');
   const rawSize=node.tagName==='FONT'?sizes[node.getAttribute('size')]:node.style.fontSize;
   const size=({'xx-small':'10px','x-small':'10px',small:'13px',medium:'16px',large:'18px','x-large':'24px','xx-large':'32px','xxx-large':'48px','-webkit-xxx-large':'48px'})[rawSize]||rawSize;
   if(Object.values(sizes).includes(size))out.style.fontSize=size;
   if(node.style.fontWeight==='bold'||Number(node.style.fontWeight)>=600)out.style.fontWeight='700';
   if(node.style.fontStyle==='italic')out.style.fontStyle='italic';
  }
  node.childNodes.forEach(child=>out.appendChild(clean(child)));return out;
 }
 const result=document.createElement('div');source.content.childNodes.forEach(node=>result.appendChild(clean(node)));return result.innerHTML;
}
function renderNoteText(block,archived){
 const label=block.type==='image'?'Image caption':block.type==='todo'?'To-do text':block.type==='number'?'Numbered point':block.type==='bullet'?'Bullet point':'Paragraph';
 const html=block.html?cleanNoteHTML(block.html):esc(block.text).replace(/\n/g,'<br>');
 return `<div data-block-text="${esc(block.id)}" class="block-text rich-text ${block.checked?'todo-done':''}" contenteditable="${!archived}" role="textbox" aria-multiline="true" aria-label="${label}" data-placeholder="${block.type==='image'?'Caption':block.type==='paragraph'?'Write something…':label}">${html}</div>`;
}
function formatToolbar(){return `<div class="format-tools" role="toolbar" aria-label="Text formatting"><button type="button" class="btn" data-format="bold" aria-label="Bold" title="Bold (Ctrl+B)"><strong>B</strong></button><button type="button" class="btn" data-format="italic" aria-label="Italic" title="Italic (Ctrl+I)"><em>I</em></button><select id="noteTextSize" aria-label="Text size"><option value="2">13</option><option value="3" selected>16</option><option value="4">18</option><option value="5">24</option><option value="6">32</option><option value="7">48</option></select><select id="noteFont" aria-label="Font"><option value="DM Sans">Default</option><option value="Roboto">Roboto</option></select></div>`;}
function rememberNoteSelection(){
 const selection=window.getSelection();if(!selection?.rangeCount)return;
 const range=selection.getRangeAt(0),node=range.commonAncestorContainer,element=node.nodeType===1?node:node.parentElement;
 const editor=element?.closest('.rich-text[contenteditable="true"]');if(editor)noteSelection={range:range.cloneRange(),editor};
}
function saveRichEditor(editor){
 const block=currentNote()?.blocks.find(b=>b.id===editor.dataset.blockText);if(!block)return;
 block.html=cleanNoteHTML(editor.innerHTML);block.text=editor.innerText;persistNotebook();
}
function formatNote(command,value){
 let editor=noteSelection?.editor;
 if(!editor?.isConnected){editor=document.querySelector('.rich-text[contenteditable="true"]');if(!editor)return;editor.focus();const range=document.createRange();range.selectNodeContents(editor);range.collapse(false);noteSelection={editor,range};}
 editor.focus();const selection=window.getSelection();selection.removeAllRanges();selection.addRange(noteSelection.range);
 document.execCommand('styleWithCSS',false,true);document.execCommand(command,false,value||null);saveRichEditor(editor);rememberNoteSelection();
}
document.addEventListener('selectionchange',rememberNoteSelection);
document.addEventListener('mousedown',e=>{if(e.target.closest('[data-format]'))e.preventDefault();});
document.addEventListener('click',e=>{const button=e.target.closest('[data-format]');if(button)formatNote(button.dataset.format);});
document.addEventListener('change',e=>{if(e.target.id==='noteTextSize')formatNote('fontSize',e.target.value);if(e.target.id==='noteFont')formatNote('fontName',e.target.value);});
document.addEventListener('paste',e=>{
 if(e.defaultPrevented||!e.target.closest('.rich-text'))return;
 const text=e.clipboardData?.getData('text/plain');if(text){e.preventDefault();document.execCommand('insertText',false,text);saveRichEditor(e.target.closest('.rich-text'));}
});
