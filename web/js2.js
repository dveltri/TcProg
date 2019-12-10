//--------------------------------------------------
function goWizrdNext()
{
	WizrdIdx++;
	if(WizrdIdx>=wizard[Widx].length)
	{
		WizrdIdx--;
	}
	else
	{
		ReDraw(wizard[Widx][WizrdIdx]);
	}
	hideFlyMnu(FlyMnu.idx);
}
function goWizrdPrev()
{
	WizrdIdx--;
	if(WizrdIdx<0)
	{
		WizrdIdx++;
	}
	else
	{
		ReDraw(wizard[Widx][WizrdIdx]);
	}
	hideFlyMnu(FlyMnu.idx);
}
function ClearAllHome()
{
	Resource.length=0;
	//------------------------------------------
	document.getElementById("HOME0").innerHTML="";
	document.getElementById("HOME1").innerHTML="";
	document.getElementById("HOME2").innerHTML="";
	document.getElementById("HOME3").innerHTML="";
	document.getElementById("HOME4").innerHTML="";
	document.getElementById("WizNavButton").innerHTML="";
	if(Log_En)
	{
		document.getElementById("HOME4").innerHTML="<input type=\"button\" value=\"Clean Log\" onclick=\"document.getElementById('dgv').innerHTML='';\" /><br/>\n";
		document.getElementById("HOME4").innerHTML+="<input type=\"checkbox\" onchange=\"FoceUpLoad=this.checked\" />Compile always<br />\n";
	}
}
function ReDraw(Fnc)
{
	var out="";
	if(Fnc>=0)
		Refresh=Fnc;
	else
		hideFlyMnu(FlyMnu.idx);
	ClearAllHome();
	LOG("Refresh:"+Refresh);
	//-----------------------------------------------------
	out+="<table border=\"0\" align=\"center\" cellpadding=\"10\" cellspacing=\"10\" width=\"90%\" >\n";
	out+="<tr>\n";
	out+="<td align=\"left\" >\n";
	if(WizrdIdx>0)
		out+="<input type=\"button\" class=\"CssBtn\" value=\"Prev\" onclick=\"goWizrdPrev();\" />\n";
	out+="</td>\n";
	out+="<td align=\"right\" >\n";
	if(WizrdIdx<wizard[Widx].length-1)
		out+="<input type=\"button\" class=\"CssBtn\" value=\"Next\" onclick=\"goWizrdNext();\" />\n";
	out+="</td>\n";
	out+="</tr>\n";
	out+="</table>\n";
	document.getElementById("WizNavButton").innerHTML+=out;
	//-----------------------------------------------------
	switch(Refresh)
	{
		case moni_general:
		{
			//document.getElementById("HOME2").innerHTML="<br/><select id=\"ClockOffSet\" class=\"INTEXT\">\n"+GenOptions(OptSyncClock,0)+"</select><input type=\"button\" class=\"INTEXT2\" value=\""+Str_Sync+"\" onclick=\"UpDateRtc();return false\" />\n";
			document.getElementById("HOME1").innerHTML=ShwStsTbl();
			RsrcIdx=0;
			if(GlobalParms().MODEL.indexOf("GW")==-1)
			{
				addautoget(document.getElementById("InfoIO"),HOST()+"/ios.bin",rcvIOs);
			}
			addautoget(document.getElementById("InfoGV"),HOST()+"/GbVars.bin",rcvGbVars);
			addautoget(document.getElementById("InfoTC"),HOST()+"/plcs.bin",rcvTcSts);
			addautoget(document.getElementById("InfoPH"),HOST()+"/phases.bin",rcvphases1);
			//addautoget(document.getElementById("HOME5"),HOST()+"/"+PlcIdx+"iplc.bin",rcvInterprete);
		}
		break;
		//-----------------------------------------------------
		case moni_errors:
		{
			document.getElementById('HOME1').innerHTML=ShowErrorFileList();
			//document.getElementById('HOME2').innerHTML=ShwFBNO0();
		}
		break;
		//-----------------------------------------------------
		case conf_general:
		{
			document.getElementById('HOME1').innerHTML=ShwEthernet();
			document.getElementById('HOME2').innerHTML=ShwGps();
			document.getElementById('HOME3').innerHTML=ShwNtp();
			LOG(SendStartup(PrgEd[SrcIdx]));
			UpMode=0;
		}
		break;
		//-----------------------------------------------------
		case conf_phases:
		{
			document.getElementById('HOME1').innerHTML=ShwPHHW();
		}
		break;
		//-----------------------------------------------------
		case conf_ev:
		{
			document.getElementById("HOME1").innerHTML=ShwEntreVerdes();
			document.getElementById("HOME2").innerHTML=ShwEV();
		}
		break;
		//-----------------------------------------------------
		case conf_sec:
		{
			document.getElementById("HOME1").innerHTML=ShwSec();
		}
		break;
		//-----------------------------------------------------
		case conf_sts:
		{
			document.getElementById("HOME1").innerHTML=ShowStss();
			if(GlobalParms().MODEL.indexOf("RT")!=-1)
				ShwArne2();
		}
		break;
		//-----------------------------------------------------
		case conf_plan:
		{
			document.getElementById("HOME1").innerHTML=ShowPlan();
		}
		break;
		//-----------------------------------------------------
		case conf_sch:
		{
			document.getElementById("HOME1").innerHTML=ShowAgenda();
		}
		break;
		//----------------------------------------------------- */
		case conf_Comm:
		{
			document.getElementById('HOME1').innerHTML="<hr />\n"+ShowDgvpConf();
			document.getElementById('HOME2').innerHTML=ShwSutec();
		}
		break;
		//-----------------------------------------------------
		case conf_io:
		{
			document.getElementById('HOME1').innerHTML=ShwIos();
		}
		break;
		//----------------------------------------------------- */
		case conf_otu:
		{
			document.getElementById('HOME1').innerHTML=ShwScoot();
		}
		break;
/* //-----------------------------------------------------
		case conf_planMC:
			PlanGen=PLCs()[PlcIdx].McPlan;
			ShowPlanWizard(1);
		break;
		//-----------------------------------------------------
		case conf_planOTU:
			PlanGen=PLCs()[PlcIdx].OTUPlan;
			ShowPlanWizard(2);
		break;
		//-----------------------------------------------------
		case conf_FrcPln:
			document.getElementById("HOME1").innerHTML=ShwArne1();
		break;
		//-----------------------------------------------------*/
	}
}

//--------------------------------------------------
function ShwPHHW()
{
	var j=0;
	for(j=0;j<PLCs()[PlcIdx].Phases.length;j++)
		PLCs()[PlcIdx].Phases[j]=parseInt(PLCs()[PlcIdx].Phases[j]);
	SetEv();
	PLCs()[PlcIdx].Phases=PLCs()[PlcIdx].Phases.sort(sortI);
	//------------------------------------------------------------------------------------
	var out="<table border=\"0\" align=\"center\" cellpadding=\"2\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#000000\" bgcolor=\"#ccc\" >\n";
	out+="<tr bgcolor=\"#bbb\" >\n<td></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out+="<td "+((j&1)?"":"bgcolor=\"#ccc\"")+" align=\"center\" >";
		out+="<input type=\"text\" align=\"right\" class=\"CssInText\" value=\"";
		out+=PHASEs()[j].Name;
		out+="\" size=\"8\" maxlength=\"10\" onchange=\"PHASEs()["+j+"].Name=this.value;\" />\n";
		out+="</td>\n";
	}
	out+="</tr>\n";
	//-------------------
	out+="<tr bgcolor=\"#ccc\" >\n<td ><font size=\"1\" face=\"arial\">"+Str_Enabled+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
		out +="<td ><input type=\"checkbox\" onclick=\"PHASEs()["+j+"].PLC^="+(1<<PlcIdx)+";\" "+(PHASEs()[j].PLC&(1<<PlcIdx)?"checked=\"checked\"":"")+" /></td>\n";
	out+="</tr>\n";
	//-------------------
	out+="<tr bgcolor=\"#bbb\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Type_Phase+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out+="<td >\n";
		out+="<select class=\"CssSelect\" onchange=\"PHASEs()["+j+"].Type=this.value;PHASEs()["+j+"].FState=FStateTyp[this.value];ReDraw(-1);\">\n";
		out+=GenOptions(OptPhTyp,PHASEs()[j].Type);
		out+="</select>\n";
		out+="</td>\n";
	}
	out+="</tr>\n";
	//-------------------
	out+="<tr bgcolor=\"#ccc\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Flashing+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out+="<td align=\"center\" valign=\"middle\" >\n";
		out+="<select class=\"CssSelect\" onchange=\"PHASEs()["+j+"].FState=this.value;ReDraw(-1);\">\n";
		if(PHASEs()[j].Type!=1)
			out+=GenOptions(OptColorFF,PHASEs()[j].FState);
		else
			out+=GenOptions(OptColorFFp,PHASEs()[j].FState);
		out+="</select><br />\n";
		//out+=color2svg(PHASEs()[j].FState,"");
		out+=ShwMov(PHASEs()[j].FState,PHASEs()[j].Type);
		out+="</td>\n";
	}
	out+="</tr>\n";
	//-------------------
	out+="<tr bgcolor=\"#aca\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Time_minimum_Green+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out+="<td >\n";
		out+="<input class=\"CssInText\" size=\"1\" maxlength=\"3\" value=\""+PHASEs()[j].MiGT+"\" onchange=\"PHASEs()["+j+"].MiGT=this.value;\" />\n";
		out+="</td>\n";
	}
	out+="</tr>\n";
	//-------------------
	out+="<tr bgcolor=\"#bdb\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Time_maximum_Green+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out+="<td >\n";
		out+="<input class=\"CssInText\" size=\"1\" maxlength=\"3\" value=\""+PHASEs()[j].MaGT+"\" onchange=\"PHASEs()["+j+"].MaGT=this.value;\" />\n";
		out+="</td>\n";
	}
	out+="</tr>\n";
	//-------------------
	var out2="<tr bgcolor=\"#aca\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Err_Electric_Green+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out2+="<td ><input type=\"checkbox\" onclick=\"PHASEs()["+j+"].MskError^=0x00000300;ReDraw(-1);\" "+((PHASEs()[j].MskError&0x00000300)?"":"checked=\"checked\"")+" />";
		if(PHASEs()[j].MskError&0x00000300)
			out2+="<font size=\"1\" color=\"#f00\" face=\"arial\">"+Str_Error_inhibido+"</font>";
		out2+="</td>\n";
	}
	out2+="</tr>\n";
	//-------------------
	out2+="<tr bgcolor=\"#bdb\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Error+" "+Str_Lack_Green+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out2+="<td ><input type=\"checkbox\" onclick=\"PHASEs()["+j+"].MskError^=0x04000000;ReDraw(-1);\" "+((PHASEs()[j].MskError&0x04000000)?"":"checked=\"checked\"")+" />";
		if(PHASEs()[j].MskError&0x04000000)
			out2+="<font size=\"1\" color=\"#f00\" face=\"arial\">"+Str_Error_inhibido+"</font>";
		out2+="</td>\n";
	}
	out2+="</tr>\n";
	/*//-------------------
	out2+="<tr bgcolor=\"#aca\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Error+" "+Str_Partial_Lack_Green+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
		out2+="<td ><input type=\"checkbox\" onclick=\"PHASEs()["+j+"].MskError^=0x00000400;\" "+(PHASEs()[j].MskError&0x00000400?"":"checked=\"checked\"")+" /></td>\n";
	out2+="</tr>\n";
	//-------------------*/
	/*out2+="<tr bgcolor=\"#cca\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Time_minimum_Yellow+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out2+="<td >\n";
		out2+="<select class=\"CssSelect\" onchange=\"PHASEs()["+j+"].MiYT=this.value;\">\n";
		out2+=GenOption1(PhTimMin,PHASEs()[j].MiYT);
		out2+="</select>\n";
		out2+="</td>\n";
	}
	out2+="</tr>\n";
	//-------------------*/
	/*out2+="<tr bgcolor=\"#ddb\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Time_maximum_Yellow+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out2+="<td >\n";
		out2+="<input class=\"CssInText\" size=\"1\" maxlength=\"3\" value=\""+PHASEs()[j].MaYT+"\" />\n";
		out2+="</td>\n";
	}
	out2+="</tr>\n";
	//-------------------*/
	out2+="<tr bgcolor=\"#cca\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Err_Electric_Yellow+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out2+="<td >";
		if(PHASEs()[j].Type!=1)
		{
			out2+="<input type=\"checkbox\" onclick=\"PHASEs()["+j+"].MskError^=0x00000030;ReDraw(-1);\" "+(PHASEs()[j].MskError&0x00000030?"":"checked=\"checked\"")+" />";
			if(PHASEs()[j].MskError&0x00000030)
				out2+="<font size=\"1\" color=\"#f00\" face=\"arial\">"+Str_Error_inhibido+"</font>";
		}
		out2+="</td>\n";
	}
	out2+="</tr>\n";
	//-------------------
	out2+="<tr bgcolor=\"#ddb\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Error+" "+Str_Lack_Yellow+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out2+="<td >";
		if(PHASEs()[j].Type!=1)
		{
			out2+="<input type=\"checkbox\" onclick=\"PHASEs()["+j+"].MskError^=0x02000000;ReDraw(-1);\" "+(PHASEs()[j].MskError&0x02000000?"":"checked=\"checked\"")+" />";
			if(PHASEs()[j].MskError&0x02000000)
				out2+="<font size=\"1\" color=\"#f00\" face=\"arial\">"+Str_Error_inhibido+"</font>";
		}
		out2+="</td>\n";
	}
	out2+="</tr>\n";
	/*//-------------------
	out2+="<tr bgcolor=\"#cca\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Error+" "+Str_Partial_Lack_Yellow+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
		out2+="<td ><input type=\"checkbox\" onclick=\"PHASEs()["+j+"].MskError^=0x00000040;\" "+(PHASEs()[j].MskError&0x00000040?"":"checked=\"checked\"")+" /></td>\n";
	out2+="</tr>\n";
	//-------------------*/
	/*out2+="<tr bgcolor=\"#caa\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Time_minimum_Red+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out2+="<td >\n";
		out2+="<select class=\"CssSelect\" onchange=\"PHASEs()["+j+"].MiRT=this.value;\">\n";
		out2+=GenOption1(PhTimMin,PHASEs()[j].MiRT);
		out2+="</select>\n";
		out2+="</td>\n";
	}
	out2+="</tr>\n";
	//-------------------*/
	/*out2+="<tr bgcolor=\"#dbb\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Time_maximum_Red+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out2+="<td >\n";
		out2+="<input class=\"CssInText\" size=\"1\" maxlength=\"3\" value=\""+PHASEs()[j].MaRT+"\" />\n";
		out2+="</td>\n";
	}
	out2+="</tr>\n";
	//-------------------*/
	out2+="<tr bgcolor=\"#dbb\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Err_Electric_Red+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out2+="<td ><input type=\"checkbox\" onclick=\"PHASEs()["+j+"].MskError^=0x00000003;ReDraw(-1);\" "+(PHASEs()[j].MskError&0x00000003?"":"checked=\"checked\"")+" />";
		if(PHASEs()[j].MskError&0x00000003)
			out2+="<font size=\"1\" color=\"#f00\" face=\"arial\">"+Str_Error_inhibido+"</font>";
		out2+="</td>\n";
	}
	out2+="</tr>\n";
	//-------------------
	out2+="<tr bgcolor=\"#caa\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Error+" "+Str_Lack_Red+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out2+="<td ><input type=\"checkbox\" onclick=\"PHASEs()["+j+"].MskError^=0x01000000;ReDraw(-1);\" "+(PHASEs()[j].MskError&0x01000000?"":"checked=\"checked\"")+" />";
		if(PHASEs()[j].MskError&0x01000000)
			out2+="<font size=\"1\" color=\"#f00\" face=\"arial\">"+Str_Error_inhibido+"</font>";
		out2+="</td>\n";
	}
	out2+="</tr>\n";
	/*//-------------------
	out2+="<tr bgcolor=\"#caa\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Error+" "+Str_Partial_Lack_Red+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
		out2+="<td ><input type=\"checkbox\" onclick=\"PHASEs()["+j+"].MskError^=0x00000004;\" "+(PHASEs()[j].MskError&0x00000004?"":"checked=\"checked\"")+" /></td>\n";
	out2+="</tr>\n";
	//-----------------------------------------------------------------------
	out2+="<tr bgcolor=\"#bbb\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Error+" "+Str_Check_Time_minimum+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
		out2+="<td ><input type=\"checkbox\" onclick=\"PHASEs()["+j+"].MskError^=0x00015000;\" "+(PHASEs()[j].MskError&0x00015000?"":"checked=\"checked\"")+" /></td>\n";
	out2+="</tr>\n";
	//-------------------
	out2+="<tr>\n<td ><font size=\"1\" face=\"arial\">"+Str_Error+" "+Str_Fail_Report+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
		out2+="<td ><input type=\"checkbox\" onclick=\"PHASEs()["+j+"].MskError^=0x80000000;\" "+(PHASEs()[j].MskError&0x80000000?"":"checked=\"checked\"")+" /></td>\n";
	out2+="</tr>\n";
	//-------------------*/
	out2+="</table>";
	return out+out2;
}

//--------------------------------------------------
var DelErr=0;
var DelIdxAll=1;
function DelAllErrors()
{
	if(DelIdxAll<Errors.length)
	{
		if(PrgEd[SrcIdx].Typ)
		{
			GetUrlB(HOST()+"/"+DGVFTP()+"?mode=256&path="+Errors[DelIdxAll].Path+"&file="+Errors[DelIdxAll].Name,NextDelError);
		}
	}
}
function NextDelError(Datos)
{
	if(Datos.status==200)
	{
		DelIdxAll++;
		if(DelIdxAll<Errors.length)
		{
			DelAllErrors();
		}
		else
		{
			DelIdxAll=1;
			Errors.length=1;
			ReDraw(moni_errors);
			percent=0;
			LoadConfSrc();
		}
	}
}
function ShowErrorFileList()
{
	var temp=""
	var out="";
	var pidx=0;
	out+="<a href=\"\" onclick=\"if(confirm('"+Str_Delet+"?')){DelAllErrors();}return false;\">\n";
	out+="<img src=\"./img/remove.png\" width=\"20\" height=\"20\" alt=\"Delete All\" border=\"0\"   />";
	out+="</a>";
	out+="<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  align=\"center\" >\n";
	//--------------------------
	out+="<tr>\n";
	out+="<td align=\"left\" valign=\"top\">\n";
	out+="<font size=\"1\" face=\"arial\">\n";
	for(var x=0;x<Errors.length;x++)
	{
		temp=Errors[x].Name.substr(2);
		out+="<a href=\""+HOST()+(Errors[x].Path+"/").replace("//","/")+HTMLEncode(Errors[x].Name)+"?WAC="+WAC+"\" target=\"_blank\">\n";
		out+="<img src=\"./img/save1.png\" width=\"20\" height=\"20\" border=\"0\" />";
		out+="</a>";
		out+="<a href=\"\" onclick=\"UpFile='"+HTMLEncode(Errors[x].Name)+"';UpPath='"+Errors[x].Path+"';UpType='txt';rcvERR(Errors["+x+"].Datos);return false\">\n";
		out+="[";
		if(Errors[x].Path=="/err" || Errors[x].Path=="/err/")
			out+=Str_General;
		else
		{
			pidx=parseInt(Errors[x].Path.substr(1));
			if(pidx<PLCs().length)
				out+=PLCs()[pidx].Name;
			else
				out+="No Name";
		}
		out+=":"+temp.substring(4,6)+"/"+temp.substring(2,4)+"/"+temp.substring(0,2)+"]\n";
		out+="</a>\n";
		if(x>0)
		{
			out+="<a href=\"\" onclick=\"if(confirm('"+Str_Delet+" ["+HTMLEncode(Errors[x].Name)+"]?')){DelErr="+x+";"
			if(PrgEd[SrcIdx].Typ)
				out+="GetUrlB('"+HOST()+"/"+DGVFTP()+"?mode=256&#38;path="+HTMLEncode(Errors[x].Path)+"&#38;file="+HTMLEncode(Errors[x].Name)+"',UpdateErrorList);"
			else
				out+="GetUrlB('"+HOST()+"/"+DGVFTP()+"?mode=256&#38;path="+HTMLEncode(Errors[x].Path)+"&#38;file="+HTMLEncode(Errors[x].Name)+"',UpdateErrorList);"
			out+="}return false;\">\n";
			out+="<img src=\"./img/defile.png\" width=\"16\" height=\"16\" border=\"0\" />";
			out+="</a>";
		}
		out+="<br/>";
	}
	out+="</font>\n";
	out+="</td>\n";
	out+="<td align=\"left\" valign=\"top\" width=\"80%\" >\n";
	out+="<div id=\"ErrorFile\">\n";
	out+="<table width=\"100%\" border=\"0\" id=\"tabelaError\" align=\"center\">\n";
	out+="<tr>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#D3D3D3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_Cod_Ocorr+"</font>";
	out+="</td>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#D3D3D3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_Descr_Ocorr+"</font>";
	out+="</td>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#D3D3D3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_DtHr_Ocorr+"</font>";
	out+="</td>\n";
	out+="</tr>\n";
	out+="</table>\n";
	out+="</div>\n";
	out+="</td>\n";
	out+="</tr>\n";
	//--------------------------
	out+="</table>\n";
	return out;
}
function UpdateErrorList(Datos)
{
	if(Datos.status==200)
	{
		Errors.splice(DelErr,1);
	}
	ReDraw(moni_errors);
}
function rcvERR(Dados)
{
	var out = "";
	var idx = 0;
	var ErrorFile = new Array();
	var ErrorList = new Array();
	var aux = new Array();
	ErrorFile.length = 0;
	ErrorList.length = 0;
	aux.length = 0;
	//Dados=Remplace(Dados,"<","&#60;");
	//Dados=Remplace(Dados,">","&#62;");
	ErrorFile = Dados.split("\n");
	var i=0;
	while(i<ErrorFile.length)
	{
		ErrorFile[i]=RemoveUnuseChar(ErrorFile[i]);
		ErrorFile[i]=ErrorFile[i].trim();
		if(ErrorFile[i]=="")
		{
			ErrorFile.splice(i,1);
		}
		else
		{
			ErrorList[idx] = new Object();
			ErrorList[idx].CodErr=0;
			ErrorList[idx].DescrErr="";
			ErrorList[idx].DtHrErr="";
			aux = ErrorFile[i].split(",");
			if(aux[0])ErrorList[idx].CodErr = aux[0];
			if(aux[1])ErrorList[idx].DescrErr = aux[1];
			if (aux.length > 3)
				ErrorList[idx].DtHrErr = aux[aux.length-1];
			else
				if(aux[2])
					ErrorList[idx].DtHrErr = aux[2];
			idx++;
			i++;
		}
	}
	out+="<table width=\"98%\" border=\"0\" id=\"tabelaError\" align=\"left\">\n";
	out+="<tr>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#A3A3A3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_Cod_Ocorr+"</font>";
	out+="</td>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#A3A3A3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_Descr_Ocorr+"</font>";
	out+="</td>\n";
	out+="<td align=\"center\" valign=\"middle\" bgcolor=\"#A3A3A3\">\n";
	out+="<font size=\"1\" face=\"arial\">\n"+Str_DtHr_Ocorr+"</font>";
	out+="</td>\n";
	out+="</tr>\n";
	for(var i=0;i<ErrorList.length;i++)
	{
		out+="<tr ";
		if(i%2)out+="bgcolor=\"#40FF40\""
		out+=">\n";
		out+="<td align=\"center\" valign=\"middle\">\n";
		out+="<font size=\"1\" face=\"arial\">\n"+ErrorList[i].CodErr+"</font>";
		out+="</td>\n";
		out+="<td align=\"center\" valign=\"middle\">\n";
		out+="<font size=\"1\" face=\"arial\">\n"+HTMLEncode(ErrorList[i].DescrErr)+"</font>";
		out+="</td>\n";
		out+="<td align=\"center\" valign=\"middle\">\n";
		out+="<font size=\"1\" face=\"arial\">\n"+ErrorList[i].DtHrErr+"</font>";
		out+="</td>\n";
		out+="</tr>";
	}
	out+="</table>\n";
	document.getElementById("ErrorFile").innerHTML=out;
}
//----------------------------------------------------
function ShwEthernet()
{
	var out="\
	<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"10\" cellspacing=\"10\" bordercolor=\"Silver\">\n\
	<tr>\n\
	<td>\n";
	//-------------------------------------------------------
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_Name_device+"</font>\n\
	</td>\n\
	<td>\n\
	<input onchange=\"GlobalParms().ID=this.value\" type=\"text\" class=\"CssInText\" size=\"25\" value=\""+GlobalParms().ID+"\" />\n\
	</td>\n\
	</tr>\n\
	</table><hr />\n";
	//-------------------------------------------------------
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" >\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_Passwords+"</font><br />\n\
	</td>\n\
	<td>\n\
	<input onchange=\"GlobalParms().Web_Access_Code_RO=this.value\" type=\"password\" class=\"CssInText\" size=\"5\" value=\""+GlobalParms().Web_Access_Code_RO+"\" /><br />\n\
	</td>\n\
	</tr>\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_Confirm+"</font>\n\
	</td>\n\
	<td>\n\
	<input onchange=\"GlobalParms().Web_Access_Code_RW=this.value\" type=\"password\" class=\"CssInText\" size=\"5\" value=\""+GlobalParms().Web_Access_Code_RW+"\" />\n\
	</td>\n\
	</tr>\n\
	</table>\n";
	//-------------------------------------------------------
	out+="	</td>\n\
			<td>\n";
	//-------------------------------------------------------
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_IP_Address+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">\n\
	<input onchange=\"GlobalParms().ETH[0]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().ETH0[0]+"\" />\n\
	<input onchange=\"GlobalParms().ETH[1]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().ETH0[1]+"\" />\n\
	<input onchange=\"GlobalParms().ETH[2]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().ETH0[2]+"\" />\n\
	<input onchange=\"GlobalParms().ETH[3]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().ETH0[3]+"\" />\n\
	</font>\n\
	</td>\n\
	</tr>\n\
	<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_Sub_Net_Mask_Address+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">\n\
	<input onchange=\"GlobalParms().NETMASK0[0]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().NETMASK0[0]+"\" />\n\
	<input onchange=\"GlobalParms().NETMASK0[1]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().NETMASK0[1]+"\" />\n\
	<input onchange=\"GlobalParms().NETMASK0[2]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().NETMASK0[2]+"\" />\n\
	<input onchange=\"GlobalParms().NETMASK0[3]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().NETMASK0[3]+"\" />\n\
	</font>\n\
	</td>\n\
	</tr>\n\
	<tr align=\"left\">\n";
	{
		out+="<td border=\"0\">\n\
		<font size=\"1\" face=\"arial\">"+Str_DGW_Address+"</font>\n\
		</td>\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">\n\
		<input onchange=\"GlobalParms().DGW[0]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\" value=\""+GlobalParms().DGW[0]+"\" />\n\
		<input onchange=\"GlobalParms().DGW[1]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\" value=\""+GlobalParms().DGW[1]+"\" />\n\
		<input onchange=\"GlobalParms().DGW[2]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\" value=\""+GlobalParms().DGW[2]+"\" />\n\
		<input onchange=\"GlobalParms().DGW[3]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\" value=\""+GlobalParms().DGW[3]+"\" />\n\
		</font>\n\
		</td>\n";
	}
	out+="</tr>\n\
	</table><hr />\n";
	out+=ShwAdvance();
	out+="	</td>\n";
	out+="</tr>\n";
	out+="</table><hr />\n";
	return out;
}

function ShwATZ()
{
	var out="<font size=\"2\" face=\"arial\">Ajuste de zona horaria </font><br />\n";
	{
		out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n";
		out+="<tr align=\"left\">\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">"+Str_Time_Zone+"</font>\n\
		</td>\n\
		<td colspan=\"2\">\n\
		<select class=\"CssSelect\" onchange=\"if(ChkParm('GlobalParms().Time_Zone_GMT',parseInt(this.value))==true){GlobalParms().Time_Zone_GMT=parseInt(this.value);ModParm('GlobalParms().Time_Zone_GMT');}\">\n";
		out+=GenOptions(OptTimeZone,GlobalParms().Time_Zone_GMT);
		out+="</select>\n\
		</td>\n\
		</tr>\n\
		</table>\n";
		out+="<hr />";
	}
	if(GlobalParms().ATZ)
	{
	}
	else
	{
		GlobalParms().ATZ=new Array(40);
	}
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n";
	for(var i=0;i<40;i+=2)
	{
		if(!GlobalParms().ATZ[i])
			GlobalParms().ATZ[i]="2017/01/01";
		if(!GlobalParms().ATZ[i+1])
			GlobalParms().ATZ[i+1]=-180;
		out+="<tr align=\"left\">\n\
		<td>\n\
		<input onchange=\"GlobalParms().ATZ["+i+"]=this.value;ModParm('GlobalParms().ETH');\" type=\"text\" class=\"CssInText\" size=\"10\" maxlength=\"10\"  value=\""+GlobalParms().ATZ[i]+"\" />\n\
		</td>\n\
		<td colspan=\"2\">\n\
		<select class=\"CssSelect\" onchange=\"GlobalParms().ATZ["+(i+1)+"]=this.value;ModParm('GlobalParms().ETH');\" >\n";
		out+=GenOptions(OptTimeZone,GlobalParms().ATZ[i+1]);
		out+="</select>\n\
		</td>\n\
		</tr>\n";
	}
	out+="</table>\n";
	out+="<hr />";
	return out;
}

function ShwGps()
{
	var out="<font size=\"3\" color=\"#0aa\" face=\"arial\">Configuracion GPS</font><br />\n";
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n";
	out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Enable+" GPS</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"checkbox\" onclick=\"GPS().Link^=9;ReDraw(-1);\" "+((GPS().Link!=0)?"checked=\"checked\"":"")+" />\n\
			</td>\n\
		</tr>\n";
		if(Links()[GPS().Link][2].indexOf(",")!=-1)
		{
			out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Config+" GPS</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"20\" onchange=\"Links()["+GPS().Link+"][2]=this.value;ReDraw(-1);\"  value=\""+Links()[GPS().Link][2]+"\" "+((GPS().Link==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n";
		}
		out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_gps_priop+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"GPS().PriorityPlus=this.value;ReDraw(-1);\" value=\""+(GPS().PriorityPlus)+"\" "+((GPS().PriorityPlus==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n";
		out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_gps_priol+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" title=\"holaaa\" class=\"CssInText\" size=\"4\" onchange=\"GPS().PriorityMinus=this.value;ReDraw(-1);\" value=\""+(GPS().PriorityMinus)+"\" "+((GPS().PriorityMinus==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n";
		out+="<tr align=\"left\">\n\
		<td>\n\
		<font size=\"1\" face=\"arial\">"+Str_Time_Zone+" GPS</font>\n\
		</td>\n\
		<td colspan=\"2\">\n\
		<select class=\"CssSelect\" onchange=\"if(ChkParm('GlobalParms().Time_Zone_GMT',parseInt(this.value))==true){GlobalParms().Time_Zone_GMT=parseInt(this.value);ModParm('GlobalParms().Time_Zone_GMT');}\">\n";
		out+=GenOptions(OptTimeZone,GlobalParms().Time_Zone_GMT);
		out+="</select>\n\
		</td>\n\
		</tr>\n";
	if(UsrLvl>2)
	{
		out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Debugger+" GPS</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"GPS().debug=this.value;ReDraw(-1);\" value=\""+GPS().debug+"\" />\n\
			</td>\n\
		</tr>\n";
	}
	out+="</table>\n";
	out+="<hr />";
	return out;
}

function ShwNtp()
{
	try
	{
		NTP().Link=parseInt(NTP().Link);
		NTP().Interval=parseInt(NTP().Interval);
		NTP().TimeZone=NTP().TimeZone;
		NTP().Debug=parseInt(NTP().Debug);
		NTP().Priority=parseInt(NTP().Priority);
	}
	catch(e)
	{
		alert("Error en los parametros de NTP"+e.message);
	}
	var out="<font size=\"3\" color=\"#0aa\" face=\"arial\">Actualizacion de hora mediante NTP</font><br />\n";
	out+="\
	<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Enable+" NTP</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"checkbox\" onclick=\"NTP().Link^=14;ReDraw(-1);\" "+((NTP().Link!=0)?"checked=\"checked\"":"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Server+" NTP</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"20\" onchange=\"Links()["+NTP().Link+"][2]=this.value;ReDraw(-1);\"  value=\""+Links()[NTP().Link][2]+"\" "+((NTP().Link==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_ntp_Sync_tim+" NTP</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"NTP().Interval=(this.value*1000);ReDraw(-1);\" value=\""+(NTP().Interval/1000)+"\" "+((NTP().Link==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_ntp_prio+" NTP</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"NTP().Priority=this.value;ReDraw(-1);\" value=\""+NTP().Priority+"\" "+((NTP().Link==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Time_Zone+" NTP</font>\n\
			</td>\n\
			<td>\n\
			<select class=\"CssSelect\" onchange=\"NTP().TimeZone=parseInt(this.value);ReDraw(-1);\" "+((NTP().Link==0)?'disabled="true"':"")+">\n";
			out+=GenOptions(OptTimeZone,NTP.TimeZone);
			out+="</select>\n\
			</td>\n\
		</tr>\n";
	if(UsrLvl>2)
	{
	out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Debugger+" NTP</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"25\" onchange=\"NTP().Debug=this.value;ReDraw(-1);\" value=\""+NTP().Debug+"\" />\n\
			</td>\n\
		</tr>\n";
	}
	out+="</table>\n";
	out+="<hr />";
	return out;
}

function ShowDgvpConf()
{
	var idx=0;
	var i=0;
	var tmp=0;
	var out="";
	out+="<font size=\"3\" color=\"#0aa\" face=\"arial\">"+Str_Conf_DgvP+"</font><br />\n";
	//out+="<table border=\"0\" cellpadding=\"2\" cellspacing=\"0\" align=\"center\" background=\"\" style=\"border-collapse:collapse;border:2px solid #000000;\">\n";
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n";
	//---------------------------------------------------------------------
	{
		out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Enable+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"checkbox\" onclick=\"SdgvP().Link^=12;ReDraw(-1);\" ";
			if(SdgvP().Link!=0)
				out+="checked=\"checked\"";
			out+=" />\n\
			</td>\n\
		</tr>\n";
	}
	//---------------------------------------------------------------------
	{
		out+="<tr align=\"left\" >\n";
		out+="	<td>\n";
		out+="		<font size=\"1\" face=\"arial\">"+Str_Dgvp_Link+"</font>\n";
		out+="	</td>\n";
		out+="	<td valign=\"middle\">\n";
		//out+="		<input  value=\""+SdgvP.Link+"\" onkeyup=\"SdgvP.Link=this.value;\" class=\"CssInText\" size=\"5\" maxlength=\"5\" />\n";
		out+="		<input type=\"text\" class=\"CssInText\" size=\"20\" onchange=\"Links()["+SdgvP().Link+"][2]=this.value;ReDraw(-1);\"  value=\""+Links()[SdgvP().Link][2]+"\" "+((SdgvP().Link==0)?'disabled="true"':"")+" />\n";
		out+="	</td>\n";
		out+="</tr>\n";
	}
	//---------------------------------------------------------------------
	for(var idx=0;idx<SdgvP().Tsk.length;idx++)
	{
		out+="<tr align=\"left\" >\n";
		out+="	<td align=\"left\">\n";
		out+="		<font size=\"1\" face=\"arial\">"+Str_Dgvp_srvid+"</font><br />\n";
		out+="		<font size=\"1\" face=\"arial\">"+Str_period+"</font><br />\n";
		out+="	</td>\n";
		out+="	<td align=\"left\" valign=\"middle\">\n";
		out+="		<input value=\""+SdgvP().Tsk[idx].IDsrv+"\"  onkeyup=\""+((idx==0)?"SdgvP.SrvId=this.value;":"")+"SdgvP().Tsk["+idx+"].IDsrv=this.value;\" class=\"CssInText\" size=\"5\" maxlength=\"5\"  "+((SdgvP.Link==0)?'disabled="true"':"")+" />\n<br/>";
		out+="		<input value=\""+SdgvP().Tsk[idx].Period+"\" onkeyup=\"SdgvP().Tsk["+idx+"].Period=this.value;\" class=\"CssInText\" size=\"5\" maxlength=\"5\" "+((SdgvP.Link==0)?'disabled="true"':"")+" />\n";
		out+="	</td>\n";
		out+="</tr>\n";
		/*//---------------------------------------------------------------------
		out+="<tr align=\"left\" >\n";
		out+="	<td align=\"left\">\n";
		out+="<select onchange=\"SdgvP.Tsk["+idx+"].Sck=this.value;\" class=\"CssSelect\" >\n";
		out+=GenOptions(OptDgvPCmd,SdgvP.Tsk[idx].Sck);
		out+="</select>\n"
		out+="	</td>\n";
		switch(SdgvP.Tsk[idx].Sck)
		{
			case 2:
			{
				out+="	<td align=\"left\" valign=\"middle\">\n";
				out+="		<font size=\"1\" face=\"arial\">Version Info</font>\n";
				out+="	</td>\n";
			}
			break;
			case 252:
			{
				out+="	<td align=\"left\" valign=\"middle\">\n";
				i=0;
				while(i<SdgvP.Tsk[idx].cmps.length)
				{
					tmp=LsCmps.indexOf(SdgvP.Tsk[idx].cmps[i]);
					if(tmp!=-1)
					{
						out+="<input type=\"button\" class=\"CssBtn\" value=\"[X]";
						out+=LsCmpsTxt[tmp];
						out+="\" onclick=\"SdgvP.Tsk["+idx+"].cmps.splice("+i+",1);ShowDgvpConf('"+ObjID+"');return false;\" /><br />\n";
						i++;
					}
					else
					{
						out+=SdgvP.Tsk[idx].cmps.splice(i,1);
						i=0;
					}
				}
				out+="<br />["+Str_Add+":<select class=\"CssSelect\" onchange=\"if(this.selectedIndex>0){SdgvP.Tsk["+idx+"].cmps[SdgvP.Tsk["+idx+"].cmps.length]=LsCmps[this.selectedIndex-1];}ShowDgvpConf('"+ObjID+"');\" >\n";
				out+="<option></option>\n";
				out+=GenOptionsVi(LsCmpsTxt,null);
				out+="</select>]\n"
				out+="	</td>\n";
			}
			break;
		}
		out+="</tr>\n";//*/
	}
	//---------------------------------------------------------------------*/
	out+="</table>\n";
	out+="<hr />\n";
	return out;
}

function ShwSutec()
{
	OPCT()[0][1]=parseInt(OPCT()[0][1]);
	OPCT()[1][1]=parseInt(OPCT()[1][1]);
	OPCT()[2][1]=parseInt(OPCT()[2][1]);
	OPCT()[3][1]=parseInt(OPCT()[3][1]);
	OPCT()[4][1]=parseInt(OPCT()[4][1]);
	var out="<font size=\"3\" color=\"#0aa\" face=\"arial\">Protocolo compatible con equipos de Otro Fabricante</font><br />\n";
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Enable+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"checkbox\" onclick=\"OPCT()[0][1]^=14;ReDraw(-1);\" "+((OPCT()[0][1]!=0)?"checked=\"checked\"":"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Conf_Links+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"20\" onchange=\"Links()["+OPCT()[0][1]+"][2]=this.value;ReDraw(-1);\"  value=\""+Links()[OPCT()[0][1]][2]+"\" "+((OPCT()[0][1]==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_slave+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"20\" onchange=\"OPCT()[1][1]=this.value;ReDraw(-1);\"  value=\""+OPCT()[1][1]+"\" "+((OPCT()[0][1]==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Group+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"OPCT()[2][1]=(this.value);ReDraw(-1);\" value=\""+OPCT()[2][1]+"\" "+((OPCT()[0][1]==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Time_to_Normal_Mode+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"OPCT()[3][1]=this.value;ReDraw(-1);\" value=\""+OPCT()[3][1]+"\" "+((OPCT()[0][1]==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_offset_inputs+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"OPCT()[4][1]=this.value;ReDraw(-1);\" value=\""+OPCT()[4][1]+"\" "+((OPCT()[0][1]==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n";
	if(UsrLvl>2)
	{
	out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Debugger+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"25\" onchange=\"OPCT()[5][1]=this.value;ReDraw(-1);\" value=\""+OPCT()[5][1]+"\" />\n\
			</td>\n\
		</tr>\n";
	}
	out+="</table>\n";
	out+="<hr />";
	return out;
}// */

function ShwScoot()
{
	var count2=0;
	var QtAnel = 1*(GlobalParms().Controllers);
	var QtDem = 1*((9+parseInt(GlobalParms().Inputs)+parseInt(GlobalParms().Loops)));
	var out="<font size=\"3\" color=\"#0aa\" face=\"arial\">"+Str_Config_OTU+"</font><br />\n";
	out += "<table border=\"0\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" >\n";
	out += "<tr>\n";
	//--------------------------------------------------------------------------------------------------- Str_Ctrl_OTU
	out += "<td align=\"center\" valign=\"top\">\n";
	{
		out += "<table border=\"0\" align=\"right\" cellpadding=\"2\" cellspacing=\"0\" width=\"60%\">\n";
		out += "<tr >\n";
		out += "<td align=\"center\" colspan=\"6\" bgcolor=\"#C0C0C0\">"+Str_Ctrl_OTU+"</td>\n"; /*bgcolor: cor de fundo #C0C0C0 rgb(192, 192, 192) */
		out += "</tr>\n";
		for(count2=0;count2<OTU().BitCofigRx.length;count2++)
		{
			var Color="";
			if ((count2%2)==1)
				Color="bgcolor=\"#F0F0F0\"";
			if((count2+1)==BitSel)
				Color="bgcolor=\"#40FF40\"";//cor de fundo
			out += "<tr "+Color+">\n";
			out += "<td align=\"center\" >\n";
			out += "<input type=\"radio\" id=\"SelBit\" onchange=\"BitSel="+(count2+1)+";ReDraw(-1);\""
			if((count2+1)==BitSel)
				out += " checked=\"checked\""
			out += " />";
			out += "</td>\n";
			out += "<td align=\"center\"><font size=\"1\">"+(OTU().BitCofigRx[count2].NBit+1)+"</font></td>\n";
			out += "<td align=\"left\"><font size=\"1\">("+OTU().BitCofigRx[count2].Fnc+")"+GetPrmFnc(OTU().BitCofigRx[count2].Fnc,0)+"</font></td>\n";
			for(idx=0;idx<3;idx++)
			{
				if (GetPrmFnc(OTU().BitCofigRx[count2].Fnc,idx+2) == "0")
					OTU().BitCofigRx[count2].Parms[idx]="0";
				if (GetPrmFnc(OTU().BitCofigRx[count2].Fnc,idx+2) == "1")
					OTU().BitCofigRx[count2].Parms[idx]="1";
				if(OTU().BitCofigRx[count2].Parms[idx])
					out += "<td align=\"center\"><font size=\"1\">"+OTU().BitCofigRx[count2].Parms[idx]+"</font></td>\n";
			}
			out += "</tr>\n";
		}
		out += "</table>";
	}
	out += "</td>\n";
	//--------------------------------------------------------------------------------------------------- Str_Reply_OTU
	out += "<td align=\"center\" valign=\"top\">\n";
	{
		out += "<table  border=\"0\" align=\"left\" cellpadding=\"2\" cellspacing=\"0\" width=\"60%\">\n";
		out += "<tr>\n";
		out += "<td align=\"center\" colspan=\"6\" bgcolor=\"#C0C0C0\">"+Str_Reply_OTU+"</td>\n";
		out += "</tr>\n";
		for(count2=0;count2<OTU().BitCofigTx.length;count2++)
		{
			var Color="";
			if ((count2%2)==1)
				Color="bgcolor=\"#F0F0F0\"";
			if((count2+32+1)==BitSel)
				Color="bgcolor=\"#40FF40\"";
			out += "<tr "+Color+">\n";
			out += "<td align=\"center\" >\n";
			out += "<input type=\"radio\" id=\"SelBit\" onchange=\"BitSel="+(count2+32+1)+";ReDraw(-1);\""
			if((count2+32+1)==BitSel)
				out += " checked=\"checked\""
			out += " />";
			out += "</td>\n";
			out += "<td align=\"center\"><font size=\"1\">"+(OTU().BitCofigTx[count2].NBit+1)+"</font></td>\n";
			out += "<td align=\"left\"><font size=\"1\">("+OTU().BitCofigTx[count2].Fnc+")"+GetPrmFnc(OTU().BitCofigTx[count2].Fnc,0)+"</font></td>\n";
			for(idx=0;idx<3;idx++)
			{
				if (GetPrmFnc(OTU().BitCofigTx[count2].Fnc,idx+2) == "0")
					OTU().BitCofigTx[count2].Parms[idx]="0";
				if (GetPrmFnc(OTU().BitCofigTx[count2].Fnc,idx+2) == "1")
					OTU().BitCofigTx[count2].Parms[idx]="1";
				if(OTU().BitCofigTx[count2].Parms[idx])
					out += "<td align=\"center\"><font size=\"1\">"+OTU().BitCofigTx[count2].Parms[idx]+"</font></td>\n";
			}
			out += "</tr>\n";
		}
		out += "</table>";
	}
	out += "</td>\n";
	//---------------------------------------------------------------------------------------------------
	out += "<td align=\"center\" valign=\"top\">\n";
	//---------------------------------------- G1G2
	{
		out += "<table border=\"0\" bgcolor=\"#F0F0F0\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" width=\"30%\">\n";
		out += "<tr>\n";
		out += "<td align=\"center\" >\n";
		out += "<font size=\"2\">Config G1 G2 bit</font>";
		out += "</td>\n";
		out += "<td align=\"center\" colspan=\"5\" >\n";
		out += "<select class=\"INTEXT\" onchange=\"OTU().G1G2=this.value;ReDraw(-1);\" >\n";
		OTU().G1G2&=3;
		switch(OTU().G1G2)
		{
			case 0:
			case 3:
				OTU().G1G2=0;
				out += "<option value=\"0\" selected=\"selected\">"+Str_Lack+"</option>\n";
				out += "<option value=\"1\">"+Str_FO+"</option>\n";
				out += "<option value=\"2\">"+Str_Manual_CTRL+"</option>\n";
			break;
			case 1:
				out += "<option value=\"0\">"+Str_Lack+"</option>\n";
				out += "<option value=\"1\"  selected=\"selected\">"+Str_FO+"</option>\n";
				out += "<option value=\"2\">"+Str_Manual_CTRL+"</option>\n";
			break;
			case 2:
				out += "<option value=\"0\">"+Str_Lack+"</option>\n";
				out += "<option value=\"1\">"+Str_FO+"</option>\n";
				out += "<option value=\"2\" selected=\"selected\">"+Str_Manual_CTRL+"</option>\n";
			break;
		}
		out += "</select>\n";
		out += "</td>\n";
		out += "</tr>\n";
		//--------------------------------------- FO
		out += "<tr>\n";
		out += "<td align=\"center\" >\n";
		out += "<font size=\"2\">Config FO bit</font>";
		out += "</td>\n";
		out += "<td align=\"center\" colspan=\"5\" >\n";
		out += "<select class=\"INTEXT\" onchange=\"OTU().FO=this.value;ReDraw(-1);\" >\n";
		if(OTU().FO == 0)
			out += "<option value=\"0\" selected=\"selected\"> - </option>\n";
		else
			out += "<option value=\"0\"> - </option>\n";
		for(var idx=0;idx<MaxNrBit;idx++)
		{
			out += "<option value=\""+(idx+1)+"\" ";
			if((idx+1) == OTU().FO)
				out +="selected=\"selected\"";
			out += ">"+(idx+1)+"</option>\n";
		}
		out += "</select>\n";
		out += "</td>\n";
		out += "</tr>\n";
		out += "</table>";
	}
	out += "</td>\n";
	//---------------------------------------------------------------------------------------------------
	{
		out += "<td align=\"center\" valign=\"top\" >\n";
		out +=GetCtrl()+"<br/>";
		out +="<textarea id=\"filecsv\" class=\"INTEXT\" rows=\"16\" cols=\"75\" onkeyup=\"\"></textarea><br/>";
		out +="<input type=\"button\" class=\"INTEXT2\" value=\"decode\" onclick=\"decode();\" />";
		out += "</td>";
	}
	out += "</tr>\n";
	out += "</table>";
	//---------------------------------------------------------------------------------------------------
	return out;
}

function ShwAdvance()
{
	var out="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" bordercolor=\"Silver\">\n";
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_AOVT+"</font>\n\
	</td>\n\
	<td>\n\
	<input onchange=\"GlobalParms().Alert_Over_Voltage=(this.value*100)\" type=\"text\" class=\"CssInText\" size=\"3\" value=\""+(GlobalParms().Alert_Over_Voltage/100)+"\" />\n\
	</td>\n\
	</tr>\n";
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_EMVT+"</font>\n\
	</td>\n\
	<td>\n\
	<input onchange=\"GlobalParms().Error_Minimal_Voltage=(this.value*100)\" type=\"text\" class=\"CssInText\" size=\"3\" value=\""+(GlobalParms().Error_Minimal_Voltage/100)+"\" />\n\
	</td>\n\
	</tr>\n";
	out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_ECVT+"</font>\n\
	</td>\n\
	<td>\n\
	<input onchange=\"GlobalParms().Error_Critical_Voltage=(this.value*100)\" type=\"text\" class=\"CssInText\" size=\"3\" value=\""+(GlobalParms().Error_Critical_Voltage/100)+"\" />\n\
	</td>\n\
	</tr>\n";
	/*out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_Log_Out+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">\n\
	<select id=\"GlobalParms().LOG\" class=\"CssSelect\" onchange=\"\">\n";
	out+=GenOptions(OptLogLinks,GlobalParms().LOG);
	out+="</select>\n\
	</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_LOG+"</font>\n\
	</td>\n\
	</tr>\n";// */
	/*out+="<tr align=\"left\">\n\
	 <td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_FUT+"</font>\n\
	</td>\n\
	<td>\n\
	<select id=\"GlobalParms().Flashing\" class=\"CssSelect\" onchange=\"\">\n";
	out+=GenOptions(OptFlashingHz,GlobalParms().Flashing);
	out+="</select>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_FUC+"</font>\n\
	</td>\n\
	</tr>\n";// */
	/*out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_FDT+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" >\n\
	<input id=\"GlobalParms().FlasCA\" type=\"text\" class=\"CssInText\" size=\"3\" value=\""+GlobalParms().FlasCA+"\" />\n\
	</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_FDC+"</font>\n\
	</td>\n\
	</tr>\n";// */
	/*out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_Time_Capture_Inputs+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input id=\"GlobalParms().Time_Cap\" type=\"text\" class=\"CssInText\" size=\"3\" value=\""+GlobalParms().Time_Cap_In+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_TCIT+"</font>\n\
	</td>\n\
	</tr>\n";// */
	/*out+="<tr align=\"left\">\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_NVT+"</font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\" ><input id=\"GlobalParms().Normal_Voltage\" type=\"text\" class=\"CssInText\" size=\"3\" value=\""+(GlobalParms().Normal_Voltage/100)+"\" /></font>\n\
	</td>\n\
	<td>\n\
	<font size=\"1\" face=\"arial\">"+Str_GP_NVTC+"</font>\n\
	</td>\n\
	</tr>\n";// */
	/*out+="<tr bordercolor=\"Silver\">\n\
	<td align=\"middle\" colspan=\"3\">\n\
	<input type=\"button\" class=\"CssBtn\" id=\"GPbS\" value=\""+Str_check_Conf+"\" onclick=\"chkAdvance();\" />\n\
	</td>\n\
	</tr>\n";// */
	out+="</table>\n";
	return out;
}

//--------------------------------------------------
percent=15;
