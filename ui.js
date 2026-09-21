export const $=s=>document.querySelector(s);
export const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
export function toast(t){let e=$('#toast');if(!e){e=document.createElement('div');e.id='toast';e.style='position:fixed;right:18px;bottom:18px;background:#25152b;color:#fff;padding:12px 16px;border-radius:12px;z-index:99';document.body.append(e)}e.textContent=t;e.style.display='block';setTimeout(()=>e.style.display='none',1800)}
export function modal(title,html){let e=$('#modal');if(!e){e=document.createElement('div');e.id='modal';e.className='modal';e.innerHTML='<div class="modal-box"><div id="modalBody"></div></div>';document.body.append(e)}$('#modalBody').innerHTML='<h2>'+title+'</h2>'+html;e.classList.add('show')}
export function closeModal(){$('#modal')?.classList.remove('show')}
