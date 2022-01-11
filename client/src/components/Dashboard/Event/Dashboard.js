import React, { useContext } from "react";
import { UserContext } from "../../UserContext";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);

  return (
    <div>
      <h5>Main Dashboard is here</h5>
      {JSON.stringify(state)}
    </div>
  );
};

export default Dashboard;
