var loginList = [];
var selectedIndex = null;


function isAllFieldValid() {
    var username = $("#txtUsername").val();
    var password = $("#txtPassword").val();
    var isValid = true;

    if (username == "") {
        $("#userErrorMsg").show();
        isValid = false;
    } else {
        $("#userErrorMsg").hide();
    }

    if (password == "") {
        $("#passErrorMsg").show();
        isValid = false;
    } else {
        $("#passErrorMsg").hide();
    }

    return isValid;
}

function clearField() {
    $("#txtUsername").val("");
    $("#txtPassword").val("");
    $("#msg").text("");
    $("#userErrorMsg").hide();
    $("#passErrorMsg").hide();
}


function loginUser() {
    if (isAllFieldValid()) {
        var username = $("#txtUsername").val();
        var password = $("#txtPassword").val();

        if (username === "admin" && password === "1234") {
            $("#msg").text("Login Successful!").css("color", "green");
            setTimeout(function () {
                window.location.href = "/Home/Dashboard";
            }, 1000);
        } else {
            $("#msg").text("Invalid Username or Password!").css("color", "red");
        }
    } else {
        $("#msg").text("").css("color", "red");
    }
}