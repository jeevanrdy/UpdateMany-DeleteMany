import React from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  let navigate = useNavigate();
  let storeObj = useSelector((store) => {
    return store;
  });

  let dataToSend = new FormData();
  dataToSend.append("email", storeObj.userDetails.email);

  let deleteAcc = async () => {
    let reqOptions = {
      method: "DELETE",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:4444/deleteAcc", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    if (JSOData.status === "success") {
      navigate("/");
    }
  };
  return (
    <div className="dashstyle">
      <TopNavigation />
      <div>
        <h2>Dashboard</h2>
        <h3>
          Welcome: {storeObj.userDetails.firstName}{" "}
          {storeObj.userDetails.lastName}
        </h3>
        <img
          alt="dashimage"
          src={`http://localhost:4444/${storeObj.userDetails.profilePic}`}
        ></img>
      </div>
      <button
        type="button"
        onClick={() => {
          deleteAcc();
        }}
      >Delete Account</button>
    </div>
  );
}

export default DashBoard;
