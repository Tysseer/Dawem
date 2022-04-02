import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { connect } from 'react-redux';
import { reduxActionSetWelcomeFlag } from '../redux/reduxActions';
import * as strings from '../helpers/StringsManager';
import StringsManager from '../helpers/StringsManager';
import ActionBtn from 'app/components/ActionBtn';
import Screen from 'app/components/Screen';

class ScreenWelcome extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    //console.log(Dimensions.get("window"));
  }

  okButtonPressed() {
    this.props.navigation.navigate('Home', { screen: 'ScrList' });
  }

  render() {
    return (
      <Screen>
        <View style={styles.mainContainer}>
          <View style={{ width: '100%', alignItems: 'center', height: '68%' }}>
            <View style={styles.messageContainer}>
              <ImageBackground
                source={require('assets/backgroundPNG/green_background_withQuran.png')}
                style={styles.backgroundImage}
              >
                <View style={{ width: '93%' }}>
                  <Text style={this.getTitleStyle()}>
                    {this.stringsManager.getStr(strings.STR_GREETING)}
                  </Text>
                  <Text style={this.getSubTitleStyle()}>
                    {this.stringsManager.getStr(strings.STR_MOTIVATION)}
                  </Text>
                  <View style={[styles.separator, { alignSelf: 'center' }]} />
                  <Text style={this.getInstructionsTitleStyle()}>
                    {this.stringsManager.getStr(strings.STR_INSTRUCTIONS_TITLE)}
                  </Text>
                  <Text style={this.getInstructionsStyle()}>
                    {this.stringsManager.getStr(strings.STR_INSTRUCTIONS)}
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={this.getCheckBoxContainerStyle()}>
              <CheckBox
                onClick={() => {
                  this.props.reduxActionSetWelcomeFlag(
                    !this.props.bSkipWelcome
                  );
                }}
                isChecked={this.props.bSkipWelcome}
                checkBoxColor="#0C3D11"
              />
              <TouchableHighlight
                onPress={() => {
                  this.props.reduxActionSetWelcomeFlag(
                    !this.props.bSkipWelcome
                  );
                }}
                underlayColor="#FFFFFF11"
              >
                <Text style={this.getCheckBoxTextStyle()}>
                  {this.stringsManager.getStr(strings.STR_SKIP_SCREEN)}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          <ActionBtn
            text={this.stringsManager.getStr(strings.STR_START_NOW)}
            handler={this.okButtonPressed.bind(this)}
            lang={this.props.strLang}
            style={{ height: 60, width: '100%', marginBottom: '2%' }}
          />
        </View>
      </Screen>
    );
  }
  getTitleStyle() {
    return {
      fontSize: this.props.strLang == 'ar' ? 36 : 32,
      lineHeight: this.props.strLang == 'ar' ? 63 : 50,
      fontFamily: this.props.strLang == 'ar' ? 'Amiri_Bold' : 'Poppins-Bold',
      textAlign: 'center',
      color: '#FFFFFF',
      margin: 15,
    };
  }
  getSubTitleStyle() {
    return {
      fontSize: this.props.strLang == 'ar' ? 22 : 16,
      lineHeight: this.props.strLang == 'ar' ? 36 : 28,
      fontFamily: this.props.strLang == 'ar' ? 'Amiri' : 'Poppins',
      textAlign: 'center',
      color: '#FFFFFF',
    };
  }
  getInstructionsTitleStyle() {
    return {
      fontSize: this.props.strLang == 'ar' ? 24 : 18,
      lineHeight: this.props.strLang == 'ar' ? 36 : 30,
      fontFamily: this.props.strLang == 'ar' ? 'Amiri_Bold' : 'Poppins-Bold',
      textDecorationLine: 'underline',
      color: '#FFFFFF',

      alignSelf: 'flex-start',
      marginBottom: 10,
    };
  }
  getInstructionsStyle() {
    return {
      fontSize: this.props.strLang == 'ar' ? 22 : 16,
      lineHeight: this.props.strLang == 'ar' ? 36 : 30,
      fontFamily: this.props.strLang == 'ar' ? 'Amiri' : 'Poppins',
      alignSelf: 'flex-start',
      color: '#FFFFFF',
    };
  }
  getCheckBoxContainerStyle() {
    return {
      flexDirection: 'row',
      width: '100%',
      marginTop: '2%',
    };
  }
  getCheckBoxTextStyle() {
    return {
      fontSize: this.props.strLang == 'ar' ? 15 : 13,
      fontFamily: this.props.strLang == 'ar' ? 'Amiri_Bold' : 'Poppins-Bold',
      textAlign: 'center',
      color: '#0C3D11',
      lineHeight: this.props.strLang == 'ar' ? 30 : 28,
      marginHorizontal: 4,
    };
  }
}
const mapStateToProps = (state) => ({
  bSkipWelcome: state.bSkipWelcome,
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {
    reduxActionSetWelcomeFlag,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ScreenWelcome);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    justifyContent: 'space-between',
  },
  messageContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },

  separator: {
    borderColor: '#FFFFFF59',
    borderWidth: 1,
    borderRadius: 10,
    width: 280,
    height: 1,
    marginVertical: 15,
  },
});
