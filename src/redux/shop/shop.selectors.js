import { createSelector } from "reselect";
import memoize from "lodash.memoize";

export const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollection = memoize((collectionUrlParam) =>
    createSelector([selectShopCollections], 
    collections => (collections ? collections[collectionUrlParam] : null)
  )
);

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
); 

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
);

/*selectCollection function we just wrote is not memoized due to collectionUrlParam being passed in from our collection component's mapStateToProps running whenever our state changes and and calling a new instance of our selectCollection function.
In this case collectionUrlParam is a dynamic argument meaning it can change, so to memoize selectCollection we actually have to memoize the whole function using a memoize helper function.
so we use memoize from 'lodash.memoize'
link -- https://github.com/reduxjs/reselect#q-how-do-i-create-a-selector-that-takes-an-argument
*/
