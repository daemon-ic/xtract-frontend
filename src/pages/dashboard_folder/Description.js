import { capFirstLetter } from "../../misc/utils";

export const Description = ({ name }) => {
  return (
    <div className="box description">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "90%",
        }}
      >
        {name ? <h1>Hello, {capFirstLetter(name)}.</h1> : <h1>Loading...</h1>}

        <p>
          Welcome to Xtract. Here you can extract website data with the press of
          a button. This app is designed to pull from Quizlet by default. You
          can also pull from any site by entering a query selection.
        </p>
      </div>
    </div>
  );
};
