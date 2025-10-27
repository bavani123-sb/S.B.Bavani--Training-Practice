function isValidEmployee()
{
    var name = $("#empName").val();
    var position = $("#empPosition").val();
    var isValid = true;

    if (name == "") {
        $("#nameError").show();
        isValid = false;
    } else {
        $("#nameError").hide();
    }

    if (position == "") {
        $("#positionError").show();
        isValid = false;
    } else {
        $("#positionError").hide();
    }

    return isValid;
}

function addEmployee() {
    if (isValidEmployee()) {
        var name = $("#empName").val();
        var position = $("#empPosition").val();

        var emp = {
            Name: name,
            Position: position
        };
        $.ajax({
            url: '/api/employee/update',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(emp),
            success: function (response) {
                alert(response.message && "Employee added successfully");

                $("#empName").val("");
                $("#empPosition").val("");

                //loadEmployeeList();
            },
            error: function () {
                alert("Failed");
            }
        });
    }
}




