export function overview(db){const views=db.resources.reduce((a,r)=>a+r.views,0);return {resources:db.resources.length,activities:db.activities.length,students:db.students.length,views,average:Math.round(views/(db.resources.length||1))}}
export function popularity(db){return [...db.resources].sort((a,b)=>b.views-a.views)}
