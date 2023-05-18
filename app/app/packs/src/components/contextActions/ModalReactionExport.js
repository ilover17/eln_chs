import React from 'react';
import { Button, ButtonToolbar, Radio, FormGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UIStore from 'src/stores/alt/stores/UIStore';
import UserStore from 'src/stores/alt/stores/UserStore';
import ReportsFetcher from 'src/fetchers/ReportsFetcher';

export default class ModalReactionExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 3
    }
    this.handleClick = this.handleClick.bind(this)
  }

  buttonBar() {
    const { onHide } = this.props;
    return (
      <ButtonToolbar>
        <div className="pull-right">
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={onHide}>取消</Button>
            <Button bsStyle="warning" id="md-export-dropdown"
              title="反应 Smiles 导出" onClick={this.handleClick}>
              Smiles 导出
            </Button>
          </ButtonToolbar>
        </div>
      </ButtonToolbar>

    )
  }

  handleClick() {
    const uiState = UIStore.getState();
    const userState = UserStore.getState();
    const { onHide } = this.props;
    onHide();
    exportSelections(uiState, userState, this.state.value);
  }

  render() {
    const onChange = (v) => this.setState(
      previousState => { return { ...previousState, value: v } }
    )
    return (
      <div>
        <div className='export-container'>
          <FormGroup name="options" value={this.state.value} >
            <Radio onChange={() => onChange(0)} checked={this.state.value == 0} value={0}>初始材料 &gt;&gt; 产物</Radio>
            <Radio onChange={() => onChange(1)} checked={this.state.value == 1} value={1}>初始材料.反应物 &gt;&gt; 产物</Radio>
            <Radio onChange={() => onChange(2)} checked={this.state.value == 2} value={2}>初始材料.反应物.溶剂 &gt;&gt; 产物</Radio>
            <Radio onChange={() => onChange(3)} checked={this.state.value == 3} value={3}>初始材料 &gt; 反应物 &gt; 产物</Radio>
            <Radio onChange={() => onChange(4)} checked={this.state.value == 4} value={4}>初始材料 &gt; 反应物.溶剂 &gt; 产物</Radio>
            <Radio onChange={() => onChange(5)} checked={this.state.value == 5} value={5}>初始材料 &gt; 反应物 &gt; 溶剂 &gt; 产物</Radio>
            <Radio onChange={() => onChange(6)} checked={this.state.value == 6} value={6}>初始材料 , 反应物 , 溶剂 , 产物</Radio>
          </FormGroup>
        </div>
        {this.buttonBar()}
      </div>
    )
  }
}

ModalReactionExport.propTypes = {
  onHide: PropTypes.func,
}

const exportSelections = (uiState, userState, e) => {
  ReportsFetcher.createDownloadFile({
    exportType: e,
    uiState: filterUIState(uiState),
    columns: []
  }, '', 'export_reactions_from_selections');
}

const filterUIState = (uiState) => {
  const { currentCollection, sample, reaction, wellplate, isSync } = uiState;
  return {
    sample: {
      checkedIds: sample.checkedIds.toArray(),
      uncheckedIds: sample.uncheckedIds.toArray(),
      checkedAll: sample.checkedAll,
    },
    reaction: {
      checkedIds: reaction.checkedIds.toArray(),
      uncheckedIds: reaction.uncheckedIds.toArray(),
      checkedAll: reaction.checkedAll,
    },
    wellplate: {
      checkedIds: wellplate.checkedIds.toArray(),
      uncheckedIds: wellplate.uncheckedIds.toArray(),
      checkedAll: wellplate.checkedAll,
    },
    currentCollection: currentCollection.id,
    isSync: isSync,
  }
}
