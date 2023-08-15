import {connect} from 'react-redux';
import {joinEvent} from '../../actions/event';
import component from '../../screens/event/index';

const mapStateToProps = (state, ownProps) => ({
  buttonLoading: state.entities.loadingJoin,
  accountId: state.session.accountId,
});

const mapDispatchToProps = {joinEvent};

export default connect(mapStateToProps, mapDispatchToProps)(component);
