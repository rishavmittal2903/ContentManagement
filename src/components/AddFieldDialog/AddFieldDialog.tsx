import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./style.css";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ILanguage, Langauges } from "../../constant/AppConstant";
import { IContentField, IField, IFieldLanguage } from "../../interfaces/IField";
import { useDispatch } from "react-redux";
import { addFieldsToContentById } from "../../store/reducer/ContentReducer";
import { groupBy } from "../../utility/utility";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: "80%",
  height: "420px",
  border: "none",
  p: 4,
};

export default function AddFieldDialog() {
  const navigate = useNavigate();
  const {fieldType, contentId} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const {contentData} = useSelector((state:RootState)=>state.content)
  const [value, setValue] = React.useState<ILanguage | null>();
  const [languageData, setLanguageData] = React.useState<Array<IFieldLanguage>>([{langaugeCode:'',value:'', languageName:''}]); 
  const fieldRef= React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    navigate(`/contentField/${contentId}`);
    setOpen(false);
  };

  const createContent=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
      const data:any = Array.from(formData.entries()).reduce((memo, [key, value]) => ({
        ...memo,
        [key]: value,
      }), {});
      const fieldData: IField ={
        fieldName: data['fieldName'],
        fieldType: fieldType ?? '',
        langauges: groupBy(languageData,"langaugeCode")

      }
      const content: IContentField | undefined = contentData.find((content)=>content.contentId === contentId)
      dispatch(addFieldsToContentById({contentId: contentId??'', contentDescription: content?.contentDescription, fields:[...content?.fields ||[] , fieldData], updatedBy: `Rishav Mittal ${Math.random().toFixed(1)}`, updatedAt:"a few minutes ago" }));
    }

    React.useEffect(()=>{
      navigate(`/contentField/${contentId}`)
              // eslint-disable-next-line
    },[contentData])
  const langaugeHandler = (
    event: React.SyntheticEvent<Element, Event>,
    value: ILanguage | null,
    index: number
  ) => {
    if(value?.code)
    {
      languageData[index].langaugeCode= value?.code;
      languageData[index].languageName= value?.name;
    const lngData: Array<IFieldLanguage> = Object.assign([],languageData);
    setLanguageData(lngData);
    }
    setValue(value);
  };
  const addAnotherLangauge=()=>{
    setLanguageData(prev => [...prev,{langaugeCode:'',value:'', languageName:''}])
  }
  const addFieldValue=(keyIndex: number, event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    languageData[keyIndex].value= event.target.value;
    const lngData: Array<IFieldLanguage> = Object.assign([],languageData);
    setLanguageData(lngData);
  }
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
              Field Type #{fieldType?.toUpperCase()}
            </Typography>
            <Divider />

            <Box className="inputContainer">
              <form className="inputContainer" onSubmit={createContent}>
                <Box className="scrollContainer">
              <Box>
                <Typography id="transition-modal-title" className="gap10" ref={fieldRef}>
                  FieldName
                </Typography>
                <TextField fullWidth name="fieldName" id="outlined-basic" variant="outlined" required />
              </Box>
             
              {languageData.map((lang:IFieldLanguage, index:number)=> <Box key={`${lang.value}_${index}`}>
                <Box className="flex-col">
                <Typography id="transition-modal-title" className="gap10">
                  Languages
                </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Langauges}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  value={{code:lang.langaugeCode, name:lang.languageName}}
                  onChange={(event: React.SyntheticEvent<Element, Event>, value: ILanguage|null)=>langaugeHandler(event, value, index)}
                  renderInput={(params) => <TextField required {...params} />}
                />
              </Box>
              {value?.code &&<Box className="mrgT10">
                <Typography className="gap10">
                  Value
                </Typography>
            <TextField required fullWidth autoFocus variant="outlined" defaultValue={lang.value} onChange={(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>addFieldValue(index, event)} />
              </Box>}
              </Box>)}
              </Box>
              <Box className="actionContainer">
                <Button variant="contained" onClick={addAnotherLangauge}>
                  Add Another Language
                </Button>
              </Box>
              <Box className="actionContainer">
                <Button variant="contained" type="submit">
                  Create
                </Button>
              </Box>
              </form>
            </Box>
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
