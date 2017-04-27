import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Button', module)
  .add('with text', () => (
    <button onClick={action('clicked')}>Hello Button</button>
  ))
  .add('with some emoji', () => (
    <button onClick={action('clicked')}>😀 😎 👍 💯</button>
  ));

  /**
   * Poor Example
   * 
   * The following example is not specific and is likely to return false positives
   * as it asserting is too generic and does not out line the behavior of the component
   * rather make assumptions about markup / implementation.
   * 
   */

  /**
   * Improved test cases
   * 
   * The following example focus on documenting specific behaviors of a component with
   * splitting the assertion across multiple test cases helps provided targeted failure
   * messages when functionality is changed. 
   * 
   */