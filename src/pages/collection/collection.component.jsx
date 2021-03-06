import React from 'react';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCollection } from '../../redux/shop/shop.selectors';

import withRouter from '../../components/withRouter.component';
import CollectionItem from '../../components/collection-item/collection-item.component';

import "./collection.styles.scss";

const CollectionPage = ({ router,collection }) => {
    const { title, items } = collection;
    return <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
            {items.map(item => (
                <CollectionItem key={item.id} item={item} />
            ))}
        </div>
    </div>
}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.router.params.collectionId)(state),
});

export default withRouter(connect(mapStateToProps)(CollectionPage));