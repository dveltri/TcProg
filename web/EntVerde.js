// ReDraw(conf_ev)
var CEV=0;
var phsel=-1;

function GetEv()
{	
	if(CEV==(PLCs[PlcIdx].EV.length+1))
	{
		SetPhConf(GlobalParms.phconf);
		PLCs[PlcIdx].EV[CEV-1]=genEv();
	}
	if(CEV>PLCs[PlcIdx].EV.length)
		CEV=0;
	if(CEV)
		SetPhConf(PLCs[PlcIdx].EV[CEV-1]);
	else
		SetPhConf(GlobalParms.phconf);
}

function SetEv()
{
	if(CEV)
		PLCs[PlcIdx].EV[CEV-1]=genEv();
	else
		GlobalParms.phconf=genPhc();
}

function KeyRct(restrict,evt)
{
	if(restrict.indexOf(evt.key)==-1)
		return false;
	else
		return true;
}

function UpdtEv(ph,typ,seq,evt)
{
	var ph=phsel;
	if(evt)
	{
		switch(evt.key)
		{
			case "Delete":
			case "Backspace":
			case "R":
			case "A":
			case "#":
			case "V":
			case "r":
			case "a":
			case "v":
			case "=":
			break;
			default:
				return false;
			break;
		}
	}
	seq=seq.split('');
	for (var j=0;j<seq.length;j++)
	{
		switch(seq[j])
		{
			case "R":
			case "A":
			case "#":
			case "V":
			case "r":
			case "a":
			case "v":
			case "=":
			break;
			default:
				seq.splice(j,1);
			break;
		}
	}
	if(typ==1)
	{
		PHASEs[ph].R2V.length=0;
		for (var j=0;j<seq.length;j++)
		{
			switch(seq[j])
			{
				case "R":
					PHASEs[ph].R2V[j]=1;
				break;
				case "A":
					PHASEs[ph].R2V[j]=2;
				break;
				case "#":
					PHASEs[ph].R2V[j]=3;
				break;
				case "V":
					PHASEs[ph].R2V[j]=4;
				break;
				case "r":
					PHASEs[ph].R2V[j]=17;
				break;
				case "a":
					PHASEs[ph].R2V[j]=18;
				break;
				case "v":
					PHASEs[ph].R2V[j]=20;
				break;
				case "=":
					PHASEs[ph].R2V[j]=22;
				break;
			}
		}
		document.getElementById("EvR2V").innerHTML=ShwEvR2V(ph);
		document.getElementById("EvR2VTxt").focus();
	}
	else
	{
		PHASEs[ph].V2R.length=0;
		for (var j=0;j<seq.length;j++)
		{
			switch(seq[j])
			{
				case "R":
					PHASEs[ph].V2R[j]=1;
				break;
				case "A":
					PHASEs[ph].V2R[j]=2;
				break;
				case "#":
					PHASEs[ph].V2R[j]=3;
				break;
				case "V":
					PHASEs[ph].V2R[j]=4;
				break;
				case "r":
					PHASEs[ph].V2R[j]=17;
				break;
				case "a":
					PHASEs[ph].V2R[j]=18;
				break;
				case "v":
					PHASEs[ph].V2R[j]=20;
				break;
				case "=":
					PHASEs[ph].V2R[j]=22;
				break;
			}
		}
		document.getElementById("EvV2R").innerHTML=ShwEvV2R(ph);
		document.getElementById("EvV2RTxt").focus();
		document.getElementById("HOME2").innerHTML=ShwEV();
	}
	//ReDraw(-1);
}

function ShwEvV2R(ph)
{
	var out="";
	out +="<table border=\"0\">\n";	// class=\"table1\"
	out +="	<tr>\n";
	for (var j=0; j<PHASEs[ph].V2R.length; j++)
	{
		if(j>0)
		{
			out +="<td  align=\"center\" valign=\"middle\" onclick=\"PHASEs["+ph+"].V2R["+j+"]=chgColor2(PHASEs["+ph+"].V2R["+j+"],MSKEV);ReDraw(-1);\" >\n";// class=\"table1\"
		}
		else
		{
			if((PHASEs[ph].V2R[j]&0x31)==1)PHASEs[ph].V2R[j]=2;
			out +="<td  align=\"center\" valign=\"middle\" onclick=\"PHASEs["+ph+"].V2R["+j+"]=chgColor2(PHASEs["+ph+"].V2R["+j+"],MSKEV1);ReDraw(-1);\" >\n";// class=\"table1\"
		}
		//out +=color2svg(PHASEs[ph].V2R[j],"");
		out+=ShwMov(PHASEs[ph].V2R[j]);	
		out +="</td>\n";
	}
	out +="	</tr>\n";				
	out +="</table>\n";
	out+="<font size=\"2\" face=\"arial\">["+PHASEs[ph].V2R.length+" seg]</font>\n"
	out+="<input type=\"text\" align=\"right\" id=\"EvV2RTxt\" class=\"CssInText\" style=\"letter-spacing:12px;text-align:right;\" value=\"";
	for (var j=0; j<PHASEs[ph].V2R.length; j++)
	{
		//[1,2,3,4,17,18,20,22];
		switch(PHASEs[ph].V2R[j])
		{
			case 1:
				out+="R";
			break;
			case 2:
				out+="A";
			break;
			case 3:
				out+="#";
			break;
			case 4:
				out+="V";
			break;
			case 17:
				out+="r";
			break;
			case 18:
				out+="a";
			break;
			case 20:
				out+="v";
			break;
			case 22:
				out+="=";
			break;
		}
	}
	out+="\" size=\""+((PHASEs[ph].V2R.length*2)+1)+"\" maxlength=\"35\" onkeypress=\"return KeyRct('RA#Vrav=',event);\" onkeyup=\"return UpdtEv("+ph+",0,this.value,event);ReDraw(-1);\" />\n";
	return out;
}

function ShwEvR2V(ph)
{
	var out="";
	out +="<table border=\"0\">\n";	// class=\"table1\"
	out +="	<tr>\n";
	for (var j=0; j<PHASEs[ph].R2V.length; j++)
	{
		out +="<td align=\"center\" valign=\"middle\" onclick=\"PHASEs["+ph+"].R2V["+j+"]=chgColor2(PHASEs["+ph+"].R2V["+j+"],MSKEVRV);ReDraw(-1);\" >\n"; // class=\"table1\"
		//out +=color2svg(PHASEs[ph].R2V[j],"")+"\n";
		out +=ShwMov(PHASEs[ph].R2V[j]);
		out +="</td>\n";
	}
	out +="	</tr>\n";
	out +="</table>\n";
	out+="<font size=\"2\" face=\"arial\">["+PHASEs[ph].R2V.length+" seg]</font>\n"
	out+="<input type=\"text\" align=\"right\" id=\"EvR2VTxt\" class=\"CssInText\" style=\"letter-spacing:12px;text-align:right;\" value=\"";
	for (var j=0; j<PHASEs[ph].R2V.length; j++)
	{
		switch(PHASEs[ph].R2V[j])
		{
			case 1:
				out+="R";
			break;
			case 2:
				out+="A";
			break;
			case 3:
				out+="#";
			break;
			case 4:
				out+="V";
			break;
			case 17:
				out+="r";
			break;
			case 18:
				out+="a";
			break;
			case 20:
				out+="v";
			break;
			case 22:
				out+="=";
			break;
		}
	}
	out+="\" size=\""+((PHASEs[ph].R2V.length*2)+1)+"\" maxlength=\"35\" onkeypress=\"return KeyRct('RA#Vrav=',event);\" onkeyup=\"return UpdtEv("+ph+",1,this.value,event);ReDraw(-1);\" />\n";
	return out;
}

function ShwEV()
{
	var out="";
	out +="<table border=\"0\">\n";
	for(var ph=0;ph<PHASEs.length;ph++)
	{
		if(PHASEs[ph].PLC&(1<<PlcIdx))
		{
			out +="<tr>\n";
			out +="<td align=\"center\" valign=\"middle\" >";
			out+="<input onclick=\"phsel="+ph+";ReDraw(-1);\" value=\""+PHASEs[ph].Name+"\" type=\"button\" class=\"CssBtn\" />\n";
			out+="</td>\n";
			out +="<td align=\"center\" valign=\"middle\" bgcolor=\"#666\" >\n";
			for (var j=0; j<PHASEs[ph].R2V.length; j++)
				out +=color2svg(PHASEs[ph].R2V[j],"");
				//out +=ShwMov(PHASEs[ph].R2V[j]);
			out +="<br />\n";
			for (var j=0; j<PHASEs[ph].V2R.length; j++)
				out +=color2svg(PHASEs[ph].V2R[j],"");
				//out +=ShwMov(PHASEs[ph].V2R[j]);
			out +="</td>\n";
			out +="</tr>\n";
		}
	}
	out +="</table>\n";
	return out;
}

function ShwEntreVerdes()
{	
	var out = "";
	var index = PlcIdx;
	SetEv();
	var ph=-1; // width=\"30%\"
	out+="<table border=\"0\" bgcolor=\"LightGrey\" class=\"table1\" align=\"center\" cellpadding=\"10\" cellspacing=\"10\" bordercolor=\"Silver\" >\n";
	out+="<tr bgcolor=\"#ddd\">\n";
	out+="<td align=\"center\" colspan=\"3\" >\n";
	out+="<font size=\"2\" face=\"arial\">"+Str_Phase+": </font>"
	out+="<select class=\"CssSelect\" onchange=\"phsel=this.value;ReDraw(-1);\">\n";
	out+="<option value=\"-1\"></option>\n";
	for(ph=0;ph<PHASEs.length;ph++)
	{
		if(PHASEs[ph].PLC&1)
		{
			out+="<option value=\""+ph+"\"";
			if(phsel==ph)out+=" selected=\"selected\"";
			out+=">"+PHASEs[ph].Name+"</option>\n";
		}
	}
	ph=phsel;
	out+="</select>\n";
	out+="</td>\n";
	out+="</tr>\n";
	if(ph>=0)
	{
		out +="<tr bgcolor=\"#ccc\">\n";
		out +="<td align=\"center\" colspan=\"3\" >\n";
		out +="<select class=\"CssSelect\" onchange=\"if(this.value!=0){PHASEs["+ph+"].V2R=V2RTyp[this.value-1].slice();PHASEs["+ph+"].R2V=R2VTyp[this.value-1].slice();ReDraw(-1);}\">\n";
		out +=GenOptions(OptPhTypEv,0);
		out +="</select>\n";
		out +="</td>\n";
		out +="</tr>\n";
		out +="	<tr bgcolor=\"#ccc\">\n";
		out +="		<td align=\"center\">\n";
		out	+="		<font size=\"2\" face=\"arial\">"+Str_Start+"</font>"
		out +="		</td>\n";
		out +="		<td align=\"center\">\n";
		out	+="		<font size=\"2\" face=\"arial\">"+Str_Stage_EV+"</font>"
		out +="		</td>\n";
		out +="		<td align=\"center\">\n";
		out	+="		<font size=\"2\" face=\"arial\">"+Str_End+"</font>"
		out +="		</td>\n";
		out +="	</tr>\n";
		//--------------------------------------------
		out+="	<tr bgcolor=\"#ddd\" border=\"1\">\n";
		out+="		<td align=\"middle\">\n";
		out+=		ShwMov(1)+"<br/>\n";
		//out+=		color2svg(1,"")+"<br/>\n";
		out+="		<b><font size=\"2\" face=\"arial\" color=\"#880000\" >"+Str_Red+"</font></b>"
		out+="		</td>\n";
		//-----------------------------------------
		out+="		<td align=\"right\" id=\"EvR2V\">\n";	
		out+=ShwEvR2V(ph);
		out +="		</td>\n";
		//-----------------------------------------
		out +="		<td align=\"middle\">\n";
		out+=		ShwMov(4)+"<br/>\n";
		//out+=		color2svg(4,"")+"<br/>\n";
		out+="		<b><font size=\"2\" face=\"arial\" color=\"#008800\" >"+Str_Green+"</font></b>"
		out +="		</td>\n";
		out +="	</tr>\n";
		//--------------------------------------------
		out	+="	<tr bgcolor=\"#ccc\">\n";
		out+="		<td align=\"middle\">\n";
		out+=		ShwMov(4)+"<br/>\n";
		//out+=		color2svg(4,"")+"<br/>\n";
		out+="		<b><font size=\"2\" face=\"arial\" color=\"#008800\" >"+Str_Green+"</font></b>"
		out +="		</td>\n";
		//-----------------------------------------
		out +="		<td align=\"right\" id=\"EvV2R\">\n";
		out+=ShwEvV2R(ph);
		out+="<font size=\"1\" face=\"arial\" color=\"#00F\" >";
		out+="<br/>"+SpeedTypePhase[PHASEs[ph].Type][1]+"->"+Math.round(SpeedTypePhase[PHASEs[ph].Type][0]*PHASEs[ph].V2R.length)/100+"m";
		out+="<br/>"+SpeedTypePhase[PHASEs[ph].Type][4]+"->"+Math.round(SpeedTypePhase[PHASEs[ph].Type][3]*PHASEs[ph].V2R.length)/100+"m";
		out+="<br/>"+SpeedTypePhase[PHASEs[ph].Type][7]+"->"+Math.round(SpeedTypePhase[PHASEs[ph].Type][6]*PHASEs[ph].V2R.length)/100+"m";
		out+="</font>";
		out+="		</td>\n";
		//-----------------------------------------
		out+="		<td align=\"middle\">\n";
		out+=		ShwMov(1)+"<br/>\n";
		//out+=		color2svg(1,"")+"<br/>\n";
		out+="		<b><font size=\"2\" face=\"arial\" color=\"#880000\" >"+Str_Red+"</font></b>"
		out+="		</td>\n";
		out+="	</tr>\n";
	}
	out +="</table>\n";
	return out;	
}
