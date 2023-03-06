import { style } from '@vanilla-extract/css';
import * as utils from '@/styles/utils.css';
import * as medias from '@/styles/medias.css';

export const container = style([
  utils.flexColumn,
  medias.medium({
    padding: '4rem 10rem',
  }),
  { width: '60rem', padding: '4rem 0', gap: '4rem', margin: '0 auto' },
]);
