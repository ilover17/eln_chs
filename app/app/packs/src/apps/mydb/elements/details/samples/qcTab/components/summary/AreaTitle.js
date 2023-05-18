import React from 'react';
import PropTypes from 'prop-types';

import { evalCurTitle } from 'src/apps/mydb/elements/details/samples/qcTab/components/summary/eval';

const AreaTitle = ({ curation }) => (
  <div>
    <h4>
      <span>
        可用数据的处理
      </span>
    </h4>
    <h4>
      <span className="underline-qc">
        {evalCurTitle(curation)}
      </span>
    </h4>
  </div>
);

AreaTitle.propTypes = {
  curation: PropTypes.number.isRequired,
};

export default AreaTitle;
