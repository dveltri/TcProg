loadjscssfile("entreverde","./EntVerde.js", "js");
loadjscssfile("ios","./IOs.js", "js");
var  error_index=0;
var  error=0;

var BitSel=0;
var MaxNrBit = 32;
var QtDem=0;
var nrplansel = -1;

var FncPrms = new Array();
FncPrms[0] = ["Demanda"			,"Dn"	,"PLC"	,"Inp"	,"0"];
FncPrms[1] = ["Todas as Demandas"		,"DX"	,"PLCs"	,"0"	,"0"];
FncPrms[2] = ["Piscante"		,"FF"	,"PLCs"	,"0"	,"0"];
FncPrms[3] = [Str_Stage			,"Fn"	,"PLC"	,"Sts"	,"Inp"];
FncPrms[4] = [""				,"HI"	,"PLCs"	,"Inp"	,"0"];
FncPrms[5] = ["Lamp off"		,"SL"	,"PLCs"	,"0"	,"0"];
FncPrms[6] = ["Alterar Relogio"		,"TS"	,"Hs"	,"Min"	,"0"];
FncPrms[7]=0;
FncPrms[8]=0;
FncPrms[9]=0;
FncPrms[10] = ["Controller Fail","CF"	,"PLCs"	,"0"	,"0"];
FncPrms[11] = ["Sync"			,"CS"	,"1"	,"0"	,"0"];
FncPrms[12] = ["Demand Fail"	,"DF"	,"0"	,"0"	,"0"];
FncPrms[13] = ["Piscante"		,"FR"	,"PLCs"	,"0"	,"0"];
FncPrms[14] = ["Estado"			,"Gn"	,"PLC"	,"Sts"	,"0"];
FncPrms[15] = [""				,"GP"	,"PLCs"	,"0"	,"0"];
FncPrms[16] = ["Lamp Off"		,"LE"	,"PLCs"	,"0"	,"0"];
FncPrms[17] = ["Lamp Error"		,"LFn"	,"PLCs"	,"0"	,"0"];
FncPrms[18] = ["Contrl Manual"	,"MC"	,"PLCs"	,"0"	,"0"];
FncPrms[19] = ["Demand"			,"SDn"	,"InpSF"	,"0"	,"0"];

function compare(a,b) 
{
  if (a.NBit < b.NBit)
     return -1;
  if (a.NBit > b.NBit)
    return 1;
  return 0;
}
function DelCtrl(value)
{
	OTU.BitCofigRx.splice(value-1,1);
	BitSel=1;
}
function DelRply(value)
{
	OTU.BitCofigTx.splice(value-1,1);
	BitSel=33;
}
function AddCtrl(value)
{
	var x=OTU.BitCofigRx.length;
	OTU.BitCofigRx[x]= new Object();
	OTU.BitCofigRx[x].NBit=value-1;
	OTU.BitCofigRx[x].Fnc="-";
	OTU.BitCofigRx[x].Parms=[0,0,0];
	BitSel=1;
	OTU.BitCofigRx.sort(compare);
}
function AddRply(value)
{
	var x=OTU.BitCofigTx.length;
	OTU.BitCofigTx[x]= new Object();
	OTU.BitCofigTx[x].NBit=value;
	OTU.BitCofigTx[x].Fnc="-";
	OTU.BitCofigTx[x].Parms=[0,0,0];
	BitSel=33;
	OTU.BitCofigTx.sort(compare);
}
function GetPrmFnc(Fnc,prm)
{
	for(var idx=0;idx<FncPrms.length;idx++)
	{
		if(FncPrms[idx])
		{
			if(Fnc==FncPrms[idx][1])
				return FncPrms[idx][prm];
		}
	}
}
//---------------------------------------------------------------------------
function GetCtrl()
{
	var out="";
	var x=0;
	var z=0;
	var sts=0;
	var idx=0;
	var plc=0;
	var QtDem = 1*((9+parseInt(GlobalParms.Inputs)+parseInt(GlobalParms.Loops)));
	var QtDem = IOs.length;
	out += "<table border=\"0\" align=\"left\" cellpadding=\"0\" cellspacing=\"0\" width=\"30%\">\n";
	//---------------------------------------------------------------------------------------------------
	{
		out += "<tr bgcolor=\"#C0F0C0\">\n";
		out += "<td valign=\"middle\" align=\"left\">\n";
		out += "<select class=\"INTEXT\" onchange=\"if(this.value){AddCtrl(this.value);ShwArne0();}\" >\n";
		out += "<option value=\"0\">Add "+Str_Ctrl_OTU+" Bit</option>\n";
		for(idx=0;idx<MaxNrBit;idx++)
		{
			;
			for(x=0;x<OTU.BitCofigRx.length;x++)
			{
				if(idx == OTU.BitCofigRx[x].NBit)
					break;
			}
			if(x==OTU.BitCofigRx.length)
			{
					out += "<option value=\""+(idx+1)+"\">"+Str_Ctrl_OTU+" "+(idx+1)+"</option>\n";
			}
		}
		out += "</select>";	//Este objeto irá permitir ao usuário controlar os itens de uma lista de opções criada com o tag HTML
		out += "</td>";
		out += "<td valign=\"middle\" align=\"left\">\n";
		out += "<select class=\"INTEXT\" onchange=\"if(this.value){DelCtrl(this.value);ShwArne0();}\" >\n";
		out += "<option value=\"0\">Dell "+Str_Ctrl_OTU+" Bit</option>\n";
		for(idx=0;idx<OTU.BitCofigRx.length;idx++)
		{
				out += "<option value=\""+(idx+1)+"\">Del "+Str_Ctrl_OTU+" "+(OTU.BitCofigRx[idx].NBit+1)+"</option>\n";
		}
		out += "</select>";	
		out += "</td>";
		out += "<td valign=\"middle\" align=\"left\">\n";
		out += "<select class=\"INTEXT\" onchange=\"if(this.value){AddRply(this.value-1);ShwArne0();}\" >\n";
		out += "<option value=\"0\">Add "+Str_Reply_OTU+" Bit</option>\n";
		for(idx=0;idx<MaxNrBit;idx++)
		{
			for(x=0;x<OTU.BitCofigTx.length;x++)
			{
				if(idx == OTU.BitCofigTx[x].NBit)
					break;
			}
			if(x==OTU.BitCofigTx.length)
			{
					out += "<option value=\""+(idx+1)+"\">"+Str_Reply_OTU+" "+(idx+1)+"</option>\n";
			}
			}
		out += "</select>";	
		out += "</td>";
		out += "<td valign=\"middle\" align=\"left\">\n";
		out += "<select class=\"INTEXT\" onchange=\"if(this.value){DelRply(this.value);ShwArne0();}\" >\n";
		out += "<option value=\"0\">Dell "+Str_Reply_OTU+" Bit</option>\n";
		for(idx=0;idx<OTU.BitCofigTx.length;idx++)
		{
				out += "<option value=\""+(idx+1)+"\">Del "+Str_Reply_OTU+" "+(OTU.BitCofigTx[idx].NBit+1)+"</option>\n";
		}
		out += "</select>";	
		out += "</td>";
		out += "</tr>";	
	}
	//---------------------------------------------------------------------------------------------------
	if(BitSel)
	{
		if(BitSel>32)
		{
			var bitsel = BitSel-32-1;
			bitsel%=OTU.BitCofigTx.length;
			var Type=Str_Reply_OTU;
			var VecN="BitCofigTx";
			var Parms=OTU.BitCofigTx[bitsel].Parms;
			var BitN=	OTU.BitCofigTx[bitsel].NBit;
			var Fnc=	OTU.BitCofigTx[bitsel].Fnc;
		}
		else
		{
			var bitsel = BitSel-1;
			bitsel%=OTU.BitCofigRx.length;
			var Type=Str_Ctrl_OTU;
			var VecN="BitCofigRx";
			var Parms=OTU.BitCofigRx[bitsel].Parms;
			var BitN=	OTU.BitCofigRx[bitsel].NBit;
			var Fnc=	OTU.BitCofigRx[bitsel].Fnc;
		}
		//---------------------------------------------------------------------------------------------------
		{
			out += "<tr bgcolor=\"#A0C0A0\">\n";
			out += "<td valign=\"middle\" align=\"left\">\n";
			out += Type +" Bit";
			out += "</td>";
			out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
			out += (parseInt(BitN)+1);
			out += "</td>";
			out += "</tr>";	
		}
		//---------------------------------------------------------------------------------------------------
		{
			out += "<tr bgcolor=\"#C0F0C0\" >\n";
			out += "<td valign=\"middle\" align=\"left\">\n";
			out += Str_OTU_Command;
			out += "</td>";
			out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
			out += "<select class=\"INTEXT\" onchange=\"OTU."+VecN+"["+bitsel+"].Fnc=this.value;ShwArne0();\" >\n";
			out += "<option value=\"-\" > - </option>\n";
			if(Type==Str_Ctrl_OTU)
			{
				for(idx=0;idx<10;idx++)
				{
					if(FncPrms[idx])
					{
						out += "<option value=\""+FncPrms[idx][1]+"\" ";
						if(Fnc==FncPrms[idx][1])
						{
							z=idx;
							out += "selected=\"selected\"";
						}
						out += ">("+FncPrms[idx][1]+")"+FncPrms[idx][0]+"</option>\n";
					}
				}
			}
			else
			{
				for(idx=10;idx<FncPrms.length;idx++)
				{
					if(FncPrms[idx])
					{
						out += "<option value=\""+FncPrms[idx][1]+"\" ";
						if(Fnc==FncPrms[idx][1])
						{
							z=idx;
							out += "selected=\"selected\"";
						}
						out += ">("+FncPrms[idx][1]+")"+FncPrms[idx][0]+"</option>\n";
					}
				}
			}
			out += "</select>\n";
			out += "</td>";
			out += "</tr>";	
		}
		//---------------------------------------------------------------------------------------------------
		if(Fnc != "-")
		{
			for(var prm=0;prm<FncPrms[z].length;prm++)
			{
				Color="bgcolor=\"#C0F0C0\"";
				if ((prm%2)==0)
					Color="bgcolor=\"#A0C0A0\"";
				out += "<tr "+Color+">\n";
				//-------------------------------------  controllers	 ---------------------------------------
				if (FncPrms[z][prm+2] == "PLCs")
				{
					out += "<td valign=\"middle\" align=\"left\">\n";
					out += Str_GP_Controllers+" \n";
					out += "</td>";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">";
					for(idx=0;idx<PLCs.length;idx++)
					{
							out += "["+(idx+1)+"<input type=\"checkbox\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]^="+(1<<idx)+";ShwArne0();\" "
							if(Parms[prm]&(1<<idx))
								out += "checked=\"checked\"";
							out += "/>] ";
					}
					out += "</td>";
				}
				//-------------------------------------  controller	 ---------------------------------------
				if (FncPrms[z][prm+2] == "PLC")
				{
					plc=parseInt(Parms[prm]);
					out += "<td valign=\"middle\" align=\"left\">\n";
					out += Str_Controllers+" \n";
					out += "</td>";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					for(idx=0;idx<PLCs.length;idx++)
					{
						out += "["+Str_Controllers+(idx+1)+"<input type=\"radio\" name=\"SelPlc\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]="+(idx+1)+";ShwArne0();\" ";
						if(Parms[prm]==(idx+1))
							out += " checked=\"checked\""
						out += "/>] ";
					}
					out += "</td>";
				}
				//-------------------------------------  Estados	 ---------------------------------------
				if (FncPrms[z][prm+2] == "Sts" && plc!=0 && plc<=PLCs.length)
				{
					sts=parseInt(Parms[prm]);
					out += "<td valign=\"middle\" align=\"left\">\n";
					out += Str_Stage+"\n";
					out += "</td>";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					for(idx=0;idx<PLCs[plc-1].Sts.length;idx++)
					{
						out += "["+String.fromCharCode(65+idx)+"<input type=\"radio\" name=\"SelSts\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]="+(idx+1)+";ShwArne0();\" ";
						if(Parms[prm]==(idx+1))
							out += " checked=\"checked\""
						out += "/>] ";
					}
					out += "</td>";
				}
				//-------------------------------------  entradas	 ---------------------------------------
				if (FncPrms[z][prm+2] == "Inp"  && plc!=0 && plc<=PLCs.length)
				{
					if(plc && sts)
					{
						for(var dem=0;dem<PLCs[plc-1].OTUPlan.OTUDEMSTS.length;dem++)
						{
							if(PLCs[plc-1].OTUPlan.OTUDEMSTS[dem]!=0 && PLCs[plc-1].OTUPlan.OTUSTSDEM[dem]==sts)
							{
								if(Parms[prm]!=PLCs[plc-1].OTUPlan.OTUDEMSTS[dem])
								{
									Parms[prm]=PLCs[plc-1].OTUPlan.OTUDEMSTS[dem];
									setTimeout("ShwArne0();",200); //Faz com que uma expressão seja avaliada após um determinado tempo (milissegundos)
								}
								break;
							}
						}
					}
					out += "<td valign=\"middle\" align=\"left\">\n";
					out += Str_OTU_Demand+"\n";
					out += " Disable<input type=\"radio\" name=\"SelDem\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]=0;ShwArne0();\" ";
					if(Parms[prm]==0)
						out += " checked=\"checked\""
					out += "/>";
					out += "</td>";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					x=0;
					for(idx=0;idx<QtDem;idx++)
					{
						//indexof retorna a posição índice dentro da string, se o índice não estiver na string, indexof retorna -1, se retornar -1 entra no if
						if(((IOs[idx].Type&1)==1) && (IOs[idx].Enable!=0) && (IOs[idx].Name.indexOf("Bot")!=-1)) 
						{
							out +="[";
							if(idx<9)
								out +="0";
							out += (idx+1);
							out+="("+IOs[idx].Name+")<input type=\"radio\" name=\"SelDem\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]="+(idx+1)+";ShwArne0();\" ";
							if(Parms[prm]==(idx+1))
								out += " checked=\"checked\""
							out += "/>] ";
							if((x%5)==4)
								out += "<br/>";
							x++;
						}
					}
					out += "</td>";
				}
				//-------------------------------------  entradas Sin Filtro ---------------------------------------
				if (FncPrms[z][prm+2] == "InpSF")
				{
					out += "<td valign=\"middle\" align=\"left\">\n";
					out += Str_OTU_Demand+"\n";
					out += " Disable<input type=\"radio\" name=\"SelDem\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]=0;ShwArne0();\" ";
					if(Parms[prm]==0)
						out += " checked=\"checked\""
					out += "/>";
					out += "</td>";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					x=0;
					for(idx=0;idx<QtDem;idx++)
					{
						if(((IOs[idx].Type&1)==1) && (IOs[idx].Enable!=0) && (IOs[idx].Name.indexOf("Bot")!=-1))
						{
							out +="[";
							if(idx<9)
								out +="0";
							out += (idx+1);
							out+="("+IOs[idx].Name+")<input type=\"radio\" name=\"SelDem\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]="+(idx+1)+";ShwArne0();\" ";
							if(Parms[prm]==(idx+1))
								out += " checked=\"checked\""
							out += "/>] ";
							if((x%5)==4)
								out += "<br/>";
							x++;
						}
					}
					out += "</td>";
				}
				//-------------------------------------  Horas	 ---------------------------------------
				if (FncPrms[z][prm+2] == "Hs")
				{
					out += "<td valign=\"middle\" align=\"left\">Hora:</td>\n";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					out += "<select class=\"INTEXT\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]=this.value;ShwArne0();\" >\n";
					for(idx=0;idx<24;idx++)
					{
							out += "<option value=\""+idx+"\""
							if(Parms[prm]==idx)
								out += " selected=\"selected\"";
							out += ">"+idx+"</option>\n";
					}
					out += "</select>\n";
					out += "</td>";
				}
				//-------------------------------------  Min	 ---------------------------------------
				if (FncPrms[z][prm+2] == "Min")
				{
					out += "<td valign=\"middle\" align=\"left\">Minuto:</td>\n";
					out += "<td valign=\"middle\" align=\"left\" colspan=\"3\">\n";
					out += "<select class=\"INTEXT\" onchange=\"OTU."+VecN+"["+bitsel+"].Parms["+prm+"]=this.value;ShwArne0();\" >\n";
					for(idx=0;idx<60;idx++)
					{
							out += "<option value=\""+idx+"\""
							if(Parms[prm]==idx)
								out += " selected=\"selected\"";
							out += ">"+idx+"</option>\n";
					}
					out += "</select>\n";
					out += "</td>";
				}
				//-------------------------------------  0	 ---------------------------------------
				out += "</tr>";	
			}
		}
	}
	//-----------------------------------------------------------------------------------------------------------------------------
	out += "</table>";
	return out;
}


function ShwFBNO0()
{	
	var out="";	
	var code = ErrorsCfg[error_index][0] == "All"?Str_Error_All:ErrorsCfg[error_index][0];
	var flag = ErrorsCfg[error_index][1];
	var flag_flashingAll = (flag & 48)?"":((flag & 8)?"":"checked=\"yes\"");
	var flag_flashing = (flag & 48)?"":"checked=\"yes\"";
	var flag_LogInFile = (flag & 4)?"":"checked=\"yes\"";		
	var combo = comboErrors();
						
		
	out +="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\" style=\"width:600px;\">\n";
	out +="	<tr align=\"left\">\n";
	out +="		<td>\n";
	out +="			<font size=\"1\" face=\"arial\">"+Str_Error_ErrorCode+"</font>\n";
	out +="		</td>\n";
	out +="		<td align=\"left\">\n";
	out +="			<input type=\"button\" class=\"CssBtn\" id=\"GPbS\" value=\"&#9650;\" onclick=\"previousError();\" />\n";
	out +="			<font size=\"1\" face=\"arial\">\n";
	out +="				<input id=\"txtErrorCode\" type=\"text\" class=\"CssInText\" size=\"3\" maxlength=\"3\"  value=\""+code+"\" disabled=\"yes\"/>\n";
	out +="			</font>\n";
	out +="			<input type=\"button\" class=\"CssBtn\" id=\"GPbS\" value=\"&#9660;\" onclick=\"nextError();\" />\n";
	out +="		</td>\n";
	out +="		<td>\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr bordercolor=\"Silver\">\n";
	out +="		<td align=\"middle\" colspan=\"3\">\n";
	out +="			"+(code==Str_Error_All?Str_Error_All:HTMLEncode(Str_Errors_Str[parseInt(code)]))+"\n";
	out +="		</td>\n";
	out +="	</tr>\n";
		
	out +="	<tr align=\"left\">\n";
	out +="		<td>\n";
	out +="			<font size=\"1\" face=\"arial\">\n";
	out +="				<input id=\"chkLogInFile\" type=\"checkbox\" class=\"CssChkBox\" size=\"2\" maxlength=\"3\" "+flag_LogInFile+"/>"+Str_Error_LogInFile+"\n";
	out +="			</font>\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr align=\"left\">\n";
	out +="		<td>\n";
	out +="			<font size=\"1\" face=\"arial\">\n";
	out +="				<input id=\"chkFlashing\" type=\"checkbox\" class=\"CssChkBox\" size=\"2\" maxlength=\"3\" "+flag_flashing+" onclick=\"enableFlashingAll();\" />"+Str_Error_Flashing+"\n";
	out +="			</font>\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr align=\"left\">\n";
	out +="		<td>\n";
	out +="			<font size=\"1\" face=\"arial\">\n";
	out +="				<input id=\"chkFlashingAll\" type=\"checkbox\" class=\"CssChkBox\" size=\"2\" maxlength=\"3\" "+flag_flashingAll+"  />"+Str_Error_FlashingAll+"\n";
	out +="			</font>\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr bordercolor=\"Silver\">\n";
	out +="		<td align=\"right\" colspan=\"3\">\n";
	out +="			<img src=\"./img/add.png\" width=\"30\" height=\"30\" border=\"0\" onclick=\"openNewErrorDiv();\"></img>\n";	
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr bordercolor=\"Silver\">\n";
	out +="		<td align=\"middle\" colspan=\"3\">\n";
	out +="			<div id=\"newError\" style=\"display:none;\">\n";
	out +=				combo;
	out +="				<img style=\"vertical-align: bottom;\" src=\"./img/ok2.png\" width=\"30\" height=\"30\" border=\"0\" onclick=\"addError();\"></img>\n";
	out +="			</div>\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr bordercolor=\"Silver\">\n";
	out +="		<td align=\"middle\" colspan=\"3\">\n";
	out +="			<input type=\"button\" class=\"CssBtn\" id=\"GPbS\" value=\""+Str_check_Conf+"\" onclick=\"CheckErrors();\" />\n";
	out +="		</td>\n";
	out +="	</tr>\n";
	
	out +="	<tr bordercolor=\"Silver\">\n";
	out +="		<td align=\"middle\" colspan=\"3\">\n";
	out +=			listErrors(error_index);
	out +="		</td>\n";
	out +="	</tr>\n";
	out +="</table>\n";
		
	return out;
}

function openNewErrorDiv()
{
	document.getElementById("newError").style.display = 'block';
}

function comboErrors()
{
	var combo = "";
	var achou = 0;
	
	combo += "<select id=\"errorList\" onchange=\"selectedError()\" style=\"height:30px;\" >\n";
	combo += "	<option value=\"0\">"+ HTMLEncode(Str_Error_SelectNewError) +"</option>\n";
	for (var i=9; i<Str_Errors_Str.length; i++)
	{
		for (var j=0; j<ErrorsCfg.length; j++)
		{
			if(ErrorsCfg[j][0] == i)
				achou = 1;			
		}
		if(achou == 1)
			achou = 0;		
		else
			combo += "	<option value=\""+ i +"\">"+ HTMLEncode("("+i+") "+Str_Errors_Str[i]) +"</option>\n";	
		
	}
	combo += "</select>\n";	
	return combo;
}

function selectedError()
{
	var list = document.getElementById("errorList");
	error = list.options[list.selectedIndex].value;
	
}

function listErrors(highlighted)
{
	var list = "";
	var code = "";
	var flag = 0;
	var flag_flashingAll="";
	var flag_flashing="";
	var flag_LogInFile="";
	var color="";
	var ok = "<img src=\"./img/ok.png\" width=\"20\" height=\"20\" border=\"0\"></img>";
	
	
	list +="<table width=\"100%\" border=\"1\">\n";
	list +="	<tr bordercolor=\"Silver\">\n";
	list +="		<td align=\"middle\" colspan=\"3\">\n";
	list +=				"ID\n" ;
	list +="		</td>\n";
	list +="		<td align=\"middle\" colspan=\"3\">\n";
	list +=				Str_Error_Flashing+"\n" ;
	list +="		</td>\n";
	list +="		<td align=\"middle\" colspan=\"3\">\n";
	list +=				Str_Error_FlashingAll+"\n" ;
	list +="		</td>\n";
	list +="		<td align=\"middle\" colspan=\"3\">\n";
	list +=				Str_Error_LogInFile+"\n" ;
	list +="		</td>\n";
	list +="		<td align=\"middle\" colspan=\"3\">\n";
	list +=				"X"+"\n" ;
	list +="		</td>\n";
	list +="	</tr>\n";
	
	for (var i=0; i<ErrorsCfg.length; i++)
	{		
		code = ErrorsCfg[i][0] == "All"?Str_Error_All:ErrorsCfg[i][0];
		flag = ErrorsCfg[i][1];
		flag_flashingAll = (flag & 48)?"":((flag & 8) ?"":ok);
		flag_flashing = (flag & 48)?"":ok;
		flag_LogInFile = (flag & 4)?"":ok;		
		color= highlighted == i?"#3399FF":"#FFFFFF";

		list +="	<tr bordercolor=\"Silver\">\n";
		list +="		<td bgcolor=\""+color+"\" align=\"middle\" colspan=\"3\">\n";
		list +=				code +"\n" ;
		list +="		</td>\n";
		list +="		<td bgcolor=\""+color+"\" align=\"middle\" colspan=\"3\">\n";
		list +=				flag_flashing+"\n" ;
		list +="		</td>\n";
		list +="		<td bgcolor=\""+color+"\" align=\"middle\" colspan=\"3\">\n";
		list +=				flag_flashingAll+"\n" ;
		list +="		</td>\n";
		list +="		<td bgcolor=\""+color+"\" align=\"middle\" colspan=\"3\">\n";
		list +=				flag_LogInFile+"\n" ;
		list +="		</td>\n";
		list +="		<td bgcolor=\""+color+"\" align=\"middle\" colspan=\"3\">\n";
		if(code != Str_Error_All)
		{
			list +="		<img src=\"./img/remove.png\" width=\"20\" height=\"20\" border=\"0\" onclick=\"removeError("+ i +");\"></img>\n";		
		}
		list +="		</td>\n";		
		list +="	</tr>\n";				
	}	
	list +="</table>\n";

	return list;
}

function enableFlashingAll()
{
	if(document.getElementById("chkFlashing").checked)
		document.getElementById("chkFlashingAll").disabled = false;
	else
	{		
		document.getElementById("chkFlashingAll").disabled = true;
		document.getElementById("chkFlashingAll").checked = false;
	}
}

function nextError()
{
	error_index++;
	if(error_index == ErrorsCfg.length)
		error_index = 0;
	ReDraw(conf_errors);
	enableFlashingAll();
}

function previousError()
{
	error_index--;
	if(error_index == -1)
		error_index = ErrorsCfg.length-1;
	ReDraw(conf_errors);
	enableFlashingAll();
}

function chkparm1(name, valeu)
{
	return true;
}

function removeError(index)
{
	code = ErrorsCfg[index][0] == "All"?Str_Error_All:ErrorsCfg[index][0];
	if (confirm(Str_Error_RemoveMessage + " " + code +'?')) 
	{
		ErrorsCfg.splice(index,1);	
		error_index = 0;
	}		
	ReDraw(conf_errors);
	enableFlashingAll();
}

function addError()
{
	var last = ErrorsCfg.length;
	var newError = [error,0];
	if(error != 0)
	{
		ErrorsCfg.splice(last,0,newError);
		error_index = 0;
	}
	error = 0;
	ReDraw(conf_errors);
	enableFlashingAll();
}

function CheckErrors()
{
	var code = document.getElementById("txtErrorCode").value;
	var flag = 0;
	flag +=	document.getElementById("chkLogInFile").checked?0:4;	
	flag +=	document.getElementById("chkFlashingAll").checked?0:8;
	flag +=	document.getElementById("chkFlashing").checked?0:48;			
	
	if(chkparm1("erros[].codigo", code) && chkparm1("erros[].flag", flag))
	{	
		ErrorsCfg[error_index][1] = flag;
	}
	else
	{
		alert("Error"); //Caixa de alerta com um botao "ok"
	}
	ReDraw(conf_errors);
	enableFlashingAll();
}

percent=95;
