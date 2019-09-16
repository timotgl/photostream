import { connect } from 'react-redux';

import { State } from '../../redux/photos/interfaces';
import Counter from './Counter';

export interface Props {
  counter: number;
  total: number;
}

const mapStateToProps = (state: State): Props => ({
  counter: state.currentIndex + 1,
  total: state.items.length,
});

export default connect(mapStateToProps)(Counter);
