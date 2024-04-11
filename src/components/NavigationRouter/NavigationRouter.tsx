import {Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import ContentModal from '../ContentModel/ContentModal';
import Content from '../Content/Content';
import EmptyContentModal from '../ContentModel/EmptyContentModal';
import FieldDialog from '../FieldDialog/FieldDialog';
import AddFieldDialog from '../AddFieldDialog/AddFieldDialog';
import AddJsonFieldDialog from '../AddFieldDialog/AddJsonField';
const NavigationRouter = () => {
 return (
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contentModal" element={<ContentModal />} />
          <Route path="/content" element={<Content />} />
          <Route path="/contentField/:contentId" element={<EmptyContentModal />} />
          <Route path="/fieldContent/:contentId" element={<FieldDialog />} />
          <Route path="/addField/:fieldType/:contentId" element={<AddFieldDialog />} />
          <Route path="/addJsonField/:fieldType/:contentId" element={<AddJsonFieldDialog />} />
          <Route path="/editJsonField/:fieldType/:contentId/:fieldName" element={<AddJsonFieldDialog />} />

       </Routes>
 );
};

export default NavigationRouter;