import { Button, InputBase } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const styles = {
  siteButtonsContainer: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
  siteButtons: {
    backgroundColor: "white",
    width: "80%",
    minWidth: "100px",
    height: "60px",
    borderRadius: "15px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "center",
    color: "black",
  },
  smallButtons: {
    margin: "10px",
    height: "50px",
    width: "50px",
    minWidth: "50px",
    backgroundColor: "black",
    borderRadius: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)",
    color: "white",
  },
};

export const OperationsButtons = ({ sites, initSiteScrape, deleteSite }) => {
  return (
    <div className="box sites">
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <h3>Operations</h3>
        <p>
          A list of your created operations. Select one to begin extracting.
        </p>
      </div>
      {sites.map((site) => (
        <div key={site.id} style={styles.siteButtonsContainer}>
          <Button
            style={styles.smallButtons}
            onClick={() => {
              deleteSite(site.id);
            }}
          >
            <CloseRoundedIcon />
          </Button>
          <Button
            style={styles.siteButtons}
            onClick={() => {
              initSiteScrape(site.url, site.target, site.name);
            }}
          >
            {site.name}
          </Button>
          {/* <Button style={styles.smallButtons}>x</Button> */}
        </div>
      ))}
    </div>
  );
};
