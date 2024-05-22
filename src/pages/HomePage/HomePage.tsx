import React from 'react'
import { Button, Input, Select, Space, Typography  } from 'antd';
import './HomePage.css'
export default function HomePage() {
    return (
        <div className='homepage'>
            <Typography.Title level={4}>Куда поедем?</Typography.Title>
            <Space.Compact style={{ width: '30%' }} size='large'>
                <Input  placeholder="Введите город"/>
                <Button style={{backgroundColor:'#5c62ec'}} type="primary">Поехали!</Button>
            </Space.Compact>
        </div>
    )
}

// function HomePage() {
//     return(<div className="title">
//         <p style={{textAlign:'center'}}>Главная страница</p>
//     </div>);
// }
// export default HomePage;