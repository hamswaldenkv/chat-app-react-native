import {connect} from 'react-redux';
import {checkSession} from '../../actions/session';
import component from '../../screens/intro/splash';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = {checkSession};

export default connect(mapStateToProps, mapDispatchToProps)(component);
