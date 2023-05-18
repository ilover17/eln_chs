import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import UIActions from 'src/stores/alt/actions/UIActions';
import PredictionActions from 'src/stores/alt/actions/PredictionActions';
import ContentInputs from 'src/apps/mydb/elements/details/predictions/ContentInputs';
import ContentOutputs from 'src/apps/mydb/elements/details/predictions/ContentOutputs';

const styles = {
  selectContainer: {
    height: 50,
  },
};

const templateOpts = () => (
  [
    { label: '预测产物', value: 'predictProducts' },
    { label: '预测起始材料', value: 'predictReactants' },
  ]
);

const onTemplateChange = (e) => {
  PredictionActions.updateTemplate(e.value);
  UIActions.uncheckWholeSelection.defer();
};

const ContentTemplate = template => (
  <Row style={styles.selectContainer}>
    <Col md={6} sm={12}>
      <Select
        options={templateOpts()}
        value={template}
        clearable={false}
        onChange={onTemplateChange}
      />
    </Col>
    <Col md={6} sm={12} />
  </Row>
);

const Content = ({ template, els, outputEls }) => (
  <div className="report-orders panel-workspace">
    <br />
    {ContentTemplate(template)}
    {ContentInputs(template, els)}
    <br />
    {ContentOutputs(template, outputEls)}
  </div>
);

Content.propTypes = {
  template: PropTypes.string.isRequired,
  els: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  outputEls: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Content;
