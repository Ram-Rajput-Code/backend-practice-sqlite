import {React, useState,useEffect} from "react";
import { Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "bootstrap/dist/css/bootstrap.min.css";
import { getItems} from "../../api"

  

const ListItemRender = () => {
    const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const response = await getItems();
    setItems(response.data);
  };
  return (
    <div className="container mt-4">
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                
                {/* MUI Accordion for expandable description */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <strong>Description</strong>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>{item.description}</p>
                  </AccordionDetails>
                </Accordion>

                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItemRender;
