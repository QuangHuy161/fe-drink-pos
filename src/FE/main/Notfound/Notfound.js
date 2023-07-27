import React from 'react';
import { Link,useNavigate} from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
  return(
  <div className="not-found r\">
    <img
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
    />
    <button onClick={goBack}>Go Back</button>
  </div>
  )
};

export default NotFound;