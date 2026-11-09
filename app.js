'use strict';
const D=window.RESEARCH_DATA;
const $=id=>document.getElementById(id);
const labels={rgb:'输入 RGB',gt:'冻结人工标注',gg:'GG 适配基线',global:'全图方法',ours:'本文方法 · 全图＋局部',ours_clip:'本文方法＋OpenCLIP',gaga:'GaGa＋OpenCLIP',trace:'Trace3D 自动提取＋OpenCLIP',trace_raw:'Trace3D 原始实例（无类别过滤）'};
let block='3',frameIndex=0;
const source=m=>`assets/views/b${block}/${D.frames[block][frameIndex]}-${m}.webp`;
function active(selector,key,value){document.querySelectorAll(selector).forEach(b=>{const yes=b.dataset[key]===String(value);b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes));});}
function updateImages(){
 const left=$('left-method').value,right=$('right-method').value;
 for(const [side,m] of [['left',left],['right',right]]){$(`${side}-image`).src=source(m);$(`${side}-image`).alt=`Block${block} ${D.frames[block][frameIndex]} ${labels[m]}`;$(`${side}-label`).textContent=labels[m];}
 $('frame-count').textContent=`${frameIndex+1} / ${D.frames[block].length}`;$('frame-select').value=String(frameIndex);
 if(!$('all-methods').hidden)renderGrid();
}
function setBlock(b){block=String(b);frameIndex=0;active('#scene-tabs button','block',block);$('frame-select').replaceChildren(...D.frames[block].map((f,i)=>{const o=document.createElement('option');o.value=i;o.textContent=f;return o;}));updateImages();}
function renderGrid(){const box=$('all-methods');box.replaceChildren();for(const m of ['rgb','gt','gg','global','ours','gaga','trace','trace_raw']){const fig=document.createElement('figure'),img=document.createElement('img'),cap=document.createElement('figcaption');img.src=source(m);img.alt=`Block${block} ${D.frames[block][frameIndex]} ${labels[m]}`;img.loading='lazy';img.tabIndex=0;cap.textContent=labels[m];img.addEventListener('click',()=>zoom(img));img.addEventListener('keydown',e=>{if(e.key==='Enter')zoom(img)});fig.append(img,cap);box.append(fig);}}
document.querySelectorAll('#scene-tabs button').forEach(b=>b.addEventListener('click',()=>setBlock(b.dataset.block)));
$('frame-select').addEventListener('change',e=>{frameIndex=Number(e.target.value);updateImages()});
for(const [id,step] of [['previous',-1],['next',1]])$(id).addEventListener('click',()=>{frameIndex=(frameIndex+step+D.frames[block].length)%D.frames[block].length;updateImages()});
for(const id of ['left-method','right-method'])$(id).addEventListener('change',updateImages);
$('split-range').addEventListener('input',e=>$('comparison').style.setProperty('--split',`${e.target.value}%`));
$('grid-toggle').addEventListener('click',()=>{const show=$('all-methods').hidden;$('all-methods').hidden=!show;$('grid-toggle').setAttribute('aria-expanded',String(show));$('grid-toggle').textContent=show?'收起全部面板 ↑':'展开全部 8 个面板 ↗';if(show)renderGrid()});
const findings={'2':'建筑 IoU +2.92 个百分点、PQ +0.37；道路 IoU −1.55。局部补充并非对所有类别均有收益。','3':'建筑 IoU +1.70 个百分点、道路 IoU +2.75、PQ +1.90。当前配置下三项指标均优于全图方法。','4':'建筑 IoU +4.03 个百分点、道路 IoU +3.17、PQ +2.22；但 GaGa 的建筑 PQ 更高。'};
function results(b){active('#result-tabs button','result',b);$('table-caption').textContent=`Block${b} · 指标单位 %，越高越好`;$('result-finding').textContent=findings[b];const rows=D.metrics[b],maxima=[1,2,3].map(k=>Math.max(...rows.map(r=>r[k])));$('results-body').replaceChildren(...rows.map(r=>{const tr=document.createElement('tr');if(r[0]==='ours')tr.className='ours-row';r.forEach((v,i)=>{const td=document.createElement('td');td.textContent=i===0?labels[v]:i<4?v.toFixed(2):v;if(i>0&&i<4&&v===maxima[i-1])td.className='best';tr.append(td)});return tr;}));}
document.querySelectorAll('#result-tabs button').forEach(b=>b.addEventListener('click',()=>results(b.dataset.result)));
const routes=[['12.835','0.975–2.775'],['9.187','1.075–3.775'],['13.194','0.775–2.275']];
document.querySelectorAll('#task-tabs button').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.task);active('#task-tabs button','task',n);$('route-image').src=`assets/nav/route-${n}.webp`;$('route-image').alt=`Block4任务${n+1}本文方法规划路径`;$('height-image').src=`assets/nav/height-${n}.webp`;$('height-image').alt=`任务${n+1}原始路径高度曲线`;$('route-length').textContent=routes[n][0];$('route-z').textContent=routes[n][1]}));
function zoom(img){$('lightbox-image').src=img.src;$('lightbox-image').alt=img.alt;$('lightbox-caption').textContent=img.alt;$('lightbox').showModal();}
document.querySelectorAll('.failure-grid img,.nav-figure img,.detail-image').forEach(img=>{img.tabIndex=0;img.addEventListener('click',()=>zoom(img));img.addEventListener('keydown',e=>{if(e.key==='Enter')zoom(img)})});
$('close-lightbox').addEventListener('click',()=>$('lightbox').close());$('lightbox').addEventListener('click',e=>{if(e.target===$('lightbox'))$('lightbox').close()});
setBlock('3');results('3');
