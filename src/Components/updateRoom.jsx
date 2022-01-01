import { ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { v4 } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateRoom = () => {
  const { slug } = useParams();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const uid = v4();

  const [name, setName] = useState("");
  const [type, settype] = useState("");
  const [price, setprice] = useState(0);
  const [size, setsize] = useState(0);
  const [capacity, setcapacity] = useState(1);
  const [pets, setpets] = useState(false);
  const [breakfast, setbreakfast] = useState(false);
  const [description, setdescription] = useState("");
  const [extras, setextras] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  function getRoom(arg) {
    
    const idiRooms = state[0][0].rooms.map((item) => item);
    const roomDatas = idiRooms.filter((roomItem) => roomItem.slug === arg);
    return roomDatas;
  }

  if (state.length > 0 && slug) {
    const roomData = getRoom(slug);
    console.log(roomData);
    if (roomData.length > 0) {
      var id = roomData[0].id;
      var newtype = roomData[0].type;
      var newname = roomData[0].name;
      var newdescription = roomData[0].description;
      var newcapacity = roomData[0].capacity;
      var newsize = roomData[0].size;
      var newprice = roomData[0].price;
      var newextras = roomData[0].extras;
      var newbreakfast = roomData[0].breakfast;
      var newpets = roomData[0].pets;
      const images = roomData[0].images;
      var img1 = images[0];
      var img2 = images[1];
      var img3 = images[2];
      var img4 = images[3];
    }
  }

  useEffect(() => {
    setName(newname || "");
    setcapacity(newcapacity);
    settype(newtype);
    setdescription(newdescription);
    setprice(newprice);
    setsize(newsize);
    setextras(newextras && newextras.toString());
    setbreakfast(newbreakfast);
    setpets(newpets);
    setImage1(img1);
    setImage2(img2);
    setImage3(img3);
    setImage4(img4);
    console.log(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateRoomFirebase() {
    if (
      name &&
      type &&
      price &&
      size &&
      description &&
      extras &&
      image1 &&
      image2 &&
      image3 &&
      image4
    ) {
      await update(ref(db, `hotels/${id}`), {
        sys: {
          id,
        },
        fields: {
          name,
          slug: uid.toString(),
          type: newtype,
          price,
          size,
          capacity,
          pets,
          breakfast,
          featured: false,
          description: description,
          extras: extras.split(","),
          images: [
            {
              fields: {
                file: {
                  url: image1,
                },
              },
            },
            {
              fields: {
                file: {
                  url: image2,
                },
              },
            },
            {
              fields: {
                file: {
                  url: image3,
                },
              },
            },
            {
              fields: {
                file: {
                  url: image4,
                },
              },
            },
          ],
        },
      }).then(() => {
        alert("Room updated.!");
        setName("");
        settype("");
        setcapacity(0);
        setdescription("");
        setextras("");
        setbreakfast(false);
        setpets(false);
        setprice(0);
        setsize(0);
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");

        navigate(`/rooms`);
      });
    } else {
      return alert("Please fill all required fields.");
    }
  }

  return (
    <>
      {slug ? (
        <div className="container my-5">
          <div className="row">
            <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
              <div>
                <h1 className="display-4 text-center">Update Room</h1>
              </div>

              <div className="row my-4">
                <div className="col-md-12 col-12 my-auto">
                  <div className="col-md-12 col-12 float-right">
                    <form>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          id="name"
                          placeholder="Room name."
                          required
                        />

                        <label htmlFor="price">Price</label>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setprice(e.target.value)}
                          className="form-control"
                          required
                          id="price"
                          placeholder="Room price"
                        />
                        <label htmlFor="size">Size</label>
                        <input
                          type="number"
                          className="form-control"
                          value={size}
                          onChange={(e) => setsize(e.target.value)}
                          required
                          id="size"
                          placeholder="Room Size"
                        />
                        <label htmlFor="capacity">Capacity</label>
                        <input
                          type="number"
                          value={capacity}
                          onChange={(e) => setcapacity(e.target.value)}
                          className="form-control"
                          required
                          id="capacity"
                          placeholder="Capacitiy"
                        />
                        <div className="custom-control custom-checkbox my-1">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            checked={breakfast}
                            onChange={() => setbreakfast(!breakfast)}
                            name="breakfast"
                            id="breakfast"
                          />
                          <label
                            htmlFor="breakfast"
                            className="custom-control-label"
                          >
                            Breakfast
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox my-1">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            name="pets"
                            checked={pets}
                            onChange={() => setpets(!pets)}
                            id="pets"
                          />
                          <label
                            htmlFor="pets"
                            className="custom-control-label"
                          >
                            Pets
                          </label>
                        </div>

                        <label htmlFor="description">Description</label>
                        <textarea
                          className="form-control"
                          value={description}
                          onChange={(e) => setdescription(e.target.value)}
                          id="description"
                          placeholder="Short description of room."
                          rows="3"
                        ></textarea>

                        <label for="extras">Extras</label>
                        <textarea
                          class="form-control"
                          value={extras}
                          onChange={(e) => setextras(e.target.value)}
                          id="extras"
                          placeholder="Separated by comma ( , )"
                          rows="3"
                        ></textarea>

                        <label htmlFor="img1">Image 1</label>
                        <input
                          type="text"
                          value={image1}
                          onChange={(e) => setImage1(e.target.value)}
                          className="form-control"
                          id="img1"
                          placeholder="Image 1 URL"
                          required
                        />
                        <label htmlFor="img2">Image 2</label>
                        <input
                          type="text"
                          className="form-control"
                          value={image2}
                          onChange={(e) => setImage2(e.target.value)}
                          id="img2"
                          placeholder="Image 2 URL"
                          required
                        />

                        <label htmlFor="img3">Image 3</label>
                        <input
                          type="text"
                          value={image3}
                          onChange={(e) => setImage3(e.target.value)}
                          className="form-control"
                          id="img3"
                          placeholder="Image 3 URL"
                          required
                        />

                        <label htmlFor="img4">Image 4</label>
                        <input
                          type="text"
                          value={image4}
                          onChange={(e) => setImage4(e.target.value)}
                          className="form-control"
                          id="img4"
                          placeholder="Image 4 URL"
                          required
                        />
                      </div>

                      <div className="form-group form-check"></div>
                    </form>
                    <button
                      className="btn btn-block btn-outline-primary"
                      onClick={updateRoomFirebase}
                    >
                      UPDATE ROOM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="container roomerror">
            <div className="row my-5">
              <div className="col-md-6 col-12 mx-auto">
                <div className="card shadow-lg border-0 p-4 error">
                  <h1 className="text-center display-4">Update</h1>
                  <h3>Please select room from Room page..</h3>
                  <Link to="/rooms" className="btn btn-warning mt-4 ">
                    Back to Rooms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateRoom;
