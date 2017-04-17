using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace cooktraveldemo.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Air()
        {
            ViewData["Message"] = "Your air page.";

            return View();
        }

        public IActionResult Hotel()
        {
            ViewData["Message"] = "Your hotel page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
