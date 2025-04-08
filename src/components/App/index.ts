import { connect } from 'react-redux';

import App from './App';
import { RootState } from '../../redux/interfaces';

interface StateProps {
  albumName: string;
  file: string;
}

const mapStateToProps = (state: RootState): StateProps => {
  const { hash } = state.router.location;
  const [albumName, file] = hash.replace('#', '').split('/');
  return {
    albumName,
    file,
  };
};

export default connect(mapStateToProps)(App);
