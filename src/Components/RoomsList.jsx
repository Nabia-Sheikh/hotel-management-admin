import React from "react";
import Room from "./Room";
import notFound from "../images/notfound.svg";

export default function RoomsList(props) {
  const { rooms : data } = props;
  return (
    <>
      {!data ? (
        <>
          <div className="container my-5">
            <div className="card shadow-lg border-0 p-4">
              <div className="row">
                <div className="col-md-6 col-12 my-auto">
                  <img src={notFound} alt="not found" className="img-fluid" />
                </div>
                <div className="col-md-6 col-12 mx-auto">
                  <div className="empty-search">
                    <h3 className="display-4">
                      Unfortunately no rooms matched your search parameters
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <section className="container" style={{ marginTop: "100px" }}>
          <div className="row my-5">
            {data.map((item) => {
              return <Room key={item.id} room={item} />;
            })}
          </div>
        </section>
      )}
    </>
  );
}
