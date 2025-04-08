import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ThumbnailLink from './ThumbnailLink';

export default connect(null, { push })(ThumbnailLink);
