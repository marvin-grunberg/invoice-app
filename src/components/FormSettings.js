import React, { Component } from 'react'
import { Input, Switch, Select, Button } from 'antd';
const Option = Select.Option;

class FormSettings extends Component{
  
  
  
  render(){
    
    return(
      <div>

        <div className="col" style={{height: '30px'}}><h5>Factuur instellingen</h5></div> 
         
        <div className="row pl-4 mt-3">
         <div className="col-7" style={{height: '30px'}}><p>Korting</p></div>
         <div className="col-1" style={{height: '30px'}}><p className="pl-2"><i className="fa fa-percent" aria-hidden="true"></i></p></div>        
        </div>
          <div className="row pl-4">
          <div className="col-10">
          <Input name="korting" onChange={(e)=> this.props.handleChange(e)} placeholder="Kortingspercentage"/>
          </div>
        </div>

        <div className="row pl-4 mt-3">
         <div className="col-7" style={{height: '30px'}}><p>Belasting</p></div>
         <div className="col-1" style={{height: '30px'}}><p className="pl-2"><i className="fa fa-percent" aria-hidden="true"></i></p></div>        
        </div>
          <div className="row pl-4">
          <div className="col-10">
          <Input name="belasting" onChange={(e)=> this.props.handleChange(e)} placeholder="Belastingpercentage"/>
          </div>
        </div>

        <div className="row pl-4 mt-3">
         <div className="col" style={{height: '30px'}}> <p>Voorwaarden: </p> </div>        
          <div className="col"><Switch onChange={this.props.toggleSwitch}/></div>
         
        </div>

        <div className="row pl-4 mt-3">
          <div className="col-5">
           <p>Valuta:</p>
          </div>
          <div className="col">
          <Select defaultValue="SRD" style={{ width: 80 }} onChange={this.props.setValuta}>
            <Option value="SRD">SRD</Option>
            <Option value="USD">USD</Option>          
            <Option value="EURO">EURO</Option>          
          </Select>
          </div>
         
        </div>

        <div className="row mt-5">       
          <div className="col ml-5">
          <span>
            <Button type="primary" style={{height: 50}} size='large' onClick={this.props.genPDF}> <i className="fa fa-download" aria-hidden="true"></i> Download .pdf</Button>
          </span>
          </div>
         
        </div>         
        
      </div>
    )
  }
}

export default FormSettings
