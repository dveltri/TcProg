const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const Menu =electron.remote.Menu;
const MenuItem =electron.remote.Menu;
const fs = require('fs');
const { dialog } = require('electron').remote;
//const serialport = require('serialport');
//const createTable = require('data-table');

const MnuTemplate = [
	{
		label:"Archivos",
		submenu:[
		{
			label:"Nuevo",
			click:function(){console.log("New")}
		},{
			label:"Cargar Conf.",
			submenu:[
			{
				label:"Desde Carpeta",
				click:ShwLoadHd		
			},{
				label:"Desde IP",
				click:ShwLoadIP
			}/*,{
				label:"Desde Serial",
				click:ShwLoadSer
			}*/]
		},{
			label:"Guardar Conf",
			enabled:false,
			submenu:[
			{
				label:"En Carpeta",
				click:ShwSaveHd
			},{
				label:"En IP",
				click:ShwSaveIP
			}/*,{
				label:"Por Serial",
				click:function(){console.log("SaveSerial")}
			}*/]
		},{
			type:"separator"
		},{
			label:"Salir",
			click:function(){
				console.log("Exit")
				app.quit()
			}
		}]
	},{
		label:"Configuraciones",
		submenu:[]
	}];

var std_submenu=[
			{
				label:"Estado",
				click:ShwStatus
			},{
				label:"General",
				click:ShwGeneral
			},{
				label:"Funcionamiento",
				click:ShwUtility
			},{
				label:"Comunicacion",
				click:ShwDrvs
			},{
			type:"separator"
			},{
				label:"Recargar",
				click:ReloadSrc
			}];
function Start()
{
	url=document.location.href;
	SvrIp=getparameter("://");
	if(!SvrIp)
	{
		SvrIp="http://localhost";
	}
	LanguageToES();
	percent=0;
	menu = Menu.buildFromTemplate(MnuTemplate);
	menu.items[0].submenu.items[2].enabled=false;
	Menu.setApplicationMenu(menu);
	AutoRefresh=setInterval("fnc0()",150); //executa fnc0 em 50 e 50 milissegundos
	FlyMnu = document.getElementById("divFlyMnu");
}

function ShwStatus(menuItem, browserWindow, event)
{
	SrcIdx = menuItem.SrcIdx;
	TrgIdx=SrcIdx;
	WizrdIdx=0;
	Widx=WiS;
	ReDraw(wizard[Widx][WizrdIdx]);
	console.log("Status")
}

function ShwGeneral(menuItem, browserWindow, event)
{
	SrcIdx = menuItem.SrcIdx;
	TrgIdx=SrcIdx;
	WizrdIdx=0;
	Widx=WiG;
	ReDraw(wizard[Widx][WizrdIdx]);
	console.log("Funcionamiento")
}
function ShwUtility(menuItem, browserWindow, event)
{
	SrcIdx = menuItem.SrcIdx;
	TrgIdx=SrcIdx;
	WizrdIdx=0;
	Widx=WiF;
	ReDraw(wizard[Widx][WizrdIdx]);
	console.log("Funcionamiento")
}
function ShwDrvs(menuItem, browserWindow, event)
{
	SrcIdx = menuItem.SrcIdx;
	TrgIdx=SrcIdx;
	WizrdIdx=0;
	Widx=WiD;
	ReDraw(wizard[Widx][WizrdIdx]);
	console.log("Funcionamiento")
}

function ReloadSrc(menuItem, browserWindow, event)
{
	SrcIdx = menuItem.SrcIdx;
	TrgIdx=SrcIdx;
	LoadConfSrc();
}
function FncNewF()
{
    var content="hola prueba de escritura";
    dialog.showSaveDialog(	(filename)=>{
	if(filename===undefined)
	{
		console.log("No FileName");
		return;
	}
	console.log("Guardando"+filename);
	try
	{
		fs.mkdir(filename, { recursive: true }, (err) => {if(err)throw err;});
		UpPath=filename;
	}
	catch (e)
	{
		alert(e);
	}
	try
	{
		filename+="/text.txt";
		fs.writeFile(filename, content,(err)=>{if(err){console.log("error");return;}});
	}
	catch (e)
	{
		alert(e);
	}
	});
}

/*===========================================================================*/
function LOG(log)
{
	if(Log_En && log)document.getElementById('dgv').innerHTML+=HTMLEncode(log)+"<br />"; //.replace("\n","<br />")
}
function ClsLOG()
{
	if(Log_En)
		document.getElementById('dgv').innerHTML="";
}
function LOGdirect(log)
{
	if(Log_En)document.getElementById('dgv').innerHTML=HTMLEncode(log)+"<br />";
}

/*===========================================================================*/
function ShwPBar(Texto)
{
	document.getElementById("LOADING").style.visibility = "visible";
}
function PBarOff()
{
	document.getElementById("bar1").style.visibility = 'hidden';
	document.getElementById("LOADING").style.visibility = 'hidden';
}
function PBarUpDate()
{
	var circle;
	var c;
	var val;
	ClearAllHome();
	val=percent;
	circle = document.getElementById("progressbar");
	c = circle.getAttribute('r');
	c = Math.PI*(c*2);
	if (val < 0)val = 0;
	if (val > 100)val = 100;
	document.getElementById("progressbarT").setAttribute('data-pct',val);
	val/=100;
	circle.setAttribute("stroke-dasharray",""+(c*(val))+","+(c*(1-val))+"");
	document.getElementById("bar1").style.visibility = 'visible';
}

/*===========================================================================*/
function showFlyMnu(evt,obj)
{
	FlyMnu.innerHTML = obj.HTML;
	FlyMnu.TimeOut = obj.TimeOut;
	if(FlyMnu.TimeOut==0 && obj.HTML.indexOf("hideFlyMnu")==-1)
		FlyMnu.innerHTML+="<input type=\"button\" onclick=\"hideFlyMnu("+FlyMnu.idx+");\" value=\""+Str_Close+"\"  class=\"CssBtn\" />\n";
	FlyMnu.style.display = "block";
	if(evt)
	{
		if(evt.pageX)
		{
			FlyMnu.style.left = evt.pageX + 10 + 'px';
			FlyMnu.style.top = evt.pageY + 10 + 'px';
		}
	}
	//FlyMnu.style.zIndex = ++winCtrl.maxzIndex;
	FlyMnu.idx=obj.idx;
	FlyMnu.Mouse=1;
	if(FlyMnu.TimeOut>0)
		FlyMnu.Tout=setTimeout("hideFlyMnu("+FlyMnu.idx+");",(FlyMnu.TimeOut*2));
	else
		FlyMnu.Tout=null;
}
function SetFlyMnu(html)
{
	FlyMnu.innerHTML =html;
	if(FlyMnu.TimeOut==0 && html.indexOf("hideFlyMnu")==-1)
		FlyMnu.innerHTML+="<input type=\"button\" onclick=\"hideFlyMnu("+FlyMnu.idx+");\" value=\""+Str_Close+"\"  class=\"CssBtn\" />\n";
}
function outFlyMnu(idx)
{
	if(FlyMnu.idx==0)
		return;
	if(FlyMnu.idx!=idx)
		return;
	if(FlyMnu.Mouse==0)
		return;
	FlyMnu.Mouse=0;
	if(FlyMnu.TimeOut>0)
		FlyMnu.Tout=setTimeout("hideFlyMnu("+FlyMnu.idx+");",FlyMnu.TimeOut);
	else
		FlyMnu.Tout=null;

}
function overFlyMnu(idx)
{
	if(FlyMnu.idx==0)
		return;
	if(FlyMnu.idx!=idx)
		return;
	FlyMnu.Mouse=1;
	FlyMnu.style.display = "block";
	//FlyMnu.style.zIndex = ++winCtrl.maxzIndex;
	clearInterval(FlyMnu.Tout);
}
function hideFlyMnu(idx)
{
	/*var inp=FlyMnu.getElementsByTagName("input");
	var x;
	var i=0;
	x=document.activeElement;
	for(i=0;i<inp.length;i++)
	{
		if((inp[i].id)==(x.id))
		{
			FlyMnu.Tout=setTimeout("hideFlyMnu("+idx+");",FlyMnu.TimeOut);
			return;
		}
	}*/
	FlyMnu.idx=0;
  FlyMnu.style.display = "none";
}

/*====================================SVG====================================*/
function setgroup(OBJ,Attrib,valor)
{
	if (OBJ==null)return;
	if (OBJ.childNodes.length)
	{
		for(var temp=0;temp<OBJ.childNodes.length;temp++)
		{
			if(OBJ.childNodes[temp].nodeName!="#text")
			{
				if(OBJ.childNodes[temp].nodeName!="g")
					OBJ.childNodes[temp].setAttribute(Attrib,valor);
				else
					setgroup(OBJ.childNodes[temp],Attrib,valor);
			}
		}
	}
	else
	{
		OBJ.setAttribute(Attrib,valor);
	}
}
function getgroup(OBJ,Attrib,valor)
{
	var rtn=null;
	if (OBJ==null)return;
	if(OBJ.childNodes.length)
	{
		for(var temp=0;temp<OBJ.childNodes.length;temp++)
		{
			if(OBJ.childNodes[temp].nodeName!="#text")
			{
				if(OBJ.childNodes[temp].nodeName!="g")
				{
					var rstyle = OBJ.childNodes[temp].getAttribute(Attrib);//;
					if(rstyle)
					{
						var temp2;
						rstyle=rstyle.split(';');
						for(var j=0; j < rstyle.length; j++)
						{
							temp2=rstyle[j].split(':');
							if(temp2[0] == valor)
								return temp2[1];

						}
					}
				}
				else
					rtn=getgroup(OBJ.childNodes[temp],Attrib,valor);
			}
		}
	}
	else
	{
		var rstyle = OBJ.getAttribute(Attrib);//;
		if(rstyle)
		{
			var temp2;
			rstyle=rstyle.split(';');
			for(var j=0; j < rstyle.length; j++)
			{
				temp2=rstyle[j].split(':');
				if(temp2[0] == valor)
					return temp2[1];
			}
		}
	}
	return rtn;
}

/*===========================================================================*/
function touchstart()
{
	timer = setTimeout(onlongtouch, touchduration);
}
function touchend()
{
	if (timer)
		cleartimeout(timer);
}
onlongtouch = function(){alert("hola");};

/*===========================================================================*/
function Getcookie()
{
}
function createCookie(name,value,days)
{
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

/*===========================================================================*/
function loadjscssfile(id,filename, filetype)
{
	if (document.getElementById(id))
		return;
	if (filetype=="js")
	{ //if filename is a external JavaScript file
		var fileref=document.createElement('script');
		fileref.setAttribute("id",id);
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", filename);
	}
	if (filetype=="css")
	{ //if filename is an external CSS file
		var fileref=document.createElement("link");
		fileref.setAttribute("id",id);
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	}
	if (typeof fileref!="undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref);
}

/*===========================================================================*/
function checkOnlineStatus()
{
	var tempImage = new Image();
	LOG("checkOnlineStatus");
	tempImage.onload = returnOnlineStatus;
	tempImage.onerror = returnOfflineStatus;
	tempImage.src = 'http://www.google.com/images/srpr/logo4w.png';		// this must point to the url of a valid image
}
function returnOnlineStatus()
{
	loadjscssfile("uploadScript","./OpenLayers.js", "js");
	if (winList['sample10'])
		winList['sample10'].open();
	setTimeout("initxgdv()",5000);
}
function returnOfflineStatus()
{
	LOG("Off Line");
}
/*===========================================================================*/

/*{//---------------------------------------------------------------------------
    if (stats.isFile())
        console.log('    file');
    if (stats.isDirectory())
        console.log('    directory');
    console.log('    size: ' + stats["size"]);
    console.log('    mode: ' + stats["mode"]);
    console.log('    others eXecute: ' + (stats["mode"] & 1 ? 'x' : '-'));
    console.log('    others Write:   ' + (stats["mode"] & 2 ? 'w' : '-'));
    console.log('    others Read:    ' + (stats["mode"] & 4 ? 'r' : '-'));
    console.log('    group eXecute:  ' + (stats["mode"] & 10 ? 'x' : '-'));
    console.log('    group Write:    ' + (stats["mode"] & 20 ? 'w' : '-'));
    console.log('    group Read:     ' + (stats["mode"] & 40 ? 'r' : '-'));
    console.log('    owner eXecute:  ' + (stats["mode"] & 100 ? 'x' : '-'));
    console.log('    owner Write:    ' + (stats["mode"] & 200 ? 'w' : '-'));
    console.log('    owner Read:     ' + (stats["mode"] & 400 ? 'r' : '-'));
    console.log('    file:           ' + (stats["mode"] & 0100000 ? 'f' : '-'));
    console.log('    directory:      ' + (stats["mode"] & 0040000 ? 'd' : '-'));
}
*/
