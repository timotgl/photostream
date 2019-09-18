import { connect } from 'react-redux';

import PhotoDetails from './PhotoDetails';
import { RootState } from '../../redux/interfaces';
import { PhotoItem } from '../../redux/photos/interfaces';
import { getCurrentPhoto } from '../../redux/photos/selectors';

const mapStateToProps = (state: RootState): PhotoItem => getCurrentPhoto(state);

export default connect(mapStateToProps)(PhotoDetails);
