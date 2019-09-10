import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { showNextPhoto } from '../../redux/photos/actions';
import App from './App';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showNextPhoto: () => dispatch(showNextPhoto())
});

export default connect(null, mapDispatchToProps)(App);
