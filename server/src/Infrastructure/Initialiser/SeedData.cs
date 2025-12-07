using System.Linq;
using System.Threading.Tasks;
using Api.Domain.Entities;
using Api.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Infrastructure.Initialiser
{
    public static class SeedData
    {
        public static async Task InitializeAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var provider = scope.ServiceProvider;

            var userManager = provider.GetRequiredService<UserManager<IdentityUser>>();
            var roleManager = provider.GetRequiredService<RoleManager<IdentityRole>>();
            var context = provider.GetRequiredService<ApplicationDbContext>();

            // Ensure DB created
            await context.Database.EnsureCreatedAsync();

            // Create roles
            var adminRole = "Admin";
            if (!await roleManager.RoleExistsAsync(adminRole))
                await roleManager.CreateAsync(new IdentityRole(adminRole));

            // Create admin user
            var adminEmail = "admin@example.com";
            var adminPassword = "Passw0rd!"; // demo only

            if (await userManager.FindByEmailAsync(adminEmail) == null)
            {
                var admin = new IdentityUser { UserName = adminEmail, Email = adminEmail, EmailConfirmed = true };
                var result = await userManager.CreateAsync(admin, adminPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, adminRole);
                }
            }

            // Seed products if none exist
            if (!await context.Products.AnyAsync())
            {
                var products = new[] {
                    new Product { Name = "T-Shirt", Description = "Comfortable cotton tee", Price = 19.99m },
                    new Product { Name = "Mug", Description = "Ceramic mug", Price = 9.99m },
                    new Product { Name = "Sticker Pack", Description = "Set of 5 stickers", Price = 4.99m }
                };

                context.Products.AddRange(products);
                await context.SaveChangesAsync();
            }
        }
    }
}

