var TP2Ed=new Object();
TP2Ed.id="";
TP2Ed.X=10;
TP2Ed.X2=10;
TP2Ed.TPi=0;

var ErrorMsg="";
//LCL=Local
//SYC=Syncronico
//PLC=PLC
//ASY=No_Syncronico
//OTU=Timpo real (OTU)
//MAC=Manual Control
//STS=Estado
//TCI=Tiempo de Ciclo
//TOF=Tiempo de 
//TOU=TimeOut
//SEQ=Secuencia
//STP=Step
//SEC=Matris de conflicto
//TST=Tiempode de Estado
//DEM=Demanda
//LGC=Logic
//PRI=Prioridida
//CLR=Clear
//TNO=Tiempo Normal
//CHG=Change
//===============================================================================
function UpdateTimes(PLC,Pln)
{
		var idx=0;
		var TPp=0;
		var TPi=0;
		var TPn=0;
		var TC=0;
		var Tev=0;
		var sTPi=GetTpi(Pln.TP,0);
		var Sts=PLC.Sts;
		//-------------------------------------------
		while(Pln.TP.length<Sts.length)
			Pln.TP.push(0);
		Pln.TP.length=Sts.length;
		while(Pln.Dem.length<Sts.length)
			Pln.Dem.push({Typ:0,Num:0,Clr:0,Dat:[0,0]});
		Pln.Dem.length=Sts.length;
		while(Pln.Logic.length<Sts.length)
			Pln.Logic.push("");
		Pln.Logic.length=Sts.length;
		//-------------------------------------------
		for(var i=0;i<Sts.length;i++)
		{
			Pln.TP[i]=parseInt("0"+Pln.TP[i]);
			Pln.Dem[i].Typ=parseInt("0"+Pln.Dem[i].Typ);
			Pln.Dem[i].Num=parseInt("0"+Pln.Dem[i].Num);
			Pln.Dem[i].Clr=parseInt("0"+Pln.Dem[i].Clr);
			Pln.Logic[i]+="";
			Pln.Logic[i]=Pln.Logic[i].trim();
		}
		Pln.Typ=parseInt("0"+Pln.Typ);
		Pln.OF=parseInt("0"+Pln.OF);
		Pln.TC=parseInt("0"+Pln.TC);
		Pln.EV=parseInt("0"+Pln.EV);
		Pln.T2S=new Array();
		Pln.SEQ=new Array();
		idx=0;
		TPi=sTPi;
		do
		{
			TPp=GetTpp(Pln.TP,TPi);
			TPn=GetTpn(Pln.TP,TPi);
			if(Pln.EV==0)
				Tev=GetEvT(Sts,TPi,TPn);
			else
				Tev=GetEvT(Sts,TPp,TPi);
			TC+=Pln.TP[TPi];
			if(Pln.EV==0)
				Pln.T2S[TPi]=TC;
			else
				Pln.T2S[TPi]=TC+Tev;
			Pln.SEQ[TPi]=TPn;
			TC+=Tev;
			TPi=TPn;
			idx++;
		}
		while(TPi!=sTPi);
		if(Pln.Typ==0)
			Pln.TC=TC;
		if(Pln.Typ==1)
		{
			TPi=Pln.TC;
			Pln.TC=TC;
			TC=TPi;
			PlanModT(PLC,Pln,TC,null,null);
		}
		return TC;
}

function SaveCtrlParms(PLC,Parms,Plan)
{
	UpMode=10;
	UpPath="/";
	UpType="txt";
	UpData="";
	UpFile="autorun.txt"
	UpdateTimes(PLC,Plan);
	var out="";
	var out1="";
	var out2="";
	var sTPi=0;
	var Sts=PLC.Sts;
	var TPp=0;
	var TPi=0;
	var TPn=0;
	var Tev=0;
	var Tm=0;
	var i=0;
	//--------------------------------------
	out1+="new STSs 1 "+Sts.length+"0 ";
	out2+="new STSp 1 08 ";
	for(i=0;i<Sts.length;i++)
	{
		out1+=Sts[i].toString();
		out+="new STS"+i+" 1 00 "+Sts[i].toString()+"\n";
	}
	out1+="\n";
	out+=out1;
	out1="";
	//------------------------------
	out+="new TST 1 00 "+Plan.TP.toString()+"\n";
	//------------------------------
	sTPi=GetTpi(Plan.TP,0);
	TPi=sTPi;
	TC=0;
	out+="new STS2STP 1 00 ";
	out1+="new STS2STP 1 00 ";
	do
	{
		TPp=GetTpp(Plan.TP,TPi);
		TPn=GetTpn(Plan.TP,TPi);
		TPc=TPi;
		out1+=","+TPi;
		if(Plan.EV==0)
			Tev=GetEvT(Sts,TPi,TPn);
		else
			Tev=GetEvT(Sts,TPp,TPi);
		if(Plan.EV==1)
			TC+=Tev;
		TC+=Plan.TP[TPi];
		out+=","+TC;
		TPi=TPn;
	}
	while(TPi!=sTPi);
	out1+="\n";
	out+=out1;
	out1="";
	//------------------------------
	//out+=Parms.addvar;
	UpData=out;
	return out;
}

function PlanModT(PLC,Plan,TC,TP,TPi)
{
	var Tm=0;
	var TPn=0;
	var Tev=0;
	if(TC!=null)
		TC=parseInt(TC);
	if(TP!=null)
		TP=parseInt(TP);
	if(TPi!=null)
		TPi=parseInt(TPi);
	if(TP!=null && TPi!=null)	// modificacionde tiempo de estado
	{
		Tm=GetTmin(PLC,TPi);
		//-----------------------------------
		if(TP!=0 && TP<Tm)
			TP=Tm;
		if(Plan.Typ==0)			// para un plan tipo fijo
		{
			Plan.TP[TPi]=TP;
			Plan.TC=UpdateTimes(PLCs()[PlcIdx],Plan);
			return 1;
		}
		else					//para un plan syncronizado
		{
			Tev=(TP-Plan.TP[TPi]);	// diferencia de tiempo
			//----------------------------
			if(Plan.TP[TPi]==0 || TP==0)	// era o sera un tiempo 0
				TC=1;
			Plan.TP[TPi]=TP;
			if(TC==1)
			{
				Tm=Tev;
				if(Plan.EV==1)
					Tev=GetEvT(PLC.Sts,GetTpp(Plan.TP,TPi),TPi);
				else
					Tev=GetEvT(PLC.Sts,TPi,GetTpn(Plan.TP,TPi));
				Tev=Tm+(Tev*(Tm/Math.abs(Tm)));	//suma tiempo de entreverde a la diferencia
			}
			//--------------------------
			TC=0;
			TP=(Tev/Math.abs(Tev));
			TPn=GetTpn(Plan.TP,TPi);
			Tev=Math.abs(Tev);
			while(Tev>0 && TC<Plan.TP.length)
			{
				Tm=GetTmin(PLC,TPn);
				if(Plan.TP[TPn]!=0 && TPi!=TPn)
				{
					if(Plan.TP[TPn]>Tm || TP<0)
					{
						Plan.TP[TPn]-=TP;
						TC=0;
						Tev--;
					}
					else
					{
						TPn=GetTpn(Plan.TP,TPn);
						TC++;
					}
				}
				else
					TPn=GetTpn(Plan.TP,TPn);
				
			}
			if(Tev>0)
				Plan.TC+=Tev;
			return 1;
		}
	}
	if(TC!=null && Plan.Typ==1)// modificacion tiempo de ciclo 
	{
		Tev=TC-Plan.TC;
		TPi=0;
		TPn=0;
		TP=(Tev/Math.abs(Tev));
		Tev=Math.abs(Tev);
		while(Tev>0 && TPi<Plan.TP.length)
		{
			Tm=GetTmin(PLC,TPn);
			if(Plan.TP[TPn]!=0)
			{
				if(TP<0 && Plan.TP[TPn]<=Tm)
				{
					TPi++
				}
				else
				{
					Plan.TP[TPn]+=TP;
					Plan.TC+=TP;
					Tev--;
					TPi=0;
				}
			}
			TPn=GetTpn(Plan.TP,TPn);
		}
	}
}

//------------------------------------------
function ShowPlan()
{
	var out="";
	var Pln=PLCs()[PlcIdx].Plans[PlnIdx];
	UpdateTimes(PLCs()[PlcIdx],Pln);
	var color=(16777215/PLCs()[PlcIdx].Sts.length);
	PLCs()[PlcIdx].Sts.sort(sortN);
	if(PLCs()[PlcIdx].Plans)
	{
		Pln.TP.length=PLCs()[PlcIdx].Sts.length;
		Pln.Logic.length=PLCs()[PlcIdx].Sts.length;
		if(Pln.Typ==0)
		{
			PlanModT(PLCs()[PlcIdx],Pln,null,Pln.TP[0],0);
		}
	}
	//--------------
	out+="<table border=\"0\" bgcolor=\"#ddd\" class=\"table1\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" >\n";
	//--------------
	out+="<tr bgcolor=\"#ccc\">\n";
	out+="<td align=\"center\" >\n";
	out+="<font size=\"2\" face=\"arial\">"+Str_Plan+"</font>"
	out+="</td>\n";
	out+="<td align=\"center\" >\n";
	out+="<select onchange=\"if(this.value==-1){PlnNew(0);}else{PlnIdx=parseInt(this.value);}ReDraw(-1);\" class=\"CssSelect\" >\n";
	for (j=0;j<PLCs()[PlcIdx].Plans.length;j++)
	{
		out+="<option value=\""+j+"\" "+((PlnIdx==j)?"selected=\"selected\"":"")+">["+(j+1)+"](";
		if(PLCs()[PlcIdx].Plans[j].Typ==1)
			out+="Sincronico";
		else
			out+="Asincronico";
		out+=" Ciclo:"+PLCs()[PlcIdx].Plans[j].TC;
		if(PLCs()[PlcIdx].Plans[j].Typ==1)
			out+=" Offset:"+PLCs()[PlcIdx].Plans[j].OF;
		out+=")</option>\n";
	}
	out+="<option style=\"background-color:rgb(238,238,238)\" value=\"-1\">"+Str_New+"</option>\n";
	out+="</select>\n";
	out+="</td>\n";
	out+="<td align=\"center\" >\n";
	out+="<input type=\"button\" class=\"CssBtn\" value=\""+Str_Delet+"\" onclick=\"PlnDel("+PlnIdx+");ReDraw(-1);\" />\n";
	out+="</td>\n";
	out+="</tr>\n";
	//--------------
	out+="</table>";
	out+="<table border=\"0\" bgcolor=\"#ddd\" class=\"table1\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" >\n";
	//--------------
	if(PLCs()[PlcIdx].Plans)
	{
		if(Pln.Typ==0)
		{
			out+="<tr bgcolor=\"#ddd\">\n";
			out+="<td align=\"center\" valign=\"top\" >\n";
			out+=GraphPlanAislado(document.body.clientWidth-50,Pln);
			out+="</td>\n";
			out+="</tr>\n";
			out+="<tr bgcolor=\"#ddd\">\n";
			out+="<td align=\"center\" >\n";
			out+=ShwPlanConf();
			out+="</td>\n";
			out+="</tr>\n";
		}
		else
		{
			out+="<tr bgcolor=\"#ddd\">\n";
			out+="<td align=\"center\" valign=\"top\" >\n";
			out+=ShwPlanConf();
			out+="</td>\n";
			out+="<td align=\"center\" >\n";
			out+=GraphPlanSync(Pln);
			out+="</td>\n";
			out+="</tr>\n";
		}
	}
	//--------------
	out+="</table>";
	return out;
}
function PlnDel(pln)
{
	PLCs()[PlcIdx].Plans.splice(pln,1);
	for(var j=0;j<TimeScheduler.length;j++)
	{
		for(var h=0;h<TimeScheduler[TimeIdx].Hs.length;h++)
		{
			if(TimeScheduler[j].Hs[h].Plan==(pln+1))
				TimeScheduler[j].Hs.splice(h,1);
		}
	}
	PlnIdx=0;
}
function PlnNew(typ)
{
	var ev=0;
	var STi=0;
	var STe=0;
	if(PLCs()[PlcIdx].Plans && PLCs()[PlcIdx].Plans.length)
		PlnIdx=PLCs()[PlcIdx].Plans.length;
	else
		PLCs()[PlcIdx].Plans=new Array();
	PLCs()[PlcIdx].Plans[PlnIdx]=new Object();
	PLCs()[PlcIdx].Plans[PlnIdx].Typ=typ;
	PLCs()[PlcIdx].Plans[PlnIdx].OF=0;
	PLCs()[PlcIdx].Plans[PlnIdx].TC=0;
	PLCs()[PlcIdx].Plans[PlnIdx].EV=0;
	PLCs()[PlcIdx].Plans[PlnIdx].TP=new Array();
	PLCs()[PlcIdx].Plans[PlnIdx].Dem=new Array();
	PLCs()[PlcIdx].Plans[PlnIdx].Logic=new Array();
	//---------------------------------------
	PLCs()[PlcIdx].Plans[PlnIdx].TP.length=PLCs()[PlcIdx].Sts.length;
	PLCs()[PlcIdx].Plans[PlnIdx].TC=0;
	//---------------------------------------
	for(j=0;j<PLCs()[PlcIdx].Sts.length;j++)
	{
		STe=(PLCs()[PlcIdx].Sts.length+j+1);
		STe=(STe%PLCs()[PlcIdx].Sts.length);
		STi=j;
		PLCs()[PlcIdx].Plans[PlnIdx].TP[j]=10;
		PLCs()[PlcIdx].Plans[PlnIdx].TP[j]+=GetEvT(PLCs()[PlcIdx].Sts,STi,STe);
		PLCs()[PlcIdx].Plans[PlnIdx].TP[j]+=GetTmin(PLCs()[PlcIdx],j);
		PLCs()[PlcIdx].Plans[PlnIdx].TC+=PLCs()[PlcIdx].Plans[PlnIdx].TP[j];
		PLCs()[PlcIdx].Plans[PlnIdx].Logic[j]="";
	}
	UpdateTimes(PLCs()[PlcIdx],PLCs()[PlcIdx].Plans[PlnIdx]);
}

//------------------------------------------
function ShwPlanConf()
{
	var out="";
	var outN="";
	var outT="";
	var outD="";
	var col="";
	var TPi=0;
	var TPp=0;
	var TPn=0;
	var Tev=0;
	var Tmin=0;
	var j=0;
	var pln=PLCs()[PlcIdx].Plans[PlnIdx];
	pln.TC=UpdateTimes(PLCs()[PlcIdx],pln);
	out+="	<table border=\"0\" bgcolor=\"#ddd\" class=\"table1\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" >\n";
	//--------------
	out+="	<tr bgcolor=\"#ccc\">\n";
	out+="		<td align=\"center\" >\n";
	out+="			<font size=\"2\" face=\"arial\">"+Str_Parameter+"</font>"
	out+="		</td>\n";
	out+="		<td align=\"center\" >\n";
	out+="			<font size=\"2\" face=\"arial\">"+Str_Config+"</font>"
	out+="		</td>\n";
	out+="	</tr>\n";
	//			--------------
	out+="	<tr bgcolor=\"#ddd\">\n";
	out+="		<td align=\"center\" >\n";
	out+="			<font size=\"2\" face=\"arial\">"+Str_Type+"</font>"
	out+="		</td>\n";
	out+="		<td align=\"center\" >\n";
	out+="			<select onchange=\"PLCs()[PlcIdx].Plans[PlnIdx].Typ=parseInt(this.value);ReDraw(-1);\" class=\"CssSelect\" >\n";
	out+=GenOptions(OptTypPln,pln.Typ);
	out+="			</select>\n";
	out+="		</td>\n";
	out+="	</tr>\n";
	//			--------------
	if(pln.Typ==1)
	{
		out+="	 <tr bgcolor=\"#ddd\">\n";
		out+="		<td align=\"center\" >\n";
		out+="		<font size=\"2\" face=\"arial\">"+Str_Sync_Ref+"</font>"
		out+="		</td>\n";
		out+="		<td align=\"center\" >\n";
		out+="			<select onchange=\"PLCs()["+PlcIdx+"].SyncRef=this.value;ReDraw(-1);\" class=\"CssSelect\" >\n";
		out+=GenOptions(OptSycPot,PLCs()[PlcIdx].SyncRef);
		out+="			</select>\n";
		//out+="		<input value=\""+PLCs()[PlcIdx].SyncRef+"\" onchange=\"PLCs()["+PlcIdx+"].SyncRef=this.value;\" size=\"15\"  class=\"CssInText\" />";
		out+="		</td>\n";
		out+="	 </tr>\n";
	//		--------------
		out+="	 <tr bgcolor=\"#ddd\">\n";
		out+="		<td align=\"center\" >\n";
		out+="		<font size=\"2\" face=\"arial\">"+Str_GB_Temp_All_Cicle+"</font>"
		out+="		</td>\n";
		out+="		<td align=\"center\" >\n";
		out+="		<input value=\""+pln.TC+"\" onchange=\"PlanModT(PLCs()[PlcIdx],PLCs()[PlcIdx].Plans[PlnIdx],this.value,null,null);ReDraw(-1);\" size=\"3\" maxlength=\"3\" type=\"text\" class=\"CssInText\" /><font size=\"1\" face=\"arial\">segs</font><br/>\n";
		out+="		</td>\n";
		out+="	 </tr>\n";
	//		--------------
		out+="	 <tr bgcolor=\"#ddd\">\n";
		out+="		<td align=\"center\" >\n";
		out+="		<font size=\"2\" face=\"arial\">"+Str_GB_Discrepancy+"</font>"
		out+="		</td>\n";
		out+="		<td align=\"center\" >\n";
		out+="		<input value=\""+pln.OF+"\" onchange=\"PLCs()[PlcIdx].Plans[PlnIdx].OF=this.value;\" size=\"3\" maxlength=\"3\" type=\"text\" class=\"CssInText\" /><font size=\"1\" face=\"arial\">segs</font><br/>\n";
		out+="		</td>\n";
		out+="	 </tr>\n";
	}
	//			--------------
	/*out+="	 <tr bgcolor=\"#ddd\">\n";
	out+="		<td align=\"center\" >\n";
	out+="		<font size=\"2\" face=\"arial\">"+Str_Stage_EV+"</font>"
	out+="		</td>\n";
	out+="		<td align=\"center\" >\n";
	out+="		<select onchange=\"PLCs()[PlcIdx].Plans[PlnIdx].EV=parseInt(this.value);ReDraw(-1);\" class=\"CssSelect\" >\n";
	out+="		 <option value=\"0\" "+((pln.EV==0)?"selected=\"selected\"":"")+">"+Str_End+"</option>\n";
	out+="		 <option value=\"1\" "+((pln.EV==1)?"selected=\"selected\"":"")+">"+Str_Start+"</option>\n";
	out+="		</select>\n";
	out+="		</td>\n";
	out+="	 </tr>\n";// */
	//			--------------
	out+="	 <tr bgcolor=\"#ddd\">\n";
	out+="		<td colspan=\"2\" align=\"center\" >\n";
	out+="		<font size=\"2\" face=\"arial\">"+Str_Stss+"<br/>"+Str_Times+"</font>"
	out+="		<br/><font size=\"1\" face=\"arial\">"+Str_Conf_PlanSeq+"</font>"
	out+="		</td>\n";
	out+="	 </tr>\n";
	//			--------------
	out+="	 <tr bgcolor=\"#ddd\">\n";
	out+="		<td colspan=\"2\" align=\"center\" >\n";
	//------------------
	out+="<table border=\"0\" bgcolor=\"#ddd\" class=\"table1\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" >\n";
	outD+="<tr bgcolor=\"#ddd\">\n";
	outT+="<tr bgcolor=\"#ddd\">\n";
	outN+="<tr bgcolor=\"#ddd\">\n";
	for (j=0;j<pln.TP.length;j++)
	{
		col="style=\"background-color:rgba("+(255*(j&4))+","+(255*(j&2))+","+(255*(j&1))+",0.2);\"";
		outD+="	<td "+col+" align=\"center\"><input type=\"button\" onclick=\""
		if(pln.TP[j]!=0)
			outD+="var rtr=ShwAddDem("+j+");showFlyMnu(event,{idx:10000,HTML:rtr,TimeOut:0});";
		outD+="\" value=\""+Str_Status+":"+PLCs()[PlcIdx].Sts[j].Name+"\"	class=\"CssBtn\" "+col+" /></td>\n";
		outT+="	<td "+col+" align=\"center\"><input value=\""+pln.TP[j]+"\" onchange=\"PlanModT(PLCs()[PlcIdx],PLCs()[PlcIdx].Plans[PlnIdx],null,this.value,"+j+");ReDraw(-1);\" size=\"3\" maxlength=\"3\" type=\"text\" class=\"CssInText\" "+col+" /><font size=\"1\" face=\"arial\">segs</font></td>\n";
		outN+="	<td "+col+" align=\"center\"><font size=\"1\" face=\"arial\">";
		if(pln.Dem[j].Typ!=0 && pln.Dem[j].Num!=0)
		{
			//outN+="<input type=\"checkbox\" onclick=\"PLCs()[PlcIdx].Plans[PlnIdx].Dem["+j+"].Sim^=1;ReDraw(-1);\" "+((pln.Dem["+j+"].Sim&1)?"checked=\"checked\"":"")+" /><br/>\n";
			outN+="<font size=\"2\" face=\"arial\">";
			if(pln.Typ==0)
				outN+=OptAsyDem[(pln.Dem[j].Typ*2)+1]+"<br/>\n";
			if(pln.Typ==1)
				outN+=OptSycDem[(pln.Dem[j].Typ*2)+1]+"<br/>\n";
				if(pln.Dem[j].Num!=0)
					outN+=IOs[pln.Dem[j].Num-1].Name+"<br/>\n";
			if(pln.Dem[j].Typ==2)
			{
				outN+=OptDemT2Dt[(pln.Dem[j].Dat[0]*2)+1]+"<br/>\n";
			}
			if(pln.Dem[j].Typ==3)
			{
				if(pln.Typ==0)
				{
					outN+=Str_TimStpExt;
					outN+=pln.Dem[j].Dat[0]+" Max:"+pln.Dem[j].Dat[1]+"s<br/>\n";
				}
				if(pln.Typ==1)
				{
					outN+=Str_TimBlc;
					outN+=pln.Dem[j].Dat[0]+"s<br/>\n";
				}
			}
			outN+="</font><br/>\n"
		}
		outN+="</font></td>\n";
	}
	outD+="</tr>\n";
	outT+="</tr>\n";
	outN+="</tr>\n";
	out+=outD;
	out+=outT;
	out+=outN;
	out+="	</table>";
	//------------------
	out+="		</td>\n";
	out+="	 </tr>\n";
	//			--------------
	if(pln.Typ==0)
	{
		out+="	 <tr bgcolor=\"#ddd\">\n";
		out+="		<td align=\"center\" >\n";
		out+="		<font size=\"2\" face=\"arial\">"+Str_Cicle_Time+"</font>"
		out+="		</td>\n";
		out+="		<td align=\"center\" >\n";
		out+="		<font size=\"2\" face=\"arial\">"+pln.TC+"segs</font><br/>\n";
		out+="		</td>\n";
		out+="	 </tr>\n";
	}
	//		--------------
	out+="	</table>";
	if(Dim_En)
	{
		out+="<table border=\"0\" bgcolor=\"#ddd\" class=\"table1\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" >\n";
		out+="<tr bgcolor=\"#ddd\">\n";
		out+="<td colspan=\"2\" >\n";
		out+="<font size=\"1\" face=\"arial\">"+Str_Diming+"</font>\n";
		out+="<input type=\"checkbox\" onclick=\"PLCs()[PlcIdx].Plans[PlnIdx].DimTyp=(this.checked?1:0);ReDraw(-1);\" "+(pln.DimTyp!=0?"checked=\"checked\"":"")+" />\n";
		out+="</td>\n";
		out+="</tr>\n";
		if(pln.DimTyp>0)
		{
			out+="<tr bgcolor=\"#ddd\">\n";
			out+="<td >\n";
			out+="<font size=\"1\" face=\"arial\">"+Str_All_Phases+"</font>\n";
			out+="<input type=\"radio\" onchange=\"PLCs()[PlcIdx].Plans[PlnIdx].DimTyp=1;ReDraw(-1);\" "+(pln.DimTyp==1?"checked=\"checked\"":"")+" />\n";
			out+="</td>\n";
			out+="<td >\n";
			out+="<font size=\"1\" face=\"arial\">"+Str_Individual_Phase+"</font>\n";
			out+="<input type=\"radio\" onchange=\"PLCs()[PlcIdx].Plans[PlnIdx].DimTyp=2;ReDraw(-1);\" "+(pln.DimTyp==2?"checked=\"checked\"":"")+" />\n";
			out+="</td>\n";
			out+="</tr>\n";
			if(pln.DimTyp==1)
			{
					if(!pln.Dim[0])pln.Dim[0]=100;
					out+="<tr bgcolor=\"#ddd\">\n";
					out+="<td >\n";
					out+="<font size=\"1\" face=\"arial\">"+Str_All_Phases+"(%)</font>\n";
					out+="</td>\n";
					out+="<td >\n";
					out+="<input type=\"text\" align=\"right\" class=\"CssInText\" value=\"";
					out+=pln.Dim[0];
					out+="\" size=\"4\" maxlength=\"3\" onchange=\"PLCs()[PlcIdx].Plans[PlnIdx].Dim[0]=this.value;\" />\n";
					out+="</td>\n";
					out+="</tr>\n";
			}
			if(pln.DimTyp==2)
			{
				for(j=0;j<PHASEs().length;j++)	
				{
					if(!pln.Dim[j])pln.Dim[j]=100;
					out+="<tr bgcolor=\"#ddd\">\n";
					out+="<td >\n";
					out+="<font size=\"1\" face=\"arial\">"+PHASEs()[j].Name+"(%)</font>\n";
					out+="</td>\n";
					out+="<td >\n";
					out+="<input type=\"text\" align=\"right\" class=\"CssInText\" value=\"";
					out+=pln.Dim[j];
					out+="\" size=\"4\" maxlength=\"3\" onchange=\"PLCs()[PlcIdx].Plans[PlnIdx].Dim["+j+"]=this.value;\" />\n";
					out+="</td>\n";
					out+="</tr>\n";
				}
			}
		}
		out+="	</table>";
	}
	return out;
}
function SetInUsed(val,stp)
{
	stp=parseInt(stp);
	val=parseInt(val);
	if(PLCs()[PlcIdx].Plans[PlnIdx].Dem[stp].Num!=0)
	{
		IOs[PLCs()[PlcIdx].Plans[PlnIdx].Dem[stp].Num-1].Used="";
		PLCs()[PlcIdx].Plans[PlnIdx].Dem[stp].IO=null;
	}
	if(val!=0)
	{
		IOs[val-1].Used=(PlnIdx+1)+","+Str_Step+":"+(stp+1);
		PLCs()[PlcIdx].Plans[PlnIdx].Dem[stp].IO=IOs[val-1];
	}
	PLCs()[PlcIdx].Plans[PlnIdx].Dem[stp].Num=val;
}
function ShwAddDem(stp)
{
	var out="";
	var i=0;
	var pln=PLCs()[PlcIdx].Plans[PlnIdx];
	var col="style=\"background-color:rgba("+(255*(stp&4))+","+(255*(stp&2))+","+(255*(stp&1))+",0.2);\"";
	out+="<table border=\"0\" class=\"table1\" align=\"center\" >\n";
	//-------------------------------------------------------------------
	out+="<tr>\n";
	out+="<td "+col+" >\n";
	out+="<font size=\"1\" face=\"Verdana\">"+PLCs()[PlcIdx].Sts[stp].Name+":Typo de Estado</font>\n";
	out+="</td>\n";
	out+="<td "+col+" >\n";
	out+="<select class=\"CssSelect\" "+col+" onchange=\"PLCs()[PlcIdx].Plans[PlnIdx].Dem["+stp+"].Typ=parseInt(this.value);FlyMnu.innerHTML=ShwAddDem("+stp+");\">\n";
	if(pln.Typ==0)
		out+=GenOptions(OptAsyDem,pln.Dem[stp].Typ);
	if(pln.Typ==1)
		out+=GenOptions(OptSycDem,pln.Dem[stp].Typ);
	out+="</select>\n";
	out+="</td>\n";
	out+="</tr>\n";
	//------------------------------
	if(pln.Dem[stp].Typ!=0)
	{
		{
			out+="<tr>\n";
			out+="<td>\n";
			out+="<font size=\"1\" face=\"Verdana\">Numero de Entrada:</font>\n";
			out+="</td>\n";
			out+="<td>\n";
			out+="<select class=\"CssSelect\" onchange=\"SetInUsed(this.value,"+stp+");FlyMnu.innerHTML=ShwAddDem("+stp+");\">\n";
			out+="<option value=\"0\">"+Str_Disable+"</option>\n";
			for(i=0;i<IOs.length;i++)
			{
				if(IOs[i].Enable!=0 && (IOs[i].Type&1)!=0 && IOs[i].Name!="" && ( IOs[i].Used=="" || pln.Dem[stp].Num==(i+1) ))
				{
					out+="<option value=\""+(i+1)+"\" "
					if(pln.Dem[stp].Num==(i+1))out+="selected=\"selected\" ";
					out+=">"+IOs[i].Name+"</option>\n";
				}
			}
			out+="</select>\n";
			out+="</td>\n";
			out+="</tr>\n";
		}
		i=0;
		//-------------------------------------------------------------------
		/*if(pln.Dem[stp].Num!=0 && pln.Dem[stp].Typ==1)
		{
			out+=" <tr>\n";
			out+="	<td>\n";
			out+="<font size=\"1\" face=\"Verdana\">Limpiar demanda al:</font>\n";
			out+="	</td>\n";
			out+="	<td>\n";
			out+="<select class=\"CssSelect\" onchange=\"PLCs()["+PlcIdx+"].Plans["+PlnIdx+"].Dem["+stp+"].Clr=this.value;FlyMnu.innerHTML=ShwAddDem("+stp+");\">\n";
			out+=GenOptions(OptDemClr,PLCs()[PlcIdx].Plans[PlnIdx].Dem[stp].Clr);
			out+="</select>\n";
			out+="	</td>\n";
			out+=" </tr>\n";
		}// */
		//-------------------------------------------------------------------
		if(pln.Dem[stp].Num!=0 && pln.Dem[stp].Typ==2)
		{
			out+=" <tr>\n";
			out+="	<td>\n";
			out+="<font size=\"1\" face=\"Verdana\">Atender la demanda:</font>\n";
			out+="	</td>\n";
			out+="	<td>\n";
			out+="<select class=\"CssSelect\" onchange=\"PLCs()["+PlcIdx+"].Plans["+PlnIdx+"].Dem["+stp+"].Dat[0]=this.value;FlyMnu.innerHTML=ShwAddDem("+stp+");\">\n";
			out+=GenOptions(OptDemT2Dt,PLCs()[PlcIdx].Plans[PlnIdx].Dem[stp].Dat[0]);
			out+="</select>\n";
			out+="	</td>\n";
			out+=" </tr>\n";
		}// */
		//-------------------------------------------------------------------
		if(pln.Dem[stp].Num!=0 && pln.Dem[stp].Typ==3)
		{
			if(pln.Typ==0)
			{
				out+=" <tr>\n";
				out+="	<td>\n";
				out+="	<font size=\"1\" face=\"Verdana\">"+Str_TimStpExt+"</font>\n";
				out+="	</td>\n";
				out+="	<td>\n";
				if(!pln.Dem[stp].Dat[0])
					pln.Dem[stp].Dat[0]=5;
				out+="	<input value=\""+pln.Dem[stp].Dat[0]+"\" onchange=\"PLCs()["+PlcIdx+"].Plans["+PlnIdx+"].Dem["+stp+"].Dat[0]=this.value;\" size=\"2\"  class=\"CssInText\" />";
				out+="	</td>\n";
				out+=" </tr>\n";
				out+=" <tr>\n";
				out+="	<td>\n";
				out+="	<font size=\"1\" face=\"Verdana\">tiempo maximo:</font>\n";
				out+="	</td>\n";
				out+="	<td>\n";
				if(!pln.Dem[stp].Dat[1])
					pln.Dem[stp].Dat[1]=pln.TP[stp];
				out+="	<input value=\""+pln.Dem[stp].Dat[1]+"\" onchange=\"PLCs()["+PlcIdx+"].Plans["+PlnIdx+"].Dem["+stp+"].Dat[1]=this.value;\" size=\"2\"  class=\"CssInText\" />";
				out+="	</td>\n";
				out+=" </tr>\n";
			}
			if(pln.Typ==1)
			{
				out+=" <tr>\n";
				out+="	<td>\n";
				out+="	<font size=\"1\" face=\"Verdana\">"+Str_TimBlc+"</font>\n";
				out+="	</td>\n";
				out+="	<td>\n";
				if(!pln.Dem[stp].Dat[0])
					pln.Dem[stp].Dat[0]=pln.TP[stp]-GetTmin(PLCs()[PlcIdx],stp);
				out+="	<input value=\""+pln.Dem[stp].Dat[0]+"\" onchange=\"PLCs()["+PlcIdx+"].Plans["+PlnIdx+"].Dem["+stp+"].Dat[0]=this.value;\" size=\"2\"  class=\"CssInText\" />";
				out+="	</td>\n";
				out+=" </tr>\n";
			}
		}// */
		//-------------------------------------------------------------------
	}
	//-------------------------------------------------------------------
	out+="<tr>\n";
	out+="	<td>\n";
	//out+="<input type=\"button\" onclick=\"SetDem("+stp+");\" value=\"Set\"	class=\"CssBtn\" /> ";
	out+="	</td>\n";
	out+="	<td>\n";
	out+="<input type=\"button\" onclick=\"hideFlyMnu("+FlyMnu.idx+");ReDraw(-1);\" value=\"Close\"	class=\"CssBtn\" />\n";
	out+="	</td>\n";
	out+=" </tr>\n";
	out+="</table>";
	/*//-------------------------------------------------------------------
	out +="<select class=\"CssSelect\" onchange=\"IOs["+i+"].shNivel=parseInt(this.value);ModParm('IOs.TimeOut');\" disabled=\"disabled\">\n";
	out+="<option value=\"\"></option>\n";
	//out +=GenOptions(OptInputShin,IOs[i].shNivel);
	out +="</select><br />\n";
	out +="<select class=\"CssSelect\" onchange=\"IOs["+i+"].FailSts=parseInt(this.value);ModParm('IOs.TimeOut');\">\n";
	out+="<option value=\"\"></option>\n";
	//out +=GenOptions(OptInputV,IOs[i].FailSts);
	out +="</select><br />\n";
	out +="<select class=\"CssSelect\" onchange=\"IOs["+i+"].neg=parseInt(this.value);ModParm('IOs.TimeOut');\" >\n";
	out+="<option value=\"\"></option>\n";
	//out +=GenOptions(OptInputV,IOs[i].neg);
	out +="</select><br />\n";
	out +="<select class=\"CssSelect\" onchange=\"IOs["+i+"].TimeOut=parseInt(this.value);ModParm('IOs.TimeOut');\">\n";
	out+="<option value=\"\"></option>\n";
	//out +=GenOptiontyp(GetParmByName("IOs.TimeOut"),IOs[i].TimeOut);
	out +="</select><br />\n";
	//-------------------------------------------------------------------*/
	//alert(out);
	return out;
}

//------------------------------------------
function GetTpp(TP,S)
{
		S+=TP.length;
		S--;
		S=(S%TP.length);
		while(TP[S]==0)
		{
			S+=TP.length;
			S--;
			S=(S%TP.length);
		}
		return S;
}
function GetTpi(TP,S)
{
		S=(S%TP.length);
		while(TP[S]==0)
		{
			S++;
			S=(S%TP.length);
		}
		return S;
}
function GetTpn(TP,S)
{
		S++;
		S=(S%TP.length);
		while(TP[S]==0)
		{
			S++;
			S=(S%TP.length);
		}
		return S;
}

//------------------------------------------
function GraphPlanSync(Plan)
{
	var out="";
	var outN="";
	var STPi=0;
	var TPp=0;
	var TPi=0;
	var TPc=0;
	var TPn=0;
	var r=0;
	var g=0;
	var of=0;
	var sec=0;
	var c=0;
	var color=0;
	var siny=0;
	var cosx=0;
	var dg=0;
	var Tev=0;
	var tm=0;
	var Lst=0;
	var x,y;
	var width=600;
	var height=600 ;
	var PLC=PLCs()[PlcIdx];
	//------------------
	UpdateTimes(PLC,Plan);
	out+="<svg width=\""+width+"\" height=\""+height+"\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n";
	out+="<rect fill=\"none\" stroke-width=\"5\" stroke=\"rgba(0,0,0,1);\" x=\"5\" y=\"5\" width=\"590\" height=\"590\" />\n";
	//---------------------------------------------------------*/
	color=Math.round(16777215/PLC.Sts.length);
	STPi=0;
	TPi=GetTpi(Plan.TP,STPi);
	do
	{
		TPp=GetTpp(Plan.TP,TPi);
		TPn=GetTpn(Plan.TP,TPi);
		TPc=TPi;
		/*if(Plan.Dem[TPi].Typ!=0 && Plan.Dem[TPi].Num!=0)
			if(Plan.Dem[TPi].Sim==0)
				TPc=TPp;// */
		if(Plan.EV==1)
			Tev=GetEvT(PLCs()[PlcIdx].Sts,TPp,TPc);
		else
			Tev=GetEvT(PLCs()[PlcIdx].Sts,TPc,TPn);
		//------------------------------- Entre verde ini
		if(TPc==TPi)
		{
			if(Plan.EV==1)
			{
				g=(Tev/(Plan.TC/2));
				x=Math.round(Math.round(width/2)+(Math.round(width/3)*Math.sin((dg+(g/2))*Math.PI)));
				y=Math.round(Math.round(height/2)-(Math.round(height/3)*Math.cos((dg+(g/2))*Math.PI)));
				out+="<text x=\""+Math.round(x+(x-Math.round(width/2))/10)+"\" y=\""+Math.round(y+(y-Math.round(height/2))/10)+"\" fill=\"#000000\" stroke-width=\"0\" font-size=\"10\" font-family=\"Arial\" text-anchor=\"middle\" font-weight=\"bold\">";
				out+=PLC.Sts[TPp].Name+"->"+PLC.Sts[TPc].Name+":"+Tev+"s</text>\n";
				
				x=Math.round(Math.round(width/2)+((Math.round(width/3)-5)*Math.sin(dg*Math.PI)));
				y=Math.round(Math.round(height/2)-((Math.round(height/3)-5)*Math.cos(dg*Math.PI)));
				out+="<path d=\"M"+x+","+y+" ";
				dg+=g;
				x=Math.round(Math.round(width/2)+((Math.round(width/3)-5)*Math.sin(dg*Math.PI)));
				y=Math.round(Math.round(height/2)-((Math.round(height/3)-5)*Math.cos(dg*Math.PI)));
				out+="A"+(Math.round(width/3)-5)+","+(Math.round(height/3)-5)+" 0 0 1 "+x+","+y+" L"+Math.round(width/2)+","+Math.round(width/2)+" z\" fill=\"rgba(255,255,192,0.9)\" stroke=\"rgba(0,0,0,0.2)\" stroke-width=\"1\" />";
			}// */
		}
		//------------------------------- t min */
		if(TPc==TPi)
		{
			tm=GetTmin2(PLCs()[PlcIdx],TPp,TPi);
			r=(tm/(Plan.TC/2));
			x=Math.round(Math.round(width/2)+(Math.round(width/3)*Math.sin((dg+(r/2))*Math.PI)));
			y=Math.round(Math.round(height/2)-(Math.round(height/3)*Math.cos((dg+(r/2))*Math.PI)));
			out+="<text x=\""+Math.round(x+(x-Math.round(width/2))/10)+"\" y=\""+Math.round(y+(y-Math.round(height/2))/10)+"\" fill=\"#000000\" stroke-width=\"0\" font-size=\"10\" font-family=\"Arial\" text-anchor=\"middle\" font-weight=\"bold\">";
			out+="Min:"+tm+"s</text>\n";

			x=Math.round(Math.round(width/2)+((Math.round(width/3)+5)*Math.sin(dg*Math.PI)));
			y=Math.round(Math.round(height/2)-((Math.round(height/3)+5)*Math.cos(dg*Math.PI)));
			out+="<path d=\"M"+x+","+y+" ";
			dg+=r;
			x=Math.round(Math.round(width/2)+((Math.round(width/3)+5)*Math.sin(dg*Math.PI)));
			y=Math.round(Math.round(height/2)-((Math.round(height/3)+5)*Math.cos(dg*Math.PI)));
			out+="A"+(Math.round(width/3)+5)+","+(Math.round(height/3)+5)+" 0 0 1 "+x+","+y+" L"+Math.round(width/2)+","+Math.round(width/2)+" z\" ";
			out+="fill=\"rgba("+(255*(TPi&4))+","+(255*(TPi&2))+","+(255*(TPi&1))+",0.4)\" ";
			if(Plan.Dem[TPi].Typ!=0 && Plan.Dem[TPi].Num!=0)
				out+="stroke=\"rgba(0,0,255,0.8)\" stroke-width=\"4\" />";
			else
				out+="stroke=\"rgba(0,0,0,0.2)\" stroke-width=\"1\" />";
		}
		//------------------------------- Estado */
		if(TPc==TPi)
			sec=((Plan.TP[TPi]-tm)/(Plan.TC/2));
		else
			sec=((Plan.TP[TPi]+Tev)/(Plan.TC/2));
		//------------ Name and Time
		x=Math.round(Math.round(width/2)+(Math.round(width/3)*Math.sin((dg+(sec/2))*Math.PI)));
		y=Math.round(Math.round(height/2)-(Math.round(height/3)*Math.cos((dg+(sec/2))*Math.PI)));
		out+="<text x=\""+Math.round(x+(x-Math.round(width/2))/6)+"\" y=\""+Math.round(y+(y-Math.round(height/2))/6)+"\" fill=\"#000000\" stroke-width=\"0\" font-size=\"12\" font-family=\"Arial\" text-anchor=\"middle\" font-weight=\"bold\">";
		out+=Plan.TP[TPc]+"s (%"+Math.round(((100/Plan.TC)*(Plan.TP[TPi]+Tev))*10)/10+")";
		out+="</text>\n";
		outN+="<text x=\""+Math.round(Math.round(width/2)+(x-Math.round(width/2))/3)+"\" y=\""+Math.round(Math.round(height/2)+(y-Math.round(height/2))/3)+"\" fill=\"#000000\" stroke-width=\"0\" font-size=\"12\" font-family=\"Arial\" text-anchor=\"middle\" font-weight=\"bold\">";
		outN+=PLC.Sts[TPc].Name;
		outN+="</text>\n";
		//------------ Sobra
		x=Math.round(Math.round(width/2)+((Math.round(width/3)+5)*Math.sin(dg*Math.PI)));
		y=Math.round(Math.round(height/2)-((Math.round(height/3)+5)*Math.cos(dg*Math.PI)));
		out+="<path d=\"M"+x+","+y+" ";
		dg+=sec;
		x=Math.round(Math.round(width/2)+((Math.round(width/3)+5)*Math.sin(dg*Math.PI)));
		y=Math.round(Math.round(height/2)-((Math.round(height/3)+5)*Math.cos(dg*Math.PI)));
		out+="A"+(Math.round(width/3)+5)+","+(Math.round(height/3)+5)+" 0 "+((sec>1)?"1":"0")+" 1 "+x+","+y+" L"+Math.round(width/2)+","+Math.round(width/2)+" z\" ";
		out+="fill=\"rgba("+(255*(TPc&4))+","+(255*(TPc&2))+","+(255*(TPc&1))+",0.2)\" ";
		if(Plan.Dem[TPi].Typ!=0 && Plan.Dem[TPi].Num!=0)
			out+="stroke=\"rgba(0,0,255,0.9)\" stroke-width=\"4\" />";
		else
			out+="stroke=\"rgba(0,0,0,0.3)\" stroke-width=\"1\" />";
		//------------ Colores
		if(TPc==TPi)
			if(Plan.EV==1)
				of+=Tev;
		for (c=0;c<PLC.Sts[TPc].Colors.length;c++) 
		{
			if(PHASEs()[PLC.Sts[TPc].Colors.length-(c+1)].PLC&(1<<PlcIdx))
			{
				r=Math.round((((width+height)/2)/2)/4)+Math.round((100/PLC.Sts[TPc].Colors.length)*(c+1)*100)/100
				g=Math.round(Math.PI*r*2*100)/100;
				sec=Math.round((g/Plan.TC)*Plan.TP[TPi]);
				color=PLC.Sts[TPc].Colors[PLC.Sts[TPc].Colors.length-(c+1)];
				//--------------------------------------------------------------
				out+="<circle id=\""+PLC.Sts[TPc].Name+"P"+(c+1)+"\" ";
				out+="r=\""+Math.round(r)+"\" ";
				if((color&0x30)==0)
					out+="stroke-dasharray=\""+sec+","+(g-sec)+"\" ";
				else
					out+="stroke-dasharray=\""+sec+","+(g-sec)+"\" ";//tit
				out+="stroke-dashoffset=\""+Math.round((g/4)-Math.round((g/Plan.TC)*of))+"\" ";
				out+="stroke=\""+RGBcolor[color&7]+"\" ";
				out+="stroke-width=\"6\" ";
				out+="cx=\""+Math.round(width/2)+"\" cy=\""+Math.round(height/2)+"\" fill=\"none\" ></circle>\n";
				//out+="<circle id=\"Ev"+PLC.Sts[TPi].Name+"\" r=\"159.155\" cx=\"200\" cy=\"200\" fill=\"transparent\" stroke-dasharray=\""+((1000/PLC.Sts.length)*j)+","++"\" stroke-dashoffset=\"0\"></circle>\n";
			}
		}
		of+=Plan.TP[TPi];
		if(Plan.EV==0)
			of+=Tev;
		//------------------------------- Entre verde fin */
		if(TPc==TPi)
		{
			if(Plan.EV==0)
			{
				g=(Tev/(Plan.TC/2));
				x=Math.round(Math.round(width/2)+(Math.round(width/3)*Math.sin((dg+(g/2))*Math.PI)));
				y=Math.round(Math.round(height/2)-(Math.round(height/3)*Math.cos((dg+(g/2))*Math.PI)));
				out+="<text x=\""+Math.round(x+(x-Math.round(width/2))/10)+"\" y=\""+Math.round(y+(y-Math.round(height/2))/10)+"\" fill=\"#000000\" stroke-width=\"0\" font-size=\"10\" font-family=\"Arial\" text-anchor=\"middle\" font-weight=\"bold\">\
				"+PLC.Sts[TPc].Name+"->"+PLC.Sts[TPn].Name+":"+Tev+"s</text>\n";
				x=Math.round(Math.round(width/2)+((Math.round(width/3)-5)*Math.sin(dg*Math.PI)));
				y=Math.round(Math.round(height/2)-((Math.round(height/3)-5)*Math.cos(dg*Math.PI)));
				out+="<path d=\"M"+x+","+y+" ";
				dg+=g;
				x=Math.round(Math.round(width/2)+((Math.round(width/3)-5)*Math.sin(dg*Math.PI)));
				y=Math.round(Math.round(height/2)-((Math.round(height/3)-5)*Math.cos(dg*Math.PI)));
				out+="A"+(Math.round(width/3)-5)+","+(Math.round(height/3)-5)+" 0 0 1 "+x+","+y+" L"+Math.round(width/2)+","+Math.round(width/2)+" z\" fill=\"rgba(255,255,192,0.9)\" stroke=\"rgba(0,0,0,0.2)\" stroke-width=\"1\" />";
			}
		}
		//------------------------------- */
		TPi=TPn;
	}
	while(TPi!=STPi);
	//---------------------------------------------------------*/
	out+="<line x1=\""+Math.round(width/2)+"\" y1=\""+Math.round(width/2)+"\" x2=\""+Math.round(width/2)+"\" y2=\"75\" stroke=\"rgba(128,0,128,0.8)\" stroke-width=\"3\" />\n";
	out+="<text fill=\"#000000\" stroke-width=\"0\" x=\""+Math.round(width/2)+"\" y=\"70\" font-size=\"12\" font-family=\"Arial\" text-anchor=\"middle\" font-weight=\"bold\">"+Str_Sincp+"</text>\n";
	out+=outN;
	out+="</svg>\n";
	return out;
}
function EdStsTp(ths,evnt,TPi,xstp,X,X1,X2)
{
	var tmp;
	//-----------------------------------------------------------
	if(evnt.type=="mousemove" && TP2Ed.id.indexOf("cEdStsTp")!=-1)
	{
		tmp=document.getElementById(TP2Ed.id);
		X=evnt.offsetX;//evnt.movementX;
		if(X>=TP2Ed.X1 && TP2Ed.X2>=X)
			tmp.x.baseVal.value=X-25;
		if(X<TP2Ed.X1)
			tmp.x.baseVal.value=(TP2Ed.X1-25);
		if(TP2Ed.X2<X)
			tmp.x.baseVal.value=(TP2Ed.X2-25);
		X1=Math.round((tmp.x.baseVal.value+25-TP2Ed.X1)/TP2Ed.xstp);
		tmp=document.getElementById("t"+TP2Ed.id);
		tmp.innerHTML=X1+"s"
		return;
	}
	if(evnt.type=="mousedown" && ths.id.indexOf("cEdStsTp")!=-1)
	{
		TP2Ed.id=ths.id;
		TP2Ed.X=X;
		TP2Ed.X1=X1;
		TP2Ed.X2=X2;
		TP2Ed.TPi=TPi;
		TP2Ed.xstp=xstp;
	}
	if(evnt.type=="mouseup" && TP2Ed.id.indexOf("cEdStsTp")!=-1)
	{
		tmp=document.getElementById(TP2Ed.id);
		X=((tmp.x.baseVal.value+25)-TP2Ed.X)/TP2Ed.xstp;
		X=Math.round(X);
		tmp.x.baseVal.value=(TP2Ed.X-25)+(X*TP2Ed.xstp);
		X=Math.round((tmp.x.baseVal.value+25-TP2Ed.X1)/TP2Ed.xstp);
		PlanModT(PLCs()[PlcIdx],PLCs()[PlcIdx].Plans[PlnIdx],null,X,TP2Ed.TPi);
		TP2Ed.id="";
		ReDraw(-1);
	}
}
function GraphPlanAislado(width,Plan)
{
	var c=0;
	//------------------------------------------------
	var Error="";
	var fullscaleX = document.body.clientWidth;
	var fullscaleY = document.body.clientHeight;
	var height=0;
	var svg="";
	var out="";
	var STPi=0;
	var TPp=0;
	var TPi=0;
	var TPn=0;
	//------------
	var Tev=0;
	var tm=0;
	var ccode=0;
	var X=0;
	var X2=0;
	var Y=0;
	UpdateTimes(PLCs()[PlcIdx],Plan);
	fullscaleX = Math.round(width*0.9);
	var	xstp = Math.round(fullscaleX/Plan.TC);
	fullscaleX = xstp*Plan.TC;
	var Xof = Math.round((width-fullscaleX)/2);
	width=(Xof*2)+fullscaleX;
	var Yof = 60;
	var Yofdw = 10;
	var ystp = 30;
	//------------------------------------------------------
	for (c=0;c<PHASEs().length;c++) 
	{
		if(PHASEs()[c].PLC&(1<<PlcIdx))
		{
			height++;
		}
	}
	//------------------------------------------------------ estado
	X=Xof;
	STPi=GetTpi(Plan.TP,0);
	TPi=STPi;
	do
	{
		TPi=GetTpi(Plan.TP,TPi);
		TPp=GetTpp(Plan.TP,TPi);
		TPn=GetTpn(Plan.TP,TPi);
		if(Plan.EV==0)
		{
			tm=GetTmin2(PLCs()[PlcIdx],TPi,TPn);
			Tev=GetEvT(PLCs()[PlcIdx].Sts,TPi,TPn);
		}
		else
		{
			tm=GetTmin2(PLCs()[PlcIdx],TPp,TPi);
			Tev=GetEvT(PLCs()[PlcIdx].Sts,TPp,TPi);
		}
		//---------------------------------	entre verde inicio
		if(Plan.EV==1)
		{
			svg+="<text x=\""+X+"\" y=\""+(Yof-14)+"\" fill=\"#000000\" stroke-width=\"0\" font-size=\"10\" font-family=\"Monospace\" text-anchor=\"start\" >";
			svg+="["+PLCs()[PlcIdx].Sts[TPi].Name+"->"+PLCs()[PlcIdx].Sts[TPn].Name+":"+Tev+"s]";
			svg+="</text>";
			svg+="<rect id=\"rEv"+TPi+"\" x=\""+X+"\" y=\""+(Yof-10)+"\" width=\""+(Tev*xstp)+"\" height=\""+((height*ystp)+0)+"\" ";
			svg+="onmouseup=\"EdStsTp(this,event,0,0,0,0,0)\" onmousemove=\"EdStsTp(this,event,0,0,0,0,0)\" fill=\"rgba(192,192,128,0.7)\" stroke=\"#808000\" stroke-width=\"1\" />";
			svg+=MkEv(TPp,TPi,X,Yof,xstp,ystp);
			X+=Tev*xstp;
		}
		X2=Plan.TP[TPi]*xstp;
		//--------------------------------- EdEstado
		svg+="<svg id=\"cEdStsTp"+TPi+"\" x=\""+(X+X2-25)+"\" y=\""+(Yof-50)+"\" \
					onmouseup  =\"EdStsTp(this,event,"+TPi+","+xstp+","+(X+X2)+","+(X)+","+(X+X2+(Tev*xstp))+")\" \
					onmousedown=\"EdStsTp(this,event,"+TPi+","+xstp+","+(X+X2)+","+(X)+","+(X+X2+(Tev*xstp))+")\"\
					onmousemove=\"EdStsTp(this,event,"+TPi+","+xstp+","+(X+X2)+","+(X)+","+(X+X2+(Tev*xstp))+")\" >";
		svg+="<text id=\"tcEdStsTp"+TPi+"\" fill=\"#000000\" x=\"55\" y=\"10\" stroke-width=\"0\" font-size=\"9\" font-family=\"Monospace\" text-anchor=\"start\" >\
					"+(Plan.TP[TPi])+"s\
					</text>\
					<path d=\"M24 40 L24 20 L0 10 L25 0 L50 10 L26 20 L26 40 L25 40 L25 0 Z\" stroke=\"rgba(32,32,32,1)\" fill=\"rgba(128,255,128,0.5)\" style=\"cursor: move;\" />\
					</svg>";
		//---------------------------------	estado
		svg+="<text x=\""+(X+(X2/2))+"\" y=\""+(Yof+((height*ystp)+4))+"\" fill=\"#000000\" stroke-width=\"0\" font-size=\"10\" font-family=\"Monospace\" text-anchor=\"start\" >["+PLCs()[PlcIdx].Sts[TPi].Name+":"+(Plan.TP[TPi])+"s]</text>";
		svg+="<rect x=\""+X+"\" y=\""+(Yof-10)+"\" width=\""+X2+"\" height=\""+((height*ystp)+0)+"\" fill=\"rgba("+(255*(TPi&4))+","+(255*(TPi&2))+","+(255*(TPi&1))+",0.2)\" id=\"rcEdStsTp"+TPi+"\" onmouseup=\"EdStsTp(this,event,0,0,0,0,0)\" onmousemove=\"EdStsTp(this,event,0,0,0,0,0)\" stroke=\"#808000\" stroke-width=\"1\" />";
		svg+="<text x=\""+X+"\" y=\""+(Yof-14)+"\" fill=\"#000000\" stroke-width=\"0\" font-size=\"10\" font-family=\"Monospace\" text-anchor=\"start\" >";
		svg+="[Tmin:"+tm+"s]";
		svg+="</text>";																								// "+(255*(TPi&4))+","+(255*(TPi&2))+","+(255*(TPi&1))+"
		svg+="<rect x=\""+X+"\" y=\""+(Yof-10)+"\" width=\""+(tm*xstp)+"\" height=\""+((height*ystp)+0)+"\" fill=\"rgba(64,64,64,0.2)\" id=\"rTm"+TPi+"\" onmouseup=\"EdStsTp(this,event,0,0,0,0,0)\" onmousemove=\"EdStsTp(this,event,0,0,0,0,0)\" stroke=\"#808080\" stroke-width=\"1\" />";
		for (c=0;c<PLCs()[PlcIdx].Sts[TPi].Colors.length;c++) 
		{
			if(PHASEs()[c].PLC&(1<<PlcIdx))
			{
				ccode=PLCs()[PlcIdx].Sts[TPi].Colors[c];
				Y=(Yof+(ystp*c));
				svg+=MkLine(ccode,Y,X,(X+X2),0,width);
			}
		}
		X+=X2;
		//--------------------------------- entre verde final
		if(Plan.EV==0)
		{
			svg+="<text x=\""+X+"\" y=\""+(Yof-14)+"\" fill=\"#000000\" stroke-width=\"0\" font-size=\"10\" font-family=\"Monospace\" text-anchor=\"start\" >";
			svg+="["+PLCs()[PlcIdx].Sts[TPi].Name+"->"+PLCs()[PlcIdx].Sts[TPn].Name+":"+Tev+"s]";
			svg+="</text>";
			svg+="<rect id=\"rEv"+TPi+"\" x=\""+X+"\" y=\""+(Yof-10)+"\" width=\""+(Tev*xstp)+"\" height=\""+((height*ystp)+0)+"\" ";
			svg+="onmouseup=\"EdStsTp(this,event,0,0,0,0,0)\" onmousemove=\"EdStsTp(this,event,0,0,0,0,0)\" fill=\"rgba(192,192,128,0.7)\" stroke=\"#808000\" stroke-width=\"1\" />";
			svg+=MkEv(TPi,TPn,X,Yof,xstp,ystp);
			X+=Tev*xstp;
		}
		//---------------------------------
		TPi=TPn;
	}
	while(TPi!=STPi);
	//------------------------------------------------------
	out="<svg width=\""+width+"\" height=\""+(Yof+(height*ystp)+Yofdw+4)+"\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n";
	out+="<rect id=\"rAll\" \
	onmouseup=\"EdStsTp(this,event,0,0,0,0,0)\"  \
	onmousedown=\"EdStsTp(this,event,0,0,0,0,0)\" \
	onmousemove=\"EdStsTp(this,event,0,0,0,0,0)\" \
	onmouseleave=\"EdStsTp(this,event,0,0,0,0,0)\" \
	x=\"0\" y=\"1\" width=\""+(width-2)+"\" height=\""+(Yof+(height*ystp)+Yofdw)+"\" fill=\"#ddd\" stroke=\"#000000\" stroke-width=\"1\" />";
	if(Error!="")
	{
		ErrorMsg=Error;
		setTimeout("alert('"+Text+":"+Error+"')",500);
		out+="<text fill=\"#E00000\" x=\""+Math.round(width/3)+"\" y=\"16\" stroke-width=\"0\" font-weight=\"900\" font-size=\"14\" font-family=\"Monospace\" text-anchor=\"start\" >"+Error+"</text>";		
	}
	else
	{
		ErrorMsg=Error;
	}
	out+=svg;
	out+="</svg>";
	//alert(out);
	return out;
}

function SavePlan(PLC,Parms,Plan)
{
	UpdateTimes(PLC,Plan);
	var Sts=PLC.Sts;
	var tp=[];
	var t2s=[];
	var temp=0;
	var out="";
	//---------------------------------------------------------
	{
		out+="goto INICIO\n";
		if(Parms.MODEL.indexOf("M3")!=-1)
			out+="#CFT:sec.sec;\n";
		else
			out+="#CFT:"+PLC.Sec.replace("//","/")+";\n";
		//------------- Locals Vars
		out+=IniPlan;
		out+="temp1=XXXX\n";
		//-------------
		out+="INICIO\n";
		if(Parms.MODEL.indexOf("M4")!=-1)
		{
			if(Plan.PHC)
				out+="ldphc /"+PlcIdx+"/phc"+Plan.PHC+".ini\n";
			else
				out+="ldphc /phconf.ini\n";
		}
		if(Plan.DimTyp!=0)
		{
			for(var j=0;j<PHASEs().length;j++)
			{
				if(!Plan.Dim[j])Plan.Dim[j]=100;
				if(Plan.DimTyp==2)
					temp=Plan.Dim[j];
				else
					temp=Plan.Dim[0];
				out+="mov "+Math.round((15/100)*temp)+" ph["+j+"].dim\n";
			}
		}
		out+="mov 0 wait\n";
		out+="mov 0 Nstp\n";
		out+="mov 0 Cstp\n";
		out+="mov 0 temp1\n";
		out+="mov TIMERS tstart\n";
		out+="mov "+Plan.Typ+" TYP\n";
		if(Plan.Typ==1)
		{
			out+="mov "+(Plan.TC*1000)+" TC\n";
			out+="mov "+(Plan.OF*1000)+" OF\n";
		}
		out+="mov ,"+Plan.SEQ.toString()+",0 SEQ\n";
		for(var i=0;i<Sts.length;i++)
		{
			t2s[i]=parseInt("0"+Plan.T2S[i])*1000;
			tp[i]=parseInt("0"+Plan.TP[i])*1000;
		}
		if(Plan.Typ==0)
			out+="mov ,"+tp.toString()+" TP\n";
		if(Plan.Typ==1)
			out+="mov ,"+t2s.toString()+","+(Plan.TC*1000)+" T2S\n";
		out+="//-----------------------\n";
		var DFout="";
		var DTout="mov ";
		var DNout="mov ";
		var DCout="mov ";
		for(var i=0;i<Sts.length;i++)
		{
			DTout+=","+Plan.Dem[i].Typ;
			DNout+=","+Plan.Dem[i].Num;
			DCout+=","+Plan.Dem[i].Clr;
			if(Plan.Logic[i])
				DFout+="\n"+Plan.Logic[i]+"\n";
		}
		out+=DTout+" DemTyp\n";
		out+=DNout+" DemNum\n";
		out+=DCout+" DemClr\n";
		if(Plan.Typ==1)
		{
			out+="call TIM2STP\n";
		}
		out+="mov 99 Cstp\n";
		out+="goto MAIN\n";
		out+="//-----------------------\n";	
	}
	/*{	//Demandas
		out+="FNCDemISO\n";
		out+="mov DemNum[Cstp] temp1\n";
		out+="!= 0 temp1\n";
		out+="return\n";
		out+="!= io[temp1].inh 0\n";
		out+="return\n";
		//out+="== 0 DemTyp[Cstp]\n";
		//out+="mov x Nstp\n";
		out+="return\n";
		out+="//-----------------------\n";
		out+="DCstp\n";
		out+="mov DemClr[Cstp] temp1\n";
		out+="!= temp1 0\n";
		out+="return\n";
		out+="mov 0 io[temp1].inh\n";
		out+="mov 0 io[temp1].wmu\n";
		out+="return\n";
		out+="//-----------------------\n";
	}*/
	{	//Estados
		out+="SETSTS\n";
		out+="!= Nstp Cstp\n";
		out+="return\n";
		out+="mov Nstp Cstp\n";
		out+="== 255 Nstp FLAS\n";
		out+="== 254 Nstp SLOF\n";
		out+="phases STSv[Cstp]\n";
		out+="mov TIMERS tstart\n";
		out+="return\n";
		out+="//-------------\n";
		out+="FLAS\n";
		out+="phases STSRED\n";
		out+="delays RRT\n";
		out+="phases STSFF\n";
		out+="return\n";
		out+="//-------------\n";
		out+="SLOF\n";
		out+="phases STSRED\n";
		out+="delays RRT\n";
		out+="phases STSLOF\n";
		out+="return\n";
		out+="//-----------------------\n";
	}
	/*{	//Modos
		out+="CHKMODE\n";
		out+="!= Nmode Cmode\n";
		out+="return\n";
		out+="== Nmode 0 LOCAL\n";
		out+="== Nmode 1 MANUAL\n";
		out+="== Nmode 2 CENTRAL\n";
		out+="mov Nmode Cmode\n";
		out+="return\n";
		out+="//-----------------------\n";
		out+="MANUAL\n";
		out+="mov Nmode Cmode\n";
		out+="return MAIN\n";
		out+="//-----------------------\n";
		out+="CENTRAL\n";
		out+="mov 255 io["+OutRemote+"].val\n";
		out+="mov TIMERS tstart\n";
		out+="mov 0 Csts\n";
		out+="mov Nmode Cmode\n";
		out+="return\n";
		out+="//-----------------------\n";
		out+="LOCAL\n";
		out+="mov TIMERS tstart\n";
		out+="mov Nmode Cmode\n";
		out+="return FSTPL\n";
		out+="//-----------------------\n";
	}*/
	if(Plan.Typ==1)
	{	//Cambio de estados sync
		out+="TIM2STP\n";
		out+="mov 0 Nstp\n";
		out+="NXTIM\n";
		out+="sync TC 0 wait\n";	//lo que falta
		out+="dif TC wait\n";		//lo que paso
		out+="tim2sts STSv[Nstp] temp1\n";
		out+="add wait temp1\n";
		out+="< T2S[Nstp] temp1\n";
		out+="return\n";
		out+="mov SEQ[Nstp] Nstp\n";
		out+="!= Nstp 0\n";
		out+="return\n";
		out+="goto NXTIM\n";
		out+="//-----------------------\n";
	}
	{	//Main
		out+="MAIN\n";
		//out+="mov 0 MODE\n";
		//out+="call CHKMODE\n";
		out+="call SETSTS\n";
		//out+="call DCstp\n";
		if(Plan.Typ==0)
		{
			out+="mov TP[Cstp] wait\n";
			out+="time wait\n";
			out+="mov SEQ[Nstp] Nstp\n";
		}
		if(Plan.Typ==1)
		{
			out+="mov T2S[Cstp] wait\n";
			out+="add OF wait\n";
			out+="sync TC wait\n";
			out+="call TIM2STP\n";
		}
		//out+="call FNCDemISO\n";
		out+="!= Nstp 0\n";
		out+="agenda\n";
		out+="ldeil\n";
		out+="goto MAIN\n"
		out+="//-----------------------\n";
		out+=DFout;
	}
	out+=EndPlan;
	out=Remplace(out,"\n\n","\n");
	UpData=out;
	return out;
}
//===============================================================================
percent=86;
