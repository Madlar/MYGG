import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Loading() {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '700px', height: '100px', backgroundColor: '#e0e0e0', marginBottom: '10px'}}>
          <Spin indicator={antIcon} />
      </div>
    )
        
      
  }
  
  export default Loading;