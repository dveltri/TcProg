
function SetRemote()
{
	Reload|=0x100;
	if(GlobalParms().Model.indexOf("M3")!=-1)
	{
		HW_IOS=9;
		PhasesStructSize=56;
	}
	if(GlobalParms().Model.indexOf("M4")!=-1 || GlobalParms().Model.indexOf("GW")==-1)
	{
		HW_IOS=16;
		PhasesStructSize=60;
	}
}

function SendObj(obj)
{
	var out="";
	out+=obj.getOwnPropertyNames();
	if (typeof obj === 'object')
	{
		for(var o in obj)
		{
			out+=o.getOwnPropertyNames();
		}
	}
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendStartup(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	seek=0;
	var dt;
	UpFile="startup.ini"
	var ip=Prg.GlobalParms.ETH0;
	if(Prg.GlobalParms.ID)
		UpData+="ID "+Remplace(Prg.GlobalParms.ID," ","_")+"\n";
	else
		UpData+=Remplace("ID "+Prg.GlobalParms.ETH0+"\n",",",".");
	UpData+="MAC 00-01";
	for(var i=0;i<ip.length;i++)
	{
		ip[i]=parseInt(ip[i]);
		temp=""+ip[i].toString(16).toUpperCase();
		if(temp.length==1)
			UpData+="-0"+temp
		else
			UpData+="-"+temp
	}
	UpData+="\n";
	UpData+="Model "+Prg.GlobalParms.Model+"\n";
	if(Prg.GlobalParms.Version)
		UpData+="Ver "+Prg.GlobalParms.Version+"\n";
	UpData+=Remplace("ETH0 "+Prg.GlobalParms.ETH0+"\n",",",".");
	if(Prg.GlobalParms.Model.indexOf("M3")!=-1)
	{
		UpData+=Remplace("NETMASK0 "+Prg.GlobalParms.NETMASK+"\n",",",".");
	}
	else
	{
		UpData+=Remplace("NETMASK "+Prg.GlobalParms.NETMASK+"\n",",",".");
	}
	if(Prg.GlobalParms.Model.indexOf("M3")!=-1)
	{
		UpData+=Remplace("MACDGW "+Prg.GlobalParms.MACDGW+"\n",",","-");
	}
	else
	{
		UpData+=Remplace("DGW "+Prg.GlobalParms.DGW+"\n",",",".");
	}
	UpData+="LOG "+Prg.GlobalParms.LOG+"\n";
	UpData+="Flashing "+Prg.GlobalParms.Flashing+"\n";
	UpData+="FlasCA "+Prg.GlobalParms.FlasCA+"\n";
	UpData+="Loops "+Prg.GlobalParms.Loops+"\n";
	///UpData+="Loop Type "+Prg.GlobalParms.Loop_Type+"\n";
	UpData+="Virtual Inputs "+Prg.GlobalParms.Virtual_Inputs+"\n";
	UpData+="Inputs "+Prg.GlobalParms.Inputs+"\n";
	UpData+="Outputs "+Prg.GlobalParms.Outputs+"\n";
	UpData+="Phases "+Prg.GlobalParms.Phases+"\n";
	UpData+="Virtual Phases "+Prg.GlobalParms.Virtual_Phases+"\n";
	UpData+="Remote Phases 0\n";
	UpData+="Groups Phases "+Prg.GlobalParms.Groups_Phases+"\n";
	UpData+="Controllers "+Prg.GlobalParms.Controllers+"\n";
	UpData+="Time Out Electrical Error "+Prg.GlobalParms.Time_Out_Electrical_Error+"\n";
	UpData+="Time Out Consumption Error "+Prg.GlobalParms.Time_Out_Consumption_Error+"\n";
	UpData+="Alert Over Voltage "+Prg.GlobalParms.Alert_Over_Voltage+"\n";
	UpData+="Normal Voltage "+Prg.GlobalParms.Normal_Voltage+"\n";
	UpData+="Error Minimal Voltage "+Prg.GlobalParms.Error_Minimal_Voltage+"\n";
	UpData+="Error Critical Voltage "+Prg.GlobalParms.Error_Critical_Voltage+"\n";
	UpData+="Web Access Code Ro "+Prg.GlobalParms.Web_Access_Code_RO+"\n";
	UpData+="Web Access Code R/W "+Prg.GlobalParms.Web_Access_Code_RW+"\n";
	UpData+="Time Zone GMT "+Prg.GlobalParms.Time_Zone_GMT+"\n";
	if((Prg.GlobalParms.Model.indexOf("GW4")!=-1 || Prg.GlobalParms.Model.indexOf("GW")==-1 || Prg.GlobalParms.Model.indexOf("M3")!=-1))
	UpData+="Enable GPS "+Prg.GlobalParms.Enable_GPS+"\n";
	UpData+="Time Cap 0\n";
	UpData+="VoltDes "+Prg.GlobalParms.VoltDes+"\n";
	UpData+="VoltPen "+Prg.GlobalParms.VoltPen+"\n";
	if(Prg.GlobalParms.IniFsh)
		UpData+="IniFsh "+Prg.GlobalParms.IniFsh+"\n";
	else
		UpData+="IniFsh 5\n";
	if(Prg.GlobalParms.IniRed)
		UpData+="IniRed "+Prg.GlobalParms.IniRed+"\n";
	else
		UpData+="IniRed 3\n";
	if(Prg.GlobalParms.ATZ && (Prg.GlobalParms.Model.indexOf("GW4")!=-1 || Prg.GlobalParms.Model.indexOf("GW")==-1))
	{
		var ATZ=Prg.GlobalParms.ATZ.clone();
		for(var i=0;i<ATZ.length;i+=2)
		{
			dt = new Date(ATZ[i]+" 00:00:00 GMT+0:00");
			ATZ[i]=parseInt(dt.getTime()/1000);
		}
		UpData+="ATZ ";
		//UpData+="\n";
		for(var i=0;i<ATZ.length;i+=2)
		{
			for(var x=0;x<32;x+=8)
			{
				temp=(ATZ[i]>>x)&0xFF;
				temp=""+temp.toString(16).toUpperCase();
				if(temp.length==1)
					UpData+="&0"+temp;
				else
					UpData+="&"+temp;
			}
			//UpData+=" ";
			for(var x=0;x<32;x+=8)
			{
				temp=(ATZ[i+1]>>x)&0xFF;
				temp=""+temp.toString(16).toUpperCase();
				if(temp.length==1)
					UpData+="&0"+temp;
				else
					UpData+="&"+temp;
			}
			//UpData+="\n";
		}
		UpData+="\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function genPhc()
{
	var out="";
	var color=0;
	for(var j=0;j<PrgEd[SrcIdx].PHASEs.length;j++)
	{
		if(PrgEd[SrcIdx].PHASEs[j].FlagsWeb==0)
		{
			out+=""+PrgEd[SrcIdx].PHASEs[j].Numero;
			out+=","+Math.abs(PrgEd[SrcIdx].PHASEs[j].MskError);
			out+=","+PrgEd[SrcIdx].PHASEs[j].FState;
			out+=","+(PrgEd[SrcIdx].PHASEs[j].MiRT+(PrgEd[SrcIdx].PHASEs[j].AMiRT<<8));
			out+=" "+(PrgEd[SrcIdx].PHASEs[j].MiYT+(PrgEd[SrcIdx].PHASEs[j].AMiYT<<8));
			out+=" "+(PrgEd[SrcIdx].PHASEs[j].MiGT+(PrgEd[SrcIdx].PHASEs[j].AMiGT<<8));
			out+=","+PrgEd[SrcIdx].PHASEs[j].MaRT;
			out+=" "+PrgEd[SrcIdx].PHASEs[j].MaYT;
			out+=" "+PrgEd[SrcIdx].PHASEs[j].MaGT;
			out+=","+PrgEd[SrcIdx].PHASEs[j].TOEE;
			out+=","+PrgEd[SrcIdx].PHASEs[j].TOEC;
			out+=","
			color=255;
			for(var i=0;i<PrgEd[SrcIdx].PHASEs[j].R2V.length;i++)
			{
				if(color!=PrgEd[SrcIdx].PHASEs[j].R2V[i])
				{
					color=PrgEd[SrcIdx].PHASEs[j].R2V[i];
					out+="R"+color+":"+(PrgEd[SrcIdx].PHASEs[j].R2V.length-i);
				}
			}
			out+="R4:0";
			color=255;
			for(var i=0;i<PrgEd[SrcIdx].PHASEs[j].V2R.length;i++)
			{
				if(color!=PrgEd[SrcIdx].PHASEs[j].V2R[i])
				{
					color=PrgEd[SrcIdx].PHASEs[j].V2R[i];
					out+="V"+color+":"+(PrgEd[SrcIdx].PHASEs[j].V2R.length-i);
				}
			}
			out+="V1:0";
			out+=","+PrgEd[SrcIdx].PHASEs[j].PotLR;
			out+=" "+PrgEd[SrcIdx].PHASEs[j].PotLY;
			out+=" "+PrgEd[SrcIdx].PHASEs[j].PotLG;
			out+=","+PrgEd[SrcIdx].PHASEs[j].Type;
			out+=","+PrgEd[SrcIdx].PHASEs[j].Name;
			out+="\n";
		}
	}
	return out;
}
function genEv()
{
	var out="";
	var Tout="";
	var Ttime=0;
	var j=0;
	if(!PrgEd[SrcIdx].PLCs[PlcIdx])
	 return "";
	for(var x=0;x<PrgEd[SrcIdx].PLCs[PlcIdx].Phases.length;x++)
	{
		j=PrgEd[SrcIdx].PLCs[PlcIdx].Phases[x];
		if(PrgEd[SrcIdx].PHASEs[j].FlagsWeb==0)
		{
			out+=""+PHASEs[j].Numero;
			out+=",";
			out+=",";
			out+=",";
			out+=",";
			out+=",";
			out+=",";
			out+=",";
			color=255;
			for(var i=0;i<PrgEd[SrcIdx].PHASEs[j].R2V.length;i++)
			{
				if(color!=PrgEd[SrcIdx].PHASEs[j].R2V[i])
				{
					color=PrgEd[SrcIdx].PHASEs[j].R2V[i];
					out+="R"+color+":"+(PrgEd[SrcIdx].PHASEs[j].R2V.length-i);
				}
			}
			out+="R4:0";
			color=255;
			for(var i=0;i<PrgEd[SrcIdx].PHASEs[j].V2R.length;i++)
			{
				if(color!=PrgEd[SrcIdx].PHASEs[j].V2R[i])
				{
					color=PrgEd[SrcIdx].PHASEs[j].V2R[i];
					out+="V"+color+":"+(PrgEd[SrcIdx].PHASEs[j].V2R.length-i);
				}
			}
			out+="V1:0";
			out+=",";
			out+=",";
			out+="\n";
		}
	}
	return out;
}
function SendPhConf(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	//SetPhConf(Prg.GlobalParms.phconf);
	UpData=Prg.GlobalParms.phconf+"\n";
	UpFile="phconf.ini"
	seek=0;
	return UpData;
}
function SendEv(Prg)
{
	UpMode=0;
	UpPath="/"+PlcIdx;
	UpType="txt";
	UpData="";
	if(PlcIdx<Prg.PLCs.length)
	{
		if(CEV<Prg.PLCs[PlcIdx].EV.length)
		{
			UpData=Prg.PLCs[PlcIdx].EV[CEV]+"\n";
			UpMode=10;
		}
	}
	UpFile="phc"+(CEV+1)+".ini"
	seek=0;
	//alert(UpData);UpMode=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendPlc(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="plcs.ini"
	seek=0;
	for(var count=0;count<Prg.PLCs.length;count++)
	{
		UpData+="\n";
		UpData+="Number:"+Prg.PLCs[count].Number+"\n";
		UpData+="Name:"+Prg.PLCs[count].Name+"\n";
		UpData+="Plan:"+Prg.PLCs[count].Plan+"\n";
		UpData+="Flashing:"+Prg.PLCs[count].Flashing+"\n";
		UpData+="SyncRef:"+Prg.PLCs[count].SyncRef+"\n";
		UpData+="Scheduler:"+Prg.PLCs[count].Scheduler+"\n";
		UpData+="Location:"+Prg.PLCs[count].Location+"\n";
		UpData+="Server:"+Prg.PLCs[count].Server+"\n";
		UpData+="Phases:,"+Prg.PLCs[count].Phases+"\n";
		UpData+="Phase1:"+Prg.PLCs[count].Phase1+"\n";
		UpData+="Error Out:"+Prg.PLCs[count].ErrorOut+"\n";
		UpData+="Sec:"+Remplace(Prg.PLCs[count].Sec,'//','/')+"\n";
		UpData+="Svg:"+Prg.PLCs[count].Svg+"\n";
		for(var i=0;i<Prg.PLCs[count].Sts.length;i++)
		{
			RemoveUnusedItem(Prg.PLCs[count].Sts[i].Colors);
			UpData+="Sts:"+Prg.PLCs[count].Sts[i].Colors+"."/*+Prg.PLCs[count].Sts[i].TMAX+"."+Prg.PLCs[count].Sts[i].TMIN*/+"\n";
		}
	}
	//alert(UpData);
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendOPCT(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="OPCT.ini"
	seek=0;
	for(var i=0;i<Prg.OPCT.length;i++)
	{
		for(var j=0;j<(Prg.OPCT[i].length-1);j++)
		{
			UpData+=Prg.OPCT[i][j]+":";
		}
		UpData+=Prg.OPCT[i][j]+"\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendIP(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="ip.ini";
	for(var count=0;count<Prg.Links.length;count++)
	{
		UpData+=Prg.Links[count][0]
		for(var seek=1;seek<Prg.Links[count].length;seek++)
		{
			UpData+=","+Prg.Links[count][seek];
		}
		UpData+="\n";
	}
	seek=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendDGV(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	seek=0;
	UpFile="dgvsoft.ini"
	UpData=DgvSoft;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendDgvP(Prg)
{
	var rslt="";
	UpMode=10;
	UpPath="/";
	UpType="txt";
	seek=0;
	UpFile="dgvp.ini"
	UpData=obj2txt("DgvP",Prg.DgvP);
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendSdgvP(Prg)
{
	var temp="";
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpFile="sdgvp.ini"
	//UpData=obj2txt("SDgvP",Prg.SDgvP);
	UpData ="SDgvP.Link="+Prg.SDgvP.Link+"\n"
	UpData+="SDgvP.SrvId="+Prg.SDgvP.SrvId+"\n"
	UpData+="SDgvP.debug="+Prg.SDgvP.Debug+"\n"
	if(Prg.SDgvP.Tsk)
	{
		for(var idx=0;idx<Prg.SDgvP.Tsk.length;idx++)
		{
			UpData+="SDgvP.Tsk"+idx+","+Prg.SDgvP.Tsk[idx].Period+",20,"+Prg.SDgvP.Tsk[idx].IDsrv+",255,"+Prg.SDgvP.Tsk[idx].Sck+","+Prg.SDgvP.Tsk[idx].Sck+",0,0,0";
			switch(Prg.SDgvP.Tsk[idx].Sck)
			{
				case 2:
				{
					UpData+=",0,0,0,0";
				}
				break;
				case 252:
				{
					for(var i=0;i<Prg.SDgvP.Tsk[idx].cmps.length;i++)
					{
						if(Prg.GlobalParms.Model.indexOf("M3")!=-1)
						{
							seek=DgvPM3.indexOf(Prg.SDgvP.Tsk[idx].cmps[i]);
							if(seek!=-1)
							{
								temp+=DgvPM3[seek+1];
							}
						}
						if(Prg.GlobalParms.Model.indexOf("M4")!=-1)
						{
							seek=DgvPM4.indexOf(Prg.SDgvP.Tsk[idx].cmps[i]);
							if(seek!=-1)
							{
								temp+=DgvPM4[seek+1];
							}
						}
					}
					seek=temp.split(",").length-1;
					UpData+=","+(seek&0x000000FF);
					UpData+=","+(seek&0x0000FF00);
					UpData+=","+(seek&0x00FF0000);
					UpData+=","+(seek&0xFF000000);
					UpData+=temp
				}
				break;
			}
			UpData+="\n"
		}
	}// */
	seek=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendIteris()
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="iteris.ini"
	seek=0;
	for(var i=0;i<Iteris.length;i++)
	{
		for(var j=0;j<(Iteris[i].length-1);j++)
		{
			UpData+=Iteris[i][j]+":";
		}
		UpData+=Iteris[i][j]+"\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendGPS(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="gps.ini"
	UpData=obj2txt("GPS",Prg.GPS);
	seek=0;
	/*for(var i=0;i<Prg.GPS.length;i++)
	{
		for(var j=0;j<(Prg.GPS[i].length-1);j++)
		{
			UpData+=Prg.GPS[i][j]+":";
		}
		UpData+=Prg.GPS[i][j]+"\n";
	}// */
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendNTP(Prg)
{
	if(!Prg.NTP)
		return "";
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="ntp.ini"
	seek=0;
	UpData=obj2txt("NTP",Prg.NTP);
	/*for(var i=0;i<Prg.NTP.length;i++)
	{
		for(var j=0;j<(Prg.NTP[i].length-1);j++)
		{
			UpData+=Prg.NTP[i][j]+":";
		}
		UpData+=Prg.NTP[i][j]+"\n";
	}// */
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendErrCfg(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="error.ini"
	seek=0;
	for(var i=0;i<Prg.ErrorsCfg.length;i++)
	{
		if(Prg.ErrorsCfg[i][0])
		{
			if(Prg.ErrorsCfg[i][1])
			{
				UpData+=Prg.ErrorsCfg[i][0];
				if(Prg.ErrorsCfg[i][2])
					UpData+=Prg.ErrorsCfg[i][2];
				else
					UpData+=":";
				UpData+=Prg.ErrorsCfg[i][1]+"\n";
			}
		}
	}
	//alert(UpData);
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendMaster(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="master.ini"
	seek=0;
	for(var i=0;i<Prg.mstr.length;i++)
	{
		for(var j=0;j<(Prg.mstr[i].length-1);j++)
		{
			UpData+=Prg.mstr[i][j]+":";
		}
		UpData+=Prg.mstr[i][j]+"\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendDefIn(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="def_in.ini"
	seek=0;
	for(var i=0;i<Prg.DefIn.length;i++)
	{
		for(var j=0;j<(Prg.DefIn[i].length-1);j++)
		{
			UpData+=Prg.DefIn[i][j]+":";
		}
		UpData+=Prg.DefIn[i][j]+"\n";
	}
	for (var i=0; i<Prg.IOs.length; i++)
	{
		UpData+="I/O:"+i;
		UpData+=","+Prg.IOs[i].Enable;
		UpData+=","+Prg.IOs[i].Type;
		UpData+=","+Prg.IOs[i].neg;
		UpData+=","+Prg.IOs[i].Flank;
		UpData+=","+Prg.IOs[i].TimeOut;
		UpData+=","+Prg.IOs[i].FailSts;
		UpData+=","+Prg.IOs[i].Plcs;
		UpData+=","+Prg.IOs[i].Name;
		UpData+="\n";
	}
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==

function SendOTU(Prg)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="OTU.ini"
	seek=0;
	UpData+="Comm:"+Prg.OTU.Link+"\n";
	UpData+="G1G2:"+Prg.OTU.G1G2+"\n";
	UpData+="\n";
	if(Prg.OTU.CftPLCs.length)
	{
		Prg.OTU.CftPLCs.length=Prg.GlobalParms.Controllers;
		for(var i=0;i<Prg.GlobalParms.Controllers;i++)
		{
			UpData+="CFT"+i+":"
			if(Prg.OTU.CftPLCs[i])
			{
				if(Prg.OTU.CftPLCs[i].length)
				{
					if(Prg.OTU.CftPLCs[i][0].length)
					{
						if(Prg.OTU.CftPLCs[i][0][0]>0 && Prg.OTU.CftPLCs[i][0][1]>0)
						{
							UpData+=Prg.OTU.CftPLCs[i][0][0]+"a"+Prg.OTU.CftPLCs[i][0][1];
							for(var j=1;j<Prg.OTU.CftPLCs[i].length;j++)
							{
								if(Prg.OTU.CftPLCs[i][j].length)
								if(Prg.OTU.CftPLCs[i][j][0]>0 && Prg.OTU.CftPLCs[i][j][1]>0)
								UpData+=","+Prg.OTU.CftPLCs[i][j][0]+"a"+Prg.OTU.CftPLCs[i][j][1];
							}
						}
					}
				}
			}
			UpData+="\n";
		}
		UpData=Remplace(UpData,",\n","\n");
	}
	else
		UpData+="//CFT:\n";	
	UpData+="\n";
	for(var i=0;i<Prg.OTU.BitCofigRx.length;i++)
	{
		UpData+="Rx"+Prg.OTU.BitCofigRx[i].NBit+","+Prg.OTU.BitCofigRx[i].Fnc+","+Prg.OTU.BitCofigRx[i].Parms+"\n";
	}
	UpData+="\n";
	for(var i=0;i<Prg.OTU.BitCofigTx.length;i++)
	{
		UpData+="Tx"+Prg.OTU.BitCofigTx[i].NBit+","+Prg.OTU.BitCofigTx[i].Fnc+","+Prg.OTU.BitCofigTx[i].Parms+"\n";
	}
	if(Prg.OTU.FO)
	UpData+="Tx"+(Prg.OTU.FO-1)+",FO\n";
	//alert(UpData);UpMode=0;
	return UpData;
}
function SendOTUPlan(OTUPlan)
{
	UpMode=10;
	UpPath="/"+PlcIdx;
	UpType="txt";
	UpData="";
	if(!OTUPlan)
	 return "";
	if(OTUPlan.OTUSEQSTS.length==0)OTUPlan.OTUSEQSTS[0]=0;
	if(OTUPlan.OTUDEMSTS.length==0)OTUPlan.OTUDEMSTS[0]=0;
	if(OTUPlan.OTUSTSDEM.length==0)OTUPlan.OTUSTSDEM[0]=0;
	if(OTUPlan.OTUDEMCLR.length==0)OTUPlan.OTUDEMCLR[0]=0;
	UpData+="OTUSEQSTS:"+OTUPlan.OTUSEQSTS.toString()+"\n";
	UpData+="OTUDEMSTS:"+OTUPlan.OTUDEMSTS.toString()+"\n";
	UpData+="OTUSTSDEM:"+OTUPlan.OTUSTSDEM.toString()+"\n";
	UpData+="OTUDEMCLR:"+OTUPlan.OTUDEMCLR.toString()+"\n";
	UpFile="planotu.es3"
	seek=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendMcPlan(McPlan)
{
	if(!McPlan)
		return "";
	if(McPlan.SYCPLCTOU==0)McPlan.SYCPLCTOU=60000;
	if(McPlan.MACSEQSTP.length==0)McPlan.MACSEQSTP[0]=0;
	if(McPlan.MACSTSSTP.length==0)McPlan.MACSTSSTP[0]=1;
	UpMode=10;
	UpPath="/"+PlcIdx;
	UpType="txt";
	UpData="";
	UpData+="SYCPLCTOU:"+McPlan.SYCPLCTOU.toString()+"\n";
	UpData+="MACSEQSTP:"+McPlan.MACSEQSTP.toString()+"\n";
	UpData+="MACSTSSTP:"+McPlan.MACSTSSTP.toString()+"\n";
	UpFile="planmc.es3"
	seek=0;
	return UpData;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==

//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SendPlanAI(Prg)
{
	var tp=[];
	var t2s=[];
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="autoini.eil"
	var Sts=Prg.PLCs[PlcIdx].Sts;
	var Plans=Prg.PLCs[PlcIdx].Plans;
	var Parms=Prg.GlobalParms;
	var DemTyp;
	var DemNum;
	var DemClr;
	//if(!Prg.PLCs[PlcIdx])return "";
	//SelIObyModel(Parms.Model);
	UpData+="tmp=XXXX\n";
	UpData+="mov 0 tmp\n";
	UpData+="mov 15 dbug\n";
	UpData+="//------------------------\n";
	UpData+="new PLAN uint8 1\n";
	UpData+="new MODE uint8 1\n";
	UpData+="//------------------------\n";
	UpData+="new FFT uint32 1\n";
	UpData+="new RRT uint32 1\n";
	UpData+="//------------------------\n";
	if(Parms.IniFsh)
		UpData+="mov "+(Parms.IniFsh*1000)+" FFT\n";
	else
		UpData+="mov 5000 FFT\n";
	if(Parms.IniRed)
		UpData+="mov "+(Parms.IniRed*1000)+" RRT\n";
	else
		UpData+="mov 3000 RRT\n";
	UpData+="//------------------------\n";
	UpData+="new TYP uint8 "+Plans.length+"\n";
	UpData+="new EV uint8 "+Plans.length+"\n";
	UpData+="new TC uint32 "+Plans.length+"\n";
	UpData+="new OF uint32 "+Plans.length+"\n";
	UpData+="new TP uint32 "+(Sts.length+1)+"\n";
	UpData+="new T2S uint32 "+(Sts.length+1)+"\n";
	UpData+="new DemTyp uint8 "+Sts.length+"\n";
	UpData+="new DemNum uint8 "+Sts.length+"\n";
	UpData+="new DemClr uint8 "+Sts.length+"\n";
	UpData+="new SEQ uint8 "+Sts.length+"\n";
	//UpData+="new STS uint8 "+Sts.length+"\n";
	UpData+="//------------------------\n";
	UpData+="new TPv var* "+Plans.length+"\n";
	UpData+="new T2Sv var* "+Plans.length+"\n";
	UpData+="new DemTypv var* "+Plans.length+"\n";
	UpData+="new DemNumv var* "+Plans.length+"\n";
	UpData+="new DemClrv var* "+Plans.length+"\n";
	UpData+="new SEQv var* "+Plans.length+"\n";
	UpData+="new STSv var* "+Sts.length+"\n";
	UpData+="//------------------------\n";
	UpData+="new STSLOF uint8 FPHASES\n";
	UpData+="mov ,0,0,0,0,0,0 STSLOF\n";
	UpData+="new STSFF uint8 FPHASES\n";
	UpData+="mov ,7,7,7,7,7,7 STSFF\n";
	UpData+="new STSRED uint8 FPHASES\n";
	UpData+="mov ,1,1,1,1,1,1 STSRED\n";
	for (var i=0; i<Sts.length; i++)
	{
		UpData+="new STS"+(i+1)+" uint8 FPHASES\n";
		UpData+="mov ,"+Sts[i].Colors.toString()+" STS"+(i+1)+"\n";
		UpData+="alias STSv["+i+"] STS"+(i+1)+"\n";
	}
	UpData+="//------------------------\n";
	UpData+="new TCv uint32 "+Plans.length+"\n";
	UpData+="new OFv uint32 "+Plans.length+"\n";
	UpData+="new EVv uint8 "+Plans.length+"\n";
	UpData+="new TYPv uint8 "+Plans.length+"\n";
	for (var i=0; i<Plans.length; i++)
	{
		UpdateTimes(Prg.PLCs[PlcIdx],Plans[i])
		DemTyp="mov ";
		DemNum="mov ";
		DemClr="mov ";
		for(var s=0;s<Sts.length;s++)
		{
			t2s[s]=parseInt("0"+Plans[i].T2S[s])*1000;
			tp[s]=parseInt("0"+Plans[i].TP[s])*1000;
			DemTyp+=","+Plans[i].Dem[s].Typ;
			DemNum+=","+Plans[i].Dem[s].Num;
			DemClr+=","+Plans[i].Dem[s].Clr;
		}
		UpData+="new DemTyp"+(i+1)+" uint8 "+Sts.length+"\n";
		UpData+=DemTyp+" DemTyp"+(i+1)+"\n";
		UpData+="new DemNum"+(i+1)+" uint8 "+Sts.length+"\n";
		UpData+=DemNum+" DemNum"+(i+1)+"\n";
		UpData+="new DemClr"+(i+1)+" uint8 "+Sts.length+"\n";
		UpData+=DemClr+" DemClr"+(i+1)+"\n";
		UpData+="mov "+Plans[i].Typ+" TYP["+i+"]\n";
		UpData+="mov "+(Plans[i].TC*1000)+" TC["+i+"]\n";
		UpData+="mov "+(Plans[i].OF*1000)+" OF["+i+"]\n";
		UpData+="new TP"+(i+1)+" uint32 "+Sts.length+"\n";
		UpData+="mov ,"+tp.toString()+" TP"+(i+1)+"\n";
		UpData+="new T2S"+(i+1)+" uint32 "+Sts.length+"\n";
		UpData+="mov ,"+t2s.toString()+","+(Plans[i].TC*1000)+" T2S"+(i+1)+"\n";
		UpData+="new SEQ"+(i+1)+" uint8 "+Sts.length+"\n";
		UpData+="mov ,"+Plans[i].SEQ.toString()+" SEQ"+(i+1)+"\n";
	}
	for (var i=0; i<Plans.length; i++)
	{
		UpData+="alias TPv["+i+"] TP"+(i+1)+"\n";
		UpData+="alias T2Sv["+i+"] T2S"+(i+1)+"\n";
		UpData+="alias DemTypv["+i+"] DemTyp"+(i+1)+"\n";
		UpData+="alias DemNumv["+i+"] DemNum"+(i+1)+"\n";
		UpData+="alias DemClrv["+i+"] DemClr"+(i+1)+"\n";
		UpData+="alias SEQv["+i+"] SEQ"+(i+1)+"\n";
	}
	UpData+="//------------------------\n";
	UpData+="end\n";
	seek=0;
	return UpData;
}

function SendPlan98A(Prg)
{
	UpMode=10;
	UpPath="/0";
	UpType="txt";
	UpData="";
	UpFile="plan98.eil"
	if(!PLCs[PlcIdx])
		return "";
	SelIObyModel(Prg.GlobalParms.Model);
	if(Prg.GlobalParms.Model.indexOf("M3")!=-1)
		UpData="#CFT:sec.sec;\n";
	else
		UpData="#CFT:"+Prg.PLCs[PlcIdx].Sec.replace("//","/")+";\n";
	UpData+="\
	#MCT:;\n\
	phases ,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16\n\
	delay 2000\n\
	phases ,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7\n\
	mov 0 temp;\n\
	loop1;\n";
	UpData+="\tmov 1 PLC[temp].service\n";
	UpData+="\tmov 15 PLC[temp].dbug\n\
	add 1 temp;\n";
	UpData+="< temp CPLCS loop1;\n";
	if(SwEnMc!=0)
		UpData+="mov 0 io["+SwEnMc+"].fail\n";
	for (var i=0; i<Prg.IOs.length && i<(Prg.GlobalParms.HwIo+Prg.GlobalParms.Inputs+Prg.GlobalParms.Loops); i++)
	{
		if(Prg.IOs[i].Enable==0)
			UpData+="mov 0 io["+i+"].enable\n";
		else
		{
			if((Prg.IOs[i].Type&3)==2)
			{
				UpData+="mov 0 io["+i+"].type\n";
			}
			else
			{
				if(Prg.IOs[i].neg!=0)
					UpData+="mov 1 io["+i+"].neg\n";
				if(Math.round(Prg.IOs[i].TimeOut/256)!=0)
					UpData+="mov "+Math.round(Prg.IOs[i].TimeOut/256)+" io["+i+"].timef\n";
				if(Prg.IOs[i].FailSts==0)
					UpData+="mov 0 io["+i+"].inf\n";
				if(Prg.IOs[i].Plcs!=0)
					UpData+="mov "+Prg.IOs[i].Plcs+" io["+i+"].plcs\n"; 
			}
			if((Prg.IOs[i].Type&3)==0)
			{
				UpData+="mov 0 io["+i+"].type\n";
			}
		}
	}
	//UpData+="phases ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0;\n\
	//delay 100\n";
	for (var i=0; i<Prg.IOs.length && i<(Prg.GlobalParms.HwIo+Prg.GlobalParms.Inputs+Prg.GlobalParms.Loops); i++)
	{
		if(Prg.IOs[i].Enable!=0)
			if((Prg.IOs[i].Type&3)==2)
				UpData+="mov 0 io["+i+"].val\n";
	}
	if(SwFF!=0)
		UpData+="mov 0 io["+SwFF+"].fail	//SwFF\n";
	if(SwEnMc!=0)
		UpData+="mov 0 io["+SwEnMc+"].fail	//SwEnMc\n";
	if(SwCmMc!=0)
		UpData+="mov 0 io["+SwCmMc+"].fail	//SwCmMc\n";
	UpData+="INICIO\n";
	if(Prg.GlobalParms.Model.indexOf("RT")!=-1)
	{
		UpData+="mov 0 otu.mc\n";
	}
	if(Prg.GlobalParms.Model.indexOf("RT")!=-1)
	{
		UpData+="mov 1 otu.fr\n";
	}
	UpData+="mov 3 PLC[THIS].NexChg;\n";
	UpData+="phases ,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7\n";
	if(Prg.GlobalParms.IniFsh)
		UpData+="delay "+(Prg.GlobalParms.IniFsh*1000)+"\n";
	else
		UpData+="delay 5000\n";
	if(Prg.GlobalParms.Model.indexOf("RT")!=-1)
	{
		UpData+="mov 0 otu.fr\n";
	}
	UpData+="phases ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1;\n";
	if(Prg.GlobalParms.IniRed)
		UpData+="delay "+(Prg.GlobalParms.IniRed*1000)+"\n";
	else
		UpData+="delay 3000\n";
	UpData+="agenda\n";
	UpData+="ldeil\n\
	goto INICIO\n\
	#VAR;\n\
	temp=XXXX;\n\
	end\n";
	//UpData=compilador(UpData);
	seek=0;
	return UpData;
}

function SendPlan99(Prg)
{
	var out="";
	UpMode=10;
	UpPath="/0";
	UpType="txt";
	UpFile="plan99.eil"
	if(Prg.GlobalParms.Model.indexOf("M3")!=-1)
		out+="#CFT:sec.sec;\n";
	else
		out+="#CFT:"+Prg.PLCs[PlcIdx].Sec.replace("//","/")+";\n";
	out+="#MCT:\n\
	phases ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n";
	if(Prg.GlobalParms.IniRed)
		out+="delay "+(Prg.GlobalParms.IniRed*1000)+"\n";
	else
		out+="delay 3000\n";
	out+="INICIO\n\
	mov 3 PLC[THIS].NexChg\n\
	agenda\n\
	phases ,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7\n\
	delay 10000\n\
	ldeil\n\
	goto INICIO\n\
	end\n";
	UpData=out;
	//UpData=compilador(UpData);
	seek=0;
	return out;
}
function SendPlan97(Prg)
{
	var out="";
	UpMode=10;
	UpPath="/0";
	UpType="txt";
	UpFile="plan97.eil"
	if(Prg.GlobalParms.Model.indexOf("M3")!=-1)
		out+="#CFT:sec.sec;\n";
	else
		out+="#CFT:"+Prg.PLCs[PlcIdx].Sec.replace("//","/")+";\n";
	out+="#MCT:\n\
	phases ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n";
	if(Prg.GlobalParms.IniRed)
		out+="delay "+(Prg.GlobalParms.IniRed*1000)+"\n";
	else
		out+="delay 3000\n";
	out+="INICIO\n\
	mov 3 PLC[THIS].NexChg\n\
	agenda\n\
	phases ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n\
	delay 10000\n\
	ldeil\n\
	goto INICIO\n\
	end\n";
	UpData=out;
	//UpData=compilador(UpData);
	seek=0;
	return out;
}
percent=25;
