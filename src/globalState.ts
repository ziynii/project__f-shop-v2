import { atom, selector } from 'recoil';

export interface IProduct {
  id: string;
  title: string | null;
  price: number | null;
  slug?: string | null;
  category: string | null;
  createdAt?: string | null;
  productType?: string | null;
  description: {
    childMarkdownRemark: { html: string | null } | null;
  } | null;
  image: {
    gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData | null;
  } | null;
}

const cartItemsState = atom<IProduct[]>({
  key: 'cartItemsState',
  default: [],
});

const allCartsState = selector({
  key: 'allCartsState',
  get: ({ get }) => {
    const carts = get(cartItemsState);
    return carts.length;
  },
});

const openSideBarState = atom({
  key: 'openSideBarState',
  default: false,
});

const headerGnbState = atom<string | undefined>({
  key: 'headerGnbState',
  default: '',
});

export { cartItemsState, allCartsState, openSideBarState, headerGnbState };
