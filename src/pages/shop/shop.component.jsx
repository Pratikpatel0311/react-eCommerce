import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {connect} from 'react-redux';

import { convertCollectionToMap, firestore } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import withRouter from '../../components/withRouter.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
  
    const collectionRef = firestore.collection('collections');

    // Code using native fetch call
    /*fetch(
      "https://firestore.googleapis.com/v1/projects/react-e-commerce-fe9e5/databases/(default)/documents/collections"
    )
      .then((response) => response.json())
      .then((collections) => console.log(collections));*/

    // Code using Promise pattern
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionToMap(snapshot);

      updateCollections(collectionsMap);

      this.setState({ loading: false });
    });
    
    // Code using observable/observer pattern
    /*collectionRef.onSnapshot(async snapshot => { 
      const collectionsMap = convertCollectionToMap(snapshot);

      updateCollections(collectionsMap);

      this.setState({loading:false});
    });*/
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Routes>
          <Route
            path="/"
            element={<CollectionsOverviewWithSpinner isLoading={loading} />}
          />
          <Route
            path=":collectionId"
            element={<CollectionPageWithSpinner isLoading={loading} />}
          />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections:collectionsMap=>dispatch(updateCollections(collectionsMap)),
});

export default withRouter(connect(null, mapDispatchToProps)(Shop));
