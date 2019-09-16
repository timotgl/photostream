import { connect } from 'react-redux';

import PhotoDetails from './PhotoDetails';
import { PhotoItem, State } from '../../redux/photos/interfaces';
import { getCurrentPhoto } from '../../redux/photos/selectors';

const mapStateToProps = (state: State): PhotoItem => getCurrentPhoto(state);

export default connect(mapStateToProps)(PhotoDetails);
