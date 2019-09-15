import { connect } from 'react-redux';

import { showNextPhoto, showPreviousPhoto, fetchAlbum } from '../../redux/photos/actions';
import App from './App';
import { State } from '../../redux/photos/interfaces';

const mapStateToProps = (state: State) => ({
  currentPhotoUrl: (state.items[state.currentIndex] || {}).file,
});

const mapDispatchToProps = {
  showNextPhoto,
  showPreviousPhoto,
  fetchAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
