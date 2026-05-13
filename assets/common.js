function checkApiConfig(){return API_URL && !API_URL.includes("BURAYA_APPS_SCRIPT");}
function showApiWarning(id="apiWarning"){const e=document.getElementById(id);if(!e)return;if(!checkApiConfig()){e.innerHTML="API_URL ayarlanmamış. config/config.js dosyasına Apps Script Web App URL yazılmalı.";e.style.display="block";}else e.style.display="none";}
function buildParams(action,params={}){return new URLSearchParams({action,key:API_KEY,...params});}
async function apiGet(action,params={}){const q=buildParams(action,params);const r=await fetch(`${API_URL}?${q}`);return await r.json();}
async function apiPost(action,body){const q=buildParams(action);const r=await fetch(`${API_URL}?${q}`,{method:"POST",body:JSON.stringify(body)});return await r.json();}
