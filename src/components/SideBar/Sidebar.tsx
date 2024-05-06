import React, { useContext, useState } from 'react';
import type { DrawerProps } from 'antd';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './Sidebar.css';
import { ContextTravel } from '../Context/AppContext';

interface Adventure {
  id: number;
  name: string;
}

interface SidebarProps {
  adventures: Adventure[];
}

const Sidebar: React.FC<SidebarProps> = ({ adventures }) => {
  const [open, setOpen] = useState(true);
  const [placement] = useState<DrawerProps['placement']>('right');
  const { travel, setTravel } = useContext(ContextTravel);

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
        title={travel.title}
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
          travel.description
        }

      </Drawer>
    </div>
    // </div>
  );
};

export default Sidebar;