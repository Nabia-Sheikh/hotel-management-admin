import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Banner from "./Banner";
import StyledHero from "../Components/StyledHero";
import { ref, remove } from "firebase/database";
import { db } from "../firebase";

const SingleRooms = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  function getRoom(arg) {
    const idiRooms = state[0][0].rooms.map((item) => item);
    const roomDatas = idiRooms.filter((roomItem) => roomItem.slug === arg);
    return roomDatas;
  }
  if (state.length > 0 && slug) {
    var roomData = getRoom(slug);
    if (roomData.length > 0) {
      var id = roomData[0].id;
      var name = roomData[0].name;
      var description = roomData[0].description;
      var capacity = roomData[0].capacity;
      var size = roomData[0].size;
      var price = roomData[0].price;
      var extras = roomData[0].extras;
      var breakfast = roomData[0].breakfast;
      var pets = roomData[0].pets;
      var images = roomData[0].images;
      var [...defaultBcg] = images;
    }
  }

  const deleteRoom = () => {
    remove(ref(db, `/hotels/${id}`)).then(() => {
      alert("Room deleted Succesfully!");
      navigate("/rooms");
    });
  };

  return (
    <>  
      {roomData.length > 0 ? (
        <>
          <StyledHero img={defaultBcg[0]}>
            <Banner title={`${name} room`}>
              <Link to="/" className="btn btn-primary">
                Back To Rooms
              </Link>
            </Banner>
          </StyledHero>
          <section className="single-room container">
            <div className="row">
              {defaultBcg.map((item, index) => {
                return (
                  <div className="col-md-4 col-12 mx-auto" key={index}>
                    <div className="card border-0 shadow-lg">
                      <img
                        key={index}
                        src={item}
                        alt={name}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="single-room-info">
              <article className="desc">
                <h3>Details</h3>
                <p>{description}</p>
              </article>
              <article className="info">
                <h3>Info</h3>
                <h6>price : Rs{price}</h6>
                <h6>size : {size} SQFT</h6>
                <h6>
                  max capacity :{" "}
                  {capacity > 1 ? `${capacity} people` : `${capacity} person`}
                </h6>
                <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                <h6>{breakfast && "free breakfast included"}</h6>
              </article>
            </div>
          </section>
          <section className="room-extras">
            <h3>Extras</h3>
            <ul className="extras">
              {extras.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
            <div className="p-4 clearfix">
              <div className="row">
                <div className="col-md-6 col-12 ml-auto">
                  <button
                    className="btn btn-outline-danger btn-block btn-lg float-right "
                    onClick={deleteRoom}
                  >
                    Delete Room.
                  </button>
                </div>
                <div className="col-md-6 col-12 ml-auto">
                  <Link
                    to={`/update-room/${slug}`}
                    className="btn btn-outline-primary btn-block btn-lg float-right "
                  >
                    Update Room.
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="container roomerror">
          <div className="row my-5">
            <div className="col-md-6 col-12 mx-auto">
              <div className="card shadow-lg border-0 p-4 error">
                <h1 className="text-center display-4">SORRY</h1>
                <h3>No such room could be found...</h3>
                <Link to="/rooms" className="btn btn-warning mt-4 ">
                  Back to Rooms
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleRooms;
