Resource = new Array();
var Hsize=2;
var ioflags= new Array(Hsize);
var tiempo= new Array(Hsize);
var ocupacion= new Array(Hsize);
var conteo= new Array(Hsize);
var ioLTC= new Array(Hsize);
var ioLT0= new Array(Hsize);
var ioLT1= new Array(Hsize);
var hindex=-1;
var hindexO;
var Number_Of_Inputs=0;
var Pxs=12;
var fullscaleX=1080;
var PhHist= new Array(fullscaleX/Pxs);
var PhHistCant=0;
var outX="";
//=================================================
function addautoget(ele,url,fnc)
{
	var i=Resource.length;
	Resource[i]=new Object();
	Resource[i].Element=ele;
	Resource[i].url=url;
	Resource[i].Fnc=fnc;
}
function fnc0()
{
	var digital = new Date();
	if(URLs.length && (enProceso+1000)<digital.getTime())
	{
		GetUrl(URLs[0],FNCs[0]);
		FNCs.splice(0,1);
		URLs.splice(0,1);
		return;
	}
	RsrcIdx%=parseInt("0"+Resource.length);
	if(Resource.length && Resource.length>RsrcIdx)
	{
		GetUrl(Resource[RsrcIdx].url,RcvMoni);
	}
	//=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=-·-=
}
function RcvMoni(Datos)
{
	var out="";
	if(Datos)
	{
		if(Datos.status==200)
		{
			if(Resource.length && Resource.length>RsrcIdx)
			{
				Resource[RsrcIdx].Element.innerHTML=Resource[RsrcIdx].Fnc(Datos);
			}
		}
		else
		{
			out=Datos.status+" "+Datos.statusText;
		}
	}
	RsrcIdx++;
}

function ShwStsTbl()
{
	var out="";
	out+="<table border=\"0\">\n";
	out+="<tr>\n";
	out+="<td id=\"InfoGV\" valign=\"top\" align=\"center\" ></td>\n";
	out+="<td id=\"InfoTC\" valign=\"top\" align=\"center\" ></td>\n";
	out+="<td id=\"InfoPH\" valign=\"top\" align=\"center\" ></td>\n";
	out+="</tr>\n";
	out+="<tr>\n";
	out+="<td id=\"InfoIO\" valign=\"top\" align=\"center\" colspan=\"3\" ></td>\n";
	out+="</tr>\n";
	out+="</table>\n";
	return out;
}
//=================================================
function rcvGbVars(Datos)
{
	var out="";
	if(Datos==null)
		return out;
	if(Datos.status!=200)
		return out;
	if(http.responseText.indexOf('invalid')!=-1)
		return out;
	var RTC=Datos.getResponseHeader("Content-Type");
	var count=-1;
	if(RTC)
		count=RTC.indexOf("RTC:");
	var dat;
	if(count!=-1)
	{
		count+=4;
		RTC=RTC.substring(count);
		RTC=parseInt(RTC);
		RTC*=1000;
		dat = new Date(RTC);
		RTC+=(dat.getTimezoneOffset()*60000);
		dat = new Date(RTC);
	}
	else
	{
		dat="";// */
	}
	//----------------------
	Datos=Datos.responseText;
	var temp="";
	var count;
	var tempV;
	var out1="";
	var out2="";
	var out3="";
	var out4="";
	var out5="";
	var outX="";
	//---------------------------------
	temp=Datos.substring(20,24);
	tempV=ByToInt(temp);
	GlobalParms().Version=tempV;
	GlobalVars().Version=tempV;
	if(GlobalParms())
		GlobalParms().Version=tempV;
	out1+="<table border=\"0\">\n";
	out1+="<tr>\n";
	out1+="<td align=\"center\">"
	out1+="<font size=\"2\" face=\"arial\">"+(GlobalParms().Version/1000000)+"</font>";
	out1+="</td>";
	out1+="</tr>"
	out1+="</table>\n";
	//---------------------------------
	temp=Datos.substring(57,61);
	tempV=ByToInt(temp);
	GlobalVars().Log=			(tempV&0xFF);
	GlobalVars().Sync=		((tempV>> 8)&0x03);
	GlobalVars().UdtRTC=		((tempV>>10)&0x01)
	GlobalVars().GPS_Connect=	((tempV>>11)&0x01)
	GlobalVars().GPS_Dv=		((tempV>>12)&0x01)
	GlobalVars().GPS_Dat=		((tempV>>13)&0x01)
	GlobalVars().Door=		((tempV>>14)&0x01)
	out2+=ShwGPSSignal(((tempV>>11)&0x07));
	outX+="<font size=\"2\" face=\"arial\">Log:"+			GlobalVars().Log+"</font><br/>\n";
	outX+="<font size=\"2\" face=\"arial\">Sync:"+  		GlobalVars().Sync+"</font><br/>\n";
	outX+="<font size=\"2\" face=\"arial\">UpdateRTC:"+		GlobalVars().UdtRTC+"</font><br/>\n";
	outX+="<font size=\"2\" face=\"arial\">Gps Conected:"+	GlobalVars().GPS_Connect+"</font><br/>\n";
	outX+="<font size=\"2\" face=\"arial\">Gps data valid:"+GlobalVars().GPS_Dv+"</font><br/>\n";
	outX+="<font size=\"2\" face=\"arial\">Gps data new:"+	GlobalVars().GPS_Dat+"</font><br/>\n";
	outX+="<font size=\"2\" face=\"arial\">Rack Door open:"+GlobalVars().Door+"</font><br/>\n";
	//----------------------------------------------------
	temp=Datos.substring(64,68)
	tempV=ByToInt(temp);
	GlobalVars().time_t_mm=tempV;
	temp=Datos.substring(68,72);
	tempV=ByToInt(temp);
	GlobalVars().time_t_s=tempV;
	outX+="<font size=\"2\" face=\"arial\">time_t_mm:"+GlobalVars().time_t_mm+"</font><br/>\n";
	outX+="<font size=\"2\" face=\"arial\">time_t_s:"+GlobalVars().time_t_s+"</font><br/>\n";
	//---------------------------------
	out3+="<table border=\"0\">\n";
	temp=Datos.substring(16,20);
	tempV=ByToInt(temp);
	tempV*=1000;
	dat = new Date(tempV);
	tempV+=(dat.getTimezoneOffset()*60000);
	ourDate = new Date();
	temp=Math.abs(tempV-ourDate.getTime());
	out3+="<tr><td>\n";
	out3+="<font size=\"2\" face=\"arial\">"+Str_Controllers+"</font>\n";
	out3+="</td><td>";
	out3+="<b><font size=\"2\" face=\"arial\" "+((temp>20000)?"color='#F0A'":"color='#00A'")+" >";
	out3+=dgvdatef(new Date(tempV));
	out3+="</font></b>";
	out3+="</td></tr>";
	//----------------
	out3+="<tr><td>\n";
	out3+="<font size=\"2\" face=\"arial\">Local</font>";
	out3+="</td><td>";
	out3+="<font size=\"2\" face=\"arial\">"+dgvdatef(new Date())+"</font>";
	out3+="</td></tr>";
	out3+="</table>\n";
	//--------------
	outX+=HexEncode(Datos.substring(24,56));
	//---------------------------------
	out4+="<table border=\"0\">\n";
	out4+="<tr>\n";
	temp=Datos.substring(28,32);//Error_Flags[1]=48-52
	tempV=ByToInt(temp);
	out4+="<td>";
	if(tempV)
	{
		if(tempV&4)out4+="<font size=\"2\" color=\"#b0b\" face=\"arial\">"+Str_Over_Voltage+"<br />";
		if(tempV&2)out4+="<font size=\"2\" color=\"#bb0\" face=\"arial\">"+Str_Min_Voltage+"<br />";
		if(tempV&1)out4+="<font size=\"3\" color=\"#f00\" face=\"arial\">"+Str_Crit_Voltage+"<br />";
	}
	else
	{
		out4+="<font size=\"1\" color=\"#00f\" face=\"arial\">"+Str_Normal_Voltage+"<br />";
	}
	out4+="</font>";
	out4+="</td>";
	out4+="</tr>\n";
	temp=Datos.substring(12,16);
	tempV=ByToInt(temp);
	tempV=(tempV/100)
	out4+="<tr>\n";
	out4+="<td>";
	out4+="<font size=\"3\" face=\"arial\">"+tempV+"</font></td>";
	out4+="</tr>\n";
	out4+="</table>\n";
	//---------------------------------
	tempV=Datos.charCodeAt(56);
	out5+="<table border=\"0\">\n";
	out5+="<tr>\n";	
	out5+="<td align=\"center\"><font size=\"2\" face=\"arial\">"+tempV+"</font></td>";
	out5+="</tr>\n";
	out5+="</table>\n";
	//-------------------------------------------------------------------------------------------------------
	out+="<table border=\"0\" cellpadding=\"5\" cellspacing=\"1\" >\n";
	out+="<tr><td colspan=\"2\"><b><u><font size=\"3\" color=\"#0bb\" face=\"arial\">"+GlobalParms().ID+"</font></u></b></td></tr>\n";
	out+="<tr><td colspan=\"2\"><hr /></td></tr>\n";
	out+="<tr>\n";
	out+="<td valign=\"middle\" align=\"center\"><font size=\"3\" face=\"arial\"> "+Str_Version+" </font></td>\n";
	out+="<td valign=\"top\" align=\"center\">\n";
	out+=out1;
	out+="</td>\n";
	out+="</tr>\n";
	//-------------
	out+="<tr><td colspan=\"2\"><hr /></td></tr>\n";
	out+="<tr>\n";
	out+="<td valign=\"middle\" align=\"center\"><font size=\"3\" face=\"arial\">Fecha y hora</font></td>\n";
	out+="<td valign=\"top\" align=\"center\">\n";
	out+=out3;
	out+=out2;
	out+="</td>\n";
	out+="</tr>\n";
	//-------------
	out+="<tr><td colspan=\"2\"><hr /></td></tr>\n";
	out+="<tr>\n";
	out+="<td valign=\"middle\" align=\"center\"><font size=\"3\" face=\"arial\"> "+Str_Voltage+" </font></td>\n";
	out+="<td valign=\"top\" align=\"center\">\n";
	out+=out4;
	out+="</td>\n";
	out+="</tr>\n";
	//-------------
	out+="<tr><td colspan=\"2\"><hr /></td></tr>\n";
	out+="<tr>\n";
	out+="<td valign=\"middle\" align=\"center\"><font size=\"3\" face=\"arial\"> "+Str_Temperature+" </font></td>\n";
	out+="<td valign=\"top\" align=\"center\">\n";
	out+=out5;
	out+="</td>\n";
	out+="</tr>\n";
	/*//-------------
	out+="<tr><td colspan=\"2\"><hr /></td></tr>\n";
	out+="<tr>\n";
	out+="<td valign=\"middle\" align=\"center\"><font size=\"3\" face=\"arial\"> "+Str_Others+" </font></td>\n";
	out+="<td valign=\"top\" align=\"center\">\n";
	out+=outX;
	out+="</td>\n";
	out+="</tr>\n";
	//------------- */
	out+="</table>\n";
	return out;
}

//=================================================
function rcvTcSts(Datos)
{
	var out="";
	if(Datos==null)
		return out;
	if(Datos.status!=200)
		return out;
	if(http.responseText.indexOf('invalid')!=-1)
		return out;
	Datos=Datos.responseText;
	var plcidx=0;
	var count=0;
	var pPLCs=Datos.length;
	var temp="";
	var pPLC=0;
	var tempV=0;
	if((Datos.length%StructSizePLC)!=0)
	{
		pPLCs-=(Datos.length%StructSizePLC);
		out+="!";
	}
	//-----------------------------
	while(pPLC<pPLCs)
	{
		temp=Datos.substring(pPLC+0,pPLC+4);
		tempV=ByToInt(temp);
		if((tempV&0x0F)==0)PLCs()[plcidx].Mode=Str_MD_Error;
		if((tempV&0x0F)==1)PLCs()[plcidx].Mode=Str_MD_Flashing;
		if((tempV&0x0F)==2)PLCs()[plcidx].Mode=Str_MD_Off;
		if((tempV&0x0F)==3)PLCs()[plcidx].Mode=Str_MD_Normal;
		if((tempV&0x0F)==4)PLCs()[plcidx].Mode=Str_MD_Normal_lock;
		if((tempV&0x0F)==5)PLCs()[plcidx].Mode=Str_MD_Remote;
		if((tempV&0x0F)==6)PLCs()[plcidx].Mode=Str_MD_Manual;
		if((tempV&0x0F)==7)PLCs()[plcidx].Mode=Str_MD_StpByStp;
		PLCs()[plcidx].Emergency=	((tempV>>4)&0x03);
		PLCs()[plcidx].Lamp=		((tempV&64)!=0x00);
		PLCs()[plcidx].Service=	((tempV&128)!=0x00);
		PLCs()[plcidx].ErrorOut=	((tempV>>8)&0x0F);
		PLCs()[plcidx].ReIntento=	((tempV>>12)&0x07);
		PLCs()[plcidx].PLCn=		((tempV>>15)&0x07);
		PLCs()[plcidx].ReLoadPlan=((tempV>>18)&0x01);
		PLCs()[plcidx].EntreVerde=((tempV>>21)&0x01);
		PLCs()[plcidx].Tmin=		((tempV>>30)&0x01);
		PLCs()[plcidx].wmu=		((tempV>>31)&0x01);
		//---------------------------------
		temp=Datos.substring(pPLC+4,pPLC+28);
		PLCs()[plcidx].SyncRef=temp.substring(0,temp.search("\0"));
		temp=Datos.substring(pPLC+28,pPLC+43);
		PLCs()[plcidx].Plan_File=temp.substring(0,temp.search("\0"));
		temp=Datos.substring(pPLC+43,pPLC+68);
		PLCs()[plcidx].Name=temp.substring(0,temp.search("\0"));
		temp=Datos.substring(pPLC+68,pPLC+92);
		PLCs()[plcidx].Location=temp.substring(0,temp.search("\0"));
		temp=Datos.substring(pPLC+92,pPLC+96);
		PLCs()[plcidx].LSTCHG=ByToInt(temp);
		temp=Datos.substring(pPLC+96,pPLC+100);
		PLCs()[plcidx].NEXCHG=ByToInt(temp);
		temp=Datos.substring(pPLC+100,pPLC+114);
		PLCs()[plcidx].Server=temp.substring(0,temp.search("\0"));
		PLCs()[plcidx].TimeOutMode=Datos.charCodeAt(pPLC+115);
		temp=Datos.substring(pPLC+116,pPLC+131);
		PLCs()[plcidx].scheduler=temp.substring(0,temp.search("\0"));
		temp=Datos.substring(pPLC+131,pPLC+146);
		PLCs()[plcidx].scheduler=temp.substring(0,temp.search("\0"));
		//---------------------------------
		PLCs()[plcidx].PHASE_COD_OUT=Datos.charCodeAt(pPLC+146);
		PLCs()[plcidx].Plan=		Datos.charCodeAt(pPLC+147);
		PLCs()[plcidx].IniPlan=	Datos.charCodeAt(pPLC+148);
		PLCs()[plcidx].OffPlan=	Datos.charCodeAt(pPLC+149);
		PLCs()[plcidx].FlashPlan=	Datos.charCodeAt(pPLC+150);
		temp=Datos.substring(pPLC+152,pPLC+156);
		PLCs()[plcidx].Number=	ByToInt(temp);
		temp=Datos.substring(pPLC+164,pPLC+168);
		PLCs()[plcidx].ErrorCode=	ByToInt(temp); //convierte el codigo de error
		temp=String(Datos.substring(pPLC+168,pPLC+StructSizePLC));
		temp=Remplace(temp,"<","&#60;");
		temp=Remplace(temp,">","&#62;");
		PLCs()[plcidx].ErrorMsg=temp.substring(0,temp.search("\0"));
		//---------------------------------
		out+="<table border=\"0\" align=\"center\" cellpadding=\"5\" cellspacing=\"1\" >\n";
		//-----------------------------
		out+="<tr><td colspan=\"2\" valign=\"middle\" align=\"center\" ><hr /></td></tr>\n";
		out+="<tr>\n";
		out+="<td><font size=\"2\" face=\"arial\"> "+Str_Ubicacion+" </font></td>\n";
		out+="<td><a href=\"http://www.google.com/maps/place/"+PLCs()[plcidx].Location+"\" target=\"_blank\" ><font size=\"2\" face=\"arial\"> "+PLCs()[plcidx].Location+" </font></a></td>\n";
		out+="</tr>\n";
		//-----------------------------
		out+="<tr><td colspan=\"2\" valign=\"middle\" align=\"center\" ><hr /></td></tr>\n";
		out+="<tr>\n";
		out+="<td><font size=\"2\" face=\"arial\"> "+Str_Controller_Number+" </font></td>\n";
		out+="<td><font size=\"2\" face=\"arial\"> "+PLCs()[plcidx].Number+" </font></td>\n";
		out+="</tr>\n";
		//-----------------------------
		out+="<tr><td colspan=\"2\" valign=\"middle\" align=\"center\" ><hr /></td></tr>\n";
		out+="<tr>\n";
		out+="<td><font size=\"2\" face=\"arial\"> "+Str_Mode+" </font></td>\n";
		out+="<td><font size=\"2\" face=\"arial\"> "+PLCs()[plcidx].Mode+"<br />";
		out+=((PLCs()[plcidx].Lamp!=0)?(Str_Lamp+"<br />"):"");
		out+=((PLCs()[plcidx].Service!=0)?(Str_Service+""):"");
		out+="</font></td>\n";
		out+="</tr>\n";
		//-----------------------------
		out+="<tr><td colspan=\"2\" valign=\"middle\" align=\"center\" ><hr /></td></tr>\n";
		out+="<tr>\n";
		out+="<td><font size=\"2\" face=\"arial\"> "+Str_Plan+" </font></td>\n";
		out+="<td><font size=\"2\" face=\"arial\"> "+PLCs()[plcidx].Plan+" </font></td>\n";
		out+="</tr>\n";
		//-----------------------------
		tempV=PLCs()[plcidx].NEXCHG*1000;
		dat = new Date(tempV);
		tempV+=(dat.getTimezoneOffset()*60000);
		out+="<tr><td colspan=\"2\" valign=\"middle\" align=\"center\" ><hr /></td></tr>\n";
		out+="<tr>\n";
		out+="<td><font size=\"2\" face=\"arial\"> "+Str_NXCHG+" </font></td>\n";
		out+="<td><font size=\"2\" face=\"arial\"> "+dgvdatef(new Date(tempV))+" </font></td>\n";
		out+="</tr>\n";
		//-----------------------------
		if(PLCs()[plcidx].ErrorCode!=0)
		{
			out+="<tr><td colspan=\"2\" valign=\"middle\" align=\"center\" ><hr /></td></tr>\n";
			out+="<tr>\n";
			out+="<td><font size=\"2\" face=\"arial\"> "+Str_Errors+" </font></td>\n";
			out+="<td><font size=\"2\" face=\"arial\"> "+PLCs()[plcidx].ErrorCode+":"+PLCs()[plcidx].ErrorMsg+"</font></td>\n";
			out+="</tr>\n";
		}
		//-----------------------------
		pPLC+=StructSizePLC;
		plcidx++;
		out+="</table>\n";
	}
	return out;// */
}

//=================================================
function rcvphases1(Datos)
{
	var out="";
	if(Datos==null)
		return out;
	if(Datos.status!=200)
		return out;
	if(http.responseText.indexOf('invalid')!=-1)
		return out;
	var RTC=Datos.getResponseHeader("Content-Type");
	var count=0;
	if(RTC!=null)
	{
		count=RTC.indexOf("RTC:");
		count+=4;
		RTC=RTC.substring(count);
		RTC=parseInt(RTC);
		if(RTC!=0)
		{
			RTC*=1000;
			dat = new Date(RTC);
			RTC+=(dat.getTimezoneOffset()*60000);
			var dat = new Date(RTC);
		}
		else
			var dat="";// */
	}
	Datos=Datos.responseText;
	var phase=0;
	var phases=Datos.length;
	if((phases/PhasesStructSize)>PHASEs().length)
		return "";
	var temp="";
	var tempV=0;
	var tempV2=0;
	var out1="";
	var out2="";
	var out3="";
	var out4="";
	var out5="";
	var outX="";
	var color=0;
	var currents=0;
	var j=0;
	//---------------------------------
	out="<table border=\"0\" align=\"center\" cellpadding=\"5\" cellspacing=\"0\" >\n";
	out+="<tr>\n";
	out+="<td align=\"right\"><font size=\"2\" face=\"arial\">"+Str_Name+"</font></td>\n";
	out+="<td rowspan=\"5\" class=\"hrvert\" width=\"4\" ></td>\n";
	out+="<td align=\"right\" ><font size=\"2\" face=\"arial\">"+Str_Status+"</font></td>\n";
	out+="<td rowspan=\"5\" class=\"hrvert\" width=\"4\"></td>\n";
	out+="<td align=\"right\"><font size=\"2\" face=\"arial\">"+Str_Errors+"</font></td>\n";
	out+="<td rowspan=\"5\" class=\"hrvert\" width=\"4\"></td>\n";
	out+="<td align=\"right\" ><font size=\"2\" face=\"arial\">"+Str_OPB_PWR+"</font></td>\n";
	out+="<td rowspan=\"5\" class=\"hrvert\" width=\"4\"></td>\n";
	out+="<td align=\"right\"><font size=\"2\" face=\"arial\">"+Str_Opb_Links+"</font></td>\n";
	out+="</tr>";// */
	while(phase<phases)
	{
		j=(phase/PhasesStructSize);
		temp=HexEncode(Datos.substring(phase+0,phase+4));
		if(!phase)
			LOGdirect(temp);
		else
			LOG(temp);
		//---------------------------------
		Datos=Datos.substring(temp);
		//---------------------------------
		out1="";
		out2="";
		out3="";
		out4="";
		out5="";
		outX="";
		//--------------------------------- */
		out1+="<td align=\"right\" valign=\"middle\" class=\"hrtd\" width=\"50\" ><font size=\"3\" face=\"Arial\" color=\"#0aa\">\n";
		out2+="<td align=\"right\" valign=\"middle\" class=\"hrtd\" width=\"50\" ><font size=\"1\" face=\"Arial\">\n";
		out3+="<td align=\"right\" valign=\"middle\" class=\"hrtd\" width=\"50\" ><font size=\"1\" face=\"Arial\">\n";
		out4+="<td align=\"right\" valign=\"middle\" class=\"hrtd\" width=\"50\" ><font size=\"1\" face=\"Arial\">\n";
		out5+="<td align=\"right\" valign=\"middle\" class=\"hrtd\" width=\"50\" ><font size=\"1\" face=\"Arial\">\n";
		outX+="<td align=\"right\" valign=\"top\"    class=\"hrtd\" width=\"50\" ><font size=\"1\" face=\"Arial\">\n";
		//---------------------------------//Nombre de phase
		{
			out1+=PHASEs()[j].Name;
		}
		//--------------------------------- PLC Diming Link
		{
			tempV=Datos.charCodeAt(phase+3);
			outX+="PLC:"+(tempV&0x0F)+"<br />\n";
			out4+='<table border="0" cellpadding="0" cellspacing="0" ><tr><td>';
			out4+=ShwLevel(((tempV&0xF0)>>4),0,15);
			out4+="</td></tr>";
			outX+="Diming:"+((tempV&0xF0)>>4)+"<br />\n";
			tempV=Datos.charCodeAt(phase+1);
			tempV=((tempV&0xF8)/8);
			outX+="ErLnk:"+tempV+"<br />\n";
			out2+=ShwSignal(tempV);
		}
		//--------------------------------- //Estado
		{
			tempV=Datos.charCodeAt(phase+0);
			outX+="[W/R:";
			outX+=(tempV&0x0F);
			outX+="/";
			color=Datos.charCodeAt(phase+1);
			outX+=(color&0x07);
			outX+="]<br />\n";
			out3+=ShwMov((color&0x07),PHASEs()[j].Type);
		}
		//--------------------------------- Extra Data
		{
			temp=Datos.substring(phase+16,phase+18);
			tempV=ByToSht(temp);
			currents=tempV;
			if(tempV)
				outX+="Current Det:"+tempV+"<br />\n";
			else
				outX+="Current Det:-<br />\n";
			out4+="<tr><td>";
			if(GlobalParms().MODEL.indexOf("DGV-uTC1-M4")!=-1)
				out4+=ShwLevel(tempV,0,255);
			out4+="</td></tr></table>";
			tempV=Datos.charCodeAt(phase+15);
			color=tempV;
			//color|=(temp&0x07)<<4;
			/*//------------------------------------- ValH
			temp=Datos.substring(phase+18,phase+20);
			tempV=ByToSht(temp);
			if(color&1)
			{
				outX+=tempV+"homs";
				outX+="("+((currents/1000)*Tension).toFixed(1)+"w)<br />\n";
			}
			else
			{
				outX+=(tempV/1000).toFixed(1)+"w";
			}
			outX+=" ["+Datos.charCodeAt(phase+12)+"w]<br />\n";
			//------------------------------------- ValH
			temp=Datos.substring(phase+20,phase+22);
			tempV=ByToSht(temp);
			if(color&2)
			{
				outX+=tempV+"homs";
				outX+="("+((currents/1000)*Tension).toFixed(1)+"w)<br />\n";
			}
			else
			{
				outX+=(tempV/1000).toFixed(1)+"w";
			}
			outX+=" ["+Datos.charCodeAt(phase+13)+"w]<br />\n";
			//------------------------------------- ValH
			temp=Datos.substring(phase+22,phase+24);
			tempV=ByToSht(temp);
			if(color&4)
			{
				outX+=tempV+"homs";
				outX+="("+((currents/1000)*Tension).toFixed(1)+"w)<br />\n";
			}
			else
			{
				outX+=(tempV/1000).toFixed(1)+"w";
			}
			outX+=" ["+Datos.charCodeAt(phase+14)+"w]<br />\n";
			//------------------------------------- */
		}
		//--------------------------------- Error code
		{
			temp=Datos.substring(phase+24,phase+28);
			tempV=ByToInt(temp);
			temp=Datos.substring(phase+28,phase+32);
			tempV2=ByToInt(temp);
			/*outX+="<hr />\n";
			if (tempV&0x00000001)outX+="Er Electrico rojo<br />\n";
			if (tempV&0x00000002)outX+="Er Electrico ROJO<br />\n";
			if (tempV&0x00000004)outX+="Er Consumo rojo<br />\n";
			if (tempV&0x00000008)outX+="Er Consumo ROJO<br />\n";
			if (tempV&0x00000010)outX+="Er Electrico amarillo<br />\n";
			if (tempV&0x00000020)outX+="Er Electrico AMARILLO<br />\n";
			if (tempV&0x00000040)outX+="Er Consumo amarillo<br />\n";
			if (tempV&0x00000080)outX+="Er Consumo AMARILLO<br />\n";
			if (tempV&0x00000100)outX+="Er Electrico verde<br />\n";
			if (tempV&0x00000200)outX+="Er Electrico VERDE<br />\n";
			if (tempV&0x00000400)outX+="Er Consumo verde<br />\n";
			if (tempV&0x00000800)outX+="Er Consumo VERDE<br />\n";
			if (tempV&0x00001000)outX+="Er Min Tim R<br />\n";
			if (tempV&0x00002000)outX+="Er Max Tim R<br />\n";
			if (tempV&0x00004000)outX+="Er Min Tim Y<br />\n";
			if (tempV&0x00008000)outX+="Er Max Tim Y<br />\n";
			if (tempV&0x00010000)outX+="Er Min Tim G<br />\n";
			if (tempV&0x00020000)outX+="Er Max Tim G<br />\n";
			//- - - - - - - - - - - - - - - - - - - - - -
			if (tempV&0x01000000)outX+="Er Falta Total r<br />\n";
			if (tempV&0x02000000)outX+="Er Falta Total y<br />\n";
			if (tempV&0x04000000)outX+="Er Falta Total g<br />\n";
			if (tempV&0x80000000)outX+="Er Link<br />\n";
			//- - - - - - - - - - - - - - - - - - - - - - */
			out5+='<table border="0" cellpadding="0" cellspacing="0" ><tr>';
			if(tempV&0x01000000)
			{
				out5+='<td><p onclick="alert(\''+Str_Lack+Str_Red+'\');">' ;
				out5+=ShwLamp("#A00");
				out5+='</p></td>';
			}
			if(tempV&0x00000003)
			{
				out5+='<td><p onclick="alert(\''+Str_Error_Electrico+Str_Red+'\');">' ;
				out5+=ShwSwch("#A00")+"\n";
				out5+='</p></td>';
			}
			if(tempV&0x02000000)
			{
				out5+='<td><p onclick="alert(\''+Str_Lack+Str_Yellow+'\');">' ;
				out5+=ShwLamp("#AA0");
				out5+='</p></td>';
			}
			if(tempV&0x00000030)
			{
				out5+='<td><p onclick="alert(\''+Str_Error_Electrico+Str_Yellow+'\');">' ;
				out5+=ShwSwch("#AA0")+"\n";
				out5+='</p></td>';
			}
			if(tempV&0x04000000)
			{
				out5+='<td><p onclick="alert(\''+Str_Lack+Str_Green+'\');">' ;
				out5+=ShwLamp("#0A0");
				out5+='</p></td>';
			}
			if(tempV&0x00000300)
			{
				out5+='<td><p onclick="alert(\''+Str_Error_Electrico+Str_Green+'\');">' ;
				out5+=ShwSwch("#0A0")+"\n";
				out5+='</p></td>';
			}
			if(tempV==0)
			{
				out5+='<td><font color="#0b0" size="2" face="arial">'+Str_All_Right+'</font></td>';
			}
			out5+="</tr></table>";
			outX+="<hr />\n";
			outX+="Err:["+HexEncode(Datos.substring(phase+24,phase+28))+"]="+tempV+"<br />\n";
			outX+="Msk:["+HexEncode(Datos.substring(phase+28,phase+32))+"]="+tempV2+"<br />\n";
		}
		//--------------------------------- Ultimo cambio Ultimo Verde
		{
			temp=Datos.substring(phase+32,phase+36);
			tempV=ByToInt(temp);
			outX+="LTR:"+tempV+"<br />";
			temp=Datos.substring(phase+36,phase+40);
			tempV=ByToInt(temp);
			outX+="LTW:"+tempV+"<br />";
			temp=Datos.substring(phase+40,phase+44);
			tempV=ByToInt(temp);
			outX+="LTG:"+tempV+"<br />";
			temp=Datos.substring(phase+44,phase+48);
			tempV=ByToInt(temp);
			outX+="LTCH:"+tempV+"<br />";
		}
		//--------------------------------- Tiempos de seguridad
		{
			temp=Datos.substring(phase+8,phase+12);
			tempV=ByToInt(temp);
			temp=Datos.charCodeAt(phase+7);
			outX+="Phase type["+((tempV>>30)&3)+"] ";
			outX+="TimOutEE["+(temp>>3)+"]<br />\n";
			if(temp&1)outX+="Auto ";
			outX+="Min R Time["+Datos.charCodeAt(phase+4)+"] ";
			outX+="Max R Time["+(tempV&0x3FF)+"]<br />\n";
			if(temp&2)outX+="Auto ";
			outX+="Min Y Time["+Datos.charCodeAt(phase+5)+"] ";
			outX+="Max Y Time["+((tempV>>10)&0x3FF)+"]<br />\n";
			if(temp&4)outX+="Auto ";
			outX+="Min G Time["+Datos.charCodeAt(phase+6)+"] ";
			outX+="Max G Time["+((tempV>>20)&0x3FF)+"]<br />\n";
		}
		//--------------------------------- */
		out1+="</font></td>\n";
		out2+="</font></td>\n";
		out3+="</font></td>\n";
		out4+="</font></td>\n";
		out5+="</font></td>\n";
		outX+="</font></td>\n";
		//----------------------------------
		out+="<tr>\n";
		out+=out1;
		out+=out3;
		out+=out5;
		out+=out4;
		out+=out2;
		out+="</tr>\n";
		//---------------------------------- * /
		phase+=PhasesStructSize;
	}
	//out="<table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"table1\" bordercolor=\"#FFFFFF\" bgcolor=\"#FFFFFF\" id=\"phases\" >\n"; //width=\"100%\"
	/*out="<table border=\"0\" align=\"center\" cellpadding=\"5\" cellspacing=\"0\" >\n";
	out+="<tr>\n";
	out+="<td align=\"right\"><font size=\"2\" face=\"arial\">"+Str_Name+"</font></td>\n";
	out+="<td rowspan=\"5\" class=\"hrvert\" align=\"center\"></td>\n";
	out+=out1;
	out+="</tr>";
	out+="<tr>\n";
	out+="<td align=\"right\" ><font size=\"2\" face=\"arial\">"+Str_Status+"</font></td>\n";
	out+=out3;
	out+="</tr>";
	out+="<tr>\n";
	out+="<td align=\"right\"><font size=\"2\" face=\"arial\">"+Str_Errors+"</font></td>\n";
	out+=out5;
	out+="</tr>";
	out+="<tr >\n";
	out+="<td  align=\"right\"><font size=\"2\" face=\"arial\">"+Str_Opb_Links+"</font></td>\n";
	out+=out2;
	out+="</tr>";
	out+="<tr valign=\"top\">\n";
	out+="<td align=\"right\" ><font size=\"2\" face=\"arial\">Atenuacion<br />Deteccion de consumo</font></td>\n";
	out+=out4;
	out+="</tr>";// */
	/*out+="<tr align=\"center\" bgcolor=\"#bbb\">\n";
	out+="<td ><font size=\"1\" face=\"arial\">"+Str_Status+"</font></td>\n";
	out+=outX;
	out+="</tr>";// */
	out+="</table>";
	return out;
}
function rcvphases2(Datos)
{
	var out="";
	if(Datos==null)
		return out;
	if(Datos.status!=200)
		return out;
	if(http.responseText.indexOf('invalid')!=-1)
		return out;
	Datos=Datos.responseText;
	var phaseC=0;
	var phase=0;
	var color=null;
	var phases=Datos.length;
	var temp=0;
	var flags=0;
	//---------------------------------Title
	out=document.getElementById("sample8Title");
	out.innerHTML=Str_Intersection;
	//---------------------------------
	while(phase<phases)
	{
		//--------------------------------- //Estado
		flags=0;
		tempV=Datos.charCodeAt(phase+0);
		if (tempV&0xF0)
		{
			if (tempV&0x80)flags+=8;
			if (tempV&0x40)flags+=4;
			if (tempV&0x30)flags+=1;
		}
		//------------------------------------------------------------
		out = document.getElementById("phase"+phaseC+"R");
		if(out!=null)
		{
			if(tempV&1)
			{
				color=" rgb(240,0,0)";
				temp=getgroup(out,"style","fill");
				if(flags&1 && color==temp)
				color=" rgb(127,127,127)";
				setgroup(out,"style", "fill:"+color);
			}
			else
			setgroup(out,"style", "fill:rgb(127,127,127)");
		}
		//------------------------------------------------------------
		out = document.getElementById("phase"+phaseC+"Y");
		if(out!=null)
		{
			if(tempV&2)
			{
				color=" rgb(240,240,0)";
				temp=getgroup(out,"style","fill");
				if(flags&1 && color==temp)
				color=" rgb(127,127,127)";
				setgroup(out,"style", "fill:"+color);
			}
			else
			setgroup(out,"style", "fill:rgb(127,127,127)");
		}
		//------------------------------------------------------------
		out = document.getElementById("phase"+phaseC+"G");
		if(out!=null)
		{
			if(tempV&4)
			{
				color=" rgb(0,240,0)";
				temp=getgroup(out,"style","fill");
				if(flags&1 && color==temp)
				color=" rgb(127,127,127)";
				setgroup(out,"style", "fill:"+color);
			}
			else
			setgroup(out,"style", "fill:rgb(127,127,127)");
		}
		//------------------------------------------------------------
		if(out==null)
		{
			out = document.getElementById("phase"+phaseC);
			switch(tempV&7)
			{
				case 1:
				color=" rgb(240, 0, 0)";
				break;
				case 2:
				color=" rgb(240, 240, 0)";
				break;
				case 4:
				color=" rgb(0, 240, 0)";
				break;
				default:
				color=" rgb(127, 127, 127)";
				break;
			}
			if(out!=null)
			{
				if(flags&1)
				{
					tempV=getgroup(out,"style","fill");
					if(tempV==color)
					color=" rgb(127, 127, 127)";
				}
				setgroup(out,"style", "fill:"+color);//+";stroke:"+color
			}
		}
		phase+=PhasesStructSize;
		phaseC++;
	}
}
function rcvphases3(Datos)
{
	var out="";
	if(Datos==null)
		return out;
	if(Datos.status!=200)
		return out;
	if(http.responseText.indexOf('invalid')!=-1)
		return out;
	var sts3=0;
	var lstX=-1;
	var sts2=0;
	var RTC=Datos.getResponseHeader("Content-Type");
	var count=RTC.indexOf("RTC:");
	if(count!=-1)
	{
		count+=4;
		RTC=RTC.substring(count);
		RTC=parseInt(RTC);
		RTC*=1000;
		dat = new Date(RTC);
		RTC+=(dat.getTimezoneOffset()*60000);
		var dat = new Date(RTC);
	}
	else
	var dat="";// */
	dat = new Date();
	Datos=Datos.responseText;
	if((Datos.length%PhasesStructSize)==0)
	{
		var PhObj=new Object();
		PhObj.Datos=Datos.slice();
		PhObj.Date=dat;
		PhHist.push(PhObj);
		PhHist.shift();
		if(PhHist[PhHist.length-1])
		{
			Datos=PhHist[PhHist.length-1].Datos.slice();
			dat=PhHist[PhHist.length-1].Date;
		}
		else
		{
			Datos=0;
			dat=""
		}
	}
	var count=0;
	var phase=0;
	var Y,X;
	var State=null;
	var phases=Datos.length;
	phases/=PhasesStructSize;
	var temp=0;
	var flags=0;
	var yspt=14;
	var currents=0;
	var sts=0;
	var dat1 = new Date();
	var dat2="";
	var out2="";
	//---------------------------------
	out="<svg width=\""+(fullscaleX+65)+"\" height=\""+(100+(yspt*phases))+"\" xmlns=\"http://www.w3.org/2000/svg\">\
	<title>"+Str_Phase_Status+" "+PhHist.length+" "+dat+"</title>\
	<defs>\
	<linearGradient id=\"grad1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\
	<stop offset=\"0%\" style=\"stop-color:rgb(255,255,250);stop-opacity:1\" />\
	<stop offset=\"100%\" style=\"stop-color:rgb(255,255,255);stop-opacity:0\" />\
	</linearGradient>\
	</defs>\
	<rect fill=\"#FFFFFF\" stroke=\"#FFFFFF\" x=\"1\" y=\"1\" width=\""+(fullscaleX+65)+"\" height=\""+(100+(yspt*phases))+"\" id=\"fondo\"/>";
	for(var phase=0;phase<phases;phase++)
	{
		//--------------------------------- PLC Number
		temp=Datos.substring((phase*PhasesStructSize)+16,(phase*PhasesStructSize)+18);
		currents=ByToSht(temp);
		tempV=Datos.charCodeAt((phase*PhasesStructSize)+3);
		tempV&=0x07;
		//--------------------------------- color
		tempV=Datos.charCodeAt((phase*PhasesStructSize)+0);
		out+="<text fill=\"#000000\" x=\""+(fullscaleX+3)+"\" y=\""+(22+(yspt*phase))+"\" stroke-width=\"0\" font-size=\"14\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">["+(phase+1)+"]"+(currents)+"mA</text>";
	}
	for(var temp=0;temp<(fullscaleX/Pxs);temp++)
	{
		if(PhHist[temp])
		{
			Datos=PhHist[temp].Datos;
			dat=PhHist[temp].Date;
		}
		else
		{
			Datos=0;
			dat=""
		}
		X=(fullscaleX-(Pxs*(PhHist.length-temp)))+5;
		sts=0;
		for(var phase=0;phase<phases;phase++)
		{
			if(Datos)
			tempV=Datos.charCodeAt((phase*PhasesStructSize)+0);
			else
			tempV=0;
			color="\"#404040\"";
			if ((tempV&0x07)==0x07)
			{
				tempV=Datos.charCodeAt((phase*PhasesStructSize)+2);
				//tempV=0x12;
			}
			if(tempV!=0)
			sts+=((tempV&7)<<(3*phase));
			if (tempV&1)color="\"#F00000\"";
			if (tempV&2)color="\"#D0D000\"";
			if (tempV&4)color="\"#00C000\"";
			Y=(20+(yspt*phase));
			if (tempV&0x30)
			{
				out+="<line id=\"svg_13\" y1=\""+Y+"\" x1=\""+X+"\" y2=\""+Y+"\" x2=\""+(X+(Pxs/4))+"\" stroke="+color+" fill=\"none\" stroke-width=\"6\"/>";
				out+="<line id=\"svg_13\" y1=\""+Y+"\" x1=\""+(X+(Pxs/2))+"\" y2=\""+Y+"\" x2=\""+(X+(Pxs/2)+(Pxs/4))+"\" stroke="+color+" fill=\"none\" stroke-width=\"6\"/>";
			}
			else
			{
				if((tempV&3)==3)
				{
					out+="<line id=\"svg_13\" y2=\""+(Y-2)+"\" x2=\""+(X+(Pxs))+"\" y1=\""+(Y-2)+"\" x1=\""+X+"\" stroke=\"#F00000\" fill=\"none\" stroke-width=\"4\"/>";
					out+="<line id=\"svg_13\" y2=\""+(Y+2)+"\" x2=\""+(X+(Pxs))+"\" y1=\""+(Y+2)+"\" x1=\""+X+"\" stroke=\"#D0D000\" fill=\"none\" stroke-width=\"4\"/>";
				}
				else
				{
					if((tempV&6)==6)
					{
						out+="<line id=\"svg_13\" y2=\""+(Y-2)+"\" x2=\""+(X+(Pxs))+"\" y1=\""+(Y-2)+"\" x1=\""+X+"\" stroke=\"#D0D000\" fill=\"none\" stroke-width=\"4\"/>";
						out+="<line id=\"svg_13\" y2=\""+(Y+2)+"\" x2=\""+(X+(Pxs))+"\" y1=\""+(Y+2)+"\" x1=\""+X+"\" stroke=\"#00C000\" fill=\"none\" stroke-width=\"4\"/>";
					}
					else
					{
						out+="<line id=\"svg_13\" y2=\""+Y+"\" x2=\""+(X+(Pxs))+"\" y1=\""+Y+"\" x1=\""+X+"\" stroke="+color+" fill=\"none\" stroke-width=\"8\"/>";
					}
				}
			}
		}
		if(sts3==0 && (sts&7)==4)
		{
			sts3=sts;
		}
		if(dat!="")
		{
			out+="<g transform=\"translate("+(X+8)+" "+(15+(yspt*(phases)))+")\"><text fill=\"#000000\" x=\"-5\" y=\"5\" transform=\"rotate(50)\" stroke-width=\"0\" font-size=\"9\" font-family=\"Monospace\" text-anchor=\"start\" xml:space=\"preserve\">-"+dat.getHours()+":"+dat.getMinutes()+":"+dat.getSeconds()+"</text></g>";
		}
	}
	out+="<rect fill=\"url(#grad1)\" stroke-width=\"0\" x=\"1\" y=\"1\" width=\""+(fullscaleX/6)+"\" height=\""+(100+(yspt*phases))+"\"/>";
	out+="</svg>";
	return out;
}

//=================================================
function rcvIOs(Datos)
{
	var out="";
	if(Datos==null)
		return out;
	if(Datos.status!=200)
		return out;
	if(http.responseText.indexOf('invalid')!=-1)
		return out;
	hindexO=hindex;
	hindex++;
	if(hindex>=Hsize)
	hindex=0;
	var temp="";
	var inidx=0;
	var itemp=0;
	Datos=Datos.responseText;
	if((Datos.length%StructSizeIO)!=0)
	return "";
	Number_Of_Inputs=(Datos.length/StructSizeIO)
	ioflags[hindex]= new Array(Number_Of_Inputs);
	tiempo[hindex]= new Array(Number_Of_Inputs);
	ocupacion[hindex]= new Array(Number_Of_Inputs);
	conteo[hindex]= new Array(Number_Of_Inputs);
	ioLTC[hindex]= new Array(Number_Of_Inputs);
	ioLT0[hindex]= new Array(Number_Of_Inputs);
	ioLT1[hindex]= new Array(Number_Of_Inputs);
	//----------------------------------------------------
	while(inidx<Number_Of_Inputs)
	{
		//--------------------------------- flags
		temp=Datos.substring(StructSizeIO*inidx+0,StructSizeIO*inidx+4);
		itemp=ByToInt(temp);
		ioflags[hindex][inidx]=itemp;
		IOs()[inidx].Type=(itemp&1);
		IOs()[inidx].Mode=((itemp>>14)&3);
		if(itemp&1)// es entrada?
		{
			//--------------------------------- Muestras
			temp=Datos.substring((StructSizeIO*inidx)+4,(StructSizeIO*inidx)+8);
			itemp=ByToInt(temp);
			tiempo[hindex][inidx]=itemp;
			//--------------------------------- ocupacion
			temp=Datos.substring((StructSizeIO*inidx)+8,(StructSizeIO*inidx)+12);
			itemp=ByToInt(temp);
			ocupacion[hindex][inidx]=itemp;
			//---------------------------------	count
			temp=Datos.substring((StructSizeIO*inidx)+12,(StructSizeIO*inidx)+16);
			itemp=ByToInt(temp);
			conteo[hindex][inidx]=itemp;
			//--------------------------------- LTC
			temp=Datos.substring((StructSizeIO*inidx)+16,(StructSizeIO*inidx)+20);
			itemp=ByToInt(temp);
			ioLTC[hindex][inidx]=itemp;
			//--------------------------------- LT0
			temp=Datos.substring((StructSizeIO*inidx)+20,(StructSizeIO*inidx)+24);
			itemp=ByToInt(temp);
			ioLT0[hindex][inidx]=itemp;
			//--------------------------------- LT1
			temp=Datos.substring((StructSizeIO*inidx)+24,(StructSizeIO*inidx)+28);
			itemp=ByToInt(temp);
			ioLT1[hindex][inidx]=itemp;
			LOG("["+inidx+",Input]T:"+tiempo[hindex][inidx]+" O:"+ocupacion[hindex][inidx]+" C:"+conteo[hindex][inidx]);
		}
		else
		{
			tiempo[hindex][inidx]=hindex;
			//----------------------------
			temp=Datos.substring(StructSizeIO*inidx+4,StructSizeIO*inidx+8);
			itemp=ByToInt(temp);
			tiempo[hindex][inidx]=itemp;
			//----------------------------
			temp=Datos.substring(StructSizeIO*inidx+8,StructSizeIO*inidx+12);
			itemp=ByToInt(temp);
			ocupacion[hindex][inidx]=itemp;
			conteo[hindex][inidx]=hindex;
			LOG("["+inidx+",Output]T:"+tiempo[hindex][inidx]+" O:"+(ocupacion[hindex][inidx]!=0));
		}
		inidx++;
	}
	if(hindexO!=-1)
	return	rcvIOs2();
	else
	return "";
}
function rcvIOs2()
{
	var out="";
	var temp=0;
	var Tcount=0;
	var Pcount=0;
	var out1="";
	var out2="";
	var out3="";
	var out4="";
	var ocup=0;
	var count=0;
	var times=0;
	//---------------------------------Title
	out1+="<tr>\n<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;"+Str_Title_io+"&#160;</b></font></td>\n";
	out2+="<tr>\n<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;"+Str_MN_Info+"&#160;</b></font></td>\n";
	out3+="<tr>\n<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;"+Str_Count+"&#160;</b></font></td>\n";
	out4+="<tr>\n<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;"+Str_Occupation+"&#160;</b></font></td>\n";
	while(Tcount<Number_Of_Inputs)
	{
		if(IOs()[Tcount].Name.indexOf("NoShw")==-1)
		{
			Pcount++;
			out1+="<td rowspan=\"4\" class=\"hrvert\" align=\"center\"></td>\n";
			out1+="<td align=\"center\" ><font color=\"#0aa\" size=\"2\" face=\"arial\"><b>"+IOs()[Tcount].Name+"</b></font></td>\n";//&#160;"+Pcount+"&#160;
			temp=ioflags[hindex][Tcount];
			if(ioflags[hindex] && ioflags[hindex][Tcount]&1)
			{
				out2+="<td align=\"center\"><font size=\"2\" face=\"arial\"><b>";
				if(IOs()[Tcount].Mode==0)
					out2+=Str_InputOnOff
				if(IOs()[Tcount].Mode==1)
					out2+=Str_InputF
				if(IOs()[Tcount].Mode==2)
					out2+=Str_InputAD
				if((ioflags[hindex][Tcount]&0x10)==0)
					out2+=Str_disabled+"<br/>";
				if(ioflags[hindex][Tcount]&0x20)
					out2+=+Str_Fail+"<br/>";
				temp=(temp>>8)&0x3F;
				if(temp&0x3F)
					out2+=Str_Priority+":";
				if(temp&1)
					out2+="1 ";
				if(temp&2)
					out2+="2 ";
				if(temp&4)
					out2+="3 ";
				if(temp&8)
					out2+="4";
				out2+="</b>&#160;</font></td>\n";
				//----------------------
				if(IOs()[Tcount].Mode==0)
				{
					count=(conteo[hindex][Tcount]-conteo[hindexO][Tcount]);
					out3+="<td align=\"center\"><font size=\"2\" face=\"arial\">&#160;"+count+"&#160;</font></td>\n";
				}
				if(IOs()[Tcount].Mode==2)
				{
					count=(conteo[hindex][Tcount]-conteo[hindexO][Tcount]);
					out3+="<td align=\"center\"><font size=\"2\" face=\"arial\">&#160;"+count+"&#160;</font></td>\n";
				}
				//----------------------
				out4+="<td align=\"center\"><font size=\"2\" face=\"arial\">&#160;";
				times=(tiempo[hindex][Tcount]-tiempo[hindexO][Tcount]);
				if(IOs()[Tcount].Mode==0)
				{
					out4+="%";
					ocup=(ocupacion[hindex][Tcount]-ocupacion[hindexO][Tcount]);
					if(times==0)
						if(ioflags[hindex][Tcount]&0x02)
							ocup=100;
						else
							ocup=0;
					else
						ocup=Math.round((1000*ocup)/times)/10;
				}
				if(IOs()[Tcount].Mode==2)
				{
					ocup=(ocupacion[hindex][Tcount]);
				}
				out4+=ocup;
				out4+="&#160;</font></td>\n";
			}
			else
			{
				out2+="<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;&#160;</b></font></td>\n";
				out3+="<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;"+ocupacion[hindex][Tcount]+"&#160;</b></font></td>\n";
				out4+="<td align=\"center\"><font size=\"2\" face=\"arial\"><b>&#160;&#160;</b></font></td>\n";
			}
		}
		Tcount++;
	}
	out1+="</tr>\n";
	out2+="</tr>\n";
	out3+="</tr>\n";
	out4+="</tr>\n";
	//-------------------------------
	out+="<hr/><br/>\n";
	out+="<table border=\"0\" align=\"center\" >\n";
	out+=out1;
	out+=out2;
	out+=out3;
	out+=out4;
	out+="</table>\n";
	return out;
}

//=================================================
function rcvLogs(Datos)
{
	if(Datos==null)
		return;
	if(Datos.status!=200)
		return;
	if(http.responseText.indexOf('invalid')!=-1)
		return;
	var temp="";
	var tempV=0;
	var count=0;
	Datos=Datos.responseText;
	document.getElementById("sample15Title").innerHTML="LOGS";//["+Datos.length+"]";
	temp=Datos.substring(0,4);
	tempV=ByToInt(temp);
	Datos=Datos.substring(4);
	if (LOG_Index>tempV)
	{
		temp=Datos.substring(LOG_Index);
		Datos=temp+Datos.substring(4,tempV);
	}
	else
	Datos=Datos.substring(LOG_Index,tempV);
	LOG_Index=tempV;
	count=Datos.length;
	document.getElementById("sizeofLog").innerHTML=count;
	if(!count)
	return;
	Datos=HTMLEncode(Datos);
	document.getElementById("LogTC").innerHTML+=Datos;
	count=document.getElementById("LogTC").innerHTML.length-20000;
	if(count>0)
	document.getElementById("LogTC").innerHTML=document.getElementById("LogTC").innerHTML.substring(count);
	document.getElementById("LogTC").scrollTop = document.getElementById("LogTCscc").offsetTop+document.getElementById('LogTC').scrollTop+55;
	LOGdirect(document.getElementById("LogTC").scrollTop +" "+ document.getElementById("LogTCscc").offsetTop);
}
function loadArq(Datos)
{
	Datos=Datos.responseText;
	Datos=Datos.substring(Datos.indexOf("<svg "));
	document.getElementById("DistFis").innerHTML=Datos;
	document.getElementById("sample8").style.width="420px"
	if (winList['sample8'])
	{
		winList['sample8'].open();
	}
}

//=================================================
function rcvInterprete(Datos)
{
	var out="";
	if(Datos==null)
		return out;
	if(Datos.status!=200)
		return out;
	if(http.responseText.indexOf('invalid')!=-1)
		return out;
	var StepName=["Run","Pause"];
	var temp="";
	var tempi=0;
	var pInterp=new Object();
	Datos=Datos.responseText;
	pInterp.run=Datos.charCodeAt(0);
	pInterp.script_file=Datos.substring(1,16);
	pInterp.script_file=pInterp.script_file.substring(0,pInterp.script_file.search("\0"));
	pInterp.reg=new Object();
	pInterp.reg.CurrentDate=Datos.substring(16,31);
	pInterp.reg.CurrentDate=pInterp.reg.CurrentDate.substring(0,pInterp.reg.CurrentDate.search("\0"));
	pInterp.reg.CurrentTable=Datos.substring(31,46);
	pInterp.reg.CurrentTable=pInterp.reg.CurrentTable.substring(0,pInterp.reg.CurrentTable.search("\0"));
	pInterp.reg.NexTime=Datos.substring(46,56);
	pInterp.reg.NexTime=pInterp.reg.NexTime.substring(0,pInterp.reg.NexTime.search("\0"));
	temp=Datos.substring(56,60);
	pInterp.reg.last_sync=ByToInt(temp);
	temp=Datos.substring(68,72);
	pInterp.reg.LSTCHG=ByToInt(temp);
	temp=Datos.substring(72,76);
	pInterp.reg.MCT=ByToInt(temp);
	temp=Datos.substring(76,80);
	pInterp.reg.NEXCHG=ByToInt(temp);

	temp=Datos.substring(92,96);
	pInterp.RTC=ByToInt(temp);	//utemp
	temp=Datos.substring(96,100);
	temp=ByToInt(temp)
	pInterp.StkIdx=(temp&7);
	pInterp.RunSync=(temp&8);
	temp=Datos.substring(104,108);
	pInterp.code_size=ByToInt(temp);
	pInterp.ptr_code= new Array();

	temp=Datos.substring(280,284);
	pInterp.ptr_code[0]=ByToInt(temp);
	temp=Datos.substring(284,288);
	pInterp.ptr_code[1]=ByToInt(temp);
	temp=Datos.substring(288,292);
	pInterp.ptr_code[2]=ByToInt(temp);
	temp=Datos.substring(292,296);
	pInterp.ptr_code[3]=ByToInt(temp);
	temp=Datos.substring(296,300);
	pInterp.StartCode=ByToInt(temp);
	pInterp.code=Datos.substring(300);
	//---------------------------------------------------------------------------------------------------------------
	temp=pInterp.code.substring((pInterp.ptr_code[pInterp.StkIdx]-pInterp.StartCode));
	tempi=temp.search("\0");
	temp=pInterp.code.substring(0,(pInterp.ptr_code[pInterp.StkIdx]-pInterp.StartCode)+tempi);
	temp+="«";
	temp+=pInterp.code.substring((pInterp.ptr_code[pInterp.StkIdx]-pInterp.StartCode)+tempi);
	pInterp.code=temp;
	pInterp.code=decompilador(pInterp.code);
	//---------------------------------------------------------------------------------------------------------------
	tempi=pInterp.code.search("«");
	temp=HTMLEncode(pInterp.code.substring(0,tempi));
	temp+="&#160;&#160;&#160;<b><font size=\"2\" face=\"arial\" color=\"#FFFFFF\">&#60;&#60;----["+(pInterp.ptr_code[pInterp.StkIdx]-pInterp.StartCode)+":"+(pInterp.RTC-pInterp.reg.last_sync)+"]</font></b>\n";
	temp+=HTMLEncode(pInterp.code.substring(tempi+1));
	pInterp.code=temp;
	//alert(pInterp.code);// */
	//---------------------------------------------------------------------------------------------------------------
	out+="<table border=\"0\" cellpadding=\"4\" cellspacing=\"0\" bgcolor=\"#000000\"  width=\"%100\">\n\
	<tr><td align=\"left\">\n\
	<div id=\"interpCode\" style=\"overflow:auto;height: 1050px; width: 500px;color:#00FF00;font-family:Terminal;font-size:8px;\" ondblclick=\"this.innerHTML='';\">\n";
	out+=pInterp.code;
	out+="</div>\n\
	</td><td align=\"left\">\n\
	<div id=\"interpVars\" style=\"overflow:auto;height: 1050px; width: 300px;color:#00FF00;font-family:Terminal;font-size:8px;\" >\n";
	out+="File Name ["+HTMLEncode(pInterp.script_file)+"]<br />\n";
	out+="Time Scheduler ["+HTMLEncode(pInterp.reg.CurrentTable)+"<br />\n";
	out+="Date ["+HTMLEncode(pInterp.reg.CurrentDate)+"]<br />\n";
	out+="Nex Time ["+HTMLEncode(pInterp.reg.NexTime)+"]<br />\n";
	out+="Step [";
	if(pInterp.run>1)
	out+=pInterp.run;
	else
	out+=StepName[pInterp.run];
	out+="]<br />\n";
	out+="LTS [";
	if(pInterp.reg.last_sync!=0)
	{
		temp=(pInterp.reg.last_sync+1)*1000;
		dat = new Date(temp);
		temp+=(dat.getTimezoneOffset()*60000);
		temp = new Date(temp);
	}
	else
	temp="";// */
	out+=temp;
	out+="]<br />\n";
	out+="RTC [";
	if(pInterp.RTC!=0)
	{
		temp=(pInterp.RTC)*1000;
		dat = new Date(temp);
		temp+=(dat.getTimezoneOffset()*60000);
		temp = new Date(temp);
	}
	else
	temp="";// */
	out+=temp;
	out+="]<br />\n";
	out+="RunTime ["+(pInterp.RTC-pInterp.reg.last_sync)+"]<br />\n";
	out+="Stack Deep ["+pInterp.StkIdx+"]<br />\n";
	out+="Run Sync ["+pInterp.RunSync+"]<br />\n";
	out+="Code size ["+pInterp.code_size+"]<br />\n";
	out+="ptr_code[Stkdeep]:"+pInterp.ptr_code[pInterp.StkIdx]+"<br />\n"; // */
	out+="Start Code:"+pInterp.StartCode+"<br />\n"; // */
	out+="MCT ["+(pInterp.reg.MCT)+"]<br />\n"; // */
	//-------------------------------
	out+="LSTCHG [";
	//out+=pInterp.reg.LSTCHG;
	temp=(pInterp.reg.LSTCHG)*1000;
	dat = new Date(temp);
	temp+=(dat.getTimezoneOffset()*60000);
	temp = new Date(temp);
	out+=temp;// */
	out+="]<br />\n";
	//-------------------------------
	out+="NEXCHG [";
	temp=(pInterp.reg.NEXCHG)*1000;
	dat = new Date(temp);
	temp+=(dat.getTimezoneOffset()*60000);
	temp = new Date(temp);
	out+=temp;
	out+="]<br />\n"; // */
	out+="</div>\n\
	</td></tr>\n\
	</table>\n";
	return out;
	/*	tempi=pInterp.code.search("----");
		temp=pInterp.code.split("\n");
		temp=temp.length+tempi;
		LOG(CtrlIdx+" "+temp);
		if(document.getElementById("dbgscrl").checked)
	document.getElementById("interpCode").scrollTop =(temp/8)+55;//+document.getElementById('interpCode').scrollTop // */
}

percent=28;
