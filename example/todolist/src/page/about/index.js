import React from 'react';
import { Link } from "react-router-dom";

class Page extends React.Component {

  render() {
    
    return <div>
      about <Link to="/">/</Link>
    </div>
  }
}

export default Page;