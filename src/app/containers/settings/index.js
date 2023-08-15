import {connect} from 'react-redux';
import {destroySession} from '../../actions/session';
import component from '../../screens/settings/home';

const mapStateToProps = (state, ownProps) => ({
  profileName: state.session.profileName,
});

const mapDispatchToProps = {destroySession};

export default connect(mapStateToProps, mapDispatchToProps)(component);
