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



const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [placement] = useState<DrawerProps['placement']>('right');
  const { selectedTravel } = useContext(ContextTravel);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  return (
    // <div style={{position:'relative'}}>

    <div className='draw'>
      <Button onClick={showDrawer} className='drawButton' icon={<MenuOutlined />}>
      </Button>
      <Drawer
        title={selectedTravel?.title}
        placement={'right'}
        closable={true}
        onClose={onClose}
        open={open}
        key={placement}
        // style={{maxHeight:'100%'}}
        mask={false}
        getContainer={false}
        className='sidebar'
      //width={'25%'}
      >
        {
          selectedTravel?.description
        }

      </Drawer>
    </div>
    // </div>
  );
};

export default Sidebar;