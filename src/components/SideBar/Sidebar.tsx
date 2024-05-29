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

type MarkerFields =
  {
    coordinates: [number, number],
    hint: string;
  }

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
  place: MarkerFields|null
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
        title={`Инфа${place?.hint}`}
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
          place?.hint
        }

      </Drawer>
    </div>
    // </div>
  );
};

export default Sidebar;