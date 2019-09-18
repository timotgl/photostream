import { connect } from 'react-redux';

import { RootState } from '../../redux/interfaces';
import Counter from './Counter';

export interface Props {
  counter: number;
  total: number;
}

const mapStateToProps = (state: RootState): Props => ({
  counter: state.photos.currentIndex + 1,
  total: state.photos.items.length,
});

export default connect(mapStateToProps)(Counter);
