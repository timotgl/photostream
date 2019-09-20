import { connect } from 'react-redux';

import { RootState } from '../../redux/interfaces';
import Counter from './Counter';

export interface Props {
  counter: number;
  total: number;
}

const mapStateToProps = (state: RootState): Props => {
  const { currentIndex, items } = state.photos;
  return {
    counter: currentIndex + 1,
    total: items.length,
  };
};

export default connect(mapStateToProps)(Counter);
