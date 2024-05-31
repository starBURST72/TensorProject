import React, { useContext, useState } from 'react';
import type { DrawerProps } from 'antd';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './Sidebar.css';
import { ContextTravel } from '../Context/AppContext';

// interface Travel {
//   id: number;
//   title: string;
//   description: string;
// }

type FullMarkerFields = {
  id: number;
  title: string;
  description: string;
  score: number;
  coordinates: [number, number];
  address: string,
  type: string,
  photo: string
}

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
  place: FullMarkerFields | null
}
const Sidebar: React.FC<SidebarProps> = ({ visible, onClose, place }) => {
  const [open, setOpen] = useState(true);
  const [placement] = useState<DrawerProps['placement']>('right');
  const { selectedTravel } = useContext(ContextTravel);

  const showDrawer = () => {
    setOpen(true);
  };

  // const onClose = () => {
  //   setOpen(false);
  // };


  return (
    // <div style={{position:'relative'}}>
    <div className='draw'>
      {/* <Button onClick={showDrawer} className='drawButton' icon={<MenuOutlined />}>
      </Button> */}
      <Drawer
        title={`Инфа${place?.title}`}
        placement={'right'}
        closable={visible}
        onClose={onClose}
        open={visible}
        key={placement}
        // style={{maxHeight:'100%'}}
        mask={false}
        getContainer={false}
        className='sidebar'
      //width={'25%'}
      >
        {
          place?.address
        }
        <img src={`data:image/jpeg;base64,${place?.photo}`} alt="place" />
        
      </Drawer>
    </div>
    // </div>
  );
};

export default Sidebar;