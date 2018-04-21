;(function(g){var NON_HOST_TYPES={"boolean":1,"number":1,"string":1,"undefined":1},VENDOR_PREFIXES=["Webkit","Moz","O","ms","Khtml"],d=isHostType(g,"document")&&g.document,el=d&&isHostType(d,"createElement")&&d.createElement("DiV"),freeExports=typeof exports=="object"&&exports,freeModule=typeof module=="object"&&module,testCache={};function has(name){if(typeof testCache[name]=="function"){testCache[name]=testCache[name](g,d,el);}
return testCache[name];}
function add(name,test,now){testCache[name]=now?test(g,d,el):test;}
function cssprop(name,el){var supported=false,capitalized=name.charAt(0).toUpperCase()+name.slice(1),length=VENDOR_PREFIXES.length,style=el.style;if(typeof style[name]=="string"){supported=true;}else{while(length--){if(typeof style[VENDOR_PREFIXES[length]+capitalized]=="string"){supported=true;break;}}}
return supported;}
function clearElement(el){if(el){while(el.lastChild){el.removeChild(el.lastChild);}}
return el;}
function isHostType(object,property){var type=typeof object[property];return type=="object"?!!object[property]:!NON_HOST_TYPES[type];}
function all(){var name,ret={};for(name in testCache){try{ret[name]=has(name);}catch(e){ret[name]="error";ret[name].ERROR_MSG=e.toString();}}
return ret;}
has.all=all;has.add=add;has.clearElement=clearElement;has.cssprop=cssprop;has.isHostType=isHostType;has._tests=testCache;has.add("dom",function(g,d,el){return d&&el&&isHostType(g,"location")&&isHostType(d,"documentElement")&&isHostType(d,"getElementById")&&isHostType(d,"getElementsByName")&&isHostType(d,"getElementsByTagName")&&isHostType(d,"createComment")&&isHostType(d,"createElement")&&isHostType(d,"createTextNode")&&isHostType(el,"appendChild")&&isHostType(el,"insertBefore")&&isHostType(el,"removeChild")&&isHostType(el,"getAttribute")&&isHostType(el,"setAttribute")&&isHostType(el,"removeAttribute")&&isHostType(el,"style")&&typeof el.style.cssText=="string";});try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}
if(typeof define=="function"&&typeof define.amd=="object"&&define.amd){define("has",function(){return has;});}
else if(freeExports){if(freeModule&&freeModule.exports==freeExports){(freeModule.exports=has).has=has;}
else{freeExports.has=has;}}
else{g["has"]=has;}})(this);