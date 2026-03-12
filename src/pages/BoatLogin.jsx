import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoatLogin = () => {

  const [boatId,setBoatId] = useState("");
  const navigate = useNavigate();

  const verifyBoat = async () => {

    const res = await fetch("http://localhost:5000/api/boat/verify-boat",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        boatId
      })
    });

    const data = await res.json();

    if(data.success){
      navigate("/livestatus");
    }
    else{
      alert("Invalid Boat ID");
    }

  };

  return(

    <div style={{padding:"120px"}}>

      <h2>Boat Login</h2>

      <input
      placeholder="Enter Boat ID"
      value={boatId}
      onChange={(e)=>setBoatId(e.target.value)}
      />

      <br/><br/>

      <button onClick={verifyBoat}>
        Login Boat
      </button>

    </div>

  );

};

export default BoatLogin;