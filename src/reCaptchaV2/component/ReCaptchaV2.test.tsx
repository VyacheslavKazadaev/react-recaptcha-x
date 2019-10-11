import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { IContext } from 'src/provider/IContext';
import { ESize } from './ESize';
import { ETheme } from './ETheme';
import { ReCaptchaV2 } from './ReCaptchaV2';
import { TCallback } from './TCallback';

describe('ReCaptchaV2 component', () => {
  let callback: TCallback;
  let providerContext: IContext;
  let rr: RenderResult;
  let node: ChildNode | null;

  describe('without the V2 site key', () => {
    beforeEach(() => {
      callback = jest.fn();
      providerContext = {
        siteKeyV2: undefined,
        siteKeyV3: undefined,
        loaded: false
      };
    });

    it('throws an Error', () => {
      expect(
        () =>
          new ReCaptchaV2({
            callback,
            providerContext: providerContext
          })
      ).toThrow(
        'The prop "siteKeyV2" must be set on the ReCaptchaProvider before using the ReCaptchaV2 component'
      );
    });
  });

  describe('with a V2 site key', () => {
    beforeEach(() => {
      callback = jest.fn();
      providerContext = {
        siteKeyV2: 'test',
        siteKeyV3: undefined,
        loaded: false
      };
    });

    describe('and required props', () => {
      beforeEach(() => {
        rr = render(
          <ReCaptchaV2 callback={callback} providerContext={providerContext} />
        );
        node = rr.container.firstChild;
      });

      it('renders the div element', () => {
        expect(node).toMatchInlineSnapshot('<div />');
      });
    });

    describe('and optional props', () => {
      beforeEach(() => {
        rr = render(
          <ReCaptchaV2
            callback={callback}
            theme={ETheme.Light}
            tabindex={0}
            size={ESize.Normal}
            providerContext={providerContext}
            className="test-class-name"
            id="test-id"
            data-test-id="data-test-id"
          />
        );
        node = rr.container.firstChild;
      });

      it('renders the div element', () => {
        expect(node).toMatchInlineSnapshot(`
          <div
            class="test-class-name"
            data-test-id="data-test-id"
            id="test-id"
          />
        `);
      });

      it('it has the class attribute', () => {
        expect(node).toHaveClass('test-class-name');
      });
    });
  });
});