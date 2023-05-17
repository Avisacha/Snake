import React from "react";
import './Score.css'

interface Props {
    data: string
}

const Score = (props: Props) => {
  return (
    <div className="score">
        Score: {props.data}
    </div>
  );
};

export default Score;
