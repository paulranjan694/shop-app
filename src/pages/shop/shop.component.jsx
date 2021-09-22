import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import CollectionPage from '../collection/collection.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component{

    state={
        loading : true,
    }

    unsubscribeFromSnapshot = null;
    
    componentDidMount(){
        const {fetchCollectionStartAsync} = this.props;
        fetchCollectionStartAsync();

        // ****async code moved to action (redux-thunk)****
        // const collectionRef = firestore.collection('collections');
        // **********promise-based
        // collectionRef.get().then(
        //     async snapshot => {
        //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //         updateCollections(collectionsMap);
        //         this.setState({loading : false});
        //     }
        // );
        
        // ********listener-based
        // collectionRef.onSnapshot(
        //     async snapshot => {
        //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //         updateCollections(collectionsMap);
        //         this.setState({loading : false});
        //     }
        // );
    }

    render(){
        const {match, selectIsCollectionFetching, isCollectionLoaded} = this.props;
        return (
            <div className='shop-page'>
                <Route exact path='/shop' render={(props) => <CollectionOverviewWithSpinner isLoading={selectIsCollectionFetching} {...props}/>} />
                <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>}/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

