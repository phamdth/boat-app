using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BoatApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLogin model)
        {
            // Hardcoded user for demo purposes
            if (model.Username == "admin" && model.Password == "password")
            {
                var token = GenerateJwtToken();
                return Ok(new { Token = token });
            }
            return Unauthorized();
        }

        private string GenerateJwtToken()
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");


            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings["Key"] ?? throw new ArgumentNullException("JWT key cannot be null")));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, "admin"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var issuer = jwtSettings["Issuer"] ?? throw new ArgumentNullException("Issuer", "JWT Issuer cannot be null");
            var audience = jwtSettings["Audience"] ?? throw new ArgumentNullException("Audience", "JWT Audience cannot be null");
            var durationInMinutesStr = jwtSettings["DurationInMinutes"] ?? throw new ArgumentNullException("DurationInMinutes", "JWT Duration cannot be null");

            // Safely parse the duration string to double
            if (!double.TryParse(durationInMinutesStr, out double durationInMinutes))
            {
                throw new FormatException("Invalid format for JWT DurationInMinutes.");
            }

            // Create the token
            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(durationInMinutes),
                signingCredentials: creds);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class UserLogin
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}
