var HolyDays= new Array();
var RangeDays= new Array();
var WeekDays= new Array();
var TimeScheduler= new Array();

var DaysIdx=0;
var RangeIdx=0;
var WeekIdx=0;
var TimeIdx=0;

var cEEEEEE=15658734;
var Ceeeeee=1118481;
var cCCCCCC=13421772;	
var Ccccccc=2236962;

var SchSts=SchTyp[0];
var vTimDiv=[1,5,10,15,30,60];
var TimDiv=15;
var dim=[31,29,31,30,31,30,31,31,30,31,30,31];

function GoSch()
{
	HolyDays=owl.deepCopy(PLCs[PlcIdx].HolyDays);
	WeekDays=owl.deepCopy(PLCs[PlcIdx].WeekDays);
	TimeScheduler=owl.deepCopy(PLCs[PlcIdx].TimeScheduler);
	ReDraw(conf_sch);
}

function IniAgenda()
{
	SchSts="Mostrar Agenda";
	TimeIdx=0;
}

function ShowAgenda()
{
	var NowT=new Date();
	var vlast="";
	var out="";
	var Color=0;
	var temp="";
	var H="";
	var M="";
	//----------------------------------------------------------------------------------------------------------------------------
	out+="<table border=\"5\" align=\"center\" cellpadding=\"5\" cellspacing=\"5\"  width=\"100%\" bordercolor=\"LightGrey\" bgcolor=\"LightGrey\">\n";
	out+="<tr>\n";
	out+="<td align=\"center\" valign=\"top\" >\n";
		//-------------------------------
		out+=ShwCtrl();
		//-------------------------------
	out+="</td>\n";
	out+="</tr>\n";
	//----------------------------------------------------------------------------------------------------------------------------
	out+="<tr>\n";
	out+="<td align=\"center\"  valign=\"top\">\n";
	//-------------------------------
	switch(SchSts)
	{
		case SchTyp[0]:
			out+=ShwDS();
		break;
		case SchTyp[1]:
			out+=ShwHD();
		break;
		case SchTyp[2]:
			out+=ShwRD();
		break;
		case SchTyp[3]:
			out+=ShwDW();
		break;
		case SchTyp[4]:
			out+=ShwTS();
		break;
	}
	//-------------------------------
	out+="</td>\n";
	out+="</tr>\n";
	//----------------------------------------------------------------------------------------------------------------------------
	out+="</table>\n";
	return out; // */
}

function ShwCtrl()
{
	var out="";
	for(var i=0;i<SchTyp.length;i++)
	{
		out+="<input type=\"button\" class=\"CssBtn\" value=\""+SchTyp[i]+"\" 	onclick=\"SchSts=SchTyp["+i+"];ReDraw(-1);\" ";
		out+="style=\"background-color:rgb("+getColor(i,10)+")\" "
		out+="/>\n";
	}
	out+="<br/>\n";
	return out;
}

function ShwDS()
{
	var out="";
	var tmp="";
	var TS=0;
	var D=0;
	var L="";
	var M=0;
	var Color="";
	out+="<table border=\"2\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" bordercolor=\"#FFFFFF\" bgcolor=\"#FFFFFF\" >\n";	//  class=\"table2\"
	out+="<tr>\n";
	out+="<td rowspan=\"2\" colspan=\"2\" align=\"center\" valign=\"middle\" height=\"10\" width=\"10\" bordercolor=\"LightGrey\" bgcolor=\"LightGrey\" >\n";
	out+="</td>\n";
	out+="<td colspan=\"31\" align=\"center\" valign=\"middle\" height=\"10\" width=\"10\" bordercolor=\"LightGrey\" bgcolor=\"LightGrey\" >\n";
	out+="<font size=\"1\" face=\"arial\">"+Str_Date+"</font>\n";
	out+="</td>\n";
	out+="</tr>\n";
	out+="<tr>\n";
	for(D=1;D<=31;D++)
	{
		out+="<td align=\"center\" valign=\"middle\" width=\"10\" >\n";	// height=\"10\"
		out+="<font size=\"1\" face=\"arial\">"+D+"</font>\n";
		out+="</td>\n";
	}
	out+="</tr>\n";
	for(M=1;M<=12;M++)
	{
		L="";
		out+="<tr>\n";
		if(M==1)
		{
			out+="<td rowspan=\"12\" align=\"center\" valign=\"middle\" bordercolor=\"LightGrey\" bgcolor=\"LightGrey\" >\n";
			out+="<font style=\"writing-mode:vertical-rl;\" size=\"1\" face=\"arial\">"+Str_Month+"</font>\n";
			out+="</td>\n";
		}
		out+="<td align=\"center\" valign=\"middle\" height=\"10\" >\n";	// width=\"10\"
		out+="<font size=\"1\" face=\"arial\">"+VStr_Month[M-1]+"</font>\n";
		out+="</td>\n";
		for(D=1;D<=dim[M-1];D++)
		{
			out+="<td class=\"table2\" align=\"center\" valign=\"middle\" height=\"10\" width=\"10\" ";
			if(D>=10)
				tmp=""+D+"/";
			else
				tmp="0"+D+"/";
			if(M>=10)
				tmp+=""+M+"/";
			else
				tmp+="0"+M+"/";
				out+="title=\""+tmp+"YYYY\" ";
			L=GetDaysTS(D,M)
			Color="";
			if(L=="D")
			{
				out+="onclick=\"SchSts=SchTyp[1];ReDraw(-1);\" ";
				Color=getColor(1,10);
			}
			if(L=="R")
			{
				out+="onclick=\"SchSts=SchTyp[2];ReDraw(-1);\" ";
				Color=getColor(2,10);
			}
			if(L=="")
			{
				out+="onclick=\"SchSts=SchTyp[3];ReDraw(-1);\" ";
				Color=getColor(3,10);
			}
			out+="style=\"background-color:rgb("+Color+")\" ";
			out+=">\n";
			out+="<font size=\"1\" face=\"arial\">";
			if(L!="")
				out+=L;
			else
				out+="S";
			out+="</font>\n";
			out+="</td>\n";
		}
		while(D<=31)
		{
			out+="<td align=\"center\" valign=\"middle\" height=\"10\" width=\"10\" bordercolor=\"LightGrey\" bgcolor=\"LightGrey\" >\n";
			out+="</td>\n";
			D++;
		}
		out+="</tr>\n";
	}
	out+="</table>\n";
	return out;
}

//--------------------------------------------------------------------------------
function ShwHD()
{
	var out="";
	out+="<table border=\"2\" align=\"center\" cellpadding=\"4\" cellspacing=\"4\" bordercolor=\"LightGrey\" bgcolor=\"#eee\" >\n";
	out+="<tr>\n";
		out+="<td  align=\"center\">\n";
		out+="<font size=\"1\" face=\"arial\">"+Str_Date+"</font>\n";
		out+="</td>\n";
		out+="<td  align=\"center\">\n";
		out+="<font size=\"1\" face=\"arial\">"+Str_Time_Table+"</font>\n";
		out+="</td>\n";
		out+="<td  align=\"center\">\n";
		out+="<input type=\"button\" ";
		out+="onclick=\"var slp=buildCal(1,'YYYY','BCmain','BCmonth','BCdaysofweek','BCdays',1,'SchAddItemH');showFlyMnu(event,{idx:10000,HTML:slp,TimeOut:0});\" ";
		out+="value=\""+Str_Add+"\" class=\"CssBtn\" />\n";
		out+="</td>\n";
	out+="</tr>\n";
	for(var i=0;i<HolyDays.length;i++)
	{
		out+="<tr>\n";
		out+="<td class=\"table2\" align=\"center\">\n";
		out+="<font size=\"1\" face=\"arial\">"+HolyDays[i].Date+"</font>\n";
		out+="</td>\n";
		out+="<td class=\"table2\" ";
		out+="style=\"background-color:rgb("+getColor((HolyDays[i].TimeScheduler+1),30)+")\" ";
		out+="onclick=\"var slp=SetHTs("+i+");showFlyMnu(event,{idx:10000,HTML:slp,TimeOut:0});\" ";
		out+="align=\"center\">\n";
		out+="<font size=\"1\" face=\"arial\">"+TimeScheduler[HolyDays[i].TimeScheduler].Nombre+"</font>\n";
		out+="</td>\n";
		out+="<td  align=\"center\">\n";
		out+="<input type=\"button\" ";
		out+="onclick=\"SchDelItemH("+i+");ReDraw(-1);\" ";
		out+="value=\""+Str_Delet+"\" class=\"CssBtn\" />\n";
		out+="</td>\n";
		out+="</tr>\n";
	}
	out+="</table>\n";
	return out;
}

function ShwRD()
{
	var out="";
	out+="<table border=\"2\" align=\"center\" cellpadding=\"4\" cellspacing=\"4\" bordercolor=\"LightGrey\" bgcolor=\"#eee\" >\n";
	out+="<tr>\n";
		out+="<td  align=\"center\">\n";
		out+="<font size=\"1\" face=\"arial\">"+Str_DateRange+"</font>\n";
		out+="</td>\n";
		out+="<td  align=\"center\">\n";
		out+="<font size=\"1\" face=\"arial\">"+Str_Time_Table+"</font>\n";
		out+="</td>\n";
		out+="<td  align=\"center\">\n";
		out+="<input type=\"button\" ";
		out+="onclick=\"SchAddItemR();\" ";
		out+="value=\""+Str_Add+"\" class=\"CssBtn\" />\n";
		out+="</td>\n";
	out+="</tr>\n";
	for(var i=0;i<RangeDays.length;i++)
	{
		out+="<tr>\n";
		out+="<td class=\"table2\" align=\"center\">\n";
		out+="<font size=\"1\" face=\"arial\">";
		out+="<a href=\"\" onclick=\"RangeIdx="+i+";var slp=buildCal(1,'YYYY','BCmain','BCmonth','BCdaysofweek','BCdays',1,'SchItemRd1');showFlyMnu(event,{idx:10000,HTML:slp,TimeOut:0});return false;\" ";
		out+=">\n";
		out+=RangeDays[i].Date1;
		out+="</a>";
		out+=" &#60;-&#62; ";
		out+="<a href=\"\" onclick=\"RangeIdx="+i+";var slp=buildCal(1,'YYYY','BCmain','BCmonth','BCdaysofweek','BCdays',1,'SchItemRd2');showFlyMnu(event,{idx:10000,HTML:slp,TimeOut:0});return false;\" ";
		out+=">\n";
		out+=RangeDays[i].Date2;
		out+="</a>";
		out+="</font>\n";
		out+="</td>\n";
		out+="<td class=\"table2\" ";
		out+="style=\"background-color:rgb("+getColor((RangeDays[i].TimeScheduler+1),30)+")\" ";
		out+="onclick=\"RangeIdx="+i+";var slp=SetRTs("+i+");showFlyMnu(event,{idx:10000,HTML:slp,TimeOut:0});\" ";
		out+="align=\"center\">\n";
		out+="<font size=\"1\" face=\"arial\">"+TimeScheduler[RangeDays[i].TimeScheduler].Nombre+"</font>\n";
		out+="</td>\n";
		out+="<td  align=\"center\">\n";
		out+="<input type=\"button\" ";
		out+="onclick=\"SchDelItemR("+i+");ReDraw(-1);\" ";
		out+="value=\""+Str_Delet+"\" class=\"CssBtn\" />\n";
		out+="</td>\n";
		out+="</tr>\n";
	}
	out+="</table>\n";
	return out;
}

function ShwDW()
{
	var out="";
	out+="<table border=\"2\" align=\"center\" cellpadding=\"4\" cellspacing=\"4\" bordercolor=\"LightGrey\" bgcolor=\"#eee\" >\n";
	out+="<tr>\n";
		out+="<td  align=\"center\">\n";
		out+="<input type=\"button\" ";
		out+="onclick=\"var slp=buildCal(1,'YYYY','BCmain','BCmonth','BCdaysofweek','BCdays',1,'SchAddItemW');showFlyMnu(event,{idx:10000,HTML:slp,TimeOut:0});\" ";
		out+="value=\""+Str_Add+"\" class=\"CssBtn\" />\n";
		out+="</td>\n";
		for(var i=0;i<Str_DaysName.length;i++)
		{
			out+="<td  align=\"center\">\n";
			out+="<font size=\"1\" face=\"arial\">"+Str_DaysName[i]+"</font>\n";
			out+="</td>\n";
		}
		out+="<td  align=\"center\">\n";
		out+="</td>\n";
	out+="</tr>\n";
	for(var i=0;i<WeekDays.length;i++)
	{
		out+="<tr>\n";
			out+="<td class=\"table2\" align=\"center\">\n";
			out+="<font size=\"1\" face=\"arial\">"+WeekDays[i].Date+"</font>\n";
			out+="</td>\n";
			for(var j=0;j<7;j++)
			{
				out+="<td class=\"table2\" ";
				out+="style=\"background-color:rgb("+getColor((WeekDays[i].TimeScheduler[j]+1),30)+")\" ";
				out+="onclick=\"var slp=SetWTs("+i+","+j+");showFlyMnu(event,{idx:10000,HTML:slp,TimeOut:0});\" ";
				out+="align=\"center\">\n";
				out+="<font size=\"1\" face=\"arial\">"+TimeScheduler[WeekDays[i].TimeScheduler[j]].Nombre+"</font>\n";
				out+="</td>\n";
			}
			out+="<td  align=\"center\">\n";
			if(WeekDays.length>1)
			{
				out+="<input type=\"button\" ";
				out+="onclick=\"SchDelItemW("+i+");ReDraw(-1);\" ";
				out+="value=\""+Str_Delet+"\" class=\"CssBtn\" />\n";
			}
			out+="</td>\n";
		out+="</tr>\n";
	}
	out+="</table>\n";
	return out;
}

function ShwTS()
{
	var out="";
	var temp="";
	var H="";
	var M="";
	var Plan=0;
	out+="<table border=\"1\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" bordercolor=\"#FfFfFf\" bgcolor=\"#FFFFFF\" >\n";
	out+="<tr>\n";
	out+="<td colspan=\"3\" align=\"center\" valign=\"middle\" >\n";
	out+="<select onchange=\"if(this.value==-1){SchAddItemT();}else{TimeIdx=parseInt(this.value);}ReDraw(-1);\" class=\"CssSelect\" ";
	out+="style=\"background-color:rgb("+getColor((TimeIdx+1),30)+")\" ";
	out+=">\n";
	for(var j=0;j<TimeScheduler.length;j++)
	{
		out+="<option ";
		out+="style=\"background-color:rgb("+getColor((j+1),30)+")\" ";
		out+="value=\""+j+"\" ";
		if(j==TimeIdx)
			out+=" selected=\"selected\"";
		out+=">"+TimeScheduler[j].Nombre+"</option>\n";
	}
	out+="<option style=\"background-color:rgb(238,238,238)\" value=\"-1\">"+Str_New+"</option>\n";
	out+="</select>\n";  // */
	out+="</td>\n";
	out+="<td colspan=\"20\" align=\"center\" valign=\"middle\" height=\"10\" bgcolor=\"#eee\" >\n";
	out+="<input type=\"text\" align=\"right\" class=\"CssInText\" value=\""+TimeScheduler[TimeIdx].Nombre+"\" size=\"11\" maxlength=\"11\" ";
	out+="onchange=\"if(this.value!=''){TimeScheduler["+TimeIdx+"].Nombre=this.value;}else{this.value=TimeScheduler["+TimeIdx+"].Nombre;}ReDraw(-1);\" ";
	out+="style=\"background-color:rgb("+getColor((TimeIdx+1),30)+")\" />\n";
	out+="</td>\n";
	out+="<td colspan=\"3\" align=\"center\" valign=\"middle\" height=\"10\" bgcolor=\"#eee\" >\n";
	if(TimeScheduler.length>1)
	{
		out+="<input type=\"button\" ";
		out+="onclick=\"SchDelItemT("+TimeIdx+");ReDraw(-1);\" ";
		out+="value=\""+Str_Delet+"\" class=\"CssBtn\" />\n";
	}
	out+="</td>\n";
	out+="</tr>\n";
	//----------------------------------------
	out+="<tr>\n";
	out+="<td rowspan=\"2\" colspan=\"2\" align=\"center\" valign=\"top\" height=\"10\" width=\"10\" bgcolor=\"#fff\" >\n";
	out+="<font size=\"1\" face=\"arial\">"+Str_Steps+"</font><br/>\n";
	out+="<select onchange=\"TimDiv=parseInt(this.value);ReDraw(-1);\" class=\"CssSelect\" >\n";
	out+=GenOption1(vTimDiv,TimDiv);
	out+="</select>\n";
	out+="</td>\n";
	out+="<td colspan=\"24\" align=\"center\" valign=\"middle\" height=\"10\" bgcolor=\"#eee\" >\n";
	out+="<font size=\"3\" face=\"arial\">"+Str_Hours+"</font>\n";
	out+="</td>\n";
	out+="</tr>\n";
	//----------------------------------------
	out+="<tr>\n";
	for(var i=0;i<24;i++)
	{
		out+="<td align=\"center\" valign=\"middle\" height=\"10\" width=\"10\" >\n";
		H=""+i;
		if(H.length==1)H="0"+H;
		out+="<font size=\"1\" face=\"arial\">"+H+":</font>\n";
		out+="</td>\n";
	}
	out+="</tr>\n";
	for(var j=0;j<60;j+=TimDiv)
	{
		out+="<tr>\n";
		if(j==0)
		{
			out+="<td rowspan=\""+(60/TimDiv)+"\" align=\"center\" valign=\"middle\" bgcolor=\"#eee\" >\n";
			out+="<font style=\"writing-mode:vertical-rl;\" size=\"3\" face=\"arial\">"+Str_Minutes+"</font>\n";
			out+="</td>\n";
		}
		out+="<td align=\"center\" valign=\"middle\" height=\"10\" width=\"10\" >\n";
		M=""+j;
		if(M.length==1)M="0"+M;
		out+="<font size=\"1\" face=\"arial\">"+M+"</font>\n";
		out+="</td>\n";
		for(var i=0;i<24;i++)
		{
			H=""+i;
			if(H.length==1)H="0"+H;
			out+="<td class=\"table2\" align=\"center\" valign=\"middle\" height=\"10\" width=\"10\" ";
			Plan=parseInt(GetPlan(H+":"+M+":00"));
			out+="onclick=\"var slp=ShwSetPlan('"+H+":"+M+"',"+Plan+");showFlyMnu(event,{idx:10000,HTML:slp,TimeOut:0});\" ";
			if(Plan==-1)
			{
				var Color=3003;
				out+=(((i&1)^(j&1))?"bgcolor=\"#"+(Color+819).toString(16)+"\" ":"bgcolor=\"#"+Color.toString(16)+"\" ");
			}
			else
			{
				if(Plan==97)
				{
						out+="style=\"background-color:rgb(128,128,128)\" ";
						Plan="A";
				}
				else
				{
					if(Plan==99)
					{
						out+="style=\"background-color:rgb(255,255,128)\" ";
						Plan="T";
					}
					else
					{
						out+="style=\"background-color:rgb("+getColor((Plan+1),100)+")\" ";
					}
				}
			}
			out+="title=\"["+H+":"+M+"]";
			if(Plan!=-1)out+="="+Plan;
			out+="\" >\n";
			out+="<font size=\"1\" face=\"arial\">"+Plan+"</font>\n";
			out+="</td>\n";
		}
		out+="</tr>\n";
	}
	out+="</table>\n";
	//----------------------------
	return out;
}

//--------------------------------------------------------------------------------
function SetHTs(H)
{
	var out="";
	out+="<table border=\"2\" align=\"center\" cellpadding=\"4\" cellspacing=\"4\" bordercolor=\"LightGrey\" bgcolor=\"#eee\" >\n";
	for(var i=0;i<TimeScheduler.length;i++)
	{
		out+="<tr onclick=\"HolyDays["+H+"].TimeScheduler="+i+";ReDraw(-1);\" >\n";
		out+="<td class=\"table2\" align=\"center\" valign=\"middle\" height=\"20\" ";
		out+="style=\"background-color:rgb("+getColor((i+1),30)+")\" >\n";
		out+="<font size=\"1\" face=\"arial\">"+TimeScheduler[i].Nombre+"</font>\n";
		out+="<font size=\"1\" face=\"arial\">";
		out+=TimeScheduler[i].Hs.length+" "+Str_Changes;
		out+="</font>\n";
		out+="</td>\n";
		out+="</tr>\n";
	}
	out+="</table>\n";
	return out;
}

function SetRTs(R)
{
	var out="";
	out+="<table border=\"2\" align=\"center\" cellpadding=\"4\" cellspacing=\"4\" bordercolor=\"LightGrey\" bgcolor=\"#eee\" >\n";
	for(var i=0;i<TimeScheduler.length;i++)
	{
		out+="<tr onclick=\"RangeDays["+R+"].TimeScheduler="+i+";ReDraw(-1);\" >\n";
		out+="<td class=\"table2\" align=\"center\" valign=\"middle\" height=\"20\" ";
		out+="style=\"background-color:rgb("+getColor((i+1),30)+")\" >\n";
		out+="<font size=\"1\" face=\"arial\">"+TimeScheduler[i].Nombre+"</font>\n";
		out+="<font size=\"1\" face=\"arial\">";
		out+=TimeScheduler[i].Hs.length+" "+Str_Changes;
		out+="</font>\n";
		out+="</td>\n";
		out+="</tr>\n";
	}
	out+="</table>\n";
	return out;
}

function getColor(i,div)
{
	var out="";
	var Color=0x80;
	var cColor=0;
	var b=0;
	var g=0;
	var r=0;
	var val=0;
	//-------------------
	/*div*=100;
	i*=100;
	var divp=Math.round(div/3);
	cColor=0xFF-Color;
	cColor=cColor/divp;
	Color=Math.floor(Color+cColor);
	b = i;
	b = (b%(divp+1));
	b = Math.floor(cColor*b);
	g = (i/divp);
	g = (g%(divp+1));
	g = Math.floor(cColor*g);
	r = (i/(divp*divp));
	r = (r%(divp+1));
	r = Math.floor(cColor*r);
	out=(Color+r)+","+(Color+g)+","+(Color+b); // */
	/*Color=0x808080;
	cColor=0xFFFFFF-Color;
	val = Math.round( (cColor/div)*i );
	val+=Color;
	r = Math.floor( val / ( 256 * 256 ) );
	g = Math.floor( val / 256 ) % 256;
	b = Math.floor( val % 256 );
	out=(r&255)+","+(g&255)+","+(b&255); // */
	Color=0xC0C0C0;
	cColor=0xFFFFFF-Color;
	cColor=(cColor/div);
	Color+=Math.round(cColor*i);
	out=((Color>>16)&255)+","+((Color>>8)&255)+","+(Color&255); // */
	return out;
}

function SetWTs(wk,ts)
{
	var out="";
	out+="<table border=\"2\" align=\"center\" cellpadding=\"4\" cellspacing=\"4\" bordercolor=\"LightGrey\" bgcolor=\"#eee\" >\n";
	for(var i=0;i<TimeScheduler.length;i++)
	{
		out+="<tr onclick=\"WeekDays["+wk+"].TimeScheduler["+ts+"]="+i+";ReDraw(-1);\" >\n";
		out+="<td class=\"table2\" align=\"center\" valign=\"middle\" height=\"20\" ";
		out+="style=\"background-color:rgb("+getColor((i+1),30)+")\" >\n";
		out+="<font size=\"1\" face=\"arial\">"+TimeScheduler[i].Nombre+"</font>\n";
		out+="<font size=\"1\" face=\"arial\">";
		out+=TimeScheduler[i].Hs.length+" "+Str_Changes;
		out+="</font>\n";
		out+="</td>\n";
		out+="</tr>\n";
	}
	out+="</table>\n";
	return out;
}// */

function ShwSetPlan(Hora,Plan)
{
	var out="";
	out+="<b><font size=\"2\" face=\"arial\">["+Hora+"]</font></b>\n";
	out+="<table border=\"2\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" >\n";
	out+="<tr>\n";
	out+="<td align=\"center\" valign=\"middle\" ";
	out+="onclick=\"TSAddItm('"+Hora+":00',97);hideFlyMnu(10000);ReDraw(-1);\" ";
	out+="style=\"background-color:rgb(0,0,0)\" >\n";
	out+="<b><font size=\"2\" color=\"#FFF\" face=\"arial\">Apagado</font></b>\n";
	out+="</td>\n";
	out+="</tr>\n";
	out+="<tr>\n";
	out+="<td align=\"center\" valign=\"middle\" ";
	out+="onclick=\"TSAddItm('"+Hora+":00',99);hideFlyMnu(10000);ReDraw(-1);\" ";
	out+="style=\"background-color:rgb(255,255,128)\" >\n";
	out+="<b><font size=\"2\" face=\"arial\">Titilante</font></b>\n";
	out+="</td>\n";
	out+="</tr>\n";
	for (var j=0;j<PLCs[PlcIdx].Plans.length;j++)
	{
		out+="<tr>\n";
		out+="<td align=\"center\" valign=\"middle\" ";
		if(Plan==j)
			out+="bordercolor=\"#FF8080\" ";
		out+="onclick=\"TSAddItm('"+Hora+":00',"+(j+1)+");hideFlyMnu(10000);ReDraw(-1);\" ";
		out+="style=\"background-color:rgb("+getColor((j+1),100)+")\" >\n";
		out+="<b><font size=\"2\" face=\"arial\">Plan["+(j+1)+"](";
		if(PLCs[PlcIdx].Plans[j].Typ==1)
			out+="Sincronico";
		else
			out+="Asincronico";
		out+=" Ciclo:"+PLCs[PlcIdx].Plans[j].TC;
		if(PLCs[PlcIdx].Plans[j].Typ==1)
			out+=" Offset:"+PLCs[PlcIdx].Plans[PlnIdx].OF;
		out+=")</font></b>\n";
		out+="</td>\n";
		out+="</tr>\n";
	}
	out+="</table>\n";
	out+="<input type=\"button\" onclick=\"hideFlyMnu("+FlyMnu.idx+");\" value=\"Close\"	class=\"CssBtn\" />\n";
	//alert(out);
	return out;
}

function GetPlan(time)
{
	var Plan=-1;
	TimeScheduler[TimeIdx].Hs=TimeScheduler[TimeIdx].Hs.sort(sortfuncTime);
	for(var h=0;h<TimeScheduler[TimeIdx].Hs.length;h++)
	{
		if(time>=TimeScheduler[TimeIdx].Hs[h].Time)
			Plan=TimeScheduler[TimeIdx].Hs[h].Plan;
		else
			return Plan;
	}	
	return Plan;
}

function GetDaysTS(D,M)
{
	var TS="";
	if(D<10)D="0"+D;
	if(M<10)M="0"+M;
	var fecha=D+"/"+M+"/YYYY";
	HolyDays=HolyDays.sort(sortfuncDate);
	for(var h=0;h<HolyDays.length;h++)
	{
		if(fecha==HolyDays[h].Date)
			return "D";
	}	
	RangeDays=RangeDays.sort(sortfuncDate2);
	for(var r=0;r<RangeDays.length;r++)
	{
		if(CompDate(fecha,RangeDays[r].Date1) && CompDate(RangeDays[r].Date2,fecha)) //if(fecha>=RangeDays[r].Date1 && fecha<=RangeDays[r].Date2)
			return "R";
	}	
	return "";
}

function StartNewScheduler()
{
	var out="";
	UpFile='/ag.sch';
	UpType='txt';
	ProcessAgenda(out);
}

function RcvAgenda(Datos)
{
	Datos=Datos.responseText;
	ProcessAgenda(Datos);
}

function ProcessAgenda(Datos)
{
	Datos=Datos.split("\n");
	var idxHD=0;
	var idxWD=0;
	var idxTS=0;
	var idx=0;
	HolyDays.length=0;
	RangeDays.length=0;
	WeekDays.length=0;
	TimeScheduler.length=0;
	for(var i=0;i<Datos.length;i++)
	{
		Datos[i]=RemoveUnuseChar(Datos[i]);
		//----------------------------------
		if(idxHD && Datos[i].length)
		{
			idx=HolyDays.length;
			HolyDays[idx]=new Object();
			HolyDays[idx].Date=Datos[i].split(" = ")[0];
			HolyDays[idx].TimeScheduler=parseInt(Datos[i].split(" = ")[1]);
		}
		else
		{
			idxHD=0;
		}
		//- - - - - - - - - - - - - - - - - 
		if(idxWD && Datos[i].length)
		{
			idx=WeekDays.length;
			WeekDays[idx]=new Object();
			WeekDays[idx].Date=Datos[i].split(" ")[0];
			WeekDays[idx].TimeScheduler=Datos[i].split(" ");
			WeekDays[idx].TimeScheduler.splice(0,1);
			for(var j=0;j<WeekDays[idx].TimeScheduler.length;j++)
				WeekDays[idx].TimeScheduler[j]=GetTimeIdx(WeekDays[idx].TimeScheduler[j]);
		}
		else
		{
			idxWD=0;
		}
		//-----------------------------------
		if(Datos[i].indexOf("[Holidays & Dates]")!=-1)
		{
			HolyDays.length=0;
			idxHD=i+1;
		}
		if(Datos[i].indexOf("[Range]")!=-1)
		{
			RangeDays.length=0;
			idxHD=i+1;
		}
		if(Datos[i].indexOf("[weeks]")!=-1)
		{
			WeekDays.length=0;
			idxWD=i+1;
		}
	}
	for(var i=0;i<Datos.length;i++)
	{
		if(Datos[i].indexOf("[")!=-1 && Datos[i].indexOf("]")!=-1 && Datos[i].indexOf("[Range]")==-1 && Datos[i].indexOf("[weeks]")==-1 && Datos[i].indexOf("[Holidays & Dates]")==-1)
		{
			idx=TimeScheduler.length;
			TimeScheduler[idx]=new Object();
			TimeScheduler[idx].Nombre=Datos[i].replace(']','');
			TimeScheduler[idx].Nombre=Datos[i].replace('[','');
			TimeScheduler[idx].Nombre=TimeScheduler[idx].Nombre.replace(']','');
			TimeScheduler[idx].Hs=new Array();
			var idx2=0;
			i++;
			while(i<Datos.length && Datos[i].length)
			{
				idx2=TimeScheduler[idx].Hs.length;
				TimeScheduler[idx].Hs[idx2]=new Object();
				TimeScheduler[idx].Hs[idx2].Time=Datos[i].split(" ")[0];
				TimeScheduler[idx].Hs[idx2].Plan=Datos[i].split(" ")[1];
				i++;
			}
		}
	}
	//ShowAgenda();
}

function GetTimeIdx(Name)
{
	for(var i=0;i<TimeScheduler.length;i++)
	{
		if(TimeScheduler[i].Nombre==Name)
			return i;
	}
	return 0;
}

//---------------------------------------Del
function SchDelItemH(Item)
{
  HolyDays.splice(Item,1);
}

function SchDelItemR(Item)
{
  RangeDays.splice(Item,1);
}

function SchDelItemW(Item)
{
	if(WeekDays.length>1)
		WeekDays.splice(Item,1);
}

function SchDelItemT(Item)
{
	if(TimeScheduler.length>1)
		TimeScheduler.splice(Item,1);
}

//---------------------------------------Add
function SchAddItemH(fecha)
{
	var idx=HolyDays.length
	HolyDays[idx]=new Object();
	HolyDays[idx].Date=fecha;
	HolyDays[idx].TimeScheduler=0;
	HolyDays=HolyDays.sort(sortfuncDate);
	ReDraw(-1);
}

function SchAddItemR()
{
	RangeIdx=RangeDays.length
	RangeDays[RangeIdx]=new Object();
	RangeDays[RangeIdx].Date1="01/01/YYYY";
	RangeDays[RangeIdx].Date2="01/01/YYYY";
	RangeDays[RangeIdx].TimeScheduler=0;
	RangeDays=RangeDays.sort(sortfuncDate2);
	ReDraw(-1);
}
function SchItemRd1(fecha)
{
	RangeDays[RangeIdx].Date1=fecha;
	ReDraw(-1);
}
function SchItemRd2(fecha)
{
	RangeDays[RangeIdx].Date2=fecha;
	ReDraw(-1);
}

function SchAddItemW(fecha)
{
	var idx=WeekDays.length;
	WeekDays[idx]=new Object();
	WeekDays[idx].Date=fecha;
	WeekDays[idx].TimeScheduler=new Array();
	for(var j=0;j<7;j++)
		WeekDays[idx].TimeScheduler[j]=0;
	WeekDays=WeekDays.sort(sortfuncDate);
	ReDraw(-1);
}

function SchAddItemW2(D,M,TS)
{
	var i=0;
	var temp="";
	temp+=M;
	if(temp<10)temp="0"+temp;
	temp=D+"/"+temp;
	if(temp.length==4)temp="0"+temp;
	while(i<WeekDays.length && WeekDays[i].Date!=temp)
		i++;
	if(i==WeekDays.length)
	{
		WeekDays[i]=new Object();
		WeekDays[i].Date=temp;
		WeekDays[i].TimeScheduler=new Array();
		for(var j=0;j<7;j++)
			WeekDays[i].TimeScheduler[j]=TS[j];
	}
}

function SchAddItemT()
{
	var idx=TimeScheduler.length;
	TimeScheduler[idx]=new Object();
	TimeScheduler[idx].Nombre="TblT["+(idx+1)+"]";
	TimeScheduler[idx].Hs=new Array();
	TimeScheduler[idx].Hs[0]=new Object();
	TimeScheduler[idx].Hs[0].Time="00:00:00";
	TimeScheduler[idx].Hs[0].Plan="99";
	TimeIdx=idx;
}

/*function SchAddItemTT(idx,Hora,Pln)
{
	var idx2=TimeScheduler[idx].Hs.length;
	TimeScheduler[idx].Hs[idx2]=new Object();
	TimeScheduler[idx].Hs[idx2].Time=Hora;
	TimeScheduler[idx].Hs[idx2].Plan=Pln;
	TimeScheduler[idx].Hs=TimeScheduler[idx].Hs.sort(sortfuncTime);
}// */

function TSAddItm(Hora,Pln)
{	
	var idx2=TimeScheduler[TimeIdx].Hs.length;
	var i=0;
	while(i<idx2 && TimeScheduler[TimeIdx].Hs[i].Time!=Hora)
		i++;
	if(i==idx2 && Pln!="")
	{
		TimeScheduler[TimeIdx].Hs[idx2]=new Object();
		TimeScheduler[TimeIdx].Hs[idx2].Time=Hora;
		TimeScheduler[TimeIdx].Hs[idx2].Plan=Pln;
	}
	if(i!=idx2 && Pln!="")
		TimeScheduler[TimeIdx].Hs[i].Plan=Pln;
	TimeScheduler[TimeIdx].Hs=TimeScheduler[TimeIdx].Hs.sort(sortfuncTime);
	CleanTs();
}
function CleanTs()
{
	var i=0;
	while(i<(TimeScheduler[TimeIdx].Hs.length-1))
	{
		i++;
		if(TimeScheduler[TimeIdx].Hs[i-1].Plan==TimeScheduler[TimeIdx].Hs[i].Plan)
		{
			TimeScheduler[TimeIdx].Hs.splice(i,1);
			i=0;
		}
	}
}

function MakeSch()
{
	PLCs[PlcIdx].HolyDays=owl.deepCopy(HolyDays);
	PLCs[PlcIdx].WeekDays=owl.deepCopy(WeekDays);
	PLCs[PlcIdx].TimeScheduler=owl.deepCopy(TimeScheduler);
	ModSch();
}

function MakeSchToFile(Prg)
{
	var temp="";
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	if(!Prg.PLCs[PlcIdx])
		return "";
	UpFile="ag.sch"
	UpPath=Prg.PLCs[PlcIdx].Scheduler+"";
	UpPath=Remplace(UpPath,UpFile,"");
	out="[Holidays & Dates]\n"
	for(var i=0;i<Prg.PLCs[PlcIdx].HolyDays.length;i++)
	{
		out+=Prg.PLCs[PlcIdx].HolyDays[i].Date+" = "
		out+=Prg.PLCs[PlcIdx].TimeScheduler[Prg.PLCs[PlcIdx].HolyDays[i].TimeScheduler].Nombre+"\n";
	}
	out+="\n[weeks]\n"
	for(var i=0;i<Prg.PLCs[PlcIdx].WeekDays.length;i++)
	{
		temp="";
		for(var j=0;j<7;j++)
		{
			temp+=Prg.PLCs[PlcIdx].TimeScheduler[Prg.PLCs[PlcIdx].WeekDays[i].TimeScheduler[j]].Nombre+" ";
		}
		out+=Prg.PLCs[PlcIdx].WeekDays[i].Date+" "+temp+"\n";
	}
	for(var idx=0;idx<Prg.PLCs[PlcIdx].TimeScheduler.length;idx++)
	{
		out+="\n["+Prg.PLCs[PlcIdx].TimeScheduler[idx].Nombre+"]\n";
		for(var idx2=0;idx2<Prg.PLCs[PlcIdx].TimeScheduler[idx].Hs.length;idx2++)										//continua inserindo restante da agenda
			out+=Prg.PLCs[PlcIdx].TimeScheduler[idx].Hs[idx2].Time+" "+Prg.PLCs[PlcIdx].TimeScheduler[idx].Hs[idx2].Plan+"\n";
		
	}
	UpData=out;
	return UpData;
}

function MkTS(ArgIdx,Sel)
{
	out="";
	out+="<select id=\""+ArgIdx+"\" class=\"CssSelect\" >\n";
	out+="<option value=\"\"></option>\n";
	for(var j=0;j<TimeScheduler.length;j++)
	{
		out+="<option value=\""+TimeScheduler[j].Nombre+"\"";
		if(TimeScheduler[j].Nombre==Sel)
			out+=" selected=\"selected\"";
		out+=" >"+HTMLEncode(TimeScheduler[j].Nombre)+"</option>\n";
	}
	out+="</select>\n";
	return out;
}

function MkTSF(ArgIdx,Sel)
{
	var Cplans=0;
	out="";
	out+="<select id=\""+ArgIdx+"\" class=\"CssSelect\" >\n";
	out+="<option value=\"\"></option>\n";
	//----------------------------------
	out+="<option value=\"97\"";
	if(97==Sel)
		out+=" selected=\"selected\"";
	out+=" >"+Str_Off_Plan+"</option>\n";
	//----------------------------------
	out+="<option value=\"99\"";
	if(99==Sel)
		out+=" selected=\"selected\"";
	out+=" >"+Str_flashing_Plan+"</option>\n";
	//----------------------------------
	Cplans=PLCs[0].Plans.length;
	for(var j=0;j<PLCs.length;j++)
	{
		if(Cplans>PLCs[j].Plans.length);
			Cplans=PLCs[j].Plans.length
	}
	for(var j=0;j<Cplans;j++)
	{
		out+="<option value=\""+(j+1)+"\"";
		if((j+1)==Sel)
			out+=" selected=\"selected\"";
		out+=" >"+Str_Plan+" "+(j+1)+"</option>\n";
	}
	out+="</select>\n";
	return out;
}

function MkSelDay(obj,Mes)
{
	out="";
	out+=Str_Date+":<select id=\"D"+obj+"\" class=\"CssSelect\">\n";
	for(var j=1;j<=dim[Mes-1];j++)
		out+="<option value=\""+j+"\">"+j+"</option>\n";
	out+="</select>\n";
	out+=" "+Str_Month+":<select id=\"M"+obj+"\" class=\"CssSelect\" onchange=\"MkSelDay('"+obj+"',this.value);\">\n";
	for(var j=1;j<=12;j++)
	{
		out+="<option value=\""+j+"\"";
		if(j==Mes) out+=" selected=\"selected\"";
		out+=">"+j+"</option>\n";
	}
	out+="</select>\n";
	document.getElementById(obj).innerHTML=out;
}

function sortfuncDate(a,b)
{
	return((b.Date.split("/").reverse().join(""))<(a.Date.split("/").reverse().join("")));
}

function sortfuncDate2(a,b)
{
	return((b.Date1.split("/").reverse().join(""))<(a.Date1.split("/").reverse().join("")));
}

function CompDate(a,b)
{
	return((b.split("/").reverse().join(""))<=(a.split("/").reverse().join("")));
}

function sortfuncTime(a,b)
{
	return((b.Time)<(a.Time));
}

function buildCal(m, y, cM, cH, cDW, cD, brdr,fnc)
{
	var oD;
	if(y=="YYYY")
		oD = new Date((new Date()).getFullYear(), m-1, 1); //DD replaced line to fix date bug when current day is 31st
	else
		oD = new Date(y, m-1, 1); //DD replaced line to fix date bug when current day is 31st
	oD.od=oD.getDay()+1; //DD replaced line to fix date bug when current day is 31st
	var todaydate=new Date() //DD added
	//var scanfortoday=(y==todaydate.getFullYear() && m==todaydate.getMonth()+1)? todaydate.getDate() : 0 //DD added
	var dim=[31,0,31,30,31,30,31,31,30,31,30,31];
	dim[1]=(((oD.getFullYear()%100!=0)&&(oD.getFullYear()%4==0))||(oD.getFullYear()%400==0))?29:28;
	var t='';
	t+='<div id="CalId" class="'+cM+'">\n';
	t+='<table class="'+cM+'" cols="7" cellpadding="0" border="'+brdr+'" cellspacing="0">\n';
	t+='<tr align="center">\n';
	t+='<td colspan="7" align="center" class="'+cH+'">\n';
	//---------------------------------------------------
	if(m>1)
	{
		t+='<input type="button" ';
		t+='onclick="document.getElementById(\'CalId\').innerHTML=buildCal('+(m-1)+',\''+y+'\',\''+cM+'\',\''+cH+'\',\''+cDW+'\',\''+cD+'\','+brdr+',\''+fnc+'\');" ';
		t+='value="&#60;" />\n';
	}
	t+=VStr_Month[m-1];
	if(y!="YYYY")
		t+=' - '+y;
	t+='\n';
	if(m<12)
	{
		t+='<input type="button" ';
		t+='onclick="document.getElementById(\'CalId\').innerHTML=buildCal('+(m+1)+',\''+y+'\',\''+cM+'\',\''+cH+'\',\''+cDW+'\',\''+cD+'\','+brdr+',\''+fnc+'\');" ';
		t+='value="&#62;" />\n';
	}
	//---------------------------------------------------
	t+='</td>\n';
	t+='</tr>\n';
	t+='<tr align="center">\n';
	for(var s=0;s<7;s++)
		t+='<td class="'+cDW+'">'+"DLMMJVS".substr(s,1)+'</td>\n';
	t+='</tr>\n';
	t+='<tr align="center">\n';
	for(var i=1;i<=42;i++)
	{
		var x=((i-oD.od>=0)&&(i-oD.od<dim[m-1]))? i-oD.od+1 : ' ';
		t+='<td class="'+cD+'" ';
		if(x!=' ')
		{
			t+='onclick="'+fnc+'(\'';
			if(x<10)t+='0';
			t+=x+'/';
			if(m<10)t+='0';
			t+=m+'/';
			t+=y+'\');" ';
		}
		t+='>'+x+'</td>\n';
		if((i)%7==0 && x==' ')
			break;
		if(((i)%7==0)&&(i<36))
		{
			t+='</tr>\n';
			t+='<tr align="center">\n';
		}
	}
	return t+='</tr>\n</table>\n</div>\n';
}

percent=100;
