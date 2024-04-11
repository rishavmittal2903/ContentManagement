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
import { JsonEditor } from "react-jsondata-editor";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

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

export default function AddJsonFieldDialog() {
  const navigate = useNavigate();
  const { fieldType, contentId, fieldName } = useParams();
  const { contentData } = useSelector((state: RootState) => state.content);
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = React.useState<ILanguage | null>();
  const [languageData, setLanguageData] = React.useState<Array<IFieldLanguage>>(
    [{ langaugeCode: "", value: "", languageName: "" }]
  );
  const fieldData: Record<string, string | Record<string, any>> | undefined =
    React.useMemo(
      () =>
        contentData
          .find((content) => content.contentId === contentId)
          ?.fields?.find((field) => field.fieldName === fieldName)?.langauges,
                  // eslint-disable-next-line

      [contentData, contentId, fieldName]
    );
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    navigate(`/contentField/${contentId}`);
    setOpen(false);
  };

  React.useEffect(() => {
    if (fieldData && Object.keys(fieldData)) {
      let languages: Array<IFieldLanguage> = [];
      for (let key in fieldData) {
        const languageName: string =
          Langauges.find((lng) => lng.code === key)?.name || "";
        languages.push({
          langaugeCode: key,
          languageName,
          value: fieldData[key],
        });
      }
      setLanguageData([...languages]);
    }
    // eslint-disable-next-line
  }, [fieldData]);

  const createContent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = Array.from(formData.entries()).reduce(
      (memo, [key, value]) => ({
        ...memo,
        [key]: value,
      }),
      {}
    );
    const fieldData: IField = {
      fieldName: data["fieldName"],
      fieldType: fieldType ?? "",
      langauges: groupBy(languageData, "langaugeCode"),
    };
    const content: IContentField | undefined = contentData.find(
      (content) => content.contentId === contentId
    );
    if(fieldName)
    {
      const index = content?.fields?.findIndex((f)=>f.fieldName === fieldName);
      if(index !== -1 && content?.fields?.length)
      {
        const fields:any = Object.assign([],content?.fields);
        fields[index ?? 0]=fieldData 
        dispatch(
          addFieldsToContentById({
            contentId: contentId ?? "",
            contentDescription: content?.contentDescription,
            fields: [...fields],
            updatedBy: `Rishav Mittal ${Math.random().toFixed(1)}`,
            updatedAt: "a few minutes ago",
          })
        );
      }
    }
    else
    {
    dispatch(
      addFieldsToContentById({
        contentId: contentId ?? "",
        contentDescription: content?.contentDescription,
        fields: [...(content?.fields || []), fieldData],
        updatedBy: `Rishav Mittal ${Math.random().toFixed(1)}`,
        updatedAt: "a few minutes ago",
      })
    );
    }
    navigate(`/contentField/${contentId}`);
  };
  const langaugeHandler = (
    event: React.SyntheticEvent<Element, Event>,
    value: ILanguage | null,
    index: number
  ) => {
    if (value?.code) {
      languageData[index].langaugeCode = value?.code;
      languageData[index].languageName = value?.name;
      const lngData: Array<IFieldLanguage> = Object.assign([], languageData);
      setLanguageData(lngData);
    }
    setValue(value);
  };
  const addAnotherLangauge = () => {
    setLanguageData((prev) => [
      ...prev,
      { langaugeCode: "", value: "", languageName: "" },
    ]);
  };
  const handleChange = (e: any, index: number) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (event: any) => {
      languageData[index].value = event.target.result;
      const lngData: Array<IFieldLanguage> = Object.assign([], languageData);
      setLanguageData(lngData);
    };
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
              Field Type #{fieldType?.toUpperCase()}
            </Typography>
            <Divider />

            <Box className="inputContainer">
              <form className="inputContainer" onSubmit={createContent}>
                <Box className="scrollContainer">
                  <Box>
                    <Typography id="transition-modal-title" className="gap10">
                      PageName
                    </Typography>
                    <TextField
                      fullWidth
                      name="fieldName"
                      id="outlined-basic"
                      variant="outlined"
                      required
                      defaultValue={fieldName}
                    />
                  </Box>
                  {languageData.map((lang: IFieldLanguage, index: number) => (
                    <Box key={`${lang.value}_${index}`}>
                      <Box className="flex-col">
                        <Typography
                          id="transition-modal-title"
                          className="gap10"
                        >
                          Languages
                        </Typography>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={Langauges}
                          getOptionLabel={(option) => option.name}
                          fullWidth
                          value={{
                            code: lang.langaugeCode,
                            name: lang.languageName,
                          }}
                          onChange={(
                            event: React.SyntheticEvent<Element, Event>,
                            value: ILanguage | null
                          ) => langaugeHandler(event, value, index)}
                          renderInput={(params) => (
                            <TextField required {...params} />
                          )}
                        />
                      </Box>
                      {(value?.code || lang.langaugeCode) && (
                        <Box className="mrgT10">
                          <Typography className="gap10">Json Object</Typography>
                          <input
                            className="file"
                            type="file"
                            onChange={(event) => handleChange(event, index)}
                          />

                          {lang.value && (
                            <JsonEditor
                              jsonObject={lang.value}
                              onChange={(output: any) => {
                                console.log(output);
                              }}
                            />
                          )}
                        </Box>
                      )}
                    </Box>
                  ))}
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
