
/*function UpDateGVars()
{
	UpPath=document.getElementById("path").value;
	UpFile=document.getElementById("file").value;
	if(UpType=="eil")
		UpData=compilador(document.getElementById("data").value);
	if(UpType=="bin")
		UpData=HexDecode(document.getElementById("data").value);
	if(UpType=="txt")
		UpData=document.getElementById("data").value;
	document.getElementById('FeditLen').innerHTML=UpData.length
}
*/
/*function decompilador(str)
{
	var aStr = str;
	var temp=0;
	var strt="";
	var i = 0;
	var aRet="";
	while (i<(aStr.length-1)) 
	{
		i++;
		var iC = aStr[i].charCodeAt();
		if(aStr[i-1]!='=' && aStr[i]=='=' && aStr[i+1]!='=')
		{
			temp=aStr.substring(i+1,i+5);
			aRet+=("="+ByToInt(temp)+"");
			i+=4;
		}
		else 
			if(iC==0)
				aRet+=('\n');//aRet.push('&#'+iC+';');<br />
			else
				aRet+=aStr[i];
	}
	return aRet;
}

function compilador(Datos)
{
	var CFT="#CFT:";
	var MCT="#MCT:";
	var ptr;
	var ValorVar=0;
	var ptrT;
	var Salida="\0";
	var linea="";
	Datos+="\n";
	//-----------------------------------------------------------------
	ptr=Datos.indexOf("#CFT:");
	if(ptr!=-1)
		CFT=RemoveUnuseChar(Datos.substring(ptr,Datos.substring(ptr).indexOf("\n")+ptr));
	ptr=Datos.indexOf("#MCT:");
	if(ptr!=-1)
		MCT=RemoveUnuseChar(Datos.substring(ptr,Datos.substring(ptr).indexOf("\n")+ptr));
	//------------------------------------------------------------------
	ptr=0;
	while(ptr<Datos.length)
	{
		linea=Datos.substring(ptr,Datos.substring(ptr).indexOf("\n")+ptr);
		linea=RemoveUnuseChar(linea);
		if(linea.charAt(0)!="#")
		{
			if(linea!="")
			{
				ptrT=linea.indexOf("==");
				if(ptrT==-1)
				{
					ptrT=linea.indexOf("!=");
					if(ptrT==-1)
					{
						//ptrT=linea.indexOf("=");
						linea=linea.split("=");
						if (linea.length>1)
						{
							ValorVar=parseInt(linea[1]);
							linea=linea[0].split(" ");
							if (linea.length>1)
								linea=linea[1];
							else
								linea=linea[0];
							linea=linea + "="
							linea+=String.fromCharCode((ValorVar&255),((ValorVar/256)&255),((ValorVar/65536)&255),((ValorVar/16777216)&255));
						}
					}
				}
				Salida+=linea+"\0";
			}
		}
		ptr=Datos.substring(ptr).indexOf("\n")+ptr+1;
	}
	Salida+="#MD\0"+CFT+"\0"+MCT+"\0"
	//alert(Salida.length +" "+ HTMLEncode(Salida));
	//alert("compilado");
	return Salida;
}
*/
function rcvFileEdit(Datos)
{
	if(Datos)
	{
		Datos=Datos.responseText;
		if(UpFile.indexOf(".bin")!=-1 || UpFile.indexOf(".dgv")!=-1)
			Datos=HexEncode(Datos);
		Datos=HTMLEncode(Datos);
		rcvFileEdit2(Datos);
	}
	else
		rcvFileEdit2("");
}

function checktype()
{
	var Fname=document.getElementById("file").value
	if(Fname.indexOf("plan")!=-1 || Fname.indexOf("dgv")!=-1)
	{
		document.getElementById('PlanIterF').innerHTML="\
		<input type=\"button\" class=\"CssBtn\" value=\""+Str_Upload+" "+Str_Compile+"\"  onclick=\"uploadCompile();\" />\n\
		<input type=\"button\" class=\"CssBtn\" value=\""+Str_Flow_Program+"\" onclick=\"StartFlowProg(document.getElementById('file').value,document.getElementById('data').value);\" />\n";
	}
	else
	{
		document.getElementById('PlanIterF').innerHTML="";
	}
}

/*function uploadCompile()
{
	var Fname=document.getElementById("file").value
	UpType="eil";
	UpDateGVars();
	UpFile=document.getElementById("file").value;
	UpFile=UpFile.substring(0,UpFile.indexOf("."));
	if(Fname.indexOf("dgv")!=-1)
	 UpFile+=".dgv";
	else
	 UpFile+=".eil";
	rcvUpFileFileEdit();
}
*/
function rcvFileEdit2(Datos)
{
	OUT=document.getElementById("sample13Title");
	OUT.innerHTML=Str_Edit;
	OUT="";
	OUT+="<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bordercolor=\"LightGrey\" border=\"0\" bgcolor=\"LightGrey\" align=\"center\" class=\"table1\">";
	OUT+="<tr>\
		<td align=\"left\"><font size=\"2\" face=\"arial\">Path</font></td>\n\
		<td align=\"right\"><font size=\"2\" face=\"arial\"><input id=\"path\" type=\"text\" class=\"CssInText\" value=\""+UpPath+"\" /></font></td>\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"left\"><font size=\"2\" face=\"arial\">File</font></td>\
		<td align=\"right\"><font size=\"2\" face=\"arial\"><input id=\"file\" type=\"text\" class=\"CssInText\" onkeyup=\"checktype()\" value=\""+UpFile+"\" /></font></td>\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"left\"><font id=\"mode\" size=\"2\" face=\"arial\"></font></td>\
		<td align=\"right\"></td>\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"left\">\n\
		<input id=\"btnup\" type=\"button\" class=\"CssBtn\" value=\""+Str_Upload+" "+Str_File+"\" onclick=\"UpType='txt';UpDateGVars();rcvUpFileFileEdit();\" />\
		</td>\
		<td align=\"right\">\n\
		<font size=\"2\" face=\"arial\">Length</font>\n\
		<font id=\"FeditLen\" size=\"2\" face=\"arial\">0</font>\n\
		</td>\n\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"left\">\n\
		<font id=\"PlanIterF\" ></font>\n\
		</td>\n\
		<td align=\"right\">\n\
		</td>\n\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"middle\" colspan=\"2\" >\n\
	    <textarea  id=\"data\" class=\"CssInText\" rows=\"33\" cols=\"100\" onkeyup=\"UpDateGVars();\" >"+Datos+"</textarea><br />\n\
		</td>\n\
	</tr>\n";
	OUT+="<tr>\
		<td align=\"middle\" colspan=\"2\" ><font>-</font>\n\</td>\n\
	</tr>\n";
	OUT+="</table>";
	document.getElementById("FileEdit").innerHTML=OUT;
	document.getElementById('FeditLen').innerHTML=document.getElementById('data').value.length;
	checktype();
	if (winList['sample13'])
	{
		winList['sample13'].open();
		document.getElementById("sample13").style.width="500px";
//		document.getElementById("CFGINI").style.height="150px";
	}
}

function rcvUpFileFileEdit(Datos)
{
	var temp="";
	if(PrgBk[TrgIdx].Typ==0)
	{
		try
		{
			//  'utf8', 'ascii', 'binary', 'hex', 'base64' and 'utf16le'
			temp=PrgBk[TrgIdx].host+'/'+UpPath+'/'+UpFile;
			temp=Remplace(temp,'//','/');
			fs.writeFile(temp, UpData,'ascii',(err)=>{if(err){console.log("error");return;}});
			UpMode=0;
		}
		catch (e)
		{
			alert(e);
		}
	}
	if(PrgBk[TrgIdx].Typ==1)
	{
		UpPath=UpPath+"/";
		UpPath=Remplace(UpPath,'//','/');
		/*if(!SendOrAlert)
		{
			alert("to:"+PrgBk[TrgIdx].host+"\nMode:"+UpMode+"\nPath:"+UpPath+"\nfile:"+UpFile+"\nseek:"+UpSeek+"\n\n"+UpData);
			UpSeek=0;
			document.getElementById("LOADING").style.visibility = 'hidden';
			UpMode=0;
			return;
		}*/
		var len,data;
		var tlen=0;
		//----------------
		if(UpData.length==0)
			UpData=" ";
		len=UpData.length;
		data=UpData;
		ShwPBar("UpLoading "+UpPath+UpFile+"..");
		percent2=Math.round((1000/len)*UpSeek)/10;
		//PBarUpDate();
		//----------------
		if(UpSeek<len)
		{
			if(Datos)
			{
				if(Datos.status==200)
				{
					rcvFileAdmin(Datos);
				}
				else
				{
					tlen=UpSeek;
					if(UpSeek>=Maxlen)
						tlen=Maxlen;
						UpSeek-=tlen;
				}
				if(Datos.status==500)
				{
					UpSeek=0;
					percent2=0;
					//PBarOff();
					setTimeout("UpMode=0;",50);
				}
			}
			tlen=(len-UpSeek);
			if(tlen>Maxlen)
				tlen=Maxlen;
			if(UpType=="eil")
				GetUrlB(PrgBk[TrgIdx].host+"/"+PrgBk[TrgIdx].DGVFTP+"?mode="+UpMode+"&path="+UpPath+"&file="+UpFile+"&seek="+UpSeek+"&len="+tlen+"&data="+escape(data.substring(UpSeek,(UpSeek+tlen+1))),rcvUpFileFileEdit);
			else
				GetUrlB(PrgBk[TrgIdx].host+"/"+PrgBk[TrgIdx].DGVFTP+"?mode="+UpMode+"&path="+UpPath+"&file="+UpFile+"&seek="+UpSeek+"&len="+tlen+"&data="+encodeURIComponent(data.substring(UpSeek,(UpSeek+tlen+1))),rcvUpFileFileEdit);
				UpSeek+=data.substring(UpSeek,(UpSeek+tlen)).length;
		}
		else
		{
			rcvFileAdmin(Datos);
			UpSeek=0;
			percent2=0;
			//PBarOff();
			setTimeout("UpMode=0;",50);
		}
	}
}

function sortfuncInfo(a,b)
{
	return((b.Info)>(a.Info));
}

function sortfuncName(a,b)
{
	return((b.Name)<(a.Name));
}

function rcvFileAdmin(Datos)
{
	FileListDat=FileList2Txt(Datos);
	FileListDat=FileList2Array(FileListDat);
	FileListDat=FileList2Obj(FileListDat);
}

function FileList2Txt(Datos)
{
	FileListDat = new Array();
	Datos=Datos.responseText;
	FileListDat=Datos.trim();
	return FileListDat;
}

function FileList2Array(FileListDat)
{
	FileListDat=FileListDat.split(",");
	return FileListDat;
}

function FileList2Obj(FileListDat)
{
	var idx=0;
	var Flt="";
	Flt=FilterFileList.split(",");
    var Datos=FileListDat.slice();
	var path=Datos[0].trim();
	FileListDat = new Array();
	for(var i=1;i<Datos.length-4;i+=4)
	{
		Datos[0+i]=Datos[0+i].trim();
		for(var j=0;j<Flt.length;j++)
			if(Datos[0+i].indexOf(Flt[j])!=-1)
				break;
		if(j!=Flt.length)
		{
			idx=FileListDat.length;
			FileListDat[idx]=new Object();
			FileListDat[idx].Path=path;
			FileListDat[idx].Name=Datos[0+i].trim();
			FileListDat[idx].Size=Datos[1+i].trim();
			FileListDat[idx].Date=Datos[2+i].trim();
			FileListDat[idx].Info=Datos[3+i].trim();
		}
	}
	FileListDat=FileListDat.sort(sortfuncName);
	FileListDat=FileListDat.sort(sortfuncInfo);
	return FileListDat;
}

function ShwFileAdmin()
{
	var i=0;
	var ptr=0;
	var OUT;
	var path=FileListDat[0].Path;
	var temp;
	OUT="";
	OUT+="<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bordercolor=\"#ffffff\" border=\"0\" bgcolor=\"#ffffff\" align=\"center\" class=\"table1\">\
	<tr bgcolor=\"#808080\" align=\"center\">\
		<td width=\"37\"><font size=\"2\" face=\"arial\"> </font></td>\
		<td><font size=\"2\" face=\"arial\"> "+Str_Name+"</font></td>\
		<td><font size=\"2\" face=\"arial\"> "+Str_Size+"</font></td>\
		<td><font size=\"2\" face=\"arial\"> "+Str_Date+"</font></td>\
		<td><font size=\"2\" face=\"arial\"> "+Str_Info+"</font></td>\
		<td><font size=\"2\" face=\"arial\"> </font></td>\
	</tr>\n"
	for(var i=0;i<FileListDat.length;i++)
	{
		OUT+="<tr align=\"center\">\n";
		OUT+="<td align=\"right\"><font size=\"1\" face=\"arial\">\n";
		if(FileListDat[i].Info.indexOf("D")!=-1)
		{
			OUT+="<img src=\"./img/folder.jpg\" width=\"16\" height=\"16\" border=\"0\" />\n";
		}
		else
		{
			switch(FileListDat[i].Name)// nombres espesificos
			{
				case "dgvsoft.ini":
				break;
			}
			switch(FileListDat[i].Name.split(".")[1])// extenciones espesificas
			{
				case "fct":
					OUT+="<a href=\"\" onclick=\"GetUrlB('"+PrgEd[SrcIdx].host+(path+"/").replace("//","/")+HTMLEncode(FileListDat[i].Name)+"',rcvCFT2);UpFile='"+HTMLEncode(FileListDat[i].Name)+"';";
					OUT+="return false\">\n<img src=\"escudo.png\" width=\"16\" height=\"16\" border=\"0\" /></a> ";
				break;
			}
			if(FileListDat[i].Name.indexOf("plan")!=-1 && FileListDat[i].Name.indexOf(".txt")!=-1)//planes
			{
				OUT+="<a href=\"\" onclick=\"GetUrlB('"+PrgEd[SrcIdx].host+(path+"/").replace("//","/")+HTMLEncode(FileListDat[i].Name)+"',RcvFlowProg);UpFile='"+HTMLEncode(FileListDat[i].Name)+"';";
				OUT+="UpType='txt';";
				OUT+="return false\">\n<img src=\"";
				OUT+="flow0.gif";
				OUT+="\" width=\"16\" height=\"16\" border=\"0\" /></a> ";
			}
			
			switch(FileListDat[i].Name.split(".")[1])// block de notas habilitado
			{
				case "jpg":
				break;
				case "sch":
				case "eil":
				case "esy":
				case "es2":						//Marcio - TESC - nova extens�o para arquivo ASM
				case "es3":						//
				case "sec":
				case "fct":
				case "ini":
				case "INI":
				case "txt":
				case "phg":
				case "js":
				case "dgv":
				case "xht":
				case "htm":
				case "css":
				default:
					OUT+="<a href=\"\" onclick=\"GetUrlB('"+PrgEd[SrcIdx].host+(path+"/").replace("//","/")+HTMLEncode(FileListDat[i].Name)+"',rcvFileEdit);UpFile='"+HTMLEncode(FileListDat[i].Name)+"';UpPath='"+path+"';";
					OUT+="UpType='txt';";
					OUT+="return false\">\n<img src=\"";
					OUT+="./img/efile.png";
					OUT+="\" width=\"16\" height=\"16\" border=\"0\" /></a> ";
				break;
			}
		}
		OUT+="</font></td>\n";
		//---------------------------------------------------------------
		OUT+="<td align=\"left\"><font size=\"1\" face=\"arial\">";
		if(FileListDat[i].Info.indexOf("D")==-1)
			OUT+="<a href=\"http://"+PrgEd[SrcIdx].host+(path+"/").replace("//","/")+HTMLEncode(FileListDat[i].Name)+"?WAC="+WAC+"\" target=\"_blank\">"+HTMLEncode(FileListDat[i].Name)+"</a>";
		else
			OUT+="<a href=\"\" onclick=\"GetUrlB('"+PrgEd[SrcIdx].host+"/"+PrgEd[TrgIdx].DGVFTP+"?path="+(path+"/"+HTMLEncode(FileListDat[i].Name)).replace("//","/")+"',rcvFileAdmin);return false\">"+FileListDat[i].Name+"</a>";
		OUT+="</font></td>\n";
		//---------------------------------------------------------------
		OUT+="<td align=\"right\"><font size=\"1\" face=\"arial\">"+FileListDat[i].Size+"bytes</font></td>\n";
		//---------------------------------------------------------------
		OUT+="<td><font size=\"1\" face=\"arial\">"+FileListDat[i].Date+"</font></td>\n";
		//---------------------------------------------------------------
		OUT+="<td><font size=\"1\" face=\"arial\">"+FileListDat[i].Info+"</font></td>\n";
		//---------------------------------------------------------------
		OUT+="<td><font size=\"1\" face=\"arial\">";
		if(FileListDat[i].Info.indexOf("D")==-1)
		{
			OUT+="\n<a href=\"\" onclick=\"if(confirm('"+Str_Delet+" ["+HTMLEncode(FileListDat[i].Name)+"]?')){GetUrlB('"+PrgEd[SrcIdx].host+"/"+DGVFTP+"?mode=256&#38;path="+path+"&#38;file="+HTMLEncode(FileListDat[i].Name)+"',rcvFileAdmin);}return false\">\n<img src=\"";
			OUT+="./img/defile.png";
			OUT+="\" width=\"16\" height=\"16\" border=\"0\" /></a> ";
		}
		OUT+="</font></td>\n";
		//---------------------------------------------------------------
	OUT+="</tr>\n";
	}// */
	OUT+="</table>";
	return OUT;
}

function GetFls(temp,Fnc)
{
	var out="";
	var idx=0;
	var stat;
	var date	=0;
	var year	=0;
	var month =0;
	var day   =0;
	var hour  =0;
	var minute=0;
	var seconds=0;
	var pathtxt="";
	if(temp!="")
	{
		pathtxt=temp+"/";
		pathtxt=Remplace(pathtxt,'//','/');
		pathtxt=pathtxt.replace("file:/","/");
		SvrIp=temp;
		temp=SvrIp.split("/Conf/");
		temp[1]=temp[1].split("/");
		temp[0]+="/Conf/";
		//SvrIp=temp[0];
		if(temp[1].length>1)
		{
			for(var i=1;i<temp[1].length;i++)
				out+="/"+temp[1][i];
			out+=",\n";
		}
		else
		{
			out+="/,\n";
		}
		temp=fs.readdirSync(pathtxt);
		FileListDat=new Array();
		for(var i=0;i<temp.length;i++)
		{
			//temp[0+i].trim()
			idx=FileListDat.length;
			FileListDat[idx]=new Object();
			FileListDat[idx].Path=pathtxt;
			FileListDat[idx].Name=temp[0+i].trim();
			out+=temp[0+i].trim()+",";
			stat = fs.statSync(pathtxt+"/"+temp[0+i].trim())
			FileListDat[idx].Size=stat.size;
			out+=stat.size+",";
			FileListDat[idx].Date=stat.mtime;
			//out+=stat.mtime+",";
			date = new Date(stat.mtimeMs);
			year    = date.getFullYear();
			month   = date.getMonth();
			day     = date.getDay();
			hour    = date.getHours();
			minute  = date.getMinutes();
			seconds = date.getSeconds(); 
			out+=year+"/"+month+"/"+day+" "+hour+":"+minute+":"+seconds+",";
			FileListDat[idx].Info=(stat.mode&0040000 ?'D----':'----A');
			out+=(stat.mode&0040000 ?'D----':'----A')+",\n";
		}
		temp=pathtxt.split("/Conf/");
		SvrIp=temp[0]+"/Conf/";
		//AddSrcNow(temp[1],0,0);
		console.log("OpenFolder:"+SvrIp+"["+temp[1]+"]");
	}
	var Datos=new Object();
	Datos.status=200;
	Datos.responseText=out;
	Datos.getResponseHeader=function(cmp){return "";};
	Fnc(Datos);
}

percent=45;
