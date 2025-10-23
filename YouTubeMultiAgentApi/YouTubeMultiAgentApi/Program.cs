using Microsoft.EntityFrameworkCore;
using System.Runtime;
using YouTubeMultiAgentApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Services.Configure<YouTubeSettings>(
	builder.Configuration.GetSection("Values"));



builder.Services.AddDbContext<YouTubeContext>(options =>
			options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")
));

builder.Services.AddHttpClient("YouTube", client =>
{
	client.BaseAddress = new Uri(builder.Configuration["Values:YouTubeApiUrl"]);
});


builder.Services.AddTransient<IYouTubeService, YouTubeService>();
builder.Services.AddTransient<IDatabaseService, DatabaseService>();

builder.Services.AddCors(options =>
{
	options.AddPolicy("CorsPolicy", policy =>
	{
		policy.WithOrigins("http://localhost:4200")
		.AllowAnyMethod()
		.AllowAnyHeader()
		.AllowCredentials();
	});
});


var app = builder.Build();

app.UseCors("CorsPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
