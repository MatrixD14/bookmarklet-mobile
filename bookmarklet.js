javascript:(function(){
let p=document.createElement('div');
p.style="position:fixed;top:0;left:0;width:100%;height:0;z-index:9999;transition:.25s;height;background:#111;color:#eee;font:16px monospace;display:flex;flex-direction:column";
document.body.appendChild(p);

let d=document.createElement('div');
let html=document.documentElement.outerHTML
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
html=html.replace(/(&lt;!--[\s\S]*?--&gt;)/g,'<span style="color:#6a9955;">$1</span>')
         .replace(/(&lt;[^\s&]+)([\s\S]*?)(&gt;)/g,function(m,t,b,e){
            b=b.replace(/(\w+)=(["\'].*?["\'])/g,'<span style="color:#9cdcfe;">$1</span>=<span style="color:#ce9178;">$2</span>');
            let cdg='<span style="color:#569cd6;">'+t+'</span>'+b+'<span style="color:#569cd6;">'+e+'</span>';
            return t=='&lt;br'?cdg:(t.startsWith("&lt;/")?cdg:'<br>'+cdg);
         });
d.style='width:100%;height:93%;overflow:auto;padding:10px;background:#252526;color:#d4d4d4;font-family:monospace;';
d.innerHTML=html;
p.appendChild(d);

let t=document.createElement('div');
t.style="flex:1;display:none;flex-direction:column;background:#000;color:#0f0";
let log=document.createElement('textarea');
log.style="flex:1;background:#000;color:#0f0;border:none";log.readOnly=1;
let inp=document.createElement('input');
inp.style="padding:4px;background:#111;color:#fff;border:none;font-size:16px";
t.appendChild(log);t.appendChild(inp);p.appendChild(t);
inp.onkeydown=e=>{if(e.key=="Enter"){try{log.value+="\n>"+inp.value+"\n"+eval(inp.value)}catch(x){log.value+="\nERR:"+x}inp.value="";log.scrollTop=log.scrollHeight}};

let i=document.createElement('div');
i.style="flex:1;display:none;overflow:auto;padding:10px;background:#1e1e1e;color:#ddd;font-family:monospace;";
p.appendChild(i);

function makeTable(title,obj){
  let html=`<h3 style="margin:5px 0;color:#4fc1ff">${title}</h3>`;
  if(Object.keys(obj).length===0) return html+"<div style='color:#666'>vazio</div>";
  html+="<table style='width:100%;border-collapse:collapse;font-size:14px'>";
  for(let k in obj){
    html+=`<tr>
             <td style="border:1px solid #444;padding:2px 5px;color:#9cdcfe;width:30%">${k}</td>
             <td style="border:1px solid #444;padding:2px 5px;color:#ce9178">${obj[k]}</td>
           </tr>`;
  }
  html+="</table>";
  return html;
}

function upd(){
  let cookieObj={};
  document.cookie.split(";").map(c=>c.trim()).forEach(c=>{
    if(!c) return;
    let eq=c.indexOf("=");
    if(eq>-1) cookieObj[c.slice(0,eq)]=c.slice(eq+1);
  });

  let lsObj={};
  for(let k of Object.keys(localStorage)) lsObj[k]=localStorage.getItem(k);

  let ssObj={};
  for(let k of Object.keys(sessionStorage)) ssObj[k]=sessionStorage.getItem(k);

  i.innerHTML=makeTable("Cookies",cookieObj)+
              makeTable("localStorage",lsObj)+
              makeTable("sessionStorage",ssObj);
}
function btn(txt,pos,fn){let b=document.createElement('button');b.textContent=txt;b.style="position:fixed;transform:translate(-50,-50);font-size:30px;bottom:0;right:"+pos+";z-index:1";b.onclick=fn;document.body.appendChild(b)}
function tog(f){let o=p.style.height!="0px";p.style.height=o?"0":"60%";d.style.display=t.style.display=i.style.display="none";if(!o)f();else clearInterval(intervalId);}

btn("Code","10%",()=>tog(()=>d.style.display="block"));
btn("Term","30%",()=>tog(()=>{t.style.display="flex";inp.focus()}));
btn("Info","50%",()=>tog(()=>{upd();let intervalId=setInterval(upd,3000);i.style.display="block"}));
})();
