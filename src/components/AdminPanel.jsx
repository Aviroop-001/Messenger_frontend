import React, { useState } from "react";
import AdminMessage from "./AdminMessage";

function AdminPanel({ userId }) {
  const [isReplying, setIsReplying] = useState(false);

  const handleReplyStart = () => {
    setIsReplying(true);
  };

  const handleReplyEnd = () => {
    setIsReplying(false);
  };

  return (
    <div>
      {isReplying ? (
        <p>Admin is currently replying to this user.</p>
      ) : (
        <>
          <button onClick={handleReplyStart}>Start Replying</button>
          <button onClick={handleReplyEnd}>Finish Replying</button>
        </>
      )}
      {isReplying && <AdminMessage userId={userId} />}
    </div>
  );
}

export default AdminPanel;
