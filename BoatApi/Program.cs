//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

////var summaries = new[]
////{
////    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
////};

////app.MapGet("/weatherforecast", () =>
////{
////    var forecast =  Enumerable.Range(1, 5).Select(index =>
////        new WeatherForecast
////        (
////            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
////            Random.Shared.Next(-20, 55),
////            summaries[Random.Shared.Next(summaries.Length)]
////        ))
////        .ToArray();
////    return forecast;
////})
////.WithName("GetWeatherForecast")
////.WithOpenApi();

//app.Run();

////record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
////{
////    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
////}

using BoatApi;


var builder = WebApplication.CreateBuilder(args);

// Pass IConfiguration to Startup
var startup = new Startup(builder.Configuration);

// Use Startup class to configure services and the app
//var startup = new Startup();
startup.ConfigureServices(builder.Services); // Call the ConfigureServices method

var app = builder.Build();

// Call the Configure method to set up the request pipeline
startup.Configure(app, app.Environment); // Call the Configure method

app.Run();
