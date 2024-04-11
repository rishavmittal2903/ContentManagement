import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./style.css"
import { Button } from '@mui/material';
import ModalDialog from '../ModalDialog/ModalDialog';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IContentField } from '../../interfaces/IField';

export default function ContentModal() {
    const [isOpen, setOpen] = React.useState(false);
    const {contentData} = useSelector((state: RootState)=> state.content)
    const navigate = useNavigate();

    const actionHandler=()=>{
        setOpen(true);
    }
    const rowHandler=(id:string)=>{
navigate(`/contentField/${id}`);
    }
  return (
    <div>
        <div className='header'>
           <div className='subContent'>
           
            <div className='title'>
               Content Type
            </div>
            </div>
            <div className='actionContainer'>
                <Button variant="contained" onClick={actionHandler}>
                    Create Content Type
                </Button>
            </div>
        </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Fields</TableCell>
            <TableCell align="right">Last Updated By</TableCell>
            <TableCell align="right">Updated at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contentData.map((content:IContentField, keyIndex:number) => (
            <TableRow
              key={`${content.contentId}_${keyIndex}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={()=>rowHandler(content.contentId)}
              className='pointer'
            >
              <TableCell component="th" scope="row">
                <div>{content.contentId}</div>
                <div className='subtitle'>{content.contentDescription}</div>
              </TableCell>
              <TableCell align="right">{content.fields.length}</TableCell>
              <TableCell align="right">{content.updatedBy}</TableCell>
              <TableCell align="right">{content.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {isOpen && <ModalDialog />}
    </div>
  );
}