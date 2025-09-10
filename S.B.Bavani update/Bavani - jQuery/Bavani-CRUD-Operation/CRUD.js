 var productList=[];
	var selectedIndex=null;
	function isAllFieldValid(){
	var name=$("#txtname").val();
	var type=$("#txttype").val();
	var quantity=$("#txtquantity").val();
	var price=$("#txtprice").val();
    var isValid=true;
	if(name == "")
	{
	$("#nameErrormsg").show();
	isValid=false;
	}
	else{
	$("#nameErrormsg").hide();}
	if(type == "")
	{
	$("#typeErrormsg").show();
	isValid=false;
	}
	else{
	$("#typeErrormsg").hide();}
	if(quantity == "")
	{
	$("#quantityErrormsge").show();
	isValid=false;
	}
	else{
	$("#quantityErrormsge").hide();}
	if(price == "")
	{
	$("#priceErrormsg").show();
	isValid=false;}
	else{
	$("#priceErrormsg").hide();}
	return isValid;
	}
	function setButtonDisplay(displaymode){
	$("#addbtn").hide();
	$("#updatebtn").hide();
	$("#cancelbtn").hide();
    if(displaymode == "ADD"){
	$("#addbtn").show();}
    else if(displaymode == "UPDATE"){
	 $("#updatebtn").show();
	 $("#cancelbtn").show();}
	 }
function clearField() {
    $("#txtname").val("");
    $("#txttype").val("");
    $("#txtquantity").val("");
    $("#txtprice").val("");
    setButtonDisplay("ADD");
}
 function refreshTable()
 {
 $("#outputTable").empty();
 for (var i = 0; i < productList.length; i++) {
 $("#outputTable").append("<tr>" +"<td>" + (i + 1) + "</td>" +
 "<td>" + productList[i].ProductName + "</td>" +"<td>" + productList[i].ProductType + "</td>" +
 "<td>" + productList[i].ProductQuantity + "</td>" +"<td>" + productList[i].ProductPrice + "</td>" +
"<td>" + "<input type='button' value='Edit' style='color:green;' onclick='editFields(" + i + ")' /> " +
"<input type='button' value='Delete' style='color:red;' onclick='deleteFields(" + i + ")' />" +"</td></tr>");
    }
  }
	function updateFields(isAdd) {
    if (isAllFieldValid()) {
    var name = $("#txtname").val();
    var type = $("#txttype").val();
    var quantity = $("#txtquantity").val();
    var price = $("#txtprice").val();
    var userData = new userProduct();
    userData.ProductName = name;
    userData.ProductType = type;
    userData.ProductQuantity = quantity;
    userData.ProductPrice = price;
    if (isAdd) {
     productList.push(userData);
     alert("Product Added!");
        } 
	else {
      productList[selectedIndex] = userData;
      alert("Product Updated!");
        }
     refreshTable();
     clearField();
    }
}
	function editFields(i) {
    selectedIndex = i;
    $("#txtname").val(productList[i].ProductName);
    $("#txttype").val(productList[i].ProductType);
    $("#txtquantity").val(productList[i].ProductQuantity);
    $("#txtprice").val(productList[i].ProductPrice);
    setButtonDisplay("UPDATE");
}
	function cancelupdateFields(){
	clearField()
    alert("Edit Field Canceled");
	}
	function deleteFields(i)
	{
    if(confirm("Are You Sure Want to delete?"))
		{
	 productList.splice(i,1);
	 refreshTable();
	 alert("Product Deleted!");
    }
	}
	function userProduct()
	{
	this.ProductName="";
	this.ProductType="";
	this.ProductQuantity="";
	 this.ProductPrice="";
	}