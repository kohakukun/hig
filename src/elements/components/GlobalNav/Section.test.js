/**
Copyright 2016 Autodesk,Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
import { mount } from 'enzyme';
import * as HIG from 'hig.web';
import React from 'react';

import GlobalNav from '../../../adapters/GlobalNavAdapter';
import SectionList from './SectionList';
import Section from './Section';
import Group from './Group';
import Module from './Module';
import Submodule from './Submodule';
import SectionCollapse from './SectionCollapse';
import SideNav from './SideNav';

const SubmoduleContext = props => {
  return (
    <GlobalNav>
      <GlobalNav.SideNav>
        <GlobalNav.SideNav.SectionList>
          <Section headerLabel="Project" headerName="ThunderStorm">
            <SectionCollapse isCollapsed={props.isCollapsed} />
            <Group>
              <Module
                icon="gear"
                title="Contractor"
                submodulesClosed={props.isCollapsed}
              >
                <Submodule title="Library" link="#" icon="assets" />
              </Module>
            </Group>

          </Section>
        </GlobalNav.SideNav.SectionList>
      </GlobalNav.SideNav>
    </GlobalNav>
  );
};

const Context = props => {
  const { children, ...rest } = props;
  return (
    <GlobalNav>
      <GlobalNav.SideNav>
        <GlobalNav.SideNav.SectionList>
          <Section {...rest}>
            {children}
          </Section>
        </GlobalNav.SideNav.SectionList>
      </GlobalNav.SideNav>
    </GlobalNav>
  );
};

function higContext(defaults) {
  const higContainer = document.createElement('div');

  // use spread here to clone defaults since HIG.Button mutates this object
  const higNav = new HIG.GlobalNav();

  higNav.mount(higContainer);

  const higSideNav = new higNav.partials.SideNav();
  higNav.addSideNav(higSideNav);

  const higSection = new higSideNav.partials.Section(defaults);

  const collapse1 = new higSection.partials.Collapse({});

  higSideNav.addSection(higSection);

  higSection.addCollapse(collapse1);
  collapse1.minimize();

  return { higNav, higSideNav, higSection, higContainer };
}

describe('<Section>', () => {
  describe('headerLabel', () => {
    it('sets the headerLabel default', () => {
      const defaults = { headerLabel: 'some label' };

      const { higContainer } = higContext(defaults);

      const reactContainer = document.createElement('div');

      const wrapper = mount(<Context {...defaults} />, {
        attachTo: reactContainer
      });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );
    });

    it('updates the headerLabel', () => {
      const defaults = { headerLabel: 'some label' };

      const { higSection, higContainer } = higContext(defaults);

      const reactContainer = document.createElement('div');

      const wrapper = mount(<Context {...defaults} />, {
        attachTo: reactContainer
      });

      const newHeaderLabel = 'new header label';

      // hig.web API
      higSection.setHeaderLabel(newHeaderLabel);

      // React API
      wrapper.setProps({ headerLabel: newHeaderLabel });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );
    });

    it('logs an error if the headerLabel is not the correct type', () => {
      global.console.error = jest.fn();

      mount(<Context headerLabel={[]} />);

      expect(console.error).toBeCalledWith(
        expect.stringMatching(
          /Invalid prop `headerLabel` of type `array` supplied to `Section`, expected `string`./
        )
      );
    });
  });

  describe('headerName', () => {
    it('sets the headerName default', () => {
      const defaults = { headerName: 'some label' };

      const { higContainer } = higContext(defaults);

      const reactContainer = document.createElement('div');

      const wrapper = mount(<Context {...defaults} />, {
        attachTo: reactContainer
      });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );
    });

    it('updates the headerName', () => {
      const defaults = { headerName: 'some label' };

      const { higSection, higContainer } = higContext(defaults);

      const reactContainer = document.createElement('div');

      const wrapper = mount(<Context {...defaults} />, {
        attachTo: reactContainer
      });

      const newHeaderName = 'new header name';

      // hig.web API
      higSection.setHeaderName(newHeaderName);

      // React API
      wrapper.setProps({ headerName: newHeaderName });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );
    });

    it('logs an error if the headerName is not the correct type', () => {
      global.console.error = jest.fn();

      mount(<Context headerName={[]} />);

      expect(console.error).toBeCalledWith(
        expect.stringMatching(
          /Invalid prop `headerName` of type `array` supplied to `Section`, expected `string`./
        )
      );
    });
  });

  describe('children: <Group>', () => {
    it('can render a list of <Group> elements', () => {
      const defaults = { headerLabel: 'some label' };

      const { higSection, higContainer } = higContext(defaults);

      var group1 = new higSection.partials.Group();
      higSection.addGroup(group1);

      var group2 = new higSection.partials.Group();
      higSection.addGroup(group2);

      group1.hide();
      group2.hide();

      const reactContainer = document.createElement('div');

      const wrapper = mount(
        <Context {...defaults}>
          <Group />
          <Group />
        </Context>,
        {
          attachTo: reactContainer
        }
      );

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );
    });

    it('can insert <Group> elements before and after another <Group>', () => {
      const defaults = { headerLabel: 'some label' };

      const { higSection, higContainer } = higContext(defaults);

      var group1 = new higSection.partials.Group();

      // DELIBERATELY DON'T ADD GROUP 1

      var group2 = new higSection.partials.Group();
      higSection.addGroup(group2);
      group2.hide();

      // ADD GROUP 1 before GROUP 2
      higSection.addGroup(group1, group2);
      group1.hide();
      group2.hide();

      class CustomComponent extends React.Component {
        constructor(props) {
          super(props);
          this.state = { showingItemBefore: false, showingItemAfter: false };
        }

        render() {
          return (
            <Context {...defaults}>
              {this.state.showingItemBefore && <Group />}
              <Group />
              {this.state.showingItemAfter && <Group />}
            </Context>
          );
        }
      }

      const reactContainer = document.createElement('div');
      const wrapper = mount(<CustomComponent />, {
        attachTo: reactContainer
      });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      wrapper.setState({ showingItemBefore: true });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      expect(reactContainer.firstChild.outerHTML).toEqual(
        higContainer.firstChild.outerHTML
      );

      wrapper.setState({ showingItemBefore: false });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      wrapper.setState({ showingItemAfter: true });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();

      wrapper.setState({ showingItemAfter: false });

      expect(reactContainer.firstChild.outerHTML).toMatchSnapshot();
    });

    it('can not render HTML elements as children', () => {
      global.console.error = jest.fn();

      mount(
        <Context>
          <div>Hello world!</div>
        </Context>
      );

      expect(console.error).toBeCalledWith(
        expect.stringMatching(
          /'div' is not a valid child of Section. Children should be of type 'Group, SectionCollapse'/
        )
      );
    });

    it('can not render HTML text as children', () => {
      global.console.error = jest.fn();

      mount(
        <Context>
          Hello world!
        </Context>
      );

      expect(console.error).toBeCalledWith(
        expect.stringMatching(
          /'Hello world!' is not a valid child of Section. Children should be of type 'Group, SectionCollapse'/
        )
      );
    });
  });
  describe('Section with Query', () => {
    const Context = props => {
      return (
        <GlobalNav>
          <SideNav>
            <SectionList>
              <Section
                headerLabel="Project"
                headerName="Thunderstor"
                query={props.query}
              >
                <Group>
                  <Module title={props.moduleTitle} icon="assets">
                    <Submodule title={props.submoduleTitle1} icon="assets" />
                    <Submodule title={props.submoduleTitle2} icon="assets" />
                  </Module>
                </Group>
              </Section>

            </SectionList>
          </SideNav>
        </GlobalNav>
      );
    };

    function setupReactContext(props) {
      const reactContainer = document.createElement('div');
      mount(<Context {...props} />, { attachTo: reactContainer });
      return { reactContainer };
    }

    it('shows modules/submodules that correspond to query', () => {
      const props = {
        placeholder: 'Search Here',
        headerLabel: 'Oakland Medical Center',
        headerName: 'Thunderstorm',
        moduleTitle: 'Document Workflow',
        submoduleTitle1: 'Document',
        submoduleTitle2: 'Workflow',
        query: 'Document'
      };

      const { reactContainer } = setupReactContext(props);

      var hiddenSubmodule = reactContainer.getElementsByClassName(
        'hig__global-nav__side-nav__section__group__module__submodule--hide'
      );

      var submodule = reactContainer.getElementsByClassName(
        'hig__global-nav__side-nav__section__group__module__submodule'
      );

      expect(hiddenSubmodule.length).toEqual(1);
      expect(submodule.length).toEqual(2);
    });
  });
});
