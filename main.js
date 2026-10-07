/* ===== Edit these details for the real institute ===== */
const C={name:"IBS Ropar",phone:"+91 90000 00000",email:"info@example.com",wa:"919000000000",addr:"Add full address, Ropar, Punjab",time:"Mon-Sat, 9:30 AM - 6:30 PM (Sunday off)"};
const T={classic:"Classic (easy to read)",modern:"Modern",premium:"Premium Dark",futuristic:"Futuristic Sci-Fi",luxury:"Luxury Gold",edu:"Simple Educational",casual:"Casual"};
const COURSES=[
{n:"Foundation (Class 6-10)",c:"School",d:"Strong basics in Maths, Science and English with weekly tests."},
{n:"Class 11-12 Science",c:"School",d:"Concept-based teaching for board exams and entrance preparation."},
{n:"Class 11-12 Commerce",c:"School",d:"Accountancy, Business Studies and Economics with practice papers."},
{n:"Competitive Exam Prep",c:"Competitive",d:"Structured batches with mock tests and doubt sessions."},
{n:"IELTS / PTE",c:"Language",d:"Four-skill training with regular mock tests."},
{n:"Spoken English",c:"Language",d:"Build fluency and confidence through daily practice."}];
/* Toppers: put photos in an "img" folder and set img:"img/name.jpg". Empty img shows an initial instead. */
const TOPPERS=[
{n:"Student Name",s:"Add result here",c:"Course name",img:""},{n:"Student Name",s:"Add result here",c:"Course name",img:""},
{n:"Student Name",s:"Add result here",c:"Course name",img:""},{n:"Student Name",s:"Add result here",c:"Course name",img:""},
{n:"Student Name",s:"Add result here",c:"Course name",img:""},{n:"Student Name",s:"Add result here",c:"Course name",img:""}];
/* ===================================================== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const wa=t=>`https://wa.me/${C.wa}?text=${encodeURIComponent(t)}`;
function setTheme(t){if(!T[t])t="modern";document.documentElement.dataset.theme=t;try{localStorage.setItem("ibs-theme",t)}catch(e){}const s=$("#th");if(s)s.value=t}
document.addEventListener("DOMContentLoaded",()=>{
const pg=document.body.dataset.page,pages=[["index","Home"],["courses","Courses"],["results","Results"],["contact","Contact"]];
$("#hdr").outerHTML=`<header><div class="strip"><span>📞 ${C.phone}</span><span>✉ ${C.email}</span><span>🕘 ${C.time}</span></div><div class="wrap bar"><a class="logo" href="index.html">${C.name}</a><button class="menu" aria-label="Menu">☰</button><nav>${pages.map(([p,n])=>`<a href="${p}.html" class="${p==pg?"on":""}">${n}</a>`).join("")}<select id="th" aria-label="Theme">${Object.entries(T).map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select></nav></div></header>`;
$("#ftr").outerHTML=`<footer><div class="wrap"><b>${C.name}</b><br>${C.addr}<br>${C.time}<br>${C.phone} | ${C.email}<br><small>© ${new Date().getFullYear()} ${C.name}</small></div></footer><a class="wa" target="_blank" href="${wa("Hi, I have a question.")}" aria-label="WhatsApp">💬</a><a class="top" href="#" aria-label="Back to top">↑</a>`;
let saved;try{saved=localStorage.getItem("ibs-theme")}catch(e){}
setTheme(new URLSearchParams(location.search).get("theme")||saved||"modern");
$("#th").onchange=e=>setTheme(e.target.value);
$(".menu").onclick=()=>$("nav").classList.toggle("open");
$$("[data-c]").forEach(e=>e.textContent=C[e.dataset.c]);
$$("[data-wa]").forEach(a=>{a.href=wa(a.dataset.wa);a.target="_blank"});
$$("[data-tel]").forEach(a=>a.href="tel:"+C.phone.replace(/\s/g,""));
$$(".tp").forEach(el=>el.innerHTML=TOPPERS.map(t=>`<div class="card tc"><div class="ph">${t.img?`<img src="${t.img}" alt="${t.n}">`:`<span>${t.n[0]}</span>`}</div><h3>${t.n}</h3><p>${t.s}</p><span class="tag">${t.c}</span></div>`).join(""));
const list=$("#list");
if(list){const cats=["All",...new Set(COURSES.map(c=>c.c))];
const draw=cat=>{$$(".chip").forEach(b=>b.classList.toggle("on",b.textContent==cat));
list.innerHTML=COURSES.filter(c=>cat=="All"||c.c==cat).map(c=>`<div class="card rv in"><span class="tag">${c.c}</span><h3>${c.n}</h3><p>${c.d}</p><a class="btn" target="_blank" href="${wa("Hi, I want details about "+c.n)}">Enquire</a></div>`).join("")};
$("#chips").innerHTML=cats.map(c=>`<button class="chip">${c}</button>`).join("");
$$(".chip").forEach(b=>b.onclick=()=>draw(b.textContent));draw("All")}
const f=$("#f");
if(f){$("#cs").innerHTML=COURSES.map(c=>`<option>${c.n}</option>`).join("");
f.onsubmit=e=>{e.preventDefault();const d=new FormData(f);window.open(wa(`Hi ${C.name}, I'm ${d.get("n")} (phone: ${d.get("p")}). Interested in: ${d.get("c")}. ${d.get("m")||""}`),"_blank")}}
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);
if(el.classList.contains("cnt")){const n=+el.dataset.n,s=el.dataset.s||"",st=Math.max(1,Math.ceil(n/50));let i=0;const tm=setInterval(()=>{i=Math.min(n,i+st);el.textContent=i+s;if(i>=n)clearInterval(tm)},25)}else el.classList.add("in")}),{threshold:.15});
$$(".card:not(.in),.cnt").forEach(el=>{if(!el.classList.contains("cnt"))el.classList.add("rv");io.observe(el)})}
else $$(".cnt").forEach(el=>el.textContent=el.dataset.n+(el.dataset.s||""));
});
