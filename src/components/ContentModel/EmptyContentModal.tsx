import {useState} from "react";
import EmptyFolder from "../Asset/EmptyFolder.png"
import { Button } from "@mui/material";
import "./style.css"
import { ArrowBack } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IContentField, IField } from "../../interfaces/IField";
import React from "react";
const EmptyContentModal = () =>{
    const navigate = useNavigate();
    const {contentId} = useParams();
    const {contentData} = useSelector((state: RootState)=>state.content)
    const [tableData, setTableData] = useState(contentData.find((content:IContentField)=>content.contentId===contentId));
    const actionHandler=()=>{
       
    }
    const addFieldHandler=()=>{
        navigate(`/fieldContent/${contentId}`)
    }
    React.useEffect(()=>{
        const data =  contentData.find((content:IContentField)=>content.contentId===contentId);
        if(data && data?.fields.length)
        {
            setTableData({...data});
        }
        // eslint-disable-next-line
      },[contentData])
    return(
        <div className="mainContainer">
                   <div className='header'>
           <div className='subContent'>
            <Link to="/contentModal" className="link">
                <ArrowBack />
            </Link>
            <div>
                {contentId}
            </div>
            </div>
            <div className='actionContainer'>
                <Button variant="contained" onClick={actionHandler}>
                    Save
                </Button>
            </div>
        </div>
        {tableData?.fields.length ? <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Field Name</TableCell>
            <TableCell>Field Type</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.fields.map((field:IField, rowIndex:number) => 
            <TableRow
              key={`${field.fieldName}_${rowIndex}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='pointer'
              onClick={()=>navigate(`/editJsonField/${field.fieldType}/${contentId}/${field.fieldName || ''}`)}
            >
              <TableCell component="th" scope="row">
               {field.fieldName ?? "Object"}
              </TableCell>
              <TableCell>{field.fieldType}</TableCell>
              <TableCell><Link to="#">Edit</Link></TableCell>

            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <div className="mrgT20">
<Button variant="contained" onClick={addFieldHandler}>Add Field</Button>
</div>
        </div> :
            <div className="emptyContainer">
<div>
    <img src={EmptyFolder} alt="emoty folder" height={200}/>
</div>
<div>
<Button variant="contained" onClick={addFieldHandler}>Add Field</Button>
</div>
<div>
The field type defines what content can be stored. For instance, a text field accepts titles and descriptions
</div>
            </div>}
        </div>
    )
}

export default EmptyContentModal;