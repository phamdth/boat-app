export interface Boat {
  id: number;              // Unique identifier for the boat
  name: string;            // Name of the boat
  description: string;     // Description of the boat
  type: string;            // Type of boat
  length: number;          // Length of the boat in feet
  width: number;           // Width of the boat in feet
  capacity: number;        // Passenger capacity
  yearBuilt: number;       // Year the boat was built
  price: number;           // Price of the boat
  imageUrl: string;        // URL for the boat image
  status: string;          // Current status of the boat
}
