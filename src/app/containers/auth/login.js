import {connect} from 'react-redux';
import {loginAccount} from '../../actions/auth';
import component from '../../screens/auth/login';

const mapStateToProps = (state, ownProps) => ({
  loading: state.session.loading,
});

const mapDispatchToProps = {loginAccount};

export default connect(mapStateToProps, mapDispatchToProps)(component);
