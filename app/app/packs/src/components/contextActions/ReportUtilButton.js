import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Dropdown, MenuItem } from 'react-bootstrap';

import ElementActions from 'src/stores/alt/actions/ElementActions';
import UserStore from 'src/stores/alt/stores/UserStore';
import MatrixCheck from 'src/components/common/MatrixCheck';

const showReportContainer = () => {
  ElementActions.showReportContainer();
};

const showFormatContainer = () => {
  ElementActions.showFormatContainer();
};

const showPredictionContainer = () => {
  ElementActions.showPredictionContainer();
};

const showComputedPropsGraph = () => {
  ElementActions.showComputedPropsGraph();
};

const showComputedPropsTasks = () => {
  ElementActions.showComputedPropsTasks();
};

const ReportUtilButton = ({ customClass }) => {
  const currentUser = (UserStore.getState() && UserStore.getState().currentUser) || {};
  const enableComputedProps = MatrixCheck(currentUser.matrix, 'computedProp');
  const enableReactionPredict = MatrixCheck(currentUser.matrix, 'reactionPrediction');

  let graph = <span />;
  let task = <span />;
  if (enableComputedProps) {
    graph = (
      <MenuItem onSelect={showComputedPropsGraph} title="Graph">
        Computed Props Graph
      </MenuItem>
    );
    task = (
      <MenuItem onSelect={showComputedPropsTasks} title="Graph">
        Computed Props Tasks
      </MenuItem>
    );
  }

  let predDiv = <span />;
  let divider = <span />;
  if (enableReactionPredict) {
    divider = <MenuItem divider />;
    predDiv = (
      <MenuItem onSelect={showPredictionContainer} title="Predict">
        综合预测
      </MenuItem>
    );
  }

  return (
    <Dropdown id="format-dropdown">
      <Dropdown.Toggle className={customClass || 'btn-success'}>
        <i className="fa fa-file-text-o" style={{ marginRight: 4 }} />
        <i className="fa fa-pencil" style={{ marginRight: 4 }} />
        <i className="fa fa-percent" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <MenuItem onSelect={showReportContainer} title="报告">
          报告
        </MenuItem>
        <MenuItem divider />
        <MenuItem onSelect={showFormatContainer} title="分析格式">
          分析格式
        </MenuItem>
        <MenuItem onSelect={ElementActions.showLiteratureDetail} title="参考文献管理">
          参考文献管理
        </MenuItem>
        {graph}
        {task}
        {divider}
        {predDiv}
      </Dropdown.Menu>
    </Dropdown>
  );
};

ReportUtilButton.propTypes = {
  customClass: PropTypes.string,
};

ReportUtilButton.defaultProps = {
  customClass: null,
};

export default ReportUtilButton;
