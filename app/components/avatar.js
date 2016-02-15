import React from 'react';
import '../styles/avatar.scss';

var Avatar = (props) => {
  const { size=60, url } = props;
  return <div className="avatar-img-holder"
              style={{
                borderRadius:size,
                height:size,
                width:size,
                overflow:'hidden'
              }}>
       <div className="background-image-holder"
           style={{
             height:size,
             width:size,
             backgroundImage:`url(${url})`,
             backgroundSize:'cover',
             backgroundPosition:'center center'
           }}>
       </div>
  </div>
}

export default Avatar
