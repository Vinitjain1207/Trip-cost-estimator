import { createContext } from "react";
import { useReducer } from "react";
import { useImmerReducer } from "use-immer";
export const BookContext = createContext(null);
export const BookDispatchContext = createContext(null);

export function BookProvider({ children }) {
  const [Books, dispatch] = useImmerReducer(BookReducer, initialBooks);

  return (
    <BookContext value={Books}>
      <BookDispatchContext value={dispatch}>{children}</BookDispatchContext>
    </BookContext>
  );
}

function BookReducer(draft, action) {
  switch (action.type) {
    case "Bookschanged": {
      console.log(action.new);
      draft[0][action.field] = action.new;
      break;
    }
    case "Books1changed": {
      draft[1][action.field] = action.new;
      break;
    }
    case "Books2changed": {
      draft[2][action.field] = action.new;
      break;
    }
    case "Books3changed": {
      console.log(action.new);
      draft[3] = action.new;
      break;
    }
    case "Quantityfield": {
      draft[3][action.field] = action.new;
      break;
    }
    case "Books5changed": {
      draft[5][action.field] = action.new;
      break;
    }
    case "Trainselected": {
      draft[6] = action.new;
      break;
    }
    case "Books7changed": {
      draft[7][action.field] = action.new;
      break;
    }
    case "Busselected": {
      draft[8] = action.new;
      break;
    }
    case "Hotelchanged": {
      draft[9] = action.new;
      break;
    }
    case "Restaurantchanged": {
      console.log(action.new);
      draft[10] = action.new;
      break;
    }
    case "Activitiesadded": {
      console.log(action.new);
      console.log(action.field);
      draft[11][action.field] = action.new;
      break;
    }
    case "EssentialChanged": {
      console.log(action.new);
      console.log(action.field);
      draft[action.field] = action.new;
      break;
    } 
    case "Currencychanged": {
      console.log(action.new);
      console.log(action.field);
      draft[action.field].CurrencyExchange = action.new;
      draft[action.field].Cost = action.new;
      break;
    } 
    case "simchanged": {
      console.log(action.new);
      console.log(action.field);
      draft[action.field] = action.new;
      break;
    } 

    default: {
        throw Error('Unknown action: ' + action.type);
      }
  }
  //   switch (action.type) {
  //     case 'added': {
  //       return [...tasks, {
  //         id: action.id,
  //         text: action.text,
  //         done: false
  //       }];
  //     }
  //     case 'changed': {
  //       return tasks.map(t => {
  //         if (t.id === action.task.id) {
  //           return action.task;
  //         } else {
  //           return t;
  //         }
  //       });
  //     }
  //     case 'deleted': {
  //       return tasks.filter(t => t.id !== action.id);
  //     }
  //     default: {
  //       throw Error('Unknown action: ' + action.type);
  //     }
  //   }
}

const initialBooks = [
  {
    destination: "Ahmedabad",
    date: {
      from: "2026-03-04T18:30:00.000Z",
      to: "2026-03-07T18:30:00.000Z",
    },
    Adults: 1,
    Children: 1,
    Budget: 6000,
  },
  {
    "Travel Insurance": true,
    "Visa Assistance": true,
    "Guided City Tour": true,
    "Airport Pickup & Drop": true,
    "Flexible Cancellation": true,
  },
  {
    Email: "vv@gmail.com",
    Phone: "123",
    Name: "vvv",
  },
  {
    FlightType: "",
    Cost: 0,
    Depart: "",
    Return: "",
    Airlines: "",
    Quantity: 1,
    Duration: "",
  },
  {
    from: "Bombay",
    to: "Ahmedabad",
  },
  {
    date: "",
    Berth: [],
  },
  {
    TrainName: "",
    Trainclass: "",
    Cost: 0,
    Coach: "",
    Depart: "",
    Arrival: "",
  },
  { date: "", Seats: [] },

  {
    BusName: "",
    BusType: "",
    Cost: 0,
    Depart: "",
    Arrival: "",
  },
  {
    name: "",
    location: "",
    Cost: 0,
    rating: 0,
    checkindate: {},
    checkoutdate: {},
    guest: 0,
    room: 0,
    roomtype: 0,
    image: "",
    amenities: [],
  },
  {
    name: "",
    cuisine: "",
    rating: 0,
    date: "",
    guest: 0,
    Table: "",
    Time: "",
    Cost: 0,
    image: "",
    menuImages: [],
  },
  [
    {
      type: "Sabarmati",
      people: 1,
      Cost: 0,
    },
    { type: "Adalaj", people: 1, Cost: 0 },

    { type: "ManekChowk", people: 1, Cost: 0 },

    { type: "ScienceCity", people: 1, Cost: 0 },

    { type: "Alphaone", people: 1, Cost: 0 },
  ],
  { type: "Health Kit", Cost: 0 },
  { type: "Water & Refreshment Kit", Cost: 0 },
  { type: "Hygiene Kit", Cost: 0 },
  { type: "Travel Combo Kit", Cost: 0 },
  { CurrencyExchange: 0 ,Cost:0},
  {SimCard:'',Cost:0},
];
