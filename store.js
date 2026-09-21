const KEY='sawaengha_full_v2';
const seed={resources:[
{id:1,name:'ห้องสมุดโรงเรียน',cat:'ห้องสมุด',place:'อาคาร 1 ชั้น 2',owner:'ครูบรรณารักษ์',desc:'หนังสือ สื่อดิจิทัล และพื้นที่อ่านหนังสือ',views:128,status:'active'},
{id:2,name:'ห้องปฏิบัติการวิทยาศาสตร์',cat:'ห้องปฏิบัติการ',place:'อาคารวิทยาศาสตร์',owner:'กลุ่มสาระวิทยาศาสตร์',desc:'ทดลองและเรียนรู้กระบวนการทางวิทยาศาสตร์',views:96,status:'active'},
{id:3,name:'ห้องคอมพิวเตอร์และ AI',cat:'เทคโนโลยี',place:'อาคาร 2 ชั้น 3',owner:'กลุ่มสาระเทคโนโลยี',desc:'คอมพิวเตอร์ การเขียนโปรแกรม และ AI',views:154,status:'active'},
{id:4,name:'แปลงเกษตรเพื่อการเรียนรู้',cat:'ภูมิปัญญา/ชุมชน',place:'ด้านหลังโรงเรียน',owner:'งานเกษตร',desc:'เกษตรยั่งยืนและภูมิปัญญาท้องถิ่น',views:74,status:'active'}],
activities:[
{id:1,name:'สัปดาห์ส่งเสริมการอ่าน',date:'2026-10-10',place:'ห้องสมุด',teacher:'ครูบรรณารักษ์',count:85,status:'open'},
{id:2,name:'ค่ายวิทยาศาสตร์',date:'2026-11-05',place:'ห้องปฏิบัติการวิทยาศาสตร์',teacher:'กลุ่มสาระวิทยาศาสตร์',count:120,status:'open'}],
students:[
{id:'ST001',name:'ด.ช.กิตติพงษ์ ใจดี',grade:'ม.1',room:'1',views:12},
{id:'ST002',name:'ด.ญ.ปิยธิดา แสงทอง',grade:'ม.2',room:'2',views:18},
{id:'ST003',name:'นายณัฐวุฒิ พัฒนาการ',grade:'ม.5',room:'1',views:24}],
teachers:[
{name:'ครูบรรณารักษ์',position:'ครู',subject:'ภาษาไทย / ห้องสมุด',role:'TEACHER'},
{name:'ครูเทคโนโลยี',position:'ครู',subject:'วิทยาการคำนวณ',role:'TEACHER'},
{name:'ผู้ดูแลระบบ',position:'ผู้ดูแลระบบ',subject:'บริหารระบบ',role:'ADMIN'}],
news:[
{id:1,title:'เปิดศูนย์แหล่งเรียนรู้รูปแบบใหม่',date:'2026-09-21',status:'published'},
{id:2,title:'กิจกรรมส่งเสริมการอ่านประจำภาคเรียน',date:'2026-10-01',status:'published'}],
quizzes:[{id:1,title:'ความรู้เบื้องต้นด้านวิทยาศาสตร์',resourceId:2,pass:60}],
badges:[{id:1,name:'นักสำรวจแหล่งเรียนรู้',condition:'เข้าชม 3 แห่ง'},{id:2,name:'นักเรียนรู้',condition:'ผ่านแบบทดสอบ 3 ชุด'}]};
export let db=JSON.parse(localStorage.getItem(KEY)||'null')||seed;
export function save(){localStorage.setItem(KEY,JSON.stringify(db))}
export function reset(){localStorage.removeItem(KEY);location.reload()}
export function add(collection,item){item.id=item.id||Date.now();db[collection].push(item);save();return item}
export function remove(collection,id){db[collection]=db[collection].filter(x=>String(x.id)!==String(id));save()}
