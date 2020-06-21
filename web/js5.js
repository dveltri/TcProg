/*
0x001 Reload Plan PLC 0 
0x002 Reload Plan PLC 1 
0x004 Reload Plan PLC 2 
0x008 Reload Plan PLC 3 
0x010 Reload Scheduler PLC 0 
0x020 Reload Scheduler PLC 1 
0x030 Reload Scheduler PLC 2 
0x040 Reload Scheduler PLC 3
0x100 Restart Controller
0x200 Recommend (X)
0x400 Error Consistence
0x800 Modified	*/
//-------------------------------------------------------
var ParmType=[{
Modified:0,Reload:0x100,	Unit:1,		Type:"str",		MaxLen:[2,2],	FncChk:0,			Child:[],														Range:[['0','9'],['A','F'],['a','f']],									Nombre:"GlobalParms.MAC",						AlerTxt:"debe ingresar 2 caracteres y deben pertenecer a los siguientes rangos ['0','9']or['A','F']or['a','f']"},{
Modified:0,Reload:0x100,	Unit:null,	Type:"str",		MaxLen:[1,40],	FncChk:0,			Child:[],														Range:[['0','9'],['a','z'],['A','Z'],['.','_',' ']],					Nombre:"GlobalParms.ID",						AlerTxt:"Error la Identificacion no es valida"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[0,255]],														Nombre:"GlobalParms.ETH",						AlerTxt:"Los campos de la dirrecion ip deben ser un valor entre 0 y 255"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[0],[255]],														Nombre:"GlobalParms.NETMASK",					AlerTxt:"Los campos de la mascara de red solo pueden ser 0 o 255"},{
Modified:0,Reload:0x300,	Unit:1,		Type:"int",		MaxLen:[1,2],	FncChk:0,			Child:[],														Range:[[10,90]],														Nombre:"GlobalParms.FlasCA",					AlerTxt:"Este parametro debe ser entre 10 y 90"},{
Modified:0,Reload:0x100,	Unit:8,		Type:"int",		MaxLen:[1,2],	FncChk:0,			Child:[RstTCHw,RstSch,RstCfts,RstPlnPlc,RstOTUPlc,RstPMCPlc],	Range:[[0,16]],															Nombre:"GlobalParms.Loops",						AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x100,	Unit:8,		Type:"int",		MaxLen:[1,2],	FncChk:0,			Child:[],														Range:[[0,16]],															Nombre:"GlobalParms.Inputs",					AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x100,	Unit:2,		Type:"int",		MaxLen:[1,2],	FncChk:0,			Child:[RstTCHw,RstSch,RstCfts,RstPlnPlc,RstOTUPlc,RstPMCPlc],	Range:[[0,24]],															Nombre:"GlobalParms.Phases",					AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,2],	FncChk:0,			Child:[RstTCHw,RstSch,RstCfts,RstPlnPlc,RstOTUPlc,RstPMCPlc],	Range:[[1,4]],															Nombre:"GlobalParms.Controllers",				AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x300,	Unit:1,		Type:"int",		MaxLen:[1,2],	FncChk:0,			Child:[],														Range:[[0,240]],														Nombre:"GlobalParms.Time_Cap",					AlerTxt:"Este parametro puede ser como maximo hasta 240minutos 0->disabled"},{
Modified:0,Reload:0x300,	Unit:1,		Type:"int",		MaxLen:[1,1],	FncChk:0,			Child:[],														Range:[[0,3]],															Nombre:"GlobalParms.Enable_GPS",				AlerTxt:"Este parametro puede ser como maximo hasta 3 o 0->disabled"},{
Modified:0,Reload:0x300,	Unit:1,		Type:"int",		MaxLen:[1,4],	FncChk:0,			Child:[],														Range:[[-720,720]],														Nombre:"GlobalParms.Time_Zone_GMT",				AlerTxt:"Este parametro puede ser como maximo -720 hasta 720"},{
Modified:0,Reload:0x300,	Unit:1,		Type:"int",		MaxLen:[1,2],	FncChk:0,			Child:[],														Range:[[0,4294967295]],													Nombre:"GlobalParms.WACVrw",					AlerTxt:"Este parametros es numerico"},{
Modified:0,Reload:0x300,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[10,16],[35,52],[100,130],[200,270]],							Nombre:"GlobalParms.Alert_Over_Voltage",		AlerTxt:"Este valor erroneo"},{
Modified:0,Reload:0x300,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[9,16],[35,52],[100,130],[140,230]],								Nombre:"GlobalParms.Normal_Voltage",			AlerTxt:"Este valor erroneo"},{
Modified:0,Reload:0x300,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[5,12],[35,52],[100,130],[140,230]],								Nombre:"GlobalParms.Error_Minimal_Voltage",		AlerTxt:"Este valor erroneo"},{
Modified:0,Reload:0x300,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[3,10],[35,52],[100,130],[140,230]],								Nombre:"GlobalParms.Error_Critical_Voltage",	AlerTxt:"Este valor erroneo"},{
Modified:0,Reload:0x000,	Unit:null,	Type:"str",		MaxLen:[1,20],	FncChk:0,			Child:[],														Range:[['a','z'],['A','Z']],											Nombre:"pPLCs.Name",							AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x000,	Unit:1,		Type:"int",		MaxLen:[1,1000],FncChk:0,			Child:[],														Range:[[1,1000]],														Nombre:"pPLCs.Number",							AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x2F0,	Unit:0,		Type:"str",		MaxLen:[1,15],	FncChk:0,			Child:[],														Range:[['a','z'],['0','3'],['/'],['.']],								Nombre:"pPLCs.Scheduler",						AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"aryint",	MaxLen:[1,16],	FncChk:0,			Child:[],														Range:[[0,23]],															Nombre:"pPLCs.Phases",							AlerTxt:"Numero de Phases Fuera de rango"},{
Modified:0,Reload:0x1FF,	Unit:1,		Type:"int",		MaxLen:[1,2],	FncChk:0,			Child:[RstPlnPlc,RstOTUPlc,RstPMCPlc],							Range:[[0,30]],															Nombre:"pPLCs.Sts",								AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x1FF,	Unit:1,		Type:"int",		MaxLen:[1,2],	FncChk:0,			Child:[],														Range:[[0,30]],															Nombre:"pPLCs.Sec",								AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x0F0,	Unit:1,		Type:"int",		MaxLen:[1,2],	FncChk:0,			Child:[],														Range:[[0,30]],															Nombre:"PLCs.Sch",								AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x20F,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[0,255]],														Nombre:"PHASEs.FState",							AlerTxt:"Codigo de color incorrecto"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,4],	FncChk:0,			Child:[],														Range:[[0,1023]],														Nombre:"PHASEs.TOEE",							AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,4],	FncChk:0,			Child:[],														Range:[[0,1023]],														Nombre:"PHASEs.TOEC",							AlerTxt:"Error en el valor ingresado para este parametro"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,5],	FncChk:0,			Child:[],														Range:[[0,65535]],														Nombre:"PHASEs.MskError",						AlerTxt:"Error en dato"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[0,1]],															Nombre:"PHASEs.AMiGT",							AlerTxt:"Minimo tiempo de verde automatico true o false"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[0,255]],														Nombre:"PHASEs.MiGT",							AlerTxt:"Este parametro puede ser como maximo hasta 255segundos 0->disabled"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[0,1]],															Nombre:"PHASEs.AMiRT",							AlerTxt:"Minimo tiempo de rojo automatico true o false"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[0,255]],														Nombre:"PHASEs.MiRT",							AlerTxt:"Este parametro puede ser como maximo hasta 255segundos 0->disabled"},{
Modified:0,Reload:0x2F0,	Unit:512,	Type:"int",		MaxLen:[3,6],	FncChk:0,			Child:[],														Range:[[0,262144]]				,Show:0.016666666,						Nombre:"IOs.TimeOut",							AlerTxt:"El time out de las entradas puede ser 0 a 2184minutos siendo que 0 desactiva esta funcionalidad"},{
Modified:0,Reload:0x00F,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[RstPlnLs],												Range:[[1,1000]],														Nombre:"PLAN.Ls",								AlerTxt:"Error en plan control manual"},{
Modified:0,Reload:0x00F,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[1,1000]],														Nombre:"PLAN.MC",								AlerTxt:"Error en plan control manual"},{
Modified:0,Reload:0x00F,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[1,1000]],														Nombre:"PLAN.OTU",								AlerTxt:"Error en plan otu"},{
Modified:0,Reload:0x00F,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[20,1000]],														Nombre:"PLAN.CYCLE",							AlerTxt:"Error en tiempo de ciclo"},{
Modified:0,Reload:0x00F,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[1,1000]],														Nombre:"PLAN.TIME",								AlerTxt:"Error en tiempo de estado"},{
Modified:0,Reload:0x00F,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[0,1000]],														Nombre:"PLAN.SYN.TIME",							AlerTxt:"Error en tiempo de estado"},{
Modified:0,Reload:0x00F,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:ChkTMPE,		Child:[],														Range:[[0,900]],														Nombre:"PLAN.STS.TMPE",							AlerTxt:"El tiempo maximo de permanencia de estado puede ser 900seg a 0->disabled"},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[1,7]],															Nombre:"EV.TIME.Y",								AlerTxt:""},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[0,7]],															Nombre:"EV.TIME.R",								AlerTxt:""},{
Modified:0,Reload:0x100,	Unit:1,		Type:"int",		MaxLen:[1,3],	FncChk:0,			Child:[],														Range:[[1,32]],															Nombre:"EV.TIME.r",								AlerTxt:""},{
Modified:0,Reload:0x00F,	Unit:1,		Type:"int",		MaxLen:[1,2],	FncChk:0,			Child:[],														Range:[[0,30]],															Nombre:"PLAN.STS.TmPE",							AlerTxt:"El tiempo maximo de permanencia de estado puede ser 30seg a 0->desactiva esta funcionalidad"},{
Modified:0,Reload:0x100,	Unit:0,		Type:"str",		MaxLen:[1,19],	FncChk:0,			Child:[],														Range:[['?',' ',':','/','A','0','1','2','3','4','5','6','7','8','9']],	Nombre:"pPLCs.SyncRef",							AlerTxt:"Error en el valor ingresado para este parametro"}
];

function RstTCHw()
{
	GlobalParms().HwIo=HW_IOS;
	PLCs().length=0;
	PHASEs().length=0;
	//IOs.length=0;
	UpdateSizeOfStruct();
}
function RstSch()
{
	HolyDays = new Array();
	WeekDays = new Array();
	TimeScheduler = new Array();
	WeekDays[0]=new Object();
	WeekDays[0].Date="01/01/????";
	WeekDays[0].TimeScheduler=new Array();
	WeekDays[0].TimeScheduler[0]="domingo"; //Adiciona plano geral como padrão 
	WeekDays[0].TimeScheduler[1]="domingo"; 
	WeekDays[0].TimeScheduler[2]="domingo";
	WeekDays[0].TimeScheduler[3]="domingo";
	WeekDays[0].TimeScheduler[4]="domingo";
	WeekDays[0].TimeScheduler[5]="domingo";
	WeekDays[0].TimeScheduler[6]="domingo";
	TimeScheduler[0]=new Object();
	TimeScheduler[0].Nombre="domingo";
	TimeScheduler[0].Hs=new Array();
	TimeScheduler[0].Hs[0]=new Object();
	TimeScheduler[0].Hs[0].Time="00:00:00";
	TimeScheduler[0].Hs[0].Plan="99";
	for(var j=0;j<GlobalParms().Controllers;j++)
	{
		PLCs()[j].HolyDays=HolyDays.clone();
		PLCs()[j].WeekDays=WeekDays.clone();
		PLCs()[j].TimeScheduler=TimeScheduler.clone();
	}
	ModParm("PLCs.Sch");
}
function RstEvs()
{
	SetPhConf(GlobalParms().phconf);
	for(var i=0;i<PLCs()[PlcIdx].EV.length;i++)
	{
		PLCs()[PlcIdx].EV[i]=genEv();
	}
}
function RstCfts()
{
	for(var y=0;y<PLCs()[PlcIdx].Phases.length;y++)
	{
		PHASEs()[PLCs()[PlcIdx].Phases[y]].Sec = new Array();
	}
}
function RstPlnLs()
{
	PLCs()[PlcIdx].PlanList = new Array();
}
function RstPlnPlc()
{
	iplc=PLCs()[PlcIdx]
	iplc.Plans = new Array();
	iplc.PlanList.length = new Array();
}
function RstOTUPlc()
{
	iplc=PLCs()[PlcIdx]
	if(!iplc.OTUPlan)
		iplc.OTUPlan = new Object();
	iplc.OTUPlan.OTUSEQSTS = new Array();
	iplc.OTUPlan.OTUDEMSTS = new Array();
	iplc.OTUPlan.OTUSTSDEM = new Array();
	iplc.OTUPlan.OTUDEMCLR = new Array();
}
function RstPMCPlc()
{
	iplc=PLCs()[PlcIdx]
	if(!iplc.McPlan)
		iplc.McPlan =  new Object();
	iplc.McPlan.SYCPLCTOU = new Array();
	iplc.McPlan.MACSEQSTP = new Array();
	iplc.McPlan.MACSTSSTP = new Array();
}
//=======================================================================================
function blockSpecialChar(e) 
{
	var k = e.which || e.keyCode;
	return (k==8 || k==9 || k==32 || k==35 || k==36 || k==46 || (k>=48 && k<=57) || (k>=65 && k<=90) || (k>=97 && k<=122));
}
function ModParm(Nombre)
{
	for(var pn=0;pn<ParmType.length;pn++)
		if(ParmType[pn].Nombre==Nombre)break;
	if(pn>=ParmType.length) return
	for(var ch=0;ch<ParmType[pn].Child.length;ch++)
		ParmType[pn].Child[ch]();
	ParmType[pn].Modified++;
	Reload|=ParmType[pn].Reload;
}
function ListParm()
{
	var text="";
	for(var pn=0;pn<ParmType.length;pn++)
	{
		text+=ParmType[pn].Nombre+"\tType:"+ParmType[pn].Type+"\tUnit:"+ParmType[pn].Unit+"\tMaxLen:"+ParmType[pn].MaxLen+"\tRange:"+ParmType[pn].Range+"\tReload:"+ParmType[pn].Reload+"\tModifie:"+ParmType[pn].Modified+"\n";
	}
	alert(text);
}
function ChkSetParm(Nombre,Valor,Parm)
{
	if(ChkParm(Nombre,Valor)==true)
		Parm=parseInt(Valor)
}
function ChkParmDef(Nombre,Valor,Def)
{
	return ChkParm(Nombre,Valor)
}
function GetParmByName(Nombre)
{
	var ret=true;
	for(var pn=0;pn<ParmType.length;pn++)
	{
		if(ParmType[pn].Nombre==Nombre)
		{
			return ParmType[pn];
		}
	}
}
function ChkParm(Nombre,Valor)
{
	var ret=true;
	for(var pn=0;pn<ParmType.length;pn++)
		if(ParmType[pn].Nombre==Nombre)break;
	if(pn>=ParmType.length){alert(Nombre+Str_ChkParm);return false;}
	switch(ParmType[pn].Type)
	{
		case "int":
			if(isNaN(Valor)==true){alert(Nombre+":\n"+ParmType[pn].AlerTxt);return false;}
			for(var rg=0;rg<ParmType[pn].Range.length;rg++)
			{
				if(ParmType[pn].Range[rg].length==1)
					if(Valor==ParmType[pn].Range[rg][0])break
				if(ParmType[pn].Range[rg].length==2)
					if(Valor>=ParmType[pn].Range[rg][0])
						if(ParmType[pn].Range[rg][1]>=Valor)
							break
			}
			if(rg>=ParmType[pn].Range.length){alert(Nombre+":\n"+ParmType[pn].AlerTxt);return false;}
			if((Valor%ParmType[pn].Unit)!=0){alert(Nombre+":\n"+ParmType[pn].AlerTxt);return false;}
		break;
		case "str":
			if(	Valor.length<ParmType[pn].MaxLen[0] || ParmType[pn].MaxLen[1]<Valor.length)
			{
				alert(Nombre+":\n"+ParmType[pn].AlerTxt);
				return false;
			}
			for(var nchar=0;nchar<Valor.length;nchar++)
			{
				for(var rg=0;rg<ParmType[pn].Range.length;rg++)
				{
					if(ParmType[pn].Range[rg].length==2)
					{
						if(	Valor[nchar]>=ParmType[pn].Range[rg][0] &&
							ParmType[pn].Range[rg][1]>=Valor[nchar])
								break
					}
					else
					{
						if(ParmType[pn].Range[rg].indexOf(Valor[nchar])!=-1)
							break;
					}
				}
				if(rg>=ParmType[pn].Range.length){alert(Nombre+":\n"+ParmType[pn].AlerTxt);return false;}
			}
		break;
		case "aryint":
			Valores=Valor.slice();
			for(var i=0;i<Valores.length;i++)
			{
				Valor=Valores[i];
				if(isNaN(Valor)==true){alert(Nombre+":\n"+ParmType[pn].AlerTxt);return false;}
				for(var rg=0;rg<ParmType[pn].Range.length;rg++)
				{
					if(ParmType[pn].Range[rg].length==1)
						if(Valor==ParmType[pn].Range[rg][0])break
					if(ParmType[pn].Range[rg].length==2)
						if(Valor>=ParmType[pn].Range[rg][0])
							if(ParmType[pn].Range[rg][1]>=Valor)
								break
				}
				if(rg>=ParmType[pn].Range.length){alert(Nombre+":\n"+ParmType[pn].AlerTxt);return false;}
				if((Valor%ParmType[pn].Unit)!=0){alert(Nombre+":\n"+ParmType[pn].AlerTxt);return false;}
			}
		break;
		default:
			alert(Nombre+Str_ChkParmTyp);
			return false;
		break
	}
	if(ParmType[pn].FncChk && ParmType[pn].FncChk(Nombre,Valor)!=true)
		return false;
	return true;
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ChkTMPE(Nombre,Valor)
{
	if(parseInt(Valor)>10)
		return true;
	else
		return false;
}
function CheckEthernet()
{
	var temp=0;
	temp=parseInt(document.getElementById("GlobalParms.ETH0").value);
	if(ChkParm("GlobalParms.ETH",temp)==true)
	{
		GlobalParms().ETH0[0]=temp;
		ModParm("GlobalParms.ETH");
	}
	temp=parseInt(document.getElementById("GlobalParms.ETH1").value);
	if(ChkParm("GlobalParms.ETH",temp)==true)
	{
		GlobalParms().ETH0[1]=temp;
		ModParm("GlobalParms.ETH");
	}
	temp=parseInt(document.getElementById("GlobalParms.ETH2").value);
	if(ChkParm("GlobalParms.ETH",temp)==true)
	{
		GlobalParms().ETH0[2]=temp;
		ModParm("GlobalParms.ETH");
	}
	temp=parseInt(document.getElementById("GlobalParms.ETH3").value);
	if(ChkParm("GlobalParms.ETH",temp)==true)
	{
		GlobalParms().ETH0[3]=temp;
		ModParm("GlobalParms.ETH");
	}
	//--------------------------------------------------------------
	temp=parseInt(document.getElementById("GlobalParms.NETMASK0").value);
	if(ChkParm("GlobalParms.NETMASK",temp)==true)
	{
		GlobalParms().NETMASK0[0]=temp;
		ModParm("GlobalParms.NETMASK");
	}
	temp=parseInt(document.getElementById("GlobalParms.NETMASK1").value);
	if(ChkParm("GlobalParms.NETMASK",temp)==true)
	{
		GlobalParms().NETMASK0[1]=temp;
		ModParm("GlobalParms.NETMASK");
	}
	temp=parseInt(document.getElementById("GlobalParms.NETMASK2").value);
	if(ChkParm("GlobalParms.NETMASK",temp)==true)
	{
		GlobalParms().NETMASK0[2]=temp;
		ModParm("GlobalParms.NETMASK");
	}
	temp=parseInt(document.getElementById("GlobalParms.NETMASK3").value);
	if(ChkParm("GlobalParms.NETMASK",temp)==true)
	{
		GlobalParms().NETMASK0[3]=temp;
		ModParm("GlobalParms.NETMASK");
	}
	//--------------------------------------------------------------
	if(GlobalParms().Model.indexOf("M4")!=-1)
	{
		temp=parseInt(document.getElementById("GlobalParms.DGW0").value);
		if(ChkParm("GlobalParms.ETH",temp)==true)
		{
			GlobalParms().DGW[0]=temp;
			ModParm("GlobalParms.ETH");
		}
		temp=parseInt(document.getElementById("GlobalParms.DGW1").value);
		if(ChkParm("GlobalParms.ETH",temp)==true)
		{
			GlobalParms().DGW[1]=temp;
			ModParm("GlobalParms.ETH");
		}
		temp=parseInt(document.getElementById("GlobalParms.DGW2").value);
		if(ChkParm("GlobalParms.ETH",temp)==true)
		{
			GlobalParms().DGW[2]=temp;
			ModParm("GlobalParms.ETH");
		}
		temp=parseInt(document.getElementById("GlobalParms.DGW3").value);
		if(ChkParm("GlobalParms.ETH",temp)==true)
		{
			GlobalParms().DGW[3]=temp;
			ModParm("GlobalParms.ETH");
		}
	}
	//--------------------------------------------------------------
	temp=document.getElementById("GlobalParms.ID");
	if(ChkParm("GlobalParms.ID",temp.value)==true)
	{
		GlobalParms().ID=temp.value;
		ModParm("GlobalParms.ID");
	}
	else 
		temp.value=GlobalParms().ID;
	//--------------------------------------------------------------
	temp=document.getElementById("GlobalParms.WACVrw");
	if(ChkParm("GlobalParms.WACVrw",temp.value)==true)
	{
		GlobalParms().Web_Access_Code_RW=temp.value;
		ModParm("GlobalParms.WACVrw");
	}
	else 
		temp.value=GlobalParms().Web_Access_Code_RW;
	//--------------------------------------------------------------
	temp=document.getElementById("GlobalParms.WACVro");
	if(ChkParm("GlobalParms.WACVrw",temp.value)==true)
	{
		GlobalParms().Web_Access_Code_RO=temp.value;
		ModParm("GlobalParms.WACVrw");
	}
	else 
		temp.value=GlobalParms().Web_Access_Code_RO;
}
function Setdphc()
{
	var temp=0;
	if(confirm(Str_ConfirmPHC)==false)
	return;
	for(var j=0;j<PLCs()[PlcIdx].Phases.length;j++)
	{
		var i=PLCs()[PlcIdx].Phases[j];
		if(i<PHASEs.length)
		{
			temp=parseInt(document.getElementById("TOEE"+i+"").innerHTML);
			if(ChkParm("PHASEs.TOEE",temp)==true)
			{
				PHASEs()[i].TOEE=temp;
				ModParm("PHASEs.TOEE");
			}
			var temp=0;
			temp=parseInt(document.getElementById("TOEC"+i+"").innerHTML);
			if(ChkParm("PHASEs.TOEC",temp)==true)
			{
				PHASEs()[i].TOEC=temp;
				ModParm("PHASEs.TOEC");
			}// */
			var temp=0;
			//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
			if(GlobalParms().Model.indexOf("DGV-uTC1-M4")!=-1)
			{
			}
			else
			{
				if(GlobalParms().Model.indexOf("M4")!=-1)
				{
					//temp=0x06000000;
					temp=0x06000000;
					if(document.getElementById("PhEr"+i+"0").checked==1)temp|=0x01000000;
					if(document.getElementById("PhEr"+i+"3").checked==1)temp|=0x00011000;
					//if(document.getElementById("PhEr"+i+"8").checked==1)temp|=0x100;
				}
				else
				{
					temp=0;
					if(document.getElementById("PhEr"+i+"0").checked==1)temp|=0x00000001;
					if(document.getElementById("PhEr"+i+"3").checked==1)temp|=0x00000008;
					//if(document.getElementById("PhEr"+i+"8").checked==1)temp|=0x100;
				}
				if(temp!=PHASEs()[i].MskError)
				{
					PHASEs()[i].MskError=temp;
					ModParm("PHASEs.MskError");
				}
			}
			//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
			/*if(OTU.Link==0)
			{
				temp=document.getElementById("Ph"+i+"_AMiGT").checked;
				if(temp!=PHASEs()[i].AMiGT)
				{
					PHASEs()[i].AMiGT=temp;
					ModParm("PHASEs.AMiGT");
				}
			}// */
			temp=parseInt(document.getElementById("Ph"+i+"_MiGT").innerHTML);
			if(temp!=PHASEs()[i].MiGT)
			{
				if(PHASEs()[i].MiGT<temp)
				{
					for(var nsts=0;nsts<PLCs()[PlcIdx].Sts.length;nsts++)
					{
						PLCs()[PlcIdx].Sts[nsts].TMAX=0;
					}
				}
				PHASEs()[i].MiGT=temp;
				PLCs()[PlcIdx].Plans = new Array();// borra los planos
				ModParm("PHASEs.MiGT");
			}
			//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
			/*if(OTU.Link==0)
			{
				temp=document.getElementById("Ph"+i+"_AMiRT").checked;
				if(temp!=PHASEs()[i].AMiRT)
				{
					PHASEs()[i].AMiRT=temp;
					ModParm("PHASEs.AMiRT");
				}
			}*/
			temp=parseInt(document.getElementById("Ph"+i+"_MiRT").innerHTML);
			if(temp!=PHASEs()[i].MiRT)
			{
				if(PHASEs()[i].MiRT<temp)
				{
					for(var nsts=0;nsts<PLCs()[PlcIdx].Sts.length;nsts++)
					{
						PLCs()[PlcIdx].Sts[nsts].TMAX=0;
					}
				}
				PHASEs()[i].MiRT=temp;
				PLCs()[PlcIdx].Plans = new Array();// borra los planos
				ModParm("PHASEs.MiRT");
			}
			//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
		}
	}
	GlobalParms().phconf=genPhc();
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModStartup()
{
	PlcIdx=0;
	CEV=0;
	PlnIdx=0;
	
	GlobalParms().Controllers
	
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModPlc()
{
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModPhConf()
{
}
function ModPhEv()
{
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModSec()
{
	var timeg=0;
	var CElmt;
	for(var j=0;j<PLCs()[PlcIdx].Phases.length;j++)
	{
		ph=PLCs()[PlcIdx].Phases[j];
		//PLCs()[ph].Sec = new Array();
		for(var i=0;i<PLCs()[PlcIdx].Phases.length;i++)
		{
			if(PLCs()[PlcIdx].Phases[i]!=ph)
			{
				CElmt=document.getElementById("CFT"+ph+""+PLCs()[PlcIdx].Phases[i]+"");
				if(CElmt)
				{
					timeg=CElmt.value;
					timeg=timeg.trim();
					if(timeg!="")
					{
						timeg=parseInt(timeg);
						if(timeg<0 || isNaN(timeg))timeg=0;
						CElmt.value=timeg;
						if(ph<PHASEs.length)
						{
							for(var X=0;X<PLCs()[ph].Sec.length;X++)
							{
								if(PLCs()[ph].Sec[X].phase==PLCs()[PlcIdx].Phases[i])
								{
									if(PLCs()[ph].Sec[X].time!=timeg)
									{
										PLCs()[ph].Sec[X].time=timeg;
										LOG("Mod PH:"+ph+" Sec:"+PLCs()[PlcIdx].Phases[i]+" V:"+timeg);
										break;
									}
									else
									{
										break;
									}
								}
							}
							if(X>=PLCs()[ph].Sec.length)
							{
								PLCs()[ph].Sec[X]= new Object();
								PLCs()[ph].Sec[X].time=timeg;
								PLCs()[ph].Sec[X].phase=PLCs()[PlcIdx].Phases[i];
								for(var w=0;w<PLCs()[PlcIdx].Sts.length;w++)
									PLCs()[PlcIdx].Sts[w].Colors[i]=17;
								ModParm("pPLCs.Sec");
								LOG("New PH:"+ph+" Sec:"+PLCs()[PlcIdx].Phases[i]+" V:"+timeg);
							}
						}
					}
					else
					{
						X=0;
						while(X<PLCs()[ph].Sec.length)
						{
							if(PLCs()[ph].Sec[X].phase==PLCs()[PlcIdx].Phases[i])
							{
								LOG("Del PH:"+ph+" Sec:"+PLCs()[PlcIdx].Phases[i]+" Non CFT");
								PLCs()[ph].Sec.splice(X,1);
							}
							else
								X++;
						}
					}
				}
			}
		}
	}
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModSch()
{
	ModParm("PLCs.Sch");
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModOPCT()
{
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModLinks()
{
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModError()
{
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModPHG()
{
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModDefIn()
{
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModOTU()
{
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModMaster()
{
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModIteris()
{
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModDGV()
{
}

percent=38;
