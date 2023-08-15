import {connect} from 'react-redux';
import {checkEmailRegistration} from '../../actions/auth';
import component from '../../screens/register/password';

const mapStateToProps = (state, ownProps) => ({
  loading: state.session.loading,
  emailAddress: state.session.emailAddress,
});

const mapDispatchToProps = {checkEmailRegistration};

export default connect(mapStateToProps, mapDispatchToProps)(component);
