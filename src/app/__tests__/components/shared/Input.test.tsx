import React from 'react';
import Input, { StyledInput } from '../../../components/shared/Input';
import { shallow, ShallowWrapper } from 'enzyme';

describe('<Input />', () => {
  let wrapper: ShallowWrapper;
  const mockFunc = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Input onChange={mockFunc} />);
  });

  it('should render without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle change event', () => {
    const textInput = wrapper.find(StyledInput);
    textInput.simulate('change', { target: { value: 'text' } });
    expect(mockFunc).toHaveBeenCalledWith('text');
  });
});
