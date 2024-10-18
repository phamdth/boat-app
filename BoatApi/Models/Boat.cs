using System.ComponentModel.DataAnnotations;

namespace BoatApi.Models
{
    public class Boat
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Boat name is required.")]
        [StringLength(50, ErrorMessage = "Boat name cannot be longer than 50 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Boat description is required.")]
        [StringLength(300, ErrorMessage = "Boat description cannot be longer than 300 characters.")]
        public string? Description { get; set; }
        public string? Type { get; set; }
        public double? Length { get; set; }
        public double? Width { get; set; }
        public int? Capacity { get; set; }
        public int? YearBuilt { get; set; }
        public decimal? Price { get; set; }
        public string? ImageUrl { get; set; }
        public string? Status { get; set; }
    }
}
