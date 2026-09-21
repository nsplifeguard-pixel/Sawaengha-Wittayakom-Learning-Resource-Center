export function exportJSON(data,filename='sawaengha-learning-backup.json'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.download=filename;a.click()}
export function importJSON(file,onDone){const r=new FileReader();r.onload=()=>onDone(JSON.parse(r.result));r.readAsText(file)}
