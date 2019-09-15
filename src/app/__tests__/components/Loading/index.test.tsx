import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../../../components/Loading/Loading';

describe('<Loading />', () => {
  it('should render without error', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });
});
