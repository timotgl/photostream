import { connect } from 'react-redux';

import { showNextPhoto, showPreviousPhoto, fetchAlbum } from '../../redux/photos/actions';
import { getCurrentPhoto } from '../../redux/photos/selectors';
import App from './App';
import { RootState } from '../../redux/interfaces';

interface StateProps {
  currentPhotoUrl: string;
  hash: string;
}

const mapStateToProps = (state: RootState): StateProps => ({
  currentPhotoUrl: getCurrentPhoto(state).file,
  hash: state.router.location.hash.replace('#', ''),
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
