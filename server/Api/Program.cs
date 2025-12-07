using Api.Infrastructure.Initialiser;
using Api.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? builder.Configuration["ConnectionStrings:DefaultConnection"] ?? "Host=postgres;Database=vibe_demo;Username=postgres;Password=postgres";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ensure database is available and seed
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    try
    {
        var db = services.GetRequiredService<ApplicationDbContext>();

        // Wait for the database to accept connections (avoid race with Postgres container startup)
        var maxAttempts = 30;
        var delay = TimeSpan.FromSeconds(2);
        var connected = false;
        for (var attempt = 1; attempt <= maxAttempts; attempt++)
        {
            try
            {
                logger.LogInformation("Checking database connectivity (attempt {Attempt}/{Max})...", attempt, maxAttempts);
                if (await db.Database.CanConnectAsync())
                {
                    connected = true;
                    logger.LogInformation("Database is reachable.");
                    break;
                }
            }
            catch (Exception ex)
            {
                logger.LogWarning(ex, "Database not ready yet (attempt {Attempt}/{Max}). Retrying in {Delay}s...", attempt, maxAttempts, delay.TotalSeconds);
            }
            await Task.Delay(delay);
        }

        if (!connected)
        {
            logger.LogError("Could not connect to the database after {Max} attempts.", maxAttempts);
            throw new Exception("Timed out waiting for the database to be available.");
        }

        // Ensure created and run seeding
        await db.Database.EnsureCreatedAsync();
        await SeedData.InitializeAsync(services);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred creating/seeding the DB.");
        throw; // rethrow to stop startup so the container logs the failure
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
