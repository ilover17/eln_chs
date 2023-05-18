import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, FormGroup, ControlLabel, FormControl, MenuItem,
  ListGroupItem, ListGroup, InputGroup, DropdownButton
} from 'react-bootstrap';
import Select from 'react-select';
import 'moment-precise-range-plugin';
import Clipboard from 'clipboard';
import { dangerousProductsOptions } from 'src/components/staticDropdownOptions/options';
import ReactionDetailsMainProperties from 'src/apps/mydb/elements/details/reactions/ReactionDetailsMainProperties';
import StringTag from 'src/apps/mydb/elements/details/reactions/propertiesTab/StringTag';
import { solventsTL } from 'src/utilities/reactionPredefined';
import OlsTreeSelect from 'src/components/OlsComponent';
import { permitOn } from 'src/components/common/uis';

export default class ReactionDetailsProperties extends Component {
  constructor(props) {
    super(props);
    props.reaction.convertDurationDisplay();

    this.clipboard = new Clipboard('.clipboardBtn');
    this.handleOnReactionChange = this.handleOnReactionChange.bind(this);
    this.handleOnSolventSelect = this.handleOnSolventSelect.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.reaction) { return; }
    nextProps.reaction.convertDurationDisplay();
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  handleOnReactionChange(reaction) {
    this.props.onReactionChange(reaction);
  }

  handleMultiselectChange(type, selectedOptions) {
    const values = selectedOptions.map(option => option.value);
    const wrappedEvent = { target: { value: values } };
    this.props.onInputChange(type, wrappedEvent);
  }

  handleOnSolventSelect(eventKey) {
    const { reaction } = this.props;

    let val;
    if (eventKey > solventsTL.length) {
      val = '';
    } else {
      const key = Object.keys(solventsTL[eventKey])[0];
      val = solventsTL[eventKey][key];
    }

    reaction.tlc_solvents = val;
    this.handleOnReactionChange(reaction);
  }

  render() {
    const { reaction } = this.props;
    const solventsItems = solventsTL.map((x, i) => {
      const val = Object.keys(x)[0];
      return (
        <MenuItem key={i} eventKey={i}>
          <StringTag key={i} string={val} />
        </MenuItem>
      )
    });

    solventsItems.unshift(
      <MenuItem key={solventsTL.length + 1} eventKey={solventsTL.length + 1}>
        -
      </MenuItem>
    );

    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            <div className="reaction-scheme-props">
              <ReactionDetailsMainProperties
                reaction={reaction}
                onInputChange={(type, event) => this.props.onInputChange(type, event)}
              />
            </div>
            <FormGroup>
              <ControlLabel>类型 (Name Reaction Ontology)</ControlLabel>
              <OlsTreeSelect
                selectName="rxno"
                selectedValue={(reaction.rxno && reaction.rxno.trim()) || ''}
                onSelectChange={event => this.props.onInputChange('rxno', event.trim())}
                selectedDisable={!permitOn(reaction) || reaction.isMethodDisabled('rxno')}
              />
            </FormGroup>
            <Row>
              <Col md={12}>
                <div><b>危险产品</b></div>
                <Select
                  name="dangerous_products"
                  multi
                  options={dangerousProductsOptions}
                  value={reaction.dangerous_products}
                  disabled={!permitOn(reaction) || reaction.isMethodDisabled('dangerous_products')}
                  onChange={selectedOptions => this.handleMultiselectChange('dangerousProducts', selectedOptions)}
                />
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <h4 className="list-group-item-heading" >TLC控制</h4>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <ControlLabel>溶剂</ControlLabel>
                  <FormGroup>
                    <InputGroup>
                      <DropdownButton
                        disabled={!permitOn(reaction)}
                        componentClass={InputGroup.Button}
                        id="solvents_dd"
                        title=""
                        onSelect={this.handleOnSolventSelect}
                      >
                        {solventsItems}
                      </DropdownButton>
                      <FormControl
                        style={{ zIndex: 0 }}
                        type="text"
                        value={reaction.tlc_solvents || ''}
                        disabled={!permitOn(reaction) || reaction.isMethodDisabled('tlc_solvents')}
                        placeholder="溶剂..."
                        onChange={event => this.props.onInputChange('tlc_solvents', event)}
                      />
                    </InputGroup>
                  </FormGroup>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <ControlLabel>Rf值</ControlLabel>
                  <FormControl
                    type="text"
                    value={reaction.rf_value || ''}
                    disabled={!permitOn(reaction) || reaction.isMethodDisabled('rf_value')}
                    placeholder="Rf值..."
                    onChange={event => this.props.onInputChange('rfValue', event)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <ControlLabel>TLC描述</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value={reaction.tlc_description || ''}
                    disabled={!permitOn(reaction) || reaction.isMethodDisabled('tlc_description')}
                    placeholder="TLC描述..."
                    onChange={event => this.props.onInputChange('tlcDescription', event)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

ReactionDetailsProperties.propTypes = {
  reaction: PropTypes.object,
  onReactionChange: PropTypes.func,
  onInputChange: PropTypes.func
};
