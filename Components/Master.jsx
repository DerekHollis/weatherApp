import React, { Component } from 'react';
import LocationPane from './LocationPane.jsx'
import SearchPane from './SearchPane.jsx'
import Results from './Results.jsx'
import { View, Text, StyleSheet } from 'react-native';

export default class Master extends Component{

  state={}

  constructor(){
    super();
    this.state.body = (<View>
            <Text style={styles.heading}>Weather App</Text>
            <LocationPane moveOn = {this.displayStats}></LocationPane>
            <Text style={styles.heading}>-OR-</Text>
            <SearchPane moveOn = {this.displayStats}></SearchPane>
          </View>);
  }

  render(){
    return (
      this.state.body
    );
  }

  displayStats =(position)=>{
    console.log(position);
    let url = "https://secure.geonames.org/timezoneJSON?lat="+position.latitude+"&lng="+position.longitude+"&username=swmonk";
    console.log(url);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=> {
      console.log('hi');

      if (xhttp.readyState == 4 && xhttp.status == 200) {

        let timeData = JSON.parse(xhttp.responseText);
        url = "https://secure.geonames.org/findNearByWeatherJSON?lat="+position.latitude+"&lng="+position.longitude+"&username=swmonk";
console.log(url);
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=> {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            let weatherData = JSON.parse(xhttp.responseText);

            console.log(timeData);
            console.log(weatherData);

            this.setState({body:<Results weatherData={weatherData} timeData={timeData}></Results>});
          }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 30,
    padding: 10
  },

});
