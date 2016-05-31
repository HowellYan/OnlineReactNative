'use strict';
import React, { Component } from 'react';
import {
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	 list: {
    marginTop:5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    width: 120,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 0,
    borderColor: '#CCC'
  },
  thumb: {
  	marginTop:15,
    width: 100,
    height: 60
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  }
});

module.exports = styles;