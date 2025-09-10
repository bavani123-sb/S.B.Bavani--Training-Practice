var productList = [];
var selectedIndex = null;
function userProduct() {
this.ProductName = "";
this.ProductType = "";
this.ProductQuantity = "";
this.ProductPrice = "";
}
function isAllFieldValid() {
var name = $("#txtname").val().trim();
var type = $("#txttype").val().trim();
var quantity = $("#txtquantity").val().trim();
var price = $("#txtprice").val().trim();
var isValid = true;
if(name == "")
{ 
$("#nameErrormsg").show(); isValid = false; 
}
else { $("#nameErrormsg").hide();
}
if(type == "")
{ 
$("#typeErrormsg").show(); isValid = false;
} 
else { $("#typeErrormsg").hide();
}
if(quantity == "")
{
$("#quantityErrormsg").show(); isValid = false;
}
else { $("#quantityErrormsg").hide();
}
if(price == "")
{ 
$("#priceErrormsg").show(); isValid = false;
} 
else {
$("#priceErrormsg").hide();
}
var duplicateIndex = productList.findIndex((product, index) => 
index !== selectedIndex && product.ProductName == name
);
if (duplicateIndex !== -1) {
$("#duplicateErrormsg").show();
isValid = false;
} else {
$("#duplicateErrormsg").hide();
}
return isValid;
}
function setButtonDisplay(displayMode) {
$("#addbtn").hide();
$("#updatebtn").hide();
$("#cancelbtn").hide();
if(displayMode == "ADD") $("#addbtn").show();
else if(displayMode == "UPDATE") { $("#updatebtn").show(); $("#cancelbtn").show(); }
}
function clearField() {
$("#txtname").val("");
$("#txttype").val("");
$("#txtquantity").val("");
$("#txtprice").val("");
selectedIndex = null;
setButtonDisplay("ADD");
}
function refreshTable() {
$("#outputTable").empty();
for(var i=0; i<productList.length; i++) {
$("#outputTable").append(
"<tr>" +"<td>" + (i+1) + "</td>" +"<td>" + productList[i].ProductName + "</td>" +"<td>" + productList[i].ProductType + "</td>" +
"<td>" + productList[i].ProductQuantity + "</td>" +"<td>" + productList[i].ProductPrice + "</td>" +"<td>" +
"<input type='button' value='Edit' style='color:green;' onclick='editFields(" + i + ")' /> " +"<input type='button' value='Delete' style='color:red;' onclick='deleteFields(" + i + ")' />" +"</td>" +"</tr>");
}}
function editFields(i) {
$("#txtname").val(productList[i].ProductName);
$("#txttype").val(productList[i].ProductType);
$("#txtquantity").val(productList[i].ProductQuantity);
$("#txtprice").val(productList[i].ProductPrice);
selectedIndex = i;
setButtonDisplay("UPDATE");
}
function updateFields(isAdd) {
if(isAllFieldValid()) {
var userData = new userProduct();
userData.ProductName = $("#txtname").val();
userData.ProductType = $("#txttype").val();
userData.ProductQuantity = $("#txtquantity").val();
userData.ProductPrice = $("#txtprice").val();
if(isAdd)
 {
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
function cancelupdateFields() {
clearField();
alert("Edit Field Canceled");
}
function deleteFields(i) {
if(confirm("Are You Sure Want to delete this product?"))
 {
productList.splice(i, 1);
refreshTable();
alert("Product Deleted!");
}
}
function searchProduct(name) {
var resultsDiv = $("#searchResults");
resultsDiv.empty();
if (name == "") {
	resultsDiv.hide();
	return;
}
var results = productList.filter((p, i) =>
	p.ProductName.toLowerCase().indexOf(name.toLowerCase()) !== -1);
if (results.length) {
results.forEach(p => {
resultsDiv.append("<div onclick='selectProduct(\"" + p.ProductName + "\")'>" + p.ProductName + "</div>");});
resultsDiv.show();
setButtonDisplay("UPDATE");
} else 
{
	resultsDiv.hide();
}}
function selectProduct(name) {
var index = productList.findIndex(p => p.ProductName === name);
if (index !== -1) {
var product = productList[index];
$("#txtname").val(product.ProductName);
$("#txttype").val(product.ProductType);
$("#txtquantity").val(product.ProductQuantity);
$("#txtprice").val(product.ProductPrice);
}
$("#searchResults").hide();
$("#searchBox").val("");
}