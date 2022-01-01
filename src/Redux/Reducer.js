const initialState = [];

function formatData(items) {
  let tempItems = Object.values(items).map((item) => {
    let id = item.sys.id;
    let images = item.fields.images.map((image) => image.fields.file.url);
    let room = { ...item.fields, images, id };
    return room;
  });
  return tempItems;
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FIREBASE":
      let rooms = formatData(payload.outData.hotels);
      let temp = [];
      for (let i of rooms) i && temp.push(i);
      rooms = temp;
      let featuredRooms = rooms.filter((room) => room.featured === true);
      let slug = rooms[0].slug;
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));

      const roomsData = [
        {
          slug,
          rooms,
          featuredRooms,
          sortedRooms: rooms,
          loading: false,
          price: maxPrice,
          maxPrice,
          maxSize,
          breakfast: false,
          pets: false,
          type: "all",
          capacity: 1,
          minPrice: 0,
          minSize: 0,
        },
      ];
      const users = payload.outData.users;

      return [roomsData, users];

    default:
      return state;
  }
};
