import React, { Component } from 'react';
import { Button } from 'react-native';

export default class LocationPane extends Component{

  render(){
    return (

      <Button onPress={this.getLocation} title="Use your location"/>
    );
  }

  getLocation = ()=>{
    navigator.geolocation.getCurrentPosition(
      (pos)=>{
        this.props.moveOn(pos.coords);
      },
      (err)=>{
        alert('problem getting location\n'+JSON.stringify(err))
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      }
    );
  }
}
