//var RGBcolor2=["rgb(0,0,0)","rgb(192,0,0)","rgb(192,192,0)","rgb(0,0,0)","rgb(0,192,0)"];
var RGBcolor=["rgb(0,0,0)","rgb(255,0,0)","rgb(255,255,0)","rgb(255,255,255)","rgb(0,255,0)"];
var StrokeWidth=8;
var CIntReg=15;
var PlnIdx=0;
var OptTypPln=[0,"Plan Aislado",1,"Plan Sincronico"];
var OptSycPot=[	"??/??/???? 00:00:00","Todos los dias 00:00:00","01/01/1970 00:00:00","01/01/1970 00:00:00","01/01/2000 00:00:00","01/01/2000 00:00:00","??/??/????A00:00:00","En el horario del ultimo cambio"]; //,"01/01/1900 00:00:00","01/01/1900 00:00:00","01/01/2000 00:00:00"

var SwFF=7;//14
var SwEnMc=9;//15
var SwCmMc=8;//16
var OutAdv=10;
var OutMc=11;
var OutRemote=12;

//------------------------
var IniPlan="#MCT:\n\
#VAR:\n\
wait=XXXX\n\
Nsts=XXXX\n\
Csts=XXXX\n\
Nstp=XXXX\n\
Cstp=XXXX\n\
tstart=XXXX\n";
//------------------------
var EndPlan="end\n";

//--------------------------------------------------
function ShowStss()
{
	var out="";
	var PlnSts=PLCs()[PlcIdx].Sts;
	out+="<table border=\"0\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" class=\"table1\" >\n";// width=\"90%\"
	out+="<tr>\n";
	out+="<td valign=\"top\" align=\"center\">\n";
	out+="<font size=\"1\" face=\"arial\">Orden</font>\n";
	out+="</td>\n";
	out+="<td valign=\"top\" align=\"center\">\n";
	out+="<font size=\"1\" face=\"arial\">"+Str_Name_Stage+"</font>\n";
	out+="</td>\n";
	for(var y=0;y<PHASEs().length;y++)
	{
		if(PHASEs()[y].PLC&(1<<PlcIdx))
		{
			out+="<td valign=\"top\" align=\"center\">\n";
			out+="<font size=\"1\" face=\"arial\">"+PHASEs()[y].Name+"</font>\n";
			out+="</td>\n";
		}
	}
	out+="<td valign=\"top\" align=\"center\">\n";
	out+="<input type=\"button\" class=\"CssBtn\" value=\""+Str_Add_State+"\" size=\"8\" onclick=\"AddSts();ReDraw(-1);\"/>\n";
	out+="</td>\n";
	out+="</tr>\n";
	PlnSts.sort(sortN);
	for (var j=0;j<PlnSts.length;j++)
	{
		out+="<tr "+((j&1)?"bgcolor=\"#ccc\"":"bgcolor=\"#ddd\"")+" >\n";
		out+="<td valign=\"top\" align=\"center\">\n";
		out+="<input type=\"button\" class=\"CssBtn\" value=\"^\" size=\"2\" onclick=\"UpSts("+j+");ReDraw(-1);\"/>\n";
		out+="</td>\n";
		out+=ShowSts(j);
		out+="<td valign=\"top\" align=\"center\">\n";
		out+="<input type=\"button\" class=\"CssBtn\" value=\""+Str_Del_State+"\" size=\"8\" onclick=\"SubSts("+j+");ReDraw(-1);\"/>\n";
		out+="</td>\n";
		out+="</tr>\n";
	}
	out+="</table>\n";
	return out;
}
function ShowSts(nsts)
{
	var colorn=0;
	var PhN=0;
	var out="";
	var PlnSts=PLCs()[PlcIdx].Sts[nsts];
	if(!PlnSts.Name)
		PlnSts.Name=""+String.fromCharCode(65+nsts);
		out+="<td align=\"center\">\n";
	out+="<input type=\"text\" align=\"right\" class=\"CssInText\" value=\""+PlnSts.Name+"\" size=\"8\" maxlength=\"8\" onchange=\"PLCs()["+PlcIdx+"].Sts["+nsts+"].Name=this.value;ReDraw(-1);\" />\n";
	out+="</td>\n";
	for (var j = 0; j<PlnSts.Colors.length; j++)
	{
		if(PHASEs()[j].PLC&(1<<PlcIdx))
		{
			out+="<td align=\"center\" valign=\"middle\" height=\"10\" width=\"10\" onclick=\"ChgColSts("+nsts+","+j+");\" ";
			//out+="class=\"table2\" style=\"background-color:rgb("+((Color>>16)&255)+","+((Color>>8)&255)+","+(Color&255)+")\" ";
			out+=">\n";
			out+=ShwMov(PlnSts.Colors[j],PHASEs()[j].Type);
			//out+=color2svg(PlnSts.Colors[j],"");
			out+="</td>\n";
		}
	}
	return out;
}

function UpSts(s)
{
	var t=0;
	var tmp;
	var PlnSts=PLCs()[PlcIdx].Sts;
	t=(PlnSts.length+s-1)%PlnSts.length;
	tmp=PlnSts[t].Name;
	PlnSts[t].Name=PlnSts[s].Name;
	PlnSts[s].Name=tmp;
	PlnSts.sort(sortN);
	ReDraw(-1);
}
//--------------------------------------------------

function ChkJmp(sts1,sts2)
{
	if(GlobalParms().Model.indexOf("RT")!=-1)
	{
		for(var i=0;i<OTU.CftPLCs[PlcIdx].length;i++)
		{
			if(parseInt(OTU.CftPLCs[PlcIdx][i][0])==sts1)
				if(parseInt(OTU.CftPLCs[PlcIdx][i][1])==sts2)
					return false;
		}
	}
	return true;
}

function ModInVal(id,valor,range)
{
	var temp=0;
	temp=parseInt(document.getElementById(id).innerHTML);
	if(range[0]<=(temp+valor))
		if(range[1]>=(temp+valor))
			temp+=valor;
	temp-=(temp%Math.abs(valor));
	document.getElementById(id).innerHTML=temp;
}

function MkLine(ccode,Y,X1,X2)
{
	var color=RGBcolor[ccode&7]
	//X1++;
	if (ccode&0x30)
	{
		return "<path stroke-dasharray=\"2,2\" d=\"M"+X1+" "+Y+" "+X2+" "+Y+"\" stroke=\""+color+"\" fill=\"none\" stroke-width=\"14\" />\n";
	}
	else
	{
		if (ccode==0x03)
		{
				return "<line x1=\""+X1+"\" x2=\""+X2+"\" y1=\""+(Y-3)+"\" y2=\""+(Y-3)+"\" stroke=\""+RGBcolor[ccode&1]+"\" stroke-width=\"8\"/>\n\
								<line x1=\""+X1+"\" x2=\""+X2+"\" y1=\""+(Y+3)+"\" y2=\""+(Y+3)+"\" stroke=\""+RGBcolor[ccode&2]+"\" stroke-width=\"8\"/>\n";
		}
		else
		{
			if (ccode==0x06)
			{
				return "<line x1=\""+X1+"\" x2=\""+X2+"\" y1=\""+(Y-3)+"\" y2=\""+(Y-3)+"\" stroke=\""+RGBcolor[ccode&2]+"\" stroke-width=\"8\"/>\n\
								<line x1=\""+X1+"\" x2=\""+X2+"\" y1=\""+(Y+3)+"\" y2=\""+(Y+3)+"\" stroke=\""+RGBcolor[ccode&4]+"\" stroke-width=\"8\"/>\n";
			}
			else
			{
				return "<line x1=\""+X1+"\" x2=\""+X2+"\" y1=\""+Y+"\" y2=\""+Y+"\" stroke=\""+color+"\" stroke-width=\"20\"/>\n";
			}
		}
	}
}

function MkEv(TP1,TP2,X,Y,xstp,ystp)
{
	var j=0;
	var out="";
	var Color1=0;
	var Color2=0;
	var Tev=0;
	var Tvr=0;
	var Trv=0;
	var Tke=0;
	var PlnSts=PLCs()[PlcIdx].Sts;
	for (ph=0;ph<PlnSts[TP1].Colors.length;ph++)
	{
		Color1=PlnSts[TP1].Colors[ph];
		Color2=PlnSts[TP2].Colors[ph];
		if(Color1==1 && Color2==4)
			if(Trv<PHASEs()[ph].R2V.length)
				Trv=PHASEs()[ph].R2V.length;
		if(Color1==4 && Color2==1)
			if(Tvr<PHASEs()[ph].V2R.length)
				Tvr=PHASEs()[ph].V2R.length;
	}
	Tev=Tvr+Trv;
	for (ph=0;ph<PlnSts[TP1].Colors.length;ph++)
	{
		if(PHASEs()[ph].PLC&(1<<PlcIdx))
		{
			Color1=PlnSts[TP1].Colors[ph];
			Color2=PlnSts[TP2].Colors[ph];
			if((Color1==4 && Color2==1)==false && (Color1==1 && Color2==4)==false)
			{
				out+=MkLine(Color1,Y+(ystp*ph),X,X+(xstp*Tev));
			}
			if(Color1==4 && Color2==1)
			{
				if(PHASEs()[ph].V2R.length)
				{
					out+=MkLine(0,Y+(ystp*ph),X,X+(xstp*Tev));
					Tke=Tev-(Trv+PHASEs()[ph].V2R.length);
					if(Tke)
						out+=MkLine(Color1,Y+(ystp*ph),X,X+(xstp*Tke));
					for (j=0; j<PHASEs()[ph].V2R.length; j++)
					{
						out+=MkLine(PHASEs()[ph].V2R[j],Y+(ystp*ph),X+(xstp*(Tke+j)),X+(xstp*(Tke+j))+xstp);
					}
					out+=MkLine(Color2,Y+(ystp*ph),X+(xstp*(Tke+PHASEs()[ph].V2R.length)),X+(xstp*Tev));
				}
				else
				{
					out+=MkLine(Color1,Y+(ystp*ph),X,X+(xstp*Tke));
				}
			}
			if(Color1==1 && Color2==4)
			{
				if(PHASEs()[ph].R2V.length)
				{
					out+=MkLine(0,Y+(ystp*ph),X,X+(xstp*Tev));
					Tke=Tev-PHASEs()[ph].R2V.length;
					if(Tke)
						out+=MkLine(Color1,Y+(ystp*ph),X,X+(xstp*Tke));
					for (j=0; j<PHASEs()[ph].R2V.length; j++)
					{
						out+=MkLine(PHASEs()[ph].R2V[j],Y+(ystp*ph),X+(xstp*(Tke+j)),X+(xstp*(Tke+j))+xstp);
					}
				}
				else
				{
					out+=MkLine(Color1,Y+(ystp*ph),X,X+(xstp*Tev));
				}
			}
		}
	}
	return out;
}

function MkEvGrid(Tev,X,Y,xstp,height)
{
	var out="";
	for (pev=0;pev<=Tev;pev++)
	{
		out+="<line x1=\""+(X+(pev*xstp))+"\" x2=\""+(X+(pev*xstp))+"\" y1=\""+Y+"\" y2=\""+(Y+height)+"\" stroke=\"#000000\" stroke-width=\"1\"/>\n";
	}
	return out;
}

function GenArc(x,y,r,gs,ge,color)
{
	var out="";
	gs=450-gs;
	ge=450-ge;
	if(gs<ge){t=gs;gs=ge;ge=t;}
	var scx=0;
	var scy=0;
	var ecx=0;
	var ecy=0;
	while((gs-ge)>180)
	{
		scx=cosDeg(gs)*r;
		scx=Math.round(scx);
		scy=sinDeg(gs)*r;
		scy=Math.round(scy);
		ecx=cosDeg(gs-180)*r;
		ecx=Math.round(ecx);
		ecy=sinDeg(gs-180)*r;
		ecy=Math.round(ecy);
		out+="<path d=\"M"+x+" "+y+" L"+(scx+x)+" "+(y-scy)+" A"+r+" "+r+" 0 0 1 "+(ecx+x)+" "+(y-ecy)+" L"+x+" "+y+" z\" fill=\""+color+"\" stroke=\"color\" stroke-width=\"1\" />";
		gs-=180;
	}
	scx=cosDeg(gs)*r;
	scx=Math.round(scx);
	scy=sinDeg(gs)*r;
	scy=Math.round(scy);
	ecx=cosDeg(ge)*r;
	ecx=Math.round(ecx);
	ecy=sinDeg(ge)*r;
	ecy=Math.round(ecy);
	out+="<path d=\"M"+x+" "+y+" L"+(scx+x)+" "+(y-scy)+" A"+r+" "+r+" 0 0 1 "+(ecx+x)+" "+(y-ecy)+" L"+x+" "+y+" z\" fill=\""+color+"\" stroke=\"color\" stroke-width=\"1\" />";
	return out;
}

function sinDeg(num)
{
	num=Math.sin((num/180)*Math.PI);
	return Math.round(num*1000)/1000;
}

function cosDeg(num)
{
	num=Math.cos((num/180)*Math.PI);
	return Math.round(num*1000)/1000;
}

function chgColor(plc,nsts,ColIdx,posibles)
{
	var PlnStsCol=PLCs()[plc].Sts[nsts].Colors[ColIdx];
	var temp=posibles.indexOf(PlnStsCol);
	temp++;
	temp%=posibles.length;
	PlnStsCol=posibles[temp];
	ReDraw(-1);
}

function ChgColSts(nsts,j)
{
	var mask;
	if(true==ChkCFTSts(nsts,j))
	{
		if(GlobalParms().Model.indexOf("RT")!=-1)
		{
			mask = MSK_ORV;
		}
		else
		{
			switch(PHASEs()[PLCs()[PlcIdx].Phases[j]].Type)
			{
				case 0:
					mask = MSK_V_ALL;
				break;
				case 1:
					mask = MSK_P_ALL;
				break;
			}
		}
	}
	else
	{
		if(GlobalParms().Model.indexOf("RT")!=-1)
		{
			mask = MSK_OR;
		}
		else
		{
			switch(PHASEs()[PLCs()[PlcIdx].Phases[j]].Type)
			{
				case 0:
					mask = MSK_V_cft;
				break;
				case 1:
					mask = MSK_P_cft;
				break;
			}
		}
	}
	PLCs()[PlcIdx].Sts[nsts].Colors[j]=chgColor2(PLCs()[PlcIdx].Sts[nsts].Colors[j],mask);
	ReDraw(conf_sts);
}

function ChkCFTSts(nsts,ncolor)
{
	var color=4;
	var PhN=0;
	PhN=ncolor;//PLCs()[PlcIdx].Sts[nsts].Color[ncolor];
	if(!(color&0x30) && color&0x06 && PHASEs()[PhN].Sec.length)
	{
		for (var i = 0; i<PHASEs()[PhN].Sec.length; i++)
		{
			if(PHASEs()[PhN].Sec[i]!=null && PHASEs()[PhN].Sec[i]>0)
			{
				if((PLCs()[PlcIdx].Sts[nsts].Colors[i]&0x30)==0 && (PLCs()[PlcIdx].Sts[nsts].Colors[i]&0x06)!=0)
					return false;
			}
		}
	}
	return true;
}

function chgColor2(temp,posibles)
{
	temp=posibles.indexOf(temp);
	if(temp!=-1)
	{
		temp++;
		temp%=posibles.length;
	}
	else
		temp=0;
	return posibles[temp];
}
//-----------------------------------------------------
function color2svg(ColorCode,text)
{
	var vh=5;
	var out="";
	var vbgcolor="#b0b0b0";
	if((ColorCode&128) && ColorCode<255)
		vbgcolor="#404040";
		out+="<svg width=\"20\" height=\"";
		if(ColorCode>255)
			out+=(vh+800);
		else
			out+=(vh+20);
out+="\" xmlns=\"http://www.w3.org/2000/svg\">\n\
 <defs>\n\
  <marker id=\"se_marker_end_svg_11\" markerUnits=\"strokeWidth\" orient=\"auto\" viewBox=\"0 0 100 100\" markerWidth=\"5\" markerHeight=\"5\" refX=\"50\" refY=\"50\">\n\
   <path d=\"m100,50l-100,40l30,-40l-30,-40l100,40z\" fill=\"#FF0000\" stroke=\"#FF0000\" stroke-width=\"10\"/>\n\
  </marker>\n\
  <marker id=\"se_marker_end_svg_12\" markerUnits=\"strokeWidth\" orient=\"auto\" viewBox=\"0 0 100 100\" markerWidth=\"5\" markerHeight=\"5\" refX=\"50\" refY=\"50\">\n\
   <path d=\"m100,50l-100,40l30,-40l-30,-40l100,40z\" fill=\"#FFFF00\" stroke=\"#FFFF00\" stroke-width=\"10\"/>\n\
  </marker>\n\
  <marker id=\"se_marker_end_svg_13\" markerUnits=\"strokeWidth\" orient=\"auto\" viewBox=\"0 0 100 100\" markerWidth=\"5\" markerHeight=\"5\" refX=\"50\" refY=\"50\">\n\
   <path d=\"m100,50l-100,40l30,-40l-30,-40l100,40z\" fill=\"#00FF00\" stroke=\"#00FF00\" stroke-width=\"10\"/>\n\
  </marker>\n\
  <linearGradient x1=\"0\" y1=\"0.5\" x2=\"1\" y2=\"0.5\">\n\
   <stop offset=\"0\" stop-color=\"#808080\"/>\n\
   <stop offset=\"1\" stop-color=\"#000000\"/>\n\
  </linearGradient>\n\
 </defs>\n";
//out+="<rect fill=\""+vbgcolor+"\" stroke=\""+vbgcolor+"\" x=\"0\" y=\""+vh+"\" width=\"20\" height=\"20\" />\n";
if((ColorCode&7)==0 || ColorCode>255)
{
	out+="<line x1=\"2\" y1=\""+(vh+10)+"\" x2=\"20\" y2=\""+(vh+10)+"\" stroke=\"#000000\" fill=\"#404040\" stroke-width=\"4\"/>\n";
}
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x01 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_ATR\">\n\
   <line x1=\"1\" y1=\""+(vh+10)+"\" x2=\"20\" y2=\""+(vh+10)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"4\" stroke-dasharray=\"5,5\"/>\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x02 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_ATA\">\n\
   <line x1=\"1\" y1=\""+(vh+10)+"\" x2=\"20\" y2=\""+(vh+10)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"4\" stroke-dasharray=\"5,5\"/>\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x04 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_ATG\">\n\
   <line x1=\"1\" y1=\""+(vh+10)+"\" x2=\"20\" y2=\""+(vh+10)+"\" stroke=\"#00FF00\" fill=\"#404040\" stroke-width=\"4\" stroke-dasharray=\"5,5\"/>\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if((ColorCode&0x77)==0x04 || ColorCode>255)
out+="<g id=\"CC_G\" transform=\"scale(1, 1)\">\n\
   <line x1=\"1\" y1=\""+(vh+10)+"\" x2=\"20\" y2=\""+(vh+10)+"\" stroke=\"#00ff00\" fill=\"#404040\" stroke-width=\"4\"/>\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if((ColorCode&0x77)==0x02 || ColorCode>255)
out+="<g id=\"CC_A\">\n\
   <line x1=\"1\" y1=\""+(vh+10)+"\" x2=\"20\" y2=\""+(vh+10)+"\" stroke=\"#ffff00\" fill=\"#404040\" stroke-width=\"4\"/>\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if((ColorCode&0x77)==0x01 || ColorCode>255)
out+="<g id=\"CC_R\">\n\
   <line x1=\"1\" y1=\""+(vh+10)+"\" x2=\"20\" y2=\""+(vh+10)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"4\"/>\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if((ColorCode&0x77)==0x06 || ColorCode>255)
out+="<g id=\"CC_AG\">\n\
   <line x1=\"1\" y1=\""+(vh+5)+"\" x2=\"20\" y2=\""+(vh+5)+"\" stroke=\"#FFff00\" fill=\"#404040\" stroke-width=\"4\"/>\n\
   <line x1=\"1\" y1=\""+(vh+15)+"\" x2=\"20\" y2=\""+(vh+15)+"\" stroke=\"#00ff00\" fill=\"#404040\" stroke-width=\"4\"/>\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if((ColorCode&0x77)==0x03 || ColorCode>255)
out+="<g id=\"CC_RA\">\n\
   <line x1=\"1\" y1=\""+(vh+5)+"\" x2=\"20\" y2=\""+(vh+5)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"4\"/>\n\
   <line x1=\"1\" y1=\""+(vh+15)+"\" x2=\"20\" y2=\""+(vh+15)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"4\"/>\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x06 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_ATAG\">\n\
   <line x1=\"1\" y1=\""+(vh+5)+"\" x2=\"20\" y2=\""+(vh+5)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"4\" stroke-dasharray=\"5,5\"/>\n\
   <line x1=\"1\" y1=\""+(vh+15)+"\" x2=\"20\" y2=\""+(vh+15)+"\" stroke=\"#00ff00\" fill=\"#404040\" stroke-width=\"4\" />\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x03 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_ATRA\">\n\
   <line x1=\"1\" y1=\""+(vh+15)+"\" x2=\"20\" y2=\""+(vh+15)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"4\" stroke-dasharray=\"5,5\"/>\n\
   <line x1=\"1\" y1=\""+(vh+5)+"\" x2=\"20\" y2=\""+(vh+5)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"4\" />\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x41 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_DTR\">\n\
   <line x1=\"1\" y1=\""+(vh+10)+"\" x2=\"20\" y2=\""+(vh+10)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"4\" stroke-dasharray=\"5,5\" />\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x42 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_DTA\">\n\
   <line x1=\"1\" y1=\""+(vh+10)+"\" x2=\"20\" y2=\""+(vh+10)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"4\" stroke-dasharray=\"5,5\" />\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x44 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_DTG\">\n\
   <line x1=\"1\" y1=\""+(vh+10)+"\" x2=\"20\" y2=\""+(vh+10)+"\" stroke=\"#00FF00\" fill=\"#404040\" stroke-width=\"4\" stroke-dasharray=\"5,5\" />\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x46 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_DTAG\">\n\
   <line x1=\"1\" y1=\""+(vh+5)+"\" x2=\"20\" y2=\""+(vh+5)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"4\" stroke-dasharray=\"5,5\" />\n\
   <line x1=\"1\" y1=\""+(vh+15)+"\" x2=\"20\" y2=\""+(vh+15)+"\" stroke=\"#00ff00\" fill=\"#404040\" stroke-width=\"4\" />\n\
  </g>\n";
if(ColorCode>255)vh+=50;
if(((ColorCode&0x47)==0x43 && ColorCode&0x30) || ColorCode>255)
out+="<g id=\"CC_DTRA\">\n\
   <line x1=\"1\" y1=\""+(vh+5)+"\" x2=\"20\" y2=\""+(vh+5)+"\" stroke=\"#FF0000\" fill=\"#404040\" stroke-width=\"4\" />\n\
   <line x1=\"1\" y1=\""+(vh+15)+"\" x2=\"20\" y2=\""+(vh+15)+"\" stroke=\"#FFFF00\" fill=\"#404040\" stroke-width=\"4\" stroke-dasharray=\"5,5\" />\n\
  </g>\n";
if(text)
	out+="<text fill=\"#000000\" stroke-width=\"0\" x=\"13\" y=\"16\" font-size=\"12\" font-family=\"Fantasy\" text-anchor=\"middle\" font-weight=\"bold\">"+text+"</text>\n";
out+="</svg>\n";
if(ColorCode==255)
	out="<font size=\"1\" face=\"arial\">"+Str_no_Change+"<br /></font>\n";
return out;
}

function ShwLevel(value,min,max)
{
	var out="";
	value=Math.round((255/(max-min))*(value-min));
	var color="";
	if(value>128)
		color="rgb("+(255-value)+",255, 0)";
	else
		color="rgb(255,"+(value)+", 0)";
	out+='<svg width="52" height="22" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">\n';
	out+='<g>\n';// transform="scale(0.20 0.5)"
	out+='<rect fill="null"      height="10" width="50" y="1" x="1" rx="1" ry="1" stroke="#000000" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="null" />\n';
	out+='<rect fill="'+color+'" height="10" width="'+(Math.round((45/255)*value)+5)+'" y="1" x="1" rx="1" ry="1" stroke="#000000" stroke-width="2" />\n';
	out+='</g>\n'; //'+color+'
	out+='</svg>\n';
	return out;
}

function ShwSignal(color)
{
	var out="";
	out+='<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">\n';
	//out+='<g>\n';
	//out+='<path fill="'+color+'" stroke="#000" stroke-width="0" d="m12,5c-3.8,0 -7.3,1.5125 -10,3.8125l1.3125,1.5c2.4,-2 5.3875,-3.3125 8.6875,-3.3125c3.3,0 6.29375,1.3125 8.59375,3.3125l1.40625,-1.5c-2.7,-2.3 -6.2,-3.8125 -10,-3.8125zm0,4c-2.8,0 -5.4125,1.1125 -7.3125,2.8125l1.3125,1.5c1.6,-1.4 3.7,-2.3125 6,-2.3125c2.3,0 4.4,0.9125 6,2.3125l1.3125,-1.5c-1.9,-1.7 -4.5125,-2.8125 -7.3125,-2.8125zm0,4c-1.8,0 -3.3875,0.7125 -4.6875,1.8125l1.28125,1.5c0.9,-0.8 2.0125,-1.3125 3.3125,-1.3125c1.3,0 2.38125,0.5125 3.28125,1.3125l1.3125,-1.5c-1.1,-1.1 -2.7,-1.8125 -4.5,-1.8125zm0,4c-0.8,0 -1.5,0.3125 -2,0.8125l2,2.1875l2,-2.1875c-0.5,-0.5 -1.2,-0.8125 -2,-0.8125z" />\n';
	//out+='</g>\n';
	if(color>5)
	{
		color="#A00";
		out+='<path fill="'+color+'" stroke="'+color+'" d="M 16.84375 0.03125 C 16.29375 0.03125 15.7625 0.2375 15.3125 0.6875 L 11.90625 4.09375 L 10.90625 3.09375 L 9.5 4.5 L 11.8125 6.8125 L 9.09375 9.5 L 10.5 10.90625 L 13.1875 8.1875 L 15.8125 10.8125 L 13.09375 13.5 L 14.5 14.90625 L 17.1875 12.1875 L 19.5 14.5 L 20.90625 13.09375 L 19.90625 12.09375 L 23.3125 8.6875 C 24.2125 7.7875 24.2125 6.49375 23.3125 5.59375 L 21.5625 3.84375 L 23.90625 1.5 L 22.5 0.09375 L 20.15625 2.4375 L 18.40625 0.6875 C 17.95625 0.2375 17.39375 0.03125 16.84375 0.03125 z M 4.5 9.5 L 3.09375 10.90625 L 4.09375 11.90625 L 0.6875 15.3125 C -0.2125 16.2125 -0.2125 17.50625 0.6875 18.40625 L 2.4375 20.15625 L 0.09375 22.5 L 1.5 23.90625 L 3.84375 21.5625 L 5.59375 23.3125 C 6.49375 24.2125 7.7875 24.2125 8.6875 23.3125 L 12.09375 19.90625 L 13.09375 20.90625 L 14.5 19.5 L 4.5 9.5 z"/>\n';
	}
	else
	{
		color="#0A0";
		out+='<path fill="'+color+'" stroke="'+color+'" d="M 20.59375 2 L 17.09375 5.5 L 15.1875 3.59375 C 14.3875 2.79375 13.20625 2.79375 12.40625 3.59375 L 9.90625 6.09375 L 8.90625 5.09375 L 7.5 6.5 L 17.5 16.5 L 18.90625 15.09375 L 17.90625 14.09375 L 20.40625 11.59375 C 21.20625 10.79375 21.20625 9.6125 20.40625 8.8125 L 18.5 6.90625 L 22 3.40625 L 20.59375 2 z M 6.40625 7.59375 L 5 9 L 6 10 L 3.59375 12.40625 C 2.79375 13.20625 2.79375 14.3875 3.59375 15.1875 L 5.5 17.09375 L 2 20.59375 L 3.40625 22 L 6.90625 18.5 L 8.8125 20.40625 C 9.6125 21.20625 10.79375 21.20625 11.59375 20.40625 L 14 18 L 15 19 L 16.40625 17.59375 L 6.40625 7.59375 z" />\n';
	}
	out+='</svg>\n';
	return out;
}

function ShwGPSSignal(lvl)
{
	var out="";
	var colorB="";
	var colorS="";
	if(lvl&1)
	{
		colorB="rgb(64,64,200)";
	}
	else
	{
		colorB="rgb(64,64,64)";
	}
	if(lvl&4)
	{
		if(lvl&2)
		{
			colorS="rgb(0,255,0)";
		}
		else
		{
			colorS="rgb(255,0,0)";
		}
	}
	else
	{
		colorS="rgb(64,64,64)";
	}
	out+='<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">\n';
	out+='<g id="svg_2" transform="translate(0 253.7) scale(0.05 -0.05)">\n';
    out+='<path fill="'+colorB+'" stroke="'+colorB+'" d="m256.04447,5039.14628c-4.21382,-2.2113 -42.31852,-38.76904 -84.40926,-81.30584c-71.34073,-71.55901 -76.87374,-77.76585 -79.31282,-87.51268c-1.77474,-7.97209 -1.77474,-13.29631 0,-21.05012c2.43908,-9.96512 8.63643,-16.61801 98.14214,-106.342l95.49426,-95.93083l43.86548,0l44.09326,0l-12.63197,-13.74237c-7.08947,-7.75381 -14.17893,-17.06407 -15.95367,-20.82234l-3.32171,-6.87118l-29.24049,0c-22.15102,0 -33.6726,-1.1104 -48.74364,-4.87816c-32.12563,-7.75381 -64.9156,-24.81788 -87.2944,-45.41245l-9.52855,-8.85472l56.71573,-56.71573l56.71573,-56.93402l-5.09644,-9.74683c-6.20684,-11.95814 -6.87118,-34.78299 -1.32868,-45.19416c13.51459,-25.25445 44.08377,-35.44733 69.11993,-23.26142l10.63895,5.09644l50.95495,-50.73666l50.73666,-50.73666l7.97209,8.86421c20.38577,23.04314 36.55773,53.39403 44.97588,84.19098c3.76776,13.51459 5.09644,25.03616 5.5425,49.40798l0.66434,31.67957l9.52855,6.20684c5.31473,3.54948 14.17893,10.85723 19.72144,16.61801c5.31473,5.5425 10.63895,10.19289 11.52157,10.19289c0.88262,0 1.77474,-20.158 1.77474,-44.97588l0,-44.7576l100.35344,-100.15414c54.94099,-55.16877 103.0203,-101.24556 106.342,-102.35595c7.98158,-3.10342 23.92576,-3.10342 31.90735,-0.21828c9.08249,3.53999 159.73603,154.19353 164.83247,165.05076c4.87816,10.41117 5.31473,18.16498 1.54697,30.79695c-2.2113,7.75381 -17.28236,23.92576 -102.35595,109.44542l-99.69859,100.13516l-46.52285,0l-46.52285,0l45.64022,46.08628c56.05139,56.05139 58.2627,59.81916 58.2627,95.70306c0,35.44733 -3.76776,41.65418 -54.72271,92.16307c-48.29758,47.85153 -53.17574,50.50889 -88.17702,50.73666c-19.72144,0 -22.15102,-0.44606 -36.55773,-7.53552c-13.29631,-6.42513 -22.15102,-14.17893 -60.26521,-51.83757l-44.96639,-44.52982l0,46.52285l0,46.52285l-92.38135,92.16307c-62.70429,62.47652 -95.27598,93.49175 -100.80899,95.71255c-11.07551,4.65039 -27.69353,4.20433 -37.22207,-0.88262l0,0zm175.02536,-254.78423l0,-40.98984l-19.49366,-19.49366l-19.27538,-19.27538l-42.09074,0l-42.09074,0l-77.53808,77.53808l-77.53808,77.53808l60.92955,60.92955l60.92955,60.92955l77.98413,-77.98413l78.20242,-78.20242l0,-40.98984l-0.01898,0l-0.00001,0zm387.70936,-346.71953l83.08058,-83.08058l-60.92955,-60.92955l-60.92955,-60.92955l-83.52663,83.52663l-83.74492,83.74492l0,42.09074l0,42.10023l18.16498,18.16498l18.39275,18.39275l43.20114,0l43.20114,0l83.09007,-83.08058l0,0.00001z"/>\n';
    out+='<path fill="'+colorS+'" stroke="'+colorS+'" d="m59.7507,4433.4287c-5.5425,-2.43908 -8.19987,-5.97907 -11.73985,-15.95367c-7.75381,-20.158 -11.30329,-37.88641 -12.85025,-62.03046c-6.20684,-102.35595 62.03046,-196.06599 162.62117,-222.64911c21.71446,-5.76079 66.90862,-7.98158 87.94925,-4.4321c25.48222,4.4321 49.40798,13.06853 54.27665,19.49366c6.20684,7.75381 5.76079,16.61801 -1.32868,25.03616c-5.09644,6.20684 -6.87118,6.87118 -14.84328,5.97907c-5.09644,-0.44606 -17.06407,-3.10342 -26.8109,-5.97907c-23.04314,-6.42513 -63.8052,-7.08947 -85.0736,-1.54697c-36.11168,9.74683 -58.70876,22.59708 -84.40926,48.0793c-21.05012,21.05012 -33.6726,41.4264 -43.6472,69.78427c-5.5425,16.39024 -5.97907,20.158 -6.20684,53.16626c0,32.57169 0.44606,37.00379 6.20684,54.72271c6.42513,20.37629 5.97907,25.91879 -1.99302,33.23603c-6.19735,5.31473 -14.39722,6.64341 -22.15102,3.09393l0,0z"/>\n';
    out+='<path fill="'+colorS+'" stroke="'+colorS+'" d="m135.07748,4405.51689c-20.38577,-8.41815 -27.91181,-68.45559 -13.51459,-108.55331c14.39722,-40.54378 47.18719,-72.00506 88.84136,-85.51966c30.57866,-9.96512 79.31282,-7.08947 96.59517,5.5425c14.17893,10.19289 9.74683,31.46129 -7.30775,35.89339c-2.65736,0.66434 -11.30329,-0.66434 -19.27538,-2.87565c-55.16877,-15.50761 -108.5628,15.28933 -122.96002,70.67638c-4.21382,16.17196 -4.21382,29.68655 0,44.97588c6.64341,23.92576 6.64341,25.25445 -0.21828,32.78997c-7.08947,7.51654 -15.07105,10.17391 -22.16052,7.07048z"/>\n';
    out+='<path fill="'+colorS+'" stroke="'+colorS+'" d="m209.52162,4377.3773c-13.29631,-4.87816 -20.38577,-25.48222 -15.7259,-46.08628c5.76079,-25.91879 26.8109,-44.52982 53.17574,-46.9689c21.71446,-1.99302 36.55773,4.87816 39.2151,18.16498c2.87565,15.7259 -11.52157,27.91181 -27.47524,23.26142c-8.41815,-2.2113 -15.28933,-0.21828 -21.2684,6.42513c-3.53999,3.76776 -3.98605,6.64341 -2.65736,16.8363c1.54697,14.39722 -1.77474,23.26142 -10.85723,27.24747c-6.20684,2.89463 -9.09198,3.11291 -14.40671,1.11989l0,0z"/>\n';
	out+='</g>\n';
	out+='</svg>\n';
	return out;
}

function ShwLamp(color)
{
	if(!color)
		color="#0f0"
	var out="";
	out+='<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" >\n';
	out+='<g>\n';
	out+='<path fill="'+color+'" stroke="#000" stroke-width="0" d="m16,4c-4.95852,0 -9,4.04148 -9,9c0,2.85634 1.43757,4.87591 2.75,6.3125c0.65622,0.71829 1.30359,1.33178 1.71875,1.8125c0.41516,0.48072 0.53125,0.79121 0.53125,0.875a1.0001,1.0001 0 0 0 0,0.09375l0,2.90625c0,1.09306 0.90694,2 2,2l1,1l2,0l1,-1c1.09306,0 2,-0.90694 2,-2l0,-2.6875a1.0001,1.0001 0 0 0 0,-0.15625c0,-0.13605 0.14786,-0.49964 0.5625,-1c0.41464,-0.50036 1.03395,-1.114 1.6875,-1.84375c1.30709,-1.4595 2.75,-3.4783 2.75,-6.3125c0,-4.95852 -4.04148,-9 -9,-9zm0,2c3.87748,0 7,3.12252 7,7c0,2.1678 -1.05709,3.668 -2.25,5c-0.59645,0.666 -1.22714,1.24405 -1.75,1.875c-0.28184,0.3401 -0.53105,0.71335 -0.71875,1.125l-4.5,0c-0.19677,-0.44646 -0.49986,-0.82549 -0.8125,-1.1875c-0.52234,-0.60484 -1.12497,-1.19379 -1.71875,-1.84375c-1.18757,-1.29991 -2.25,-2.77209 -2.25,-4.96875c0,-3.87748 3.12252,-7 7,-7zm-2.03125,3.53125l-1.4375,1.4375l2.03125,2.03125l-2.03125,2.03125l1.4375,1.4375l2.03125,-2.03125l2.03125,2.03125l1.4375,-1.4375l-2.03125,-2.03125l2.03125,-2.03125l-1.4375,-1.4375l-2.03125,2.03125l-2.03125,-2.03125zm0.03125,13.46875l4,0l0,2l-4,0l0,-2z" />\n';
	out+='</g>\n';
	out+='</svg>\n';
	return out;
}

function ShwSwch(color)
{
	if(!color)
		color="#0f0"
	var out="";
	out+='<svg width="30" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">\n';
	out+='<g transform="translate(0 -5) scale(0.1 0.1)">\n';
	out+='<path fill="'+color+'" d="m298,147.56208l-59.517,0c-3.323,-9.592 -12.442,-16.5 -23.151,-16.5c-13.51,0 -24.5,10.99 -24.5,24.5c0,13.51 10.99,24.5 24.5,24.5c10.709,0 19.828,-6.908 23.151,-16.5l59.517,0l0,-16zm-74.168,8c0,4.687 -3.814,8.5 -8.5,8.5c-4.687,0 -8.5,-3.813 -8.5,-8.5c0,-4.686 3.813,-8.5 8.5,-8.5c4.686,0 8.5,3.813 8.5,8.5z" />\n';
	out+='<path fill="'+color+'" d="m171.014,56.56608l-76.967,76.967c-3.238,-1.582 -6.873,-2.472 -10.713,-2.472c-10.709,0 -19.828,6.908 -23.151,16.5l-60.183,0l0,16l60.183,0c3.323,9.592 12.442,16.5 23.151,16.5c13.51,0 24.5,-10.99 24.5,-24.5c0,-3.841 -0.891,-7.476 -2.472,-10.715l76.966,-76.966l-11.314,-11.314zm-96.18,98.996c0,-4.686 3.813,-8.5 8.5,-8.5s8.5,3.814 8.5,8.5c0,4.687 -3.813,8.5 -8.5,8.5s-8.5,-3.814 -8.5,-8.5z" />\n';
	out+='</g>\n';
	out+='</svg>\n';
	return out;
}
function ShwMov(sts,typ)
{
	var out="";
	typ=parseInt('0'+typ);
	switch(typ)
	{
		default: //[0,"Vehicular",2,"Giro",3,"Ciclista"];
		{
			out+="<svg width=\"25\" height=\"50\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n"
			out+="<rect x=\"1\" y=\"1\" width=\"23\" height=\"48\" fill=\"#606060\" stroke-width=\"0\" stroke=\"black\" rx=\"3\" ry=\"3\" />\n"
			color="\"#600\">\n";
			if (sts&1)
			{
				color="\"#F00\">\n";
				if (sts&16)
					color+='<animate attributeType="XML" attributeName="fill" values="#600;#F00;#F00;#600" dur="1s" repeatCount="indefinite"/>\n';
			}
			out+="<circle cx=\"13\" cy=\"10\" r=\"6\" stroke=\"black\" stroke-width=\"1\" fill="+color+"</circle>\n";
			color="\"#660\">\n";
			if (sts&2)
			{
				color="\"#FF0\">\n";
				if (sts&16)
					color+='<animate attributeType="XML" attributeName="fill" values="#660;#FF0;#FF0;#660" dur="1s" repeatCount="indefinite"/>\n';
			}
			out+="<circle cx=\"13\" cy=\"25\" r=\"6\" stroke=\"black\" stroke-width=\"1\" fill="+color+"</circle>\n";
			color="\"#060\">\n";
			if (sts&4)
			{
				color="\"#0F0\">\n";
				if (sts&16)
					color+='<animate attributeType="XML" attributeName="fill" values="#060;#0F0;#0F0;#060" dur="1s" repeatCount="indefinite"/>\n';
			}
			out+="<circle cx=\"13\" cy=\"40\" r=\"6\" stroke=\"black\" stroke-width=\"1\" fill="+color+"</circle>\n";
			out+="</svg>\n"
		}
		break;
		case 1:	//"Peatonal"
		{
			out+='<svg width="25" height="50" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">\n';
			out+='<rect x="1" y="1" rx="3" ry="3" width="23" height="48" fill="#666" stroke-width="0" stroke="black" />\n';
			out+='<circle cx="12.5" cy="12.5" fill="#400" id="BgRed" r="8" stroke=\"black\" stroke-width="1"/>\n';
			out+='<circle cx="12.5" cy="37.5" fill="#040" id="BgGreen" r="8" stroke=\"black\" stroke-width="1"/>\n';
			color='"#600">\n';
			if (sts&1)
			{
				color='"#F00">\n';
				if (sts&16)
					color+='<animate attributeType="XML" attributeName="fill" values="#600;#F00;#F00;#600" dur="1s" repeatCount="indefinite"/>\n';
			}
			out+='<g id="RedBody" transform="translate(2.5 2.5) scale(0.2 0.2)">\n';
			out+='<circle cx="50" cy="20" r="5.41039" fill='+color+'</circle>\n';
			out+='<path d="m49.95485,27.84974c-0.79035,0.0127 -6.0781,0.0311 -6.42786,0.0604c-4.15725,0.34851 -3.48717,20.70199 -3.48717,23.61009c3.42693,1.3526 4.09119,-3.53407 4.67673,-17.15366l0.0966,17.73335l4.97563,0l0.60686,0l4.97563,0l0.0966,-17.73335c0.58554,13.61959 1.2498,18.50626 4.67673,17.15366c0,-2.9081 0.67008,-23.26158 -3.48717,-23.61009c-0.34976,-0.0293 -5.63752,-0.0477 -6.42787,-0.0604c-0.0181,-0.00029 -0.0895,0.00029 -0.10264,0c-0.007,0.0002 -0.0606,-0.00019 -0.0694,0c0,0 -0.10266,0 -0.10266,0l-0.00001,0z" fill='+color+'</path>\n';
			out+='<path d="m44.79353,53.79066l-1.9202,31.2094c6.81754,-0.47252 6.82668,2.71272 6.8264,-23.96636c0.12179,-0.0131 0.26261,-0.0368 0.3925,-0.0543c0.13102,0.0177 0.27268,0.0413 0.39551,0.0543c-0.00029,26.67908 0.006,23.49384 6.82337,23.96636l-1.91719,-31.2094l-4.60728,0.003l-1.38883,0l-4.60428,-0.003z" fill='+color+'</path>\n';
			out+='</g>\n';
			color='"#060">\n';
			if (sts&4)
			{
				color='"#0F0">\n';
				if (sts&16)
					color+='<animate attributeType="XML" attributeName="fill" values="#060;#0F0;#0F0;#060" dur="1s" repeatCount="indefinite"/>\n';
			}
			out+='<g id="GreenBody" transform="translate(2.5 7) scale(0.2 0.2)">\n';
			out+='<circle cx="-5216.84849" cy="-970.38143" r="56" transform="matrix(0.0997151 0 0 0.0997151 567.948 217.346)"  fill='+color+'</circle>\n';
			out+='<path d="m31.19658,152.69232c15.12346,-23.59924 13.69421,-24.26401 19.34473,-24.4302c3.2906,0.0997 3.39031,0.99715 8.97436,5.38461c6.88034,5.05224 6.38177,5.11871 6.28205,10.66952c-0.0332,6.68091 0.4321,6.18234 -4.88604,8.67521l0,-11.2678l-4.68661,-4.18804l0,15.8547l-11.16809,-0.0997l-0.0997,-12.5641c-9.17378,14.15954 -8.57549,13.36182 -13.76068,11.96581l-0.00002,-0.00001z" fill='+color+'</path>\n';
			out+='<path d="m45.25641,154.98577l10.86895,0c0,2.49287 0.79772,2.29344 6.58119,13.16239c6.08262,11.20133 6.18234,10.43685 2.69231,16.85185l-15.05698,-27.02279c-14.25926,27.58784 -12.46439,26.75688 -20.34188,26.22507l7.87749,-14.75784c6.74739,-12.19848 7.11301,-12.23171 7.37892,-14.45868z" fill='+color+'</path>\n';
			out+='</g>\n';

			out+='</svg>\n';
		}
		break;
	}
	//alert(out);
	return out;
}
//----------------------------------------------------------------------------------------------
function AddIntReg()
{
	if(!GParms)
		return;
	var idx=0;
	IntReg.length=CIntReg;
	for(var i=0;i<(GParms.N_Actives_Inputs+16);i++)
	{
		idx=IntReg.length;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="in["+i+"].in";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="in["+i+"].val";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="in["+i+"].count";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="in["+i+"].time";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="in["+i+"].rst";
		IntReg[idx].Valor=null;
	}
	for(var i=0;i<(GParms.N_Actives_Outputs+4);i++)
	{
		idx=IntReg.length;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="out["+i+"].val";
		IntReg[idx].Valor=null;
	}
	for(var i=0;i<GParms.N_Actives_Controlers;i++)
	{
		idx=IntReg.length;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="PLC["+i+"].flags";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="PLC["+i+"].plan";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Bit";
		IntReg[idx].Nombre="PLC["+i+"].lamp";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Bit";
		IntReg[idx].Nombre="PLC["+i+"].service";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Str";
		IntReg[idx].Nombre="PLC["+i+"].name";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Byt";
		IntReg[idx].Nombre="PLC["+i+"].phases";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Int";
		IntReg[idx].Nombre="PLC["+i+"].error";
		IntReg[idx].Valor=null;
		idx++;
		IntReg[idx]= new Object();
		IntReg[idx].Type="Bit";
		IntReg[idx].Nombre="PLC["+i+"].Emergency";
		IntReg[idx].Valor=null;
	}
}

function CheckSpecialCharacters(data)
{
   var iChars = " !@#$%^&*()+=-[]\\\';,/{}|\":<>?~";
   for (var i = 0; i < data.length; i++)
   {
  	if (iChars.indexOf(data.charAt(i)) != -1)
		{
  	  alert ("Your string has special characters. \nThese are not allowed.");
	 return true;
  	}
  }
  return false;
}

function ChekInst(linea)
{
  for(var i=0; i<insttable2.length; i++)
  {
    if (linea.indexOf(insttable2[i].Valor)!=-1)
			return true;
  }
  return false;
}

function GetVRT(ph)
{
	return PHASEs()[ph].V2R.length;
}

function GetRVT(ph)
{
	return PHASEs()[ph].R2V.length;
}

function GetEvT(PlnSts,sts1,sts2)
{
	if(sts1<0 || sts2<0)return 0;
	var tiempovr=0;
	var tiemporv=0;
	var tiempot=0;
	if(PlnSts.length>sts1 && PlnSts.length>sts2)
	{
		for(var i=0;i<PlnSts[sts1].Colors.length;i++)
		{
			if(PlnSts[sts1].Colors[i]!=PlnSts[sts2].Colors[i])
			{
				if(PlnSts[sts1].Colors[i]==4 && PlnSts[sts2].Colors[i]==1)
				{
					tiempot=GetVRT(i);
					if(tiempovr<tiempot)
						tiempovr=tiempot;
				}
				if(PlnSts[sts1].Colors[i]==1 && PlnSts[sts2].Colors[i]==4)
				{
					tiempot=GetRVT(i);
					if(tiemporv<tiempot)
						tiemporv=tiempot;
				}
			}
		}
		return tiempovr+tiemporv;
	}
	else
		return 0;
}

function GetTmin2(PLC,sts1,sts2)
{
	if(sts1<0 || sts2<0)return 0;
	var ev=0;
	var evt=0;
	var tiempo=0;
	var tiempot=0;
	if(PLC.Sts.length>sts1 && PLC.Sts.length>sts2)
	{
		RemoveUnusedItem(PLC.Sts[sts1].Colors);
		for(var i=0;i<PLC.Sts[sts1].Colors.length;i++)
		{
			if(//
			(PLC.Sts[sts1].Colors[i]!=0) && // no estaba apagado
			((PLC.Sts[sts1].Colors[i]&0xF2)==0) && // no es titilante y no tiene amarillo el estado donde estaba
			((PLC.Sts[sts2].Colors[i]&0xF2)==0) && // no es titilante y no tiene amarillo el estado donde va
			(PLC.Sts[sts1].Colors[i]!=PLC.Sts[sts2].Colors[i]))	//los colores son diferentes
			{
				if(PLC.Sts[sts1].Colors[i]==1)
				{
					tiempot=PHASEs()[i].MiGT;
					evt=PHASEs()[i].R2V.length
				}
				else
				{
					tiempot=PHASEs()[i].MiRT;
					evt=PHASEs()[i].V2R.length
				}
				if(tiempo<tiempot)
					tiempo=tiempot;
				if(ev<evt)
					ev=evt;
			}
		}
		return tiempo;
	}
	return 0;
}

function GetTmin(PLC,sts)
{
	if(sts<0)return 0;
	var tiempo=0;
	var tiempot=0;
	var ph=0;
	if(PLC.Sts.length>sts)
	{
		for(var i=0;i<PLC.Sts[sts].Colors.length;i++)
		{
			ph=i;//PLC.Phases[i];
			if(PLC.Sts[sts].Colors[i]==4)
				tiempot=PHASEs()[ph].MiGT;
			if(PLC.Sts[sts].Colors[i]==1)
				tiempot=PHASEs()[ph].MiRT;
			if(tiempo<tiempot)
				tiempo=tiempot;
		}
		return tiempo;
	}
	else
		return 0;
}

function SubSts(Nsts)
{
	PLCs()[PlcIdx].Sts.splice(Nsts,1);
	ModParm("pPLCs.Sts");
}

function AddSts()
{
	iplc = PLCs()[PlcIdx];
	var Nsts=iplc.Sts.length
	iplc.Sts[Nsts]=new Object();
	iplc.Sts[Nsts].Name=""+String.fromCharCode(65+Nsts);
	iplc.Sts[Nsts].Colors= new Array();
	for (var j = 0; j<iplc.Phases.length; j++)
		iplc.Sts[Nsts].Colors[j]=1;
	ModParm("pPLCs.Sts");
}

function RcvPlns(Dados)
{
	var Code = Dados.responseText;
	var j=0;
	var i=0;
	iplc=PLCs()[PlcIdx];
	if(!iplc.Plans)
		iplc.Plans = new Array();
	Plans=iplc.Plans;
	Code=Code.split('\n\n');
	PlnIdx=0;
	while(PlnIdx<Code.length)
	{
		Code[PlnIdx]=RemoveUnuseChar(Code[PlnIdx]);
		Code[PlnIdx]=Code[PlnIdx].trim();
		//Plans[PlnIdx]=new Object();
		//RcvFile(Plans[PlnIdx], Code[PlnIdx]);
		if(Code[PlnIdx]=="")
		{
			Code.splice(PlnIdx,1);
		}
		else
		{
			Plans[PlnIdx]=new Object();
			Code[PlnIdx]=Code[PlnIdx].split('\n');
			//----------------------------------------------------
			j=0;
			while(j<Code[PlnIdx].length)
			{
				Code[PlnIdx][j]=RemoveUnuseChar(Code[PlnIdx][j]);
				Code[PlnIdx][j]=Code[PlnIdx][j].trim();
				if(Code[PlnIdx][j]=="")
				{
					Code[PlnIdx].splice(j,1);
				}
				else
				{
					Code[PlnIdx][j]=Code[PlnIdx][j].split(':');
					j++;
				}
			}
			//----------------------------------------------------
			for(j=0;j<Code[PlnIdx].length;j++)
			{
				switch(Code[PlnIdx][j][0])
				{
					case "PLNTYP":
						Plans[PlnIdx]=myNewPlan(parseInt("0"+Code[PlnIdx][j][1]));
					break;
					case "PHC":
						Plans[PlnIdx].EV=parseInt("0"+Code[PlnIdx][j][1]);
					break;
					case "LCLSYCTCI":	// tiempo de ciclo
						if(Plans[PlnIdx].Typ==1)
							Plans[PlnIdx].TC=parseInt("0"+Code[PlnIdx][j][1]);
					break;
					case "LCLSYCTOF":
						if(Plans[PlnIdx].Typ==1)
							Plans[PlnIdx].OF=parseInt("0"+Code[PlnIdx][j][1]);
					break;
					case "LCLASYDEMTYP":
						Dados=ConvToInt(Code[PlnIdx][j][1].split(','));
						for(i=0;i<Dados.length;i++)
						{
							if(!Plans[PlnIdx].Dem[i])
								Plans[PlnIdx].Dem[i]= new Object();
							Plans[PlnIdx].Dem[i].Typ=Dados[i];
						}
					break;
					case "LCLSYCDEMNUM":
						Dados=ConvToInt(Code[PlnIdx][j][1].split(','));
						for(i=0;i<Dados.length;i++)
						{
							if(!Plans[PlnIdx].Dem[i])
								Plans[PlnIdx].Dem[i]= new Object();
							Plans[PlnIdx].Dem[i].Num=Dados[i];
						}
					break;
					case "LCLASYDEXSTP":
						Dados=Code[PlnIdx][j][1].split(',');
						for(i=0;i<Dados.length;i++)
						{
							if(!Plans[PlnIdx].Dem[i])
								Plans[PlnIdx].Dem[i]= new Object();
							Plans[PlnIdx].Dem[i].Dat=ConvToInt(Dados[i].split(' '));
						}
					break;
					case "LCLLGCSTP":
						Dados=Code[PlnIdx][j][1].split(',');
						Plans[PlnIdx].Logic=new Array()
						Plans[PlnIdx].Logic=Dados.slice()
					break;
					case "LGC":
						i=Plans[PlnIdx].LGCs.length;
						iplc.LGCs[i]=new Object();
						iplc.LGCs[i].Name=Code[PlnIdx][j][1];
						iplc.LGCs[i].Code=Code[PlnIdx][j][2];
					break;
					case "LCLASYTNOSTP":
					case "LCLSYCTSTSTP":	//vector de tiempos de estados
						Dados=ConvToInt(Code[PlnIdx][j][1].split(','));
						Plans[PlnIdx].TP=new Array()
						Plans[PlnIdx].TP=Dados.slice()
					break;
					case "PLNDIMTYP":
						Plans[PlnIdx].DimTyp=parseInt("0"+Code[PlnIdx][j][1]);
					break;
					case "PLNDIM":
						Dados=ConvToInt(Code[PlnIdx][j][1].split(','));
						Plans[PlnIdx].Dim=new Array()
						Plans[PlnIdx].Dim=Dados.slice()
					break;
				}
			}
			PlnIdx++;
		}
	}
	PlnIdx=0;
}
function SendPlans(Plans)
{
	UpMode=10;
	UpPath="/"+PlcIdx;
	UpType="txt";
	UpData="";
	out="";
	if(!Plans)
		return "";
	for(var i=0;i<Plans.length;i++)
	{
		UpData+="PLNTYP:"+Plans[i].Typ+"\n";
		UpData+="PHC:"+Plans[i].EV+"\n";
		UpData+="PLNDIMTYP:"+Plans[i].DimTyp+"\n";
		UpData+="PLNDIM:"+Plans[i].Dim.toString()+"\n";
		if(Plans[i].Dem && Plans[i].Dem.length)
		{
			//------------------------------------
			out="LCLASYDEMTYP:";
			for(var d=0;d<Plans[i].Dem.length;d++)
			{
				if(Plans[i].Dem[d].Typ!=null)
					out+=Plans[i].Dem[d].Typ+",";
			}
			out+="\n";
			UpData+=out;
			//------------------------------------
			out="LCLSYCDEMNUM:";
			for(var d=0;d<Plans[i].Dem.length;d++)
			{
				if(Plans[i].Dem[d].Num!=null)
					out+=Plans[i].Dem[d].Num+",";
			}
			out+="\n";
			UpData+=out;
			//------------------------------------
			out="LCLASYDEXSTP:";
			for(var d=0;d<Plans[i].Dem.length;d++)
			{
				if(Plans[i].Dem[d].Dat!=null)
					out+=Plans[i].Dem[d].Dat+",";
			}
			out+="\n";
			UpData+=out;
			//------------------------------------
		}
		if(Plans[i].LGCs && Plans[i].LGCs.length)
		{
			for(var d=0;d<Plans[i].LGCs.length;d++)
			{
				UpData+="LGC:"+Plans[i].LGCs[d].Name+":"+Plans[i].LGCs[d].Code+"\n";
			}
		}
		if(Plans[i].SEQ)
			UpData+="LCLASYSEQSTP:"+Plans[i].SEQ.toString()+"\n";
		if(Plans[i].TP)
		{
			if(Plans[i].Typ==0)
				UpData+="LCLASYTNOSTP:"+Plans[i].TP.toString()+"\n";
			if(Plans[i].Typ!=0)
				UpData+="LCLSYCTSTSTP:"+Plans[i].TP.toString()+"\n";
		}
		if(Plans[i].Typ==0)
		{
			if(Plans[i].Logic)
				UpData+="LCLLGCSTP:"+Plans[i].Logic.toString()+"\n";
		}
		if(Plans[i].Typ==1)
		{
			UpData+="LCLSYCTCI:"+Plans[i].TC+"\n";
			UpData+="LCLSYCTOF:"+Plans[i].OF+"\n";
		}
		if(Plans[i].Typ==2)
		{
			UpData+="LCLSYCTCI:"+Plans[i].TC+"\n";
			UpData+="LCLSYCTOF:"+Plans[i].OF+"\n";
		}
		if(i<(Plans.length-1))
			UpData+="\n";
	}
	UpFile="plans.es3"
	seek=0;
	return UpData;
}
function myNewPlan(PLNTYP)
{
	var ev=0;
	var STi=0;
	var STe=0;
	switch(PLNTYP)
	{
		case 0:
			var PlanGen={
				Typ:0,
				TC:0,
				OF:0,
				EV:0,
				TP:[0],
				Dem:[],
				Logic:[],
				DimTyp:0,
				Dim:[100]
			}
			PlanGen.TP.length=PLCs()[PlcIdx].Sts.length;
			PlanGen.TP.splice(0,PlanGen.TP.length)
			for(j=0;j<PLCs()[PlcIdx].Sts.length;j++)
			{
				STe=(PLCs()[PlcIdx].Sts.length+j+1);
				STe=(STe%PLCs()[PlcIdx].Sts.length);
				STi=j;
				PlanGen.TP[j]=10;
				PlanGen.TP[j]+=GetTmin(PLCs()[PlcIdx],j);
				PlanGen.TC+=PlanGen.TP[j];
				PlanGen.TC+=GetEvT(PLCs()[PlcIdx].Sts,STi,STe);
				PlanGen.Logic[j]="";
				PlanGen.Dem[j]=new Object();
				PlanGen.Dem[j].Typ=0;
				PlanGen.Dem[j].Num=0;
				PlanGen.Dem[j].Clr=0;
				PlanGen.Dem[j].Dat=new Array();
			}
		break;
		case 1:
			var PlanGen={
				Typ:1,
				TC:0,
				OF:0,
				EV:0,
				TP:[0],
				Dem:[],
				Logic:[],
				DimTyp:0,
				Dim:[]
			}
			PlanGen.TP.length=PLCs()[PlcIdx].Sts.length;
			for(j=0;j<PLCs()[PlcIdx].Sts.length;j++)
			{
				STe=(PLCs()[PlcIdx].Sts.length+j+1);
				STe=(STe%PLCs()[PlcIdx].Sts.length);
				STi=j;
				PlanGen.TP[j]=10;
				PlanGen.TP[j]+=GetTmin(PLCs()[PlcIdx],j);
				PlanGen.TC+=PlanGen.TP[j];
				PlanGen.TC+=GetEvT(PLCs()[PlcIdx].Sts,STi,STe);
				PlanGen.Logic[j]="";
				PlanGen.Dem[j]=new Object();
				PlanGen.Dem[j].Typ=0;
				PlanGen.Dem[j].Num=0;
				PlanGen.Dem[j].Clr=0;
				PlanGen.Dem[j].Dat=new Array();
			}
		break;
		case 2:
			var PlanGen={
				Typ:1,
				TC:0,
				OF:0,
				EV:0,
				TP:[0],
				Dem:[],
				Logic:[],
				DimTyp:0,
				Dim:[]
			}
			PlanGen.TP.length=PLCs()[PlcIdx].Sts.length;
			for(j=0;j<PLCs()[PlcIdx].Sts.length;j++)
			{
				STe=(PLCs()[PlcIdx].Sts.length+j+1);
				STe=(STe%PLCs()[PlcIdx].Sts.length);
				STi=j;
				PlanGen.TP[j]=10;
				PlanGen.TP[j]+=GetTmin(PLCs()[PlcIdx],j);
				PlanGen.TC+=PlanGen.TP[j];
				PlanGen.TC+=GetEvT(PLCs()[PlcIdx].Sts,STi,STe);
				PlanGen.Logic[j]="";
				PlanGen.Dem[j]=new Object();
				PlanGen.Dem[j].Typ=0;
				PlanGen.Dem[j].Num=0;
				PlanGen.Dem[j].Clr=0;
				PlanGen.Dem[j].Dat=new Array();
			}
		break;
	}
	return PlanGen;
}

percent=70;
