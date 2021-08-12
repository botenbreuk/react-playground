import { shallow } from 'enzyme';
import { PhoneNumber } from './index';

describe('Util: string', () => {
  it('formatPhone should create tel link', () => {
    const phoneNumberNull = shallow(<PhoneNumber />);
    expect(phoneNumberNull).toMatchSnapshot();

    const phoneNumberEmpty = shallow(<PhoneNumber phone="" />);
    expect(phoneNumberEmpty).toMatchSnapshot();

    const phoneNumber = shallow(<PhoneNumber phone="31612345678" />);
    expect(phoneNumber).toMatchSnapshot();
  });
});
