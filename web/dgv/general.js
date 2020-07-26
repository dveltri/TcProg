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
		out+="<input type=\"button\" class=\"CssMaxBtn\" value=\"Prev\" onclick=\"goWizrdPrev();\" />\n";
	out+="</td>\n";
	out+="<td align=\"right\" >\n";
	if(WizrdIdx<wizard[Widx].length-1)
		out+="<input type=\"button\" class=\"CssMaxBtn\" value=\"Next\" onclick=\"goWizrdNext();\" />\n";
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
			if(GlobalParms().Model.indexOf("GW")==-1)
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
			//if(GlobalParms().Model.indexOf("GW")==-1)
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
			document.getElementById("HOME1").innerHTML=ShwEV();
			document.getElementById("HOME2").innerHTML=ShwEntreVerdes();
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
			/*if(GlobalParms().Model.indexOf("RT")!=-1)
			document.getElementById('HOME2').innerHTML=ShwStsCft();// */
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
			out="<hr />\n";
			out+="<table border=\"0\" align=\"center\" cellpadding=\"10\" cellspacing=\"10\" width=\"90%\" >\n";
			out+="<tr><td valign=\"top\" align=\"left\" >\n";
			out+=ShowDgvpConf();
			out+="</td><td valign=\"top\" align=\"right\" >\n";
			out+=ShwSutec();
			out+="</td></tr>\n";
			out+="<tr><td valign=\"top\" align=\"left\" >\n";
			out+=ShwMaster();
			out+="</td><td valign=\"top\" align=\"right\" >\n";
			//out+=ShwScoot();
			out+="</td></tr>\n";
			out+="</table>\n";
			document.getElementById('HOME1').innerHTML=out;
			//document.getElementById('HOME2').innerHTML=ShwSutec();
			//document.getElementById('HOME3').innerHTML=ShwMaster();
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
	//------------------------------------------------------------------------------------ class=\"table1\" 
	var out="<table width=\"90%\" height=\"90%\" border=\"0\" align=\"center\" cellpadding=\"2\" cellspacing=\"0\" bordercolor=\"#000000\" bgcolor=\"#ccc\" >\n";
	out+="<tr bgcolor=\"#bbb\" >\n<td></td>\n";	// rowspan=\"10\" class=\"hrvert\"
	for(j=0;j<PHASEs().length;j++)
	{
		out+="<td "+((j&1)?"":"bgcolor=\"#ccc\"")+" align=\"center\" >";
		out+="<input type=\"text\" align=\"right\" class=\"CssInText\" value=\"";
		out+=PHASEs()[j].Name;
		out+="\" size=\"8\" maxlength=\"10\" onchange=\"PHASEs()["+j+"].Name=this.value;\" />\n";
		out+="</td>\n";
	}
	out+="</tr>\n";
	out+="<tr>\n<td colspan=\""+(1+PHASEs().length)+"\" ><hr /></td></tr>\n";
	//-------------------
	out+="<tr bgcolor=\"#ccc\" >\n<td ><font size=\"1\" face=\"arial\">"+Str_Enabled+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
		out +="<td align=\"center\"><input type=\"checkbox\" onclick=\"PHASEs()["+j+"].PLC^="+(1<<PlcIdx)+";\" "+(PHASEs()[j].PLC&(1<<PlcIdx)?"checked=\"checked\"":"")+" /></td>\n";
	out+="</tr>\n";
	//-------------------
	out+="<tr bgcolor=\"#bbb\">\n<td ><font size=\"1\" face=\"arial\">"+Str_Type_Phase+"</font></td>\n";
	for(j=0;j<PHASEs().length;j++)
	{
		out+="<td align=\"center\">\n";
		out+="<select class=\"CssSelect\" onchange=\"PHASEs()["+j+"].Type=this.value;PHASEs()["+j+"].FState=FStateTyp[this.value];ReDraw(-1);\">\n";
		out+=GenOptions(OptPhTyp,PHASEs()[j].Type);
		out+="</select>\n";
		out+="</td>\n";
	}
	out+="</tr>\n";
	out+="<tr>\n<td colspan=\""+(1+PHASEs().length)+"\" ><hr /></td></tr>\n";
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
	out+="<tr>\n<td colspan=\""+(1+PHASEs().length)+"\" ><hr /></td></tr>\n";
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
	out2+="<tr>\n<td colspan=\""+(1+PHASEs().length)+"\" ><hr /></td></tr>\n";
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
	out2+="<tr>\n<td colspan=\""+(1+PHASEs().length)+"\" ><hr /></td></tr>\n";
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
	out2+="<tr>\n<td colspan=\""+(1+PHASEs().length)+"\" ><hr /></td></tr>\n";
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
