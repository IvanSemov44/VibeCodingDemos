using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain.Entities;
using Api.Application.Interfaces;
using Api.Application.DTOs;

namespace Api.Infrastructure.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;

        public ProductService(IProductRepository repo)
        {
            _repo = repo;
        }


        public async Task<List<ProductDto>> GetProductsAsync()
        {
            var products = await _repo.GetAllAsync();
            var dtos = new List<ProductDto>();
            foreach (var p in products)
            {
                dtos.Add(MapToDto(p));
            }
            return dtos;
        }

        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            var p = await _repo.GetByIdAsync(id);
            return p == null ? null : MapToDto(p);
        }

        public async Task<ProductDto> CreateProductAsync(CreateProductDto product)
        {
            if (product.Price < 0) throw new ArgumentException("Price must be non-negative", nameof(product.Price));
            var entity = new Product
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                ImageUrl = product.ImageUrl
            };
            var created = await _repo.AddAsync(entity);
            return MapToDto(created);
        }

        public async Task UpdateProductAsync(int id, UpdateProductDto product)
        {
            if (product.Price < 0) throw new ArgumentException("Price must be non-negative", nameof(product.Price));
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) throw new ArgumentException("Product not found", nameof(id));
            existing.Name = product.Name;
            existing.Description = product.Description;
            existing.Price = product.Price;
            existing.ImageUrl = product.ImageUrl;
            await _repo.UpdateAsync(existing);
        }

        public async Task DeleteProductAsync(int id)
        {
            await _repo.DeleteAsync(id);
        }

        private static ProductDto MapToDto(Product p)
        {
            return new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                ImageUrl = p.ImageUrl
            };
        }
    }
}
