import React from 'react/addons';
import Options from '../options';
const {TestUtils} = React.addons;

function renderComponent(props = {}) {
  return TestUtils.renderIntoDocument(<Options {...props}/>);
}

let component;

describe('Option list', () => {

  afterEach(done => {
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    done();
  });


  //INITIAL STATE

  describe('by default', () => {

    beforeEach(() => {
      component = renderComponent();
    });

    it('has empty options array', () => {
        expect(component.props.options).to.be.instanceof(Array);
        expect(component.props.options).to.be.empty;
    });

    it('has empty alreadySelected array', () => {
        expect(component.props.alreadySelected).to.be.instanceof(Array);
        expect(component.props.alreadySelected).to.be.empty;
    });

    it('has empty filter', () => {
        expect(component.props.filter).to.be.equal('');
    });

  });


  it('displays options', () => {

    const component = renderComponent({
      options: ['a', 'a', 'a', 'a', 'a', 'a']
    });

    var options = React.findDOMNode(component.refs.wrapper).querySelectorAll('div');

    expect(options.length).to.equal(6);

  });


  it('dont show already selected options', () => {

    const component = renderComponent({
      options: ['a', 'b', 'c', 'd'],
      alreadySelected: ['a', 'b', 'c']
    });

    var options = React.findDOMNode(component.refs.wrapper).querySelectorAll('div');
    expect(options.length).to.equal(1);

  });

  it('dont show options not matching filter', () => {

    const component = renderComponent({
      options: ['ann', 'ccanndd', 'ddddann', 'ddd'],
      filter: 'ann'
    });

    var options = React.findDOMNode(component.refs.wrapper).querySelectorAll('div');
    expect(options.length).to.equal(3);

  });


});
