import { Map } from 'immutable';

import { ChangeLog } from './changelog';
import { D3Node } from './node';
import { Link } from './link';

export interface Twiglet {
  _rev?: string;
  changelog_url?: string;
  defaultView?: string;
  doReplacement?: boolean;
  description?: string;
  links?: Map<string, Link> | Link[];
  model_url?: string;
  name?: string;
  nodes?: Map<string, D3Node> | D3Node[];
  views_url?: string;
  url?: string;
}

export interface TwigletToSend extends Twiglet {
  commitMessage: string;
}
