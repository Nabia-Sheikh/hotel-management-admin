import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const Users = () => {
  const state = useSelector((state) => state);

  return (
    <>
      {state[1] ? (
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "80px", width: "80%", margin: "80px auto" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(state[1]).map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>{item.isAdmin ? "Admin" : "User"}</td>
              </tr>
            ))}
            
          </tbody>
        </Table>
      ) : (
        <Loading message={"Users data loading..."} />
      )}
    </>
  );
};

export default Users;
