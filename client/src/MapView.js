import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

const mapStyles = {
    width: '400px',
    height: '200px', 
    position: 'static',
    top: '10%',
    bottom : '10%',
  };

class MapView extends React.Component{

    state = {currentLat : 35.71, currentLng : 51.40}

    handleClick(event){
        this.setState({currentLat : event.latLng.lat(), currentLng : event.latLng.lng()})
    }

    render() {
        return (
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            chi={(e) => this.handleClick(e)}
            initialCenter={{
             lat: 35.71,
             lng: 51.40
            }}
          />
        );
      }
    }
    
    export default GoogleApiWrapper({
      apiKey: "AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28"
    })(MapView);