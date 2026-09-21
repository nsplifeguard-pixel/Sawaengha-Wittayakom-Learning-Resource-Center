import {db,save,add,remove,reset} from './store.js';
import {$,esc,toast,modal,closeModal} from './ui.js';

const app=document.querySelector('#app');
app.innerHTML=`<div class="shell"><aside class="sidebar">
<div class="brand"><img src="assets/school-logo.jpg"><div><b>โรงเรียนแสวงหาวิทยาคม</b><small>ศูนย์แหล่งเรียนรู้</small></div></div>
<nav class="nav">
<button data-page="dashboard" class="active">📊 Dashboard</button><button data-page="resources">📚 แหล่งเรียนรู้</button>
<button data-page="activities">🎯 กิจกรรม</button><button data-page="students">👨‍🎓 นักเรียน</button>
<button data-page="teachers">👩‍🏫 ครู/ผู้ดูแล</button><button data-page="quizzes">📝 แบบทดสอบ</button>
<button data-page="badges">🏅 คะแนน/Badge</button><button data-page="news">📢 ข่าวสาร</button>
<button data-page="reports">📈 รายงาน</button><button data-page="settings">⚙️ ตั้งค่า</button>
</nav></aside><main class="content"><div class="top"><div><h1 id="title">Dashboard</h1><p class="muted" id="sub">ภาพรวมระบบแหล่งเรียนรู้</p></div>
<div><button class="btn" id="backup">💾 สำรองข้อมูล</button> <a class="btn" href="login.html">🔐 Login</a></div></div><div id="page"></div></main></div>`;

const pages={dashboard:'Dashboard',resources:'แหล่งเรียนรู้',activities:'กิจกรรม',students:'นักเรียน',teachers:'ครู/ผู้ดูแล',quizzes:'แบบทดสอบ',badges:'คะแนน/Badge',news:'ข่าวสาร',reports:'รายงาน',settings:'ตั้งค่า'};
document.querySelectorAll('.nav button').forEach(b=>b.onclick=()=>go(b.dataset.page));
$('#backup').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(db,null,2)],{type:'application/json'}));a.download='sawaengha-learning-backup.json';a.click();toast('สำรองข้อมูลแล้ว')};

function go(p){document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===p));$('#title').textContent=pages[p];$('#sub').textContent='ระบบจัดการแหล่งเรียนรู้ โรงเรียนแสวงหาวิทยาคม';render(p)}
function render(p){
 if(p==='dashboard') dashboard();
 if(p==='resources') resources();
 if(p==='activities') activities();
 if(p==='students') students();
 if(p==='teachers') teachers();
 if(p==='quizzes') quizzes();
 if(p==='badges') badges();
 if(p==='news') news();
 if(p==='reports') reports();
 if(p==='settings') settings();
}
function dashboard(){let views=db.resources.reduce((a,x)=>a+x.views,0);$('#page').innerHTML=`<div class="grid cards">
${[['แหล่งเรียนรู้',db.resources.length,'📚'],['กิจกรรม',db.activities.length,'🎯'],['นักเรียน',db.students.length,'👨‍🎓'],['เข้าชมรวม',views,'👁️']].map(x=>`<div class="card"><div class="muted">${x[2]} ${x[0]}</div><div class="num">${x[1]}</div></div>`).join('')}</div>
<div class="grid resource-grid" style="margin-top:18px">${db.resources.slice().sort((a,b)=>b.views-a.views).slice(0,3).map(card).join('')}</div>
<div class="card" style="margin-top:18px"><h2>กิจกรรมล่าสุด</h2>${db.activities.map(a=>`<p><b>${esc(a.name)}</b> · ${a.date} · ${esc(a.place)} · ${a.count} คน</p>`).join('')}</div>`}
function card(r){return `<div class="card"><div class="resource-cover">📚</div><h3>${esc(r.name)}</h3><p class="muted">📍 ${esc(r.place)}<br>👩‍🏫 ${esc(r.owner)}<br>👁️ ${r.views} ครั้ง</p><p>${esc(r.desc)}</p><button class="btn primary" onclick="window.openResource(${r.id})">เปิดดู</button></div>`}
window.openResource=id=>{let r=db.resources.find(x=>x.id===id);r.views++;save();modal(r.name,`<p>${esc(r.desc)}</p><p class="muted">สถานที่: ${esc(r.place)}<br>ผู้รับผิดชอบ: ${esc(r.owner)}<br>หมวดหมู่: ${esc(r.cat)}<br>เข้าชม: ${r.views}</p><button class="btn gold" onclick="alert('จุดเชื่อมต่อ QR Code พร้อมพัฒนาต่อ')">▣ QR Code</button> <button class="btn" onclick="document.querySelector('#modal').classList.remove('show')">ปิด</button>`)};

function resources(){$('#page').innerHTML=`<div class="card"><div class="toolbar"><input id="rq" placeholder="ค้นหาแหล่งเรียนรู้..."><button class="btn primary" id="addR">＋ เพิ่ม</button></div><div id="rl" class="grid resource-grid"></div></div>`;const draw=()=>{let q=($('#rq').value||'').toLowerCase();$('#rl').innerHTML=db.resources.filter(r=>(r.name+r.place+r.cat+r.owner).toLowerCase().includes(q)).map(card).join('')};$('#rq').oninput=draw;$('#addR').onclick=()=>modal('เพิ่มแหล่งเรียนรู้',`<div class="form"><input id="rn" placeholder="ชื่อ"><input id="rc" placeholder="หมวดหมู่"><input id="rp" placeholder="สถานที่"><input id="ro" placeholder="ผู้รับผิดชอบ"><textarea id="rd" placeholder="รายละเอียด"></textarea><button class="btn primary" onclick="window.addR()">บันทึก</button></div>`);draw()}
window.addR=()=>{add('resources',{name:rn.value,cat:rc.value||'ทั่วไป',place:rp.value||'-',owner:ro.value||'-',desc:rd.value||'',views:0,status:'active'});closeModal();go('resources');toast('เพิ่มแล้ว')};

function activities(){$('#page').innerHTML=`<div class="card"><div class="toolbar"><button class="btn primary" onclick="window.addA()">＋ เพิ่มกิจกรรม</button></div><div class="table-wrap"><table class="table"><tr><th>กิจกรรม</th><th>วันที่</th><th>สถานที่</th><th>ผู้รับผิดชอบ</th><th>ผู้เข้าร่วม</th></tr>${db.activities.map(a=>`<tr><td>${esc(a.name)}</td><td>${a.date}</td><td>${esc(a.place)}</td><td>${esc(a.teacher)}</td><td>${a.count}</td></tr>`).join('')}</table></div></div>`}
window.addA=()=>{modal('เพิ่มกิจกรรม',`<div class="form"><input id="an" placeholder="ชื่อกิจกรรม"><input id="ad" type="date"><input id="ap" placeholder="สถานที่"><input id="at" placeholder="ผู้รับผิดชอบ"><input id="ac" type="number" placeholder="จำนวนผู้เข้าร่วม"><button class="btn primary" onclick="window.saveA()">บันทึก</button></div>`)}
window.saveA=()=>{add('activities',{name:an.value,date:ad.value,place:ap.value,teacher:at.value,count:Number(ac.value)||0,status:'open'});closeModal();go('activities');toast('เพิ่มกิจกรรมแล้ว')};

function students(){$('#page').innerHTML=`<div class="card"><h2>ข้อมูลนักเรียน</h2><div class="table-wrap"><table class="table"><tr><th>รหัส</th><th>ชื่อ</th><th>ชั้น</th><th>ห้อง</th><th>เข้าชม</th></tr>${db.students.map(s=>`<tr><td>${esc(s.id)}</td><td>${esc(s.name)}</td><td>${esc(s.grade)}</td><td>${esc(s.room)}</td><td>${s.views}</td></tr>`).join('')}</table></div></div>`}
function teachers(){$('#page').innerHTML=`<div class="card"><h2>ครู / ผู้ดูแล</h2><div class="table-wrap"><table class="table"><tr><th>ชื่อ</th><th>ตำแหน่ง</th><th>กลุ่มสาระ</th><th>สิทธิ์</th></tr>${db.teachers.map(t=>`<tr><td>${esc(t.name)}</td><td>${esc(t.position)}</td><td>${esc(t.subject)}</td><td>${esc(t.role)}</td></tr>`).join('')}</table></div></div>`}
function quizzes(){$('#page').innerHTML=`<div class="grid resource-grid">${db.quizzes.map(q=>`<div class="card"><h3>📝 ${esc(q.title)}</h3><p class="muted">คะแนนผ่าน ${q.pass}%</p><button class="btn primary" onclick="alert('พร้อมเชื่อมชุดคำถามจริง')">เริ่มทำแบบทดสอบ</button></div>`).join('')}</div>`}
function badges(){$('#page').innerHTML=`<div class="grid resource-grid">${db.badges.map(b=>`<div class="card"><div style="font-size:48px">🏅</div><h3>${esc(b.name)}</h3><p>${esc(b.condition)}</p><div class="progress"><span style="width:65%"></span></div></div>`).join('')}</div>`}
function news(){$('#page').innerHTML=`<div class="grid resource-grid">${db.news.map(n=>`<div class="card"><span class="tag">ประกาศ</span><h3>${esc(n.title)}</h3><p class="muted">${n.date}</p><button class="btn">อ่านรายละเอียด</button></div>`).join('')}</div>`}
function reports(){let total=db.resources.reduce((a,x)=>a+x.views,0);$('#page').innerHTML=`<div class="grid cards"><div class="card"><div class="muted">เข้าชมรวม</div><div class="num">${total}</div></div><div class="card"><div class="muted">เฉลี่ยต่อแหล่ง</div><div class="num">${Math.round(total/(db.resources.length||1))}</div></div><div class="card"><div class="muted">หมวดหมู่</div><div class="num">${new Set(db.resources.map(x=>x.cat)).size}</div></div><div class="card"><div class="muted">ข้อมูลรวม</div><div class="num">${db.resources.length+db.activities.length+db.students.length+db.teachers.length}</div></div></div><div class="card" style="margin-top:15px"><h2>ความนิยม</h2>${db.resources.slice().sort((a,b)=>b.views-a.views).map(r=>`<p>${esc(r.name)} <b>${r.views}</b></p><div class="progress"><span style="width:${Math.min(100,r.views)}%"></span></div>`).join('')}</div>`}
function settings(){$('#page').innerHTML=`<div class="card"><h2>ตั้งค่าระบบ</h2><div class="form"><input value="โรงเรียนแสวงหาวิทยาคม" readonly><select><option>ภาษาไทย</option><option>English</option></select><select><option>Asia/Bangkok</option></select><button class="btn primary" onclick="toast('บันทึกการตั้งค่าแล้ว')">บันทึก</button><button class="btn danger" onclick="if(confirm('รีเซ็ตข้อมูลตัวอย่าง?')) reset()">รีเซ็ตข้อมูล</button></div></div>`}
go('dashboard');
