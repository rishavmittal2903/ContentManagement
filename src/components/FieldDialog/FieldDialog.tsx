import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import "./style.css";
import { Divider } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import TitleIcon from "@mui/icons-material/Title";
import NumbersIcon from "@mui/icons-material/Numbers";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DataObjectIcon from "@mui/icons-material/DataObject";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import { useNavigate, useParams } from "react-router-dom";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: "80%",
  height: "500px",
  border: "none",
  p: 4,
};

export default function FieldDialog() {
  const [open, setOpen] = React.useState(true);
  const {contentId} = useParams();

  const handleClose = () => {
    navigate(`/contentField/${contentId}`);
    setOpen(false)
  };
  const navigate = useNavigate();
  const fieldHandler = (type:string) => {
    if(type === "json")
    {
      navigate(`/addJsonField/${type}/${contentId}`)

    }else{
    navigate(`/addField/${type}/${contentId}`)
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add New Field
            </Typography>
            <Divider />

            <Box className="fieldContainer">
              <Box className="flexContainer">
                <Box className="fieldType" onClick={()=>fieldHandler("text")}>
                  <div>
                    <ArticleIcon />
                  </div>
                  <div className="title">Rich Text</div>
                  <div className="subTitle">
                    Text formatting with references and media
                  </div>
                </Box>
                <Box className="fieldType" onClick={()=>fieldHandler("text")}>
                  <div>
                    <TitleIcon />
                  </div>
                  <div className="title">Text</div>
                  <div className="subTitle">
                    Titles, names, paragraphs, list of names
                  </div>
                </Box>
                <Box className="fieldType" onClick={()=>fieldHandler("text")}>
                  <div>
                    <NumbersIcon />
                  </div>
                  <div className="title">Number</div>
                  <div className="subTitle">
                    ID, order number, rating, quantity
                  </div>
                </Box>
              </Box>
              <Box className="flexContainer">
                <Box className="fieldType" onClick={()=>fieldHandler("text")}>
                  <div>
                    <DateRangeIcon />
                  </div>
                  <div className="title">Date and Time</div>
                  <div className="subTitle">Event Dates</div>
                </Box>
                <Box className="fieldType" onClick={()=>fieldHandler("text")}>
                  <div>
                    <LocationOnIcon />
                  </div>
                  <div className="title">Location</div>
                  <div className="subTitle">
                    Coordinates: latitude and longitude
                  </div>
                </Box>
                <Box className="fieldType" onClick={()=>fieldHandler("text")}>
                  <div>
                    <PermMediaIcon />
                  </div>
                  <div className="title">Media</div>
                  <div className="subTitle">
                    Images, videos, PDFs and other files
                  </div>
                </Box>
              </Box>
              <Box className="flexContainer">
                <Box className="fieldType" onClick={()=>fieldHandler("text")}>
                  <div>
                    <CheckCircleIcon />
                  </div>
                  <div className="title">Boolean</div>
                  <div className="subTitle">
                    Yes or no, 1 or 0, true or false
                  </div>
                </Box>
                <Box className="fieldType" onClick={()=>fieldHandler("json")}>
                  <div>
                    <DataObjectIcon />
                  </div>
                  <div className="title">JSON Object</div>
                  <div className="subTitle">Data in JSON format</div>
                </Box>
                <Box className="fieldType" onClick={()=>fieldHandler("text")}>
                  <div>
                    <SettingsEthernetIcon />
                  </div>
                  <div className="title">Reference</div>
                  <div className="subTitle">
                    For example, a blog post can reference its author(s)
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
