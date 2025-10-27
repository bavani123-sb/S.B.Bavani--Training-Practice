using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bavani_API_Sample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [Route("list")]
        [HttpGet]
        public ActionResult GetList()
        {
            //List<EmployeeInfo> users = new List<EmployeeInfo>();
            var users = new List<EmployeeInfo>
     {
        new EmployeeInfo { Name = "Alice", Position = "Manager" },
        new EmployeeInfo { Name = "John", Position = "Developer" },
        new EmployeeInfo { Name = "Sarah", Position = "Designer" },
        new EmployeeInfo { Name = "Mohamad", Position = "Tester" }
     };

            if (users == null || users.Count == 0)
            {
                var errorResponse = new APIResponse
                {
                    Status = false,
                    Message = "No data found",
                    Data = null
                };
                return BadRequest(errorResponse);
            }

            var successResponse = new APIResponse
            {
                Status = true,
                Message = "Data retrieved successfully",
                Data = users
            };
            return Ok(successResponse);
        }

    }

}


