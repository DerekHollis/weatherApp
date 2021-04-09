import React, { Component } from 'react';
import { View, Text, Button, TextInput, Picker, StyleSheet } from 'react-native';
DOMParser = require('xmldom').DOMParser;

export default class SearchPane extends Component{

  state={
    info:{},
    searchPhrase: null,
    resultLocations: [],
    selected:0
  }

  render(){
    return (
      <View>
        <TextInput style={styles.box} onChangeText={(e)=>this.state.searchPhrase = e} placeholder='place name'/>
        <View style={styles.button}><Button onPress={this.doSearch} title="Search"/></View>
        <Picker style={styles.moveAway} selectedValue={this.state.selected} onValueChange={this.handleSelection}>
          {this.state.resultLocations.map(x=><Picker.Item label={x.childNodes[1].firstChild.data+', '+x.childNodes[13].firstChild.data} value=
          {JSON.stringify({latitude:x.childNodes[5].firstChild.data, longitude:x.childNodes[7].firstChild.data})}/>)}
        </Picker>
        <View><Button onPress={()=>{this.props.moveOn(this.state.info)}} title="Move on"/></View>
      </View>
    );
  }

  handleSelection = (e, f)=>{
    //alert(e);
    this.setState({info: JSON.parse(e), selected: e});
  }

  doSearch = ()=>{
    let url = "https://secure.geonames.org/search?q="+this.state.searchPhrase+"&maxRows=20&featureCode=ppl&username=swmonk";
    //alert(this.state.searchPhrase);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        let parser=new DOMParser();
        let xmlDoc=parser.parseFromString(xhttp.responseText,"text/xml").getElementsByTagName('geoname');
        xmlDoc =  Array.prototype.slice.call( xmlDoc, 0 );
        //alert(xmlDoc[0].childNodes[1].firstChild.data.toString());
        //alert(xmlDoc.toString());
        this.setState({resultLocations:xmlDoc});

        this.setState({latitude:xmlDoc[0].childNodes[5].firstChild.data, longitude:xmlDoc[0].childNodes[7].firstChild.data});
      }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
  }
}

const styles = StyleSheet.create({
  box:{
    borderWidth: 1,
    borderColor:'black'
    
  },
  hide:{
    display:'none'
  },
  moveAway:{
    marginTop: 2
  }
});
