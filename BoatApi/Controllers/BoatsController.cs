using BoatApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BoatApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoatsController : ControllerBase
    {
        private static List<Boat> boats = new List<Boat>();
        private static int nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<Boat>> GetBoats()
        {
            return Ok(boats);
        }

        [HttpGet("{id}")]
        public ActionResult<Boat> GetBoat(int id)
        {
            var boat = boats.FirstOrDefault(b => b.Id == id);
            if (boat == null)
            {
                return NotFound();
            }
            return Ok(boat);
        }

        [HttpPost]
        public ActionResult<Boat> CreateBoat([FromBody] Boat boat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            boat.Id = nextId++;
            boats.Add(boat);
            return CreatedAtAction(nameof(GetBoat), new { id = boat.Id }, boat);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateBoat(int id, [FromBody] Boat updatedBoat)
        {
            if (id != updatedBoat.Id || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var boatIndex = boats.FindIndex(b => b.Id == id);
            if (boatIndex == -1)
            {
                return NotFound();
            }

            boats[boatIndex] = updatedBoat;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteBoat(int id)
        {
            var boatIndex = boats.FindIndex(b => b.Id == id);
            if (boatIndex == -1)
            {
                return NotFound();
            }

            boats.RemoveAt(boatIndex);
            return NoContent();
        }
    }
}
