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
	<input onchange=\"GlobalParms().NETMASK[0]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().NETMASK[0]+"\" />\n\
	<input onchange=\"GlobalParms().NETMASK[1]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().NETMASK[1]+"\" />\n\
	<input onchange=\"GlobalParms().NETMASK[2]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().NETMASK[2]+"\" />\n\
	<input onchange=\"GlobalParms().NETMASK[3]=this.value\" type=\"text\" class=\"CssInText\" size=\"2\" maxlength=\"3\"  value=\""+GlobalParms().NETMASK[3]+"\" />\n\
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
	var out="<font size=\"3\" color=\"#0aa\" face=\"arial\">"+Str_GPS_title+"</font><br />\n";
	out+="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n";
	out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Enable+" GPS("+GPS().link+")</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"checkbox\" onclick=\"GPS().link^=9;ReDraw(-1);\" "+((GPS().link!=0)?"checked=\"checked\"":"")+" />\n\
			</td>\n\
		</tr>\n";
		if(Links()[GPS().link][2].indexOf(",")!=-1)
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
		if(GPS().priority)
		out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_gps_prio+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"GPS().priority=this.value;ReDraw(-1);\" value=\""+(GPS().priority)+"\" "+((GPS().priority==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n";
		if(GPS()["priority+"])
		out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_gps_priop+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"GPS()['priority+']=this.value;ReDraw(-1);\" value=\""+(GPS()['priority+'])+"\" "+((GPS()['priority+']==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n";
		if(GPS()["priority-"])
		out+="<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_gps_priol+"</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" title=\"holaaa\" class=\"CssInText\" size=\"4\" onchange=\"GPS()['priority-']=this.value;ReDraw(-1);\" value=\""+(GPS()['priority-'])+"\" "+((GPS()['priority-']==0)?'disabled="true"':"")+" />\n\
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
	if(NTP().link==null)
		return "";
	try
	{
		NTP().link=parseInt(NTP().link);
		NTP().time=parseInt(NTP().time);
		NTP().utz=NTP().utz;
		NTP().debug=parseInt(NTP().debug);
		NTP().priority=parseInt(NTP().priority);
	}
	catch(e)
	{
		alert("Error en los parametros de NTP"+e.message);
	}
	var out="<font size=\"3\" color=\"#0aa\" face=\"arial\">"+Str_NTP_title+"</font><br />\n";
	out+="\
	<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"1\" cellspacing=\"0\" bordercolor=\"Silver\">\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Enable+" NTP</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"checkbox\" onclick=\"NTP().link^=11;ReDraw(-1);\" "+((NTP().link!=0)?"checked=\"checked\"":"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Server+" NTP("+NTP().link+")</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"20\" onchange=\"Links()["+NTP().link+"][2]=this.value;ReDraw(-1);\"  value=\""+Links()[NTP().link][2]+"\" "+((NTP().link==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_ntp_Sync_tim+" NTP</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"NTP().time=(this.value*1000);ReDraw(-1);\" value=\""+(NTP().time/1000)+"\" "+((NTP().link==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_ntp_prio+" NTP</font>\n\
			</td>\n\
			<td>\n\
			<input type=\"text\" class=\"CssInText\" size=\"4\" onchange=\"NTP().priority=this.value;ReDraw(-1);\" value=\""+NTP().priority+"\" "+((NTP().link==0)?'disabled="true"':"")+" />\n\
			</td>\n\
		</tr>\n\
		<tr align=\"left\">\n\
			<td>\n\
			<font size=\"1\" face=\"arial\">"+Str_Time_Zone+" NTP</font>\n\
			</td>\n\
			<td>\n\
			<select class=\"CssSelect\" onchange=\"NTP().utz=parseInt(this.value);ReDraw(-1);\" "+((NTP().link==0)?'disabled="true"':"")+">\n";
			out+=GenOptions(OptTimeZone,NTP().utz);
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
			<input type=\"text\" class=\"CssInText\" size=\"25\" onchange=\"NTP().debug=this.value;ReDraw(-1);\" value=\""+NTP().debug+"\" />\n\
			</td>\n\
		</tr>\n";
	}
	out+="</table>\n";
	out+="<hr />";
	return out;
}
