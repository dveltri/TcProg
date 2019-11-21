args = WScript.Arguments.Count
Set objFSO2 = CreateObject("Scripting.FileSystemObject")
Set objFSO = CreateObject("Scripting.FileSystemObject")
Dim HaveError
Dim Muestras
dim CaptureData1()
dim CaptureData2()
Dim StructSize
Dim CaptureSize
Dim TimeOfCap
Dim idxfile
Dim out

Class inputs
 Public Flags
 public Time
 Public Value
 Public Count
End Class

'-------------------------------------------------------
Muestras=0
HaveError=0
StructSize=16
idxfile=0
out=""

If args < 1 then
  WScript.Quit
end If

Function str2int(str)
	str2int=Asc(mid(str,1,1)) + Asc(mid(str,2,1))*256 + Asc(mid(str,3,1))*65536 + Asc(mid(str,4,1))*16777216
End Function

while idxfile < args
	Set file = objFSO.getFile(WScript.Arguments.Item(idxfile))
	Set objReadFile = objFSO2.OpenTextFile(WScript.Arguments.Item(idxfile) & ".txt", 2,True)'1:read 2:write 8:appending
	Set ts = file.OpenAsTextStream()
	CaptureSize=0
	TimeOfCap=1
	idxfile=idxfile+1
	CaptureSize=str2int(ts.read(4))-8
	Redim CaptureData1(CaptureSize/StructSize)
	Redim CaptureData2(CaptureSize/StructSize)
	'-----------------------------------------
	TimeOfCap=str2int(ts.read(4))
	idxSt=0
	out="[        From        =>         To         ]" & chr(9)
	while idxSt<(CaptureSize/StructSize)
		Set CaptureData2(idxSt) = New inputs
		Set CaptureData1(idxSt) = New inputs
		CaptureData2(idxSt).Flags=str2int(ts.read(4))
		CaptureData2(idxSt).Time=str2int(ts.read(4))
		CaptureData2(idxSt).Value=str2int(ts.read(4))
		CaptureData2(idxSt).Count=str2int(ts.read(4))
		out=out & chr(9) & "Count" & idxSt & chr(9) & "Ocup" & idxSt
		idxSt=idxSt+1
	wend
	out=out & chr(9) & "samples" & vbcrlf 
	objReadFile.Write out
	While Not ts.atEndOfStream
		if(CaptureSize = (str2int(ts.read(4))-8)) then 
			out="[" & DateAdd("s",TimeOfCap,"01/01/1970 00:00:00") 
			TimeOfCap=str2int(ts.read(4))
			out=out & " => " & DateAdd("s",TimeOfCap,"01/01/1970 00:00:00") & "]" & chr(9)
			idxSt=0
			while idxSt<(CaptureSize/StructSize)
				CaptureData1(idxSt).Flags=str2int(ts.read(4))
				CaptureData1(idxSt).Time=str2int(ts.read(4))
				CaptureData1(idxSt).Value=str2int(ts.read(4))
				CaptureData1(idxSt).Count=str2int(ts.read(4))
				out=out & chr(9) & CaptureData1(idxSt).Count - CaptureData2(idxSt).Count
				if (CaptureData1(idxSt).Time > CaptureData2(idxSt).Time) then 
					Muestras=(CaptureData1(idxSt).Time - CaptureData2(idxSt).Time)
					out=out & chr(9) & Round((CaptureData1(idxSt).Value - CaptureData2(idxSt).Value)*100 / (CaptureData1(idxSt).Time - CaptureData2(idxSt).Time),3)
				else
					out=out & chr(9) & "Err"
					HaveError=1
				end if 
				CaptureData2(idxSt).Time=CaptureData1(idxSt).Time
				CaptureData2(idxSt).Value=CaptureData1(idxSt).Value
				CaptureData2(idxSt).Count=CaptureData1(idxSt).Count
				idxSt=idxSt+1
			wend
			out=out & chr(9) & Muestras & vbcrlf
			'HaveError=0
			if (HaveError=0) then
				objReadFile.Write out
			end if
			HaveError=0
			out=""
		end if
	wend
objReadFile.Close
wend
ts.Close
'WScript.Echo out