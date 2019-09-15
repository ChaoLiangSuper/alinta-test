import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from '../../../types';
import Button from '../shared/Button';
import Row from './Row';
import Cell from './Cell';

interface CustomerListProps {
  customers: Store['customers'];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  return (
    <>
      <Row>
        <Cell>First Name</Cell>
        <Cell>Last Name</Cell>
        <Cell>Date of Birth</Cell>
        <Cell>Actions</Cell>
      </Row>
      {_.isEmpty(customers) ? (
        <Row>No Customer Founded</Row>
      ) : (
        _.map(customers, ({ firstName, lastName, dateOfBirth, key }) => (
          <Row key={key}>
            <Cell>{firstName}</Cell>
            <Cell>{lastName}</Cell>
            <Cell>{dateOfBirth}</Cell>
            <Cell>
              <Button>Delete</Button>
              <Button primary>Edit</Button>
            </Cell>
          </Row>
        ))
      )}
    </>
  );
};

export default connect(({ customers }: Store) => ({ customers }))(CustomerList);
