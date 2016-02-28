import React from 'react';
import Avatar from './avatar';

var DualAvatar = (props) => {
  return <div className="heads"
       style={{
         position:'relative'
       }}>
    <Avatar url={props.endAvatar}
            size={50}/>
    <div style={{
        width:40,
        height:40,
        position:'absolute',
        right:-20,
        bottom:-20,
        backgroundImage:`url(${props.canAvatar})`,
        backgroundSize:'cover'
      }}></div>
  </div>
}

export default DualAvatar;
