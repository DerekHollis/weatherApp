import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export default class Results extends Component{

  state = {
    day : true
  }

  constructor(props){
    super(props);
    try{
      this.state.day = this.numberTime(props.timeData.time) < this.numberTime(props.timeData.sunset) && this.numberTime(props.timeData.time) > this.numberTime(props.timeData.sunrise);
    } catch {
      console.log('bad constructor');
    }
  }

  render(){
    try{
      let weather = this.props.weatherData.weatherObservation,
        time = this.props.timeData;
      console.log(weather, time);
      return (
      <View style={[this.state.day?styles.day:styles.night, styles.fullsize]}>
        <Text style={[this.state.day?styles.day:styles.night, styles.heading]}>Weather App</Text>
        <Text style={[this.state.day?styles.day:styles.night, styles.heading]}>{weather.stationName}</Text>
        <Text style={[this.state.day?styles.day:styles.night, styles.heading]}>{time.time.split(" ")[1]}</Text>
        <Text style={[this.state.day?styles.day:styles.night, styles.heading]}>{weather.clouds}</Text>
        <Text style={[this.state.day?styles.day:styles.night, styles.heading]}>{weather.temperature}C</Text>
        <Text style={[this.state.day?styles.day:styles.night, styles.heading]}>{weather.weatherCondition}</Text>
      </View>
      );
    } catch{
      console.log('failure');
      return <Text>Error parsing the json</Text>;
    }
  }

  numberTime = (stringTime)=>{
    //console.log(stringTime);
    stringTime = stringTime.split(' ')[1].split(":");
    return Number(stringTime[0]+stringTime[1]);
  }
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 30,
    borderBottomWidth :2,
    borderBottomColor: '#000',
    
  },

  day: {
    backgroundColor: '#008fff',
    color:'black'
  },
  night: {
    backgroundColor: '#0033aa',
    color:'#ffff'
  },
  fullsize:{
    height:'100%',
    width:'100%',
    paddingTop:20
  }
});
