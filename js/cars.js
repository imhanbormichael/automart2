// frontend/js/cars.js
export const cars = [
  {
    id: 1,
    title: "2023 BMW M4 Competition",
    price: "$78,500",
    location: "Los Angeles, CA",
    image: "/assets/images/bmw.png",
    condition: "Used",
    description: "Stunning BMW M4 Competition with carbon fiber package, M Sport exhaust, and premium Vernasca leather interior. One owner, garage kept, all service records available.",
    specs: [
      { label: "Make", value: "BMW" },
      { label: "Model", value: "M4" },
      { label: "Year", value: "2023" },
      { label: "Mileage", value: "8,500 mi" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Petrol" }
    ],
    images: [
      "/assets/images/bmw.png",
      "/assets/images/bmw2.png",
      "/assets/images/bmw3.png"
    ],
    seller: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      memberSince: "2023",
      email: "james@example.com",
      phone: "+1 555-0101"
    }
  },
  {
    id: 2,
    title: "2024 Mercedes-AMG GT",
    price: "$125,000",
    location: "Miami, FL",
    image: "/assets/images/mercedes.png",
    condition: "New",
    description: "Brand new Mercedes-Benz S-Class 580 with Executive Rear Seat Package. Burmester 4D surround sound, MBUX infotainment, and advanced driver assistance..",
    specs: [
      { label: "Make", value: "Mercedes" },
      { label: "Model", value: "AMG GT" },
      { label: "Year", value: "2024" },
      { label: "Mileage", value: "150 mi" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Petrol" }
    ],
    images: ["/assets/images/mercedes.png"],
    seller: {
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      memberSince: "2022",
      email: "elena@example.com",
      phone: "+1 555-0202"
    }
  },
  {
    id: 3,
    title: "2022 Porsche 911 Carrera S",
    price: "$135,000",
    location: "New York, NY",
    image: "/assets/images/porsche.png",
    condition: "Used",
    description: "Immaculate Porsche 911 Carrera S with Sport Chrono Package, adaptive suspension, and premium leather interior. Meticulously maintained with low mileage.",
    specs: [
      { label: "Make", value: "Porsche" },
      { label: "Model", value: "911 Carrera S" },
      { label: "Year", value: "2022" },
      { label: "Mileage", value: "12,000 mi" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Petrol" }
    ],
    images: ["/assets/images/porsche.png"],
    seller: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      memberSince: "2021",
      email: "michael@example.com",
      phone: "+1 555-0303"
    }
  },
  {
    id: 4,
    title: "2023 Tesla Model S Plaid",
    price: "$89,000",
    location: "San Francisco, CA",
    image: "/assets/images/tesla.png",
    condition: "Used",
    description: "Tesla Model S Plaid with Full Self-Driving capability. Yoke steering wheel, premium white interior, and glass roof. Supercharger access included.",
    specs: [
      { label: "Make", value: "Tesla" },
      { label: "Model", value: "Model S Plaid" },
      { label: "Year", value: "2023" },
      { label: "Mileage", value: "5,000 mi" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Electric" }
    ],
    images: ["/assets/images/tesla.png"],
    seller: {
      name: "Sarah Kim",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      memberSince: "2023",
      email: "sarah@example.com",
      phone: "+1 555-0404"
    }
  },
  {
    id: 5,
    title: "2024 Audi RS e-tron GT",
    price: "$155,000",
    location: "Chicago, IL",
    image: "/assets/images/audi.png",
    condition: "New",
    description: "All-electric Audi RS e-tron GT in Kemora Gray. Carbon ceramic brakes, Bang & Olufsen 3D sound, and Matrix LED headlights with laser light.",
    specs: [
      { label: "Make", value: "Audi" },
      { label: "Model", value: "RS e-tron GT" },
      { label: "Year", value: "2024" },
      { label: "Mileage", value: "500 mi" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Electric" }
    ],
    images: ["/assets/images/audi.png"],
    seller: {
      name: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      memberSince: "2022",
      email: "david@example.com",
      phone: "+1 555-0505"
    }
  },
  {
    id: 6,
    title: "2021 Ford Mustang GT",
    price: "$45,000",
    location: "Houston, TX",
    image: "/assets/images/ford.png",
    condition: "Used",
    description: "Classic American muscle. Ford Mustang GT with 5.0L V8, performance pack level 2, Recaro seats, and active valve exhaust system.",
    specs: [
      { label: "Make", value: "Ford" },
      { label: "Model", value: "Mustang GT" },
      { label: "Year", value: "2021" },
      { label: "Mileage", value: "22,000 mi" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Petrol" }
    ],
    images: ["/assets/images/ford.png"],
    seller: {
      name: "Robert Martinez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      memberSince: "2020",
      email: "robert@example.com",
      phone: "+1 555-0606"
    }
  }
];