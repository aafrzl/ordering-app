import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Sample menu data
export const menuItems = [
  {
    name: 'Pizza',
    description: 'A delicious pizza with tomato sauce, cheese, and pepperoni',
    price: 14,
    image: 'images/pizza.png',
    numberOrdered: 0,
    uuid: uuidv4(),
  },
  {
    name: 'Hamburger',
    description: 'A delicious hamburger with lettuce, tomato, and a beef patty',
    price: 12,
    image: 'images/burger.png',
    numberOrdered: 0,
    uuid: uuidv4(),
    
  },
  {
    name: 'Beer',
    description: 'A delicious beer',
    price: 13,
    image: 'images/beer.png',
    numberOrdered: 0,
    uuid: uuidv4(),
  },
  {
    name: 'Taco',
    description: 'A delicious taco with beef, cheese, and lettuce',
    price: 10,
    image: 'images/taco.png',
    numberOrdered: 0,
    uuid: uuidv4(),
  },
  {
    name: 'Hot Dog',
    description: 'A delicious hot dog with ketchup and mustard',
    price: 8,
    image: 'images/hotdog.png',
    numberOrdered: 0,
    uuid: uuidv4(),
  },
  {
    name: 'Fries',
    description: 'A delicious side of french fries',
    price: 6,
    image: 'images/fries.png',
    numberOrdered: 0,
    uuid: uuidv4(),
  },
  {
    name: 'Ice Cream',
    description: 'A delicious vanilla ice cream cone',
    price: 7,
    image: 'images/icecream.png',
    numberOrdered: 0,
    uuid: uuidv4(),
  },
  {
    name: 'Donut',
    description: 'A delicious chocolate frosted donut',
    price: 5,
    image: 'images/donut.png',
    numberOrdered: 0,
    uuid: uuidv4(),
  },
];
