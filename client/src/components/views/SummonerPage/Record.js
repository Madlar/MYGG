import { useState, useEffect } from 'react';
import { List, Avatar, Button, Skeleton, Card } from  'antd'
import axios from 'axios';

function Record(props) {

    return(
        <div style={{ display: 'flex', width: '700px', height: '100px', justifyContent: 'center', border: '1px solid black', marginBottom: '10px' }}>
            {props.record.info.gameId}
        </div>
    )
}

export default Record