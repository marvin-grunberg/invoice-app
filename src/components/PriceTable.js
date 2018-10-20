import React from 'react'
import { Table, Input, Form } from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"                  
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '',
      dataIndex: 'operation',
      width: '5%',
      render: (text, record) => {
        return (
          this.state.dataSource.length >= 1
            ? (              
                <i onClick={()=>this.handleDelete(record.key)} className="fa fa-minus-circle" aria-hidden="true" style={{cursor: 'pointer'}}></i>             
            ) : null
        );
      },
    },{
      title: 'Omschrijving',
      dataIndex: 'omschrijving',
      width: '54%',
      editable: true      
    }, {
      title: 'Aantal',
      dataIndex: 'aantal',
      width: '14%',
      editable: true,
      className: 'text-right'
    }, {
      title: 'Prijs',
      dataIndex: 'prijs',
      width: '14%',
      editable: true,
      className: 'text-right'
    }, {
      title: 'Bedrag',
      dataIndex: 'bedrag',
      width: '13%',
      editable: false,
      className: 'text-right'
    }];

    this.state = {
      dataSource: [],
      count: 1,  
      subTotal: ''   
    };
  }

  handleDelete = async (key) => {
    const dataSource = [...this.state.dataSource];
    await this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    this.getSubTotal()
  }

  handleAdd = () => {    
    const { count, dataSource } = this.state;   
    const newData = {
      key: count,
      className: "placeholderText",
      omschrijving: 'omschrijving',
      aantal: '0',
      prijs: '0',
      bedrag: ''
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

    handleSave = async (row) => {    
    const aantal = parseInt(row.aantal)
    const prijs = parseInt(row.prijs)
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);    
    row.bedrag = isNaN((aantal * prijs)) ? '' : (aantal * prijs) 
      
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
   
   await this.setState({ dataSource: newData })
    
    this.getSubTotal()    
  }

  getSubTotal=()=>{
    const { dataSource } = this.state;
    // console.log(dataSource)
    const totalArray = dataSource.map(x => {return x.bedrag})
    const arraySum = arr => arr.reduce((a,b)=> a+b, 0)
    const subTotal = arraySum(totalArray)    
   
    this.props.subTotal(subTotal)
  }
  


  render() {
    const { dataSource } = this.state;   
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <button onClick={this.handleAdd} className="btn btn-primary" style={{ marginBottom: 16 }} >
          Item toevoegen
        </button>

        <Table
          components={components}
          rowClassName={() => 'editable-row'}          
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size='middle'    
          locale={{emptyText:"Item's toevoegen"}}      
        />

        
      </div>
    );
  }
}

export default EditableTable