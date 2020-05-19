const e=function(e,t){return e<"1e-"+t&&e>"-1e-"+t?0:Number(Math.round(e+"e"+t)+"e-"+t)},t=function(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e},i=function(e){return e&&(e.getRootNode()instanceof Document||e.getRootNode()instanceof ShadowRoot)},r=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n=function(e,t,i){this.name="Patch",this.element=document.createElement("deltaepatch"),this.element.style.left=`${100*e.location.x/i.x}%`,this.element.style.top=`${100*e.location.y/i.y}%`,this.element.style.width=`${100*e.location.w/i.x}%`,this.element.style.height=`${100*e.location.h/i.y}%`,t.appendChild(this.element);let n={};for(let[t,i]of Object.entries(e))"location"!==t&&(n[t]=i);if(this.element.dataset.picturaeDeltaemapDisplay=JSON.stringify(n),n.validity&&r(n.validity,"valid")){const e=n.validity.valid;this.element.classList.add(e?"valid":"invalid")}},s=function(e,t,i){if(this.name="Chart",this.element=document.createElement("deltaechart"),this.element.style.left=`${100*e.location.x/i.x}%`,this.element.style.top=`${100*e.location.y/i.y}%`,this.element.style.width=`${100*e.location.w/i.x}%`,this.element.style.height=`${100*e.location.h/i.y}%`,e.location.r&&180===e.location.r){this.element.style.transformOrigin="center center";const t=`rotate(${e.location.r}deg)`;this.element.style.transform=t}t.appendChild(this.element);let s={};for(let[t,i]of Object.entries(e))"location"!==t&&"colorPatches"!==t&&"edgePatches"!==t&&(s[t]=i);if(this.element.dataset.picturaeDeltaemapDisplay=JSON.stringify(s),s.validity&&r(s.validity,"valid")){const e=s.validity.valid;this.element.classList.add(e?"valid":"invalid")}this.patches=[];const l={x:e.location.w,y:e.location.h};e.colorPatches&&e.colorPatches.forEach(e=>{e.patchType="color",this.patches.push(new n(e,this.element,l))})},l=e=>Boolean(e&&"string"==typeof e&&1===e.length),a=e=>l(e)&&Boolean(e.match(/[0-9]/)),o=e=>l(e)&&e.toLowerCase()!==e.toUpperCase(),d=e=>l(e)&&e===e.toLowerCase()&&e!==e.toUpperCase(),c=e=>l(e)&&e===e.toUpperCase()&&e!==e.toLowerCase(),p={delimit:[],preserve:[],replace:{},delimitInput:"",delimitLetterNumber:!0,delimitLowerUpper:!0,delimitNumberLetter:!0,delimitUpperLower:!1,delimitUpperUpperLower:!0,delimitOutput:" "},h={postProcess:e=>e,firstWordFirstChar:e=>e,firstWordNextChars:e=>e,nextWordsFirstChar:e=>e,nextWordsNextChars:e=>e},m=(e,t)=>{const i=new RegExp("^"+t),r=new RegExp(t+"$"),n=new RegExp(t+t,"g");return e.replace(i,"").replace(r,"").replace(n,t)},u=(e,t,i,r)=>{let n,s,l,p,h;return n=r.delimitLetterNumber&&o(e)&&a(t),s=r.delimitLowerUpper&&d(e)&&c(t),l=r.delimitNumberLetter&&a(e)&&o(t),p=r.delimitUpperLower&&c(e)&&d(t),h=r.delimitUpperUpperLower&&c(e)&&c(t)&&d(i),n||s||l||p||h},f=e=>(e=>e.replace(/‘’`/g,"'").replace(/“”/g,'"'))(e).replace(/[…,:;[\](){}\-‐–—'".!?]/g,""),y=function(e,t){if(!e)return;const i=Object.assign({},p,t);this.orgin={input:e},e=e.trim().replace(/\s+/g," "),i.delimitInput?this.orgin.normalised=m(e,i.delimitInput):this.orgin.normalised=e,this.orgin.isPureAlphaNumeric=(e=>e&&e.split&&!e.split("").some(e=>!o(e)&&!a(e)))(this.orgin.normalised);let r,n=this.orgin.normalised;r=i.delimitInput?i.delimitInput:(this.orgin.isPureAlphaNumeric,i.delimitOutput);const s=Object.entries(i.replace);if(i.replace&&s.length)for(let[e,t]of s)n=n.replace(new RegExp(e,"g"),t);const l=[].concat(i.preserve,i.delimit);if(l.length&&(l.forEach(e=>{n=n.replace(new RegExp(e,"g"),r+e+r)}),n=m(n,r)),i.delimitInput)this.phrase=n,this.words=n.split(i.delimitInput);else if(this.orgin.isPureAlphaNumeric){let e=n.split(i.delimitOutput);this.phrase=e.map(e=>i.preserve.includes(e)?e:((e,t)=>{let i=e[0];for(let r=1;r<e.length;r++)u(e[r-1],e[r],e[r+1]||"",t)&&(i+=t.delimitOutput),i+=e[r];return i})(e,i)).join(i.delimitOutput),this.words=this.phrase.split(i.delimitOutput)}else this.phrase=n,this.words=n.split(i.delimitOutput);const d=e=>e.toLowerCase(),c=e=>e.toUpperCase(),y=e=>{let t=this.words.map((t,r)=>0===r?i.preserve.includes(t)?t:e.firstWordFirstChar(t.substr(0,1))+e.firstWordNextChars(t.substr(1)):i.preserve.includes(t)?t:e.nextWordsFirstChar(t.substr(0,1))+e.nextWordsNextChars(t.substr(1)));return e.postProcess(t.join(e.delimitOutput))};this.camelCase=()=>{const e=Object.assign({},h,{postProcess:f,delimitOutput:"",firstWordFirstChar:d,firstWordNextChars:d,nextWordsFirstChar:c,nextWordsNextChars:d});return y(e)},this.humanTitle=()=>{const e=Object.assign({},h,{delimitOutput:" ",firstWordFirstChar:c,nextWordsFirstChar:c});return y(e)}};function g(e,t){return t||(t={}),new y(e,t)}const v=function(e){this.name="DisplayTable";const n=document.body,s=document.documentElement,l=e.parentNode,a=document.createElement("table");this.element=a,a.className="picturae-deltaemap-display";const o=e=>{if(null===e)return"--";if("boolean"==typeof e){return`<deltaeboolean class="${e?"valid":"invalid"}"></deltaeboolean>`}if(t(e))return e;if(e instanceof Array&&e.length){if(t(e[0]))return e.join(", ");if("object"==typeof e[0]){let t="";for(let i=0;i<e.length;i++)t+=o(e[i]);return t}}if("object"==typeof e&&!(e instanceof Array)){let t="";for(let[i,r]of Object.entries(e)){let e="";e="boolean"==typeof r?`${o(r)} ${g(i).humanTitle()}<br/>`:`${g(i).humanTitle()}: ${o(r)}<br/>`,e&&(t+=e)}return t+""}},d=(e,t)=>{let i=`<tbody name="${e}">`;for(let[e,r]of Object.entries(t)){let t="";t=`<tr><th>${g(e,{replace:{deltaE:" &Delta;E ",DeltaE:" &Delta;E ",deltaL:" &Delta;L ",DeltaL:" &Delta;L "}}).humanTitle()}</th><td>${o(r)}</td></tr>`,t&&(i+=t)}return i+="</tbody>",i};n.addEventListener("mouseover",(function(e){const t=e.target;"DELTAEOVERLAY"===t.tagName||"DELTAECHART"===t.tagName||"DELTAEPATCH"===t.tagName?function(e){const t=e.target.dataset.picturaeDeltaemapDisplay;if(t){a.innerHTML="";const e=JSON.parse(t);let n="";if(e.patchType&&"color"===e.patchType){n=`<deltaecolor style="background: ${`rgb(${e.observed.RGB.join()})`};"></deltaecolor>`}if(a.innerHTML+=`<caption>\n                ${e.name} ${n}\n            </caption>`,e.assessed&&(a.innerHTML+=d("assessed",e.assessed)),e.observed&&(a.innerHTML+=d("observed",e.observed)),e.reference&&(a.innerHTML+=d("reference",e.reference)),e.validity){if(r(e.validity,"valid")){const t=e.validity.valid;a.classList.remove("valid","invalid"),a.classList.add(t?"valid":"invalid")}a.innerHTML+=d("validity",e.validity)}i(a)||l.appendChild(a)}}(e):a.contains(t)||i(a)&&l.removeChild(a),e.stopPropagation()})),n.addEventListener("mousemove",(function(e){e.clientX/s.clientWidth<.5?(a.style.left=`${e.clientX+16}px`,a.style.right="auto"):(a.style.left="auto",a.style.right=`${s.clientWidth-e.clientX+16}px`);const t=(s.clientHeight-a.clientHeight)/2;e.clientY<t-16?(a.style.top=`${e.clientY+16}px`,a.style.bottom="auto"):e.clientY<t+16+a.clientHeight?(a.style.top=`${t}px`,a.style.bottom="auto"):(a.style.top="auto",a.style.bottom=`${s.clientHeight-e.clientY+16}px`),e.stopPropagation()}))},b=function(t){this.name="Overlay",this.element=document.createElement("deltaeoverlay"),t.canvas.appendChild(this.element),this.resize=()=>{if(this.tiledImage=t.world.getItemAt(0),!this.tiledImage)return;const i=this.tiledImage.getBounds(),r=t.viewport.pixelFromPoint(i.getTopLeft()),n=t.viewport.pixelFromPoint(i.getBottomRight());if(!function(){let e=Boolean(arguments.length);return Array.from(arguments).forEach(t=>{e=e&&"number"==typeof t&&Number.isFinite(t)}),e}(r.x,r.y,n.x,n.y))return;const s=e(r.x,4),l=e(r.y,4),a=e(n.x-r.x,4),o=e(n.y-r.y,4);this.element.style.left=`${s}px`,this.element.style.top=`${l}px`,this.element.style.width=`${a}px`,this.element.style.height=`${o}px`},t.addHandler("animation",()=>{this.resize()}),t.addHandler("open",()=>{this.resize()}),t.addHandler("rotate",()=>{this.resize()}),t.addHandler("resize",()=>{this.resize()}),this.resize(),this.charts=[],this.render=e=>{if(this.element.innerHTML="",!(e&&e.validity&&e.targets&&e.assessed))return void console.error("Bad DeltaE JSON");e.name||(e.name="Target Scan");let t={};for(let[i,r]of Object.entries(e))"targets"!==i&&(t[i]=r);if(this.element.dataset.picturaeDeltaemapDisplay=JSON.stringify(t),t.validity&&r(t.validity,"valid")){const e=t.validity.valid;this.element.classList.add(e?"valid":"invalid")}e.targets.forEach(e=>{this.charts.push(new s(e,this.element,this.tiledImage.getContentSize()))})},new v(this.element)};var x=function(){var e=window.OpenSeadragon;if(!e&&!(e=require("openseadragon")))throw new Error("OpenSeadragon is missing.");e.Viewer.prototype.deltaEMap=function(){return this._deltaEMap||(this._deltaEMap=new b(this)),this._deltaEMap}}();export default x;
//# sourceMappingURL=openSeadragonDeltaEMap.js.map
