import { connect } from 'react-redux';

import { showNextPhoto, fetchAlbum } from '../../redux/photos/actions';
import App from './App';

const mapDispatchToProps = {
  showNextPhoto,
  fetchAlbum,
};

export default connect(null, mapDispatchToProps)(App);
