function ShowComms()
 {
	var out="<hr />\n";
	out+="<table border=\"0\" align=\"center\" cellpadding=\"10\" cellspacing=\"10\" width=\"90%\" >\n";
	out+="<tr>\n";
	out+="<td valign=\"top\" align=\"left\" id=\"comm_sdgvp_conf\" ></td>\n";
	out+="<td valign=\"top\" align=\"right\" id=\"comm_sute_conf\" ></td>\n";
	out+="</tr>\n";
	out+="<tr>\n";
	out+="<td valign=\"top\" align=\"left\" id=\"comm_master_conf\" ></td>\n";
	out+="<td valign=\"top\" align=\"right\" id=\"comm_otu_conf\" ></td>\n";
	out+="</tr>\n";
	out+="</table>\n";
	return out;
 }
function ShowDgvpConf(obj)
{
	if(SdgvP().link==null)
		return "";
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
			<input type=\"checkbox\" onclick=\"(SdgvP().link!=0?SdgvP().link=0:SdgvP().link=12);ReDraw(-1);\" "+(SdgvP().link!=0?"checked=\"checked\"":"")+" />\n\
			</td>\n\
		</tr>\n";
	}
	//---------------------------------------------------------------------
	{
		out+="<tr align=\"left\" >\n";
		out+="	<td>\n";
		out+="		<font size=\"1\" face=\"arial\">"+Str_Dgvp_Link+"("+SdgvP().link+")</font>\n";
		out+="	</td>\n";
		out+="	<td valign=\"middle\">\n";
		//out+="		<input  value=\""+SdgvP.link+"\" onkeyup=\"SdgvP.link=this.value;\" class=\"CssInText\" size=\"5\" maxlength=\"5\" />\n";
		out+="		<input type=\"text\" class=\"CssInText\" size=\"20\" onchange=\"Links()["+SdgvP().link+"][2]=this.value;ReDraw(-1);\"  value=\""+Links()[SdgvP().link][2]+"\" />\n";
		out+="	</td>\n";
		out+="</tr>\n";
	}
	//---------------------------------------------------------------------
	var idx=0;
	while(SdgvP()["tsk"+idx])
	{
		//while(SdgvP().tsk.length;idx++)
		out+="<tr align=\"left\" >\n";
		out+="	<td align=\"left\">\n";
		out+="		<font size=\"1\" face=\"arial\">"+Str_Dgvp_srvid+"</font><br />\n";
		out+="		<font size=\"1\" face=\"arial\">"+Str_period+"</font><br />\n";
		out+="	</td>\n";
		out+="	<td align=\"left\" valign=\"middle\">\n";
		out+="		<input value=\""+SdgvP().Tsk[idx].IDsrv+"\"  onkeyup=\""+((idx==0)?"SdgvP().IDsrv=this.value;":"")+"SdgvP().Tsk["+idx+"'].IDsrv=this.value;\" class=\"CssInText\" size=\"5\" maxlength=\"5\"   />\n<br/>";
		out+="		<input value=\""+SdgvP().Tsk[idx].Period+"\" onkeyup=\"SdgvP().Tsk["+idx+"'].Period=this.value;\" class=\"CssInText\" size=\"5\" maxlength=\"5\"  />\n";
		out+="	</td>\n";
		out+="</tr>\n";
		//---------------------------------------------------------------------
		out+="<tr><td colspan=\"2\" ><hr /></td></tr>\n";
		out+="<tr align=\"left\" >\n";
		out+="	<td align=\"left\">\n";
		out+="		<font size=\"1\" face=\"arial\">"+Str_dgvp_sck_inf+"</font><br />\n";
		/*out+="<select onchange=\"SdgvP().Tsk["+idx+"].Sck=this.value;\" class=\"CssSelect\" >\n";
		out+=GenOptions(OptDgvPCmd,SdgvP().Tsk[idx].Sck);
		out+="</select>\n"// */
		out+="	</td>\n";
		switch(SdgvP().Tsk[idx].Sck)
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
				while(i<SdgvP().Tsk[idx].cmps.length)
				{
					tmp=LsCmps.indexOf(SdgvP().Tsk[idx].cmps[i]);
					if(tmp!=-1)
					{
						out+="<input type=\"button\" class=\"CssMinBtn\" value=\"[X]";
						out+=LsCmpsTxt[tmp];
						out+="\" onclick=\"SdgvP().Tsk["+idx+"].cmps.splice("+i+",1);ReDraw(-1);return false;\" /><br />\n";
						i++;
					}
					else
					{
						out+=SdgvP().Tsk[idx].cmps.splice(i,1);
						i=0;
					}
				}
				out+="	</td></tr>\n";
				out+="<tr>";
				out+="	<td colspan=\"2\" align=\"left\" valign=\"middle\">\n";
				out+="<br />["+Str_Add+":<select class=\"CssSelect\" onchange=\"if(this.selectedIndex>0){SdgvP().Tsk["+idx+"].cmps[SdgvP().Tsk["+idx+"].cmps.length]=LsCmps[this.selectedIndex-1];}ReDraw(-1);\" >\n";
				out+="<option></option>\n";
				out+=GenOptionsVi(LsCmpsTxt,null);
				out+="</select>]\n"
				out+="	</td>\n";
			}
			break;
		}
		out+="</tr>\n";//*/
		idx++;
	}
	//---------------------------------------------------------------------*/
	out+="</table>\n";
	out+="<hr />\n";
	if(obj)
	{
		if(obj.innerHTML != undefined)
		{
			obj.innerHTML = out;
			disabled_elements(obj,['text','button','select-one'],(SdgvP().link==0));
			return out;
		}
	}
	return out;
}

function ShwSutec(obj)
{
	iOPCT=OPCT();
	var out="<font size=\"3\" color=\"#0aa\" face=\"arial\">Protocolo compatible con equipos de Otro Fabricante</font><br />\n";
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Enable+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"checkbox\" onclick=\"(OPCT().link!=0?OPCT().link=0:OPCT().link=13);ReDraw(-1);\" "+((iOPCT.link!=0)?"checked=\"checked\"":"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Conf_Links+"("+iOPCT.link+")</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"20\" onchange=\"Links()["+iOPCT.Link+"][2]=this.value;ReDraw(-1);\"  value=\""+Links()[iOPCT.link][2]+"\"  />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_slave+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"OPCT().slave[0]=this.value;ReDraw(-1);\"  value=\""+iOPCT.slave[0]+"\"  />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Group+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"OPCT().group[0]=(this.value);ReDraw(-1);\" value=\""+iOPCT.group[0]+"\"  />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Time_to_Normal_Mode+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"OPCT().timeout=this.value;ReDraw(-1);\" value=\""+iOPCT.timeout+"\"  />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_offset_inputs+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"OPCT().inputs=this.value;ReDraw(-1);\" value=\""+iOPCT.inputs+"\"  />\n\
			</td>\n\
		</tr>\n";
	if(UsrLvl>2)
	{
	out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Debugger+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"25\" onchange=\"OPCT().debug=this.value;ReDraw(-1);\" value=\""+iOPCT.debug+"\" />\n\
			</td>\n\
		</tr>\n";
	}
	out+="</table>\n";
	out+="<hr />";
	if(obj)
	{
		if(obj.innerHTML != undefined)
		{
			obj.innerHTML = out;
			disabled_elements(obj,['text'],(iOPCT.link==0));
		}
		return out;
	}
	return out;
}// */

function ShwMaster(obj)
{
	if(Mstr().link==null)
		return "";
	var out="<font size=\"3\" color=\"#0aa\" face=\"arial\">"+Str_Mstr_title+"</font><br />\n";
	out+="\
	<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Enable+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"checkbox\" onclick=\"Mstr().link^=14;ReDraw(-1);\" "+((Mstr().link!=0)?"checked=\"checked\"":"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Type+"</font>\n\
			</td>\n\
			<td>\n";
			//out+="<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"Mstr().type=this.value;ReDraw(-1);\" value=\""+Mstr().type+"\"  />\n";
			out+="<select class=\"CssSelect\" onchange=\"Mstr().type=parseInt(this.value);ReDraw(-1);\" >\n";
			out+=GenOptions(OptMst,Mstr().type);
			out+="</select>\n";
			//out+="<font size=\"1\" face=\"arial\">0=Slave<br />1=Master<br />2=S/M<br />3=S/M+Plan<br />4=S+Plan<br />5=S+State<br />6=S+Plan+State<br />10=M+Plan<br />11=M+State<br />12=M+Plan+State</font> \n";
		out+="</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Conf_Links+"("+Mstr().link+")</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"20\" onchange=\"Links()["+Mstr().link+"][2]=this.value;ReDraw(-1);\"  value=\""+Links()[Mstr().link][2]+"\"  />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_ntp_Sync_tim+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"Mstr().time=(this.value);ReDraw(-1);\" value=\""+(Mstr().time)+"\"  />\n\
			</td>\n\
		</tr>\n";
	if(UsrLvl>2)
	{
	out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Debugger+" Mstr</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"25\" onchange=\"Mstr().debug=this.value;ReDraw(-1);\" value=\""+Mstr().debug+"\" />\n\
			</td>\n\
		</tr>\n";
	}
	out+="</table>\n";
	out+="<hr />";
	if(obj)
	{
		if(obj.innerHTML != undefined)
		{
			obj.innerHTML = out;
			disabled_elements(obj,['text','select-one'],(Mstr().link==0));
		}
		return out;
	}
	return out;
}

function ShwScoot()
{
	if(OTU()==null)
		return "";
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
