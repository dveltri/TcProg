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
FncChk:0,Nombre:"GlobalParms.MAC"						,Type:"str",Unit:1,MaxLen:[2,2],Range:[['0','9'],['A','F'],['a','f']]			,Reload:0x100,Modified:0,Child:[],AlerTxt:"debe ingresar 2 caracteres y deben pertenecer a los siguientes rangos ['0','9']or['A','F']or['a','f']"},{
FncChk:0,Nombre:"GlobalParms.ID"						,Type:"str",Unit:null,MaxLen:[1,40],Range:[['0','9'],['a','z'],['A','Z'],['.','_',' ']]	,Reload:0x100,Modified:0,Child:[],AlerTxt:"Error la Identificacion no es valida"},{
FncChk:0,Nombre:"GlobalParms.ETH"						,Type:"int",Unit:1,MaxLen:[1,3],Range:[[0,255]]									,Reload:0x100,Modified:0,Child:[],AlerTxt:"Los campos de la dirrecion ip deben ser un valor entre 0 y 255"},{
FncChk:0,Nombre:"GlobalParms.NETMASK"					,Type:"int",Unit:1,MaxLen:[1,3],Range:[[0],[255]]								,Reload:0x100,Modified:0,Child:[],AlerTxt:"Los campos de la mascara de red solo pueden ser 0 o 255"},{
FncChk:0,Nombre:"GlobalParms.FlasCA"					,Type:"int",Unit:1,MaxLen:[1,2],Range:[[10,90]]									,Reload:0x300,Modified:0,Child:[],AlerTxt:"Este parametro debe ser entre 10 y 90"},{
FncChk:0,Nombre:"GlobalParms.Loops"					,Type:"int",Unit:8,MaxLen:[1,2],Range:[[0,16]]									,Reload:0x100,Modified:0,Child:[RstTCHw,RstSch,RstCfts,RstPlnPlc,RstOTUPlc,RstPMCPlc],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"GlobalParms.Inputs"					,Type:"int",Unit:8,MaxLen:[1,2],Range:[[0,16]]									,Reload:0x100,Modified:0,Child:[],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"GlobalParms.Phases"					,Type:"int",Unit:2,MaxLen:[1,2],Range:[[0,24]]									,Reload:0x100,Modified:0,Child:[RstTCHw,RstSch,RstCfts,RstPlnPlc,RstOTUPlc,RstPMCPlc],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"GlobalParms.Controllers"				,Type:"int",Unit:1,MaxLen:[1,2],Range:[[1,4]]									,Reload:0x100,Modified:0,Child:[RstTCHw,RstSch,RstCfts,RstPlnPlc,RstOTUPlc,RstPMCPlc],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"GlobalParms.Time_Cap"				,Type:"int",Unit:1,MaxLen:[1,2],Range:[[0,240]]									,Reload:0x300,Modified:0,Child:[],AlerTxt:"Este parametro puede ser como maximo hasta 240minutos 0->disabled"},{
FncChk:0,Nombre:"GlobalParms.Enable_GPS"				,Type:"int",Unit:1,MaxLen:[1,1],Range:[[0,3]]									,Reload:0x300,Modified:0,Child:[],AlerTxt:"Este parametro puede ser como maximo hasta 3 o 0->disabled"},{
FncChk:0,Nombre:"GlobalParms.Time_Zone_GMT"			,Type:"int",Unit:1,MaxLen:[1,4],Range:[[-720,720]]								,Reload:0x300,Modified:0,Child:[],AlerTxt:"Este parametro puede ser como maximo -720 hasta 720"},{
FncChk:0,Nombre:"GlobalParms.WACVrw"					,Type:"int",Unit:1,MaxLen:[1,2],Range:[[0,4294967295]]							,Reload:0x300,Modified:0,Child:[],AlerTxt:"Este parametros es numerico"},{
FncChk:0,Nombre:"GlobalParms.Alert_Over_Voltage"		,Type:"int",Unit:1,MaxLen:[1,3],Range:[[10,16],[35,52],[100,130],[200,270]]		,Reload:0x300,Modified:0,Child:[],AlerTxt:"Este valor erroneo"},{
FncChk:0,Nombre:"GlobalParms.Normal_Voltage"			,Type:"int",Unit:1,MaxLen:[1,3],Range:[[9,16],[35,52],[100,130],[140,230]]		,Reload:0x300,Modified:0,Child:[],AlerTxt:"Este valor erroneo"},{
FncChk:0,Nombre:"GlobalParms.Error_Minimal_Voltage"	,Type:"int",Unit:1,MaxLen:[1,3],Range:[[5,12],[35,52],[100,130],[140,230]]		,Reload:0x300,Modified:0,Child:[],AlerTxt:"Este valor erroneo"},{
FncChk:0,Nombre:"GlobalParms.Error_Critical_Voltage"	,Type:"int",Unit:1,MaxLen:[1,3],Range:[[3,10],[35,52],[100,130],[140,230]]		,Reload:0x300,Modified:0,Child:[],AlerTxt:"Este valor erroneo"},{
FncChk:0,Nombre:"pPLCs.Name"							,Type:"str",Unit:null,MaxLen:[1,20],Range:[['a','z'],['A','Z']]					,Reload:0x000,Modified:0,Child:[],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"pPLCs.Number"						,Type:"int",Unit:1,MaxLen:[1,1000],Range:[[1,1000]]								,Reload:0x000,Modified:0,Child:[],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"pPLCs.SyncRef"						,Type:"str",Unit:0,MaxLen:[1,19],Range:[['?',' ',':','/','A','0','1','2','3','4','5','6','7','8','9']],Reload:0x100,Modified:0,Child:[],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"pPLCs.Scheduler"					,Type:"str",Unit:0,MaxLen:[1,15],Range:[['a','z'],['0','3'],['/'],['.']]		,Reload:0x2F0,Modified:0,Child:[],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"pPLCs.Phases"						,Type:"aryint",Unit:1,MaxLen:[1,16],Range:[[0,23]]								,Reload:0x100,Modified:0,Child:[],AlerTxt:"Numero de Phases Fuera de rango"},{
FncChk:0,Nombre:"pPLCs.Sts"							,Type:"int",Unit:1,MaxLen:[1,2],Range:[[0,30]]									,Reload:0x1FF,Modified:0,Child:[RstPlnPlc,RstOTUPlc,RstPMCPlc],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"pPLCs.Sec"							,Type:"int",Unit:1,MaxLen:[1,2],Range:[[0,30]]									,Reload:0x1FF,Modified:0,Child:[],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"PLCs.Sch"							,Type:"int",Unit:1,MaxLen:[1,2],Range:[[0,30]]									,Reload:0x0F0,Modified:0,Child:[],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"PHASEs.FState"						,Type:"int",Unit:1,MaxLen:[1,3],Range:[[0,255]]									,Reload:0x20F,Modified:0,Child:[],AlerTxt:"Codigo de color incorrecto"},{
FncChk:0,Nombre:"PHASEs.TOEE"						,Type:"int",Unit:1,MaxLen:[1,4],Range:[[0,1023]]								,Reload:0x100,Modified:0,Child:[],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"PHASEs.TOEC"						,Type:"int",Unit:1,MaxLen:[1,4],Range:[[0,1023]]								,Reload:0x100,Modified:0,Child:[],AlerTxt:"Error en el valor ingresado para este parametro"},{
FncChk:0,Nombre:"PHASEs.MskError"					,Type:"int",Unit:1,MaxLen:[1,5],Range:[[0,65535]]								,Reload:0x100,Modified:0,Child:[],AlerTxt:"Error en dato"},{
FncChk:0,Nombre:"PHASEs.AMiGT"						,Type:"int",Unit:1,MaxLen:[1,3],Range:[[0,1]]									,Reload:0x100,Modified:0,Child:[],AlerTxt:"Minimo tiempo de verde automatico true o false"},{
FncChk:0,Nombre:"PHASEs.MiGT"						,Type:"int",Unit:1,MaxLen:[1,3],Range:[[0,255]]									,Reload:0x100,Modified:0,Child:[],AlerTxt:"Este parametro puede ser como maximo hasta 255segundos 0->disabled"},{
FncChk:0,Nombre:"PHASEs.AMiRT"						,Type:"int",Unit:1,MaxLen:[1,3],Range:[[0,1]]									,Reload:0x100,Modified:0,Child:[],AlerTxt:"Minimo tiempo de rojo automatico true o false"},{
FncChk:0,Nombre:"PHASEs.MiRT"						,Type:"int",Unit:1,MaxLen:[1,3],Range:[[0,255]]									,Reload:0x100,Modified:0,Child:[],AlerTxt:"Este parametro puede ser como maximo hasta 255segundos 0->disabled"},{
FncChk:0,Nombre:"IOs.TimeOut"						,Type:"int",Unit:512,MaxLen:[3,6],Range:[[0,262144]]							,Reload:0x2F0,Modified:0,Show:0.016666666,Child:[],AlerTxt:"El time out de las entradas puede ser 0 a 2184minutos siendo que 0 desactiva esta funcionalidad"},{
FncChk:0,Nombre:"PLAN.Ls"							,Type:"int",Unit:1,MaxLen:[1,3],Range:[[1,1000]]								,Reload:0x00F,Modified:0,Child:[RstPlnLs],AlerTxt:"Error en plan control manual"},{
FncChk:0,Nombre:"PLAN.MC"							,Type:"int",Unit:1,MaxLen:[1,3],Range:[[1,1000]]								,Reload:0x00F,Modified:0,Child:[],AlerTxt:"Error en plan control manual"},{
FncChk:0,Nombre:"PLAN.OTU"							,Type:"int",Unit:1,MaxLen:[1,3],Range:[[1,1000]]								,Reload:0x00F,Modified:0,Child:[],AlerTxt:"Error en plan otu"},{
FncChk:0,Nombre:"PLAN.CYCLE"							,Type:"int",Unit:1,MaxLen:[1,3],Range:[[20,1000]]								,Reload:0x00F,Modified:0,Child:[],AlerTxt:"Error en tiempo de ciclo"},{
FncChk:0,Nombre:"PLAN.TIME"							,Type:"int",Unit:1,MaxLen:[1,3],Range:[[1,1000]]								,Reload:0x00F,Modified:0,Child:[],AlerTxt:"Error en tiempo de estado"},{
FncChk:0,Nombre:"PLAN.SYN.TIME"						,Type:"int",Unit:1,MaxLen:[1,3],Range:[[0,1000]]								,Reload:0x00F,Modified:0,Child:[],AlerTxt:"Error en tiempo de estado"},{
FncChk:ChkTMPE,Nombre:"PLAN.STS.TMPE"				,Type:"int",Unit:1,MaxLen:[1,3],Range:[[0,900]]									,Reload:0x00F,Modified:0,Child:[],AlerTxt:"El tiempo maximo de permanencia de estado puede ser 900seg a 0->disabled"},{
FncChk:0,Nombre:"EV.TIME.Y"							,Type:"int",Unit:1,MaxLen:[1,3],Range:[[1,7]]									,Reload:0x100,Modified:0,Child:[],AlerTxt:""},{
FncChk:0,Nombre:"EV.TIME.R"							,Type:"int",Unit:1,MaxLen:[1,3],Range:[[0,7]]									,Reload:0x100,Modified:0,Child:[],AlerTxt:""},{
FncChk:0,Nombre:"EV.TIME.r"							,Type:"int",Unit:1,MaxLen:[1,3],Range:[[1,32]]									,Reload:0x100,Modified:0,Child:[],AlerTxt:""},{
FncChk:0,Nombre:"PLAN.STS.TmPE"						,Type:"int",Unit:1,MaxLen:[1,2],Range:[[0,30]]									,Reload:0x00F,Modified:0,Child:[],AlerTxt:"El tiempo maximo de permanencia de estado puede ser 30seg a 0->desactiva esta funcionalidad"}];

function RstTCHw()
{
	GlobalParms.HwIo=HW_IOS;
	PLCs.length=0;
	PHASEs.length=0;
	//IOs.length=0;
	UpdateSizeOfStruct();
}
function RstSch()
{
	HolyDays.length=0;
	WeekDays.length=0;
	TimeScheduler.length=0;
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
	for(var j=0;j<GlobalParms.Controllers;j++)
	{
		PLCs()[j].HolyDays=HolyDays.clone();
		PLCs()[j].WeekDays=WeekDays.clone();
		PLCs()[j].TimeScheduler=TimeScheduler.clone();
	}
	ModParm("PLCs.Sch");
}
function RstEvs()
{
	SetPhConf(GlobalParms.phconf);
	for(var i=0;i<PLCs()[PlcIdx].EV.length;i++)
	{
		PLCs()[PlcIdx].EV[i]=genEv();
	}
}
function RstCfts()
{
	for(var y=0;y<PLCs()[PlcIdx].Phases.length;y++)
	{
		PHASEs()[PLCs()[PlcIdx].Phases[y]].Sec.length=0;
	}
}
function RstPlnLs()
{
	PLCs()[PlcIdx].PlanList.length=0;
}
function RstPlnPlc()
{
	PLCs()[PlcIdx].Plans= new Array();
	PLCs()[PlcIdx].PlanList.length=0;
}
function RstOTUPlc()
{
	PLCs()[PlcIdx].OTUPlan.OTUSEQSTS.length=0;
	PLCs()[PlcIdx].OTUPlan.OTUDEMSTS.length=0;
	PLCs()[PlcIdx].OTUPlan.OTUSTSDEM.length=0;
	PLCs()[PlcIdx].OTUPlan.OTUDEMCLR.length=0;
}
function RstPMCPlc()
{
	PLCs()[PlcIdx].McPlan.SYCPLCTOU.length=0;
	PLCs()[PlcIdx].McPlan.MACSEQSTP.length=0;
	PLCs()[PlcIdx].McPlan.MACSTSSTP.length=0;
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
		GlobalParms.ETH0[0]=temp;
		ModParm("GlobalParms.ETH");
	}
	temp=parseInt(document.getElementById("GlobalParms.ETH1").value);
	if(ChkParm("GlobalParms.ETH",temp)==true)
	{
		GlobalParms.ETH0[1]=temp;
		ModParm("GlobalParms.ETH");
	}
	temp=parseInt(document.getElementById("GlobalParms.ETH2").value);
	if(ChkParm("GlobalParms.ETH",temp)==true)
	{
		GlobalParms.ETH0[2]=temp;
		ModParm("GlobalParms.ETH");
	}
	temp=parseInt(document.getElementById("GlobalParms.ETH3").value);
	if(ChkParm("GlobalParms.ETH",temp)==true)
	{
		GlobalParms.ETH0[3]=temp;
		ModParm("GlobalParms.ETH");
	}
	//--------------------------------------------------------------
	temp=parseInt(document.getElementById("GlobalParms.NETMASK0").value);
	if(ChkParm("GlobalParms.NETMASK",temp)==true)
	{
		GlobalParms.NETMASK0[0]=temp;
		ModParm("GlobalParms.NETMASK");
	}
	temp=parseInt(document.getElementById("GlobalParms.NETMASK1").value);
	if(ChkParm("GlobalParms.NETMASK",temp)==true)
	{
		GlobalParms.NETMASK0[1]=temp;
		ModParm("GlobalParms.NETMASK");
	}
	temp=parseInt(document.getElementById("GlobalParms.NETMASK2").value);
	if(ChkParm("GlobalParms.NETMASK",temp)==true)
	{
		GlobalParms.NETMASK0[2]=temp;
		ModParm("GlobalParms.NETMASK");
	}
	temp=parseInt(document.getElementById("GlobalParms.NETMASK3").value);
	if(ChkParm("GlobalParms.NETMASK",temp)==true)
	{
		GlobalParms.NETMASK0[3]=temp;
		ModParm("GlobalParms.NETMASK");
	}
	//--------------------------------------------------------------
	if(GlobalParms.MODEL.indexOf("M4")!=-1)
	{
		temp=parseInt(document.getElementById("GlobalParms.DGW0").value);
		if(ChkParm("GlobalParms.ETH",temp)==true)
		{
			GlobalParms.DGW[0]=temp;
			ModParm("GlobalParms.ETH");
		}
		temp=parseInt(document.getElementById("GlobalParms.DGW1").value);
		if(ChkParm("GlobalParms.ETH",temp)==true)
		{
			GlobalParms.DGW[1]=temp;
			ModParm("GlobalParms.ETH");
		}
		temp=parseInt(document.getElementById("GlobalParms.DGW2").value);
		if(ChkParm("GlobalParms.ETH",temp)==true)
		{
			GlobalParms.DGW[2]=temp;
			ModParm("GlobalParms.ETH");
		}
		temp=parseInt(document.getElementById("GlobalParms.DGW3").value);
		if(ChkParm("GlobalParms.ETH",temp)==true)
		{
			GlobalParms.DGW[3]=temp;
			ModParm("GlobalParms.ETH");
		}
	}
	//--------------------------------------------------------------
	temp=document.getElementById("GlobalParms.ID");
	if(ChkParm("GlobalParms.ID",temp.value)==true)
	{
		GlobalParms.ID=temp.value;
		ModParm("GlobalParms.ID");
	}
	else 
		temp.value=GlobalParms.ID;
	//--------------------------------------------------------------
	temp=document.getElementById("GlobalParms.WACVrw");
	if(ChkParm("GlobalParms.WACVrw",temp.value)==true)
	{
		GlobalParms.Web_Access_Code_RW=temp.value;
		ModParm("GlobalParms.WACVrw");
	}
	else 
		temp.value=GlobalParms.Web_Access_Code_RW;
	//--------------------------------------------------------------
	temp=document.getElementById("GlobalParms.WACVro");
	if(ChkParm("GlobalParms.WACVrw",temp.value)==true)
	{
		GlobalParms.Web_Access_Code_RO=temp.value;
		ModParm("GlobalParms.WACVrw");
	}
	else 
		temp.value=GlobalParms.Web_Access_Code_RO;
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
			if(GlobalParms.MODEL.indexOf("DGV-uTC1-M4")!=-1)
			{
			}
			else
			{
				if(GlobalParms.MODEL.indexOf("M4")!=-1)
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
				PLCs()[PlcIdx].Plans.length=0;// borra los planos
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
				PLCs()[PlcIdx].Plans.length=0;// borra los planos
				ModParm("PHASEs.MiRT");
			}
			//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
		}
	}
	GlobalParms.phconf=genPhc();
}
//==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
function ModStartup()
{
	PlcIdx=0;
	CEV=0;
	PlnIdx=0;
	
	GlobalParms.Controllers
	
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
		//PLCs()[ph].Sec.length=0;
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
