import {connect} from 'react-redux';
import {createChat, getChats} from '../../actions/chat';
import component from '../../screens/home/tab2';

const mapStateToProps = (state, ownProps) => ({
  loadingCreate: state.entities.loadingCreate || true,
  chats: state.entities.chats || [],
});

const mapDispatchToProps = {createChat, getChats};

export default connect(mapStateToProps, mapDispatchToProps)(component);
