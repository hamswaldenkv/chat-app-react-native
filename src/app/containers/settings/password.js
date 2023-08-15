import {connect} from 'react-redux';
import {updatePassword} from '../../actions/settings';
import component from '../../screens/settings/password';

const mapStateToProps = (state, ownProps) => ({
  loading: state.settings.loading,
});

const mapDispatchToProps = {updatePassword};

export default connect(mapStateToProps, mapDispatchToProps)(component);
