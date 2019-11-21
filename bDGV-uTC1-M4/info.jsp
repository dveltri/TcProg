<%@ page language="java" import="java.io.*, java.sql.*" %><%
	String data;
	String stemp;
	String ID = request.getParameter("ID");
	String path="/";
	path = request.getParameter("path");
	String Os=System.getProperty("os.name");
	if (Os.indexOf("Win")!=-1)
	{
		//out.println("["+path+"]");
		try
		{
			path=path.replaceAll("/","\\\\");
			path=path.replaceAll("\\\\\\\\","\\\\");
		}
		catch (Exception E2)
		{
			out.println("Exception[" + E2.getMessage()+"]<br/>");
		}
	}
	String file = request.getParameter("file");
	data=request.getParameter("mode");
	int Mode=0;
	if(data!=null)
		Mode+=Integer.parseInt(data);
	data=request.getParameter("seek");
	int seek=0;
	if(data!=null)
		seek+=Integer.parseInt(data);
	data=request.getParameter("len");
	int len=0;
	if(data!=null)
		len=Integer.parseInt(data);
	data = request.getParameter("data");
	//response.setContentType("text/XML");
	ServletContext context = session.getServletContext();
	String rootDir = context.getRealPath(request.getContextPath()); 
	rootDir= application.getRealPath(request.getRequestURI());
	rootDir=rootDir.replaceAll("info.jsp","");
	try
	{
		if (Mode==256)	// Request GET Delete File		
		{
			File archivo;
			if (Os.indexOf("Win")!=-1)
			{
				archivo = new File(rootDir+"\\"+path+"\\"+file);
			}
			else
			{
				archivo = new File(rootDir+"/"+path+"/"+file);
			}
			if (archivo.isDirectory() || !archivo.exists())
			{
				out.println("No Exist");
			}
			else
			{
				try
				{
					archivo.delete();
				}
				catch (Exception E1)
				{
					out.println("message exception" + E1.getMessage());
					return;
				}
			}
		}
		if (Mode==10) // Request GET Write File
		{
			if(seek==0)
			{
					File archivo;
					if (Os.indexOf("Win")!=-1)
					{
						archivo = new File(rootDir+"\\"+path);
					}
					else
					{
						archivo = new File(rootDir+"/"+path);
					}
					if (!archivo.exists())
					{
						archivo.mkdir();
					}
					if (Os.indexOf("Win")!=-1)
					{
						stemp=rootDir+"\\"+path+"\\"+file;
						stemp=stemp.replaceAll("\\\\\\\\","\\\\");
						archivo = new File(stemp);
					}
					else
					{
						stemp=rootDir+"/"+path+"/"+file;
						archivo = new File(stemp);
					}
					if(archivo.delete())
					{
						System.out.println("Del-Ok:"+stemp);
					}
					else
					{
						System.out.println("Error :"+stemp);
					}					
			}
			try 
			{
				RandomAccessFile f;
				if (Os.indexOf("Win")!=-1)
				{
					f = new RandomAccessFile(new File(rootDir+"\\"+path+"\\"+file), "rw");
				}
				else
				{
					f = new RandomAccessFile(new File(rootDir+"/"+path+"/"+file), "rw");
				}
				f.seek(seek); // this basically reads n bytes in the file
				f.write(data.getBytes());
				f.close();
			}
			catch (Exception E2)
			{
				out.println("message exception 1:" + E2.getMessage());
				return;
			}
		}
	}
	catch(Exception E0)
	{
		out.println("message exception 2:" + E0.getMessage());
		return;
	}
	//------------------------------------------------------------------
	try
	{
	  String temp  = new String();
		File delfile;
		File directorio;
		if (Os.indexOf("Win")!=-1)
		{
			delfile = new File (rootDir+"\\info.fls");
			directorio = new File(rootDir+"\\"+path);
		}
		else
		{
			delfile = new File (rootDir+"/info.fls");	
			directorio = new File(rootDir+"/"+path);
		}
		File[] listado;
		if (delfile.exists())
		{
			delfile.delete();	
		}
		delfile=null;
		System.gc();
		//-------------------------------------
		listado = directorio.listFiles();
		//FileWriter archivo = new FileWriter(rootDir+"\\info.fls");
		//archivo.write(path+",\n");
		if (Os.indexOf("Win")!=-1)
		{
			try
			{
				path=path.replaceAll("\\\\","/");
			}
			catch (Exception E2)
			{
				out.println("Exception[" + E2.getMessage()+"]<br/>");
			}
		}
		out.print(path+",\n");
		for (int i=0; i < listado.length; i++)
		{
			Date fecha = new Date(listado[i].lastModified()); //Pongo en formato la fecha del archivo
			if (listado[i].isDirectory())
			{
				temp=listado[i].getName() + "," + listado[i].length() + "," + fecha.toString() + "," + "----D,\n";
			}
			else if (listado[i].isFile())
			{
				temp=listado[i].getName() + "," + listado[i].length() + "," + fecha.toString() + "," + "----A,\n";
			}
			//archivo.write(temp);
			out.print(temp);
		}
		//archivo.close();
	}
	catch (IOException x)
	{
		out.println("ERROR: Could not create FileList\n");
	}// */
%>