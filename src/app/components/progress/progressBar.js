import * as React from 'react';
import {Animated, Platform, StyleSheet, View, I18nManager} from 'react-native';
// import setColor from 'color';

import PropTypes from 'prop-types';

const INDETERMINATE_DURATION = 1500;
const INDETERMINATE_MAX_WIDTH = 0.6;
const {isRTL} = I18nManager;

const propTypes = {
  progress: PropTypes.number,
  color: PropTypes.string,
  indeterminate: PropTypes.bool,
  visible: PropTypes.bool,
  style: PropTypes.object,
  theme: PropTypes.object,
};

const defaultProps = {
  visible: true,
  progress: 0,
  theme: {
    dark: false,
    roundness: 4,
    colors: {
      primary: '#6200ee',
      accent: '#03dac4',
      background: '#f6f6f6',
      surface: '#ffffff',
      error: '#B00020',
      text: '#000000',
      onBackground: '#000000',
      onSurface: '#000000',
      disabled: '#000000',
      placeholder: '#000000',
      backdrop: '#000000',
      notification: '#000000',
    },
    fonts: [],
    animation: {
      scale: 4.0,
    },
  },
};

/**
 * Progress bar is an indicator used to present progress of some activity in the app.
 *
 * <div class="screenshots">
 *   <img src="screenshots/progress-bar.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ProgressBar, Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <ProgressBar progress={0.5} color={Colors.red800} />
 * );
 *
 * export default MyComponent;
 * ```
 */
class ProgressBar extends React.Component {
  state = {
    width: 0,
    timer: new Animated.Value(0),
    fade: new Animated.Value(0),
  };

  indeterminateAnimation = null;

  componentDidUpdate(prevProps) {
    const {visible, progress} = this.props;

    if (progress !== prevProps.progress || visible !== prevProps.visible) {
      if (visible) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    }
  }

  onLayout = event => {
    const {visible} = this.props;
    const {width: previousWidth} = this.state;

    this.setState({width: event.nativeEvent.layout.width}, () => {
      // Start animation the very first time when previously the width was unclear
      if (visible && previousWidth === 0) {
        this.startAnimation();
      }
    });
  };

  startAnimation = () => {
    const {
      indeterminate,
      progress,
      theme: {
        animation: {scale},
      },
    } = this.props;
    const {fade, timer} = this.state;

    // Show progress bar
    Animated.timing(fade, {
      duration: 200 * scale,
      toValue: 1,
      useNativeDriver: true,
      isInteraction: false,
    }).start();

    // Animate progress bar
    if (indeterminate) {
      if (!this.indeterminateAnimation) {
        this.indeterminateAnimation = Animated.timing(timer, {
          duration: INDETERMINATE_DURATION,
          toValue: 1,
          // Animated.loop does not work if useNativeDriver is true on web
          useNativeDriver: Platform.OS !== 'web',
          isInteraction: false,
        });
      }

      // Reset timer to the beginning
      timer.setValue(0);

      Animated.loop(this.indeterminateAnimation).start();
    } else {
      Animated.timing(timer, {
        duration: 200 * scale,
        toValue: progress ? progress : 0,
        useNativeDriver: true,
        isInteraction: false,
      }).start();
    }
  };

  stopAnimation = () => {
    const {fade} = this.state;
    const {scale} = this.props.theme.animation;

    // Stop indeterminate animation
    if (this.indeterminateAnimation) {
      this.indeterminateAnimation.stop();
    }

    Animated.timing(fade, {
      duration: 200 * scale,
      toValue: 0,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
  };

  render() {
    const {color, indeterminate, style, theme, progress, visible, ...rest} =
      this.props;
    const {fade, timer, width} = this.state;
    const tintColor = color || theme.colors.primary;
    // const trackTintColor = setColor(tintColor).alpha(0.38).rgb().string();
    const trackTintColor = `${tintColor}38`;

    return (
      <View onLayout={this.onLayout} {...rest}>
        <Animated.View
          style={[
            styles.container,
            {backgroundColor: trackTintColor, opacity: fade},
            style,
          ]}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                backgroundColor: tintColor,
                width,
                transform: [
                  {
                    translateX: timer.interpolate(
                      indeterminate
                        ? {
                            inputRange: [0, 0.5, 1],
                            outputRange: [
                              (isRTL ? 1 : -1) * 0.5 * width,
                              (isRTL ? 1 : -1) *
                                0.5 *
                                INDETERMINATE_MAX_WIDTH *
                                width,
                              (isRTL ? -1 : 1) * 0.7 * width,
                            ],
                          }
                        : {
                            inputRange: [0, 1],
                            outputRange: [(isRTL ? 1 : -1) * 0.5 * width, 0],
                          },
                    ),
                  },
                  {
                    // Workaround for workaround for https://github.com/facebook/react-native/issues/6278
                    scaleX: timer.interpolate(
                      indeterminate
                        ? {
                            inputRange: [0, 0.5, 1],
                            outputRange: [
                              0.0001,
                              INDETERMINATE_MAX_WIDTH,
                              0.0001,
                            ],
                          }
                        : {
                            inputRange: [0, 1],
                            outputRange: [0.0001, 1],
                          },
                    ),
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 2,
    overflow: 'hidden',
  },

  progressBar: {
    flex: 1,
  },
});

ProgressBar.defaultProps = defaultProps;
ProgressBar.propTypes = propTypes;
export default ProgressBar;
