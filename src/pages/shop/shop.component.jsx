import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import CollectionPage from '../collection/collection.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component{

    state={
        loading : true,
    }

    unsubscribeFromSnapshot = null;
    
    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading : false});
        });
    }

    render(){
        const {match} = this.props;
        const {loading} = this.state;
        return (
            <div className='shop-page'>
                <Route exact path='/shop' render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}/>} />
                <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
})

export default connect(null, mapDispatchToProps)(ShopPage);

