import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import moment from 'moment/min/moment-with-locales.min'
import { PDFExport } from '@progress/kendo-react-pdf';
import { Layout, Modal } from 'antd';
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
      await this.invoice.save();
      Modal.success({
        title: 'Succes!',
        content: 'Uw invoice wordt nu gedownload'
      });
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

  subTotal=(sub)=>{
    console.log("from app: ", sub)
  }

  
  render() {  
    return (
      <Layout >
        <Modal
        centered
        visible={this.state.visible}
        >

        </Modal>
          
      <Content  style={{ padding: '0 50px' }}>
     
      <Layout className="shadow-lg rounded" style={{ paddingTop: '24px', background: '#fff' }}>
        <Sider width={240} style={{background: "#fff"}}>
          <FormSettings 
          handleChange={this.handleChange}
          toggleSwitch={this.toggleSwitch}
          setValuta={this.setValuta}
          genPDF={this.printDocument}
          />
        </Sider>
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
      </Layout>
      
    </Content>
   
  </Layout>
    );
  }
}

export default App;
