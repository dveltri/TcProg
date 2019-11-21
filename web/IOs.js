// ReDraw(conf_io)
/*
IOs=[{			
Enable:1,		
Type:1,			
Flank:1,		entra ou sai do loop
shNivel:0,		estado inicial
FailSts:0,		estado adotado depois de dar problema
TimeOut:10,		time out para falha
neg:0,			inversao da entrada
},]

entrada mexe em todas
saida naum mexe em nada

*/

function ShwIos()
{	
	var list = "";	
	var index = PlcIdx;	
	var color = "bgcolor=\"#AAAAAA\"";
	list +="<table border=\"0\" bgcolor=\"LightGrey\" align=\"center\" cellpadding=\"5\" cellspacing=\"5\" bordercolor=\"Silver\" >\n";
	list +="<tr bordercolor=\"Silver\">\n";
	list +="<td colspan=\"14\" align=\"center\">\n";		
	list +=Str_Title_io;
	list +="</td>\n";
	list +="</tr>\n";
	list +="<tr bordercolor=\"Silver\">\n";
	list +="<td align=\"middle\">\n";		
	list +=Str_Input;
	list +="</td>\n";
	list +="<td align=\"middle\">\n";		
	list +=Str_Enable;
	list +="</td>\n";
	list +="<td align=\"middle\">\n";		
	list +=Str_Type;
	list +="</td>\n";
/*	list +="<td align=\"middle\">\n";		
	list +=Str_Flank;
	list +="</td>\n";// */
	list +="<td align=\"middle\">\n";		
	list +=Str_start_up_nivel;
	list +="</td>\n";
	list +="<td align=\"middle\">\n";		
	list +=Str_Fail_level;
	list +="</td>\n";
	list +="<td align=\"middle\">\n";		
	list += Str_Neg;
	list +="</td>\n";
	list +="<td align=\"middle\">\n";		
	list +=Str_io_Time_out;
	list +="</td>\n";
	list +="</tr>\n";
	for (var i=0; (i<IOs.length) && (i<(GlobalParms.HwIo+GlobalParms.Inputs+GlobalParms.Loops)); i++)
	{		
		list +="<tr bordercolor=\"Silver\">\n";
		list +="<td align=\"left\">["+(i+1)+"]"+IOs[i].Name+"</td>\n";
		list +="<td align=\"middle\">\n";		
		list +=showEnableSwitch(IOs[i].Enable,i);
		list +="</td>\n";		
		list +="<td align=\"middle\" width=\"120\">\n";		
		list +="<select class=\"CssSelect\" onchange=\"IOs["+i+"].Type=parseInt(this.value);ModParm('IOs.TimeOut');\" ";
		//if((IOs[i].Type&2)==0)
			list +="disabled=\"disabled\"";
		list +=">\n";
		list +=GenOptions(OptInputTyp,IOs[i].Type);
		list +="</select>\n";
		list +="</td>\n";		
		/*list +="<td align=\"middle\">\n";		
		list +="<select class=\"CssSelect\" onchange=\"IOs["+i+"].Flank=parseInt(this.value);ModParm('IOs.TimeOut');\" disabled=\"disabled\">\n";
		list +=GenOptions(OptInputFlk,IOs[i].Flank);
		list +="</select>\n";
		list +="</td>\n";// */
		list +="<td align=\"middle\">\n";		
		list +="<select class=\"CssSelect\" onchange=\"IOs["+i+"].shNivel=parseInt(this.value);ModParm('IOs.TimeOut');\" disabled=\"disabled\">\n";
		list +=GenOptions(OptInputShin,IOs[i].shNivel);
		list +="</select>\n";
		list +="</td>\n";
		list +="<td align=\"left\">\n";		
		list +="<select class=\"CssSelect\" onchange=\"IOs["+i+"].FailSts=parseInt(this.value);ModParm('IOs.TimeOut');\">\n";
		list +=GenOptions(OptInputV,IOs[i].FailSts);
		list +="</select>\n";
		list +="</td>\n";		
		list +="<td align=\"middle\">\n";		
		list +="<select class=\"CssSelect\" onchange=\"IOs["+i+"].neg=parseInt(this.value);ModParm('IOs.TimeOut');\" >\n"; //disabled=\"disabled\"
		list +=GenOptions(OptInputV,IOs[i].neg);
		list +="</select>\n";
		list +="</td>\n";
		list +="<td align=\"middle\">\n";		
		list +="<select class=\"CssSelect\" onchange=\"IOs["+i+"].TimeOut=parseInt(this.value);ModParm('IOs.TimeOut');\">\n";
		list +=GenOptiontyp(GetParmByName("IOs.TimeOut"),IOs[i].TimeOut); //ParmType[33]
		list +="</select>\n";
		list +="</td>\n";
		list +="</tr>\n";				
	}	
	list +="</table>\n";
	//alert(list);
	return list;	
}
function switchTimeOut(index)
{
	var types = [0,1,2,3,4,5,6,7,8,9,10];
	//0s a 36horas step 256 segundos

	for(var i=0; i<types.length; i++)
	{
		if(IOs[index].TimeOut == types[i])
		{
			if(types.length <= (i+1))
				IOs[index].TimeOut = types[0];
			else
				IOs[index].TimeOut = types[i+1];
			break;
		}
	}
	
	ReDraw(conf_io);
}
function showTimeOutSwitch(index)
{
	var button = "";
	button = "<img style=\"vertical-align: bottom;\" src=\"./img/change.png\" width=\"25\" height=\"25\" border=\"0\" onclick=\"switchTimeOut("+index+");\"></img>\n";	
	return button;
}
function showEnableSwitch(status,index)
{
	var button = "";
	if(status)
		button = "<img style=\"vertical-align: bottom;\" src=\"./img/on.png\" width=\"25\" height=\"25\" border=\"0\" onclick=\"enableSwitch("+index+");\"></img>\n";	
	else
		button = "<img style=\"vertical-align: bottom;\" src=\"./img/off.png\" width=\"25\" height=\"25\" border=\"0\" onclick=\"enableSwitch("+index+");\"></img>\n";	
	return button;
}
function enableSwitch(index)
{
	if(IOs[index].Enable)
		IOs[index].Enable = 0;
	else
		IOs[index].Enable = 1;
	ReDraw(conf_io);
}



