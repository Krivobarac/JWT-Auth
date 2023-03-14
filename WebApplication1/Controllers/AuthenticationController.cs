using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections;
using System.Collections.Specialized;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Reflection.PortableExecutable;
using System.Runtime.Intrinsics.X86;
using System.Security.Claims;
using System.Text;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        //private readonly IConfiguration iconfiguration;

        //AuthenticationController(IConfiguration iconfiguration)
        //{
        //    this.iconfiguration = iconfiguration ?? throw new ArgumentNullException(nameof(iconfiguration));
        //}



        [HttpPost("login")]
        public IActionResult Login([FromBody] Login user)
        {
            if (user is null)
            {
                return BadRequest("Invalid user request!!!");
            }
            if (user.UserName == "Jaydeep" && user.Password == "Pass@777")
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, "Manager"),
                    new Claim("Roles", "Manager"),
                    new Claim(ClaimTypes.Role, "Guest"),
                    new Claim("Roles", "Guest"),
                    new Claim("RememberMe", user.RememberMe ?? "false"),
                    
                };

                if (!string.IsNullOrEmpty(user.Fingerprint))
                {
                    claims.Add(new Claim("Fingerprint", user.Fingerprint));
                }

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationService.AppSetting["JWT:Secret"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: ConfigurationService.AppSetting["JWT:ValidIssuer"],
                    audience: ConfigurationService.AppSetting["JWT:ValidAudience"],
                    claims: claims,
                    //expires: DateTime.Now.AddMinutes(1),
                    // If there is StayIn token will be placed in localstorage else into session
                    signingCredentials: signinCredentials
                    
                    );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new JWTTokenResponse
                {
                    Token = tokenString
                });
            }
            return Unauthorized();
        }
    }
}
