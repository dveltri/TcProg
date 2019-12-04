
function ShwLoadHd()
{
	percent=0;
	PBarOff();
	var temp=dialog.showOpenDialog({ properties: ['openDirectory'],defaultPath:"./Conf" });
	if(temp && temp!="")
	{
		temp=temp[0];
		SvrIp=temp;
		temp=temp.split("/Conf/");
		if(temp.length>1)
		{
			temp[1]=temp[1].split("/");
			AddSrcNow(temp[1][0],'12345',0);
		}
	}
}
function ShwSaveHd()
{
	percent=0;
	PBarOff();
	UpPath="";
	dialog.showSaveDialog( (DirName)=>{
	if(DirName===undefined)
		return;
	try
	{
		fs.mkdir(DirName, { recursive: true }, (err) => {if(err)throw err;});
		fs.mkdir(DirName+"/err", { recursive: true }, (err) => {if(err)throw err;});
		for(var i=0;i<PrgEd[SrcIdx].GlobalParms.Controllers;i++)
		{
			fs.mkdir(DirName+"/"+i, { recursive: true }, (err) => {if(err)throw err;});
			fs.mkdir(DirName+"/"+i+"/err", { recursive: true }, (err) => {if(err)throw err;});
		}
		PrgBk[TrgIdx].host=DirName;
		PrgBk[TrgIdx].Typ=0;
		FoceUpLoad=1;
		setTimeout("SendConf();",50);
	}
	catch (e)
	{
		alert(e);
	}
	});
}
function ShwLoadIP()
{
	percent=0;
	PBarOff();
	ClearAllHome();
	var out="";
	out+="<form>";
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"5\" cellspacing=\"5\" bordercolor=\"LightGrey\">\n";
	out+="\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_IP_Address+"</font>\n\
	</td>\n\
	<td>\n\
	<input type=\"text\" class=\"CssInText\" id=\"IPADD\" size=\"15\" maxlength=\"15\"  value=\"\" onkeyup=\"if(updIpToAdd(this.value)==true){document.getElementById('AddSrcItmB').enabled=true;}else{document.getElementById('AddSrcItmB').enabled=false;}\" />\n\
	</td>\n\
	</tr>\n";
	out+="\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_Passwords+"</font>\n\
	</td>\n\
	<td>\n\
	<input type=\"password\" id=\"SrcWAC\" size=\"5\" Value=\"\" maxlength=\"5\" class=\"CssInText\" />\n\
	</td>\n\
	</tr>\n\
	<tr align=\"center\">\n\
	<td align=\"center\" colspan=\"2\">\n\
	<input type=\"submit\" id=\"AddSrcItmB\" class=\"CssBtn\" onclick=\"if(this.value!=''){AddSrcNow(GetEth(),document.getElementById('SrcWAC').value,1);return false;};\" value=\""+Str_Add+"\" />\n\
	</td>\n\
	</tr>\n";
	out+="</table>\n";
	out+="</form>";
	document.getElementById("HOME1").innerHTML=out;
	//return out;
}
function ShwSaveIP()
{
	percent=0;
	PBarOff();
	ClearAllHome();
	var out="";
	out+="<form>";
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"5\" cellspacing=\"5\" bordercolor=\"LightGrey\">\n";
	out+="\
	<tr align=\"center\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_IP_Address+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_Passwords+"</font>\n\
	</td>\n\
	</tr>\n";
	out+="\
	<tr align=\"center\">\n\
	<td>\n\
	<input type=\"text\" class=\"CssInText\" id=\"IPADD\" size=\"15\" maxlength=\"15\"  value=\""+PrgBk[TrgIdx].GlobalParms.ETH0.join('.')+"\" onkeyup=\"if(updIpToAdd(this.value)==true){document.getElementById('AddSrcItmB').enabled=true;}else{document.getElementById('AddSrcItmB').enabled=false;}\" />\n\
	</td>\n\
	<td>\n\
	<input type=\"password\" id=\"SrcWAC\" size=\"5\" Value=\""+PrgBk[TrgIdx].SrcWAC+"\" maxlength=\"5\" class=\"CssInText\" />\n\
	</td>\n\
	</tr>\n\
	<tr align=\"center\">\n\
	<td align=\"center\" colspan=\"2\">\n\
	<input type=\"submit\" id=\"AddSrcItmB\" class=\"CssBtn\" onclick=\"send2ip();return false;\" value=\""+Str_save+"\" />\n\
	</td>\n\
	</tr>\n";
	out+="</table>\n";
	out+="</form>";
	document.getElementById("HOME1").innerHTML=out;
	}
function send2ip()
{
	PrgBk[TrgIdx].host="http://"+GetEth();
	PrgBk[TrgIdx].Typ=1;
	PrgBk[TrgIdx].DGVFTP='info.fls';
	FoceUpLoad=1;
	PrgBk[TrgIdx].SrcWAC=document.getElementById('SrcWAC').value;
	WAC=PrgBk[TrgIdx].SrcWAC;
	setTimeout("SendConf();",50);
}
function ShwLoadSer()
{
	var out="";
	out+="<form>";
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"5\" cellspacing=\"5\" bordercolor=\"LightGrey\">\n";
	out+="\
	<tr align=\"center\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_Serial_Port+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_Passwords+"</font>\n\
	</td>\n\
	</tr>\n";
	
	out+="\
	<tr align=\"center\">\n\
	<td>\n\
	<input id=\"ETH3\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\"\" />\n\
	</td>\n\
	<td>\n\
	<input type=\"password\" id=\"SrcWAC\" size=\"5\" Value=\"\" maxlength=\"5\" class=\"CssInText\" />\n\
	</td>\n\
	</tr>\n\
	<tr align=\"center\">\n\
	<td align=\"center\" colspan=\"2\">\n\
	<input type=\"submit\" id=\"AddSrcItmB\" class=\"CssBtn\" onclick=\"if(this.value!=''){return false;};\" value=\""+Str_Add+"\" />\n\
	</td>\n\
	</tr>\n";
	out+="</table>\n";
	out+="</form>";// */
	ClearAllHome();
	document.getElementById("HOME1").innerHTML=out;
	//return out;
}

//------------------------------------------------------------------------------------
function ShwHdAdm()
{
	var out="";
	out+="<table border=\"0\" cellpadding=\"10\" cellspacing=\"10\" align=\"center\" >\n";
	out+="<tr align=\"center\" >\n";
	out+=" <td valign=\"top\" align=\"center\">\n";
	if(SvrSrc.length)
	{
		out+="<table  border=\"1\" bgcolor=\"LightGrey\" bordercolor=\"LightGrey\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" >\n";
		out+="	<tr align=\"center\" bgcolor=\"#E0E0E0\">\n";
		out+="		<td align=\"center\" valign=\"middle\">\n";
		out+="		<font size=\"1\" face=\"arial\">Cargar Configuraciones almacenada</font>\n";
		out+="		</td>\n";
		out+="	</tr>\n";
		out+="	<tr>\n";
		out+="		<td align=\"center\" valign=\"top\">\n";
		out+="			<select id=\"LstHdSrc\" class=\"CssSelect\" onchange=\"if(this.value!=''){AddSrcNow(this.value,WAC,0);return false;};\">\n";
		out+=GenOptionHdSrc();
		out+="			</select>\n";
		out+="		</td>\n";
		out+="	</tr>\n";
		out+="</table>\n";
	}
	out+=" </td>\n";
	out+=" <td valign=\"top\" align=\"center\">\n";
	if(SvrSrc.length)
	{
		out+="<table  border=\"1\" bgcolor=\"LightGrey\" bordercolor=\"LightGrey\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" >\n";
		out+="	<tr align=\"center\" bgcolor=\"#E0E0E0\">\n";
		out+="		<td align=\"center\" valign=\"middle\">\n";
		out+="		<font size=\"1\" face=\"arial\">Borrar Configuraciones almacenada</font>\n";
		out+="		</td>\n";
		out+="	</tr>\n";
		out+="	<tr>\n";
		out+="		<td align=\"center\" valign=\"top\">\n";
		out+="			<select id=\"DelHdSrc\" class=\"CssSelect\" onchange=\"if(this.value!=''){DelHdItm(this.value)};\">\n";
		out+=GenOptionHdSrc();
		out+="			</select>\n";
		out+="		</td>\n";
		out+="	</tr>\n";
		out+="</table>\n";
	}
	out+=" </td>\n";
	out+="<td valign=\"top\" align=\"center\">\n";
	{
		out+="\
		<form name=\"Loading\" method=\"get\" action=\"\">\n\
		<table border=\"1\" bgcolor=\"LightGrey\" bordercolor=\"LightGrey\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" >\n\
		<tr align=\"center\">\n\
		<td  colspan=\"2\" >\n\
		<font size=\"1\" face=\"arial\">Crear nueva configuacione en el almacenamiento</font>\n\
		</td>\n\
		</tr>\n\
		<tr align=\"center\">\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">Modelo</font>\n\
		</td>\n\
		<td>\n\
		<select id=\"TypSrc\" class=\"CssSelect\" onchange=\"\">\n";
		out+=GenOptions(OptAddSrc,"");
		out+="</select>\n\
		</td>\n\
		</tr>\n\
		<tr align=\"center\">\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">"+Str_Name+"</font>\
		</td>\n\
		<td>\n\
		<input id=\"ID\" size=\"25\" Value=\"\" maxlength=\"25\" onkeypress=\"return blockSpecialChar(event);\" type=\"text\" class=\"CssInText\" />\n\
		</td>\n\
		</tr>\n\
		<tr align=\"center\">\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">"+Str_IP_Address+"</font>\n\
		</td>\n\
		<td>\n\
		<input id=\"ETH0\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\"\" onkeyup=\"updIpToAdd(event)\" />\n\
		<input id=\"ETH1\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\"\" onkeyup=\"updIpToAdd(event)\" />\n\
		<input id=\"ETH2\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\"\" onkeyup=\"updIpToAdd(event)\" />\n\
		<input id=\"ETH3\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\"\" onkeyup=\"updIpToAdd(event)\" />\n\
		</td>\n\
		</tr>\n\
		<tr align=\"center\">\n\
		<td  colspan=\"2\" >\n\
		<input type=\"submit\" id=\"AddSrcItmB\" class=\"CssBtn\" onclick=\"AddHdItm(document.getElementById('ID').value,document.getElementById('TypSrc').value,GetEth());return false;\" value=\""+Str_Add+"\" />\n\
		</td>\n\
		</tr>\n\
		</table>\n\
		</form>\n";
	}
	out+="</td>\n";
	out+="</tr>\n";
	out+="</table>\n";
	//----------------*/
	out="";
	//--------------------------------------------------------------------------------------
	out+="<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"325\">\n";
	out+="<tr><td>\n";
	//-----------------
	out+="<table cellspacing=\"0\" cellpadding=\"1\" border=\"1\" width=\"300\" >\n";
	out+="<tr style=\"color:white;background-color:grey\">\n";
	out+="<th>Nombre</th>\n";
	out+="<th>Direccion</th>\n";
    out+="</tr>\n";
	out+="</table>\n";
	//-----------------
	out+="</td></tr>\n";
	out+="<tr><td>\n";
	//-----------------
	out+="<div style=\"width:320px; height:60px; overflow:auto;\">\n";
	out+="<table cellspacing=\"0\" cellpadding=\"1\" border=\"1\" width=\"300\" >\n";
	/*<tr>
	<td>new item</td>
	<td>new item</td>
	</tr>*/
	out+="</table>\n";
	out+="</div>\n";
	out+="</td></tr>\n";
	out+="</table>\n";
	return out;
}
function GenOptionHdSrc()
{
	var out="";
	out+="<option value=\"\"></option>\n";
	for(var i=0;i<SvrSrc.length;i++)
	{
		out+="<option value=\""+SvrSrc[i].Name+"\">"+SvrSrc[i].Name+"</option>\n";
	}
	return out;
}
function RcvSvrSrc(Datos)
{
	if(Datos.status==200)
	{
		SvrSrc="";
		FilterFileList='';
		FileListDat=FileList2Txt(Datos);
		FileListDat=FileList2Array(FileListDat);
		FileListDat=FileList2Obj(FileListDat);
		SvrSrc=FileListDat.slice();
	}
}
function DelHdItm(ID)
{
	ID=Remplace(ID," ","_");
	request=GetUrl('../AddCtrl.jsp?ID='+ID+'&Cmd=del',RcvSvrSrc); 
	document.getElementById('ListSrc').innerHTML="";
}
function AddHdItm(ID,model,IP)
{
	if(ID=="" || model=="" || IP=="")
		return;
	ID=Remplace(ID," ","_");
	//--------------------------------------------------------------
	request=GetUrl('../AddCtrl.jsp?ID='+ID+'&Model='+model+'&IpAdd='+IP+'&Msk=255.255.255.0',RcvSvrSrc);
	setTimeout("AddSrcNow('"+ID+"','12345',0)",1000);
}

//------------------------------------------------------------------------------------
function updIpToAdd(entry)
{
	var blocks=entry.split(".");
	if(blocks.length===4)
	{
		return blocks.every(function(block){return parseInt(block,10) >=0 && parseInt(block,10) <= 255;});
	}
	return false;
}
function GetEth()
{
	return document.getElementById("IPADD").value;
}
function AddSrcNow(ID,wac,typ)
{
	//--------------------------------------------------------------
	SrcIdx = PrgEd.length;
	TrgIdx=SrcIdx;
	PrgEd[SrcIdx] =  new Object();
	PrgEd[SrcIdx].Log ="";
	PrgEd[SrcIdx].SrcWAC = wac;
	PrgEd[SrcIdx].GlobalParms=  new Object();
	PrgEd[SrcIdx].GlobalParms.ID=ID;
	//--------------------------------------------------------------
	PrgBk[SrcIdx] =  new Object();
	PrgBk[SrcIdx].Log ="";
	PrgBk[SrcIdx].SrcWAC = wac;
	PrgBk[SrcIdx].GlobalParms=  new Object();
	PrgBk[SrcIdx].GlobalParms.ID=ID;
	//--------------------------------------------------------------
	percent=0;
	if(typ==0)
	{
		PrgEd[SrcIdx].Typ=typ;
		PrgEd[SrcIdx].host="file:/"+SvrIp;
		PrgEd[SrcIdx].DGVFTP='info.jsp';
		PrgBk[SrcIdx].Typ=typ;
		PrgBk[SrcIdx].host="file:/"+SvrIp;
		PrgBk[SrcIdx].DGVFTP='info.jsp';
	}
	if(typ==1)
	{
		PrgEd[SrcIdx].Typ=typ;
		PrgEd[SrcIdx].host="http://"+ID+"/";
		PrgEd[SrcIdx].DGVFTP='info.fls';
		PrgBk[SrcIdx].Typ=typ;
		PrgBk[SrcIdx].host="http://"+ID+"/";
		PrgBk[SrcIdx].DGVFTP='info.fls';
	}
	if(typ==2)
	{
		PrgEd[SrcIdx].Typ=typ;
		PrgEd[SrcIdx].host="http://"+ID+"/";
		PrgEd[SrcIdx].DGVFTP='info.fls';
		PrgBk[SrcIdx].Typ=typ;
		PrgBk[SrcIdx].host="http://"+ID+"/";
		PrgBk[SrcIdx].DGVFTP='info.fls';
	}
	PrgEd[SrcIdx].host=Remplace(PrgEd[SrcIdx].host,'///','//');
	PrgBk[SrcIdx].host=Remplace(PrgBk[SrcIdx].host,'///','//');
	LoadConfSrc();
}

//---------------------------------------
function ShwListSrc()
{
	var out="";
	var dif="";
	if(PrgEd.length==0)
		return out;
	out+="<table  border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" background=\"\">\n";
	out+="<tr align=\"center\" bgcolor=\"#E0E0E0\">\n";
	out+="	<td align=\"center\">\n";
	out+="	</td>\n";
	out+="	<td align=\"center\" valign=\"middle\">\n";
	out+="		<font size=\"1\" face=\"arial\">"+Str_Source+"</font>\n";
	out+="	</td>\n";
	out+="	<td align=\"center\" valign=\"middle\">\n";
	out+="		<font size=\"1\" face=\"arial\">"+Str_IP_Address+"</font>\n";
	out+="	</td>\n";
	out+="	<td align=\"center\" valign=\"middle\">\n";
	out+="		<font size=\"1\" face=\"arial\">"+Str_Target+"</font>\n";
	out+="	</td>\n";
	out+="	<td align=\"center\">\n";
	out+="	</td>\n";
	out+="	<td align=\"center\">\n";
	out+="	</td>\n";
	out+="</tr>\n";
	//---------------------------------------------------------------------
	out+="<tr align=\"center\">\n";
	out+="	<td align=\"center\">\n";
	out+="	</td>\n";
	out+="	<td align=\"center\" valign=\"middle\">\n";
	out+="		<a href=\"\" onclick=\"percent=0;LoadConfSrc();return false;\">\n";
	out+="[Reload]";
	out+="		</a>\n";
	out+="	</td>\n";
	out+="	<td align=\"center\" valign=\"middle\">\n";
	out+="	</td>\n";
	out+="	<td align=\"center\">\n";
	if(PrgEd[TrgIdx].Typ)
		out+=GetMenu([Conf_save,Ctrl_Sch,Ctrl_Plns,Ctrl_Rst]);
	else
		out+=GetMenu([Conf_save]);
	out+="	</td>\n";
	out+="	<td align=\"center\" valign=\"middle\">\n";
	out+="	</td>\n";
	out+="	<td align=\"center\">\n";
	out+="	</td>\n";
	out+="</tr>\n";
	var bgcolor="";
	for(var i=0;i<PrgEd.length;i++)
	{
		if(PrgEd[i].Typ)
			((i%2)==0?bgcolor="#B0FFB0":bgcolor="#60FF60")
		else
			((i%2)==0?bgcolor="#E0E0E0":bgcolor="#C0C0C0")
		out+="<tr bgcolor=\""+bgcolor+"\" align=\"center\">\n";
		out+="	<td align=\"center\">\n";
		if(i==SrcIdx)
		{
			dif="";
			dif+=compare2objects(PrgEd[SrcIdx].GlobalParms,	PrgEd[TrgIdx].GlobalParms);
			dif+=compare2objects(PrgEd[SrcIdx].PLCs,		PrgEd[TrgIdx].PLCs);
			dif+=compare2objects(PrgEd[SrcIdx].PHASEs,		PrgEd[TrgIdx].PHASEs);
			dif+=compare2objects(PrgEd[SrcIdx].IOs,			PrgEd[TrgIdx].IOs);
			dif+=compare2objects(PrgEd[SrcIdx].Srv,			PrgEd[TrgIdx].Srv);
			dif+=compare2objects(PrgEd[SrcIdx].ErrorsCfg,	PrgEd[TrgIdx].ErrorsCfg);
			dif+=compare2objects(PrgEd[SrcIdx].DefIn,		PrgEd[TrgIdx].DefIn);
			if(dif!="")
				out+="<img border=\"0\" src=\"./img/sts/alt2.jpg\" width=\"20\" height=\"20\" onclick=\"alert('Dif Destino:"+dif+"')\" title=\"Fuente diferente al Destino\"/>";
		}
		dif="";
		dif+=compare2objects(PrgEd[i].GlobalParms,	PrgBk[i].GlobalParms);
		dif+=compare2objects(PrgEd[i].PLCs,			PrgBk[i].PLCs);
		dif+=compare2objects(PrgEd[i].PHASEs,		PrgBk[i].PHASEs);
		dif+=compare2objects(PrgEd[i].IOs,			PrgBk[i].IOs);
		dif+=compare2objects(PrgEd[i].Srv,			PrgBk[i].Srv);
		dif+=compare2objects(PrgEd[i].ErrorsCfg,	PrgBk[i].ErrorsCfg);
		dif+=compare2objects(PrgEd[i].DefIn,		PrgBk[i].DefIn);
		if(dif!="")
			out+="<img border=\"0\" src=\"./img/sts/mod.jpg\" width=\"20\" height=\"20\" onclick=\"alert('Dif Backup:"+dif+"')\" title=\"Modificado\"/>";
		//-----------------------------------------------------------------------------------
		out+="	</td>\n";
		out+="	<td align=\"center\">\n";
		out+="		<font size=\"1\" face=\"arial\"></font>\n";
		out+="		 <input type=\"radio\" id=\"SelSrc\" name=\"SelSrc\" value=\""+i+"\" onclick=\"chgsrc("+i+");\" "+(SrcIdx==i?"checked=\"checked\"":"")+" />\n";
		out+="	</td>\n";
		out+="	<td align=\"center\">\n";
		out+="		<font size=\"1\" face=\"arial\">"+PrgEd[i].GlobalParms.ID+" "+GetOption(OptAddSrc,PrgEd[i].GlobalParms.MODEL);
		if(PrgEd[i].Typ==0)
			out+="			<a href=\"\" onclick=\"AddSrcNow('"+Remplace(""+PrgEd[i].GlobalParms.ETH0,",",".")+"','"+PrgEd[i].SrcWAC+"',1);return false;\" >["+Remplace(PrgEd[i].GlobalParms.ETH0,",",".")+"]</a>";
		if(PrgEd[i].Typ==1)
			out+="			["+Remplace(""+PrgEd[i].GlobalParms.ETH0,",",".")+"]";
		out+="		</font>\n";
		out+="	</td>\n";
		out+="	<td align=\"center\">\n";
		out+="		<font size=\"1\" face=\"arial\"></font>\n";
		out+="		 <input type=\"radio\" id=\"SelTrg\" name=\"SelTrg\" value=\""+i+"\" onclick=\"chgtrg("+i+");\" "+(TrgIdx==i?"checked=\"checked\"":"")+" />\n";
		out+="	</td>\n";
		out+="	<td align=\"center\">\n";
		if(PrgEd[i].Log!="")
			out+="		<img border=\"0\" src=\"./img/error1.jpg\" width=\"20\" height=\"20\" onclick=\"alert(PrgEd["+i+"].Log);\" title=\"\"/>";
		out+="	</td>\n";
		out+="	<td align=\"center\">\n";
		out+="		<img border=\"0\" src=\"./img/off.png\" width=\"20\" height=\"20\" onclick=\"if(confirm(Str_Delet+' ['+PrgEd["+i+"].GlobalParms.ID+' Ip:'+PrgEd["+i+"].GlobalParms.ETH0+']?')){DelSrcItm("+i+")};\" title=\"\"/>";
		out+="	</td>\n";
		out+="</tr>\n";
	}
	out+="</table>\n";
	return out;
}
function DelSrcItm(idx)
{
	PrgEd.splice(idx,1);
	PrgBk.splice(idx,1);
	TrgIdx=0;
	SrcIdx=0;
	chgsrc(0);
	chgtrg(0);
}
function chgsrc(idx)
{
	if(idx<PrgEd.length)
	{
		Src2Ed(idx);
		SrcIdx=idx;
	}
	ReDraw(conf_phases);
}
function chgtrg(idx)
{
	if(idx<PrgEd.length)
	{
		TrgIdx=idx;
		Bk2edbk(idx);
	}
	ReDraw(conf_phases);
}

//---------------------------------------
function LoadConfSrc()
{
	var request=0;
	PBarUpDate();
	switch(percent)
	{
		case 0:
		{
			PrgEd[SrcIdx].Log="";
			percent=1;
			ShwPBar('Loading General...');
			request=GetUrl(PrgEd[SrcIdx].host+'/startup.ini',RcvConfSrc);
		}
		break;
		case 2:
		{
			ShwPBar('Loading Global vars...');
			request=1;
			//request=GetUrl(PrgEd[SrcIdx].host+'/gvar.bin',RcvConfSrc);
			percent=3;
		}
		break;
		case 3:
		{
			ShwPBar('Loading de Phases 2...');
			request=GetUrl(PrgEd[SrcIdx].host+'/phconf.ini',RcvConfSrc);
		}
		break;
		case 4:
		{
			ShwPBar('Loading de Controladores...');
			request=GetUrl(PrgEd[SrcIdx].host+'/plcs.ini',RcvConfSrc);
		}
		break;
		case 6:
		case 8:
		case 10:
		case 12:
		{
			ShwPBar('Loading Lista de Planes...');
			FilterFileList='.eil';
			if(PrgEd[SrcIdx].Typ==0)
				GetFls(PrgEd[SrcIdx].host+'/'+PlcIdx,RcvConfSrc);
			else
				request=GetUrl(PrgEd[SrcIdx].host+'/'+PrgEd[SrcIdx].DGVFTP+'?path=/'+PlcIdx,RcvConfSrc);
		}
		break;
		case 13:
		{
			Errors.length=0;
			ShwPBar('Loading Lista de Errores generales');
			FilterFileList='';
			if(PrgEd[SrcIdx].Typ==0)
				GetFls(PrgEd[SrcIdx].host+'/err',RcvConfSrc);
			else
				request=GetUrl(PrgEd[SrcIdx].host+'/'+PrgEd[SrcIdx].DGVFTP+'?path=/err',RcvConfSrc);
		}
		break;
		case 14:
		case 16:
		case 18:
		case 20:
		{
			ShwPBar('Loading Lista de Errores...');
			FilterFileList='';
			if(PrgEd[SrcIdx].Typ==0)
				GetFls(PrgEd[SrcIdx].host+'/'+PlcIdx+'/err',RcvConfSrc);
			else
				request=GetUrl(PrgEd[SrcIdx].host+'/'+PrgEd[SrcIdx].DGVFTP+'?path=/'+PlcIdx+'/err',RcvConfSrc);
		}
		break;
		case 22:
		case 24:
		case 26:
		case 28:
		{
			if(PLCs[PlcIdx].Sec!="")
			{
				ShwPBar('Loading Conflictos...');
				request=GetUrl(PrgEd[SrcIdx].host+'/'+PLCs[PlcIdx].Sec.replace("//","/"),RcvConfSrc);
			}
			else
			{
				request=1;
				PlcIdx++;
				percent+=2;
				if(PlcIdx>=GlobalParms.Controllers)
				{
					PlcIdx=0;
					percent=30;
				}
			}
		}
		break;
		case 30:
		case 32:
		case 34:
		case 36:
		{
			ShwPBar('Loading Agenda...');
			request=GetUrl(PrgEd[SrcIdx].host+'/'+PLCs[PlcIdx].Scheduler,RcvConfSrc);
		}
		break;
		case 38:
		{
			if(GlobalParms.MODEL.indexOf("M4")!=-1)
			{
				ShwPBar('Loading Links...');
				request=GetUrl(PrgEd[SrcIdx].host+'/ip.ini',RcvConfSrc);
			}
			else
			{
				if(GlobalParms.MODEL.indexOf("M3")!=-1)
				{
					ShwPBar('Loading Links...');
					request=GetUrl(PrgEd[SrcIdx].host+'/comm.ini',RcvConfSrc);
				}
				else
				{
					request=1;
					percent=39;
				}
			}
		}
		break;
		case 39:
		{
			if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4")!=-1)
			{
				ShwPBar('Loading NTP conf...');
				request=GetUrl(PrgEd[SrcIdx].host+'/ntp.ini',RcvConfSrc);
			}
			else
			{
				request=1;
				percent=40;
			}
		}
		break;
		case 40:
		{
			ShwPBar('Loading OPCT...');
			request=GetUrl(PrgEd[SrcIdx].host+'/opct.ini',RcvConfSrc);
		}
		break;
		case 41:
		{
			if(GlobalParms.MODEL.indexOf("M4")!=-1)
			{
				ShwPBar('Loading GPS...');
				request=GetUrl(PrgEd[SrcIdx].host+'/gps.ini',RcvConfSrc);
			}
			else
			{
				request=1;
				percent=42;
			}
		}
		break;
		case 42:
		case 44:
		case 46:
		case 48:
		{
			ShwPBar('Loading Lista de entre verdes...');
			FilterFileList='.ini';
			PLCs[PlcIdx].PhcList.length=0;
			if(PrgEd[SrcIdx].Typ==0)
				GetFls(PrgEd[SrcIdx].host+'/'+PlcIdx,RcvConfSrc);
			else
				request=GetUrl(PrgEd[SrcIdx].host+'/'+PrgEd[SrcIdx].DGVFTP+'?path=/'+PlcIdx,RcvConfSrc);
		}
		break;
		case 49:
		{
			if (PLCs[PlcIdx].PhcList.length)
			{
				ShwPBar('Loading entre verdes...'+PLCs[PlcIdx].PhcList[PLCs[PlcIdx].EV.length].Path+"/"+PLCs[PlcIdx].PhcList[PLCs[PlcIdx].EV.length].Name);
				request=GetUrl(PrgEd[SrcIdx].host+"/"+PLCs[PlcIdx].PhcList[PLCs[PlcIdx].EV.length].Path+"/"+PLCs[PlcIdx].PhcList[PLCs[PlcIdx].EV.length].Name,RcvConfSrc);
			}
			else
			{
				request=1;
				percent=50;
			}
		}
		break;
		case 50:
		{
			ShwPBar('Loading DgvP Conf...');
			request=GetUrl(PrgEd[SrcIdx].host+'/dgvp.ini',RcvConfSrc);
		}
		break;
		case 51:
		{
			ShwPBar('Loading SrvDgvP Conf...');
			request=GetUrl(PrgEd[SrcIdx].host+'/sdgvp.ini',RcvConfSrc);
		}
		break;
		case 52:
		{
			ShwPBar('Loading Error Conf...');
			request=GetUrl(PrgEd[SrcIdx].host+'/error.ini',RcvConfSrc);
		}
		break;
		case 54:
		case 55:
		case 56:
		case 57:
		{
			ShwPBar('Loading Plan Manual control...');
			request=GetUrl(PrgEd[SrcIdx].host+'/'+PlcIdx+'/'+'/planmc.es3',RcvConfSrc);
		}
		break;
		case 58:
		case 59:
		case 60:
		case 61:
		{
			ShwPBar('Loading Plan Centralized control...');
			request=GetUrl(PrgEd[SrcIdx].host+'/'+PlcIdx+'/'+'/planotu.es3',RcvConfSrc);
		}
		break;
		case 62:
		case 63:
		case 64:
		case 65:
		{
			ShwPBar('Loading Plans Local control...');
			request=GetUrl(PrgEd[SrcIdx].host+'/'+PlcIdx+'/'+'/plans.es3',RcvConfSrc);
		}
		break;
		case 83:
		{
			ShwPBar('Loading Phases Group..');
			request=GetUrl(PrgEd[SrcIdx].host+'/ph_group.phg',RcvConfSrc);
		}
		break;
		case 84:
		{
			ShwPBar('Loading Def In...');
			request=GetUrl(PrgEd[SrcIdx].host+'/def_in.ini',RcvConfSrc);
		}
		break;
		case 85:
		{
			ShwPBar('Loading OTU...');
			request=GetUrl(PrgEd[SrcIdx].host+'/OTU.ini',RcvConfSrc);
		}
		break;
		case 86:
		{
			ShwPBar('Loading Master...');
			request=GetUrl(PrgEd[SrcIdx].host+'/Master.ini',RcvConfSrc);
		}
		break;
		case 87:
		{
			request=1;
			percent=88;
			//ShwPBar('Loading iteris...');
			//request=GetUrl(PrgEd[SrcIdx].host+'/Iteris.ini',RcvConfSrc);
		}
		break;
		case 88:
		{
			request=1;
			percent=90;
			//ShwPBar('Loading dgv...');
			//request=GetUrl(PrgEd[SrcIdx].host+'/dgvsoft.ini',RcvConfSrc);
		}
		break;
		case 90:
		{
			if (Errors.length)
			{
				ShwPBar('Loading Errors data...'+Errors[ErrIdx].Path+"/"+Errors[ErrIdx].Name);
				request=GetUrl(PrgEd[SrcIdx].host+"/"+Errors[ErrIdx].Path+"/"+Errors[ErrIdx].Name,RcvConfSrc);
			}
			else
			{
				request=1;
				percent=100;
			}
		}
		break;
		case 100:
		{
			Ed2Src(SrcIdx);
			Ed2Bk(SrcIdx);
			Bk2edbk(SrcIdx);
			var d=null;
			d = new Date();
			//--------------------------------
			for(var x=0;x<MnuTemplate[1].submenu.length;x++)
			{
				if(MnuTemplate[1].submenu[x].label.indexOf(PrgBk[SrcIdx].GlobalParms.ID+" (")!=-1)
					break
			}
			if(x==MnuTemplate[1].submenu.length)
			{
				MnuTemplate[1].submenu.push({label:PrgBk[SrcIdx].GlobalParms.ID+" ("+d.getHours()+":"+d.getMinutes()+")",submenu:[]});
				std_submenu[0].SrcIdx=SrcIdx;
				std_submenu[1].SrcIdx=SrcIdx;
				std_submenu[2].SrcIdx=SrcIdx;
				std_submenu[3].SrcIdx=SrcIdx;
				std_submenu[5].SrcIdx=SrcIdx;
				MnuTemplate[1].submenu[x].submenu=new Array();
				std_submenu.forEach(function(item, index){MnuTemplate[1].submenu[x].submenu[index]=Object.assign({},item)});
				menu = Menu.buildFromTemplate(MnuTemplate);
				Menu.setApplicationMenu(menu);
				menu.items[0].submenu.items[2].enabled=true;
			}
			else
			{
				MnuTemplate[1].submenu[x].label=PrgBk[SrcIdx].GlobalParms.ID+" ("+d.getHours()+":"+d.getMinutes()+")";
				menu = Menu.buildFromTemplate(MnuTemplate);
				Menu.setApplicationMenu(menu);
			}
			//--------------------------------
			percent=0;
			PBarOff();
			WizrdIdx=0;
			if(PrgEd[SrcIdx].Typ==0)
			{
				Widx=WiG;
				ReDraw(wizard[Widx][WizrdIdx]);
			}
			if(PrgEd[SrcIdx].Typ==1)
			{
				Widx=WiS;
				ReDraw(wizard[Widx][WizrdIdx]);
			}
			return percent;
		}
		break;
	}
	PBarUpDate();
	if(request)
	{
		setTimeout("LoadConfSrc()",50);
	}
	return percent;
}

function RcvConfSrc(Datos)
{
	var Error="";
	if(Datos.status!=200)
	{
		RcvErRtr++;
		Error="[Error:"+http.readyState+","+http.status+":"+http.statusText+":"+http.urlx+"]\n";
		PrgEd[SrcIdx].Log+=Error;
		Error="";
		if(RcvErRtr>9)
			RcvErRtr=0;
	}
	else
	{
		RcvErRtr=0;
	}
	if(RcvErRtr==0)
	{
		switch(percent)
		{
			case 0:
			case 1:// startup.ini
			{
				if(Datos.status==200)
				{
					RcvStartup(Datos);
					percent=2;
				}
				else
				{
					Error=Str_Error_Src_Not_found;
				}
			}
			break;
			case 2://	addvar.ini
			{
				if(Datos.status==200)
					GlobalParms.addvar=Datos.responseText;
				percent=3;
			}
			break;
			case 3:// phconf.ini
			{
				if(Datos.status==200)
					RcvPhConf(Datos);
				percent=4;
			}
			break;
			case 4://	plcs.ini
			{
				if(Datos.status==200)
					RcvPlc(Datos);
				percent=6;
				PlcIdx=0;
			}
			break;
			case 6:	//	/0/ls *.eil
			case 8:	//	/1/ls *.eil
			case 10://	/2/ls *.eil
			case 12://	/3/ls *.eil
			{
				if(Datos.status==200)
				{
					FileListDat=FileList2Txt(Datos);
					FileListDat=FileList2Array(FileListDat);
					FileListDat=FileList2Obj(FileListDat);
					PLCs[PlcIdx].PlanList=FileListDat.slice();
				}
				PlcIdx++;
				percent+=2;
				if(PlcIdx>=GlobalParms.Controllers)
				{
					PlcIdx=0;
					percent=13;
				}
			}
			break;
			case 13://	/err/ls *.txt
			{
				if(Datos.status==200)
				{
					FileListDat=FileList2Txt(Datos);
					FileListDat=FileList2Array(FileListDat);
					FileListDat=FileList2Obj(FileListDat);
					Errors=FileListDat.slice();
				}
				percent=14;
			}
			break;
			case 14://	/0/err/ls *.txt
			case 16://	/1/err/ls *.txt
			case 18://	/2/err/ls *.txt
			case 20://	/3/err/ls *.txt
			{
				if(Datos.status==200)
				{
					FileListDat=FileList2Txt(Datos);
					FileListDat=FileList2Array(FileListDat);
					FileListDat=FileList2Obj(FileListDat);
					Errors=Errors.concat(FileListDat);
				}
				PlcIdx++;
				percent+=2;
				if(PlcIdx>=GlobalParms.Controllers)
				{
					for(var i=0;i<Errors.length;i++)
						Errors[i].Datos="";
					PlcIdx=0;
					percent=22;
					LogPLCs();
				}
			}
			break;
			case 22://	/0/sec.sec
			case 24://	/1/sec.sec
			case 26://	/2/sec.sec
			case 28://	/3/sec.sec
			{
				if(Datos.status==200)
					RcvSec(Datos);
				PlcIdx++;
				percent+=2;
				if(PlcIdx>=GlobalParms.Controllers)
				{
					PlcIdx=0;
					percent=30;
					LogPHASEs();
				}
			}
			break;
			case 30://PLCs[0].sch(ag.sch)
			case 32://PLCs[1].sch(ag.sch)
			case 34://PLCs[2].sch(ag.sch)
			case 36://PLCs[3].sch(ag.sch)
			{
				if(Datos.status==200)
				{
					RcvAgenda(Datos);
					PLCs[PlcIdx].HolyDays=HolyDays;
					PLCs[PlcIdx].WeekDays=WeekDays;//owl.deepCopy()
					PLCs[PlcIdx].TimeScheduler=TimeScheduler;//owl.deepCopy();
				}
				PlcIdx++;
				percent+=2;
				for(var i=1;i<PLCs.length;i++)
				{
					if(PLCs[i-1].Scheduler==PLCs[i].Scheduler)
					{
						PLCs[i].HolyDays=HolyDays;//owl.deepCopy();
						PLCs[i].WeekDays=WeekDays;//owl.deepCopy();
						PLCs[i].TimeScheduler=TimeScheduler;//owl.deepCopy();
						PlcIdx++;
						percent+=2;
					}
				}
				if(PlcIdx>=GlobalParms.Controllers)
				{
					PlcIdx=0;
					percent=38;
				}
			}
			break;
			case 38:// ip.ini
			{
				if(Datos.status==200)
				RcvIP(Datos);
				percent=39;
			}
			break;
			case 39:// NTP.ini
			{
				if(Datos.status==200)
					RcvFile(Datos);
				percent=40;
			}
			break;
			case 40:// opct.ini
			{
				if(Datos.status==200)
					RcvOPCT(Datos);
				percent=41;
			}
			break;
			case 41:// gps.ini
			{
				if(Datos.status==200)
					RcvFile(Datos);
				percent=42;
			}
			break;
			case 42://	/0/ls *.phc
			case 44://	/0/ls *.phc
			case 46://	/0/ls *.phc
			case 48://	/0/ls *.phc
			{
				if(Datos.status==200)
				{
					FileListDat=FileList2Txt(Datos);
					FileListDat=FileList2Array(FileListDat);
					FileListDat=FileList2Obj(FileListDat);
					PLCs[PlcIdx].PhcList=FileListDat.slice();
					PLCs[PlcIdx].EV.length=0;
				}
				PlcIdx++;
				percent+=2;
				if(PlcIdx>=GlobalParms.Controllers)
				{
					PlcIdx=0;
					percent=49;
				}
			}
			break;
			case 49:// PLCs[PlcIdx].PhcList content of phc files
			{
				if(Datos.status==200)
				{
					Datos=Datos.responseText;
					Datos=Datos.trim();
					Datos=RemComment(Datos)
					PLCs[PlcIdx].EV[PLCs[PlcIdx].EV.length]=Datos;
				}
				if(PLCs[PlcIdx].PhcList.length==PLCs[PlcIdx].EV.length)
					PlcIdx++;
				if(PlcIdx>=GlobalParms.Controllers)
				{
					PlcIdx=0;
					percent=50;
				}
			}
			break;
			case 50: // dgvp.ini
			{
				if(Datos.status==200)
				RcvFile(Datos);
				percent=51;
			}
			break;
			case 51: // sdgvp.ini
			{
				if(Datos.status==200)
					RcvFile(Datos);
					percent=52;
				}
			break;
			case 52: // error.ini
			{
				if(Datos.status==200)
					RcvError(Datos);
				percent=54;
			}
			break;
			case 54:// /0/planmc.es3
			case 55:// /1/planmc.es3
			case 56:// /2/planmc.es3
			case 57:// /3/planmc.es3
			{
				if(Datos.status==200)
				{
					//PLCs[PlcIdx].McPlan=RcvES3(Datos);
					//if(PLCs[PlcIdx].McPlan.length==1)PLCs[PlcIdx].McPlan=PLCs[PlcIdx].McPlan[0];
				}
				PlcIdx++;
				percent++;
				if(PlcIdx>=GlobalParms.Controllers)
				{
					PlcIdx=0;
					percent=58;
				}
			}
			break;
			case 58:// /0/planotu.es3
			case 59:// /1/planotu.es3
			case 60:// /2/planotu.es3
			case 61:// /3/planotu.es3
			{
				if(Datos.status==200)
				{
					//PLCs[PlcIdx].OTUPlan=RcvES3(Datos);
					//if(PLCs[PlcIdx].OTUPlan.length==1)PLCs[PlcIdx].OTUPlan=PLCs[PlcIdx].OTUPlan[0];
				}
				PlcIdx++;
				percent++;
				if(PlcIdx>=GlobalParms.Controllers)
				{
					PlcIdx=0;
					percent=62;
				}
			}
			break;
			case 62:// /0/plans.es3
			case 63:// /1/plans.es3
			case 64:// /2/plans.es3
			case 65:// /3/plans.es3
			{
				if(Datos.status==200)
				{
					RcvPlns(Datos);
				}
				PlcIdx++;
				percent++;
				if(PlcIdx>=GlobalParms.Controllers)
				{
					PlcIdx=0;
					percent=84;
				}
			}
			break;
			case 83:// ph_group.phg
			{
				if(Datos.status==200)
					RcvPHG(Datos);
				percent=84;
			}
			break;
			case 84:// def_in.ini
			{
				if(Datos.status==200)
					RcvDefIn(Datos);
				percent=85;
			}
			break;
			case 85:// otu.ini
			{
				if(Datos.status==200)
					RcvOTU(Datos);
				percent=86;
			}
			break;
			case 86:// master.ini
			{
				if(Datos.status==200)
					RcvFile(Datos);
				percent=87;
			}
			break;
			case 87:// iteris.ini
			{
				if(Datos.status==200)
					RcvIteris(Datos);
				percent=88;
			}
			break;
			case 88:// dgvsoft.ini
			{
				if(Datos.status==200)
					RcvDGV(Datos);
				percent=90;
				ErrIdx=0;
			}
			break;
			case 90:// Error content of files
			{
				if(Datos.status==200)
				{
					Datos=Datos.responseText;
					Datos=Datos.trim();
					Datos=RemComment(Datos)
					Errors[ErrIdx].Datos=Datos;
				}
				ErrIdx++;
				if(ErrIdx>=Errors.length)
				{
					ErrIdx=0;
					PlcIdx=0;
					percent=100;
				}
			}
			break;
		}
	}
	//--------------------------------------
	if(Error=="")
	{
		setTimeout("LoadConfSrc()",50);
	}
	else
	{
		percent=0;
		PBarOff();
		setTimeout("alert('"+Error+"')",500);
		DelSrcItm(SrcIdx);
		request=GetUrl('../AddCtrl.jsp',RcvSvrSrc);
		setTimeout("ShwAddSrcCtl()",500);
	}
}
function SendConf()
{
	var temp=0;
	var stemp="";
	var ttemp="";
	PBarUpDate();
	if(UpMode==0)
	{
		switch(percent)
		{
			case 0:
			{
				ShwPBar(Str_Uploading);
				if(PrgBk[TrgIdx].Typ==0)
				{
					if(GlobalParms.ID!=BkGlobalParms.ID)	// cambio de nombre
					{
					}
				}
				Ed2Src(SrcIdx);
				percent+=3;
			}
			break;
			case 3://autoini
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_Initial_Plan;
				ttemp=SendPlanAI(PrgBk[TrgIdx]);
				stemp=SendPlanAI(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=2;
			}
			break;
			case 5://plan98
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_Initial_Plan;
				ttemp=SendPlan98A(PrgBk[TrgIdx]);
				stemp=SendPlan98A(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=2;
			}
			break;
			case 7://ip.ini
			{
				ttemp=SendIP(PrgBk[TrgIdx]);
				stemp=SendIP(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=1;
			}
			break;
			case 8://ntp
			{
				ttemp=SendNTP(PrgBk[TrgIdx]);
				stemp=SendNTP(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=1;
			}
			break;
			case 9://gps.ini
			{
				ttemp=SendGPS(PrgBk[TrgIdx]);
				stemp=SendGPS(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=3;
			}
			break;
			case 12://def_in.ini
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_Config_Inputs;
				ttemp=SendDefIn(PrgBk[TrgIdx]);
				stemp=SendDefIn(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=4;
			}
			break;
			case 16://otu.ini
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_OTU;
				ttemp=SendOTU(PrgBk[TrgIdx]);
				stemp=SendOTU(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				PlcIdx=0;
				CEV=0;
				if(PrgEd[SrcIdx].PLCs[PlcIdx] && PrgBk[TrgIdx].PLCs[PlcIdx])
					if(PrgEd[SrcIdx].PLCs[PlcIdx].EV.length<PrgBk[TrgIdx].PLCs[PlcIdx].EV.length)
						PrgBk[TrgIdx].PLCs[PlcIdx].EV.length=PrgEd[SrcIdx].PLCs[PlcIdx].EV.length;
				percent+=4;
			}
			break;
			case 20://entreverdes
			case 24:
			case 28:
			case 32:
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_OTU_Menu2+" "+(PlcIdx+1);
				ttemp=SendEv(PrgBk[TrgIdx]);
				stemp=SendEv(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent-=4;
				CEV++;
				if(CEV>=PrgEd[SrcIdx].PLCs[PlcIdx].EV.length)
				{
					CEV=0;
					PlcIdx++;
					if(PlcIdx>=PrgEd[SrcIdx].GlobalParms.Controllers)
					{
						PlcIdx=0;
						percent=32;
						PlnIdx=0;
					}
					if(PrgEd[SrcIdx].PLCs[PlcIdx] && PrgBk[TrgIdx].PLCs[PlcIdx])
						if(PrgEd[SrcIdx].PLCs[PlcIdx].EV.length<PrgBk[TrgIdx].PLCs[PlcIdx].EV.length)
							PrgBk[TrgIdx].PLCs[PlcIdx].EV.length=PrgEd[SrcIdx].PLCs[PlcIdx].EV.length;
				}
				percent+=4;
			}
			break;
			case 36://planes .txt
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_Plans+" "+(PlcIdx+1);
				if(PlnIdx<PLCs[PlcIdx].Plans.length)
				{
					//------------------------
					ttemp="";
					if(PlnIdx<BkPLCs[PlcIdx].Plans.length)
					{
						PlanGen=BkPLCs[PlcIdx].Plans[PlnIdx];
						if(PlanGen.EV!=0)
							SetPhConf(BkPLCs[PlcIdx].EV[PlanGen.EV-1]);
						else
							SetPhConf(BkGlobalParms.phconf);
						UpdateTimes(BkPLCs[PlcIdx],PlanGen);
						ttemp=SavePlan(BkPLCs[PlcIdx],BkGlobalParms,PlanGen);
						//------------------------
						PlanGen=PLCs[PlcIdx].Plans[PlnIdx];
						if(PlanGen.EV!=0)
							SetPhConf(PLCs[PlcIdx].EV[PlanGen.EV-1]);
						else
							SetPhConf(GlobalParms.phconf);
						UpdateTimes(PLCs[PlcIdx],PlanGen);
						stemp=SavePlan(PLCs[PlcIdx],GlobalParms,PlanGen);
						//------------------------
						if(ttemp!==stemp || FoceUpLoad)
						{
							UpData=stemp;
							UpMode=10;
							UpPath="/"+PlcIdx;
							UpType="txt";
							seek=0;
							UpFile="plan"+(PlnIdx+1)+".txt"
							//UpData=compilador(UpData);
							rcvUpFileFileEdit();
						}
						else
							UpMode=0;
						percent-=2;
						PlnIdx++;
					}
					else
					{
						PlnIdx=0;
						PlcIdx++;
						percent-=2;
						if(PlcIdx>=PLCs.length)
						{
							UpType="txt";
							PlcIdx=0;
							percent=36;
							PlnIdx=0;
						}
					}
				}
				else
				{
					PlnIdx=0;
					PlcIdx++;
					percent-=2;
					if(PlcIdx>=PLCs.length)
					{
						UpType="txt";
						PlcIdx=0;
						percent=36;
						PlnIdx=0;
					}
				}
				percent+=2;
			}
			break;			
			case 38://planes .eil
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_Plans+" "+(PlcIdx+1);
				if(PlnIdx<PLCs[PlcIdx].Plans.length)
				{
					//------------------------
					ttemp="";
					if(PlnIdx<BkPLCs[PlcIdx].Plans.length)
					{
						PlanGen=BkPLCs[PlcIdx].Plans[PlnIdx];
						if(PlanGen.EV!=0)
							SetPhConf(BkPLCs[PlcIdx].EV[PlanGen.EV-1]);
						else
							SetPhConf(BkGlobalParms.phconf);
						UpdateTimes(BkPLCs[PlcIdx],PlanGen);
						ttemp=SavePlan(BkPLCs[PlcIdx],BkGlobalParms,PlanGen);
					}
					//------------------------
					PlanGen=PLCs[PlcIdx].Plans[PlnIdx];
					if(PlanGen.EV!=0)
						SetPhConf(PLCs[PlcIdx].EV[PlanGen.EV-1]);
					else
						SetPhConf(GlobalParms.phconf);
					UpdateTimes(PLCs[PlcIdx],PlanGen);
					stemp=SavePlan(PLCs[PlcIdx],GlobalParms,PlanGen);
					//------------------------
					if(ttemp!==stemp || FoceUpLoad)
					{
						UpData=stemp;
						UpMode=10;
						UpPath="/"+PlcIdx;
						UpType="txt";
						seek=0;
						UpFile="plan"+(PlnIdx+1)+".eil";
						//UpData=compilador(UpData);
						rcvUpFileFileEdit();
					}
					else
						UpMode=0;
					percent-=2;
					PlnIdx++;
				}
				else
				{
					PlnIdx=0;
					PlcIdx++;
					percent-=2;
					if(PlcIdx>=PLCs.length)
					{
						UpType="txt";
						PlcIdx=0;
						percent=38;
						PlnIdx=0;
					}
				}
				percent+=2;				
			}
			break;
			case 40://planmc.es3
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_Plans+" "+(PlcIdx+1);
				ttemp=SendMcPlan(BkPLCs[PlcIdx].McPlan);
				stemp=SendMcPlan(PLCs[PlcIdx].McPlan);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				PlcIdx++;
				percent-=4;
				if(PlcIdx>=PLCs.length)
				{
					PlcIdx=0;
					percent=40;
				}
				percent+=4;
			}
			break;
			case 44://planotu.es3
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_Plans+" "+(PlcIdx+1);
				ttemp=SendOTUPlan(BkPLCs[PlcIdx].OTUPlan);
				stemp=SendOTUPlan(PLCs[PlcIdx].OTUPlan);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				PlcIdx++;
				percent-=4;
				if(PlcIdx>=PLCs.length)
				{
					PlcIdx=0;
					percent=44;
				}
				percent+=4;
			}
			break;
			case 48://plans.es3
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_Plans+" "+(PlcIdx+1);
				ttemp=SendPlans(BkPLCs[PlcIdx].Plans);
				stemp=SendPlans(PLCs[PlcIdx].Plans);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				PlcIdx++;
				percent-=1;
				if(PlcIdx>=PLCs.length)
				{
					PlcIdx=0;
					ErrIdx=0;
					percent=48;
				}
				percent+=1;
			}
			break;
			case 49://dgvp.ini
			{
				//document.getElementById("LOADINGTXT2").innerHTML="Conf Protocolo";
				ttemp=SendDgvP(PrgBk[TrgIdx]);
				stemp=SendDgvP(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=1;
			}
			break;
			case 50://sdgvp.ini
			{
				//document.getElementById("LOADINGTXT2").innerHTML="Conf Reportes";
				ttemp=SendSdgvP(PrgBk[TrgIdx]);
				stemp=SendSdgvP(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=2;
			}
			break;
			case 52://er000000.txt
			{
				if(PrgBk[TrgIdx].Typ==0)
				{
					if(ErrIdx<Errors.length)
					{
						UpMode=10;
						UpPath=Errors[ErrIdx].Path+"/";
						UpPath=Remplace(UpPath,"//","/");
						UpType="txt";
						seek=0;
						UpFile="/"+Errors[ErrIdx].Name;
						UpFile=Remplace(UpFile,"//","/");
						UpData=Errors[ErrIdx].Datos;
						rcvUpFileFileEdit();
					}
					if(ErrIdx<Errors.length)
					{
						percent-=4;
						ErrIdx++;
					}
					else
					{
						ErrIdx=0;
						PlcIdx=0;
					}
				}
				else
				{
					ErrIdx=0;
					PlcIdx=0;
				}
				percent+=4;
			}
			break;
			case 56://ag.sch
			case 60:
			case 64:
			case 68:
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_scheduler+" "+(PlcIdx+1);
				ttemp=MakeSchToFile(PrgBk[TrgIdx]);
				stemp=MakeSchToFile(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				PlcIdx++;
				for(var i=1;i<PLCs.length;i++)
				{
					if(PLCs[i-1].Scheduler==PLCs[i].Scheduler)
					{
						PlcIdx++;
						percent+=4;
					}
				}
				if(PlcIdx>=PLCs.length)
				{
					PlcIdx=0;
					percent=68;
				}
				percent+=4;
			}
			break;
			case 72://sec.sec
			case 76:
			case 80:
			case 84:
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_Conflict+" "+(PlcIdx+1);
				ttemp=SendSec(PrgBk[TrgIdx]);
				stemp=SendSec(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				PlcIdx++;
				if(PlcIdx>=PLCs.length)
				{
					PlcIdx=0;
					percent=84;
				}
				percent+=4;
			}
			break;
			case 88://error.ini
			{
				//document.getElementById("LOADINGTXT2").innerHTML="Conf Error";
				ttemp=SendErrCfg(PrgBk[TrgIdx]);
				stemp=SendErrCfg(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=1;
			}
			break;
			case 89://opct.ini
			{
				//document.getElementById("LOADINGTXT2").innerHTML="Conf Error";
				ttemp=SendOPCT(PrgBk[TrgIdx]);
				stemp=SendOPCT(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=1;
			}
			break;
			case 90://plcs.ini
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_Controllers;
				ttemp=SendPlc(PrgBk[TrgIdx]);
				stemp=SendPlc(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=2;
			}
			break;
			case 92://phconf.ini
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" "+Str_MN_Config;
				ttemp=SendPhConf(PrgBk[TrgIdx]);
				stemp=SendPhConf(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=1;
			}
			break;
			case 93://autorun.eil"
			{
				PlanGen=BkPLCs[PlcIdx].Plans[PlnIdx];
				if(PlanGen.EV!=0)
					SetPhConf(BkPLCs[PlcIdx].EV[PlanGen.EV-1]);
				else
					SetPhConf(BkGlobalParms.phconf);
				UpdateTimes(BkPLCs[PlcIdx],PlanGen);
				ttemp=SaveCtrlParms(BkPLCs[PlcIdx],BkGlobalParms,PlanGen);
				//------------------------
				PlanGen=PLCs[PlcIdx].Plans[PlnIdx];
				if(PlanGen.EV!=0)
					SetPhConf(PLCs[PlcIdx].EV[PlanGen.EV-1]);
				else
					SetPhConf(GlobalParms.phconf);
				UpdateTimes(PLCs[PlcIdx],PlanGen);
				stemp=SaveCtrlParms(PLCs[PlcIdx],GlobalParms,PlanGen);
				if(ttemp!==stemp || FoceUpLoad)
				{
					UpData=stemp;
					UpMode=10;
					UpPath="/";
					UpType="txt";
					UpFile="autorun.txt"
					seek=0;
					rcvUpFileFileEdit();
				}
				else
					UpMode=0;
				percent+=1;
			}
			break;
			case 94://plan97
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" ";
				ttemp=SendPlan97(PrgBk[TrgIdx]);
				stemp=SendPlan97(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=1;
			}
			break;
			case 95://plan99
			{
				//document.getElementById("LOADINGTXT2").innerHTML=Str_looking_for_difference+" ";
				ttemp=SendPlan99(PrgBk[TrgIdx]);
				stemp=SendPlan99(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent+=1;
			}
			break;
			case 96://startup.ini
			{
				ttemp=SendStartup(PrgBk[TrgIdx]);
				stemp=SendStartup(PrgEd[SrcIdx]);
				if(ttemp!==stemp || FoceUpLoad)
					rcvUpFileFileEdit();
				else
					UpMode=0;
				percent=93;
				percent+=4;
			}
			break;
			case 97:
			{
				request=GetUrlB(PrgEd[SrcIdx].host+'/web/rldall.dgv',fncnone);
				percent=96;
				percent+=4;
			}
			break;
			case 98:
			{
				//rst pln
				request=GetUrlB(PrgEd[SrcIdx].host+'/web/rldpln.dgv',fncnone);
				percent=96;
				percent+=4;
			}
			break;
			case 99:
			{
				//rst sch
				request=GetUrlB(PrgEd[SrcIdx].host+'/web/rldsch.dgv',fncnone);
				percent=96;
				percent+=4;
			}
			break;
			case 100:
			{
				PBarUpDate();
				percent=0;
				FoceUpLoad=0;
				PBarOff();
				PlcIdx=0;
				PrgEd[TrgIdx].host=PrgBk[TrgIdx].host;
				Ed2Src(TrgIdx);
				Ed2Bk(TrgIdx);
				WizrdIdx=0;
				ReDraw(wizard[Widx][WizrdIdx]);
				//----------------------------------------------------- Force ReLoad
				for(var p=0;p<PLCs.length;p++)
					PLCs[p].PlanList.length=0;
				//----------------------------------------------------- Force ReLoad
				return;
			}
			break;
			default:
				LOG("SendConf.percent:"+percent+"\n");
				percent+=4;
			break;
		}
	}
	PBarUpDate();
	setTimeout("SendConf()",500);
}

function Ed2Src(idx)
{
	if(idx>=PrgEd.length)
		return;
	PrgEd[idx].GlobalParms=	GlobalParms;
	PrgEd[idx].PLCs=		PLCs;
	PrgEd[idx].PHASEs=		PHASEs;
	PrgEd[idx].IOs=			IOs;
	PrgEd[idx].Srv=			Srv;
	PrgEd[idx].Links=		Links;
	PrgEd[idx].Errors=		Errors;
	PrgEd[idx].ErrorsCfg=	ErrorsCfg;
	//--------------------------------------------------- Modulos
	PrgEd[idx].OTU=			OTU;
	PrgEd[idx].DefIn=		DefIn;
	PrgEd[idx].OPCT=		OPCT;
	//PrgEd[idx].Mstr=		Mstr;
	PrgEd[idx].Iteris=		Iteris;
	PrgEd[idx].DgvSoft=		DgvSoft;
	//PrgEd[idx].NTP=		NTP;
	//PrgEd[idx].GPS=		GPS;
	//PrgEd[idx].DgvP=		DgvP;
	//PrgEd[idx].SdgvP=		SdgvP;
}
function Ed2Bk(idx)
{
	if(idx>=PrgEd.length)
		return;
	PrgBk[idx].GlobalParms=	GlobalParms;
	PrgBk[idx].PLCs=		PLCs;
	PrgBk[idx].PHASEs=		PHASEs;
	PrgBk[idx].IOs=			IOs;
	PrgBk[idx].Srv=			Srv;
	//PrgBk[idx].drv=		drv;
	PrgBk[idx].Links=		Links;
	PrgBk[idx].Errors=		Errors;
	PrgBk[idx].ErrorsCfg=	ErrorsCfg;
	//--------------------------------------------------- Modulos
	PrgBk[idx].OTU=			OTU;
	PrgBk[idx].DefIn=		DefIn;
	PrgBk[idx].OPCT=		OPCT;
	PrgBk[idx].Mstr=		PrgEd[idx].Mstr;
	PrgBk[idx].Iteris=		Iteris;
	PrgBk[idx].DgvSoft=		DgvSoft;
	PrgBk[idx].NTP=			PrgEd[idx].NTP;
	PrgBk[idx].GPS=			PrgEd[idx].GPS;
	PrgBk[idx].DgvP=		PrgEd[idx].DgvP;
	PrgBk[idx].SdgvP=		PrgEd[idx].SdgvP;
}
function Src2Ed(idx)
{
	if(idx>=PrgEd.length)
		return;
	GlobalParms=			PrgEd[idx].GlobalParms;
	PLCs=					PrgEd[idx].PLCs;
	PHASEs=					PrgEd[idx].PHASEs;
	IOs=					PrgEd[idx].IOs;
	Srv=					PrgEd[idx].Srv;
	//drv=			
	Links=					PrgEd[idx].Links;
	Errors=					PrgEd[idx].Errors;
	ErrorsCfg=				PrgEd[idx].ErrorsCfg;
	//--------------------------------------------------- Modulos
	OTU=					PrgEd[idx].OTU;
	DefIn=					PrgEd[idx].DefIn;
	OPCT=					PrgEd[idx].OPCT;
	Mstr=					PrgEd[idx].Mstr;
	Iteris=					PrgEd[idx].Iteris;
	DgvSoft=				PrgEd[idx].DgvSoft;
	NTP=					PrgEd[idx].NTP;
	GPS=					PrgEd[idx].GPS;
	DgvP=					PrgEd[idx].DgvP;
	SdgvP=					PrgEd[idx].SdgvP;
}
function Bk2edbk(idx)
{
	if(idx>=PrgEd.length)
		return;
	BkGlobalParms=			PrgBk[idx].GlobalParms;
	BkPLCs=					PrgBk[idx].PLCs;
	BkPHASEs=				PrgBk[idx].PHASEs;
	BkIOs=					PrgBk[idx].IOs;
	BkSrv=					PrgBk[idx].Srv;
	//BkHdrv=				drv;
	BkLinks=				PrgBk[idx].Links;
	BkErrors=				PrgBk[idx].Errors;
	BkErrorsCfg=			PrgBk[idx].ErrorsCfg;
	//--------------------------------------------------- Modulos
	BkOTU=					PrgBk[idx].OTU;
	BkDefIn=				PrgBk[idx].DefIn;
	BkOPCT=					PrgBk[idx].OPCT;
	BkMstr=					PrgBk[idx].Mstr;
	BkIteris=				PrgBk[idx].Iteris;
	BkDgvSoft=				PrgBk[idx].DgvSoft;
	NTP=					PrgBk[idx].NTP;
	GPS=					PrgBk[idx].GPS;
	DgvP=					PrgBk[idx].DgvP;
	SdgvP=					PrgBk[idx].SdgvP;
}

//---------------------------------------
function UpDateRtc()
{
	var ourDate = new Date();
	var TimeZone=0;
	var rtc=0;
	rtc=parseInt(ourDate.getTime()/1000);
	TimeZone=(ourDate.getTimezoneOffset()*60);
	rtc+=parseInt(document.getElementById("ClockOffSet").value);
	if(GlobalParms.MODEL.indexOf("M3")!=-1)
	{
	}
	else
	{
		rtc-=TimeZone;
	}
	GetUrl(PrgEd[SrcIdx].host+'/GbVars.bin?rtc='+rtc,RcvMoni);
}
percent=58;
