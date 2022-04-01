import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  I18nManager,
} from 'react-native';
import * as strings from '../helpers/StringsManager';
import StringsManager from '../helpers/StringsManager';
import * as Updates from 'expo-updates';
import ActionBtn from '../../components/ActionBtn';
import { MaterialIcons } from '@expo/vector-icons';

import {
  reduxActionSetLanguage,
  reduxActionSetFirstRunFlag,
} from '../redux/reduxActions';

class ScreenLanguage extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
  }

  arLangPressed() {
    this.props.reduxActionSetLanguage('ar');
    // I18nManager.forceRTL(true);
    // Updates.reloadAsync();
  }
  enLangPressed() {
    this.props.reduxActionSetLanguage('en');
    // I18nManager.forceRTL(false);
    // Updates.reloadAsync();
  }
  okButtonPressed() {
    this.props.reduxActionSetFirstRunFlag(false);
    if (this.props.strLang == 'ar') {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
    Updates.reloadAsync();
    // if (this.props.isSkipWelcome == false)
    //   this.props.navigation.navigate("ScrWelcome");
    // else this.props.navigation.navigate("ScrList");
  }
  render() {
    this.stringsManager.setLanguage(this.props.strLang);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.quranLogoContainer}>
          <Image
            source={require('assets/images/Quran_logo.png')}
            style={{ resizeMode: 'contain' }}
          />
        </View>
        <View style={styles.allLangsContainer}>
          <TouchableWithoutFeedback onPress={this.enLangPressed.bind(this)}>
            <View style={this.getLangContainerStyle('en')}>
              <Image
                source={require('assets/images/lang_en.png')}
                style={styles.langLogo}
              />
              <Text style={this.getlangLabelTextStyle('en')}>English</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.separator}></View>
          <TouchableWithoutFeedback onPress={this.arLangPressed.bind(this)}>
            <View style={this.getLangContainerStyle('ar')}>
              <Image
                source={require('../../assets/images/lang_ar.png')}
                style={styles.langLogo}
              />
              <Text style={this.getlangLabelTextStyle('ar')}>العربية</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ActionBtn
          text={this.stringsManager.getStr(strings.STR_SEL_LANGUAGE)}
          handler={this.okButtonPressed.bind(this)}
          lang={this.props.strLang}
          style={{ height: 60, width: '93%' }}
        />
      </View>
    );
  }

  renderOKButton(nStrID, pressHandler) {
    var styleContainer = {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 5,
      width: '100%',
      alignItems: 'center',
    };
    var styleOKButton = {
      backgroundColor: '#0B721E',
      alignItems: 'center',
      justifyContent: 'center',
      width: '93%',
      height: 70,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginTop: 50,
      marginBottom: 25,
    };
    var styleOkButtonTxt = {
      textAlign: 'center',
      color: '#FFFFFF',
      fontFamily: this.props.strLang == 'ar' ? 'Amiri' : 'Poppins',
      justifyContent: 'center',
      fontSize: this.props.strLang == 'ar' ? 22 : 20,
      lineHeight: 35,
      fontWeight: '600',
    };
    return (
      <TouchableWithoutFeedback onPress={this.okButtonPressed.bind(this)}>
        <View style={styleContainer}>
          <View style={styleOKButton}>
            <View>
              <Text style={styleOkButtonTxt}>
                {this.stringsManager.getStr(nStrID)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  getLangContainerStyle(strLang) {
    return [
      styles.langContainer,
      this.props.strLang == strLang
        ? { borderColor: '#00AB14' }
        : { borderColor: '#00AB1400' },
    ];
  }

  getlangButtonTextStyle() {
    return {
      textAlign: 'center',
      color: '#FFFFFF',
      fontFamily: this.props.strLang == 'ar' ? 'Amiri' : 'Poppins',
      justifyContent: 'center',
      fontSize: this.props.strLang == 'ar' ? 22 : 20,
      lineHeight: 35,
      fontWeight: '600',
    };
  }
  getlangLabelTextStyle(strLang) {
    return {
      fontSize: strLang == 'ar' ? 22 : 18,
      lineHeight: 35,

      fontFamily: strLang == 'ar' ? 'Amiri' : 'Poppins',
      textAlign: 'left',
      color: '#0C3D11',
    };
  }
}
const mapStateToProps = (state) => ({
  isSkipWelcome: state.bSkipWelcome,
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {
    reduxActionSetFirstRunFlag,
    reduxActionSetLanguage,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ScreenLanguage);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  quranLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    height: '42%',
    width: '100%',
  },
  allLangsContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '93%',
    height: 70,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,

    borderColor: '#0B721EFF',
  },
  langLogo: {
    width: 40,
    height: 40,
    marginRight: 30,
  },

  separator: {
    borderColor: '#88888859',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 2,
    width: '93%',
    marginVertical: 15,
  },
  okButton: {
    backgroundColor: '#0B721E',
    alignItems: 'center',
    justifyContent: 'center',
    width: '93%',
    height: 70,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 50,
    marginBottom: 25,
  },
});
