import { connect } from 'react-redux';

import { showNextPhoto, fetchAlbum } from '../../redux/photos/actions';
import App from './App';

const mapDispatchToProps = {
  showNextPhoto,
  fetchAlbum: () => fetchAlbum(2000),
};

export default connect(null, mapDispatchToProps)(App);
