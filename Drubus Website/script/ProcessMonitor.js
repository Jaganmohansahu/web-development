$('document').ready(function()
{
	getProcessInstanceInfo();
	getProcessInstanceLog();
});

function getProcessInstanceInfo()
{
	var jsoninput={};
	$.ajax({
		type: "POST",       
    	data: jsoninput,
    	url: "ServiceController/getProcessInstanceInfo", 
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		success: getProcessInstanceInfoSuccess,
		error:getProcessInstanceInfoError
    });
}

function getProcessInstanceInfoSuccess(response)
{
	
	var pinfo_jsa = response.ProcessInfo;
	
	var tbl_html = "";
	for(i=0;i<pinfo_jsa.length;i++)
		{
			tbl_html += '<tr onclick="openModal('+pinfo_jsa[i].InstanceId+')"><td>'+pinfo_jsa[i].InstanceId+'</td><td>'+pinfo_jsa[i].processId+'</td><td>'+pinfo_jsa[i].lastModificationDate+'</td><td>'+pinfo_jsa[i].lastReadDate+'</td><td>'+pinfo_jsa[i].startDate+'</td><td>'+pinfo_jsa[i].state+'</td></tr>';
		}
	$("#processinfo").append(tbl_html);
	
	
	
//	alert(response);
}
function getProcessInstanceInfoError(response)
{
	alert(response.responseText);
}
function getProcessInstanceLog()
{
	var jsoninput={};
	$.ajax({
		type: "POST",       
    	data: jsoninput,
    	url: "ServiceController/getProcessInstanceLog", 
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		success: getProcessInstanceLogSuccess,
		error:getProcessInstanceLogError
    });
}

function getProcessInstanceLogSuccess(response)
{

	
	
	var pinfo_jsa = response.ProcessLog;
	
	var tbl_html = "";
	for(i=0;i<pinfo_jsa.length;i++)
		{
			tbl_html += '<tr onclick="openModal('+pinfo_jsa[i].processInstanceId+')"><td>'+pinfo_jsa[i].processId+'</td><td>'+pinfo_jsa[i].id+'</td><td>'+pinfo_jsa[i].processInstanceId+'</td><td>'+pinfo_jsa[i].processName+'</td><td>'+pinfo_jsa[i].start_date+'</td><td>'+pinfo_jsa[i].end_date+'</td><td>'+pinfo_jsa[i].status+'</td><td>'+pinfo_jsa[i].duration+'</td></tr>';
		}
	$("#processlog").append(tbl_html);
//	alert(response);
}
function getProcessInstanceLogError(response)
{
	alert(response.responseText);
}
function openModal(data)
{
	
	var jsoninput={};
	jsoninput.InstanceId=data;
	$.ajax({
		type: "POST",       
    	data: jsoninput,
    	url: "ServiceController/getProcessImage", 
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
		success: getProcessImageSuccess,
		error:getProcessImageError
    });
//	document.getElementById("openModal").click();
}
function getProcessImageSuccess(response)
{
	
	var image = response.Image;
	image = "data:image/png;base64,"+image;
	document.getElementById("image").src=image;
	console.log(image);
	/*document.getElementById("openModal").click();*/
	$('#myModal').modal('show'); 
}
function getProcessImageError(response)
{
	alert(response);
}