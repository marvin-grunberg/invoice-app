import React, { Component } from 'react'
import { Icon, message } from 'antd';

class ImageUpload extends Component{
  constructor(props){
    super(props)
    this.state={
      logo: null
    }
  }

  handleChange=(e)=>{
    const isjpg = e.target.files[0].type === 'image/jpeg' 
    const ispng = e.target.files[0].type === 'image/png'
    if(!isjpg && !ispng){
      this.showError("Selecteer een afbeelding (jgp of png)")
      return;
    }
    
    const imageSize = e.target.files[0].size / 1024 / 1024 < 1.5;
    if(!imageSize) {
      this.showError("Afbeelding is te groot (max 1.5MB)")      
      return
    }
 
    if(e.target.files[0]){
      const logo = URL.createObjectURL(e.target.files[0]);
      this.setState({
          logo,
          imageName: e.target.files[0].name
        })  
      }
  }

  showError = (txt) => {
    message.error(txt, 3);
  };


  render(){
    const emptyArea = <div className="uploadArea alignMiddle"> <p className="logoText">Logo</p> </div>
    const logo = <img src={this.state.logo} alt="" className="logoPlaceholder img-fluid" name='logo' /> 
    const  uploadArea = this.state.logo == null ? emptyArea : logo
    return(
      <div className="row">        
       
        <div className="col-md-3">
       
        {uploadArea}
        </div>
        <div className="col-md-2">
        <span className="btn btn-primary btn-sm uploadButton "><Icon type="edit" theme="filled" /> <input type="file" onChange={this.handleChange} value=""/></span>
        </div>
      </div>
    )
  }
}

export default ImageUpload