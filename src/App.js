import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import moment from 'moment/min/moment-with-locales.min'
import { PDFExport } from '@progress/kendo-react-pdf';
import { Layout, Modal, Icon } from 'antd';
import { FacebookProvider, Like } from 'react-facebook';
import FormSettings from './components/FormSettings';
import FormInvoice from './components/FormInvoice';

const { Content, Sider } = Layout;

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      korting: 0,
      belasting: 0,
      voorwaarden: false,
      valuta: 'SRD',
      factuurDatum: '',
      vervalDatum: '',
      factuurNummer: '',
      visible: false   
    }
  }

  toggleModal=()=>{
    this.setState({
      visible: !this.state.visible
    })
  }

  printDocument = async () => {    
    const fbLike= <div className="fb-like" data-href="https://www.facebook.com/Kudi-460370791152066/?view_public_for=460370791152066" data-layout="standard" data-action="like" data-size="large" data-show-faces="true" data-share="true"></div>
      await this.invoice.save();
      Modal.success({
        title: 'Succes!',      
        content: (`${fbLike} Uw invoice wordt nu gedownload`)
      });
      // this.toggleModal()
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })   
  }

  toggleSwitch=()=>{
    this.setState({
      voorwaarden: !this.state.voorwaarden
    })
  }

  setValuta=(value)=>{
    this.setState({
      valuta: value
    })
  }

  setDateFact=(date, dateString)=>{
    this.setState({
      factuurDatum: moment(date).format('LL')
    })
  }

  setDateVerv=(date, dateString)=>{
    this.setState({
      vervalDatum: moment(date).format('LL')
    })

  }


  
  render() {  
        
    
    return (
      <Layout >
   
      <Content  style={{ padding: '0 50px' }}>
     
     <div className="row mb-3">
     <div className="col-md-9 shadow rounded" style={{background: "#fff"}}>
       <Content style={{ padding: '0 24px', minHeight: 280 }} id="docu">        
        <PDFExport 
          paperSize='A4'
          fileName="kudi-invoice.pdf"
          title=""
          subject=""
          margin= "1cm"
          scale={0.8}
          ref={(r) => this.invoice = r}
        >          
          <FormInvoice 
          handleChange={this.handleChange}
          setDateFact={this.setDateFact}        
          setDateVerv={this.setDateVerv}        
          korting={this.state.korting}
          belasting={this.state.belasting}
          voorwaarden={this.state.voorwaarden}
          valuta={this.state.valuta}
          subTotal={this.subTotal}
          />        
        </PDFExport>
        </Content>
       </div>
       <div className="col-md-3">
       <Sider width={240} style={{background: "#F0F2F5"}}>
          <FormSettings 
          handleChange={this.handleChange}
          toggleSwitch={this.toggleSwitch}
          setValuta={this.setValuta}
          genPDF={this.printDocument}
          />
        </Sider>
       </div>
     </div>

  
      
    </Content>
   
  </Layout>
    );
  }
}

export default App;
