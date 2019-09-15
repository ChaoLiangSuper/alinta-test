import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { Field, Customer, Store } from '../../../types';
import ModalBackground from './ModalBackground';
import Modal from './Modal';
import ModalRow from './ModalRow';

interface ModalProps {
  onSave: (value: Customer) => void;
  onClose: () => void;
  initialData?: Customer;
  selectedCustomerKey: string | null;
}

interface ModalState {
  value: Customer;
  invalidFields: string[];
}

const fields: Field[] = [
  { label: 'First Name', name: 'firstName' },
  {
    label: 'Last Name',
    name: 'lastName',
  },
  {
    label: 'Date of Birth',
    name: 'dateOfBirth',
    type: 'date',
  },
];

class CustomerModal extends React.Component<ModalProps, ModalState> {
  state: ModalState = {
    value: this.props.initialData
      ? this.props.initialData
      : {
          firstName: '',
          lastName: '',
          dateOfBirth: '',
        },
    invalidFields: [],
  };

  handleChange = (key: string) => (value: string) => {
    this.setState({
      value: {
        ...this.state.value,
        [key]: value,
      },
    });
  };

  handleSubmit = () => {
    const { value } = this.state;
    const { onSave, onClose } = this.props;

    const invalidFields: string[] = [];
    _.forEach(fields, ({ name }) => {
      if (_.isEmpty(value[name].trim())) {
        invalidFields.push(name);
      }
    });

    if (!_.isEmpty(invalidFields)) {
      return this.setState({
        invalidFields,
      });
    }

    onSave(value);
    onClose();
  };

  render() {
    const { onClose } = this.props;
    const { invalidFields, value } = this.state;

    return (
      <ModalBackground>
        <Modal>
          {_.map(fields, ({ name, label, type }) => (
            <ModalRow key={name}>
              <Input
                name={name}
                label={label}
                value={value[name]}
                invalid={invalidFields.indexOf(name) !== -1}
                onChange={this.handleChange(name)}
                date={type === 'date'}
              />
            </ModalRow>
          ))}
          <ModalRow center>
            <Button onClick={onClose}>Cancel</Button>
            <Button primary onClick={this.handleSubmit}>
              Save
            </Button>
          </ModalRow>
        </Modal>
      </ModalBackground>
    );
  }
}

export default connect(
  ({ customers }: Store, { selectedCustomerKey }: ModalProps) =>
    selectedCustomerKey
      ? {
          initialData: customers[selectedCustomerKey],
        }
      : {}
)(CustomerModal);
