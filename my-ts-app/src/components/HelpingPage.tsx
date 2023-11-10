import React from "react";

interface Props {
  message?: string;
}

const HelpingPage: React.FC<Props> = ({ message }) => {
  return (
    <div>
      <p>Aiutati</p>
      <p>{message}</p>
    </div>
  );
};

export default HelpingPage;
