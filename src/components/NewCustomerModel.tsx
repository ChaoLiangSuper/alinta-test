import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';
import { Field, Customer } from '../../types';

interface ModalProps {
  isOpen: boolean;
  onSave: (value: Customer) => void;
  onClose: () => void;
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

const ModelBackground = styled.div`
  background: transparent;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Model = styled.div`
  width: 30%;
  display: flex;
  background: white;
  box-shadow: 0 0 20px lightgray;
  border-radius: ${({ theme }) => theme.borderRadius(3)};
  padding: ${({ theme }) => theme.spacing(5)};
  flex-direction: column;
`;

const ModalRow = styled.div<{ center?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ center }) => (center ? 'center' : '')};

  & + & {
    margin-top: ${({ theme }) => theme.spacing()};
  }
`;

class NewCustomerModel extends React.Component<ModalProps, ModalState> {
  state: ModalState = {
    value: {
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
    const { isOpen, onClose } = this.props;
    const { invalidFields, value } = this.state;

    return isOpen ? (
      <ModelBackground>
        <Model>
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
        </Model>
      </ModelBackground>
    ) : null;
  }
}

export default NewCustomerModel;
