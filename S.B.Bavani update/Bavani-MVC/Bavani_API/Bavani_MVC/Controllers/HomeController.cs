using Bavani_MVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Bavani_MVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        #region Login page methods

        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [Route("/validate/user")]
        public JsonResult validateLogin([FromBody] UserInfo inputData)
        {
            if (inputData != null && inputData.username == "Admin" && inputData.password == "1234")
            {
                return Json(new
                {
                    success = true,
                    message = "Login successful"
                });
            }

            return Json(new
            {
                success = false,
                message = "Invalid UserName or PassWord."
            });
        }
#endregion


        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Dashboard()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}