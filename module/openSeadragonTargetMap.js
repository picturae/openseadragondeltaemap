const e=function(e,t){return Number(Math.round(e+"e"+t)+"e-"+t)},t=function(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e},i=function(e){return e&&(e.getRootNode()instanceof Document||e.getRootNode()instanceof ShadowRoot)},r=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n=function(e,t,i){this.name="TargetPatch",this.element=document.createElement("targetPatch"),this.element.style.left=`${100*e.location.x/i.x}%`,this.element.style.top=`${100*e.location.y/i.y}%`,this.element.style.width=`${100*e.location.w/i.x}%`,this.element.style.height=`${100*e.location.h/i.y}%`,t.appendChild(this.element);let n={};for(let[t,i]of Object.entries(e))"location"!==t&&(n[t]=i);if(this.element.dataset.picturaeTargetmapDisplay=JSON.stringify(n),n.validity&&r(n.validity,"valid")){const e=n.validity.valid;this.element.classList.add(e?"valid":"invalid")}},s=function(e,t,i){if(this.name="TargetChart",this.element=document.createElement("targetChart"),this.element.style.left=`${100*e.location.x/i.x}%`,this.element.style.top=`${100*e.location.y/i.y}%`,this.element.style.width=`${100*e.location.w/i.x}%`,this.element.style.height=`${100*e.location.h/i.y}%`,e.location.r&&180===e.location.r){this.element.style.transformOrigin="center center";const t=`rotate(${e.location.r}deg)`;this.element.style.transform=t}t.appendChild(this.element);let s={};for(let[t,i]of Object.entries(e))"location"!==t&&"colorPatches"!==t&&"edgePatches"!==t&&(s[t]=i);if(this.element.dataset.picturaeTargetmapDisplay=JSON.stringify(s),s.validity&&r(s.validity,"valid")){const e=s.validity.valid;this.element.classList.add(e?"valid":"invalid")}this.patches=[];const a={x:e.location.w,y:e.location.h};e.colorPatches&&e.colorPatches.forEach(e=>{e.patchType="color",this.patches.push(new n(e,this.element,a))})},a=e=>Boolean(e&&"string"==typeof e&&1===e.length),o=e=>a(e)&&Boolean(e.match(/[0-9]/)),l=e=>a(e)&&e.toLowerCase()!==e.toUpperCase(),d=e=>a(e)&&e===e.toLowerCase()&&e!==e.toUpperCase(),p=e=>a(e)&&e===e.toUpperCase()&&e!==e.toLowerCase(),c={delimit:[],preserve:[],replace:{},delimitInput:"",delimitLetterNumber:!0,delimitLowerUpper:!0,delimitNumberLetter:!0,delimitUpperLower:!1,delimitUpperUpperLower:!0,delimitOutput:" "},h={postProcess:e=>e,firstWordFirstChar:e=>e,firstWordNextChars:e=>e,nextWordsFirstChar:e=>e,nextWordsNextChars:e=>e},m=(e,t)=>{const i=new RegExp("^"+t),r=new RegExp(t+"$"),n=new RegExp(t+t,"g");return e.replace(i,"").replace(r,"").replace(n,t)},u=(e,t,i,r)=>{let n,s,a,c,h;return n=r.delimitLetterNumber&&l(e)&&o(t),s=r.delimitLowerUpper&&d(e)&&p(t),a=r.delimitNumberLetter&&o(e)&&l(t),c=r.delimitUpperLower&&p(e)&&d(t),h=r.delimitUpperUpperLower&&p(e)&&p(t)&&d(i),n||s||a||c||h},g=e=>(e=>e.replace(/‘’`/g,"'").replace(/“”/g,'"'))(e).replace(/[…,:;[\](){}\-‐–—'".!?]/g,""),f=function(e,t){if(!e)return;const i=Object.assign({},c,t);this.orgin={input:e},e=e.trim().replace(/\s+/g," "),i.delimitInput?this.orgin.normalised=m(e,i.delimitInput):this.orgin.normalised=e,this.orgin.isPureAlphaNumeric=(e=>e&&e.split&&!e.split("").some(e=>!l(e)&&!o(e)))(this.orgin.normalised);let r,n=this.orgin.normalised;r=i.delimitInput?i.delimitInput:(this.orgin.isPureAlphaNumeric,i.delimitOutput);const s=Object.entries(i.replace);if(i.replace&&s.length)for(let[e,t]of s)n=n.replace(new RegExp(e,"g"),t);const a=[].concat(i.preserve,i.delimit);if(a.length&&(a.forEach(e=>{n=n.replace(new RegExp(e,"g"),r+e+r)}),n=m(n,r)),i.delimitInput)this.phrase=n,this.words=n.split(i.delimitInput);else if(this.orgin.isPureAlphaNumeric){let e=n.split(i.delimitOutput);this.phrase=e.map(e=>i.preserve.includes(e)?e:((e,t)=>{let i=e[0];for(let r=1;r<e.length;r++)u(e[r-1],e[r],e[r+1]||"",t)&&(i+=t.delimitOutput),i+=e[r];return i})(e,i)).join(i.delimitOutput),this.words=this.phrase.split(i.delimitOutput)}else this.phrase=n,this.words=n.split(i.delimitOutput);const d=e=>e.toLowerCase(),p=e=>e.toUpperCase(),f=e=>{let t=this.words.map((t,r)=>0===r?i.preserve.includes(t)?t:e.firstWordFirstChar(t.substr(0,1))+e.firstWordNextChars(t.substr(1)):i.preserve.includes(t)?t:e.nextWordsFirstChar(t.substr(0,1))+e.nextWordsNextChars(t.substr(1)));return e.postProcess(t.join(e.delimitOutput))};this.camelCase=()=>{const e=Object.assign({},h,{postProcess:g,delimitOutput:"",firstWordFirstChar:d,firstWordNextChars:d,nextWordsFirstChar:p,nextWordsNextChars:d});return f(e)},this.humanTitle=()=>{const e=Object.assign({},h,{delimitOutput:" ",firstWordFirstChar:p,nextWordsFirstChar:p});return f(e)}};function y(e,t){return t||(t={}),new f(e,t)}const v=function(e){this.name="DisplayTable";const n=document.body,s=document.createElement("table");this.element=s,s.className="picturae-targetmap-display";const a=e=>{if(null===e)return"--";if("boolean"==typeof e){return`<targetBoolean class="${e?"valid":"invalid"}"></targetBoolean>`}if(t(e))return e;if(e instanceof Array&&e.length){if(t(e[0]))return e.join(", ");if("object"==typeof e[0]){let t="";for(let i=0;i<e.length;i++)t+=a(e[i]);return t}}if("object"==typeof e&&!(e instanceof Array)){let t="";for(let[i,r]of Object.entries(e)){let e="";e="boolean"==typeof r?`${a(r)} ${y(i).humanTitle()}<br/>`:`${y(i).humanTitle()}: ${a(r)}<br/>`,e&&(t+=e)}return t+""}},o=(e,t)=>{let i=`<tbody name="${e}">`;for(let[e,r]of Object.entries(t)){let t="";t=`<tr><th>${y(e,{replace:{deltaE:"&Delta;E",DeltaE:"&Delta;E",deltaL:"&Delta;L",DeltaL:"&Delta;L"}}).humanTitle()}</th><td>${a(r)}</td></tr>`,t&&(i+=t)}return i+="</tbody>",i};e.addEventListener("mouseover",(function(e){const t=e.target;"TARGETMAP"===t.tagName||"TARGETCHART"===t.tagName||"TARGETPATCH"===t.tagName?function(e){const t=e.target.dataset.picturaeTargetmapDisplay;if(t){s.innerHTML="";const e=JSON.parse(t);let a="";if(e.patchType&&"color"===e.patchType){a=`<targetColor style="background: ${`rgb(${e.observed.RGB.join()})`};"></targetColor>`}if(s.innerHTML+=`<caption>\n                ${e.name} ${a}\n            </caption>`,e.assessed&&(s.innerHTML+=o("assessed",e.assessed)),e.observed&&(s.innerHTML+=o("observed",e.observed)),e.reference&&(s.innerHTML+=o("reference",e.reference)),e.validity){if(r(e.validity,"valid")){const t=e.validity.valid;s.classList.remove("valid","invalid"),s.classList.add(t?"valid":"invalid")}s.innerHTML+=o("validity",e.validity)}i(s)||n.appendChild(s)}}(e):s.contains(t)||i(s)&&n.removeChild(s),e.stopPropagation()})),e.addEventListener("mousemove",(function(e){e.clientX/n.clientWidth<.5?(s.style.left=`${e.clientX+16}px`,s.style.right="auto"):(s.style.left="auto",s.style.right=`${n.clientWidth-e.clientX+16}px`);const t=(n.clientHeight-s.clientHeight)/2;e.clientY<t-16?(s.style.top=`${e.clientY+16}px`,s.style.bottom="auto"):e.clientY<t+16+s.clientHeight?(s.style.top=`${t}px`,s.style.bottom="auto"):(s.style.top="auto",s.style.bottom=`${n.clientHeight-e.clientY+16}px`),e.stopPropagation()}))},b=function(t){this.name="TargetMap",this.element=document.createElement("targetmap"),t.canvas.appendChild(this.element),this.resize=()=>{if(this.tiledImage=t.world.getItemAt(0),!this.tiledImage)return;const i=this.tiledImage.getBounds(),r=t.viewport.pixelFromPoint(i.getTopLeft()),n=t.viewport.pixelFromPoint(i.getBottomRight());if(!function(){let e=Boolean(arguments.length);return Array.from(arguments).forEach(t=>{e=e&&"number"==typeof t&&Number.isFinite(t)}),e}(r.x,r.y,n.x,n.y))return;const s=e(r.x,4),a=e(r.y,4),o=e(n.x-r.x,4),l=e(n.y-r.y,4);this.element.style.left=`${s}px`,this.element.style.top=`${a}px`,this.element.style.width=`${o}px`,this.element.style.height=`${l}px`},t.addHandler("animation",()=>{this.resize()}),t.addHandler("open",()=>{this.resize()}),t.addHandler("rotate",()=>{this.resize()}),t.addHandler("resize",()=>{this.resize()}),this.resize(),this.charts=[],this.render=e=>{this.element.innerHTML="",e.name||(e.name="Target Scan");let t={};for(let[i,r]of Object.entries(e))"targets"!==i&&(t[i]=r);if(this.element.dataset.picturaeTargetmapDisplay=JSON.stringify(t),t.validity&&r(t.validity,"valid")){const e=t.validity.valid;this.element.classList.add(e?"valid":"invalid")}e.targets.forEach(e=>{this.charts.push(new s(e,this.element,this.tiledImage.getContentSize()))})},new v(document.body)};var x=function(){var e=window.OpenSeadragon;if(!e&&!(e=require("openseadragon")))throw new Error("OpenSeadragon is missing.");e.Viewer.prototype.targetMap=function(){return this._targetMap||(this._targetMap=new b(this)),this._targetMap}}();export default x;
//# sourceMappingURL=openSeadragonTargetMap.js.map
