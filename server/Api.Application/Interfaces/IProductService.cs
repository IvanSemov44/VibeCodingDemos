using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Application.DTOs;

namespace Api.Application.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetProductsAsync();
        Task<ProductDto?> GetProductByIdAsync(int id);
        Task<ProductDto> CreateProductAsync(CreateProductDto product);
        Task UpdateProductAsync(int id, UpdateProductDto product);
        Task DeleteProductAsync(int id);
    }
}
