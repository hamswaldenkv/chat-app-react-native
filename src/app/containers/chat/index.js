import {connect} from 'react-redux';
import {createChat, getMessages, sendMessage} from '../../actions/chat';
import {getMessagesByThread} from '../../selectors/ChatSelectors';
import component from '../../screens/chat/index';

const mapStateToProps = (state, ownProps) => ({
  loading: state.entities.messageLoading,
  loadingCreate: state.entities.loadingCreate,
  loadingSend: state.entities.messageSending,
  lastMessageId: state.entities.lastMessageId,
  currentUserId: state.session.accountId,
  messages: getMessagesByThread(state, ownProps.thread_id),
});

const mapDispatchToProps = {createChat, sendMessage, getMessages};

export default connect(mapStateToProps, mapDispatchToProps)(component);
