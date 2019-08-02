import React, { Component } from 'react';

export default class Number extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '7003-7004, 0-4, 7000, 7002, 7005, 9000, 9001',
      inputList: ['7003-7004', '0-4', '7000', '7002', '7005', '9001'],
      data: '500, 700, 650, 690, 7000, 7001, 7002, 7003, 7004, 7005, 0, 1, 2, 3, 4',
      dataList: [500, 700, 650, 690, 7000, 7001, 7002, 7003, 7004, 7005, 0, 1, 2, 3, 4],
      duplicateList: [],
      messages: [],
      finalList: []
    };
  }

  changeInputList = ({target}) => {
    const { value } = target;

    const updateInputList = [];
    value.trim().split(',').map(a=>{
      if(a.trim() === '') {
        return false;
      } else {
        updateInputList.push(a);
      }
    });

    this.setState({
      input: value,
      inputList: updateInputList
    });
  }

  changeDataList = ({target}) => {
    const { value } = target;

    const updateDataList = [];
    value.trim().split(',').map(a=>{
      const parsed = parseInt(a);
      if (parsed) {
        updateDataList.push(parsed);
      }
    });

    this.setState({
      data: value,
      dataList: updateDataList
    });
  }

  solution = () => {
    const { dataList, inputList, input } = this.state;
    const list = [...dataList];
    const messages = [];

    const [finalList, duplicateList] = findUniques(list, input);

    this.setState({
      duplicateList,
      messages,
      finalList
    });
    function findUniques(list, input) {
      const wholeData = [...list];
      const duplicates = [];
      const individualValue = input.split(",");

      individualValue.forEach( (value)=> {
        if(value.includes('-')) {
          const seriesValue = value.split('-');
          let newValue = parseInt(seriesValue[0]);
          while(newValue <= parseInt(seriesValue[1])) {
            console.log('inside the while');
            if(wholeData.indexOf(newValue) !== -1) {
              messages.push(`Duplicate found for ${newValue}`);
              duplicates.push(newValue);
            } else {
              wholeData.push(newValue);
            }
            newValue += 1;
          }

        } else {
          const check = parseInt(value);
          if(wholeData.indexOf(check) !== -1) {
            messages.push(`Duplicate found for ${check}`);
            duplicates.push(check);
          } else {
            wholeData.push(check);
          }
        }
      });
      return [wholeData, duplicates];
    }

  }

  render() {

    const { input, duplicateList, data, messages, finalList } = this.state;

    return (
      <div>
        <br/>
        <p> Finding out the unique & duplicate numbers </p>
        <br/>
        Input : <input type="text" onChange={this.changeInputList} value={input} /> <span className="string_warn"> ( Use the proper string ) </span>
        <br/>
        <br/>
        NumberList : <input type="text" onChange={this.changeDataList} value={data}/> <span className="string_warn"> ( Use the proper string ) </span>
        <br/>
        <br/>
        <button onClick={this.solution}> Check the output </button>
        <br/>
        <br/>
        <div className="duplicates">
          { messages.map((message)=>(<li key={message}> {message} </li> )) }
        </div>

        <br/>
        <p> Duplicates found : { duplicateList.join(', ') } </p>

        <br/>
        <p> Final List : { finalList.join(', ') } </p>
      </div>
    )
  }
}
