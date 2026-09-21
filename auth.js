export function getRole(){return localStorage.getItem('sw_role')||'GUEST'}
export function logout(){localStorage.removeItem('sw_role');location.href='login.html'}
export function can(role,required){return role===required||role==='ADMIN'}
