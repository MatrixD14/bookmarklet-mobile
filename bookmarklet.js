javascript:(function(){
  let panel = document.createElement('div');
  panel.style='position:fixed;top:0;left:0;width:100%;height:0%;z-index:9999;transition:height 0.3s;';
  document.body.appendChild(panel);

  let d = document.createElement('div');
  let html = document.documentElement.outerHTML
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g,'<span style="color:#6a9955;">$1</span>')
             .replace(/(&lt;[^\s&]+)([\s\S]*?)(&gt;)/g,function(m,t,b,e){
               b = b.replace(/(\w+)=(["\'].*?["\'])/g,'<span style="color:#9cdcfe;">$1</span>=<span style="color:#ce9178;">$2</span>');
               return '<span style="color:#569cd6;">'+t+'</span>'+b+'<span style="color:#569cd6;">'+e+'</span><br>';
             });
  d.style='width:100%;height:93%;overflow:auto;padding:0 10px 0 10px;background:#252526;color:#d4d4d4;font-family:monospace;';
  d.innerHTML = html;
  panel.appendChild(d);

  let term = document.createElement('div');
  term.style='width:100%;height:93%;display:flex;flex-direction:column;overflow:hidden;padding:0;background:#1e1e1e;color:#d4d4d4;font-family:monospace;';

  let log = document.createElement('textarea');
  log.style='flex:1;width:100%;padding:10px;background:#252526;color:#d4d4d4;border:none;outline:none;font-family:monospace;font-size:14px;resize:none;';
  log.readOnly = true;
  term.appendChild(log);

  let input = document.createElement('input');
  input.style='width:100%;padding:10px 10px 5px 10px;background:white;color:black;border:none;outline:none;font-family:monospace;font-size:20px;';
  input.placeholder='';
  term.appendChild(input);

  input.addEventListener('keydown', function(e){
    if(e.key==='Enter'){
      let cmd = input.value;
      input.value='';
      try{
        let res = eval(cmd);
        log.value += '> '+cmd+'\n'+res+'\n';
      } catch(err){
        log.value += '> '+cmd+'\nError: '+err+'\n';
      }
      log.scrollTop = log.scrollHeight;
    }
  });
  panel.appendChild(term);

  let btnT = document.createElement('button');
  btnT.textContent='Terminal';
  btnT.style='position:fixed;bottom:0;right:0;transform:translate(-50%,-50%);z-index:10000;padding:10px 30px;font-size:16px;';
  btnT.onclick=function(){
    panel.style.height = (panel.style.height=='0%'?'100%':'0%');
    if(panel.style.height=='50%') input.focus();
    d.style.display='none';
    term.style.display='flex';
  };

  let btnC = document.createElement('button');
  btnC.textContent='Code';
  btnC.style='position:fixed;bottom:0;right:25%;transform:translate(-50%,-50%);z-index:10000;padding:10px 30px;font-size:16px;';
  btnC.onclick=function(){
    panel.style.height = (panel.style.height=='0%'?'100%':'0%');
    d.style.display='block';
    term.style.display='none';
  };

  document.body.appendChild(btnT);
  document.body.appendChild(btnC);

  d.style.display='block';
  term.style.display='none';
})();