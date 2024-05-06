import React, { useState } from 'react';
import type { DrawerProps } from 'antd';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './Sidebar.css';

interface Adventure {
  id: number;
  name: string;
}

interface SidebarProps {
  adventures: Adventure[];
}

const Sidebar: React.FC<SidebarProps> = ({ adventures }) => {
  const [open, setOpen] = useState(false);
  const [placement] = useState<DrawerProps['placement']>('right');


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
        title="Меню"
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
          adventures.map(adv =>
            <h1 key={adv.id} style={{ marginBottom: 15 }}>{adv.name}</h1>

          )
        }

      </Drawer>
    </div>
    // </div>
  );
};

export default Sidebar;