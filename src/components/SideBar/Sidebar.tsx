import React, { useState } from 'react';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { Button, Drawer, Radio, Space } from 'antd';
import {MenuOutlined} from '@ant-design/icons';
import './Sidebar.css';

interface SidebarProps {
    adventures: string[];
  }

  const Sidebar: React.FC<SidebarProps> = ({ adventures }) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  return (
    <>
 
        
        <Button ghost onClick={showDrawer} icon={ <MenuOutlined />}>
        </Button>

      <Drawer
        title="Меню"
        placement={'right'}
        closable={true}
        onClose={onClose}
        open={open}
        key={placement}
        //width={'25%'}
      >
        {
            adventures.map(adv=>
                <h1 style={{marginBottom:15}}>{adv}</h1>
                
            )
        }
        
      </Drawer>
    </>
  );
};

export default Sidebar;