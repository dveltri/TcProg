function LanguageToPO()
{
	Str_FromStep="De passo";
	Str_ToStep="para passo";
	Str_Demand = "Demanda";
	Str_Next_Stp="Pr\u00f3ximo passo de est\u00e1gio";
	Str_Check_Time_minimum="Inibe Tempo M\u00ednimo";
	Str_Error_Time_Stp="Erro de tempo no passo";// added by dgv -> please Traduct
	Str_Typ_Src="Origem, Tipo";
/*menus iniciais*/
	Str_MN_Config="Configura&#231;&#245;es";
	Str_MN_Info="Informa&#231;&#245;es";
	Str_MN_Tools="Ferramentas";
	Str_check_Conf="Verificar e definir";			//Rog�rio - 09/05/2014
//SubMenu (Config)
	Str_General="Geral";
	Str_Controllers="Anel";
	Str_Controllers2="An&#233;is";
	Str_Add_Conflict="Matriz de Conflito";
	Str_Matrix="Matriz";
	Str_Lack="Falha de L&#226;mpadas";
	Str_Config_Phases="Config Grupos";				//M�rcio - TESC - 26/03/2013
	Str_Config_Comms="Config Porta Com";
	Str_Config_Iteris="Config Iteris";
	Str_Config_OPCT="Config OPCT";
	Str_Config_Inputs="Config Entradas";
	Str_Flow_Program="Fluxo do Plano";
	Str_Easy_Program="Novo Plano"
	Str_New_scheduler="Agenda";
	
//SubMenu (Info)
	Str_Status="Estado";
	Str_StsVcontrollers="Estado dos An&#233;is";
	Str_Phases="Grupos";
	Str_Process="Processos";
	Str_Inputs="Entradas";
	//Str_All_Inputs="Todas as Entradas";
	Str_All_Inputs="Entradas";
	Str_About="Sobre";						//Marcio - 14/08/2012
	
//SubMenu (Tools)
	Str_FilerManager="Gerenciador de Arquivos";
	Str_LogOut="Sair";
	Str_Restart="Reiniciar Controlador";
	Str_Save_Windows="Salvar Janelas";
	Str_Orientation="Orienta&#231;&#227;o";
	Str_Location="Dire&#231;&#227;o";
	Str_Debugger="Debugger";
	
//Janela Geral
	Str_GP_MAC_Address="Endere&#231;o MAC:";
	Str_GP_MAC="Especifique o endere&#231;o MAC (Media Access Control)";
	Str_GP_ETH_Address="Endere&#231;o IP:";
	Str_GP_IP="Especifique o endere&#231;o IP do controlador";
	Str_GP_Sub_Net_Mask_Address="M&#225;scara de Sub-Rede:";
	Str_GP_NMSK="Especifique o endere&#231;o da M&#225;scara de Rede";
	Str_GP_DGWMAC_Address="Endere&#231;o DGWMAC:";
	Str_GP_DGWMAC="Especifique o endere&#231;o DGWMAC";
	Str_GP_Log_Out="Destino do Log:";
	Str_GP_LOG="Especifica o destino dos Logs";
	Str_GP_FUT="Frequencia do Piscante:";
	Str_GP_FUC="Especifica a frequencia (Hz) do sinal Sinc";	//Rog�rio 09/05/2014
	Str_GP_FDT="Tempo apagado do Piscante:";
	Str_GP_FDC="Especifica o tempo (%) que o sinal Sinc deve estar baixo";	//Rog�rio 09/05/2014
	Str_GP_Loops="La&#231;os:";
	Str_GP_Loops_1="Especifica a quantidade de la&#231;os do sistema";
	Str_GP_Inputs="Entradas:";
	Str_GP_Inputs_1="Especifica a quantidade de entradas do sistema";
	Str_GP_Phases="Grupos:";
	Str_GP_Phases_1="Especifica a quantidade de Grupos do Controlador";
	Str_GP_PhasesV="Grupos Virtuais:";
	Str_GP_PhasesV_1="Especifica a quantidade de Grupos Virtuais do Controlador";
	Str_GP_PhasesG="Grupo de Grupos:";
	Str_GP_PhasesG_1="Especifica a quantidade de Movimentos agrupados do controlador";
	Str_GP_Controllers="An&#233;is:";
	Str_GP_NC="Especifica a quantidade de an&#233;is:";
	Str_GP_TOET="Time Out para Falha El&#233;trica:";
	Str_GP_TOEC="Especifica o tempo de espera para falha el&#233;trica";
	Str_GP_TOCT="Time Out para Falha no Consumo:";
	Str_GP_TOCC="Especifica o tempo de espera antes aceitar uma falha de consumo";
	Str_GP_AOVT="Alerta de Sobre Tens&#227;o:";
	Str_GP_AOVC="Especifica a tens&#227;o para gerar alerta";
	Str_GP_NVT="Tensao Normal:";
	Str_GP_NVTC="Especifica o n&#237;vel de tensao de trabalho das lampadas";
	Str_GP_EMVT="Falha de baixa tens&#227;o:";
	Str_GP_EMVC="Especifica o n&#237;vel para baixa tens&#227;o";
	Str_GP_ECVT="Falha por tens&#227;o Cr&#237;tica:";
	Str_GP_ECVC="Especifica o n&#237;vel para tens&#227;o Cr&#237;tica";
	Str_GP_WACTro="C&#243;digo de Accesso Web User:";
	Str_GP_WACT="Especifica C&#243;digo de Acesso Web";
	Str_GP_WACTrw="C&#243;digo de Accesso Web Admin:";
	Str_GP_WACC="Especifica C&#243;digo de Acesso Web";
	Str_GP_Time_Capture_Inputs="Tempo Capturar Entradas";
	Str_GP_TCIT="Tempo para capturar a entrada";
	Str_GP_GPS_Port="GPS Port";
	Str_GP_GPS_Port_1="Especifica a porta serial conectada ao GPS"; 
	Str_GP_Time_Zone="Zona Hor&#225;ria GMT";
	Str_GP_Time_Zone_1="Selecione a Zona hor&#225;ria";
	Str_GP_Save_Conf="Salvar Configura&#231;&#227;o B&#225;sica";
	
//Janela Controladores
	Str_Number="N&#250;mero";
	Str_Name="Nome";
	Str_Initial_Plan="Plano Inicial";
	Str_Sync_Ref="Ref. Sincronismo do Rel&#243;gio";
	Str_scheduler="Agenda";
	Str_Server="Servidor";
	Str_Phase_Citar="Grupo Citar";
	Str_Output_of_Error="Sa&#237;da de Erro";
	Str_Intersection="Cruzamento";
	Str_Phase_server="Grupo central";
	
//Alerts
	Str_Alert_General="Abra a Janela Geral primeiro!";
	
	
//Janela Falha
	Str_Lack_of_Lamps="Falha de L&#226;mpadas";
	Str_Power_of_Red_Lamp="Falta Vermelho";
	Str_Power_of_Yellow_Lamp="Falta Amarelo";
	Str_Power_of_Green_Lamp="Falta Verde";

//Debugger
	Str_Reload_All_Plans="Reiniciar os Planos";

//Serial Port
	Str_Baud_Rate="Velocidade";
	Str_Parity="Paridade";
	Str_Data_Bit="Data Bit";
	Str_Stop_Bits="Stop Bits";

//Iteris
	Str_Parameter="Par&#226;metro";
	Str_Value="Valor";
	Str_Refresh_Time="Tempo de Atualiza&#231;&#227;o";
	Str_Serial_Port="Porta Serial";

//New Plan
	Str_Plan_Number="N&#250;mero do Plano";
	Str_GB_Plan_Number="Este deve ser maior ou igual a 0 e menor que 100";
	Str_GB_Plan_Number_1="Entre com o N&#250;mero do Plano";
	Str_Temp_All_Cicle="Tempo de Ciclo";
	Str_GB_Temp_All_Cicle="Entre com o Tempo de Ciclo";
	Str_Discrepancy="Defasagem";
	Str_GB_Discrepancy="Entre com a Defasagem";
	Str_Safety_Cycle_Time="Tempo de Seguran&#231;a do Ciclo";
	Str_GB_Safety_Cycle_Time="Entre com o Tempo de Seguran&#231;a do Ciclo";
	Str_Conflict_File="Arquivo de Conflito";
	Str_GB_Conflict_File="Arquivo de Conflito (.sec)";
	Str_Qtd_Phase="Quantidade de Grupos";
	Str_Number_Phase="N&#250;mero da Grupo";             						// Marcio - 16/08/2012
	Str_GB_Qtd_Phase="Entre com a quantidade de Grupos do Plano";
	Str_Main="Gerar Principal";
	Str_Name_Stage="Nome do Est&#225;gio";
	Str_GB_Name_Stage="N&#227;o pode conter caracteres especiais e nem espa&#231;os";
	Str_Type_Stage="Tipo de Est&#225;gio";
	Str_GB_Type_Stage="Selecione um tipo de Est&#225;gio";
	Str_Stage="Est&#225;gio";
	Str_Stage_Normal="Normal";
	Str_Stage_EV="Entreverdes";
	Str_Color="Cor";
	Str_Off="Apagado";
	Str_Red="Vermelho";
	Str_Yellow="Amarelo";
	Str_Green="Verde";
	Str_Red_Yellow="Vermelho Amarelo";
	Str_Green_Yellow="Verde Amarelo";
	Str_no_Change="Sem Mudan&#231;a";
	Str_No_Flashing="Sem Piscante";
	Str_Flashing= "Piscante";
	Str_Flashing_Compensated="Piscante Compensado";
	Str_Ascendant="ascendente";
	Str_Falling="descendente";
	Str_Lights_Out="Sa&#237;da de L&#226;mpadas";
	Str_On="Ligado";
	Str_Off="Desligado";
	Str_Other_Stage="Alterar outro movimento";
	
	//vari�veis para nova tela de gera��o de planos
	Str_NewEasy_Plans="Planos";
	Str_NewEasy_Program="Novo Plano";
	Str_NewEasy_InitSeq="Sequencia de Inicio";
	Str_Est_Time_YellowP="Tempo de amarelo piscante";
	Str_Est_Time_RedT="Tempo de vermelho total";
	Str_Red_Total="Sequencia de inicio";
	Str_Yellow_Blink="Amarelo piscante";
	
	//Gen�ricas
	Str_Mov="Est";										//M�rcio - 17/08/2012 - Troca string Mov: em Easy Program
	Str_Times="Tempos";									//M�rcio - 17/08/2012
	Str_Sync="Sinc";									//M�rcio - 17/08/2012
	Str_Labels="Nomes";									//M�rcio - 17/08/2012
	Str_Condic="Condi&#231;&#227;o";					//M�rcio - 17/08/2012
	Str_Copy="Copiar";									//M�rcio - 17/08/2012
	
	Str_flashing_Plan="Plano piscante";					//M�rcio - 21/11/2012
	
	Str_logic_state="Transi&#231;&#245;es";				//M�rcio - 26/12/2012
	Str_ocup="Ocupa&#231;&#227;o";
	Str_restart_plan="Reiniciar planos";
	Str_reload_page="Necess&#225;rio recarregar a p&#225;gina";
	
	Str_Time = "Tempo";									//M�rcio - 27/12/2012
	
	Str_seg = "seguran&#231;a";							//M�rcio - 08/01/2013
	Str_extend = "extens&#227;o"						//M�rcio - 08/01/2013
	Str_maximum = "m&#225;ximo";						//M�rcio - 09/01/2013
	Str_Comp_Program = "Compilador";					//M�rcio - 10/01/2013
	Str_Plan_Type = "Tipo do plano";					//M�rcio - 28/01/2013
	Str_Force_Plan = "For&#231;a plano";				//M�rcio - 04/02/2013
	Str_Rest_Plan = "Restaura planos";					//M�rcio - 04/02/2013
	Str_Sinc = "Ponto de Sincronismo";					//M�rcio - 05/02/2013
	Str_board = "Tipo da placa";						//M�rcio - 07/02/2013
	Str_boardH = "Especifica o modelo da placa de captura";		//M�rcio - 07/02/2013
	
	Str_FilePlan = "Planos";									//M�rcio - 28/02/2013
	Str_FileConf = "Conflitos";
	Str_FileSch  = "Agendas";
	Str_Files     = "Arquivos";
	
	Str_no_select = "N&#227;o selecionado";						//M�rcio Jos� Soares - 11/04/2013
	Str_Ocorr     = "Ocorr&#234;ncias";							//M�rcio - TESC - 12/04/2013
	
	Str_Cod_Ocorr = "C&#243;digo do Erro";							//M�rcio - TESC - 12/04/2013
	Str_Descr_Ocorr = "Descri&#231;&#227;o da Ocorr&#234;ncia";		//M�rcio - TESC - 12/04/2013
	Str_DtHr_Ocorr = "Data / Hora da Ocorr&#234;ncia";				//M�rcio - TESC - 12/04/2013
	Str_Day = "Dia";												//M�rcio - TESC - 15/04/2013
	Str_Month = "M&#234;s";											//M�rcio - TESC - 15/04/2013
	Str_Year = "Ano";												//M�rcio - TESC - 15/04/2013
	Str_Seek = "Buscar";											//M�rcio - TESC - 15/04/2013
	Str_New_Seek = "Nova Busca";									//M�rcio - TESC - 15/04/2013
	
	Str_PhaseV="Movimentos Virtuais:";
	Str_PhaseG="Grupo de Fases:";
	
	Str_tp_controller = "Tipo do controlador => ";					//M�rcio - TESC - 29/04/2013
	Str_New_Easy_Seq = "Gera sequ&#234;ncia de in&#237;cio";		//M�rcio - TESC - 03/05/2013
//	

	Str_Config_OTU = "Config OTU";									//M�rcio - TESC - 24/06/2013
	Str_Ctrl_OTU   = "Controle";									//M�rcio - TESC - 25/06/2013
	Str_Reply_OTU  = "Resposta";
	Str_OTU_Command = "Comando";									//M�rcio - TESC - 27/06/2013
	Str_OTU_Demand= "Demanda";
	
	Str_OTU_Menu1 = " Bits IN/OUT";									//M�rcio - TESC - 15/07/2013
	Str_OTU_Menu2 = " Entreverdes";				
	Str_OTU_Menu3 = " Sequ&#234;ncia Conflit.";
	
	Str_OTU_CEV = " Cores";											//M�rcio - TESC - 16/07/2013
	Str_Control = " Controles";
	
	Str_FO = "Focos desligados";									//M�rcio - TESC - 02/10/2013
	Str_Manual_CTRL = "Controle Manual";
	Str_Excesso = "Excesso de";
	Str_Bord_off = "Falta de Placa";
	
	Str_GP_UART0="Especifique a velocidade de comunica&#231;&#227;o para UART0 ex.:9600";
	Str_GP_UART1="Especifique a velocidade de comunica&#231;&#227;o para UART1 ex.:9600";

	Str_Config="Configura&#231;&#245;es";	
	Str_Info="Informa&#231;&#245;es";
	Str_Add="Adicionar";
	Str_Alerts="Alertas";
	Str_Attrib="Atributos";

	Str_Bit="Bit";
	Str_Byte="Byte";
	
	Str_Controller="Anel";

	Str_Date="Data";
	Str_Errors="Falhas";
	Str_Error="Falha";

	

	
	
	Str_Last_Time_Green="&#218;ltimo Verde";
	Str_Memory="Mem&#243;ria";
	
	Str_Mode="Modo";

	
	Str_of="de";
	Str_Output="Sa&#237;da";
	Str_Outputs="Sa&#237;das";
	Str_Plan="Plano";
	Str_Plans="Planos";
	Str_Phase="Grupo";
	


	Str_Size="Tamanho";

	Str_Voltage="Tens&#227;o";
	
	Str_Lack_Red="Falta de Vermelho";
	Str_Lack_Yellow="Falta de Amarelo";
	Str_Lack_Green="Falta de Verde";
	Str_Firmware="Firmware";
	Str_Priority="Prioridade";
	Str_Received="Recebidos";
	

	Str_Rx_id_ok="Processados";

	Str_MD_Off="Modo Apagado";
	Str_MD_Error="Modo Falha";

	Str_MD_Remote="Modo Remoto";
	Str_MD_Manual="Modo Manual";
	
	Str_MD_Normal="Modo Autonomo";
	Str_Transmitted="Transmitidos";
	Str_Passwords="Cod. de Acesso";
	Str_MD_Flashing="Modo Piscante";
	Str_Task_Name="Nome do Processo";
	Str_MD_StpByStp="Modo Passo a Passo";
	Str_Task_Number="N&#250;mero do Processo";
	Str_TC_in_Err ="Falha nos An&#233;is";
	Str_Min_Voltage="Limiar de Sub Tens&#227;o";
	
	Str_Vcontrollers="An&#233;is";
	
	
	Str_Over_Voltage="Limiar de Sobre Tens&#227;o";
	Str_Crit_Voltage="Limiar de Tens&#227;o Critica";
	Str_Normal_Voltage="Limiar de Tens&#227;o Normal";
	Str_Controller_Number="N&#250;mero do Anel";
	Str_Phase_Status="Estado dos Movimentos";
	Str_Controller_Status="Estado dos An&#233;is";
	Str_General_Status="Estado Geral";
	Str_General_Parameters ="Par&#226;metros Gerais";
	Str_Controllers_Parameters ="Configura&#231;&#227;o dos An&#233;is";
	Str_Plan_Editor="Editor de plano";
	Str_Save_Conf="Salvar";

	Str_Capture="Capturar";
//	Str_Comms="Comunica&#231;&#227;o";
	Str_Cycle="Ciclo";
	Str_Color="Cor";
	Str_Code="Codigo";
	Str_Call="Chamar";
	Str_Close="Fechar";
	Str_Change="Change";
	Str_Conflict="Conflito";
	Str_Compile="Compilar";
	Str_Description="Descri&#231;&#227;o";
	Str_Disable="Desabilitar";
	Str_Door="Porta";
	Str_Delet="Delete";
	Str_Edit="Editar";
	Str_Electrical="Eletrica";

	Str_File="Arquivo";
	Str_Function="Fun&#231;&#227;o";

	Str_Flow="Fluxo";

	
	Str_Group="Group";
	
	Str_Green="Verde";
	Str_Integer="Integer";
	Str_Instruction="Instru&#231;&#227;o";
	
	
	Str_Jump_To="Saltar para";
	Str_minimum="m&#237;nimo";
	Str_Make="Montar";
	Str_Ouputs="Sa&#237;das";
	Str_Partial="Parcial";
	Str_Red="Vermelho";
	Str_language="Idioma";

	Str_Lamp="Lampada";
	
	Str_Err_Electric_Red="Erro Eletrico de Vermelho";	//Rog�rio 09/05/2014
	Str_Err_Electric_Yellow="Erro Eletrico de Amarelo";	//Rog�rio 09/05/2014
	Str_Err_Electric_Green="Erro Eletrico de Verde";	//Rog�rio 09/05/2014
	
	Str_MD_Normal_lock="Agenda Modo Local";
	Str_New="Novo";
	
	Str_Offset="Deslocamento";
	Str_Open="Abrir";
	Str_Port="Porta";
	Str_Program="Programa&#231;&#227;o";
	Str_Power="Power";
	Str_Temperature="Temperatura";
	Str_Set="Set";

	Str_Serial="Serial";
	Str_Short="Curto";
	Str_save="Salvar";
	Str_Type="Tipo";
	Str_Time="Tempo";
	
	Str_Upload="Salvar"; //"Upload";
	Str_Version="Vers&#227;o";

	Str_Variable="Vari&#225;vel";
	Str_windows="Janela";
	Str_DaysName=["Domingo","Segunda","Ter&#231;a","Quarta","Quinta","Sexta","S&#225;bado"];

	Str_Lamp_Off="Foco Desligado";
	Str_Service_On="Modo Teste";							//Rog�rio 09/05/2014
	
	Str_Phase_Errors_Disable="Inibe erros no Grupo";		//Rog�rio 09/05/2014
	Str_Time_minimum_Green="Tempo de Verde de Seguran\u00e7a";	//Rog�rio 09/05/2014
	Str_Time_minimum_Yellow="Tempo m&#237;nimo de Amarelo";	//Rog�rio 09/05/2014
	Str_Time_minimum_Red="Tempo m&#237;nimo de Vermelho";	//Rog�rio 09/05/2014
	
	//******************************************* Fabiano Nogueira 10/04/2014
	Str_Error_ErrorCode = "C&#243;digo de erro";
	Str_Error_ErrorCodeSpecify="Especifique o c&#243;digo de erro para editar";
	Str_Error_LogInFile="Log em arquivo";
	Str_Error_Flashing="Piscante";
	Str_Error_FlashingAll="Todos em piscante";
	Str_Error_All="Todos";
	Str_Error_RemoveMessage="Deseja remover erro";
	Str_Error_Description="Descri&#231;&#227;o";
	Str_Error_SelectNewError="Selecione novo erro";
	Str_EV_RemoveMessage="Deseja remover \u00faltimo entreverdes?";
	//******************************************* Fabiano Nogueira 10/04/2014
	Str_Add_State="Adiciona Estado";	//Rog�rio - 09/05/2014
	Str_Del_State="Apaga Estado";		//Rog�rio - 09/05/2014	
	
	Str_Error=["Alert[0],Inicio de operacao - Versao:%u.%u\n",
"Alert[1],LDO power not OK reset",
"Alert[2],Software reset",
"Alert[3],Watchdog reset",
"Alert[4],Brown-out reset",
"Alert[5],Power on reset",
"Alert[6],External reset",
"El modulo %s no puede utilizar el link %u ya que esta siendo utilizado por el modulo %s\n",
"Nao corresponde a uma instrucao valida\n",
"Div 0 [%s] script[%s] PC[%u] [%s]\n",
"Error en el tipo de argumento [%s] script[%s] PC[%u] [%s]\n",
"Error Sintaxis [%s] script[%s] PC[%u] [%s]\n",
"Error en el cantidad de argumentos [%s] script[%s] PC[%u] [%s]\n",
"Desbordamiento de memoria\n",
"No se encontro el destino del salto [%s] script[%s] PC[%u] [%s]\n",
"Retorno sin destino\n",
"No definido",
"Error Sintaxis [%s] script[%s] PC[%u] [%s]\n",
"Str_Script_Err_CT\n",
"El PLC [%s] No se pudo cambiar de plan [%s]-X->[%s]\n",
"Nao foi possivel alocar memoria para X \n",
"%s access to Sd Card\n",
"Nao foi poss�vel alocar a memoria para o arquivo de configuracao X\n",
"Error [%s] access to file %s\n",
"A fase %u de %s ja pertence a %s\n",
"A fase %u %s designada esta fora do intervalo \n",
"Nao foi possivel alocar memoria para o arquivo de configuracao %s \n",
"A conexao %u esta sendo usado por %s \n",
"Leitura no RTC - Erro de comunicacao %s\n",
"Escrita no RTC - Erro de comunicacao %s\n",
"Nivel de tensao alto %u\n",
"Nivel de tensao baixo %u\n",
"Nivel de tensao critico %u\n",
"Porta aberta\n",
"Porta fechada\n",
"Anel %s Chave de foco On\n",
"Anel %s Chave de foco Off\n",
"Anel %s mudou para modo Normal\n",
"Anel %s mudou para modo Remoto\n",
"Anel %s mudou para modo Off\n",
"Anel %s mudou para modo Piscante\n",
"Anel %s mudou para modo Manual\n",
"A comunicacao com a placa da fase %u foi registrada pela ultima vez por [%u] ms \n",
"Problema eletrico em lampada %s na fase: %u tension: %d\n",
"Problema eletrico em uma lampada vermelha na fase: %u \n",
"Problema eletrico em uma lampada amarela na fase: %u\n",
"Problema eletrico em uma lampada verde na fase: %u\n",
"Lampada vermelha queimada na fase: %u\n",
"Lampada amarela queimada na fase: %u\n",
"Lampada verde queimada na fase: %u\n",
"Falta total de lamparas en el movimiento:%u color:%s\n",
"Falta parcial de lampadas na fase: %u cor:%s\n",
"Sobre carga en el movimiento:%u color:%s\n",
"Erro em outro anel\n",
"O tempo de seguranca do ciclo do anel %s foi superado no ultimo sync %u<%u\n",
"Nao foi possivel alocar memoria para ler a agenda\n",
"Error %s access to file [%s]\n",
"Nome do arquivo de agenda nao configurado\n",
"Nao foi possivel encontrar a tabela [Holidays & Dates] in %s\n",
"EOF unspected looking [Holidays & Dates] in %s\n",
"Nao foi poss�vel encontrar a tabela [weeks]\n",
"A data nao tem uma tabela alocada\n",
"A instrucao e grande demais para o buffer de processamento\n",
"Conflito entre fase[%u].%X<->fase[%u].%X\n",
"Conflito entre fase[%u]<->fase[%u] tempo transcorrido %us tempo de seguranca:%us\n",
"Tempo minimo de verde [%ums]<[%ums] na fase: %u\n",
"Tempo minimo de vermelho [%ums]<[%ums] na fase: %u\n",
"O plano %s nao tem um arquivo de conflito designado\n",
"O plano %s nao tem um tempo de seguranca de ciclo configurado\n",
"Salto de estado n�o permitidos\n",
"Error de secuancia de color en fase[%u]\n",
"Nao foi possivel alocar memoria para o arquivo %s\n",
"Error %s access to file [%s]\n",
"O interpretador retornou um erro [%d] PC[%u] [%s]\n",
"O interpretador reportou um transbordo de memoria\n"];
	OptControllers=["1","1 "+Str_Controllers+"","2","2 "+Str_Controllers2+"","3","3 "+Str_Controllers2+"","4","4 "+Str_Controllers2+""];
}

percent=7;

