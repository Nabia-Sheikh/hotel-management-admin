import { onValue, ref, update } from "firebase/database";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const StatusTD = styled.td`
  font-weight: bold;
  color: ${(props) => (props.type === "Pending" ? "blue" : "")};
  color: ${(props) => (props.type === "Accepted" ? "green" : "")};
  color: ${(props) => (props.type === "Rejected" ? "red" : "")};
`;
const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  React.useEffect(() => {
    onValue(ref(db, "/bookings/"), (snapshot) => {
      setBookings([]);
      const data = snapshot.val();
      if (data !== null) {
        // eslint-disable-next-line array-callback-return
        Object.values(data).map((booking) => {
          setBookings((oldArray) => [...oldArray, booking]);
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  const updateBooking = (bookingNumb, status) => {
    update(ref(db, `bookings/${bookingNumb}`), {
      status,
    });
  };

  console.log(bookings);
  return (
    <>
      {bookings ? (
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "80px", width: "90%", margin: "80px auto" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Room type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Capactiy</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <>
                  <td>{booking.id}</td>
                  <td>{booking.refID}</td>
                  <td>{booking.name}</td>
                  <td>{booking.type && booking.type.toUpperCase()}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>{booking.capacity}</td>
                  <td>{booking.totalPrice}</td>
                  <StatusTD type={booking.status}>{booking.status}</StatusTD>
                  {booking.status === "Pending" ? (
                    <>
                      <td style={{ textAlign: "center" }}>
                        <FaCheckCircle
                          color="green"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={() => updateBooking(booking.id, "Accepted")}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <FaTimesCircle
                          color="red"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={() => updateBooking(booking.id, "Rejected")}
                        />
                      </td>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="container roomerror">
          <div className="row my-5">
            <div className="col-md-6 col-12 mx-auto">
              <div className="card shadow-lg border-0 p-4 error">
                <h1 className="text-center display-4">No bookings.</h1>
                <Link to="/rooms" className="btn btn-warning mt-4 ">
                  No Bookings
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
