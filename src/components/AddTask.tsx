import { useState } from "react";

// TODO send API call {task, done: false}

export const AddTask = () => {
  const [task, setTask] = useState("");

  return (
    <div>
      <label>Task Name</label>
      <input
        className="m-2 rounded"
        type="text"
        onChange={(e) => setTask(e.target.value)}
      />
    </div>
  );
};
