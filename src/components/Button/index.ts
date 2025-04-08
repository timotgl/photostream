import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Button from './Button';

export default connect(null, { push })(Button);
