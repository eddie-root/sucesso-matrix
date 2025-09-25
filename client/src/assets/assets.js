import logo from "./horizontal3.png";
import profile_icon from "./profile_icon.png";
import nav_cart_icon from "./nav_cart_icon.svg";
import menu_icon from "./menu_icon.png";
import dropdown_icon from "./dropdown_icon.png";
import main_banner_bg from "./hero1.webp";
import sofacama_image from "./p_img10.jpg";
import poltronaReclinavel_image from "./p_img30.jpg";
import poltronaBalanço_image from "./p_img25.jpg";
import poltronaDecorativa_image from "./p_img111.jpg";
import puffs_image from "./p_img48.jpg";
import contact_image from "./contact_img.png";
import add_icon from "./add_icon.svg";
import product_list from "./product_list_icon.svg";


export const assets = {
  logo,
  main_banner_bg,
  profile_icon,
  nav_cart_icon,
//   remove_icon,
  dropdown_icon,
  menu_icon,
  contact_image,
  add_icon,
  product_list,

  
};

export const categories = [
  {
    text: "Sofá Cama",
    path: "sofa-cama",
    image: sofacama_image,
    // bgColor: "#FEF6DA",
  },
  {
    text: "Poltrona Reclinável",
    path: "poltrona_reclinavel",
    image: poltronaReclinavel_image,
    // bgColor: "#FEE0E0",
  },
  {
    text: "Poltrona c/ Balanço",
    path: "poltrona_c_balanço",
    image: poltronaBalanço_image,
    // bgColor: "#F0F5DE",
  },
  {
    text: "Poltrona Decorativa",
    path: "poltrona_decorativa",
    image: poltronaDecorativa_image,
    // bgColor: "#E1F5EC",
  },
  {
    text: "Puffs",
    path: "puffs",
    image: puffs_image,
    // bgColor: "#FEE6CD",
  },
  
];

export const dummyProducts = [
  // Vegetables
  {
    _id: "gd46g23h",
    cod: '00568.0',
    name: "AMORA NEW",
    category: "sofa-cama",
    tecidos: ['B','C','D','E','F','G','I','L'],
    priceCents: {b: 98682, c: 101027, d: 103372, e: 105717, f: 108063, g: 0, i: 0, l: 0},
    image: [''],
    description: [
      'Conjunto Penelope Tecido: E-401 Veludo maserati', 
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "gd47g34h",
    cod: '00584.0',
    name: "CELINE",
    category: "sofa-cama",
    tecidos: ['B','C','D','E','F','G','I','L'],
    priceCents: {'b':234399, 'c': 239866, 'd': 245333, 'e': 250800, 'f': 256267},
    image: [''],
    description: [
      "Juicy and ripe",
      "Rich in Vitamin C",
      "Perfect for salads and sauces",
      "Farm fresh quality",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "gd48g45h",
    cod: '00004.0',
    name: "DAIANE",
    category: "sofa-cama",
    tecidos: ['B','C','D','E','F','G','I','L'],
    priceCents: {'b': 75797, 'c': 77383, 'd': 79268, 'e': 81153, 'f': 83038},
    image: [''],
    description: [
      "Sweet and crunchy",
      "Good for eyesight",
      "Ideal for juices and salads",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  
  },  {
    _id: "ek51j12k",
    cod: '00609.0',
    name: "AUDI MX-37",
    category: "poltrona_reclinavel",
    tecidos: ['B','C','D','E','F'],
    priceCents: {'b': 44869, 'c': 126618, 'd': 132982, 'e': 136165, 'f': 139347},
    image: [''],
    description: [
      'SofÁ cama Emilia Tecido: E-456 Corriente',
    
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "ek52j23k",
    cod: '00685.0',
    name: "COMMANDER MX-66",
    category: "poltrona_reclinavel",
    tecidos: ['B','C','D','E','F'],
    priceCents: {'b': 28487, 'c': 148114, 'd': 150820, 'e': 153526, 'f': 156232},
    image: [''],
    description: [
      'SofÁ cama Emilia Tecido: E-456 Corriente',
      
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek53j34k",
    cod: '00127.0',
    name: "PALLAS MX-5",
    category: "poltrona_reclinavel",
    tecidos: ['B','C','D','E','F'],
    priceCents: {'b': 44869, 'c': 126618, 'd': 132982, 'e': 136165, 'f': 139347},
    image: [''],
    description: [
      "Sweet and ripe",
      "High in potassium",
      "Great for smoothies and snacking",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",

  },]