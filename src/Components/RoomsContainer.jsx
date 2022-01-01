import React from "react";
import RoomsList from "./RoomsList";
import Loading from "./Loading";
import { useSelector } from "react-redux";

export default function RoomsContainer() {
  const state = useSelector((state) => state);
 
  return (
    <>
      {state.length > 0 ? (
        <React.Fragment>
          <RoomsList rooms={state[0][0].sortedRooms} />
        </React.Fragment>
      ) : (
        <>
            <Loading message={"Rooms data loading..."}/>
        </>
      )}
    </>
  );
}
