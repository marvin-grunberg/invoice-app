import React, { Component } from 'react'
import { DatePicker, Input, Divider } from 'antd';
import EditableTable from './PriceTable';
import moment from 'moment'
import 'moment/locale/nl';
import { locales } from 'moment';
import currency from 'currency.js'
import locale from 'antd/lib/date-picker/locale/nl_NL'
import ImageUpload from './ImageUpload';
const { TextArea } = Input


class FormInvoice extends Component {
  constructor(props){
    super(props)
    this.state={
      loading: false,
      editing: false,
      subTotal: 0,
      props: ''
    }
  }  
 
  subTotal=(subTotal)=>{   
   this.setState({
     subTotal
   })
  }

   
  render(){
 const SRD = value => currency(value, { symbol: "SRD ", separator: '.', decimal: ',', precision: 2})
 const USD = value => currency(value, { symbol: "USD ", separator: ',', decimal: '.', precision: 2})
 const EURO = value => currency(value, { symbol: "EURO ", separator: '.', decimal: ',', precision: 2})
 const { korting, belasting, valuta, } = this.props;
 const { subTotal } = this.state
 const metKorting = (subTotal/100) * korting
 const naKorting = subTotal - metKorting
 const metBelasting = metKorting === 0 ? (subTotal/100) * belasting : (naKorting/100) * belasting
 const totaal = naKorting + metBelasting
   const placeholderAfzender = `Kudi Company N.V.
Kudistraat #01
kudi@awesome.sr
+597 444 555`
   const placeholderOntvanger = `Mi No Pai N.V.
Minopaistraat #02
info@minopai.sr
+597 555 444`
   const placeholderBetaal = `DSB SRD: 00.11.234
DSB USD: 00.11.234
DSB EURO: 00.11.234
`
   const placeholderVoorwaarden = `Wij verzoeken u vriendelijk het verschuldigde bedrag uiterlijk op de vervaldatum over te maken ondervermelding van het factuurnummer.`
   
   const voorwaarden = this.props.voorwaarden ?  <div className="col">
   <p className="mb-1">Betaalvoorwaarden</p>
   <TextArea rows={4} disabled={!this.props.voorwaarden} placeholder={placeholderVoorwaarden}/>
  </div> : null

    return(
      <div className="invoiceForm" id="invoice">
        <div className="row ml-1">
          <div className="col">
          
          <ImageUpload />
          </div>
        </div>  
        <div className="row mt-3 ml-1"> {/* dates row */}       

          <div className="col-md-4" style={{paddingLeft: 0}}>
          <div>
           <span className="align-text-bottom"> Factuurdatum: </span><DatePicker  style={{paddingLeft: '1px', width: '120px'}} onChange={(date, dateString)=>this.props.setDateFact(date, dateString)} format='DD MMM YY'
            placeholder=" "
            locale={locales.nl_NL}
            />
          </div>
          </div>

          <div className="col-md-4" style={{paddingLeft: 0}}>
          <div>
           <span className="align-text-bottom"> Vervaldatum:</span> <DatePicker  style={{paddingLeft: '1px', width: '120px'}} onChange={(date, dateString)=>this.props.setDateVerv(date, dateString)} format='DD MMM YY'
            placeholder=" "  
            locale={locales.nl_NL}      
            />
          </div>
          </div>

          <div className="col-md-4" style={{paddingLeft: 0}}>
            <div>
            <span className="align-text-bottom">Factuur#:</span> <Input 
            name="factuurNummer"
            onChange={(e)=> this.props.handleChange(e)}
            style={{paddingLeft: '8px', width: '120px'}} 
            />
            </div>
          </div>

        </div>   {/* end dates row */}    


        <div className="row mt-4 ml-1"> {/* information row */}   
         <div className="col">
          <p className="mb-1">Afzender:</p>
          <TextArea rows={4} className="mb-4" 
            placeholder={placeholderAfzender}
            
          />
         </div>
        
         <div className="col offset-1">
          <p className="mb-1">Aan:</p>
          <TextArea rows={4} className="mb-4" placeholder={placeholderOntvanger}/>
         </div>

        </div> {/* end information row */}    
       
        

        <div className="row ml-1">
        <div className="col">
          <EditableTable subTotal={this.subTotal}/>
        </div>
        </div>
        <div className="row mt-4 no-gutters">
          <div className="col-2 offset-8">
            <p style={{marginBottom: '8px', display: 'inline'}} >Sub totaal: </p>
          </div>
            <div className="col-2">
            <p className="text-right mb-1">{valuta === 'SRD' ? SRD(subTotal).format(true) : valuta === "USD" ? USD(subTotal).format(true) : valuta === "EURO" ? EURO(subTotal).format(true) : null}</p>
            <Divider style={{marginTop: 0, marginBottom: 8}}  />
            </div>
        </div>

        <div className="row no-gutters">
          <div className="col-2 offset-8">
            <p style={{marginBottom: '8px'}} >Korting: </p>
          </div>
          <div className="col-2">
            <p className="text-right mb-1">{valuta === 'SRD' ? SRD(metKorting).format(true) : valuta === "USD" ? USD(metKorting).format(true) : valuta === "EURO" ? EURO(metKorting).format(true) : null}</p>
            <Divider style={{marginTop: 0, marginBottom: 8}}  />
            </div>
        </div>

        <div className="row no-gutters">
          <div className="col-2 offset-8">
            <p style={{marginBottom: '8px'}} >OB: </p>            
          </div>
          <div className="col-2">
            <p className="text-right mb-1">{valuta === 'SRD' ? SRD(metBelasting).format(true) : valuta === "USD" ? USD(metBelasting).format(true) : valuta === "EURO" ? EURO(metBelasting).format(true) : null}</p>
            <Divider style={{marginTop: 0, marginBottom: 8}}  />
            </div>
        </div>       

        <div className="row no-gutters">
          <div className="col-2 offset-8">
            <p style={{marginBottom: '8px'}} ><strong>Totaal: </strong> </p>
                     
          </div>
          <div className="col-2">
            <p className="text-right mb-1"><strong>{valuta === 'SRD' ? SRD(totaal).format(true) : valuta === "USD" ? USD(totaal).format(true) : valuta === "EURO" ? EURO(totaal).format(true) : null}</strong></p>
            <Divider  style={{marginTop: 0, marginBottom: 8, height: 3}}  />  
            </div>
        </div>

        <div className="row mt-5 ml-1 mb-4"> {/* information row */}   
         <div className="col-md-6">
          <p className="mb-1">Betaalgegevens</p>
          <TextArea rows={4} placeholder={placeholderBetaal}/>
         </div>
        
        {voorwaarden}

        </div> {/* end information row */}      
        <div className="row mt-1 ml-1">
          <div className="col">
            <p className="text-center align-middle pt-2 pb-2 pr-3" style={{color: 'white', backgroundColor: "#57606f"}}>Invoice gemaakt met Kudi - www.kudiapp.com</p>
          </div>
        </div>
      </div>
    )
  }
}

export default FormInvoice