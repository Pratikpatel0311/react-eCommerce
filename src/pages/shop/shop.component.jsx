import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {connect} from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionsPageContainer from '../collection/collection.container';

import withRouter from '../../components/withRouter.component';

class Shop extends React.Component {

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    return (
      <div className="shop-page">
        <Routes>
          <Route path="/" element={<CollectionsOverviewContainer />} />
          <Route path=":collectionId" element={<CollectionsPageContainer />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: ()=>dispatch(fetchCollectionsStart())
});

export default withRouter(connect(null, mapDispatchToProps)(Shop));
