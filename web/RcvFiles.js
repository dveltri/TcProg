

function SelIObyModel(base_obj)
{
	var Model = base_obj.Model;
	var out="";
	//-------- M3
	SwFF=7;
	SwCmMc=8;
	SwEnMc=9;
	OutAdv=10;
	OutMc=11;
	OutRemote=12;
	//-----------
	if(Model.indexOf("GW1")!=-1)
	{
		SwFF=0;
		OutAdv=0;
		OutMc=0;
		OutRemote=0;
	}
	if(Model.indexOf("GW2M4")!=-1)
	{
		SwFF=11;
		OutAdv=2;
		OutMc=0;
		OutRemote=0;
	}
	if(Model.indexOf("GW3M3")!=-1)
	{
		OutAdv = 10;
		OutMc = 11;
		OutRemote = 12;
		SwFF = 14;
		SwEnMc = 15;	//plug
		SwCmMc = 16;	//comando
	}
	if(Model.indexOf("GW3M4")!=-1)
	{
		OutAdv=17;
		OutMc=18;
		OutRemote=19;
		SwFF=21;
		SwEnMc=22;	//plug
		SwCmMc=23;	//comando
	}
	if(Model.indexOf("GW4")!=-1)
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
	if(Model.indexOf("MSTC-V1M3")!=-1)
	{
		OutAdv = 0;
		OutMc = 0;
		OutRemote = 0;
		SwFF = 13;
		SwEnMc = 0;	//plug
		SwCmMc = 0;	//comando
	}
	if(Model.indexOf("SAD-V1")!=-1)
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
	if(Model.indexOf("SAD-V2")!=-1)
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
	if(Model.indexOf("SAD-V3")!=-1)
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
	if(Model.indexOf("DGV-uTC1-M4")!=-1)
	{
		base_obj.ip_offset=10;
	}
	if(Model.indexOf("RT")!=-1 || Model.indexOf("GW3")!=-1 || Model.indexOf("GW4")!=-1)
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
	PrgEd[SrcIdx].GlobalParms= new Object();
	base_obj = PrgEd[SrcIdx].GlobalParms;
	RcvFile(base_obj, Datos);
	//--------------------------------------------------
	if(!base_obj.IniFsh)
		base_obj.IniFsh=5;
	//--------------------------------------------------
	if(!base_obj.IniRed)
		base_obj.IniRed=3;
	//--------------------------------------------------
	if(!base_obj.ID)
		base_obj.ID=base_obj.ETH0.trim();
	base_obj.ID=Remplace(base_obj.ID,"_"," ");
	//--------------------------------------------------
	PhasesStructSize=0;
	if(base_obj.Model.indexOf("MAC_TC1")!=-1 || base_obj.Model.indexOf("MAC-TC1")!=-1)
		base_obj.Model="MAC-TC1M4";
	if(base_obj.Model.indexOf("Flex3")!=-1)
		base_obj.Model="GW1M3FT";
	if(base_obj.Model.indexOf("Flex4")!=-1)
		base_obj.Model="GW2M3FT";
	if(base_obj.Model.indexOf("Flex")!=-1)
		base_obj.Model="GW1M3FT";
	if(base_obj.Model.indexOf("GW4")!=-1)
		base_obj.Model="GW4M4RT";
	if(base_obj.Model.indexOf("STC-S4")!=-1)
		base_obj.Model="MSTC-V1M3";
	if(base_obj.Model.indexOf("SAD-V1")!=-1 || base_obj.Model.indexOf("SAD_V1")!=-1)
		base_obj.Model="SAD-V1M4";
	if(base_obj.Model.indexOf("SAD-V2")!=-1)
		base_obj.Model="SAD-V2M4";
	if(base_obj.Model.indexOf("SAD-V3")!=-1)
		base_obj.Model="SAD-V3M4";
	//--------------------------
	HW_IOS=9;
	PhasesStructSize=56;
	//--------------------------
	if(base_obj.Model.indexOf("M4")!=-1)
	{
		HW_IOS=16;
		PhasesStructSize=60;
	}
	if(GetOption(OptAddSrc,base_obj.Model)=="")
		alert(Str_Error_Model+" ["+base_obj.Model+"]");
	SelIObyModel(base_obj);
	if(PhasesStructSize==0)
		alert(Str_Error_Model);
	//--------------------------------------------------
	base_obj.ETH0=base_obj.ETH0.split('.');
	try
	{
		base_obj.NETMASK=base_obj.NETMASK.split('.');
	}
	catch(e)
	{
	}
	try{base_obj.NETMASK=base_obj.NETMASK0.split('.');}catch(e){}
	base_obj.DGW=base_obj.DGW.split('.');
	try{base_obj.MACDGW=base_obj.MACDGW.split('-');}catch{}
	if(typeof base_obj.Flashing === 'string')
	{
		if(base_obj.Flashing.indexOf(' ')!=-1)
			base_obj.FlasCA=parseInt("0"+base_obj.Flashing.split(' ')[1]);
		base_obj.Flashing=parseInt("0"+base_obj.Flashing[0]);
	}
	//--------------------------------------------------
	if(base_obj.ATZ)
	{
		ref=base_obj.ATZ;
		base_obj.ATZ = new Array()
		ref=ref.split('&');
		RemoveUnusedItem(ref);
		ref.length-=(ref.length%8);
		x=0;
		while(x < (ref.length/4))
		{
			temp =parseInt((ref[(x*4)+3] + ref[(x*4)+2] + ref[(x*4)+1] + ref[(x*4)+0]), 16);
			temp=new Date(temp*1000);
			base_obj.ATZ[ x ] = temp.getUTCFullYear()+"/"+(temp.getUTCMonth()+1)+"/"+temp.getUTCDate();
			temp = parseInt((ref[(x*4)+7] + ref[(x*4)+6] + ref[(x*4)+5] + ref[(x*4)+4]), 16);
			if(temp&0x80000000)
				temp=-(0x100000000-temp);
			base_obj.ATZ[x+1] = temp
			x+=2;
		}
	}
	//--------------------------------------------------
	base_obj.HwIo=HW_IOS;
	PLCs().length=0;
	PHASEs().length=0;
	IOs().length=0;
	UpdateSizeOfStruct();
}
function UpdateSizeOfStruct()
{
	if(PLCs().length!=GlobalParms().Controllers)
	{
		if(PLCs().length>GlobalParms().Controllers)
		{
			PLCs().length=GlobalParms().Controllers;
		}
		else
		{
			OTU().CftPLCs=new Array(GlobalParms().Controllers);
			for(var j=0;j<GlobalParms().Controllers;j++)
			{
				OTU().CftPLCs[j]=new Array();
				if(j>=PLCs().length)
				{
					PLCs()[j] = new Object();
					PLCs()[j].Number="";
					PLCs()[j].Name="Anel"+(j+1);
					PLCs()[j].Plan="98";
					PLCs()[j].Flashing="99";
					PLCs()[j].SyncRef="01/01/1970 00:00:00";
					PLCs()[j].Scheduler="/ag.sch";
					PLCs()[j].Location="-34.629331,-58.42561";
					PLCs()[j].Server="10.0.0.254";
					PLCs()[j].Phases=[];
					PLCs()[j].Phase1="";
					PLCs()[j].ErrorOut="0";
					PLCs()[j].Svg="";
					if(GlobalParms().Model.indexOf("M4")!=-1)// com indexof é possivel retornar a posição de um caractere numa string
						PLCs()[j].Sec="/"+j+"/sec.sec";
					if(GlobalParms().Model.indexOf("M3")!=-1)// com indexof é possivel retornar a posição de um caractere numa string
						PLCs()[j].Sec="sec.sec";
					PLCs()[j].HolyDays=new Array();
					PLCs()[j].WeekDays=new Array();
					PLCs()[j].TimeScheduler=new Array();
					PLCs()[j].ErrorList= new Array();	
					PLCs()[j].PlanList= new Array();			//PHC:,TC:,TD:,PasSec:[],PasSts:[],PasTim:[],PasDem:[],PasGo2:[],PasClr:[],StsFF,StsVT
					PLCs()[j].PhcList= new Array();
					PLCs()[j].EV= new Array();
					PLCs()[j].Sts= new Array();
					PLCs()[j].Sts[0]=  new Object();
					PLCs()[j].Sts[0].Colors = new Array();
					PLCs()[j].Sts[0].TMAX=120;
					PLCs()[j].Sts[0].TMIN=0;
					PLCs()[j].Plans= new Array();
					PLCs()[j].McPlan= new Object();
					PLCs()[j].McPlan.SYCPLCTOU=90000;
					PLCs()[j].McPlan.MACSEQSTP=[0];
					PLCs()[j].McPlan.MACSTSSTP=[1];
					PLCs()[j].OTUPlan= new Object();
					PLCs()[j].OTUPlan.OTUDEMCLR = new Array();
					PLCs()[j].OTUPlan.OTUDEMSTS = new Array();
					PLCs()[j].OTUPlan.OTUSTSDEM = new Array();
					PLCs()[j].OTUPlan.OTUSEQSTS = new Array();
					PLCs()[j].SyncPlc=0;
					PLCs()[j].SyncTo=0;
				}
			}
		}
	}
	if(PHASEs().length!=(GlobalParms().PHASEs+GlobalParms().Virtual_PHASEs+GlobalParms().Groups_Phases))
	{
		for(var j=0;j<(GlobalParms().Phases+GlobalParms().Virtual_Phases+GlobalParms().Groups_Phases);j++)
		{
			if(j>=PHASEs().length)
			{
				PHASEs()[j]=new Object();
				if(j>=(PHASEs().length+GlobalParms().Virtual_Phases))
					PHASEs()[j].FlagsWeb=1;
				else
					PHASEs()[j].FlagsWeb=0;
				PHASEs()[j].Numero=j;
				PHASEs()[j].MskError=0;
				PHASEs()[j].FState=18;
				PHASEs()[j].AMiRT=1;
				PHASEs()[j].AMiYT=1;
				PHASEs()[j].AMiGT=1;
				PHASEs()[j].MiRT=2;
				PHASEs()[j].MiYT=2;
				PHASEs()[j].MiGT=2;
				PHASEs()[j].MaRT=0;
				PHASEs()[j].MaYT=0;
				PHASEs()[j].MaGT=0;
				PHASEs()[j].PotLR=0;
				PHASEs()[j].PotLY=0;
				PHASEs()[j].PotLG=0;
				PHASEs()[j].R2V= new Array();
				PHASEs()[j].V2R= new Array();
				PHASEs()[j].TOEE=GlobalParms().Time_Out_Electrical_Error;	//parseInt("0"+Datos[j][16]);
				PHASEs()[j].TOEC=GlobalParms().Time_Out_Consumption_Error;//parseInt("0"+Datos[j][17]);
				PHASEs()[j].PLC=0;
				PHASEs()[j].Type=0;
				PHASEs()[j].Sec= new Array();
				PHASEs()[j].Name="Mov["+(j+1)+"]";
			}
		}
	}
	//----------------------------------------
	{
		for(var j=0;j<GlobalParms().HwIo;j++)
		{
			if(j>=IOs().length)
			{
				IOs()[j]= new Object();
				IOs()[j].Name="";
				IOs()[j].Plcs=0;
				IOs()[j].Enable=1; // INPUT
				IOs()[j].Type=1;
				IOs()[j].Flank=1;
				IOs()[j].shNivel=0;
				IOs()[j].FailSts=0;
				IOs()[j].TimeOut=10;
				IOs()[j].neg=0;
			}
		}
		for(var j=GlobalParms().HwIo;j<(GlobalParms().HwIo+8);j++)
		{
			if(j>=IOs().length)
			{
				IOs()[j]= new Object();
				IOs()[j].Name="";
				IOs()[j].Plcs=0;
				IOs()[j].Enable=1;
				IOs()[j].Type=3;	//INPUT / OUTPUT
				IOs()[j].Flank=1;
				IOs()[j].shNivel=0;
				IOs()[j].FailSts=0;
				IOs()[j].TimeOut=10;
				IOs()[j].neg=0;
			}
		}
		for(var j=(GlobalParms().HwIo+8);j<(GlobalParms().HwIo+8+16);j++)
		{
			if(j>=IOs().length)
			{
				IOs()[j]= new Object();
				IOs()[j].Name="";
				IOs()[j].Plcs=0;
				IOs()[j].Enable=1;
				IOs()[j].Type=5; //loops
				IOs()[j].Flank=1;
				IOs()[j].shNivel=0;
				IOs()[j].FailSts=0;
				IOs()[j].TimeOut=10;
				IOs()[j].neg=0;
			}
			if(j>=(GlobalParms().HwIo+8+16))
				IOs()[j].Enable=0;
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
	if(PLC.length>GlobalParms().Controllers)
		PLC.length=GlobalParms().Controllers;
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
	iPLC=PLCs()
	iPLC.length = 0;
	for(var j=0;j<PLC.length;j++)
	{
		iPLC[j] = new Object();
		Datos=PLC[j].slice();
		iPLC[j].Sts = new Array();
		for(var i=0;i<Datos.length;i++)
		{
			Datos[i]=Datos[i].split(":");
			switch(Datos[i][0])
			{
				case "Number":
					iPLC[j].Number=Datos[i][1].slice();
				break;
				case "Name":
					iPLC[j].Name=Datos[i][1].slice();
				break;
				case "Plan":
					iPLC[j].Plan=Datos[i][1].slice();
				break;
				case "Flashing":
					iPLC[j].Flashing=Datos[i][1].slice();
				break;
				case "PlanOff":
					iPLC[j].Flashing=Datos[i][1].slice();
				break;
				case "SyncRef":
					iPLC[j].SyncRef=Datos[i][1]+":"+Datos[i][2]+":"+Datos[i][3];
				break;
				case "Scheduler":
					iPLC[j].Scheduler=Datos[i][1].slice();
					PrgEd[SrcIdx][iPLC[j].Scheduler]=new Object();
				break;
				case "Location":
					iPLC[j].Location=Datos[i][1].slice();
				break;
				case "Server":
					iPLC[j].Server=Datos[i][1].slice();
				break;
				case "Phases":
					temp=Datos[i][1].slice();
					temp=temp.split(",");
					RemoveUnusedItem(temp);
					for(var x=0;x<temp.length;x++)
					{
						temp[x]=parseInt("0"+temp[x]);
						if(PHASEs().length>temp[x])
						{
							PHASEs()[temp[x]].PLC=(j+1);
						}
						else
						{
							temp.splice(x,1);
							x--;
						}
					}
					iPLC[j].Phases=temp.slice();
				break;
				case "Phase1":
					iPLC[j].Phase1=parseInt("0"+Datos[i][1].slice());
				break;
				case "Error Out":
					iPLC[j].ErrorOut=Datos[i][1];
				break;
				case "Svg":
					iPLC[j].Svg=Datos[i][1];
				break;
				case "Sec":
					iPLC[j].Sec=Datos[i][1];
					if(GlobalParms().Model.indexOf("M4")!=-1)
					{
						if(GlobalParms().Model.indexOf("/")==-1)
						{
							iPLC[j].Sec="/"+iPLC[j].Sec;
							iPLC[j].Sec=iPLC[j].Sec.replace("//","/");
						}
					}
				break;
				case "Sts":
					Datos[i]=Datos[i][1].split(".");
					temp=iPLC[j].Sts.length;
					iPLC[j].Sts[temp]= new Object();
					Datos[i][0]=Datos[i][0].split(",");
					iPLC[j].Sts[temp].Colors = new Array(iPLC[j].Phases.length);
					for(var k=0;k<iPLC[j].Phases.length;k++)
						if(k<Datos[i][0].length)
							iPLC[j].Sts[temp].Colors[k]=parseInt("0"+Datos[i][0][k]);
						else
							iPLC[j].Sts[temp].Colors[k]=0;
					//iPLC[j].Sts[temp].TMAX=parseInt("0"+Datos[i][1]);
					//iPLC[j].Sts[temp].TMIN=parseInt("0"+Datos[i][2]);
				break;
			}
		}
	}
}
function LogPLCs()
{
	temp="";
	for(var j=0;j<GlobalParms().Controllers;j++)
	{
		temp+="["+j+"]---------------------\n";
		temp+=""+PLCs()[j].Number+"\n";
		temp+=""+PLCs()[j].Name+"\n";
		temp+=""+PLCs()[j].Plan+"\n";
		temp+=""+PLCs()[j].Flashing+"\n";
		temp+=""+PLCs()[j].SyncRef+"\n";
		temp+=""+PLCs()[j].Scheduler+"\n";
		temp+=""+PLCs()[j].Location+"\n"; //Location contém propriedades da URL atual
		temp+=""+PLCs()[j].Server+"\n";
		temp+=""+PLCs()[j].Phases+"\n";
		temp+=""+PLCs()[j].Phase1+"\n";
		temp+=""+PLCs()[j].ErrorOut+"\n";
		temp+=""+PLCs()[j].Svg+"\n";
		temp+=""+PLCs()[j].Sec+"\n";
	}
	LOG(temp);
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
/*function RcvPh_Conf(Datos)
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
			if(GlobalParms().Time_Out_Electrical_Error<160)
				GlobalParms().Time_Out_Electrical_Error=160;
			if(GlobalParms().Time_Out_Consumption_Error<256)
				GlobalParms().Time_Out_Consumption_Error=256;
			PHASEs[PhN].TOEE=GlobalParms().Time_Out_Electrical_Error;	//parseInt("0"+Datos[j][16]);
			PHASEs[PhN].TOEC=GlobalParms().Time_Out_Consumption_Error;//parseInt("0"+Datos[j][17]);
			PHASEs[PhN].PLC=0;
			//PHASEs[PhN].Sec= new Array();
			j++;
		}
	}
}*/
function RcvPhConf(Datos)
{
	Datos=Datos.responseText;
	Datos=Datos.trim();
	Datos=RemComment(Datos)
	GlobalParms().phconf=Datos;
	SetPhConf(GlobalParms().phconf);
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
	while(j<Datos.length && j<PHASEs().length)
	{
		Datos[j]=RemoveUnuseChar(Datos[j]);
		Datos[j]=Datos[j].trim();
		if(Datos[j]=="" || Datos[j]==" ")
			Datos.splice(j,1);
		else
		{
			Datos[j]=Datos[j].split(",");
			PhN=parseInt("0"+Datos[j][0]);
			if(PhN<(GlobalParms().Phases+GlobalParms().Virtual_Phases+GlobalParms().Groups_Phases))
			{
				PHASEs()[PhN].Numero=PhN;
				if(Datos[j][1]!="")
					PHASEs()[PhN].MskError=Math.abs(parseInt("0"+Datos[j][1]));
				if(Datos[j][2]!="")
					PHASEs()[PhN].FState=parseInt("0"+Datos[j][2]);
				//-----------------------------------------
				if(Datos[j][3]!="")
				{
					Datos[j][3]=Datos[j][3].split(" ");
					PHASEs()[PhN].AMiRT=(parseInt("0"+Datos[j][3][0])>>8);
					if(isNaN(Datos[j][3][0])!=true)
						PHASEs()[PhN].MiRT=parseInt("0"+Datos[j][3][0])&0xFF;
						PHASEs()[PhN].AMiYT=(parseInt("0"+Datos[j][3][1])>>8);
					if(isNaN(Datos[j][3][1])!=true)
						PHASEs()[PhN].MiYT=parseInt("0"+Datos[j][3][1])&0xFF;
					PHASEs()[PhN].AMiGT=(parseInt("0"+Datos[j][3][2])>>8);
					if(isNaN(Datos[j][3][2])!=true)
						PHASEs()[PhN].MiGT=parseInt("0"+Datos[j][3][2])&0xFF;
				}
				//-----------------------------------------
				if(Datos[j][4]!="")
				{
					Datos[j][4]=Datos[j][4].split(" ");
					if(isNaN(Datos[j][4][0])!=true)
						PHASEs()[PhN].MaRT=parseInt("0"+Datos[j][4][0]);
					if(isNaN(Datos[j][4][1])!=true)
						PHASEs()[PhN].MaYT=parseInt("0"+Datos[j][4][1]);
					if(isNaN(Datos[j][4][2])!=true)
						PHASEs()[PhN].MaGT=parseInt("0"+Datos[j][4][2]);
				}
				//-----------------------------------------
				if(Datos[j][5]!="")
					if(isNaN(Datos[j][5])!=true)
						PHASEs()[PhN].TOEE=parseInt("0"+Datos[j][5]);
				if(Datos[j][6]!="")
					if(isNaN(Datos[j][6])!=true)
						PHASEs()[PhN].TOEC=parseInt("0"+Datos[j][6]);
				//PHASEs()[PhN].TOEE=GlobalParms().Time_Out_Electrical_Error;	//parseInt("0"+Datos[j][16]);
				//PHASEs()[PhN].TOEC=GlobalParms().Time_Out_Consumption_Error;//parseInt("0"+Datos[j][17]);
				//-----------------------------------------
				if(Datos[j][7]!="")
				{
					PHASEs()[PhN].R2V=new Array();
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
							PHASEs()[PhN].R2V[ev]=parseInt("0"+temp[i][0]);
							ev++
						}
					}
					PHASEs()[PhN].R2V.reverse();
					//--------------------------
					PHASEs()[PhN].V2R=new Array();
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
							PHASEs()[PhN].V2R[ev]=parseInt("0"+temp[i][0]);
							ev++
						}
					}
					PHASEs()[PhN].V2R.reverse();
				}
				//-----------------------------------------
				if(Datos[j][8]!="")
				{
					Datos[j][8]=Datos[j][8].split(" ");
					PHASEs()[PhN].PotLR=Datos[j][8][0];
					PHASEs()[PhN].PotLY=Datos[j][8][1];
					PHASEs()[PhN].PotLG=Datos[j][8][2];
				}
				//-----------------------------------------
				if(Datos[j][9]!="")
					PHASEs()[PhN].Type=parseInt("0"+Datos[j][9])&0x07;
				//-----------------------------------------
				if(Datos[j][10]!="")
				{
					PHASEs()[PhN].Name=Datos[j][10];
				}
				//-----------------------------------------
				//PHASEs()[PhN].Sec= new Array();
			}
			j++;
		}
	}
	for(var i=0;i<PHASEs().length;i++)
	{
		if(PHASEs()[i].Name==null)
			PHASEs()[i].Name="Mov["+(i+1)+"]";
	}
	SetEv();
}
function LogPHASEs()
{
	temp="";
	for(var j=0;j<PHASEs().length;j++)
	{
		temp+="["+j+"],";
		temp+=""+PHASEs()[j].Numero+",";
		temp+=""+PHASEs()[j].MskError+",";
		temp+=""+PHASEs()[j].FState+",";
		temp+=""+PHASEs()[j].AMiRT+",";
		temp+=""+PHASEs()[j].AMiYT+",";
		temp+=""+PHASEs()[j].AMiGT+",";
		temp+=""+PHASEs()[j].MiRT+",";
		temp+=""+PHASEs()[j].MiYT+",";
		temp+=""+PHASEs()[j].MiGT+",";
		temp+=""+PHASEs()[j].MaRT+",";
		temp+=""+PHASEs()[j].MaYT+",";
		temp+=""+PHASEs()[j].MaGT+",";
		temp+=""+PHASEs()[j].TOEE+",";
		temp+=""+PHASEs()[j].TOEC+",";
		temp+="\tCFT:"
		for(var i=0;i<PHASEs()[j].Sec.length;i++)
		{
			temp+=i+":"+(PHASEs()[j].Sec[i]-1)+" ";
		}
		if(PHASEs()[j].R2V)
		{
			temp+="\tR2V:"
			for(var i=0;i<PHASEs()[j].R2V.length;i++)
			{
				temp+=PHASEs()[j].R2V[i]+",";
			}
		}
		if(PHASEs()[j].V2R)
		{
			temp+=" V2R:"
			for(var i=0;i<PHASEs()[j].V2R.length;i++)
			{
				temp+=PHASEs()[j].V2R[i]+",";
			}
		}
		temp+="\t"+PHASEs()[j].PotLR+",";
		temp+=""+PHASEs()[j].PotLY+",";
		temp+=""+PHASEs()[j].PotLG+",";
		temp+="Plc"+PHASEs()[j].PLC+",";
		temp+="\n";
	}
	LOG(temp);
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
	PrgEd[SrcIdx].Links = new Array();
	iLinks=PrgEd[SrcIdx].Links
	//--------------- Links Fijos por HW --------------
	iLinks[0]=new Array();
	iLinks[0][0]="WebLog"
	iLinks[0][1]="0";
	iLinks[0][2]="No Config";
	for(var j=1;j<9;j++)
	{
		iLinks[j]=new Array();
		iLinks[j][0]="Serial Port"
		iLinks[j][1]=""+j+"";
		iLinks[j][2]="115200,8N1";
	}
	if(GlobalParms().Model.indexOf("DGV")!=-1)
	{
		iLinks[j]=new Array();
		iLinks[j][0]="USB Port"
		iLinks[j][1]=""+j+"";
		iLinks[j][2]="No Config";
		j++;
	}
	//---------------------------------------------------
	PrgEd[SrcIdx].GlobalParms.ip_offset=j;
	PrgEd[SrcIdx].Links=iLinks.concat(Datos);
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
	ErrorsCfg().length=0;
	PrgEd[SrcIdx].ErrorsCfg=Datos.slice();
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
	DefIn().length=0;
	var Nin=0;
	var j=0;
	iIOs=IOs();
	for(i=0;i<Datos.length;i++)
	{
		switch(Datos[i][0])
		{
			case "I/O":
				Datos[i][1]=Datos[i][1].split(",");
						Nin=			parseInt("0"+Datos[i][1][0]);//numero de IO
				if(iIOs.length>Nin)
				{
					iIOs[Nin].Enable=	parseInt("0"+Datos[i][1][1]);//Enable or disable
					iIOs[Nin].Type=	parseInt("0"+Datos[i][1][2]);//tipo
					iIOs[Nin].Mode=	parseInt("0"+Datos[i][1][3]);//modo
					iIOs[Nin].neg=		parseInt("0"+Datos[i][1][4]);//invert
					iIOs[Nin].Flank=	parseInt("0"+Datos[i][1][5]);//flank de conteo 
					iIOs[Nin].TimeOut=	parseInt("0"+Datos[i][1][6]);// estado de falla
					iIOs[Nin].FailSts=	parseInt("0"+Datos[i][1][7]);
					iIOs[Nin].Plcs=	parseInt("0"+Datos[i][1][8]);
					iIOs[Nin].Name=	Datos[i][1][9];
					if(iIOs[Nin].Name=="" || iIOs[Nin].Name==undefined)
						iIOs[Nin].Name="Entrada["+(Nin+1)+"]";
					iIOs[Nin].Used=0;
				}
			break;
			default:
				DefIn()[j]=Datos[i].slice();
				j++;
			break;
		}
	}
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvOTU(Datos)
{
	RcvFile(PrgEd[SrcIdx], Datos);
	//Datos=Datos.responseText;
	//RcvOTU2(Datos);
}
function RcvOTU2(Datos)
{
	var DatosT=0
	var temp;
	var i=0;
	var j=0;
	Datos=Datos.split("\n\n");
	OTU().CftPLCs= new Array(GlobalParms().Controllers);
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
			OTU().Link=parseInt("0"+DatosT[1]);
		DatosT=Datos[0][1].split(":");
		if(DatosT[0]=="G1G2")
			OTU().G1G2=parseInt("0"+DatosT[1]);
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
				//OTU().CftPLCs[temp] = new Object();
				DatosT[j]=DatosT[j].split(':');
				temp=parseInt("0"+DatosT[j][0])
				OTU().CftPLCs[temp]=DatosT[j][1].split(',');
				for(var i=0;i<OTU().CftPLCs[temp].length;i++)
				{
					OTU().CftPLCs[temp][i]=OTU().CftPLCs[temp][i].split('a');
					OTU().CftPLCs[temp][i]=ConvToInt(OTU().CftPLCs[temp][i]);
				}
			}
		}
	}
	OTU().BitCofigRx=new Array();
	OTU().BitCofigTx=new Array();
	OTU().FO=0;
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
				OTU().BitCofigRx[OTU().BitCofigRx.length]=new Object();
				OTU().BitCofigRx[OTU().BitCofigRx.length-1].NBit=parseInt("0"+DatosT[j][0]);
				OTU().BitCofigRx[OTU().BitCofigRx.length-1].Fnc=DatosT[j][1];
				OTU().BitCofigRx[OTU().BitCofigRx.length-1].Parms=DatosT[j].slice(2,DatosT[j].length);
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
					OTU().FO=parseInt("0"+DatosT[j][0]);
					if(OTU().FO)
						OTU().FO++;
				}
				else
				{
					OTU().BitCofigTx[OTU().BitCofigTx.length]=new Object();
					OTU().BitCofigTx[OTU().BitCofigTx.length-1].NBit=parseInt("0"+DatosT[j][0]);
					OTU().BitCofigTx[OTU().BitCofigTx.length-1].Fnc=DatosT[j][1];
					OTU().BitCofigTx[OTU().BitCofigTx.length-1].Parms=DatosT[j].slice(2,DatosT[j].length);
				}
			}
		}
	}
	//-----------------------------------
}// */
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function SdgvP_Tsk()
{
	var idx=0;
	var tsk="";
	var ptr;
	iSdgvP=SdgvP()
	while(iSdgvP["tsk"+idx])
	{
		tsk=iSdgvP["tsk"+idx];
		if(!iSdgvP.Tsk)
			iSdgvP.Tsk=new Array();
		if(!iSdgvP.Tsk[idx])
			iSdgvP.Tsk[idx]=new Object();
		iSdgvP.Tsk[idx].IDsrv=254;
		iSdgvP.Tsk[idx].Sck=2;
		iSdgvP.Tsk[idx].Period=10;
		ptr=tsk.indexOf(",");	//Tsk
		if(ptr!=-1)
		{
			iSdgvP.Tsk[idx].cmps=tsk.substring(ptr+1);	//Byte Period
			iSdgvP.Tsk[idx].Period=parseInt("0"+iSdgvP.Tsk[idx].cmps);
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Ctrl
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1); //Byte ID-Src
			iSdgvP.Tsk[idx].IDsrv=parseInt("0"+iSdgvP.Tsk[idx].cmps);
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte ID-Trg
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Sck-Src
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Sck-Trg
			iSdgvP.Tsk[idx].Sck=parseInt("0"+iSdgvP.Tsk[idx].cmps);
			//------------------------------------------
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Stuf
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Stuf
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Stuf
			//------------------------------------------
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Size-0
			iSdgvP.Tsk[idx].Size=parseInt("0"+iSdgvP.Tsk[idx].cmps);
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Size-1
			iSdgvP.Tsk[idx].Size+=parseInt("0"+iSdgvP.Tsk[idx].cmps)<<8;
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Size-2
			iSdgvP.Tsk[idx].Size+=parseInt("0"+iSdgvP.Tsk[idx].cmps)<<16;
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr+1);// Byte Size-3
			iSdgvP.Tsk[idx].Size+=parseInt("0"+iSdgvP.Tsk[idx].cmps)<<24;
			//------------------------------------------
			ptr=iSdgvP.Tsk[idx].cmps.indexOf(",");
			if(ptr==-1)
				break;
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.substring(ptr);// Data String
			if(GlobalParms().Model.indexOf("M3")!=-1)
			{
				for(var i=0;i<DgvPM3.length;i+=2)
				{
					iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.replace(DgvPM3[i+1],(","+DgvPM3[i]));
				}
			}
			if(GlobalParms().Model.indexOf("M4")!=-1)
			{
				for(var i=0;i<DgvPM4.length;i+=2)
				{
					iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.replace(DgvPM4[i+1],(","+DgvPM4[i]));
				}
			}
			iSdgvP.Tsk[idx].cmps=iSdgvP.Tsk[idx].cmps.split(',');
			RemoveUnusedItem(iSdgvP.Tsk[idx].cmps);				
		}
		//------------------------------------------
		idx++;
	}	
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function RcvFile(base_obj,Datos)
{
	if(Datos.responseText != undefined)
		Datos=Datos.responseText;
	RemComment(Datos);
	Datos=Datos.split("\n");
	RemoveUnusedItem(Datos);
	var i=0;
	while(i<Datos.length)
	{
		if(Datos[i].indexOf(":") != -1)
			Datos[i]=Datos[i].split(":");
		else
			if(Datos[i].indexOf("=") != -1)
				Datos[i]=Datos[i].split("=");
			else
			{
				idx=Datos[i].lastIndexOf(" ");
				if(idx != -1)
					Datos[i]=[Datos[i].substring(0,idx), Datos[i].substring(idx+1)]
			}
		Datos[i][0]=Datos[i][0].trim();
		Datos[i][0]=Remplace(Datos[i][0]," ","_");
		RemoveUnusedItem(Datos[i]);
		Datos[i][0]=Datos[i][0].split(".");
		RemoveUnusedItem(Datos[i][0]);
		addobj(base_obj, Datos[i][0], Datos[i][1]);
		i++;
	}
}
function addobj(ref, vname, val)
{
	var obj = ref;
	var lst_obj = obj;
	for(i=0;i<vname.length;i++)
	{
		//vname[i]=vname[i].toLowerCase();

		[idx,name]=get_string_index(vname[i]);
		if(idx == null)
		    name=vname[i];
		if(!obj[name])
		{
			if(idx != null)
			{
				obj[name]=new Array();
				obj=obj[name];
				name=idx;
			}
			obj[name]=new Object();
		}
		else
		{
			if(idx != null)
			{
				obj = obj[name];
				name = idx;
				if(obj[name]==undefined)
					obj[name]=new Object();
			}
		}
		lst_obj=obj;
		obj=obj[name];
	}
	if(val!=undefined) 
		lst_obj[name]=val.getval();
	else
		lst_obj[name]=undefined;
}
function obj2txt(base,obj)
{
	var out="";
	var rslt;
	rslt=Object.prototype.toString.call(obj);
	if(rslt != '[object Undefined]' && rslt != '[object Function]' && rslt != '[object Null]' && rslt != '[object Object]' && rslt != "[object Array]")
	{
		return (base+"="+obj.toString()+"\n");
	}
	for (var prop in obj)
	{
		rslt=Object.prototype.toString.call(obj[prop]);
		if((rslt == '[object Undefined]')||(rslt == '[object Function]')||(rslt == '[object Null]'))
		{
		}
		else
		{
			if(rslt == '[object Object]')
			{
				out+=obj2txt(base+"."+prop.toString(),obj[prop]);
			}
			else
			{
				if(rslt == "[object Array]")
				{
					for (var i = 0; i < obj[prop].length; i++)
					{
						out+=obj2txt(base+"."+prop.toString()+"["+i+"]",obj[prop][i]);
					}
				}
				else
				{
					out+=base+"."+prop.toString()+"="+obj[prop].toString()+"\n";
				}
			}
		}
	}
	return out;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
percent=5;
