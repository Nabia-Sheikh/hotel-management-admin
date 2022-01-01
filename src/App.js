import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./Components/Navbar";
import Rooms from "./Components/Rooms";
import { child, get, onValue, ref } from "firebase/database";
import { db } from "./firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SingleRooms from "./Components/SingleRooms";
import AddRooms from "./Components/AddRooms";
import UpdateRoom from "./Components/updateRoom";
import Users from "./Components/Users";
import Bookings from "./Components/Bookings";

function App() {
  const dispatch = useDispatch();
  const getFromFirebase = () => {
    const dbRef = ref(db);

    // get(dbRef).then((data) => {
    //   if (data.exists()) {
    //     const outData = data.val();
    //     dispatch({
    //       type: "FIREBASE",
    //       payload: {
    //         outData,
    //       },
    //     });
    //   }
    // });
    onValue(dbRef, (snapshot) => {
      const outData = snapshot.val();
      dispatch({
        type: "FIREBASE",
        payload: {
          outData,
        },
      });
    });
  };

  useEffect(() => {
    getFromFirebase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Rooms />} />
        <Route path="/addRoom" element={<AddRooms />} />
        <Route path="/users" element={<Users />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/update-room/" element={<UpdateRoom />} />
        <Route path="/update-room/:slug" element={<UpdateRoom />} />
        <Route path="/rooms/:slug" element={<SingleRooms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
