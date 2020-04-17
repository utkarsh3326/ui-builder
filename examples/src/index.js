/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import ButtonComponent from './components/button';
import Input from './components/input';
import HeaderComponent from './components/header';
import React from 'react';
import {View} from 'react-native';
import {get} from 'lodash';

export default class UiBuilder extends React.Component {
  constructor() {
    super();
    this.selectComponent = this.selectComponent.bind(this);
  }

  selectComponent(component) {
    const type = get(component, 'type', '');
    switch (type) {
      case 'input':
        return <Input {...component.properties} />;
      case 'button':
        return <ButtonComponent {...component.properties} />;
      case 'header':
        return <HeaderComponent {...component.properties} />;
      case 'view':
        return (
          <View>
            {component.childrens.map((componentData) => {
              return this.selectComponent(componentData);
            })}
          </View>
        );
    }
  }

  render() {
    const {source} = this.props;
    return (
      <View>
        {source.map((component) => {
          return this.selectComponent(component);
        })}
      </View>
    );
  }
}
