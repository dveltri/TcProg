
function sortN(seg1,seg2)
{
	return (seg1.Name>seg2.Name);
}

function sortI(seg1,seg2)
{
	return (seg1>seg2);
}

function GenOptiontyp(typ,Item)
{
	var out="";
	if(typ.Type=="int")
	{
		for(var i=typ.Range[0][0];i<typ.Range[0][1];i+=typ.Unit)
		{
			out+="<option value=\""+i+"\"";
			if(i==Item)out+=" selected=\"selected\"";
			out+=">"+Math.round(i*typ.Show)+"</option>\n";
		}
	}
	return out;
}

function GenOptions(Vect,Item)
{
	var out="";
	for(var i=0;i<Vect.length;i+=2)
	{
		out+="<option value=\""+Vect[i]+"\"";
		if(Vect[i]==Item)out+=" selected=\"selected\"";
		out+=">"+Vect[i+1]+"</option>\n";
	}
	return out;
}

function GenOptionsImg(Vect,Item)
{
	var out="";
	for(var i=0;i<Vect.length;i+=3)
	{
		out+="<option value=\""+Vect[i]+"\" data-image=\""+Vect[i+2]+"\" ";
		if(Vect[i]==Item)out+="selected=\"selected\"";
		out+=">"+Vect[i+1]+"</option>\n";
	}
	return out;
}

function GenOption1(Vect,Item)
{
	var out="";
	for(var i=0;i<Vect.length;i++)
	{
		out+="<option value=\""+Vect[i]+"\"";
		if(Vect[i]==Item)out+=" selected=\"selected\"";
		out+=">"+Vect[i]+"</option>\n";
	}
	return out;
}

function GetOption(Vect,Item)
{
	var out="";
	for(var i=0;i<Vect.length;i+=2)
	{
		if(Vect[i]==Item)
		 return Vect[i+1];
	}
	return "";
}

function GenOptionsVi(Vect,Valor)
{
	var out="";
	for(var i=0;i<Vect.length;i++)
	{
		out+="<option value=\""+Vect[i]+"\"";
		if(Vect[i]==Valor)out+=" selected=\"selected\"";
		out+=">"+Vect[i]+"</option>\n";
	}
	return out;
}

function getparameter(Parm)
{
	var url=document.location.href;
	if(url.search(Parm)<0)
		return null;
	url=url.substr(url.search(Parm)+Parm.length);
	if(url.indexOf("?")!=-1)
		url=url.substr(0,url.indexOf("?"));
	if(url.indexOf("&")!=-1)
		url=url.substr(0,url.indexOf("&"));
	if(url.indexOf("/")!=-1)
		url=url.substr(0,url.indexOf("/"));
	return url;
}

function ConvToInt(vec)
{
	var j=0;
	while(j<vec.length)
	{
		vec[j]=vec[j].trim();
		if(vec[j]=="" || isNaN(parseInt(vec[j]))==true)
		{
			vec.splice(j,1);
		}
		else
		{
			vec[j]=parseInt(vec[j]);
			j++;
		}
	}
	return vec
}

function CountItem(Aray,Item)
{
	var ret=0;
	for(var i=0;i<Aray.length;i++)
	{
		if(Item!=Aray[i])ret++;
	}
	return ret;
}

function ByToInt(Datos)
{
	var temp=0;
	temp+=Datos.charCodeAt(3)<<24;
	temp+=Datos.charCodeAt(2)<<16;
	temp+=Datos.charCodeAt(1)<<8;
	temp+=Datos.charCodeAt(0);
	return temp;
}

function ByToSht(Datos)
{
	var temp=0;
	temp+=Datos.charCodeAt(1)<<8;
	temp+=Datos.charCodeAt(0);
	return temp;
}

function roundNumber(num, dec)
{
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function delay(millis)
{
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < millis);
}

function RemComment(linea)
{
	var ptr1=-1;
	var ptr2=-1;
	linea=""+linea;
	do
	{
		ptr1=linea.indexOf("//");
		if(ptr1!=-1)
		{
			ptr2=linea.indexOf('\n',ptr1);
			if(ptr2!=-1)
				linea=linea.substring(0,ptr1)+""+linea.substring(ptr2+1);
			else
				linea=linea.substring(0,ptr1);
		}
		linea=linea.replace("\t"," ");
		linea=linea.replace("  "," ");
	}while(linea.indexOf("\t")!=-1 || linea.indexOf("  ")!=-1 || linea.indexOf("//")!=-1);
	return linea;
}

function RemoveUnuseChar(linea)
{
	var temp="";
	linea=""+linea;
	var ptrT=0;
	do
	{
		ptrT=linea.indexOf(";");
		if(ptrT!=-1)
			linea=linea.substring(0,ptrT);
		ptrT=linea.indexOf("//");
		if(ptrT!=-1)
		{
			temp=linea.substring(0,ptrT);
			linea=linea.substring(ptrT); //Substring Retorna parte de uma string
			ptrT=linea.indexOf('\n');
			if(ptrT!=-1)
				linea=linea.substring(ptrT);
			else
				linea="";
			linea=(temp+linea);
		}
		linea=linea.replace("  "," ");
		linea=linea.replace("\t"," ");
		linea=linea.trim();
	}while(linea.indexOf("\t")!=-1 || linea.indexOf("  ")!=-1 || linea.indexOf("//")!=-1);
	return linea;
}

function Remplace(A,X,B)
{
	while(A.indexOf(X)!=-1)
	{
		A=A.replace(X,B);
	}
	return A;
}

function add0ton(n)
{
	if(n<=9)
	return "0"+n;
	else
	return n;
}

function dgvdatef(dat)
{
	return dat.getFullYear()+"/"+add0ton(dat.getMonth()+1)+"/"+add0ton(dat.getDay())+" "+add0ton(dat.getHours())+":"+add0ton(dat.getMinutes())+":"+add0ton(dat.getSeconds());
}
function RemoveUnusedItem(Datos)
{
	var j=0;
	while(j<Datos.length)
	{
		Datos[j]=""+Datos[j];
		Datos[j]=RemoveUnuseChar(Datos[j]);
		Datos[j]=Datos[j].trim();
		if(Datos[j]=="" || Datos[j]==null)
			Datos.splice(j,1);
		else
			j++;
	}
}
