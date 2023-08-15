import {connect} from 'react-redux';
import {getEvents} from '../../actions/event';
import component from '../../screens/home/tab1';

const mapStateToProps = (state, ownProps) => ({
  events: state.entities.events || [],
  loading: state.entities.loading,
});

const mapDispatchToProps = {getEvents};

export default connect(mapStateToProps, mapDispatchToProps)(component);
