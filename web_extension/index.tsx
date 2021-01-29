import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { WebExtension } from '../src/web_extension/WebExtension';

render(<WebExtension />, document.getElementById('root'));
