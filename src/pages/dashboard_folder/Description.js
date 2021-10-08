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
          Welcome to Xtract. Here you can extract data from any website on the
          internet* with the press of a button. Choose from several extraction
          modes to specify the data you're looking for, and then they will be
          saved for future use.
        </p>
      </div>
    </div>
  );
};
