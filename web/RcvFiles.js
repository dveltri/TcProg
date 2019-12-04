function SelIObyModel(MODEL)
{
	var out="";
	//-------- M3
	SwFF=7;
	SwCmMc=8;
	SwEnMc=9;
	OutAdv=10;
	OutMc=11;
	OutRemote=12;
	//-----------
	if(MODEL.indexOf("GW1")!=-1)
	{
		SwFF=0;
		OutAdv=0;
		OutMc=0;
		OutRemote=0;
	}
	if(MODEL.indexOf("GW2M4")!=-1)
	{
		SwFF=11;
		OutAdv=2;
		OutMc=0;
		OutRemote=0;
	}
	if(MODEL.indexOf("GW3M3")!=-1)
	{
		OutAdv = 10;
		OutMc = 11;
		OutRemote = 12;
		SwFF = 14;
		SwEnMc = 15;	//plug
		SwCmMc = 16;	//comando
	}
	if(MODEL.indexOf("GW3M4")!=-1)
	{
		OutAdv=17;
		OutMc=18;
		OutRemote=19;
		SwFF=21;
		SwEnMc=22;	//plug
		SwCmMc=23;	//comando
	}
	if(MODEL.indexOf("GW4")!=-1)
	{
		OutAdv=9;
		OutMc=10;
		OutRemote=11;
		//Porta1=12;
		//Porta2=13;
		SwFF=14;
		SwEnMc=15;
		SwCmMc=16;
	}
	if(GlobalParms.MODEL.indexOf("MSTC-V1M3")!=-1)
	{
		OutAdv = 0;
		OutMc = 0;
		OutRemote = 0;
		SwFF = 13;
		SwEnMc = 0;	//plug
		SwCmMc = 0;	//comando
	}
	if(MODEL.indexOf("SAD-V1")!=-1)
	{
		OutAdv=0;
		OutMc=0;
		OutRemote=0;
		//Porta2=12;
		//Porta1=13;
		SwFF=12;
		SwEnMc=8;
		SwCmMc=9;
	}
	if(MODEL.indexOf("SAD-V2")!=-1)
	{
		OutAdv=0;
		OutMc=0;
		OutRemote=0;
		//Porta2=12;
		//Porta1=13;
		SwFF=12;
		SwEnMc=8;
		SwCmMc=9;
	}
	if(MODEL.indexOf("SAD-V3")!=-1)
	{
		OutAdv=0;
		OutMc=0;
		OutRemote=0;
		//Porta2=12;
		//Porta1=13;
		SwFF=12;
		SwEnMc=8;
		SwCmMc=9;
	}
	if(MODEL.indexOf("DGV-uTC1-M4")!=-1)
	{
	}
	if(MODEL.indexOf("RT")!=-1 || MODEL.indexOf("GW3")!=-1 || MODEL.indexOf("GW4")!=-1)
	{
		out+="mov 0 otu.fr\n";
		out+="mov 0 otu.sr\n";
	}
	return out;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvStartup(Datos)
{
	Datos=Datos.responseText;
	var temp;
	var i=0;
	var j=0;
	GlobalParms= new Object();
	Datos=Datos.split("\n");
	while(i<Datos.length)
	{
		Datos[i]=RemoveUnuseChar(Datos[i]);
		Datos[i]=Datos[i].trim();
		if(Datos[i]=="")
		{
			Datos.splice(i,1);
		}
		else
		{
			temp = Datos[i].lastIndexOf(" "); 
			Datos[i]=Datos[i].substring(0,temp)+"^"+Datos[i].substring(temp+1);
			Datos[i]=Datos[i].split("^");
			i++;
		}
	}
	if(!GlobalParms.IniFsh)
		GlobalParms.IniFsh=5;
	if(!GlobalParms.IniRed)
		GlobalParms.IniRed=3;
	for(i=0;i<Datos.length;i++)
	{
		//Datos[i]=RemoveUnuseChar(Datos[i]);
		//Datos[i]=Datos[i].split(" ");
		switch(Datos[i][0])
		{
			case "ID":
				GlobalParms.ID=Datos[i][1].trim();
				GlobalParms.ID=Remplace(GlobalParms.ID,"_"," ");
			break;
			case "Model":
			{
				GlobalParms.MODEL=Datos[i][1].trim();
				PhasesStructSize=0;
				if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4")!=-1)
					GlobalParms.MODEL="DGV-uTC1-M4";
				if(GlobalParms.MODEL.indexOf("MAC_TC1")!=-1)
					GlobalParms.MODEL="MAC-TC1M4";
					if(GlobalParms.MODEL.indexOf("Flex3")!=-1)
					GlobalParms.MODEL="GW1M3FT";
				if(GlobalParms.MODEL.indexOf("Flex4")!=-1)
					GlobalParms.MODEL="GW2M3FT";
				if(GlobalParms.MODEL.indexOf("Flex")!=-1)
					GlobalParms.MODEL="GW1M3FT";
				if(GlobalParms.MODEL.indexOf("GW4")!=-1)
					GlobalParms.MODEL="GW4M4RT";
				if(GlobalParms.MODEL.indexOf("STC-S4")!=-1)
					GlobalParms.MODEL="MSTC-V1M3";
				if(GlobalParms.MODEL.indexOf("SAD-V1")!=-1 || GlobalParms.MODEL.indexOf("SAD_V1")!=-1)
					GlobalParms.MODEL="SAD-V1M4";
				if(GlobalParms.MODEL.indexOf("SAD-V2")!=-1)
					GlobalParms.MODEL="SAD-V2M4";
				if(GlobalParms.MODEL.indexOf("SAD-V3")!=-1)
					GlobalParms.MODEL="SAD-V3M4";
				//--------------------------
				HW_IOS=9;
				PhasesStructSize=56;
				//--------------------------
				if(GlobalParms.MODEL.indexOf("M4")!=-1)
				{
					HW_IOS=16;
					PhasesStructSize=60;
				}
				if(GlobalParms.MODEL.indexOf("SAD-V")!=-1 || GlobalParms.MODEL.indexOf("MAC-TC1")!=-1)
				{
					HW_IOS=16;
					PhasesStructSize=60;
				}
				if(GetOption(OptAddSrc,GlobalParms.MODEL)=="")
				{
					alert(Str_Error_Model+" ["+GlobalParms.MODEL+"]");
				}
				SelIObyModel(GlobalParms.MODEL);
				if(PhasesStructSize==0)
				{
					alert(Str_Error_Model);
				}
			}
			break;
			case "Ver":
				GlobalParms.Version=parseInt("0"+Datos[i][1].trim());
			break;
			case "IniFsh":
				GlobalParms.IniFsh=parseInt("0"+Datos[i][1].trim());
			break;
			case "IniRed":
				GlobalParms.IniRed=parseInt("0"+Datos[i][1].trim());
			break;
			case "MAC":
				GlobalParms.MAC=Datos[i][1].trim();
			break;
			case "ETH0":
				GlobalParms.ETH0=Datos[i][1].trim();
				GlobalParms.ETH0=GlobalParms.ETH0.split('.');
			break;
			case "NETMASK0":
				GlobalParms.NETMASK0=Datos[i][1].trim();
				GlobalParms.NETMASK0=GlobalParms.NETMASK0.split('.');
			break;
			case "NETMASK":
				GlobalParms.NETMASK0=Datos[i][1].trim();
				GlobalParms.NETMASK0=GlobalParms.NETMASK0.split('.');
			break;
			case "DGW":
				GlobalParms.DGW=Datos[i][1].trim();
				GlobalParms.DGW=GlobalParms.DGW.split('.');
			break;
			case "MACDGW":
				GlobalParms.MACDGW=Datos[i][1].trim();
				GlobalParms.MACDGW=GlobalParms.MACDGW.split('-');
			break;
			case "LOG":
				GlobalParms.LOG=Datos[i][1].trim();
			break;
			case "Flashing":
				GlobalParms.Flashing=Datos[i][1].trim();
				GlobalParms.Flashing=GlobalParms.Flashing.split(' ');
				GlobalParms.FlasCA=parseInt("0"+GlobalParms.Flashing[1]);
			break;
			case "FlasCA":
				GlobalParms.FlasCA=parseInt("0"+Datos[i][1].trim());
				GlobalParms.Flashing=GlobalParms.Flashing[0];
			break;
			case "Loops":
				GlobalParms.Loops=parseInt("0"+Datos[i][1].trim());
			break;
			case "Inputs":
				GlobalParms.Inputs=parseInt("0"+Datos[i][1].trim());
			break;
			case "Phases":
				GlobalParms.Phases=parseInt("0"+Datos[i][1].trim());
			break;
			case "Virtual Phases":
				GlobalParms.Virtual_Phases=parseInt("0"+Datos[i][1].trim());
			break;
			case "Groups Phases":
				GlobalParms.Groups_Phases=parseInt("0"+Datos[i][1].trim());
			break;
			case "Controllers":
				GlobalParms.Controllers=parseInt("0"+Datos[i][1].trim());
			break;
			case "Time Out Electrical Error":
				GlobalParms.Time_Out_Electrical_Error=parseInt("0"+Datos[i][1].trim());
			break;
			case "Time Out Consumption Error":
				GlobalParms.Time_Out_Consumption_Error=parseInt("0"+Datos[i][1].trim());
			break;
			case "VoltPen":
				GlobalParms.VoltPen=parseInt("0"+Datos[i][1].trim());
			break;
			case "VoltDes":
				GlobalParms.VoltDes=parseInt("0"+Datos[i][1].trim());
			break;
			case "Alert Over Voltage":
				GlobalParms.Alert_Over_Voltage=parseInt("0"+Datos[i][1].trim());
			break;
			case "Normal Voltage":
				GlobalParms.Normal_Voltage=parseInt("0"+Datos[i][1].trim());
			break;
			case "Error Minimal Voltage":
				GlobalParms.Error_Minimal_Voltage=parseInt("0"+Datos[i][1].trim());
			break;
			case "Error Critical Voltage":
				GlobalParms.Error_Critical_Voltage=parseInt("0"+Datos[i][1].trim());
			break;
			case "Web Access Code R/W":
				GlobalParms.Web_Access_Code_RW=Datos[i][1].trim();
			break;
			case "Web Access Code Ro":
				GlobalParms.Web_Access_Code_RO=Datos[i][1].trim();
			break;
			case "Time Zone GMT":
				GlobalParms.Time_Zone_GMT=parseInt(Datos[i][1].trim());
			break;
			case "Enable GPS":
				GlobalParms.Enable_GPS=parseInt("0"+Datos[i][1].trim());
			break;
			case "Time Cap":
				GlobalParms.Time_Cap_In=parseInt("0"+Datos[i][1].trim());
			break;
			case "ATZ":
				if(GlobalParms.MODEL.indexOf("GW4")!=-1 || GlobalParms.MODEL.indexOf("GW")==-1)
				{
					GlobalParms.ATZ=new Array();
					Datos[i][1]=Datos[i][1].trim();
					Datos[i][1]=Datos[i][1].split('&');
					RemoveUnusedItem(Datos[i][1]);
					Datos[i][1].length-=(Datos[i][1].length%8);
					x=0;
					while(x < (Datos[i][1].length/4))
					{
						GlobalParms.ATZ[ x ] =parseInt((Datos[i][1][(x*4)+3]+Datos[i][1][(x*4)+2]+Datos[i][1][(x*4)+1]+Datos[i][1][(x*4)+0]),16);
						temp=new Date(GlobalParms.ATZ[ x ]*1000);
						GlobalParms.ATZ[ x ]=temp.getUTCFullYear()+"/"+(temp.getUTCMonth()+1)+"/"+temp.getUTCDate();
						GlobalParms.ATZ[x+1] =parseInt((Datos[i][1][(x*4)+7]+Datos[i][1][(x*4)+6]+Datos[i][1][(x*4)+5]+Datos[i][1][(x*4)+4]),16);
						if(GlobalParms.ATZ[x+1]&0x80000000)
						{
							GlobalParms.ATZ[x+1]=-(0x100000000-GlobalParms.ATZ[x+1]);
						}
						x+=2;
					}
				}
			break;
		}
	}
	if(!GlobalParms.ID)
	{
		GlobalParms.ID=Remplace(GlobalParms.ETH0.toString(),",",".");
	}
	GlobalParms.HwIo=HW_IOS;
	PLCs.length=0;
	PHASEs.length=0;
	IOs.length=0;
	UpdateSizeOfStruct();
}
function UpdateSizeOfStruct()
{
	if(PLCs.length!=GlobalParms.Controllers)
	{
		if(PLCs.length>GlobalParms.Controllers)
		{
			PLCs.length=GlobalParms.Controllers;
		}
		else
		{
			OTU.CftPLCs=new Array(GlobalParms.Controllers);
			for(var j=0;j<GlobalParms.Controllers;j++)
			{
				OTU.CftPLCs[j]=new Array();
				if(j>=PLCs.length)
				{
					PLCs[j] = new Object();
					PLCs[j].Number="";
					PLCs[j].Name="Anel"+(j+1);
					PLCs[j].Plan="98";
					PLCs[j].Flashing="99";
					PLCs[j].SyncRef="01/01/1970 00:00:00";
					PLCs[j].Scheduler="/ag.sch";
					PLCs[j].Location="-34.629331,-58.42561";
					PLCs[j].Server="10.0.0.254";
					PLCs[j].Phases=[];
					PLCs[j].Phase1="";
					PLCs[j].ErrorOut="0";
					PLCs[j].Svg="";
					if(GlobalParms.MODEL.indexOf("M4")!=-1)// com indexof é possivel retornar a posição de um caractere numa string
					PLCs[j].Sec="/"+j+"/sec.sec";
					if(GlobalParms.MODEL.indexOf("M3")!=-1)// com indexof é possivel retornar a posição de um caractere numa string
						PLCs[j].Sec="sec.sec";
					PLCs[j].HolyDays=new Array();
					PLCs[j].WeekDays=new Array();
					PLCs[j].TimeScheduler=new Array();
					PLCs[j].ErrorList= new Array();	
					PLCs[j].PlanList= new Array();			//PHC:,TC:,TD:,PasSec:[],PasSts:[],PasTim:[],PasDem:[],PasGo2:[],PasClr:[],StsFF,StsVT
					PLCs[j].PhcList= new Array();
					PLCs[j].EV= new Array();
					PLCs[j].Sts= new Array();
					PLCs[j].Sts[0]=  new Object();
					PLCs[j].Sts[0].Colors = new Array();
					PLCs[j].Sts[0].TMAX=120;
					PLCs[j].Sts[0].TMIN=0;
					PLCs[j].Plans= new Array();
					PLCs[j].McPlan= new Object();
					PLCs[j].McPlan.SYCPLCTOU=90000;
					PLCs[j].McPlan.MACSEQSTP=[0];
					PLCs[j].McPlan.MACSTSSTP=[1];
					PLCs[j].OTUPlan= new Object();
					PLCs[j].OTUPlan.OTUDEMCLR = new Array();
					PLCs[j].OTUPlan.OTUDEMSTS = new Array();
					PLCs[j].OTUPlan.OTUSTSDEM = new Array();
					PLCs[j].OTUPlan.OTUSEQSTS = new Array();
					PLCs[j].SyncPlc=0;
					PLCs[j].SyncPlcsTo=0;
				}
			}
		}
	}
	if(PHASEs.length!=(GlobalParms.Phases+GlobalParms.Virtual_Phases+GlobalParms.Groups_Phases))
	{
		for(var j=0;j<(GlobalParms.Phases+GlobalParms.Virtual_Phases+GlobalParms.Groups_Phases);j++)
		{
			if(j>=PHASEs.length)
			{
				PHASEs[j]=new Object();
				if(j>=(PHASEs.length+GlobalParms.Virtual_Phases))
					PHASEs[j].FlagsWeb=1;
				else
					PHASEs[j].FlagsWeb=0;
				PHASEs[j].Numero=j;
				PHASEs[j].MskError=0;
				PHASEs[j].FState=18;
				PHASEs[j].AMiRT=1;
				PHASEs[j].AMiYT=1;
				PHASEs[j].AMiGT=1;
				PHASEs[j].MiRT=2;
				PHASEs[j].MiYT=2;
				PHASEs[j].MiGT=2;
				PHASEs[j].MaRT=0;
				PHASEs[j].MaYT=0;
				PHASEs[j].MaGT=0;
				PHASEs[j].PotLR=0;
				PHASEs[j].PotLY=0;
				PHASEs[j].PotLG=0;
				PHASEs[j].R2V= new Array();
				PHASEs[j].V2R= new Array();
				PHASEs[j].TOEE=GlobalParms.Time_Out_Electrical_Error;	//parseInt("0"+Datos[j][16]);
				PHASEs[j].TOEC=GlobalParms.Time_Out_Consumption_Error;//parseInt("0"+Datos[j][17]);
				PHASEs[j].PLC=0;
				PHASEs[j].Type=0;
				PHASEs[j].Sec= new Array();
				PHASEs[j].Name="Mov["+(j+1)+"]";
			}
		}
	}
	//----------------------------------------
	{
		for(var j=0;j<GlobalParms.HwIo;j++)
		{
			if(j>=IOs.length)
			{
				IOs[j]= new Object();
				IOs[j].Name="";
				IOs[j].Plcs=0;
				IOs[j].Enable=1; // INPUT
				IOs[j].Type=1;
				IOs[j].Flank=1;
				IOs[j].shNivel=0;
				IOs[j].FailSts=0;
				IOs[j].TimeOut=10;
				IOs[j].neg=0;
			}
		}
		for(var j=GlobalParms.HwIo;j<(GlobalParms.HwIo+8);j++)
		{
			if(j>=IOs.length)
			{
				IOs[j]= new Object();
				IOs[j].Name="";
				IOs[j].Plcs=0;
				IOs[j].Enable=1;
				IOs[j].Type=3;	//INPUT / OUTPUT
				IOs[j].Flank=1;
				IOs[j].shNivel=0;
				IOs[j].FailSts=0;
				IOs[j].TimeOut=10;
				IOs[j].neg=0;
			}
		}
		for(var j=(GlobalParms.HwIo+8);j<(GlobalParms.HwIo+8+16);j++)
		{
			if(j>=IOs.length)
			{
				IOs[j]= new Object();
				IOs[j].Name="";
				IOs[j].Plcs=0;
				IOs[j].Enable=1;
				IOs[j].Type=5; //loops
				IOs[j].Flank=1;
				IOs[j].shNivel=0;
				IOs[j].FailSts=0;
				IOs[j].TimeOut=10;
				IOs[j].neg=0;
			}
			if(j>=(GlobalParms.HwIo+8+16))
				IOs[j].Enable=0;
		}
	}
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvPlc(Datos)
{
	Datos=Datos.responseText;
	var temp;
	var i=0;
	var j=0;
	var PLC=Datos.split("\n\n");
	j=0;
	if(PLC.length>GlobalParms.Controllers)
		PLC.length=GlobalParms.Controllers;
	while(j<PLC.length)
	{
		PLC[j]=RemoveUnuseChar(PLC[j]);
		PLC[j]=PLC[j].trim();
		if(PLC[j]=="")
		{
			PLC.splice(j,1);
		}
		else
		{
			Datos=PLC[j].split("\n");
			i=0;
			while(i<Datos.length)
			{
				Datos[i]=RemoveUnuseChar(Datos[i]);			
				Datos[i]=Datos[i].trim();
				if(Datos[i]=="")
					Datos.splice(i,1);
				else
					i++;
			}
			PLC[j]=Datos.slice();
			j++;
		}
	}
	for(var j=0;j<PLC.length;j++)
	{
		Datos=PLC[j].slice();
		PLCs[j].Sts.length=0;
		for(var i=0;i<Datos.length;i++)
		{
			Datos[i]=Datos[i].split(":");
			switch(Datos[i][0])
			{
				case "Number":
					PLCs[j].Number=Datos[i][1].slice();
				break;
				case "Name":
					PLCs[j].Name=Datos[i][1].slice();
				break;
				case "Plan":
					PLCs[j].Plan=Datos[i][1].slice();
				break;
				case "Flashing":
					PLCs[j].Flashing=Datos[i][1].slice();
				break;
				case "SyncRef":
					PLCs[j].SyncRef=Datos[i][1]+":"+Datos[i][2]+":"+Datos[i][3];
				break;
				case "Scheduler":
					PLCs[j].Scheduler=Datos[i][1].slice();
				break;
				case "Location":
					PLCs[j].Location=Datos[i][1].slice();
				break;
				case "Server":
					PLCs[j].Server=Datos[i][1].slice();
				break;
				case "Phases":
					temp=Datos[i][1].slice();
					temp=temp.split(",");
					RemoveUnusedItem(temp);
					for(var x=0;x<temp.length;x++)
					{
						temp[x]=parseInt("0"+temp[x]);
						if(PHASEs.length>temp[x])
						{
							PHASEs[temp[x]].PLC=(j+1);
						}
						else
						{
							temp.splice(x,1);
							x--;
						}
					}
					PLCs[j].Phases=temp.slice();
				break;
				case "Phase1":
					PLCs[j].Phase1=parseInt("0"+Datos[i][1].slice());
				break;
				case "Error Out":
					PLCs[j].ErrorOut=Datos[i][1].slice();
				break;
				case "Svg":
					PLCs[j].Svg=Datos[i][1].slice();
				break;
				case "Sec":
					PLCs[j].Sec=Datos[i][1].slice();
					if(GlobalParms.MODEL.indexOf("M4")!=-1)
					{
						if(GlobalParms.MODEL.indexOf("/")==-1)
						{
							PLCs[j].Sec="/"+PLCs[j].Sec;
							PLCs[j].Sec=PLCs[j].Sec.replace("//","/");
						}
					}
				break;
				case "Sts":
					Datos[i]=Datos[i][1].split(".");
					temp=PLCs[j].Sts.length;
					PLCs[j].Sts[temp]= new Object();
					Datos[i][0]=Datos[i][0].split(",");
					PLCs[j].Sts[temp].Colors = new Array(PLCs[j].Phases.length);
					for(var k=0;k<PLCs[j].Phases.length;k++)
						if(k<Datos[i][0].length)
							PLCs[j].Sts[temp].Colors[k]=parseInt("0"+Datos[i][0][k]);
						else
							PLCs[j].Sts[temp].Colors[k]=0;
					//PLCs[j].Sts[temp].TMAX=parseInt("0"+Datos[i][1]);
					//PLCs[j].Sts[temp].TMIN=parseInt("0"+Datos[i][2]);
				break;
			}
		}
	}
}
function LogPLCs()
{
	temp="";
	for(var j=0;j<GlobalParms.Controllers;j++)
	{
		temp+="["+j+"]---------------------\n";
		temp+=""+PLCs[j].Number+"\n";
		temp+=""+PLCs[j].Name+"\n";
		temp+=""+PLCs[j].Plan+"\n";
		temp+=""+PLCs[j].Flashing+"\n";
		temp+=""+PLCs[j].SyncRef+"\n";
		temp+=""+PLCs[j].Scheduler+"\n";
		temp+=""+PLCs[j].Location+"\n"; //Location contém propriedades da URL atual
		temp+=""+PLCs[j].Server+"\n";
		temp+=""+PLCs[j].Phases+"\n";
		temp+=""+PLCs[j].Phase1+"\n";
		temp+=""+PLCs[j].ErrorOut+"\n";
		temp+=""+PLCs[j].Svg+"\n";
		temp+=""+PLCs[j].Sec+"\n";
	}
	LOG(temp);
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvPh_Conf(Datos)
{
	var PhN=0;
	Datos=Datos.responseText;
	Datos=Datos.split("\n");
	var j=0;
	var i=0;
	while(j<Datos.length && j<PHASEs.length)
	{
		Datos[j]=Remplace(Datos[j],";",",");
		Datos[j]=RemoveUnuseChar(Datos[j]);
		Datos[j]=Datos[j].trim();
		if(Datos[j]=="" || Datos[j]==" ")
			Datos.splice(j,1);
		else
		{
			Datos[j]=Datos[j].split(",");
			PhN=parseInt("0"+Datos[j][0]);
			if(PhN>=PHASEs.length)
				PHASEs[PhN]=new Object();
			PHASEs[PhN].FlagsWeb=0;
			PHASEs[PhN].Numero=PhN;
			if(Datos[j][1].indexOf("0x")!=-1)
			{
				PHASEs[PhN].MskError=Math.abs(parseInt(Datos[j][1],16));
			}
			else
			{
				PHASEs[PhN].MskError=Math.abs(parseInt("0"+Datos[j][1]));
			}
			//PHASEs[PhN].FState=parseInt("0"+Datos[j][2]);
			PHASEs[PhN].AMiRT=((parseInt("0"+Datos[j][3])&0x100)>>8);
			//PHASEs[PhN].AMiYT=(parseInt("0"+Datos[j][3])>>1)&0x01;
			PHASEs[PhN].AMiGT=((parseInt("0"+Datos[j][2])&0x100)>>8);
			PHASEs[PhN].MiRT=parseInt("0"+Datos[j][3]);
			//PHASEs[PhN].MiYT=parseInt("0"+Datos[j][5]);
			PHASEs[PhN].MiGT=parseInt("0"+Datos[j][2]);
			//PHASEs[PhN].MaRT=parseInt("0"+Datos[j][7]);
			//PHASEs[PhN].MaYT=parseInt("0"+Datos[j][8]);
			//PHASEs[PhN].MaGT=parseInt("0"+Datos[j][9]);
			//PHASEs[PhN].Type=parseInt("0"+Datos[j][10])&0x07;
			//PHASEs[PhN].PotLR=parseInt("0"+Datos[j][11])&0xFFFF;
			//PHASEs[PhN].PotLY=parseInt("0"+Datos[j][12])&0xFFFF;
			//PHASEs[PhN].PotLG=parseInt("0"+Datos[j][13])&0xFFFF;
			//PHASEs[PhN].R2V=Datos[j][14].split("R");
			//RemoveUnusedItem(PHASEs[PhN].R2V);
			PHASEs[PhN].V2R=Datos[j][4].split("V");
			i=0;
			while(i<PHASEs[PhN].V2R.length)
			{
				PHASEs[PhN].V2R[i]=PHASEs[PhN].V2R[i].trim();
				if(PHASEs[PhN].V2R[i]=="")
					PHASEs[PhN].V2R.splice(i,1);
				else
				{
					PHASEs[PhN].V2R[i]=PHASEs[PhN].V2R[i].split(":");
					i++;
				}
			}
			//RemoveUnusedItem(PHASEs[PhN].V2R);
			if(GlobalParms.Time_Out_Electrical_Error<160)
				GlobalParms.Time_Out_Electrical_Error=160;
			if(GlobalParms.Time_Out_Consumption_Error<256)
				GlobalParms.Time_Out_Consumption_Error=256;
			PHASEs[PhN].TOEE=GlobalParms.Time_Out_Electrical_Error;	//parseInt("0"+Datos[j][16]);
			PHASEs[PhN].TOEC=GlobalParms.Time_Out_Consumption_Error;//parseInt("0"+Datos[j][17]);
			PHASEs[PhN].PLC=0;
			//PHASEs[PhN].Sec= new Array();
			j++;
		}
	}
}
function RcvPhConf(Datos)
{
	Datos=Datos.responseText;
	Datos=Datos.trim();
	Datos=RemComment(Datos)
	GlobalParms.phconf=Datos;
	SetPhConf(GlobalParms.phconf);
}
function SetPhConf(Datos)
{
	if(!Datos)
	 return;
	var PhN=0;
	var temp;
	Datos=Datos.split("\n");
	var j=0;
	var i=0;
	var ev=0;
	while(j<Datos.length && j<PHASEs.length)
	{
		Datos[j]=RemoveUnuseChar(Datos[j]);
		Datos[j]=Datos[j].trim();
		if(Datos[j]=="" || Datos[j]==" ")
			Datos.splice(j,1);
		else
		{
			Datos[j]=Datos[j].split(",");
			PhN=parseInt("0"+Datos[j][0]);
			if(PhN<(GlobalParms.Phases+GlobalParms.Virtual_Phases+GlobalParms.Groups_Phases))
			{
				PHASEs[PhN].Numero=PhN;
				if(Datos[j][1]!="")
					PHASEs[PhN].MskError=Math.abs(parseInt("0"+Datos[j][1]));
				if(Datos[j][2]!="")
					PHASEs[PhN].FState=parseInt("0"+Datos[j][2]);
				//-----------------------------------------
				if(Datos[j][3]!="")
				{
					Datos[j][3]=Datos[j][3].split(" ");
					PHASEs[PhN].AMiRT=(parseInt("0"+Datos[j][3][0])>>8);
					if(isNaN(Datos[j][3][0])!=true)
						PHASEs[PhN].MiRT=parseInt("0"+Datos[j][3][0])&0xFF;
					PHASEs[PhN].AMiYT=(parseInt("0"+Datos[j][3][1])>>8);
					if(isNaN(Datos[j][3][1])!=true)
						PHASEs[PhN].MiYT=parseInt("0"+Datos[j][3][1])&0xFF;
					PHASEs[PhN].AMiGT=(parseInt("0"+Datos[j][3][2])>>8);
					if(isNaN(Datos[j][3][2])!=true)
						PHASEs[PhN].MiGT=parseInt("0"+Datos[j][3][2])&0xFF;
				}
				//-----------------------------------------
				if(Datos[j][4]!="")
				{
					Datos[j][4]=Datos[j][4].split(" ");
					if(isNaN(Datos[j][4][0])!=true)
						PHASEs[PhN].MaRT=parseInt("0"+Datos[j][4][0]);
					if(isNaN(Datos[j][4][1])!=true)
						PHASEs[PhN].MaYT=parseInt("0"+Datos[j][4][1]);
					if(isNaN(Datos[j][4][2])!=true)
						PHASEs[PhN].MaGT=parseInt("0"+Datos[j][4][2]);
				}
				//-----------------------------------------
				if(Datos[j][5]!="")
					if(isNaN(Datos[j][5])!=true)
						PHASEs[PhN].TOEE=parseInt("0"+Datos[j][5]);
				if(Datos[j][6]!="")
					if(isNaN(Datos[j][6])!=true)
						PHASEs[PhN].TOEC=parseInt("0"+Datos[j][6]);
				//PHASEs[PhN].TOEE=GlobalParms.Time_Out_Electrical_Error;	//parseInt("0"+Datos[j][16]);
				//PHASEs[PhN].TOEC=GlobalParms.Time_Out_Consumption_Error;//parseInt("0"+Datos[j][17]);
				//-----------------------------------------
				if(Datos[j][7]!="")
				{
					PHASEs[PhN].R2V=new Array();
					temp=Datos[j][7].split("R");
					if(temp.length)
						temp=temp.slice(1);
					temp.reverse();
					ev=0;
					for(var i=0;i<temp.length;i++)
					{
						temp[i]=temp[i].split(":");
						while(ev<parseInt("0"+temp[i][1]))
						{
							PHASEs[PhN].R2V[ev]=parseInt("0"+temp[i][0]);
							ev++
						}
					}
					PHASEs[PhN].R2V.reverse();
					//--------------------------
					PHASEs[PhN].V2R=new Array();
					temp=Datos[j][7].split("V");
					if(temp.length)
						temp=temp.slice(1);
					temp.reverse();
					ev=0;
					for(var i=0;i<temp.length;i++)
					{
						temp[i]=temp[i].split(":");
						while(ev<parseInt("0"+temp[i][1]))
						{
							PHASEs[PhN].V2R[ev]=parseInt("0"+temp[i][0]);
							ev++
						}
					}
					PHASEs[PhN].V2R.reverse();
				}
				//-----------------------------------------
				if(Datos[j][8]!="")
				{
					Datos[j][8]=Datos[j][8].split(" ");
					PHASEs[PhN].PotLR=Datos[j][8][0];
					PHASEs[PhN].PotLY=Datos[j][8][1];
					PHASEs[PhN].PotLG=Datos[j][8][2];
				}
				//-----------------------------------------
				if(Datos[j][9]!="")
					PHASEs[PhN].Type=parseInt("0"+Datos[j][9])&0x07;
				//-----------------------------------------
				if(Datos[j][10]!="")
					PHASEs[PhN].Name=Datos[j][10];
				//-----------------------------------------
				//PHASEs[PhN].Sec= new Array();
			}
			j++;
		}
	}
	for(var i=0;i<PHASEs.length;i++)
	{
		if(PHASEs[i].Name==null)
			PHASEs[i].Name="Mov["+(i+1)+"]";
	}
	SetEv();
}
function LogPHASEs()
{
	temp="";
	for(var j=0;j<PHASEs.length;j++)
	{
		temp+="["+j+"],";
		temp+=""+PHASEs[j].Numero+",";
		temp+=""+PHASEs[j].MskError+",";
		temp+=""+PHASEs[j].FState+",";
		temp+=""+PHASEs[j].AMiRT+",";
		temp+=""+PHASEs[j].AMiYT+",";
		temp+=""+PHASEs[j].AMiGT+",";
		temp+=""+PHASEs[j].MiRT+",";
		temp+=""+PHASEs[j].MiYT+",";
		temp+=""+PHASEs[j].MiGT+",";
		temp+=""+PHASEs[j].MaRT+",";
		temp+=""+PHASEs[j].MaYT+",";
		temp+=""+PHASEs[j].MaGT+",";
		temp+=""+PHASEs[j].TOEE+",";
		temp+=""+PHASEs[j].TOEC+",";
		temp+="\tCFT:"
		for(var i=0;i<PHASEs[j].Sec.length;i++)
		{
			temp+=i+":"+(PHASEs[j].Sec[i]-1)+" ";
		}
		if(PHASEs[j].R2V)
		{
			temp+="\tR2V:"
			for(var i=0;i<PHASEs[j].R2V.length;i++)
			{
				temp+=PHASEs[j].R2V[i]+",";
			}
		}
		if(PHASEs[j].V2R)
		{
			temp+=" V2R:"
			for(var i=0;i<PHASEs[j].V2R.length;i++)
			{
				temp+=PHASEs[j].V2R[i]+",";
			}
		}
		temp+="\t"+PHASEs[j].PotLR+",";
		temp+=""+PHASEs[j].PotLY+",";
		temp+=""+PHASEs[j].PotLG+",";
		temp+="Plc"+PHASEs[j].PLC+",";
		temp+="\n";
	}
	LOG(temp);
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvOPCT(Datos)
{
	Datos=Datos.responseText;
	Datos=Datos.split("\n");
	RemoveUnusedItem(Datos);
	var i=0;
	while(i<Datos.length)
	{
		Datos[i]=RemoveUnuseChar(Datos[i]);
		Datos[i]=Datos[i].trim();
		if(Datos[i]=="")
			Datos.splice(i,1);
		else
		{
			Datos[i]=Datos[i].split(":");
			i++;
		}
	}
	OPCT.length=0;
	OPCT=Datos.slice();
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvIP(Datos)
{
	Datos=Datos.responseText;
	Datos=Datos.split("\n");
	RemoveUnusedItem(Datos);
	var i=0;
	while(i<Datos.length)
	{
		Datos[i]=RemoveUnuseChar(Datos[i]);
		Datos[i]=Datos[i].trim();
		if(Datos[i]=="")
			Datos.splice(i,1);
		else
		{
			Datos[i]=Datos[i].split(",");
			i++;
		}
	}
	Links.length=0;
	Links[0]=new Array();
	Links[0][0]="WebLog"
	Links[0][1]="0";
	Links[0][2]="No Config";
	for(var j=1;j<9;j++)
	{
		Links[j]=new Array();
		Links[j][0]="Serial Port"
		Links[j][1]=""+j+"";
		Links[j][2]="115200,8N1";
	}	
	Links[j]=new Array();
	Links[j][0]="USB Port"
	Links[j][1]=""+j+"";
	Links[j][2]="No Config";
	Links=Links.concat(Datos);
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvError(Datos)
{
	Datos=Datos.responseText;
	Datos=Datos.split("\n");
	RemoveUnusedItem(Datos);
	var i=0;
	while(i<Datos.length)
	{
		Datos[i]=RemoveUnuseChar(Datos[i]);
		Datos[i]=Datos[i].trim();
		if(Datos[i]=="")
			Datos.splice(i,1);
		else
		{
			if(Datos[i].indexOf(":")!=-1)
			{
				Datos[i]=Datos[i].split(":");
				Datos[i][2]=":";
			}
			else
			if(Datos[i].indexOf("=")!=-1)
			{
				Datos[i]=Datos[i].split("=");
				Datos[i][2]="=";
			}
			else
			if(Datos[i].indexOf("+")!=-1)
			{
				Datos[i]=Datos[i].split("+");
				Datos[i][2]="+";
			}
			else
			if(Datos[i].indexOf("-")!=-1)
			{
				Datos[i]=Datos[i].split("-");
				Datos[i][2]="-";
			}
			Datos[i][1]=parseInt("0"+Datos[i][1]);
			i++;
		}
	}
	ErrorsCfg.length=0;
	ErrorsCfg=Datos.slice();
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvPHG(Datos)
{
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvDefIn(Datos)
{
	Datos=Datos.responseText;
	Datos=Datos.split("\n");
	RemoveUnusedItem(Datos);
	var i=0;
	while(i<Datos.length)
	{
		Datos[i]=RemoveUnuseChar(Datos[i]);
		Datos[i]=Datos[i].trim();
		if(Datos[i]=="")
			Datos.splice(i,1);
		else
		{
			Datos[i]=Datos[i].split(":");
			i++;
		}
	}
	DefIn.length=0;
	var Nin=0;
	var j=0;
	for(i=0;i<Datos.length;i++)
	{
		switch(Datos[i][0])
		{
		case "I/O":
			Datos[i][1]=Datos[i][1].split(",");
					Nin=			parseInt("0"+Datos[i][1][0]);//numero de IO
			if(IOs.length>Nin)
			{
				IOs[Nin].Enable=	parseInt("0"+Datos[i][1][1]);//Enable or disable
				IOs[Nin].Type=		parseInt("0"+Datos[i][1][2]);//tipo
				IOs[Nin].Mode=		parseInt("0"+Datos[i][1][3]);//modo
				IOs[Nin].neg=		parseInt("0"+Datos[i][1][4]);//invert
				IOs[Nin].Flank=		parseInt("0"+Datos[i][1][5]);//flank de conteo 
				IOs[Nin].TimeOut=	parseInt("0"+Datos[i][1][6]);// estado de falla
				IOs[Nin].FailSts=	parseInt("0"+Datos[i][1][7]);
				IOs[Nin].Plcs=		parseInt("0"+Datos[i][1][8]);
				IOs[Nin].Name=					 Datos[i][1][9];
				if(IOs[Nin].Name=="")IOs[Nin].Name="Entrada["+(Nin+1)+"]";
				IOs[Nin].Used=0;
			}
		break;
		default:
			DefIn[j]=Datos[i].slice();
			j++;
		break;
		}
	}
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvOTU(Datos)
{
	Datos=Datos.responseText;
	RcvOTU2(Datos);
}
function RcvOTU2(Datos)
{
	var DatosT=0
	var temp;
	var i=0;
	var j=0;
	Datos=Datos.split("\n\n");
	OTU.CftPLCs= new Array(GlobalParms.Controllers);
	for(var j=0;j<Datos.length;j++)
	{
		Datos[j]=Datos[j].split("\n");
		i=0;
		while(i<Datos[j].length)
		{
			Datos[j][i]=RemoveUnuseChar(Datos[j][i]);			
			Datos[j][i]=Datos[j][i].trim();
			if(Datos[j][i]=="")
				Datos[j].splice(i,1);
			else
				i++;
		}
	}
	//-----------------------------------
	{
		DatosT=Datos[0][0].split(":");
		if(DatosT[0]=="Comm")
			OTU.Link=parseInt("0"+DatosT[1]);
		DatosT=Datos[0][1].split(":");
		if(DatosT[0]=="G1G2")
			OTU.G1G2=parseInt("0"+DatosT[1]);
	}
	//-----------------------------------CFT
	{
		DatosT=Datos[1].slice();
		for(var j=0;j<DatosT.length;j++)
		{
			temp=DatosT[j].indexOf("CFT");
			if(temp!=-1)
			{
				DatosT[j]=DatosT[j].substr(3);
				//OTU.CftPLCs[temp] = new Object();
				DatosT[j]=DatosT[j].split(':');
				temp=parseInt("0"+DatosT[j][0])
				OTU.CftPLCs[temp]=DatosT[j][1].split(',');
				for(var i=0;i<OTU.CftPLCs[temp].length;i++)
				{
					OTU.CftPLCs[temp][i]=OTU.CftPLCs[temp][i].split('a');
					OTU.CftPLCs[temp][i]=ConvToInt(OTU.CftPLCs[temp][i]);
				}
			}
		}
	}
	OTU.BitCofigRx=new Array();
	OTU.BitCofigTx=new Array();
	OTU.FO=0;
	//-----------------------------------RX
	if(Datos[2])
	{
		DatosT=Datos[2].slice();
		for(var j=0;j<DatosT.length;j++)
		{
			temp=DatosT[j].indexOf("Rx");
			if(temp!=-1)
			{
				DatosT[j]=DatosT[j].substr(2);
				DatosT[j]=DatosT[j].split(',');
				OTU.BitCofigRx[OTU.BitCofigRx.length]=new Object();
				OTU.BitCofigRx[OTU.BitCofigRx.length-1].NBit=parseInt("0"+DatosT[j][0]);
				OTU.BitCofigRx[OTU.BitCofigRx.length-1].Fnc=DatosT[j][1];
				OTU.BitCofigRx[OTU.BitCofigRx.length-1].Parms=DatosT[j].slice(2,DatosT[j].length);
			}
		}
	}
	//-----------------------------------TX
	if(Datos[3])
	{
		DatosT=Datos[3].slice();
		for(var j=0;j<DatosT.length;j++)
		{
			temp=DatosT[j].indexOf("Tx");
			if(temp!=-1)
			{
				DatosT[j]=DatosT[j].substr(2);
				DatosT[j]=DatosT[j].split(',');
				if(DatosT[j][1]=="FO")
				{
					OTU.FO=parseInt("0"+DatosT[j][0]);
					if(OTU.FO)
						OTU.FO++;
				}
				else
				{
					OTU.BitCofigTx[OTU.BitCofigTx.length]=new Object();
					OTU.BitCofigTx[OTU.BitCofigTx.length-1].NBit=parseInt("0"+DatosT[j][0]);
					OTU.BitCofigTx[OTU.BitCofigTx.length-1].Fnc=DatosT[j][1];
					OTU.BitCofigTx[OTU.BitCofigTx.length-1].Parms=DatosT[j].slice(2,DatosT[j].length);
				}
			}
		}
	}
	//-----------------------------------
}	// */
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvSdgvp(Datos)
{
	var ptr;
	var tmpt="";
	var idx=0;
	//-----------------------------------
	Datos=Datos.responseText;
	Datos=RemComment(Datos)
	Datos=Datos.split("\n");
	RemoveUnusedItem(Datos);
	SdgvP=null;
	SdgvP=new Object();
	SdgvP.Tsk=null;
	SdgvP.Link=0;
	SdgvP.Debug=255;
	//-----------------------------------
	for(var j=0;j<Datos.length;j++)
	{
		ptr=Datos[j].indexOf("SDgvP.Link=");
		if(ptr!=-1)
		{
			SdgvP.Link=parseInt("0"+Datos[j].substring(ptr+11));
		}
		ptr=Datos[j].indexOf("SDgvP.SrvId=");
		if(ptr!=-1)
		{
			SdgvP.SrvId=parseInt("0"+Datos[j].substring(ptr+12));
		}
		ptr=Datos[j].indexOf("SDgvP.debug=");
		if(ptr!=-1)
		{
			SdgvP.Debug=parseInt("0"+Datos[j].substring(ptr+12));
		}
		ptr=Datos[j].indexOf("SDgvP.Tsk");
		if(ptr!=-1)
		{
			if(!SdgvP.Tsk)
			{
				SdgvP.Tsk=new Array();
			}
			tmpt=Datos[j].substring(ptr+9);
			idx=parseInt("0"+tmpt);
			if(!SdgvP.Tsk[idx])
				SdgvP.Tsk[idx]=new Object();
			SdgvP.Tsk[idx].IDsrv=254;
			SdgvP.Tsk[idx].Sck=2;
			SdgvP.Tsk[idx].Period=10;
			ptr=Datos[j].indexOf(",");	//Tsk
			if(ptr!=-1)
			{
				SdgvP.Tsk[idx].cmps=Datos[j].substring(ptr+1);	//Byte Period
				SdgvP.Tsk[idx].Period=parseInt("0"+SdgvP.Tsk[idx].cmps);
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Ctrl
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1); //Byte ID-Src
				SdgvP.Tsk[idx].IDsrv=parseInt("0"+SdgvP.Tsk[idx].cmps);
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte ID-Trg
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Sck-Src
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Sck-Trg
				SdgvP.Tsk[idx].Sck=parseInt("0"+SdgvP.Tsk[idx].cmps);
				//------------------------------------------
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Stuf
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Stuf
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Stuf
				//------------------------------------------
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Size-0
				SdgvP.Tsk[idx].Size=parseInt("0"+SdgvP.Tsk[idx].cmps);
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Size-1
				SdgvP.Tsk[idx].Size+=parseInt("0"+SdgvP.Tsk[idx].cmps)<<8;
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Size-2
				SdgvP.Tsk[idx].Size+=parseInt("0"+SdgvP.Tsk[idx].cmps)<<16;
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Size-3
				SdgvP.Tsk[idx].Size+=parseInt("0"+SdgvP.Tsk[idx].cmps)<<24;
				//------------------------------------------
				ptr=SdgvP.Tsk[idx].cmps.indexOf(",");
				if(ptr==-1)
					break;
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.substring(ptr);// Data String
				if(GlobalParms.MODEL.indexOf("M3")!=-1)
				{
					for(var i=0;i<DgvPM3.length;i+=2)
					{
						SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.replace(DgvPM3[i+1],(","+DgvPM3[i]));
					}
				}
				if(GlobalParms.MODEL.indexOf("M4")!=-1)
				{
					for(var i=0;i<DgvPM4.length;i+=2)
					{
						SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.replace(DgvPM4[i+1],(","+DgvPM4[i]));
					}
				}
				SdgvP.Tsk[idx].cmps=SdgvP.Tsk[idx].cmps.split(',');
				RemoveUnusedItem(SdgvP.Tsk[idx].cmps);				
			}
			//------------------------------------------
		}
	}
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvIteris(Datos)
{
	Datos=Datos.responseText;
	Datos=Datos.split("\n");
	RemoveUnusedItem(Datos);
	var i=0;
	while(i<Datos.length)
	{
		Datos[i]=RemoveUnuseChar(Datos[i]);
		Datos[i]=Datos[i].trim();
		if(Datos[i]=="")
			Datos.splice(i,1);
		else
		{
			Datos[i]=Datos[i].split(":");
			i++;
		}
	}
	Iteris.length=0;
	Iteris=Datos.slice();
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvFile(Datos)
{
	Datos=Datos.responseText;
	Datos=Datos.split("\n");
	RemoveUnusedItem(Datos);
	var i=0;
	while(i<Datos.length)
	{
		Datos[i]=RemoveUnuseChar(Datos[i]);
		Datos[i]=Datos[i].trim();
		if(Datos[i]=="")
			Datos.splice(i,1);
		else
		{
			Datos[i]=Datos[i].split(":");
			if(Datos[i].length==1)
				Datos[i]=Datos[i][0].split("=");
			Datos[i][0]=Datos[i][0].split(".");
			addobj(PrgEd[SrcIdx],Datos[i][0],Datos[i][1]);
			i++;
		}
	}
}
function addobj(obj,vname,val)
{
	for(i=0;i<vname.length;i++)
	{
		if(!obj[vname[i]])
			if(i<(vname.length-1))
				obj[vname[i]]=new Object();
			else
				obj[vname[i]]=val;
		obj=obj[vname[i]];
	}
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
percent=5;
