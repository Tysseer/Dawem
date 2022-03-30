import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Image,
  Text,
  Dimensions,
} from 'react-native';

import RevisionsList from '../subComponents/RevisionsList';
import RevisionsManager from '../helpers/RevisionsManager';
import SVGLoader from '../helpers/SVGLoader';
import BadgesBar from '../subComponents/BadgesBar';
import ModalBadgeDay from '../modals/ModalBadgeDay.js';
import ModalBadgeMonth from '../modals/ModalBadgeMonth.js';
import ModalBadgeWeek from '../modals/ModalBadgeWeek.js';
import { connect } from 'react-redux';
import {
  reduxActionSetCurRevision,
  reduxActionDelRevision,
} from '../redux/reduxActions';
import * as strings from '../helpers/StringsManager';
import StringsManager from '../helpers/StringsManager';
import { colors } from '../../constants';
import Center from '../../components/Center';
import { getFontFamily } from '../helpers/scripts';
import ActionBtn from '../../components/ActionBtn';

const { width, height } = Dimensions.get('window');

class ScreenRevisions extends Component {
  constructor(props) {
    super(props);
    this.stringsManager = new StringsManager();
    this.stringsManager.setLanguage(this.props.strLang);
    this.svgLoader = new SVGLoader();
    this.revisionsManager = new RevisionsManager();
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    this.revisionsManager.loadTestRevisions(true);
    var res = this.getBadgesStates();

    this.state = {
      isBadgeDay: res[0],
      isBadgeMonth: res[1],
      isBadgeWeek: res[2],
      bShowModalBadgeDay: false,
      bShowModalBadgeMonth: false,
      bShowModalBadgeWeek: false,
    };
  }

  render() {
    this.stringsManager.setLanguage(this.props.strLang);
    this.revisionsManager.m_loadedRevisions = this.props.revisions;
    var pressHandlers = this.getBadgesOnPressHandlers();
    var longPressHandlers = this.getBadgesOnLongPressHandlers();
    var modalContent = this.getModal();

    return (
      <View style={styles.copntainer}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 20,
            color: colors.primary,
            alignSelf: 'flex-start',
            marginVertical: 30,
          }}
        >
          Dawem
        </Text>
        <View style={styles.listContainer}>
          <BadgesBar
            svgLoader={this.svgLoader}
            isBadgeDay={this.state.isBadgeDay}
            isBadgeMonth={this.state.isBadgeMonth}
            isBadgeWeek={this.state.isBadgeWeek}
            onPresses={pressHandlers}
            onLongPresses={longPressHandlers}
            strLang={this.props.strLang}
            title={this.stringsManager.getStr(strings.STR_LATEST_DONE)}
          />
          {modalContent}
          {this.revisionsManager.m_loadedRevisions.length !== 0 ? (
            this.getInitialPrompt()
          ) : (
            <RevisionsList
              revisionsManager={this.revisionsManager}
              stringsManager={this.stringsManager}
              navigation={this.props.navigation}
              refreshFn={this.refresh.bind(this)}
              updateRevFn={this.onEditRevision.bind(this)}
              deleteRevFn={this.onDeleteRevision.bind(this)}
              onAddRevision={this.onAddRevision.bind(this)}
            />
          )}
        </View>
        <ActionBtn
          text={this.stringsManager.getStr(strings.STR_REV_TITLE)}
          handler={this.onAddRevision.bind(this)}
          icon={true}
          lang={this.props.strLang}
          fullWidth={true}
          style={{ height: 60 }}
        />
      </View>
    );
  }

  getBadgesOnPressHandlers() {
    var pressHandlers = new Map();
    pressHandlers.set('day', this.onDayBadgePressed.bind(this));
    pressHandlers.set('month', this.onMonthBadgePressed.bind(this));
    pressHandlers.set('week', this.onWeekBadgePressed.bind(this));

    return pressHandlers;
  }
  getBadgesOnLongPressHandlers() {
    var longPressHandlers = new Map();
    longPressHandlers.set('day', this.onBadgeLongPress.bind(this));
    longPressHandlers.set('month', this.onBadgeLongPress.bind(this));
    longPressHandlers.set('week', this.onBadgeLongPress.bind(this));
    return longPressHandlers;
  }

  onDayBadgePressed() {
    let newval = this.state.bShowModalBadgeDay == false;
    this.setState({ bShowModalBadgeDay: newval });
  }
  onMonthBadgePressed() {
    let newval = this.state.bShowModalBadgeMonth == false;
    this.setState({ bShowModalBadgeMonth: newval });
  }
  onWeekBadgePressed() {
    let newval = this.state.bShowModalBadgeWeek == false;
    this.setState({ bShowModalBadgeWeek: newval });
  }
  onBadgeLongPress() {
    // todo: explain badges
  }
  onAddRevision() {
    this.props.reduxActionSetCurRevision(null);
    this.props.navigation.navigate('ScrRev');
  }

  onSettings() {
    this.props.navigation.navigate('ScrSettings');
  }
  onDonate() {}

  onEditRevision(revision) {
    this.props.reduxActionSetCurRevision(revision);
    this.props.navigation.navigate('ScrRev');
  }
  onDeleteRevision(revision) {
    this.props.reduxActionDelRevision(revision);
    this.refresh();
  }
  getInitialPrompt() {
    return (
      <ImageBackground
        source={require('../../assets/backgroundPNG/green_background.png')}
        style={{
          width: '100%',
          height: 0.4 * height,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 12,
        }}
      >
        <Image
          source={require('../../assets/icon.png')}
          style={{
            width: '96%',
            height: '65%',
            resizeMode: 'cover',
            position: 'absolute',
            bottom: -80,
            left: -30,
            opacity: 0.1,
            // backgroundColor: 'red',
          }}
        />
        <Center style={{ height: '100%' }}>
          <TouchableWithoutFeedback onPress={this.onAddRevision.bind(this)}>
            <Text
              style={{
                ...styles.text,
                ...getFontFamily(this.props.strLang),
              }}
            >
              {this.stringsManager.getStr(strings.STR_REVS_PROMPT)}
            </Text>
          </TouchableWithoutFeedback>
        </Center>
      </ImageBackground>
    );
  }

  getModal() {
    var modal = this.getBadgesModal();
    if (modal != null) return modal;
    return null;
  }

  getBadgesModal() {
    if (this.state.bShowModalBadgeDay) {
      var modalDay = new ModalBadgeDay(this).getModal(
        this.state.isBadgeDay == false
      );
      return <View>{modalDay}</View>;
    }
    if (this.state.bShowModalBadgeMonth) {
      var modalMonth = new ModalBadgeMonth(this).getModal(
        this.state.isBadgeMonth == false
      );
      return <View>{modalMonth}</View>;
    }
    if (this.state.bShowModalBadgeWeek) {
      var modalWeek = new ModalBadgeWeek(this).getModal(
        this.state.isBadgeWeek == false
      );
      return <View>{modalWeek}</View>;
    }
    return null;
  }
  getBadgesStates() {
    if (this.revisionsManager.m_loadedRevisions.length == 0)
      return [false, false, false];
    var bIsToday = false;
    var maxDays = 0;
    for (var i = 0; i < this.revisionsManager.m_loadedRevisions.length; i++) {
      this.revisionsManager.m_loadedRevisions[i].updateNumDays();
      if (this.revisionsManager.m_loadedRevisions[i].numDays > maxDays)
        maxDays = this.revisionsManager.m_loadedRevisions[i].numDays;
      if (this.revisionsManager.m_loadedRevisions[i].numDays == 0)
        bIsToday = true;
    }

    var bIsWeek = maxDays <= 7;
    var bIsMonth = maxDays <= 30;

    bIsToday = bIsToday && this.revisionsManager.m_loadedRevisions.length >= 5;
    bIsWeek = bIsWeek && this.revisionsManager.m_loadedRevisions.length >= 7;
    bIsMonth = bIsMonth && this.revisionsManager.m_loadedRevisions.length >= 10;
    return [bIsToday, bIsMonth, bIsWeek];
  }
  updateBadgesStates() {
    var res = this.getBadgesStates();

    this.setState({
      isBadgeDay: res[0],
      isBadgeMonth: res[1],
      isBadgeWeek: res[2],
    });
  }
  refresh() {
    this.updateBadgesStates();
  }
}
const mapStateToProps = (state) => ({
  revisions: state.revisions,
  strLang: state.strLang,
});
const mapDispatchToProps = () => {
  return {
    reduxActionSetCurRevision,
    reduxActionDelRevision,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(ScreenRevisions);
const styles = StyleSheet.create({
  copntainer: {
    flex: 1,
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    backgroundColor: '#EEE',
    padding: 20,
  },

  toolBar: {
    width: '100%',
    height: 40,
    alignSelf: 'flex-end',
    borderTopColor: 'yellow',
    borderTopWidth: 1,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  toolButton: {
    width: 38,
    height: 38,
    marginHorizontal: 2,
  },
  listContainer: {
    width: '100%',
    flex: 1,
  },
  textContainer: {
    // backgroundColor: '#FFFFFF4D',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // padding: 5,
    // margin: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    // textAlign: 'center',
    color: '#fff',
  },
});
