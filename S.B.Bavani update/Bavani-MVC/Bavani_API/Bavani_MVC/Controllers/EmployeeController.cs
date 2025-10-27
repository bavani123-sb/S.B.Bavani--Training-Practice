using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace Bavani_MVC.Controllers
{
    public class EmployeeController : Controller
    {
        public List<EmployeeInfo> employeeList = new List<EmployeeInfo>();

        #region Form and List page methods

        public IActionResult EmployeeForm()
        {
            return View();
        }

        [HttpPost]
        [Route("employee/get")]
        public JsonResult Form([FromBody] EmployeeInfo inputData)
        {
            if (inputData != null &&
                (inputData.Name == "Alice" && inputData.Position == "Developer"))
            {
                employeeList.Add(inputData);

                return Json(new
                {
                    success = true,
                    message = "Employee added successfully"
                });
            }

            return Json(new
            {
                success = false,
                message = "Invalid Name or Position."
            });
        }

        #endregion

      /*  [HttpGet]
        public IActionResult EmployeeList()
        {
            for (int i = 0; i < 3; i++)
            {
                EmployeeInfo employee = new EmployeeInfo();
                employee.Name = "Alice" + i;
                employee.Position = "Developer";
                employeeList.Add(employee);
            }

            return View(employeeList);

        }*/
        [HttpGet]
        public async Task<IActionResult> EmployeeList()
        {
            ResponseResult result = new ResponseResult();

            List<EmployeeInfo> EmployeeList = new List<EmployeeInfo>();
            using (var httpClient = new HttpClient())
            {
                try
                {
                    var response = await httpClient.GetAsync("https://localhost:7165/api/employee/list");

                    if (response.IsSuccessStatusCode)
                    {
                        result = await response.Content.ReadFromJsonAsync<ResponseResult>();
                        if (result.Status)
                        {
                            EmployeeList = System.Text.Json.JsonSerializer.Deserialize<List<EmployeeInfo>>(result.Data.ToString());
                            result.Data = EmployeeList;
                        }
                    }
                }
                catch (Exception)
                {
                    result.Status = false;
                    result.Message = "Error fetching data from API.";
                }

            }
            return View(result.Data);
        }
        public class ResponseResult
        {
            public bool Status { get; set; }
            public string Message { get; set; }
            public object Data { get; set; }

        }
    }
}
