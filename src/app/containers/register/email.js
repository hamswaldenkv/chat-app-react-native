import {connect} from 'react-redux';
import {registerUser} from '../../actions/auth';
import component from '../../screens/register/email';

const mapStateToProps = (state, ownProps) => ({
  loading: state.session.loading,
});

const mapDispatchToProps = {registerUser};

export default connect(mapStateToProps, mapDispatchToProps)(component);
