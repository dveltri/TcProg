var PrgBk= new Array();
var PrgEd= new Array();
/*var SrcFiles=[
	1,'Loading General...','/startup.ini',RcvStartup,
	3,'Loading Global vars...',null,null,
	4,'Loading de Phases 2...','/phconf.ini',RcvPhConf,
	6,'Loading de Controladores...','/plcs.ini',RcvPlc,
	'Loading Lista de Planes...',null,RcvConfSrc
	GetSec(SrcIdx,PlcIdx),RcvSec,
	GetSch(SrcIdx,PlcIdx),RcvAgenda, 
	'/ip.ini',RcvIP, 
	'/ntp.ini' ,RcvNTP,
	'/opct.ini',RcvOPCT,
	'/gps.ini',RcvGPS,
	'/dgvp.ini',RcvDgvP,
	'/sdgvp.ini',RcvSdgvp,
	'/error.ini',RcvError,
	'/plans.ini',RcvES3,
	'/def_in.ini',RcvDefIn]; //*/ 
//--------------------------------------------------
var SrcIdx=0;
var TrgIdx=0;
//----------------------
var SvrIp="localhost";
var WAC="12345";
var RcvErRtr=0;
var menu;
//-------------------------------------------------- variables de la Web
var Reload=0x000;
var AutoRefresh;
var wizard_step=0;
var language="ES";
var Log_En=0;
var Dim_En=1;
var FoceUpLoad=0;
var percent=0;
var percent2=0;
var UsrLvl=0;
//---------------------------------
var PlcIdx=0;
var ErrIdx=0;
//---------------------------------
var Resource= new Array();
var RsrcIdx=0;
//-------------------------------------------------- Objetos de systema
var Maxlen=200;
var UpData="";
var UpMode=0;
var UpPath="";
var UpFile="";
var UpType="";
var UpPacket= {data:"", len:0};
var UpSeek=0;
//--------------------
var FilterFileList="";
var FileListDat= new Array();
//--------------------
var onlongtouch;
var timer;
var touchduration = 500; //length of time we want the user to touch before we do something
//--------------------
var url="";
var FlyMnu;
//-------------------------------------------------- Objetos de systema
var Errors = new Array();
//--------------------------------------------------- const
var PhasesStructSize=56;
var StructSizePLC=268;
var StructSizeIO=28;
var HW_IOS=9;
var OptDgvPCmd=	[2,"Info. Version Modelo",252,"Inf. Tiempo Real"];
var LsCmps=		["RTC",
				 "Voltage",
				 "PlcMode",
				 "Nplan",
				 "Cph",
				 "Cio",
				 "PhColor",
				 "PhRColor",
				 "PhCurrent",
				 "PhError",
				 "IOsts"];

var LsCmpsTxt=	[Str_DgvP_Date,
				 Str_DgvP_Voltage,
				 Str_DgvP_Mode,
				 Str_DgvP_Plan,
				 Str_DgvP_Cph,
				 Str_DgvP_Cio,
				 Str_DgvP_PhSts,
				 Str_DgvP_PhStsR,
				 Str_DgvP_PhCurr,
				 Str_DgvP_PhErrors,
				 Str_DgvP_IOsts];

var DgvPM3=		["RTC"		,",6,16,0,4",
				 "Voltage"	,",6,12,0,4",
				 "PlcMode"	,",6,0,32,2",
				 "Nplan"	,",6,147,32,1",
				 "Cph"		,",6,36,16,1",
				 "Cio"		,",6,32,16,1",
				 "PhColor"	,",12,0,48,1,56,0,36,16",
				 "PhRColor"	,",12,1,48,1,56,0,36,16",
				 "PhCurrent",",12,16,48,2,56,0,36,16",
				 "PhError"	,",12,24,48,4,56,0,36,16",
				 "IOsts"	,",12,0,64,1,28,0,32,16",];

var DgvPM4=		["RTC"		,",6,16,0,4",
				 "Voltage"	,",6,12,0,4",
				 "PlcMode"	,",6,0,32,2",
				 "Nplan"	,",6,147,32,1",
				 "Cph"		,",6,36,16,1",
				 "Cio"		,",6,32,16,1",
				 "PhColor"	,",12,0,48,1,60,0,36,16",
				 "PhCurrent",",12,16,48,2,60,0,36,16",
				 "PhError"	,",12,24,48,4,60,0,36,16"];
//---------------------------------------------------
var WiS=0;
var WiG=1;
var WiF=2;
var WiD=3;
//---------------------
//var home_home		= 0;
var moni_general	= 1;
var moni_errors		= 2;
var conf_general	= 3;
//var conf_errors	= 4;
var conf_phases		=10;
var conf_ev			=11;
var conf_sec		=12;
var conf_sts		=13;
var conf_plan		=14;
var conf_sch		=15;
var conf_Comm		=24;
var conf_otu		=25;
//var Conf_save		=39;
//var Ctrl_Sch		=40;
//var Ctrl_Plns		=41;
//var Ctrl_Rst		=42;
var wizard=[[moni_general,moni_errors],
			[conf_general],
			[conf_phases,conf_ev,conf_sec,conf_sts,conf_plan,conf_sch],
			[conf_Comm]];//,conf_otu
var Widx=WiS;
var WizrdIdx=0;
//---------------------------------------------------
var V2RTyp=		[[20,20,2,2,2,1],[17,17,17,17,17,17,17,17,1,1],[20,20,20,20,20,1],[2,2,2,1]];
var R2VTyp=		[[3],[],[],[]];
var FStateTyp=	[18,17,17,18];
//---------------------------------------------------
var MSK_V_ALL=	[0,1,2,3,4,17,18,19,20,22];	//off,R,A,RA,V,r,ra,v,va
var MSK_P_ALL=	[0,1,4,17,20]				//off,R,V,r,v

var MSK_ORV=	[0,1,4];					//off,R,V
var MSK_OR=		[0,1];						//off,R

var MSK_V_cft=	[0,1,17];					//off,R,r
var MSK_P_cft=	[0,1,17]					//off,R,r

var MSK_V_FF=	[0,17,18];					//off,r,a

var MSKEV=		[1,2,3,17,18,20,22];		//R,A,RA,r,a,v,va
var MSKEV1=		[2,17,18,20];				//A,r,a,v

var MSKEVRV=	[1,2,3,4,17,18,20,22];		//R,A,RA,V,r,a,v,va	vehicular
var MSKEVRVv=	[0,17,18,19];				//off,r,a,ra	vehicular
var MSKEVRVp=	[0,17];						//off,r peatonal
var MSKEVRVg=	[0,17,18,19];				//off,r,a,ra giro
var MSKEVRVc=	[0,17,18,19];				//off,r,a,ra ciclista
var MSKEVPhTyp=	[MSKEVRVv,MSKEVRVp,MSKEVRVg,MSKEVRVc];

var MSKtemo=	[];
var PhTimMin=	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//---------------------------------------------------
var OptPhTypI=	[0,"0","images/msdropdown/icons/icon_calendar.gif"
				,1,"1","images/msdropdown/icons/icon_cart.gif"
				,2,"2","images/msdropdown/icons/icon_cd.gif"
				,3,"3","images/msdropdown/icons/icon_email.gif"];
//---------------------------------------------------
var	OptAddSrc=	["DGV-uTC1-M4"	,"DGV uTC1",
				 "GW1M3FT"		,"GW1(M3)",
				 "GW2M3FT"		,"GW2(M3)",
				 "GW3M3RT"		,"GW3 Tempo Real(M3)",
				 "GW1M4FT"		,"GW1(M4)",
				 "GW2M4FT"		,"GW2(M4)",
				 "GW3M4RT"		,"GW3 Tempo Real(M4)",
				 "GW4M4RT"		,"GW4 Tempo Real",
				 "MAC-TC1M4"	,"MAC-Tc1 Tempo Real",
				 "STC-S4M3"		,"SUTEC Controler",
				 "MSTC-V1M3"	,"MsTraffic STC",
				 "SAD-V1M4"		,"Cosmos TSC 1",
				 "SAD-V2M4"		,"Cosmos TSC 2",
				 "SAD-V3M4"		,"Cosmos TSC 4"];
//---------------------------------------------------
var OptOPB2=["2","1 OPB","4","2 OPB","6","3 OPB","8","4 OPB","10","5 OPB","12","6 OPB"];
var OptMpt3=["2","1 MPT3","4","2 MPT3","6","3 MPT3","8","4 MPT3","10","5 MPT3","12","6 MPT3"];
var OptMpt4=["2","1 MPT4","4","2 MPT4","6","3 MPT4","8","4 MPT4","10","5 MPT4","12","6 MPT4","14","7 MPT4","16","8 MPT4"];
var OptMpt5=["4","1 MPT","8","2 MPT","12","3 MPT","16","4 MPT","20","5 MPT","24","6 MPT"];
var OptMDV=["0","0 MDV8","8","1 MDV8","16","2 MDV8"];
var OptMDV4=["0","0 MDV4","4","1 MDV4"];
var OptFlashingHz=["1","1hz","2","2hz","4","4hz","6","6hz","8","8hz","10","10hz","12","12hz","14","14hz"];
var OptLogLinks=["0","Web","1","Serial 1","2","Serial 2","3","Serial 3","4","Serial 4","5","Serial 5","6","Serial 6","7","Serial 7","8","Serial 8"];
var OptTimeZone=[-720,"GMT -12:00 Eniwetok, Kwajalein",-660,"GMT -11:00 Midway Island, Samoa",-600,"GMT -10:00 Hawaii",-540,"GMT -09:00 Alaska",-480,"GMT -08:00 Pacific Time US &amp; Canada",-420,"GMT -07:00 Mountain Time US &amp; Canada",-360,"GMT -06:00 Central Time US &amp; Canada, Mexico City",-300,"GMT -05:00 Eastern Time US &amp; Canada, Bogota, Lima",-240,"GMT -04:00 Atlantic Time Canada, Caracas, La Paz",-210,"GMT-03:30 Newfoundland",-180,"GMT -03:00 Brazil, Buenos Aires, Georgetown",-120,"GMT -02:00 Mid-Atlantic",-60,"GMT -01:00 Azores, Cape Verde Islands",0,"GMT 0 Western Europe Time, London, Lisbon, Casablanca",60,"GMT +01:00 Brussels, Copenhagen, Madrid, Paris",120,"GMT +02:00 Kaliningrad, South Africa",180,"GMT +03:00 Baghdad, Riyadh, Moscow, St. Petersburg",210,"GMT +03:30 Tehran",240,"GMT +04:00 Abu Dhabi, Muscat, Baku, Tbilisi",270,"GMT +04:30 Kabul",300,"GMT +05:00 Ekaterinburg, Islamabad, Karachi, Tashkent",330,"GMT +05:30 Bombay, Calcutta, Madras, New Delhi",360,"GMT +06:00 Almaty, Dhaka, Colombo",420,"GMT +07:00 Bangkok, Hanoi, Jakarta",480,"GMT +08:00 Beijing, Perth, Singapore, Hong Kong",540,"GMT +09:00 Tokyo, Seoul, Osaka, Sapporo, Yakutsk",570,"GMT +09:30 Adelaide, Darwin",600,"GMT +10:00 Eastern Australia, Guam, Vladivostok",660,"GMT +11:00 Magadan, Solomon Islands, New Caledonia",720,"GMT +12:00 Auckland, Wellington, Fiji, Kamchatka"];
//---------------------------------------------------
var OptMst=[0,"Slave",1,"Master",2,"Slave/Master",3,"Slave/Master+Plan",4,"Slave+Plan",5,"Slave+State",6,"Slave+Plan+State",10,"Master+Plan",11,"Master+State",12,"Master+Plan+State"];
//---------------------------------------------------
var IntReg=[
{Type:"Int",Nombre:"THIS",Valor:null},
{Type:"Int",Nombre:"HEAP",Valor:null},
{Type:"Int",Nombre:"CPLCS",Valor:null},
{Type:"Int",Nombre:"FPHASES",Valor:null},
{Type:"Int",Nombre:"RPHASES",Valor:null},
{Type:"Int",Nombre:"VPHASES",Valor:null},
{Type:"Int",Nombre:"GPHASES",Valor:null},
{Type:"Int",Nombre:"CLOOPS",Valor:null},
{Type:"Int",Nombre:"VINPUTS",Valor:null},
{Type:"Int",Nombre:"CINPUTS",Valor:null},
{Type:"Int",Nombre:"COUTPUTS",Valor:null},
{Type:"Int",Nombre:"RUN",Valor:null},
{Type:"Int",Nombre:"RTC",Valor:null},
{Type:"Int",Nombre:"VOLT",Valor:null},
{Type:"Int",Nombre:"Temperature",Valor:null},
{Type:"Int",Nombre:"TOLCD",Valor:null},
{Type:"Int",Nombre:"KEY",Valor:null},
{Type:"Int",Nombre:"OPTUI",Valor:null},
{Type:"Bit",Nombre:"debug.opct",Valor:null},
{Type:"Bit",Nombre:"debug.hw",Valor:null},
{Type:"Bit",Nombre:"debug.can",Valor:null},
{Type:"Byt",Nombre:"debug.rtc",Valor:null},
{Type:"Bit",Nombre:"debug.iohw",Valor:null},
{Type:"Bit",Nombre:"debug.plc",Valor:null},
{Type:"Bit",Nombre:"debug.http",Valor:null},
{Type:"Bit",Nombre:"debug.error",Valor:null},
{Type:"Bit",Nombre:"debug.gps",Valor:null}];
