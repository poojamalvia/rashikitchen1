import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import List from "./List";
import Paper from "@mui/material/Paper";
import { redcolor } from "../Design";

function AccordionExpandIcon({ menuDetails, name, count, fld, isAdd }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ padding: "5px" }}>
      <Paper elevation={5}>
        <Accordion expanded={open}>
          <AccordionSummary
            expandIcon={
              <ArrowDropDownIcon
                style={{ color: open ? "white" : redcolor }}
              />
            }
            onClick={() => {
              setOpen(!open);
            }}
            aria-controls="panel2-content"
            id="panel2-header"
            style={{ backgroundColor: open ? redcolor : "white" }}
          >
            <Typography style={{ color: open ? "white" : "black" }}>
              {name + " " + "(" + count + ")"}
            </Typography>
            <Typography></Typography>
          </AccordionSummary>

          <AccordionDetails>
            <List menuDetails={menuDetails} isAdd={isAdd} />
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
}

export default React.memo(AccordionExpandIcon);
