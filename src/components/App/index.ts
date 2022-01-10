import { connect } from 'react-redux';

import { showNextPhoto, showPreviousPhoto, fetchAlbumAndUpdateUrl } from '../../redux/photos/actions';
import { getCurrentPhoto } from '../../redux/photos/selectors';
import App from './App';
import { RootState } from '../../redux/interfaces';

interface StateProps {
  currentPhotoUrl: string;
  albumName: string;
  file: string;
}

const mapStateToProps = (state: RootState): StateProps => {
  const { hash } = state.router.location;
  const [albumName, file] = hash.replace('#', '').split('/');
  return {
    currentPhotoUrl: getCurrentPhoto(state).file,
    albumName,
    file,
  };
};

const mapDispatchToProps = {
  showNextPhoto,
  showPreviousPhoto,
  fetchAlbumAndUpdateUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
