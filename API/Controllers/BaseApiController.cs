using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            return result switch
            {
                { IsSuccess: true } => Ok(result.Value),
                { IsFailed: true } => NotFound(),
                _ => BadRequest(result.Errors)
            };
        }
    }
}