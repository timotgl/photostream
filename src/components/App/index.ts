import { connect } from 'react-redux';

import { showNextPhoto, showPreviousPhoto, fetchAlbum } from '../../redux/photos/actions';
import { getCurrentPhoto } from '../../redux/photos/selectors';
import App from './App';
import { State } from '../../redux/photos/interfaces';

interface StateProps {
  currentPhotoUrl: string;
}

const mapStateToProps = (state: State): StateProps => ({
  currentPhotoUrl: getCurrentPhoto(state).file,
});

const mapDispatchToProps = {
  showNextPhoto,
  showPreviousPhoto,
  fetchAlbum,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
