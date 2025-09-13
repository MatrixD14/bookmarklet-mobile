javascript:(function(){
let p=document.createElement('div');
p.style="position:fixed;top:0;left:0;width:100%;height:0;z-index:9999;transition:.25s;height;background:#111;color:#eee;font:20px monospace;display:flex;flex-direction:column";
document.body.appendChild(p);

let d=document.createElement('div');
let html = document.documentElement.outerHTML
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g,'<span style="color:#6a9955;">$1</span>')
             .replace(/(&lt;[^\s&]+)([\s\S]*?)(&gt;)/g,function(m,t,b,e){
               b = b.replace(/(\w+)=(["\'].*?["\'])/g,'<span style="color:#9cdcfe;">$1</span>=<span style="color:#ce9178;">$2</span>');
               return '<span style="color:#569cd6;">'+t+'</span>'+b+'<span style="color:#569cd6;">'+e+'</span><br>';
             });
  d.style='width:100%;height:93%;overflow:auto;padding:0 10px 0 10px;background:#252526;color:#d4d4d4;font-family:monospace;';
  d.innerHTML = html;
p.appendChild(d);

let t=document.createElement('div');
t.style="flex:1;display:none;flex-direction:column;background:#000;color:#0f0";
let log=document.createElement('textarea');
log.style="flex:1;background:#000;color:#0f0;border:none";log.readOnly=1;
let inp=document.createElement('input');
inp.style="padding:4px;background:#111;color:#fff;border:none;font-size:20px";
t.appendChild(log);t.appendChild(inp);p.appendChild(t);
inp.onkeydown=e=>{if(e.key=="Enter"){try{log.value+="\n>"+inp.value+"\n"+eval(inp.value)}catch(x){log.value+="\nERR:"+x}inp.value="";log.scrollTop=log.scrollHeight}};

let i=document.createElement('div');
i.style="flex:1;display:none;overflow:auto;padding:5px;background:#000;color:#0f0;white-space:pre-wrap";
p.appendChild(i);
function upd(){
  let importantCookies = ["SID","APISID","SAPISID","SIDCC"];
  let cookiesArr = document.cookie.split(" ;").map(c=>c.trim())
        .filter(c=>importantCookies.some(k=>c.startsWith(k+" = ")))
        .map(c=>{ 
            let eq=c.indexOf(" = "); 
            return eq>-1?`${c.slice(0,eq)}: ${c.slice(eq+1)}`:c;
        });
    let cookies = cookiesArr.length? cookiesArr.join("\n\n") : "Nenhum cookie importante";

    let lsArr = Object.keys(localStorage||{}).map(k=>{
        let val = localStorage.getItem(k);
        if(val.length > 100) val = val.slice(0,100)+"…";
        return `${k}: ${val}`;
    });
    let ls = lsArr.length ? lsArr.join("\n\n") : "vazio";

    let ssArr = Object.keys(sessionStorage||{}).map(k=>{
        let val = sessionStorage.getItem(k);
        if(val.length > 100) val = val.slice(0,100)+"…";
        return `${k}: ${val}`;
    });
    let ss = ssArr.length ? ssArr.join("\n\n") : "vazio";

    i.textContent = "|Cookies importantes|\n" + cookies + "\n\n" +"|localStorage|\n" + ls + "\n\n" +"|sessionStorage|\n" + ss;
}
function btn(txt,pos,fn){let b=document.createElement('button');b.textContent=txt;b.style="position:fixed;transform:translate(-50,-50);font-size:30px;bottom:0;right:"+pos+";z-index:1";b.onclick=fn;document.body.appendChild(b)}
function tog(f){let o=p.style.height!="0px";p.style.height=o?"0":"60%";d.style.display=t.style.display=i.style.display="none";if(!o)f()}

btn("Code","10%",()=>tog(()=>d.style.display="block"));
btn("Term","30%",()=>tog(()=>{t.style.display="flex";inp.focus()}));
btn("Info","50%",()=>tog(()=>{upd();i.style.display="block"}));
})();
