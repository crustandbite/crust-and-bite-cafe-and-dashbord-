export interface MenuItem {
  id: number
  name: string
  category: string
  description: string
  image: string
  price: number
  availability: boolean
  veg: boolean
  popular?: boolean
  variants?: { size: string; price: number }[]
}

// --- CATEGORIES LIST (Lovable Order) ---
export const CATEGORIES = [
  'All',
  'Pizza Mania',
  'Veg Pizza',
  'NonVeg Pizza',
  'Delicious Sides',
  'Grilled Sandwich',
  'Burger',
  'Rolls',
  'Quick Bites',
  'Mojitos',
  'Falooda',
  'Milk Shakes',
  'Desserts'
];

// --- MENU DATA ---
export const MENU_ITEMS: MenuItem[] = [
  // Veg Pizza (Variant size support)
  {
    id: 1,
    name: 'Margherita',
    category: 'Veg Pizza',
    description: 'Classic cheese and tomato sauce base.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwE33Ce4vv_zLgYuUTvNaxU1Pjs85nM0Pua3HTt4UPw&s=10',
    price: 99,
    availability: true,
    veg: true,
    popular: true,
    variants: [
      { size: 'R', price: 99 },
      { size: 'M', price: 160 }
    ]
  },
  {
    id: 2,
    name: 'Farmhouse',
    category: 'Veg Pizza',
    description: 'Delightful combination of fresh farm vegetables.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Q7a9w-sEbEkDriXGMGPsa_fq_0U6sBbkR96L8GpMPA&s=10',
    price: 150,
    availability: true,
    veg: true,
    popular: true,
    variants: [
      { size: 'R', price: 150 },
      { size: 'M', price: 190 }
    ]
  },
  {
    id: 3,
    name: 'Veggie Paradise',
    category: 'Veg Pizza',
    description: 'Loaded with capsicum, golden corn, and olives.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS15amGbFE96ClG20F3IPj99bo1hQj90uY9BOY0jv5XoA&s=10',
    price: 140,
    availability: true,
    veg: true,
    variants: [
      { size: 'R', price: 140 },
      { size: 'M', price: 180 }
    ]
  },
  {
    id: 4,
    name: 'Cheese Corn',
    category: 'Veg Pizza',
    description: 'Golden sweet corn paired with liquid cheese layer.',
    image: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/corn-&-cheese.2d0ca196e3f309375afeeb35a7ff565b.1.jpg',
    price: 110,
    availability: true,
    veg: true,
    variants: [
      { size: 'R', price: 110 },
      { size: 'M', price: 160 }
    ]
  },
  {
    id: 5,
    name: 'Double Cheese Margherita',
    category: 'Veg Pizza',
    description: 'Extra loaded mozzarella cheese on Margherita base.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjZE6wgNiKsD8UfINofOr0iP7EUbTgGvavIrJj8gNZQfx1gWz7avR_Bo&s=10',
    price: 130,
    availability: true,
    veg: true,
    variants: [
      { size: 'R', price: 130 },
      { size: 'M', price: 230 }
    ]
  },
  {
    id: 6,
    name: 'Mexican Green Wave',
    category: 'Veg Pizza',
    description: 'Spicy jalapeno, onions, and capsicum blend.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzJL0SzhYTZYgE5kK-NKkttRQnRORN24up6KR5LDj9Gg&s=10',
    price: 140,
    availability: true,
    veg: true,
    variants: [
      { size: 'R', price: 140 },
      { size: 'M', price: 180 }
    ]
  },
  {
    id: 7,
    name: 'Fresh Veggie',
    category: 'Veg Pizza',
    description: 'Crisp onions and capsicum toppings.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZqcE5ZaRUgnpuBrZE6iKjNY50_l75WJtroPzYnTKor6_aWY6OZzx1gk&s=10',
    price: 120,
    availability: true,
    veg: true,
    variants: [
      { size: 'R', price: 120 },
      { size: 'M', price: 180 }
    ]
  },
  {
    id: 8,
    name: 'Indi Tandoori Paneer',
    category: 'Veg Pizza',
    description: 'Traditional spiced tandoori paneer cubes and green capsicum.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjyucH3MdqVdIZZnRBIfGO6A-hO7sB-UtrgYg4mD5YWw&s=10',
    price: 170,
    availability: true,
    veg: true,
    variants: [
      { size: 'R', price: 170 },
      { size: 'M', price: 230 }
    ]
  },

  // NonVeg Pizza (Variant size support)
  {
    id: 9,
    name: 'Chicken Golden Delight',
    category: 'NonVeg Pizza',
    description: 'Golden double chicken chunks layered with extra mozzarella.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRWqh0iEBEbv42XiAaZC_t4KQ_xO5pATC9-XHUsXN0vw&s=10',
    price: 150,
    availability: true,
    veg: false,
    popular: true,
    variants: [
      { size: 'R', price: 150 },
      { size: 'M', price: 260 }
    ]
  },
  {
    id: 10,
    name: 'Indi Chicken Tikka',
    category: 'NonVeg Pizza',
    description: 'Spiced chicken tikka cubes, onions, and red paprika.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsv7gmCxYiKbdva9UNiifezYsU6rBaldPziYAxFOnC169VLpQZc7aLmbqc&s=10',
    price: 199,
    availability: true,
    veg: false,
    popular: true,
    variants: [
      { size: 'R', price: 199 },
      { size: 'M', price: 270 }
    ]
  },

  // Pizza Mania (Standard size)
  {
    id: 11,
    name: 'Onion',
    category: 'Pizza Mania',
    description: 'Classic onion toppings with liquid cheese.',
    image: 'https://itallianbox.com/wp-content/uploads/2025/09/Pizza-Mania-Onion-scaled.jpg',
    price: 69,
    availability: true,
    veg: true
  },
  {
    id: 12,
    name: 'Capsicum',
    category: 'Pizza Mania',
    description: 'Crisp capsicum slices on a cheesy base.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMIf8h563QfkOtpkETv7nZYi3wJXa4JSrRfEgjEQXJtQ&s=10',
    price: 69,
    availability: true,
    veg: true
  },
  {
    id: 13,
    name: 'Golden Corn',
    category: 'Pizza Mania',
    description: 'Sweet golden corn kernels with melted cheese.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaHWFv1kTYmk9-hAPGoSY8RHjxO0sWctGNND9DZclwKw&s=10',
    price: 69,
    availability: true,
    veg: true
  },
  {
    id: 14,
    name: 'Paneer',
    category: 'Pizza Mania',
    description: 'Fresh spiced paneer cottage cheese cubes.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmJwDR5Zhu_3v_i7SHjrfTXKH7eaVdEEZJDiOR9eujcg&s=10',
    price: 79,
    availability: true,
    veg: true
  },

  // Delicious Sides
  {
    id: 15,
    name: 'Stuffed Garlic Bread',
    category: 'Delicious Sides',
    description: 'Garlic bread stuffed with creamy sweet corn and cheese.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgonJQPI2wU2gUoWTdRNEDjBeMWtHK2JIXuWkn3GJlnUDqQdaI_30SeKma&s=10',
    price: 109,
    availability: true,
    veg: true,
    popular: true
  },
  {
    id: 16,
    name: 'Paneer Tikka Stuffed Garlic Bread',
    category: 'Delicious Sides',
    description: 'Warm garlic bread stuffed with paneer tikka filling.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNnT3efcNZCgqspOsFCa9khGvPiu5HW5nuEGa4RsqCmwaJbKJj-sR9z8yF&s=10',
    price: 129,
    availability: true,
    veg: true
  },
  {
    id: 17,
    name: 'Chicken Pepperoni Stuffed Garlic Bread',
    category: 'Delicious Sides',
    description: 'Loaded with chicken pepperoni chunks and cheese.',
    image: ' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTEJiES4eNZ3jfCbHrf3c_jVaGh65YXQ4XnhfTEj2KDSnjwWJnjf6FbPg&s=10',
    price: 135,
    availability: true,
    veg: false,
    popular: true
  },

  // Grilled Sandwich
  {
    id: 18,
    name: 'Veg Sandwich',
    category: 'Grilled Sandwich',
    description: 'Fresh sliced vegetables with mint spread.',
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2013/07/corn-sandwich-recipe-1.jpg',
    price: 55,
    availability: true,
    veg: true
  },
  {
    id: 19,
    name: 'Chicken Sandwich',
    category: 'Grilled Sandwich',
    description: 'Spiced chicken chunks with light mayonnaise.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxQpzVp6qc_shmNewT9UxR1c7egn3NTM_6V0n7x-E3NdzJJRWlLLurXYPf&s=10',
    price: 70,
    availability: true,
    veg: false,
    popular: true
  },
  {
    id: 20,
    name: 'Sweet Corn Sandwich',
    category: 'Grilled Sandwich',
    description: 'Golden sweet corn kernels and butter spread.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCzc57gE6EzGWOAQnwSet6n1VxpWalN9PqMWaOeqSPbQ&s=10',
    price: 49,
    availability: true,
    veg: true
  },
  {
    id: 21,
    name: 'Club Sandwich',
    category: 'Grilled Sandwich',
    description: 'Double layered classic club sandwich with cheese.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB_j5dKm17wI2WcHsuytDnYhv0J3Tv_qgX10PwgLdUHg2hvN3_GsNhYPDY&s=10',
    price: 120,
    availability: true,
    veg: true
  },
  {
    id: 22,
    name: 'Paneer Sandwich',
    category: 'Grilled Sandwich',
    description: 'Marinated paneer slices grilled in bread.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBLm7aLtomCFs_ukJpNp4AADVWgnnwIO_DHhdJp0jXWw&s=10',
    price: 99,
    availability: true,
    veg: true
  },

  // Burger
  {
    id: 23,
    name: 'Veg Burger',
    category: 'Burger',
    description: 'Crispy potato-veggie patty with mayo spread.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500',
    price: 60,
    availability: true,
    veg: true
  },
  {
    id: 24,
    name: 'Chicken Burger',
    category: 'Burger',
    description: 'Crispy minced chicken patty and cheese.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKvThpg3KeF9DSFBK8zgQaLC_xJ4dzDFuzOXD9gZGOIQ&s=10',
    price: 70,
    availability: true,
    veg: false,
    popular: true
  },
  {
    id: 25,
    name: 'Veg Maharaja Burger',
    category: 'Burger',
    description: 'Double decker burger with double patties and toppings.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TrYI6SCL5M15kNz5VOFYSEB32eXiVVhn3pw0coBMIlNeIIIofHSPLbiI&s=10',
    price: 99,
    availability: true,
    veg: true
  },
  {
    id: 26,
    name: 'Chicken Maharaja Burger',
    category: 'Burger',
    description: 'Spiced chicken double patties, extra cheese, and lettuce.',
    image: 'https://mcdonaldsblog.in/wp-content/uploads/2016/11/maharaja-mac-story_McDonalds_081116-1.jpg',
    price: 110,
    availability: true,
    veg: false,
    popular: true
  },
  {
    id: 27,
    name: 'Crispy Chicken Burger',
    category: 'Burger',
    description: 'Super crunchy fried chicken thigh fillet with dip.',
    image: 'https://i0.wp.com/flaevor.com/wp-content/uploads/2022/04/SambalFriedChickenBurger1.jpg?resize=1024%2C830&ssl=1',
    price: 110,
    availability: true,
    veg: false
  },

  // Rolls
  {
    id: 28,
    name: 'Crispy Chicken Wrap',
    category: 'Rolls',
    description: 'Crunchy chicken strips wrapped with green sauce.',
    image: 'https://cdn.shopify.com/s/files/1/1785/5627/files/appeal_of_crispy_chicken_wrap_1000x.jpg?v=1720144667',
    price: 69,
    availability: true,
    veg: false
  },
  {
    id: 29,
    name: 'Jumbo Roll',
    category: 'Rolls',
    description: 'Thick flatbread roll filled with spiced chicken.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-EcsbyOsEh4Bmpez5k3k03UPkOkFvAyvmXLZyWEnBg&s=10',
    price: 99,
    availability: true,
    veg: false
  },
  {
    id: 30,
    name: 'Crispy Jumbo Roll',
    category: 'Rolls',
    description: 'Super crispy roll loaded with chicken stuffing.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-I7DolOmy9OdFlNBfCXhZVtpB6bwD8HHyu9cABbDZEA&s=10',
    price: 110,
    availability: true,
    veg: false
  },
  {
    id: 31,
    name: 'Veg Roll',
    category: 'Rolls',
    description: 'Mixed vegetable roll with mild seasonings.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6UpF7DSrBT7AMkJ1QaO1R5lb1E7y1Ap0FsT2vlQ6GHA&s=10',
    price: 60,
    availability: true,
    veg: true
  },
  {
    id: 32,
    name: 'Nuggets Roll',
    category: 'Rolls',
    description: 'Chicken nuggets roll with spicy sauce.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB4UD3zSseFpDgJNgShsKjCTEYkeEZ3-OKsfH3La668Q&s=10',
    price: 70,
    availability: true,
    veg: false
  },
  {
    id: 33,
    name: 'Paneer Roll',
    category: 'Rolls',
    description: 'Traditional spiced paneer cubes roll.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkyY3HuTPLnhT3QbwNws8GkH1dREWOkn_TFIVaTM0gfw&s=10',
    price: 80,
    availability: true,
    veg: true
  },
  {
    id: 34,
    name: 'Chicken Patty Roll',
    category: 'Rolls',
    description: 'Crispy chicken patty wrap with cheese.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQn6yl3O6_nYm5PTYRVHtYM_fwpg4RgSckbx7cFWS-Q&s=10',
    price: 70,
    availability: true,
    veg: false
  },

  // Mojitos
  {
    id: 35,
    name: 'Blue Lime',
    category: 'Mojitos',
    description: 'Refreshing blue curacao mixed with fresh lime.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500',
    price: 59,
    availability: true,
    veg: true,
    popular: true
  },
  {
    id: 36,
    name: 'Green Apple',
    category: 'Mojitos',
    description: 'Cool green apple syrup and soda mix.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0yL6btwZ1HXoEanMxAUgIC4dZK3j6LCg5lRHu72eIsA&s=10',
    price: 59,
    availability: true,
    veg: true
  },
  {
    id: 37,
    name: 'Mint',
    category: 'Mojitos',
    description: 'Classic freshly crushed mint leaves and lime cocktail soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500',
    price: 59,
    availability: true,
    veg: true
  },

  // Quick Bites
  {
    id: 38,
    name: 'French Fries Salted',
    category: 'Quick Bites',
    description: 'Crispy salted potato fries, served hot.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGcDoomq-dFZ7jDjJgy9dSUkdordLLw8webZUZ3pzqCg&s=10',
    price: 60,
    availability: true,
    veg: true
  },
  {
    id: 39,
    name: 'French Fries Peri Peri',
    category: 'Quick Bites',
    description: 'Crispy fries tossed in spicy peri peri powder.',
    image: 'https://cdn.uengage.io/uploads/64261/image-591513-1754044989.jpeg',
    price: 65,
    availability: true,
    veg: true,
    popular: true
  },
  {
    id: 40,
    name: 'Aloo Tikki',
    category: 'Quick Bites',
    description: 'Spiced potato patties deep fried to crisp.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX-L5hKl96iC2tfQSZVFzQLp2Vj1C1BSybdA9pbLG3xg&s=10',
    price: 60,
    availability: true,
    veg: true
  },
  {
    id: 41,
    name: 'Veg Nuggets',
    category: 'Quick Bites',
    description: 'Assorted golden fried vegetable nuggets.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9E2qoYpHcJZA-A0wvPxFiI6gjdCQlSPlCCcA89lggDQ&s=10',
    price: 60,
    availability: true,
    veg: true
  },
  {
    id: 42,
    name: 'Chilly Garlic Pops',
    category: 'Quick Bites',
    description: 'Golden seasoned garlic potato bites.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxv-JST0nZFoUVzKt1fBsq6XqrdNjEuZ29sO2Kfdpl7w&s',
    price: 60,
    availability: true,
    veg: true
  },
  {
    id: 43,
    name: 'Chicken Popcorn',
    category: 'Quick Bites',
    description: 'Crispy bite-sized battered chicken pops.',
    image: 'https://vaya.in/recipes/wp-content/uploads/2017/12/Popcorn-Chicken-Recipe.jpg',
    price: 90,
    availability: true,
    veg: false,
    popular: true
  },
  {
    id: 44,
    name: 'Chicken Nuggets',
    category: 'Quick Bites',
    description: 'Golden seasoned minced chicken nuggets.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500',
    price: 80,
    availability: true,
    veg: false
  },
  {
    id: 45,
    name: 'Crispy Chicken Wings',
    category: 'Quick Bites',
    description: 'Spicy seasoned crunchy chicken wings block.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500',
    price: 60,
    availability: true,
    veg: false
  },
  {
    id: 46,
    name: 'Loaded French Fries',
    category: 'Quick Bites',
    description: 'Crispy fries loaded with cheese sauce.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpZ7a8Txybiw3DUhxNZp9QH5nHT8GNl9rb9Yuuauy8kV5eod_SlmWyrPY&s=10',
    price: 149,
    availability: true,
    veg: true
  },

  // Falooda
  {
    id: 47,
    name: 'Fruit Salad',
    category: 'Falooda',
    description: 'Assorted seasonal cut fruits with chilled syrup.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPG3blOnnZ6t8VyLMQopSRQzXCxWgt_eNgIeL4TlsNQxcKT-cVNruV6io&s=10',
    price: 90,
    availability: true,
    veg: true
  },
  {
    id: 48,
    name: 'Gud-Bud',
    category: 'Falooda',
    description: 'Classic layered ice cream sundae with jelly and nuts.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhqn-Zy8e5TxuscnMnchbHxaqXRt3LjE_TPcnfVAp05Kd3CCMjYudWcRp&s=10',
    price: 100,
    availability: true,
    veg: true,
    popular: true
  },
  {
    id: 49,
    name: 'Royal Falooda',
    category: 'Falooda',
    description: 'Rich rose milk falooda with vanilla scoop.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0fp5xd2-yeeNSaXSJz933JE4GDqZNit26abQEgwzeDA&s=10',
    price: 130,
    availability: true,
    veg: true
  },
  {
    id: 50,
    name: 'Dry Fruits Falooda',
    category: 'Falooda',
    description: 'Loaded with cashews, almonds, and pistachios.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBZEh0uLOvSLAQ2V7RFf6QJ3lHpSCnhH6ps2ifqnBQgg&s=10',
    price: 150,
    availability: true,
    veg: true
  },
  {
    id: 51,
    name: 'Mango Falooda',
    category: 'Falooda',
    description: 'Sweet mango base with mango ice cream scoop.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTyAJCjvjXRpF02JkeEbSrCr_yCemulj7x5R4vbOxJA&s=10',
    price: 130,
    availability: true,
    veg: true
  },

  // Milk Shakes
  {
    id: 52,
    name: 'Strawberry Milkshake',
    category: 'Milk Shakes',
    description: 'Creamy thick fresh strawberry shake.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRrvNTa3-EfbkK2gG-HGsIOXfX__SHMsLsyarC-altiQ&s=10',
    price: 59,
    availability: true,
    veg: true
  },
  {
    id: 53,
    name: 'Chocolate',
    category: 'Milk Shakes',
    description: 'Thick dark chocolate syrup milkshake.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500',
    price: 59,
    availability: true,
    veg: true,
    popular: true
  },
  {
    id: 54,
    name: 'Black Currant',
    category: 'Milk Shakes',
    description: 'Creamy black currant flavor milkshake.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hott8Sy3ReMF_GILbzm5cJjaQuBGECGEu_fIIRpKUA&s=10',
    price: 59,
    availability: true,
    veg: true
  },
  {
    id: 55,
    name: 'Green Apple',
    category: 'Milk Shakes',
    description: 'Chilled sweet green apple flavored milkshake.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ioSRXW8g4WXd-D1x1QHT6wrIPtqwQ6Y7s43gPLJ4-Q&s=10',
    price: 59,
    availability: true,
    veg: true
  },
  {
    id: 56,
    name: 'Pineapple',
    category: 'Milk Shakes',
    description: 'Sweet pineapple syrup thick shake.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSMLNihZ6Ap7MuP5wiJqBXu1gGW7ZbYCsSBdZI2Ni_qiHWVryVfhaPSkmc&s=100',
    price: 59,
    availability: true,
    veg: true
  },
  {
    id: 57,
    name: 'Rose Milk',
    category: 'Milk Shakes',
    description: 'Classic chilled sweetened rose milk.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiz4k1uK1jgNzkj9j_sLGqV_ODlRScmLlHQkvXT5jquQ&s=10',
    price: 59,
    availability: true,
    veg: true
  },

  // Desserts
  {
    id: 58,
    name: 'Choco Lava Cake',
    category: 'Desserts',
    description: 'Hot chocolate fudge filling inside cake.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5U7LZMK6vs6Jyt6dWeeQJFZOFgY2PKd5D2OfphxuidQ&s=10',
    price: 40,
    availability: true,
    veg: true,
    popular: true
  }
];

// --- PIZZA ADDONS CONSTANT ---
export const PIZZA_ADDONS = [
  { name: 'Extra Cheese', price: 30 },
  { name: 'Mushrooms', price: 25 },
  { name: 'Onions', price: 15 },
  { name: 'Capsicum', price: 15 },
  { name: 'Paneer Cubes', price: 30, vegOnly: true },
  { name: 'Chicken Chunks', price: 45, nonVegOnly: true }
];
