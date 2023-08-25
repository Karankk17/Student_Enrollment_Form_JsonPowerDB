var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stuDBName = "SCHOOL-DB";
var stuRelationName = "STUDENT-TABLE";
var connToken = "90931284|-31949327850236359|90961073";

$("#rollno").focus();


function validateFormData() {
    var stuRollVar = $("#rollno").val();
    if (stuRollVar === "") {
        alert("Roll-Number Required Value");
        $("#rollno").focus();
        return "";
    }
    var stuNameVar = $("#name").val();
    if (stuNameVar === "") {
        alert("Full-Name is Required Value");
        $("#name").focus();
        return "";
    }
    var stuClassVar = $("#class").val();
    if (stuClassVar === "") {
        alert(" Class is Required Value");
        $("#class").focus();
        return "";
    }

    var stuDOBVar = $("#dob").val();
    if (stuDOBVar === "") {
        alert("Birth-Date is Required Value");
        $("#dob").focus();
        return "";
    }

    var stuAddressVar= $("#address").val();
    if (stuAddressVar === "") {
        alert("Address is Required Value");
        $("#address").focus();
        return "";
    }

    var stuEnrollDateVar= $("#edate").val();
    if (stuEnrollDateVar === "") {
        alert("Enrollment-Date is Required Value");
        $("#edate").focus();
        return "";
    }

    var jsonStrObj = {
        Student_Roll_Number: stuRollVar,
        Student_Name: stuNameVar,
        Student_Class: stuClassVar,
        Student_DOB: stuDOBVar,
        Student_Address: stuAddressVar,
        Student_Enrollment_Date: stuEnrollDateVar
    };
    return JSON.stringify(jsonStrObj);
}

function getstuRollASJsonObj() {
    var sturollno = $("#rollno").val();
    var jsonStr = {
        Student_Roll_Number: sturollno
    };
    return JSON.stringify(jsonStr);
}

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    $("#name").val(record.Student_Name);
    $("#class").val(record.Student_Class);
    $("#dob").val(record.Student_DOB);
    $("#address").val(record.Student_Address);
    $("#edate").val(record.Student_Enrollment_Date);
}

function getStudent() {
    var stuIdJsonObj = getstuRollASJsonObj();
    var getRequest = createGET_BY_KEYRequest(
            connToken,
            stuDBName,
            stuRelationName,
            stuIdJsonObj
            );
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(
            getRequest,
            jpdbBaseURL,
            jpdbIRL
            );
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#name").focus();
    } else if (resJsonObj.status === 200) {
        $("#rollno").prop("disabled", true);
        fillData(resJsonObj);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#name").focus();
    }
}

function resetForm() {
    $("#rollno").val("");
    $("#name").val("");
    $("#class").val("");
    $("#dob").val("");
    $("#address").val("");
    $("#edate").val("");
    $("#rollno").prop("disabled",false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollno").focus();
}

function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateFormData();
    var updateRequest = createUPDATERecordRequest(
            connToken,
            jsonChg,
            stuDBName,
            stuRelationName,
            localStorage.getItem("recno")
            );
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(
            updateRequest.jpdBaseURL,
            jpdbIML
            );
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#rollno").focus();
}

function saveData() {

    var jsonStr = validateFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(
            connToken,
            jsonStr,
            stuDBName,
            stuRelationName
            );

    alert(putReqStr);

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(
            putReqStr,
            jpdbBaseURL,
            jpdbIML
            );
    jQuery.ajaxSetup({async: true});

    alert(JSON.stringify(resultObj));
    resetForm();
}