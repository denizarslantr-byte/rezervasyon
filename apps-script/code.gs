const API_SECRET="PIANO_DERI_SECRET_2025";
const SHEET_HOTELS="Hotels",SHEET_RESERVATIONS="Reservations",SHEET_STAFF="Staff",SHEET_LOGS="Logs";

function jr(d){return ContentService.createTextOutput(JSON.stringify(d)).setMimeType(ContentService.MimeType.JSON);}
function sh(n){return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(n);}
function ok(e){return e&&e.parameter&&String(e.parameter.key)===API_SECRET;}
function td(v){if(!v)return"";if(Object.prototype.toString.call(v)==="[object Date]")return Utilities.formatDate(v,Session.getScriptTimeZone(),"yyyy-MM-dd");let s=String(v).trim();if(s.indexOf("GMT")>-1){try{return Utilities.formatDate(new Date(s),Session.getScriptTimeZone(),"yyyy-MM-dd")}catch(e){}}if(s.includes(".")){let p=s.split(".");if(p.length>=3)return p[2].slice(0,4)+"-"+p[1].padStart(2,"0")+"-"+p[0].padStart(2,"0")}return s.slice(0,10)}
function tt(v){if(!v)return"";if(Object.prototype.toString.call(v)==="[object Date]")return Utilities.formatDate(v,Session.getScriptTimeZone(),"HH:mm");let s=String(v).trim();if(s.indexOf("GMT")>-1){try{return Utilities.formatDate(new Date(s),Session.getScriptTimeZone(),"HH:mm")}catch(e){}}return s.slice(0,5)}
function log(a,u,d){let s=sh(SHEET_LOGS);if(s)s.appendRow([new Date().getTime(),new Date(),a,u,d]);}

function doGet(e){
 if(!ok(e))return jr({success:false,message:"Unauthorized"});
 let a=e.parameter.action;
 if(a==="login")return login(e);
 if(a==="getHotels")return getHotels();
 if(a==="cancelHotel")return cancelHotel(e);
 if(a==="getReservations")return getReservations(e);
 if(a==="cancelReservation")return setStatus(e.parameter.id,"CANCELLED","USER");
 if(a==="updateStatus")return setStatus(e.parameter.id,e.parameter.status,"CENTER");
 if(a==="getStaff")return getStaff();
 if(a==="deleteStaff")return deleteStaff(e);
 if(a==="getLogs")return getLogs(e);
 return jr({success:true,message:"Piano Deri V5.8 API"});
}
function doPost(e){
 if(!ok(e))return jr({success:false,message:"Unauthorized"});
 let a=e.parameter.action;
 if(a==="addHotel")return addHotel(e);
 if(a==="updateHotel")return updateHotel(e);
 if(a==="addReservation")return addRes(e);
 if(a==="updateReservation")return updateRes(e);
 if(a==="updateReservationOps")return updateOps(e);
 if(a==="addStaff")return addStaff(e);
 if(a==="setStaffOff")return setStaffOff(e);
 return jr({success:false,message:"Unknown action"});
}

function login(e){let d=sh(SHEET_HOTELS).getDataRange().getValues();for(let i=1;i<d.length;i++)if(String(d[i][2])===String(e.parameter.code)&&String(d[i][3])===String(e.parameter.password)&&String(d[i][4])==="ACTIVE")return jr({success:true,hotel:d[i][1],code:d[i][2]});return jr({success:false,message:"Hatalı kullanıcı kodu veya şifre"});}
function getHotels(){let d=sh(SHEET_HOTELS).getDataRange().getValues(),r=[];for(let i=1;i<d.length;i++)if(d[i][0])r.push({id:d[i][0],hotel:d[i][1],code:d[i][2],password:d[i][3],status:d[i][4]});return jr(r);}
function addHotel(e){let b=JSON.parse(e.postData.contents),id=new Date().getTime();sh(SHEET_HOTELS).appendRow([id,b.hotel,b.code,b.password,b.status||"ACTIVE",new Date()]);return jr({success:true,id});}
function updateHotel(e){let b=JSON.parse(e.postData.contents),s=sh(SHEET_HOTELS),d=s.getDataRange().getValues();for(let i=1;i<d.length;i++)if(String(d[i][0])===String(b.id)){s.getRange(i+1,2).setValue(b.hotel);s.getRange(i+1,3).setValue(b.code);s.getRange(i+1,4).setValue(b.password);s.getRange(i+1,5).setValue(b.status||"ACTIVE");return jr({success:true});}return jr({success:false,message:"Otel bulunamadı"});}
function cancelHotel(e){let s=sh(SHEET_HOTELS),d=s.getDataRange().getValues();for(let i=1;i<d.length;i++)if(String(d[i][0])===String(e.parameter.id)){s.getRange(i+1,5).setValue("PASSIVE");return jr({success:true});}return jr({success:false});}

function resRow(b){let id=new Date().getTime()+Math.floor(Math.random()*1000);return[id,td(b.date),tt(b.time),b.hotel,Number(b.adult||0),Number(b.child||0),b.nation,b.notes||"",b.status||"PENDING",b.kart||"",b.ayak||"",b.staff1||"",b.staff2||"",b.staff3||"",b.staff4||"",b.girdi||"",b.cikti||"",new Date(),new Date()];}
function addRes(e){let b=JSON.parse(e.postData.contents),r=resRow(b);sh(SHEET_RESERVATIONS).appendRow(r);log("ADD_RESERVATION",b.hotel||"CENTER",r[0]);return jr({success:true,id:r[0]});}
function getReservations(e){let date=td(e.parameter.date||""),hotel=String(e.parameter.hotel||"").trim(),d=sh(SHEET_RESERVATIONS).getDataRange().getValues(),r=[];for(let i=1;i<d.length;i++){if(!d[i][0])continue;let rd=td(d[i][1]),rh=String(d[i][3]||"").trim();if(date&&rd!==date)continue;if(hotel&&rh!==hotel)continue;r.push({id:d[i][0],date:rd,time:tt(d[i][2]),hotel:rh,adult:d[i][4],child:d[i][5],nation:d[i][6],notes:d[i][7],status:d[i][8],kart:d[i][9],ayak:d[i][10],staff1:d[i][11],staff2:d[i][12],staff3:d[i][13],staff4:d[i][14],girdi:d[i][15],cikti:d[i][16],createdAt:d[i][17],updatedAt:d[i][18]});}r.sort((a,b)=>String(a.time).localeCompare(String(b.time)));return jr(r);}
function updateRes(e){let b=JSON.parse(e.postData.contents),s=sh(SHEET_RESERVATIONS),d=s.getDataRange().getValues();for(let i=1;i<d.length;i++)if(String(d[i][0])===String(b.id)){s.getRange(i+1,2).setValue(td(b.date));s.getRange(i+1,3).setValue(tt(b.time));s.getRange(i+1,4).setValue(b.hotel||d[i][3]);s.getRange(i+1,5).setValue(Number(b.adult||0));s.getRange(i+1,6).setValue(Number(b.child||0));s.getRange(i+1,7).setValue(b.nation);s.getRange(i+1,8).setValue(b.notes);s.getRange(i+1,9).setValue("UPDATED");s.getRange(i+1,19).setValue(new Date());return jr({success:true});}return jr({success:false,message:"Rezervasyon bulunamadı"});}
function updateOps(e){let b=JSON.parse(e.postData.contents),s=sh(SHEET_RESERVATIONS),d=s.getDataRange().getValues();for(let i=1;i<d.length;i++)if(String(d[i][0])===String(b.id)){if(b.kart!==undefined)s.getRange(i+1,10).setValue(b.kart);if(b.ayak!==undefined)s.getRange(i+1,11).setValue(b.ayak);if(b.staff1!==undefined)s.getRange(i+1,12).setValue(b.staff1);if(b.staff2!==undefined)s.getRange(i+1,13).setValue(b.staff2);if(b.staff3!==undefined)s.getRange(i+1,14).setValue(b.staff3);if(b.staff4!==undefined)s.getRange(i+1,15).setValue(b.staff4);if(b.girdi!==undefined)s.getRange(i+1,16).setValue(b.girdi);if(b.cikti!==undefined)s.getRange(i+1,17).setValue(b.cikti);if(b.status!==undefined)s.getRange(i+1,9).setValue(b.status);s.getRange(i+1,19).setValue(new Date());return jr({success:true});}return jr({success:false});}
function setStatus(id,status,user){let s=sh(SHEET_RESERVATIONS),d=s.getDataRange().getValues();for(let i=1;i<d.length;i++)if(String(d[i][0])===String(id)){s.getRange(i+1,9).setValue(status);s.getRange(i+1,19).setValue(new Date());return jr({success:true});}return jr({success:false});}

function getStaff(){let d=sh(SHEET_STAFF).getDataRange().getValues(),r=[];for(let i=1;i<d.length;i++)if(d[i][0])r.push({id:d[i][0],name:d[i][1],status:d[i][2],offDates:d[i][3]||""});r.sort((a,b)=>String(a.name).localeCompare(String(b.name),"tr"));return jr(r);}
function addStaff(e){let b=JSON.parse(e.postData.contents),id=new Date().getTime();sh(SHEET_STAFF).appendRow([id,b.name,"ACTIVE","",new Date()]);return jr({success:true,id});}
function setStaffOff(e){let b=JSON.parse(e.postData.contents),s=sh(SHEET_STAFF),d=s.getDataRange().getValues();for(let i=1;i<d.length;i++)if(String(d[i][0])===String(b.id)){let dates=String(d[i][3]||"").split(",").map(x=>x.trim()).filter(Boolean);if(b.off){if(!dates.includes(b.date))dates.push(b.date)}else dates=dates.filter(x=>x!==b.date);s.getRange(i+1,4).setValue(dates.join(","));return jr({success:true});}return jr({success:false});}
function deleteStaff(e){let s=sh(SHEET_STAFF),d=s.getDataRange().getValues();for(let i=1;i<d.length;i++)if(String(d[i][0])===String(e.parameter.id)){s.deleteRow(i+1);return jr({success:true});}return jr({success:false});}
function getLogs(e){return jr([]);}
